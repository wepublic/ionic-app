import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {API_ENDPOINT} from '../../app/app.config';
import {UserServiceProvider} from "../user-service/user-service";

/*
  Generated class for the QuestionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionServiceProvider {

  //TODO: remove when backend is ready for real data
  questionDummies: Array<{
    id: number,
    upvotes: number,
    voted: boolean,
    answers: any,
    user: any,
    text: string,
    tags: any,
  }>;

  //TODO: remove UserService when backend is ready for real data
  constructor(public userService: UserServiceProvider, public http: Http) {
    this.questionDummies = this.initDummyData();
  }

  loadAnsweredQuestion(token, questionID) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    return this.http.get(API_ENDPOINT + '/Questions/'+questionID+'/', {headers: headersObj})
      .map(res => res.json());
  }

  loadAllQuestions() {
    return this.http.get(API_ENDPOINT + '/Questions/')
      .map(res => res.json());
  }

  loadLikedQuestions(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    return this.http.get(API_ENDPOINT + '/Questions/upvotes/', {headers: headersObj})
      .map(res => res.json());
  }

  loadMyQuestions(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    return this.http.get(API_ENDPOINT + '/Questions/my/', {headers: headersObj})
      .map(res => res.json());
  }

  loadRandomQuestion(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    return this.http.get(API_ENDPOINT + '/Questions/random/', {headers: headersObj})
      .map(res => res.json());
  }

  loadQuestionByTagId(tagId) {
    return this.http.get(API_ENDPOINT + '/Tags/' + tagId + '/Questions/')
      .map(res => res.json());
  }

  publishQuestion(nText, nTags, token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    return this.http.post(API_ENDPOINT + '/Questions/',
      {
        text: nText,
        tags: nTags
      },
      {
        headers: headersObj
      }
    );
  }

  downvoteQuestion(token, questionID) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    this.http.post(API_ENDPOINT + '/Questions/' + questionID + '/downvote/', { }, {headers: headersObj})
    .subscribe((res) => { console.log(res); }, (err) => { console.log(err); });
  }

  upvoteQuestion(token, questionID) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    this.http.post(API_ENDPOINT + '/Questions/ ' +questionID + '/upvote/', { }, {headers: headersObj})
      .subscribe((res) => { console.log(res); }, (err) => { console.log(err); });
  }

  getAnswerById(token, answerID) {
    return this.http.get(API_ENDPOINT + '/Answers/' + answerID)
      .map(res => res.json());
  }

  //TODO: TODO: remove when backend is ready for real data
  getUserById(id) {
    return this.userService.loadUserById(id);
  }

  //TODO: remove when backend is ready for real data
  initDummyData() {
    return (
      []
    );
  }

}
