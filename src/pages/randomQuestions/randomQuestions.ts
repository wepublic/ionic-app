import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { ConnectionErrorController } from '../../utils/connection-error';
import { TagsHelper } from "../../utils/TagsHelper";
import { AnswersPage } from "../answers/answers";
import { SearchQuestionsPage } from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-randomQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'randomQuestions.html'
})
export class RandomQuestionsPage {
  questions = [];

  constructor(private navCtrl: NavController, private loadCtrl: LoadingController,
              private errorCtrl: ConnectionErrorController,
              private questionService: QuestionServiceProvider, private tagsHelper: TagsHelper) {
  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create();
    loading.present();
    Observable.forkJoin(
      this.questionService.loadRandomQuestion(),
      this.questionService.loadRandomQuestion(),
      this.questionService.loadRandomQuestion())
    .subscribe(
      res => this.questions = this.questions.concat(res),
      err => { loading.dismiss(); this.errorCtrl.show(); },
      () => loading.dismiss()
    );
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  loadAnswerPage(question) {
    this.navCtrl.push(AnswersPage, {question: question});
  }

  loadSearchPage(tag) {
    this.navCtrl.push(SearchQuestionsPage, {tag: tag});
  }

  upvote(question) {
    console.log('thumbs up for ' + question.id);
    Observable.timer(1000).withLatestFrom(this.questionService.loadRandomQuestion())
    .subscribe(
      res => { this.questions.push(res[1]); let q = this.questions.shift(); console.log(res[1], " remove " + q.id); },
      err => this.questions.shift()
    );
    this.questionService.upvoteQuestion(question.id)
    .subscribe(
      null,
      err => { this.errorCtrl.show(); }
    );
  }
}
