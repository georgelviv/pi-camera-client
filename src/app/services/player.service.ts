import {Injectable} from '@angular/core';
import {Observable, Subject, interval} from 'rxjs';
import {map} from 'rxjs/operators';

declare const jsmpeg;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  static SERVER_ADDRESS = '192.168.31.126';
  static SERVER_PORT = 3001;

  private canvas: HTMLCanvasElement;
  private player: any;
  private client: WebSocket;
  private $subject: Subject <number>;
  private frames = 0;

  get fullServerAddress(): string {
    return `ws://${PlayerService.SERVER_ADDRESS}:${PlayerService.SERVER_PORT}/`;
  }

  constructor() {
    this.$subject = new Subject ();
  }

  public init(canvas: HTMLCanvasElement): void {
    // Show loading notice
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillText('Loading...', (canvas.width / 2) - 30, canvas.height / 3);

    // Setup the WebSocket connection and start the player
    this.client = new WebSocket(this.fullServerAddress);
    this.player = new jsmpeg(this.client, {canvas});

    this.measureFPS();
  }

  public saveScreen(): string {
    return this.canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
  }

  public getFPS(): Observable<number> {
    const EVERY_MS = 1000;
    return interval(EVERY_MS).pipe(map(() => {
      const fps = this.frames;
      this.frames = 0;
      return fps;
    }));
  }

  private measureFPS(): void {
    this.client.addEventListener('message', () => {
      this.frames += 1;
    });
  }
}
