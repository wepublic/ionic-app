import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-newQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'randomQuestions.html'
})
export class RandomQuestionsPage {

  public question: any;
  messageConnectionError;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, translate: TranslateService, public questionService: QuestionServiceProvider) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.loadNewQuestion();
  }

  ionViewWillEnter() {
    this.loadNewQuestion();
  }

  loadNewQuestion() {
    this.question = this.questionService.loadNewQuestion();
    if (this.question === undefined){
      let toast = this.toastCtrl.create({
        message: this.messageConnectionError,
        duration: 3000
      });
      toast.present();
    }
  }

  downvote() {
    console.log('thumbs down');
  }

  upvote() {
    console.log('thumbs up');
  }

}
