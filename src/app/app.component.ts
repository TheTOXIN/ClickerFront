import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {CONST} from './constants/CONST';
import {User} from './models/User';
import {SocketService} from './services/socket-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private scoket: SocketService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.go();
    });
  }

  public go() {
    const user: User = JSON.parse(localStorage.getItem(CONST.KEY));

    if (user != null) {
      this.scoket.connect(user);
    }

    this.router.navigateByUrl('/start');
  }
}
