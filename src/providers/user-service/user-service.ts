import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {API_ENDPOINT} from '../../app/app.config';
import {Storage} from "@ionic/storage";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class UserServiceProvider {

  //TODO: remove when backend is ready for real data
  userDummies: Array<
    {
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      likedQuestions: any,
    }>;

  constructor(public http: Http, public storage: Storage) {
    this.userDummies = this.initDummyData();
  }

  loadUserById(id) {
    return this.userDummies[id];
  }

  createNewUser(username, email, password, sex, birthYear, plz){
    //Todo: onError!!!
    //Todo: Send data the server is not ready for yet
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    var toSend = {
      username: username,
      email: email,
      password: password
    };
    this.http.post(API_ENDPOINT + '/Users/', JSON.stringify(toSend), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  login(userName, userPassword) {
    return this.http.post(API_ENDPOINT + '/Users/token/',
      {
        username: userName,
        password: userPassword,
      }
    );
  }

  logout(token) {
    //Todo: onError!!!
    const headers = new Headers({ Authorization: 'Token ' + token });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(API_ENDPOINT + '/Users/logout/', options);
  }

  //TODO: remove when backend is ready for real data
  initDummyData() {
    return (
      [
        { id: 0, firstName: 'Angela', lastName: 'Merkel', email: 'merkel@gmail.com', password: '1234',
          likedQuestions: [0, 1]},
        { id: 1, firstName: 'Test', lastName: 'User', email: 'test@gmail.com', password: 'test',
          likedQuestions: [1]},
        { id: 2, firstName: 'Dummy', lastName: 'User', email: 'dummy@gmail.com', password: 'passwort',
          likedQuestions: [0]},
      ]
    );
  }

}
