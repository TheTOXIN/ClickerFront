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
                style({transform: 'scale(1)'}),
                animate(200, keyframes([
                    style({transform: 'scale(1)', offset: 0}),
                    style({transform: 'scale(1.5)', offset: 0.5}),
                    style({transform: 'scale(1)', offset: 1})
                ]))
            ])
        ]),
        trigger('particleMyState', [
            transition(':enter', [
                style({opacity: 1}),
                animate(1000, style({transform: 'translateY(-777%)', opacity: 0})),
            ]),
        ]),
        trigger('particleMeState', [
            transition(':enter', [
                style({opacity: 1}),
                animate(1000, style({transform: 'translateY(777%)', opacity: 0})),
            ]),
        ])
    ]
})
export class ClickerPage implements OnInit {

    private tmpCount = 0;

    public user: User;
    public state: State;

    isLoad = false;

    maxClick = 1000;
    batchClick = 100;

    myParticles = [];
    meParticles = [];

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
            this.tmpCount = this.state.meCount;
            this.eventer();
            this.isLoad = true;
        });
    }

    eventer() {
        this.socket.clickerObservable.subscribe((count) => {
            if (count === 0) { return; }
            this.state.meCount = this.tmpCount + count;

            if (this.meParticles.length === this.batchClick) { this.meParticles = []; }
            this.meParticles.push(this.state.meCount);
        });
    }

    click(event) {
        this.state.myCount++;
        this.socket.click(this.user.token);

        if (this.myParticles.length === this.batchClick) { this.myParticles = []; }
        this.myParticles.push(this.state.myCount);
    }

    back() {
        localStorage.clear();
        window.location.reload();
    }
}
