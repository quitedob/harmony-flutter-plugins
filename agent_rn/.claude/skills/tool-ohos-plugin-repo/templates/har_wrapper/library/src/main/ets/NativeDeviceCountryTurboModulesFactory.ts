import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { NativeDeviceCountryTurboModule } from './NativeDeviceCountryTurboModule';

class NativeDeviceCountryTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === 'NativeDeviceCountry') {
      return new NativeDeviceCountryTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    if (name === 'NativeDeviceCountry') {
      return true;
    }
    return false;
  }
}

export class NativeDeviceCountryPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new NativeDeviceCountryTurboModulesFactory(ctx);
  }
}
