import {UUID} from 'angular2-uuid';

export class User {
    constructor(
        public id: string,
        public name: string,
        public token: UUID
    ) {

    }
}