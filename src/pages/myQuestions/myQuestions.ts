import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-myQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'myQuestions.html'
})
export class MyQuestionsPage {

  enterQuestionView = EnterQuestionPage;
  public questions: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.storage.get('localUserToken').then((val) => {
      console.log("hello token "+val);
      this.questions = this.questionService.loadMyQuestions(val);
    });
  }

}
