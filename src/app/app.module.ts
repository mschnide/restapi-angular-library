import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PxConfiguration } from 'projects/lib/src/public-api';
import { PxRestApiModule } from 'projects/lib/src/px-rest-api.module';

import { AppComponent } from './app.component';
import { AppConfiguration } from './app.configuration';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PxRestApiModule.forRoot()
  ],
  providers: [
    AppConfiguration,
    { provide: PxConfiguration, useExisting: AppConfiguration }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
