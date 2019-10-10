import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  static SERVER_ADDRESS = 'http://192.168.31.126';
  static SERVER_PORT = 3000;
  static API_PREFIX = '/camera';

  constructor(private http: HttpClient) {}

  private get address() {
    return `${CameraService.SERVER_ADDRESS}:${CameraService.SERVER_PORT}${CameraService.API_PREFIX}`;
  }


  public cameraStatus(): Observable<boolean> {
    return this.http.get(`${this.address}/status`)
      .pipe(map((res: {connected: boolean}) => {
        return res.connected;
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
