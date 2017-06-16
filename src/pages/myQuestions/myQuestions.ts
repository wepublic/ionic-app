import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-myQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'myQuestions.html'
})
export class MyQuestionsPage {

  enterQuestionView = EnterQuestionPage;
  public questions;
  public allTags;
  messageConnectionError;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.loadQuestions();
    this.allTags = this.storage.get('allTags');
  }

  ionViewWillEnter() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadMyQuestions(val).subscribe((data) => {
        if (data !== undefined && data !== []) {
          this.questions = data.map((question) => {
            return question;
          });
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

}
