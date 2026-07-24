import { FlutterAbility, FlutterEngine, Log } from '@ohos/flutter_ohos';
import { GeneratedPluginRegistrant } from '../plugins/GeneratedPluginRegistrant';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';
import { Want } from '@kit.AbilityKit';
import { AbilityConstant } from '@kit.AbilityKit';

const TAG: string = 'EntryAbility';
const WRITE_MEDIA_PERMISSION: Permissions[] = ['ohos.permission.WRITE_IMAGEVIDEO'];

export default class EntryAbility extends FlutterAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    super.onCreate(want, launchParam);
    Log.i(TAG, 'EntryAbility onCreate — 启动时检查 WRITE_IMAGEVIDEO 权限');
    this.requestWriteMediaPermission();
  }

  configureFlutterEngine(flutterEngine: FlutterEngine): void {
    super.configureFlutterEngine(flutterEngine);
    GeneratedPluginRegistrant.registerWith(flutterEngine);
  }

  /**
   * 第一条路：应用启动时主动请求 WRITE_IMAGEVIDEO 权限。
   * 已授权则跳过弹窗，未授权则弹出系统权限对话框。
   */
  private async requestWriteMediaPermission(): Promise<void> {
    try {
      const context: common.UIAbilityContext = this.context as common.UIAbilityContext;
      const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
      const tokenId: number = context.applicationInfo.accessTokenId;

      const grantStatus: abilityAccessCtrl.GrantStatus =
        await atManager.checkAccessToken(tokenId, WRITE_MEDIA_PERMISSION[0]);

      if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        Log.i(TAG, '检查 WRITE_IMAGEVIDEO 权限: 已授权，跳过弹窗');        // 路径 C
        return;
      }

      Log.i(TAG, '检查 WRITE_IMAGEVIDEO 权限: 未授权，弹出权限请求对话框...'); // 路径 A / B

      const result = await atManager.requestPermissionsFromUser(context, WRITE_MEDIA_PERMISSION);

      const granted: boolean = result.authResults.every((r: number) => r === 0);
      if (granted) {
        Log.i(TAG, '用户同意 WRITE_IMAGEVIDEO 权限 — 第一条路通过');        // 路径 A 终点
      } else {
        Log.w(TAG, '用户拒绝 WRITE_IMAGEVIDEO 权限 — 第一条路被拒');        // 路径 B 起点
      }
    } catch (err) {
      Log.e(TAG, `权限请求异常: ${JSON.stringify(err)}`);
    }
  }
}
