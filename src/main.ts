import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("[TRIAL]_23_December_2019_[v2]_MTU3NzA1OTIwMDAwMA==39f3c0363abb64b1ded83c423732dd51");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
