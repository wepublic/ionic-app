import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";
import {AnswersPage} from "../answers/answers";
import {SearchQuestionsPage} from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-myQuestions',
  providers: [],
  templateUrl: 'myQuestions.html'
})
export class MyQuestionsPage {
  //This contains questions created by the user as well as liked questions now

  enterQuestionView = EnterQuestionPage;
  public questions;
  public allTags;
  messageConnectionError;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.allTags = this.storage.get('allTags');
    this.loadQuestions(null);
  }

  ionViewWillEnter() {
    this.loadQuestions(null);
  }

  /**
   * Loads questions from server;
   * Input: refresher of view for reloading questions; null for initial loading call
   */
  loadQuestions(refresher) {
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadMyQuestions(val).subscribe((data) => {
        if (data !== undefined && data !== []) {
          this.questions = data.map((question) => {
            return question;
          });
          if (refresher !== null) {
            refresher.complete();
          }
        }
        else{
          let toast = this.toastCtrl.create({
            message: this.messageConnectionError,
            duration: 3000
          });
          toast.present();
        }
      });
    });
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  loadAnswerPageFunction() {
    return (question) => { this.navCtrl.push(AnswersPage, {question: question}) };
  }

  loadSearchPageFunction() {
    return (tag) => { this.navCtrl.push(SearchQuestionsPage, {tag: tag}) };
  }
}
