import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Content, Refresher } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";
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
  connectionErrorToast;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.connectionErrorToast = this.toastCtrl.create({
        message: res,
        duration: 3000
      });
    });
  }

  ionViewDidEnter() {
    this.refresher._top = this.content.contentTop + 'px';
    this.refresher.state = 'ready';
    this.refresher._onEnd();
  }

  loadQuestions(refresher: Refresher) {
    this.questionService.loadMyQuestions().subscribe(
      data => {
        refresher.complete();
        this.questions = data;
      },
      err => {
        refresher.complete();
        this.connectionErrorToast.present();
      }
    );
  }

  loadAnswerPage(question) {
    this.navCtrl.push(AnswersPage, {question: question});
  }

  loadSearchPageFunction(tag) {
    this.navCtrl.push(SearchQuestionsPage, {tag: tag});
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }
}
