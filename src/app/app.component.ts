import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {PlayerService, CameraService} from './services';
import {Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  static CHECK_INTERVAL = 5 * 1000;

  public isConnected: boolean;

  @ViewChild('canvas', {static: true}) private canvas;
  private subscriptions: Subscription[] = [];

  constructor(
    private playerService: PlayerService,
    private cameraService: CameraService
  ) {}

  public ngOnInit(): void {
    this.checkCameraStatus();
  }

  public ngAfterViewInit(): void {
    this.setPlayer();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public saveScreen(evt: Event) {
    const element = evt.target as HTMLAnchorElement;
    element.href = this.playerService.saveScreen();
  }

  private setPlayer() {
    const canvasEl = this.canvas.nativeElement;
    this.playerService.init(canvasEl);
  }

  private checkCameraStatus(): void {
    const $cameraStatus = timer(0, AppComponent.CHECK_INTERVAL)
      .pipe(switchMap(() => {
        return this.cameraService.cameraStatus();
      })
    ).subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });

    this.subscriptions.push($cameraStatus);
  }
}
