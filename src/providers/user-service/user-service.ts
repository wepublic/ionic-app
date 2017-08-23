import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {API_ENDPOINT} from '../../app/app.config';
import {Storage} from "@ionic/storage";

/*
 * User service provider
*/

@Injectable()
export class UserServiceProvider {

  constructor(public http: Http, public storage: Storage) {
  }

  getToken() { return Observable.fromPromise(this.storage.get('localUserToken')); }
  getHeaders(token) { return {headers: new Headers({Authorization: 'Token ' + token})}; }

  loadMe() {
    return this.getToken()
    .mergeMap(token => this.http.get(API_ENDPOINT + '/Users/me/', this.getHeaders(token)))
    .map(res => res.json());
  }

  createNewUser(username, email, password, sex, birthYear, plz) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    var toSend = {
      email: email,
      password: password,
      username: username,
      zip_code: plz,
      gender: sex,
      year_of_birth: birthYear
    };
    return this.http.post(API_ENDPOINT + '/Users/', JSON.stringify(toSend), options)
      .map(res => res.json());
  }

  login(userEmail, userPassword) {
    var param = {
      email: userEmail,
      password: userPassword
    };
    var res = this.http.post(API_ENDPOINT + '/Users/token/', param).share();
    res.subscribe(
      data => {
        console.log("Logged in:");
        console.log(data.json());
        this.storage.set('localUserToken', data.json().Token);
        this.storage.set('localUserEmail', userEmail);
        this.storage.set('localUserPassword', userPassword);
      },
      err => { console.log("Login error"); }
    );
    return res;
  }

  logout() {
    var res = this.getToken()
    .mergeMap(token => this.http.get(API_ENDPOINT + '/Users/logout/', this.getHeaders(token))).share();
    res.subscribe(
      data => {
        console.log("Logged out:");
        console.log(data.json());
        this.storage.remove('localUserEmail');
        this.storage.remove('localUserPassword');
        this.storage.remove('localUserToken');
      },
      err => { console.log("Login error"); }
    );
    return res;
  }

  forgotPW(userEmail) {
    return this.http.post(API_ENDPOINT + '/Users/reset_password/', {email: userEmail});
  }

}
