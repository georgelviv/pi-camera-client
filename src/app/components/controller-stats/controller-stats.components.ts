import {Component, OnInit, OnDestroy} from '@angular/core';
import {ControllerService} from '@services/controller.service';
import {Subscription, interval} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-controller-stats',
  templateUrl: './controller-stats.components.html',
  styleUrls: ['./controller-stats.components.scss']
})
export class ControllerStatsComponent implements OnInit, OnDestroy {

  static EVERY_MS_CHECK = 10 * 1000;
  private subscription: Subscription;
  public data: any;

  constructor(
    private controllerService: ControllerService
  ) {}

  public ngOnInit(): void {
    this.subscription = interval(ControllerStatsComponent.EVERY_MS_CHECK)
      .pipe(switchMap(() => {
        return this.controllerService.controllerStatus();
      }))
      .subscribe((res) => {
        const data = res[Object.keys(res)[0]];
        this.data = Object.keys(data).map((i) => {
          const el = data[i];
          return {
            ...el
          };
        });
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
