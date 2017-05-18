import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = this.questionService.loadMyQuestions();
  }

}
