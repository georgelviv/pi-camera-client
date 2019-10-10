import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SidebarComponent, IsoRangeComponent} from './components';
import {FormsModule} from '@angular/forms';
import {PlayerService, CameraService} from './services';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IsoRangeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PlayerService, CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
