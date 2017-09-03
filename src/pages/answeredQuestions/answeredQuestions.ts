import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Refresher } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import { TranslatedNotificationController } from '../../utils/TranslatedNotificationController';
import {TagsHelper} from "../../utils/TagsHelper";
import {AnswersPage} from "../answers/answers";
import {SearchQuestionsPage} from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-answeredQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'answeredQuestions.html'
})
export class AnsweredQuestionsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  public questions: any;
  connectionErrorMsg: string;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider,
              public notifier: TranslatedNotificationController, public tagsHelper: TagsHelper) {
  }

  ionViewDidEnter() {
    this.refresher._top = this.content.contentTop + 'px';
    this.refresher.state = 'ready';
    this.refresher._onEnd();
  }

  loadQuestions(refresher: Refresher) {
    this.questionService.loadAnsweredQuestions().subscribe(
      data => {
        refresher.complete();
        this.questions = data;
        if (data.length) this.questionService.updateSeenAnsweredQuestions(data.map(d => d.id));
      },
      err => {
        refresher.complete();
        this.notifier.showToast('CONNERROR');
      }
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
}
