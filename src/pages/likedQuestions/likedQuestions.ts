import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-likedQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'likedQuestions.html'
})
export class LikedQuestionsPage {

  public questions: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = this.questionService.loadAllQuestions();
  }

}
