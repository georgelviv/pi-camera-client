import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {
  SidebarComponent,
  IsoRangeComponent,
  FPSMeterComponent,
  ControllerStatsComponent
} from './components';
import {FormsModule} from '@angular/forms';
import {
  PlayerService,
  CameraService,
  SettingsService,
  ControllerService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IsoRangeComponent,
    FPSMeterComponent,
    ControllerStatsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PlayerService,
    CameraService,
    SettingsService,
    ControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
