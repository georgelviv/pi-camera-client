import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  static SERVER_PORT = environment.SERVER_PORT;
  static API_PREFIX = '/camera';

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

  private get address(): string {
    return `${this.baseAddress}${CameraService.API_PREFIX}`;
  }

  private get baseAddress(): string {
    return `https://${this.addr}:${CameraService.SERVER_PORT}`;
  }

  public get checkAddress(): string {
    return `${this.baseAddress}/check`;
  }

  public cameraStatus(): Observable<boolean> {
    return this.http.get(`${this.address}/status`)
      .pipe(map((res: {connected: boolean}) => {
        return res.connected;
      }));
  }

  public serverName(): Observable<string> {
    return this.http.get(`${this.address}/server-name`)
      .pipe(map((res: {serverName: string}) => {
        return res.serverName;
      }));
  }

  public changeCameraIso(iso: number): Observable<boolean> {
    const params = new HttpParams()
      .set('iso', String(iso));

    return this.http.get(`${this.address}/settings`, {params})
    .pipe(map((res: {updated: boolean}) => {
      return res.updated;
    }));
  }
}
