import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {PlayerService} from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas', {static: true}) private canvas;

  constructor(private playerService: PlayerService) {}

  public saveScreen(evt: Event) {
    const element = evt.target as HTMLAnchorElement;
    element.href = this.playerService.saveScreen();
  }

  public ngAfterViewInit() {
    this.setPlayer();
  }

  private setPlayer() {
    const canvasEl = this.canvas.nativeElement;
    this.playerService.init(canvasEl);
  }
}
