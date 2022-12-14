import { Injectable } from '@angular/core';
import { PxConfiguration, PxVersion } from '../../projects/lib/src/public-api';

@Injectable()
export class AppConfiguration extends PxConfiguration {
  public get clientName(): string {
    return "restapiAngularLibraryTest";
  }
  public get requiredWebserviceVersion(): PxVersion {
    return { Major: 4, Minor: 0, Patch: 0 };
  }
  public get requiredLicencedModules(): string[] {
    return ["ZEI", "ADR"];
  }
}
