import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-newQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'randomQuestions.html'
})
export class RandomQuestionsPage {

  public question: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider) {
    this.loadNewQuestion();
  }

  loadNewQuestion() {
    this.question = this.questionService.loadNewQuestion();
  }

}
