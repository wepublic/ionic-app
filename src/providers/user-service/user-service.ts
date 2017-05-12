import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class UserServiceProvider {

  userDummies: Array<{ id: number, firstName: string, lastName: string, email: string, password: string }>;

  constructor() {
    this.userDummies = [
      { id: 0, firstName: 'Angela', lastName: 'Merkel', email: 'merkel@gmail.com', password: '1234'},
      { id: 1, firstName: 'Test', lastName: 'User', email: 'test@gmail.com', password: 'test'},
      { id: 2, firstName: 'Dummy', lastName: 'User', email: 'dummy@gmail.com', password: 'passwort'},
    ]
  }

  loadUserById(id) {
    return this.userDummies[id];
  }

}
