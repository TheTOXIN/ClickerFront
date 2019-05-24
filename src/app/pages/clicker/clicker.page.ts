import {Component, ElementRef, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket-service';
import {User} from '../../models/User';
import {CONST} from '../../constants/CONST';
import {HttpService} from '../../services/http-service';
import {Router} from '@angular/router';
import {State} from '../../models/State';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.page.html',
  styleUrls: ['./clicker.page.scss'],
})
export class ClickerPage implements OnInit {

  public user: User;
  public state: State;

  maxClick = 1000;
  isLoad = false;

  constructor(
    public socket: SocketService,
    private http: HttpService,
  ) {
    this.user = JSON.parse(localStorage.getItem(CONST.KEY));
  }

  ngOnInit() {
    this.http.state(this.user).subscribe(state => {
      if (state == null) { this.back(); }
      this.state = state;
      this.isLoad = true;
    });
  }

  click(event) {
    this.state.myCount++;
    this.socket.click(this.user.token);
  }

  back() {
    localStorage.clear();
    window.location.reload();
  }
}
