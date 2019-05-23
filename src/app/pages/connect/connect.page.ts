import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../services/socket-service';
import {User} from '../../models/User';
import {CONST} from '../../constants/CONST';
import {HttpService} from '../../services/http-service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  public user: User;
  public data: string;

  isScan = false;

  constructor(
      private socket: SocketService,
      private http: HttpService,
  ) {
      this.user = JSON.parse(localStorage.getItem(CONST.KEY));
  }

  ngOnInit() {
     this.socket.connect(this.user);
  }

  scan() {
    if (this.data == null) { return; }
    if (this.isScan) { return; }

    this.http.register(this.user.id, this.data).subscribe(() => {
      this.isScan = true;
    });
  }
}
