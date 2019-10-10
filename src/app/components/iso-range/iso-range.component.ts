import {Component} from '@angular/core';
import {CameraService} from '@services/camera.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-iso-range',
  templateUrl: './iso-range.component.html',
  styleUrls: ['./iso-range.component.scss']
})
export class IsoRangeComponent {
  static ISO_RANGE_VALUE = [100, 200, 320, 400, 500, 640, 800];
  public isoInput: number;
  public iso: number;

  private subscription: Subscription;

  constructor(
    private cameraService: CameraService
  ) {}

  public onIsoChange(): void {
    this.iso = IsoRangeComponent.ISO_RANGE_VALUE[this.isoInput];

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.cameraService.changeCameraIso(this.iso)
      .subscribe((changed) => {
        console.log(changed);
      });
  }
}
