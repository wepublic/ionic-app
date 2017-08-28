import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { TranslatedNotificationController } from "../../utils/TranslatedNotificationController";
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
              private notifier: TranslatedNotificationController,
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
      err => { loading.dismiss(); this.notifier.showToast('CONNERROR'); },
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

  downvote(question) {
    console.log('thumbs down for ' + question.id);
    Observable.timer(1000).subscribe(res => this.questions.shift());
    this.questionService.downvoteQuestion(question.id)
    .subscribe(null, err => this.notifier.showToast('CONNERROR'));
    this.questionService.loadRandomQuestion().subscribe(res => this.questions.push(res));
  }

  upvote(question) {
    console.log('thumbs up for ' + question.id);
    Observable.timer(1000).subscribe(res => this.questions.shift());
    this.questionService.upvoteQuestion(question.id)
    .subscribe(null, err => this.notifier.showToast('CONNERROR'));
    this.questionService.loadRandomQuestion().subscribe(res => this.questions.push(res));
  }

  reportQuestion(question) {
    this.questionService.reportQuestion(question.id)
    .subscribe(
      () => this.notifier.showAlert('', 'QUESTION.REPORT_CONFIRM', 'OK'),
      err => this.notifier.showToast('CONNERROR'));
  }
}
