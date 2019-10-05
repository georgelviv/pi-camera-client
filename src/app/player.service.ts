import {Injectable} from '@angular/core';

declare const jsmpeg: any;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  static SERVER_ADDRESS = '192.168.31.126';
  static SERVER_PORT = 3001;

  private canvas: HTMLCanvasElement;

  get fullServerAddress(): string {
    return `ws://${PlayerService.SERVER_ADDRESS}:${PlayerService.SERVER_PORT}/`;
  }


  init(canvas: HTMLCanvasElement) {
    // Show loading notice
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillText('Loading...', (canvas.width / 2) - 30, canvas.height / 3);

    // Setup the WebSocket connection and start the player
    const client = new WebSocket(this.fullServerAddress);
    const player = new jsmpeg(client, {canvas});
  }
}
