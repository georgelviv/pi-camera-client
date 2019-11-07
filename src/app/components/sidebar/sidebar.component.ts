import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CameraService} from '@services/camera.service';
import {SettingsService} from '@services/settings.service';
import {PlayerService} from '@services/player.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  static CHECK_INTERVAL = 5 * 1000;

  public isConnected: boolean;
  public isError = false;

  private subscriptions: Subscription[] = [];

  public cameraServerAddr: string;

  public addressInput: string;

  constructor(
    private cameraService: CameraService,
    private playerService: PlayerService,
    private settingsService: SettingsService
  ) {}

  public ngOnInit(): void {
    this.checkCameraStatus();
    this.cameraServerAddr = this.cameraService.checkAddress;
    this.checkAddress();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public saveScreen(evt): void {
    const element = evt.target as HTMLAnchorElement;
    element.href = this.playerService.saveScreen();
  }

  public onAddressUpdate(): void {
    this.settingsService.setServerAddress(this.addressInput);
    document.location.reload(true);
  }

  private checkCameraStatus(): void {
    const $cameraStatus = timer(0, SidebarComponent.CHECK_INTERVAL)
      .pipe(switchMap(() => {
        return this.cameraService.cameraStatus();
      })
    )
    .subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
      this.isError = false;
    }, (err) => {
      this.isConnected = false;
      this.isError = true;
    });

    this.subscriptions.push($cameraStatus);
  }

  private checkAddress(): void {
    const $address = this.settingsService.getServerSubject()
      .subscribe((addr) => {
        this.addressInput = addr;
      });

    this.subscriptions.push($address);
  }

}
