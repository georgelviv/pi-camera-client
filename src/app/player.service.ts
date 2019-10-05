import {Injectable} from '@angular/core';

declare const jsmpeg;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  static SERVER_ADDRESS = '192.168.31.126';
  static SERVER_PORT = 3001;

  private canvas: HTMLCanvasElement;
  private player: any;

  get fullServerAddress(): string {
    return `ws://${PlayerService.SERVER_ADDRESS}:${PlayerService.SERVER_PORT}/`;
  }


  init(canvas: HTMLCanvasElement): void {
    // Show loading notice
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillText('Loading...', (canvas.width / 2) - 30, canvas.height / 3);

    // Setup the WebSocket connection and start the player
    const client = new WebSocket(this.fullServerAddress);
    this.player = new jsmpeg(client, {canvas});
  }

  saveScreen(): string {
    return this.canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
  }
}
