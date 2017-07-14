import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
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
    content: string,
    creator: any,
    category: string,
    likeCount: number,
    dislikeCount: number,
    flags: any,
    answer: any,
  }>;

  //TODO: remove UserService when backend is ready for real data
  constructor(public userService: UserServiceProvider, public http: Http, public storage: Storage) {
    this.questionDummies = this.initDummyData();
  }

  getToken() { return Observable.fromPromise(this.storage.get('localUserToken')); }
  getHeaders(token) { return {headers: new Headers({Authorization: 'Token ' + token})}; }

  loadAnsweredQuestion(questionID) {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/'+questionID+'/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadAllQuestions() {
    return this.http.get(API_ENDPOINT + '/Questions/')
      .map(res => res.json());
  }

  loadLikedQuestions() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/upvotes/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadMyQuestions() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/my/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadRandomQuestion() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/random/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadQuestionByTagId(tagId) {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Tags/' + tagId + '/Questions/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  publishQuestion(nText, nTags) {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Questions/',
        {
          text: nText,
          tags: nTags
        },
        this.getHeaders(token)
      )
    );
  }

  downvoteQuestion(questionID) {
    this.getToken()
    .mergeMap(token => this.http.post(API_ENDPOINT + '/Questions/' + questionID + '/downvote/', { }, this.getHeaders(token)))
    .subscribe((res) => { console.log(res); }, (err) => { console.log(err); });
  }

  upvoteQuestion(questionID) {
    this.getToken()
    .mergeMap(token => this.http.post(API_ENDPOINT + '/Questions/ ' +questionID + '/upvote/', { }, this.getHeaders(token)))
    .subscribe((res) => { console.log(res); }, (err) => { console.log(err); });
  }

  getAnswerById(answerID) {
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
      [
        {
          id: 0,
          content: "This is a question",
          creator: this.getUserById(1),
          category: "#norealquestion",
          likeCount: 10,
          dislikeCount: 100,
          flags: [
            {
              id: 0,
              reason: "spam",
              flagCount: 43,
            },
            {
              id: 1,
              reason: "inappropriate",
              flagCount: 2,
            }
          ],
          answer: {
            id: 0,
            content: "Stupid question",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        },
        {
          id: 1,
          content: "Alles fake?",
          creator: this.getUserById(2),
          category: "#fake",
          likeCount: 100,
          dislikeCount: 100,
          flags: [],
          answer: {
            id: 0,
            content: "The answer is Baum!",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        },
        {
          id: 2,
          content: "Why Baum?",
          creator: this.getUserById(2),
          category: "#baum",
          likeCount: 3000,
          dislikeCount: 100,
          flags: [],
          answer: {
            id: 0,
            content: "The answer is Baum!",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        },
        {
          id: 3,
          content: "NEEEEIIIINNN",
          creator: this.getUserById(2),
          category: "#whatever",
          likeCount: 1000,
          dislikeCount: 100,
          flags: [],
          answer: {
            id: 0,
            content: "The answer is Baum!",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        }
      ]
    );
  }

}
