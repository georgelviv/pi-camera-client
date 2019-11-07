import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  static KEY = 'address';

  public address = `${environment.SERVER_ADDRESS}`;
  private subject: ReplaySubject<string> = new ReplaySubject(1);

  constructor() {
    const addr = window.localStorage.getItem(SettingsService.KEY);
    if (addr && this.address !== addr) {
      this.address = addr;
    } else {
      window.localStorage.setItem(SettingsService.KEY, this.address);
    }
    this.subject.next(this.address);
  }

  public setServerAddress(address): void {
    this.address = address;
    window.localStorage.setItem(SettingsService.KEY, this.address);
    this.subject.next(this.address);
  }

  public getServerAddress(): string {
    return this.address;
  }

  public getServerSubject(): ReplaySubject<string> {
    return this.subject;
  }
}
