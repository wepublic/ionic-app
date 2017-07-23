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
      [
        { id: 0, upvotes: 2, voted: true, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie sieht die Bildung in Zukunft aus?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 1, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was spricht heute noch gegen die Einführung der direkten Demokratie in Deutschland?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 2, upvotes: 2, voted: true, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was spricht gegen das G9?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 3, upvotes: 2, voted: true, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie wollen Sie der \"postfaktischen Politik\" entgegen wirken und Inhalte zum Mittelpunkt der Politik machen anstatt Ideologien? ", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 4, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was ist Ihre Meinung zu Europa und Asylpolitik?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 5, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Warum wird der unkontrollierte Zustrom an Flüchtlingen nicht begrenzt?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 6, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was sind die größten Probleme unserer wirtschaftlichen Entwicklung und wie wollen Sie diese beheben?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 7, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Werden Sie gerecht bezahlt?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 8, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Warum investieren Sie nicht mehr Geld in die Zukunft unserer Kinder?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
        { id: 9, upvotes: 2, voted: false, answers: [{ id: 0, user: 0}, { id: 1, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie wollen Sie der Flüchtlingskrise Herr werden, ohne die Abgehängten im eigenen Land aus den Augen zu verlieren?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 1]},
      ]
    );
  }

}
