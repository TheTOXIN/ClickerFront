import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../services/socket-service';
import {User} from '../../models/User';
import {CONST} from '../../constants/CONST';
import {HttpService} from '../../services/http-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  public user: User;
  public data: string;

  isScan = false;
  isLoad = false;

  constructor(
      private socket: SocketService,
      private http: HttpService,
      private scanner: BarcodeScanner
  ) {
      this.user = JSON.parse(localStorage.getItem(CONST.KEY));
  }

  ngOnInit() {
     this.socket.connect(this.user);
  }

  connect() {
    if (this.data == null) { return; }
    if (this.isScan) { return; }

    this.isLoad = true;

    this.http.register(this.user.id, this.data).subscribe(() => {
      this.isScan = true;
      this.isLoad = false;
    });
  }

  copy() {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.user.id;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
  }

  scan() {
    this.scanner.scan().then(data => {
      this.data = data.text;
    });
  }
}
