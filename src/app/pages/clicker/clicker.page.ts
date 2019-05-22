import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../services/socket-service';
import {User} from '../../models/User';
import {CONST} from '../../constants/CONST';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.page.html',
  styleUrls: ['./clicker.page.scss'],
})
export class ClickerPage implements OnInit {

  public user: User;
  public count: number;

  constructor(
    public socket: SocketService
  ) {
    this.user = JSON.parse(localStorage.getItem(CONST.KEY));
    this.count = 0; // TODO read from state
  }

  ngOnInit() {

  }

  click() {
    this.count++;
    this.socket.click(this.user.token);
  }
}
