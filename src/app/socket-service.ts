import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class SocketService {

    private stomp: any;

    public connect() {
        this.stomp = Stomp.over(new SockJS(`http://localhost:8080/socket`));

        this.stomp.connect({}, () => {
            const url = this.stomp.ws._transport.url;
            const array = url.split('/');
            const id = array[array.length - 2];

            console.log('SOCKET CONNECT -' + id);

            this.stomp.subscribe('/user/queue/clicker', click => alert(click));
        });
    }

    public create(name: string) {
        this.stomp.send('/app/create', {}, name);
    }
}
