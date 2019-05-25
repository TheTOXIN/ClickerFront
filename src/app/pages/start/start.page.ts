import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http-service';
import {CONST} from '../../constants/CONST';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  public name: string;

  isLoad = false;

  constructor(
      private http: HttpService,
      private router: Router
  ) {
  }

  ngOnInit() {
  }

  public done() {
    if (this.name == null) { return; }
    if (this.name.length < 3) { return; }
    if (this.name.length > 10) { return; }

    this.isLoad = true;

    this.http.create(this.name).subscribe(user => {
        localStorage.setItem(CONST.KEY, JSON.stringify(user));
        this.router.navigateByUrl('/connect');
    });
  }
}
