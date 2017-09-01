import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {API_ENDPOINT} from '../../app/app.config';

/*
 * Question service provider
 */
@Injectable()
export class QuestionServiceProvider {

  constructor(public http: Http, public storage: Storage) {
  }

  getToken() { return Observable.fromPromise(this.storage.get('localUserToken')); }
  getHeaders(token) { return {headers: new Headers({Authorization: 'Token ' + token})}; }

  loadAnsweredQuestion(questionID) : Observable<any> {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/'+questionID+'/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadAllQuestions(params: string) {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/' + params, this.getHeaders(token))
        .map(res => res.json().results)
    );
  }

  loadAnsweredQuestions() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/?answered=true&ordering=-closed_date', this.getHeaders(token))
        .map(res => res.json().results)
    );
  }

  loadOpenQuestions() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/upvotes/?answered=false', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadRandomQuestion() {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/random/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  loadQuestionByTagId(tagId: number) {
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

  reportQuestion(questionID) {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Questions/' + questionID + '/report/', { reason: "unbekannt" }, this.getHeaders(token))
        .map(res => res.json())
    );
  }

  downvoteQuestion(questionID) {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Questions/' + questionID + '/downvote/', { }, this.getHeaders(token))
        .map(res => res.json())
    );
  }

  upvoteQuestion(questionID) : Observable<any> {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Questions/' + questionID + '/upvote/', { }, this.getHeaders(token))
        .map(res => res.json())
    );
  }

  getAnswersForQuestion(questionID) {
    return this.getToken().mergeMap(
      token => this.http.get(API_ENDPOINT + '/Questions/' + questionID + '/answers/', this.getHeaders(token))
        .map(res => res.json())
    );
  }

  downvoteAnswer(answerID) {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Answers/' + answerID + '/downvote/', { }, this.getHeaders(token))
        .map(res => res.json())
    );
  }

  upvoteAnswer(answerID) {
    return this.getToken().mergeMap(
      token => this.http.post(API_ENDPOINT + '/Answers/' + answerID + '/upvote/', { }, this.getHeaders(token))
        .map(res => res.json())
    );
  }

}
