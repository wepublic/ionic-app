import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {API_ENDPOINT} from '../../app/app.config';
import {UserServiceProvider} from "../user-service/user-service";
import {Observable} from "rxjs/Observable";

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
  answerDummies: Array<{
    id: number,
    user: any,
    text: string,
  }>;

  qId=0;

  //TODO: remove UserService when backend is ready for real data
  constructor(public userService: UserServiceProvider, public http: Http) {
    this.questionDummies = this.initDummyData();
    this.answerDummies = this.initDummyDataAnswers();
  }

  loadAnsweredQuestion(token, questionID) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    // return this.http.get(API_ENDPOINT + '/Questions/'+questionID+'/', {headers: headersObj})
    //   .map(res => res.json());
    return Observable.of(this.questionDummies.filter((q: any) => q.answers.length > 0));
  }

  loadAllQuestions() {
    // return this.http.get(API_ENDPOINT + '/Questions/')
    //   .map(res => res.json());
    return Observable.of(this.questionDummies);
  }

  loadLikedQuestions(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    // return this.http.get(API_ENDPOINT + '/Questions/upvotes/', {headers: headersObj})
    //   .map(res => res.json());
    return Observable.of(this.questionDummies.filter((q: any) => q.user.id === 0));
  }

  loadMyQuestions(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    // return this.http.get(API_ENDPOINT + '/Questions/my/', {headers: headersObj})
    //   .map(res => res.json());
    return Observable.of(this.questionDummies.filter((q: any) => q.voted === true));
  }

  loadRandomQuestion(token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    // return this.http.get(API_ENDPOINT + '/Questions/random/', {headers: headersObj})
    //   .map(res => res.json());
    this.qId++;
    return this.questionDummies[this.qId % 10];
  }

  loadQuestionByTagId(tagId) {
    // return this.http.get(API_ENDPOINT + '/Tags/' + tagId + '/Questions/')
    //   .map(res => res.json());
    return Observable.of(this.questionDummies.filter((q: any) => q.tags.includes(tagId)));
  }

  publishQuestion(nText, nTags, token) {
    const headersObj = new Headers({Authorization: 'Token ' + token});
    // return this.http.post(API_ENDPOINT + '/Questions/',
    //   {
    //     text: nText,
    //     tags: nTags
    //   },
    //   {
    //     headers: headersObj
    //   }
    // );
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
    // return this.http.get(API_ENDPOINT + '/Answers/' + answerID)
    //   .map(res => res.json());
    return Observable.of(this.answerDummies[answerID]);
  }

  //TODO: TODO: remove when backend is ready for real data
  getUserById(id) {
    return this.userService.loadUserById(id);
  }

  //TODO: remove when backend is ready for real data
  initDummyData() {
    return (
      [
        { id: 0, upvotes: 2, voted: true, answers: [{ id: 0, user: 0}, { id: 1, user: 1}, { id: 2, user: 1}, { id: 3, user: 1}], user: { url: "http://test.de", id: 0, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie sieht die Bildung in Zukunft aus?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0]},
        { id: 1, upvotes: 2, voted: false, answers: [{ id: 4, user: 0}, { id: 5, user: 1}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was spricht heute noch gegen die Einführung der direkten Demokratie in Deutschland?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [6]},
        { id: 2, upvotes: 2, voted: true, answers: [{ id: 7, user: 0}, { id: 6, user: 1}], user: { url: "http://test.de", id: 0, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was spricht gegen das G9?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0]},
        { id: 3, upvotes: 2, voted: true, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie wollen Sie der \"postfaktischen Politik\" entgegen wirken und Inhalte zum Mittelpunkt der Politik machen anstatt Ideologien? ", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [6]},
        { id: 4, upvotes: 2, voted: false, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was ist Ihre Meinung zu Europa und Asylpolitik?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [4, 5]},
        { id: 5, upvotes: 2, voted: false, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Warum wird der unkontrollierte Zustrom an Flüchtlingen nicht begrenzt?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [1, 4]},
        { id: 6, upvotes: 2, voted: false, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Was sind die größten Probleme unserer wirtschaftlichen Entwicklung und wie wollen Sie diese beheben?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [3]},
        { id: 7, upvotes: 2, voted: false, answers: [{ id: 8, user: 0}], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Werden Sie gerecht bezahlt?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [2]},
        { id: 8, upvotes: 2, voted: false, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Warum investieren Sie nicht mehr Geld in die Zukunft unserer Kinder?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [0, 2]},
        { id: 9, upvotes: 2, voted: false, answers: [], user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wie wollen Sie der Flüchtlingskrise Herr werden, ohne die Abgehängten im eigenen Land aus den Augen zu verlieren?", time_created: "2017-06-27T14:33:39.300687Z", last_modified: "2017-06-27T14:33:39.300687Z", tags: [1]},
      ]);
  }
  initDummyDataAnswers() {
    return (
      [
        { id: 0, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Bildung ist ein Grundrecht und muss daher kostenlos für alle sein – von der Kita bis zum Studium. "},
        { id: 1, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wir Grüne wollen Ganztagesschulen fördern als Schlüssel zu guter Bildung und Chancengleichheit."},
        { id: 2, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Die Zukunft der Bildung ist klar eine Priorität in der Bildungsrepublik Deutschland. Dazu gehört eine moderne Ausstattung mit Computertechnik, digitale Lernangebote und eine Vernetzung der Schule."},
        { id: 3, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wir fühlen uns dem Humboldtschen Bildungsideal verpflichtet. Die Freiheit von Forschung und Lehre sind unabdingbare Grundvoraussetzungen für wissenschaftlichen Fortschritt."},
        { id: 4, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Es spricht nichts gegen mehr direkte Demokratie in Deutschland. Wir wollen mehr Mitwirkungsrechte der Menschen bei der politischen Willensbildung. "},
        { id: 5, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Wir befürworten direkte Demokratie in Form von bundesweiten Volksentscheiden. Wir wollen Volksabstimmungen in Deutschland z.B. über wichtige europäische Entscheidungen."},
        { id: 6, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Die Bundesregierung hat in der Flüchtlingskrise auf ganzer Linie versagt. Eine Situation wie der unkontrollierte Zustrom von Flüchtlingen hätte es nie geben dürfen und mit uns auch nicht gegeben."},
        { id: 7, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Asyl ist ein Menschenrecht. Wir können als Rechtstaat nicht Menschen in Not an unseren Grenzen abweisen, ohne zu prüfen ob ihnen das Recht auf Schutz laut Genfer Flüchtlingskonvention zusteht."},
        { id: 8, user: { url: "http://test.de", id: 5, username: "angela.merkel@cdu.de", profile_pic: null },
          text: "Man geht nicht in die Politik, wenn es einem darum geht viel Geld zu verdienen. Man geht in die Politik um etwas zu verändern."},
      ]);
  }

}
