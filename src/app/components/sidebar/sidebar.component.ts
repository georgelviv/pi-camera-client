import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CameraService} from '@services/camera.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  static CHECK_INTERVAL = 5 * 1000;

  public isConnected: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private cameraService: CameraService
  ) {}

  public ngOnInit(): void {
    this.checkCameraStatus();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private checkCameraStatus(): void {
    const $cameraStatus = timer(0, SidebarComponent.CHECK_INTERVAL)
      .pipe(switchMap(() => {
        return this.cameraService.cameraStatus();
      })
    ).subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });

    this.subscriptions.push($cameraStatus);
  }

}
