import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';
import type { UITurboModule, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { NativeDeviceCountryTurboModule } from './NativeDeviceCountryTurboModule';
import { TM } from './generated/ts';

export class NativeDeviceCountryPackage extends RNOHPackage {
  getUITurboModuleFactoryByNameMap(): Map<string, (ctx: UITurboModuleContext) => UITurboModule | null> {
    const map = new Map<string, (ctx: UITurboModuleContext) => UITurboModule | null>();
    map.set(TM.NativeDeviceCountry.NAME, (ctx: UITurboModuleContext) => new NativeDeviceCountryTurboModule(ctx));
    return map;
  }

  override async createEagerUITurboModuleByNameMap(ctx: UITurboModuleContext): Promise<Map<string, UITurboModule>> {
    const module = new NativeDeviceCountryTurboModule(ctx);
    return new Map()
      .set(TM.NativeDeviceCountry.NAME, module);
  }
}
