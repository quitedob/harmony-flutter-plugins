import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import type { TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from './generated/ts';
import radio from '@ohos.telephony.radio';
import i18n from '@ohos.i18n';

export class NativeDeviceCountryTurboModule
  extends TurboModule
  implements TM.NativeDeviceCountry.Spec
{
  constructor(protected ctx: TurboModuleContext) {
    super(ctx);
  }

  async getCountryCode(type: string): Promise<{ code: string; type: string }> {
    const DEFAULT_SLOT_ID = 0;

    if (type === 'telephony') {
      // 仅使用 telephony API 获取网络国家代码
      try {
        const code = await radio.getISOCountryCodeForNetwork(DEFAULT_SLOT_ID);
        return { code: code || '', type: 'telephony' };
      } catch (error) {
        // 获取失败时返回空字符串
        return { code: '', type: 'telephony' };
      }
    }

    if (type === 'config') {
      // 仅使用 config API 获取系统区域国家代码
      const code = i18n.System.getSystemRegion();
      return { code: code || '', type: 'config' };
    }

    // type === 'any': 优先 telephony，失败或空时回退到 config
    try {
      const telecomCode =
        await radio.getISOCountryCodeForNetwork(DEFAULT_SLOT_ID);
      if (telecomCode && telecomCode.length > 0) {
        return { code: telecomCode, type: 'telephony' };
      }
    } catch (error) {
      // telephony 获取失败，继续尝试 config
    }

    // 回退到 config 方式
    const configCode = i18n.System.getSystemRegion();
    return { code: configCode || '', type: 'config' };
  }
}
