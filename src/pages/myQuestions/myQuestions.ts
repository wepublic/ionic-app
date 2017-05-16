import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';

@Component({
  selector: 'page-myQuestions',
  templateUrl: 'myQuestions.html'
})
export class MyQuestionsPage {

  enterQuestionView = EnterQuestionPage;

  constructor(public navCtrl: NavController) {

  }

}
