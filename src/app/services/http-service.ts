import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {API} from '../constants/API';
import {UUID} from 'angular2-uuid';
import {State} from '../models/State';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) {

    }

    public create(name: string) {
        return this.http
            .put<User>(API.URL + '/create', name)
            .pipe();
    }

    public connect(userId: UUID, socketId: string) {
        this.http
            .patch(API.URL + '/connect', {userId, socketId})
            .toPromise();
    }

    public register(from: UUID, to: UUID) {
        return this.http
            .post(API.URL + '/register', {from, to})
            .pipe();
    }

    public state(user: User) {
        return this.http
            .get<State>(API.URL + '/state/' + user.id)
            .pipe();
    }
}