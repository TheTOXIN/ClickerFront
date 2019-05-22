import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {API} from '../constants/API';
import {HttpService} from './http-service';
import {User} from '../models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UUID} from 'angular2-uuid';

@Injectable()
export class SocketService {

    private stomp: any;

    public clickerBehavior: BehaviorSubject<number>;
    public clickerObservable: Observable<number>;

    constructor(
        private http: HttpService,
        private router: Router
    ) {
        this.clickerBehavior = new BehaviorSubject(0);
        this.clickerObservable = this.clickerBehavior.asObservable();
    }

    public connect(user: User) {
        this.stomp = Stomp.over(new SockJS(API.URL + `/socket`));

        return this.stomp.connect({}, () => {
            const url = this.stomp.ws._transport.url;
            const array = url.split('/');
            const id = array[array.length - 2];

            this.eventConnect();
            this.eventClicker(); // TODO to service

            this.http.connect(user.id, id);
        });
    }

    public eventConnect() {
        this.stomp.subscribe('/user/queue/connect', () => this.router.navigateByUrl('/clicker'));
    }

    public eventClicker() {
        this.stomp.subscribe('/user/queue/clicker', () => this.clickerBehavior.next(this.clickerBehavior.value + 1));
    }

    public click(token: UUID) {
        this.stomp.send('/app/click', {}, token);
    }
}
