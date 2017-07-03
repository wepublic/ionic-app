import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-answers',
  providers: [QuestionServiceProvider],
  templateUrl: 'answers.html'
})
export class AnswersPage {
  //This contains all answered questions

  public questions: any;
  messageConnectionError;
  question;

  constructor(public navCtrl: NavController, private navParams: NavParams, public questionService: QuestionServiceProvider, public storage: Storage,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {

    this.messageConnectionError = this.translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.question = navParams.get('question');
    //this.loadQuestion();
  }

  loadQuestion(){
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadAnsweredQuestion(val, this.question.id).subscribe((data) => {
        if (data !== undefined && data !== []) {
          this.question = data;
        }
        else {
          let toast = this.toastCtrl.create({
            message: this.messageConnectionError,
            duration: 3000
          });
          toast.present();
        }
      });
    });
  }
}
