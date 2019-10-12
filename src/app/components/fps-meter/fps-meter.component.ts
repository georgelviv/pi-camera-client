import {Component, OnInit} from '@angular/core';
import {PlayerService} from '@services/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fps-meter',
  templateUrl: './fps-meter.component.html',
  styleUrls: ['./fps-meter.component.scss']
})
export class FPSMeterComponent implements OnInit {

  public $fps: Observable<number>;

  constructor(
    private playerService: PlayerService
  ) {}

  public ngOnInit(): void {
    this.$fps = this.playerService.getFPS();
  }

}
