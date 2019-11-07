import {Component, OnInit, OnDestroy} from '@angular/core';
import {PlayerService} from '@services/player.service';
import {Subscription} from 'rxjs';
import {FrameMeta} from '@services/frame-meta.model';

@Component({
  selector: 'app-fps-meter',
  templateUrl: './fps-meter.component.html',
  styleUrls: ['./fps-meter.component.scss']
})
export class FPSMeterComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public fps: number;
  public latency: number;

  constructor(
    private playerService: PlayerService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.playerService.getFPS()
      .subscribe(({fps, latency}: FrameMeta) => {
        this.fps = fps;
        this.latency = latency;
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
