import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {PlayerService} from '@services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {


  @ViewChild('canvas', {static: true}) private canvas;

  constructor(
    private playerService: PlayerService
  ) {}

  public ngAfterViewInit(): void {
    this.setPlayer();
  }

  public saveScreen(evt: Event) {
    const element = evt.target as HTMLAnchorElement;
    element.href = this.playerService.saveScreen();
  }

  private setPlayer() {
    const canvasEl = this.canvas.nativeElement;
    this.playerService.init(canvasEl);
  }


}
