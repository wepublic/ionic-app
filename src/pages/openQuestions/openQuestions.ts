import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Refresher } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import { TranslatedNotificationController } from '../../utils/TranslatedNotificationController';
import {TagsHelper} from "../../utils/TagsHelper";
import {AnswersPage} from "../answers/answers";
import {SearchQuestionsPage} from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-open-questions',
  providers: [QuestionServiceProvider],
  templateUrl: 'openQuestions.html'
})
export class OpenQuestionsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  enterQuestionView = EnterQuestionPage;
  public questions: Array<any>;
  public allTags;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage,
              private notifier: TranslatedNotificationController, public tagsHelper: TagsHelper) {
    this.allTags = this.storage.get('allTags');
  }

  ionViewDidEnter() {
    this.refresher._top = this.content.contentTop + 'px';
    this.refresher.state = 'ready';
    this.refresher._onEnd();
  }

  loadQuestions(refresher: Refresher) {
    this.questionService.loadOpenQuestions().subscribe(
      data => {
        refresher.complete();
        data.sort((a, b) => b.upvotes - a.upvotes);
        this.questions = data;
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
