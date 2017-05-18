import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-allQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'allQuestions.html'
})
export class AllQuestionsPage {

  public questions: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = this.questionService.loadAllQuestions();
  }

}
