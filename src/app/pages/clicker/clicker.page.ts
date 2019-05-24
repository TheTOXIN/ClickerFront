import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket-service';
import {User} from '../../models/User';
import {CONST} from '../../constants/CONST';
import {HttpService} from '../../services/http-service';
import {State} from '../../models/State';
import {animate, animation, keyframes, state, style, transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.page.html',
  styleUrls: ['./clicker.page.scss'],
  animations: [
      trigger('clickState', [
          transition('* => *', [
              style({ transform: 'scale(1)' }),
              animate(200, keyframes([
                  style({ transform: 'scale(1)', offset: 0 }),
                  style({ transform: 'scale(1.5)', offset: 0.5 }),
                  style({ transform: 'scale(1)', offset: 1 })
              ]))
          ])
      ]),
  ]
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
      this.eventer();
      this.isLoad = true;
    });
  }

  eventer() {
    this.socket.clickerObservable.subscribe(() => {
        this.state.meCount++;
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
