import {Injectable} from '@angular/core';
import {Observable, Subject, interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FrameMeta} from './frame-meta.model';
import {SettingsService} from './settings.service';

declare const jsmpeg;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  static SERVER_PORT = environment.STREAMING_PORT;

  private canvas: HTMLCanvasElement;
  private player: any;
  private client: WebSocket;
  private $subject: Subject <number>;
  private frames = 0;
  private latency = 0;
  private address = '';

  get fullServerAddress(): string {
    return `wss://${this.address}:${PlayerService.SERVER_PORT}/`;
  }

  constructor(
    private settingsService: SettingsService
  ) {
    this.$subject = new Subject();
    this.settingsService.getServerSubject()
      .subscribe((addr) => {
        this.address = addr;
      });
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

  public getFPS(): Observable<FrameMeta> {
    const EVERY_MS = 1000;
    return interval(EVERY_MS).pipe(map(() => {
      const fps = this.frames;
      this.frames = 0;
      return {
        fps, latency: this.latency
      };
    }));
  }

  private measureFPS(): void {
    this.client.addEventListener('message', (msg) => {
      if (typeof msg.data === 'string') {
        this.latency = Date.now() - Number(msg.data);
      }
      this.frames += 1;
    });
  }
}
