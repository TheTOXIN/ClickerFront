import { Component, OnInit } from '@angular/core';
import {SocketService} from '../socket-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  name: string;

  constructor(
      private socket: SocketService
  ) {
  }

  ngOnInit() {
  }

  public done() {
    if (this.name == null) { return; }
    if (this.name.length < 3) { return; }
    if (this.name.length > 30) { return; }

    this.socket.create(this.name);
  }
}
