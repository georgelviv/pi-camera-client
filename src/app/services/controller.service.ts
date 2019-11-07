import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  static CONTROLLER_PORT = environment.CONTROLLER_PORT;

  private addr = '';

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {
    this.settingsService.getServerSubject()
      .subscribe((addr) => {
        this.addr = addr;
      });
  }

  private get baseAddress(): string {
    return `https://${this.addr}:${ControllerService.CONTROLLER_PORT}`;
  }

  public controllerStatus(): Observable<boolean> {
    return this.http.get(`${this.baseAddress}/controller-status`)
      .pipe(map((res: any) => {
        if (!res) {
          throw Error;
        }
        return res;
      }));
  }
}
