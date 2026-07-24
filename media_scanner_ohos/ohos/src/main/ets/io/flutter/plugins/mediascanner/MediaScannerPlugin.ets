/**
 * MediaScannerPlugin - OpenHarmony (OHOS) native implementation of the
 * `media_scanner` Flutter plugin.
 *
 * Communicates with Dart via a MethodChannel named `"media_scanner"`.
 * On receiving the `loadMedia` call, it uses `photoAccessHelper` to register
 * the given file with the system media store so it appears in the Gallery
 * without a device restart.
 */

import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodChannel,
  MethodCallHandler,
  MethodResult,
  Log,
} from '@ohos/flutter_ohos';
import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { BusinessError } from '@kit.BasicServicesKit';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';

const CHANNEL_NAME: string = 'media_scanner';
const METHOD_LOAD_MEDIA: string = 'loadMedia';
const ARG_PATH: string = 'path';
const LOG_TAG: string = 'MediaScannerPlugin';
const WRITE_MEDIA_PERMISSION: Permissions[] = ['ohos.permission.WRITE_IMAGEVIDEO'];

function getPhotoType(ext: string): photoAccessHelper.PhotoType {
  const extLower: string = ext.toLowerCase();
  switch (extLower) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'webp':
    case 'heic':
    case 'heif':
      return photoAccessHelper.PhotoType.IMAGE;
    default:
      return photoAccessHelper.PhotoType.VIDEO;
  }
}

export default class MediaScannerPlugin implements FlutterPlugin {
  private channel: MethodChannel | null = null;

  getUniqueClassName(): string {
    return 'MediaScannerPlugin';
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), CHANNEL_NAME);
    const handler: MethodCallHandler = {
      onMethodCall: (call: MethodCall, result: MethodResult): void => {
        this.handleMethodCall(call, result);
      },
    };
    this.channel.setMethodCallHandler(handler);
    Log.i(LOG_TAG, `Plugin attached — channel "${CHANNEL_NAME}" ready`);
  }

  onDetachedFromEngine(): void {
    if (this.channel !== null) {
      this.channel.setMethodCallHandler(null);
      this.channel = null;
    }
    Log.i(LOG_TAG, 'Plugin detached — channel released');
  }

  private handleMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      case METHOD_LOAD_MEDIA:
        this.onLoadMedia(call, result);
        break;
      default:
        result.notImplemented();
        break;
    }
  }

  private onLoadMedia(call: MethodCall, result: MethodResult): void {
    const filePath: string = call.argument(ARG_PATH) as string;
    if (!filePath || filePath.length === 0) {
      Log.w(LOG_TAG, 'loadMedia called with empty path');
      result.success('Path is empty or missing');
      return;
    }
    Log.i(LOG_TAG, `loadMedia called for path: ${filePath}`);
    this.registerAsset(filePath)
      .then((): void => {
        Log.i(LOG_TAG, `Media registered successfully: ${filePath}`);
        result.success(null);
      })
      .catch((err: BusinessError): void => {
        Log.e(LOG_TAG,
          `Failed to register media "${filePath}": code=${err.code}, message=${err.message}`);
        result.success(`OHOS error [${err.code}]: ${err.message}`);
      });
  }

  private async registerAsset(filePath: string): Promise<void> {
    const lastDot: number = filePath.lastIndexOf('.');
    if (lastDot === -1) {
      throw new Error(`Cannot determine file type — no extension: ${filePath}`);
    }
    const extension: string = filePath.substring(lastDot + 1);
    const photoType: photoAccessHelper.PhotoType = getPhotoType(extension);

    // --- 第二条路：防御性权限检查 ---
    await this.ensureWriteMediaPermission();

    const context: Context = getContext();
    const helper: photoAccessHelper.PhotoAccessHelper =
      photoAccessHelper.getPhotoAccessHelper(context);

    // Use MediaAssetChangeRequest which accepts a sandbox file URI directly.
    // This replaces the old createAsset() + file copy + applyChanges(uri) flow.
    let changeRequest: photoAccessHelper.MediaAssetChangeRequest;
    if (photoType === photoAccessHelper.PhotoType.IMAGE) {
      changeRequest = photoAccessHelper.MediaAssetChangeRequest.createImageAssetRequest(context, filePath);
    } else {
      changeRequest = photoAccessHelper.MediaAssetChangeRequest.createVideoAssetRequest(context, filePath);
    }

    Log.i(LOG_TAG, `Asset change request created for: ${filePath}, type: ${photoType}`);

    try {
      await helper.applyChanges(changeRequest);
      Log.i(LOG_TAG, `applyChanges 成功 — 文件已注册到媒体库: ${filePath}`);
    } catch (err) {
      const bizErr: BusinessError = err as BusinessError;
      Log.e(LOG_TAG,
        `applyChanges 失败: code=${bizErr.code}, message=${bizErr.message}, file=${filePath}`);
      throw new Error(`applyChanges failed [${bizErr.code}]: ${bizErr.message}`);
    }
  }

  /**
   * 防御性权限检查（第二条路）。
   * 正常情况下 EntryAbility 启动时已申请权限（第一条路），但如果用户当时拒绝了，
   * 这里会再次尝试弹窗请求。已授权则直接返回。
   */
  private async ensureWriteMediaPermission(): Promise<void> {
    try {
      const context: common.UIAbilityContext = getContext() as common.UIAbilityContext;
      const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
      const tokenId: number = context.applicationInfo.accessTokenId;

      const grantStatus: abilityAccessCtrl.GrantStatus =
        await atManager.checkAccessToken(tokenId, WRITE_MEDIA_PERMISSION[0]);

      if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        Log.i(LOG_TAG,
          'ensureWriteMediaPermission: WRITE_IMAGEVIDEO 已授权，直接调用 applyChanges');
        return;
      }

      Log.w(LOG_TAG,
        'ensureWriteMediaPermission: WRITE_IMAGEVIDEO 未授权，尝试动态请求用户授权...');

      const result = await atManager.requestPermissionsFromUser(context, WRITE_MEDIA_PERMISSION);

      const granted: boolean = result.authResults.every((r: number) => r === 0);
      if (granted) {
        Log.i(LOG_TAG,
          'ensureWriteMediaPermission: 用户同意授权，继续 applyChanges — 第二条路通过');
      } else {
        Log.e(LOG_TAG,
          'ensureWriteMediaPermission: 用户拒绝 WRITE_IMAGEVIDEO 权限 — 第二条路也被拒，将返回错误码 201');
        throw new Error('用户拒绝了 WRITE_IMAGEVIDEO 权限，无法将文件注册到系统媒体库 [code=201]');
      }
    } catch (err) {
      const bizErr: BusinessError = err as BusinessError;
      // 如果已经是权限错误，直接重新抛出
      if (bizErr.code === 201) {
        throw new Error(`Permission denied [201]: ${bizErr.message}`);
      }
      Log.e(LOG_TAG,
        `ensureWriteMediaPermission 异常: code=${bizErr.code}, message=${bizErr.message}`);
      throw new Error(`ensureWriteMediaPermission failed: ${bizErr.message}`);
    }
  }
}
