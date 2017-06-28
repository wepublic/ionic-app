import { Component } from '@angular/core';

import {MyQuestionsPage} from "../myQuestions/myQuestions";
import {NavController} from "ionic-angular";
import {NewsPage} from "../news/news";
import {EnterQuestionPage} from "../enterQuestion/enterQuestion";
import {AnsweredQuestionsPage} from "../answeredQuestions/answeredQuestions";

@Component({
  templateUrl: 'mainMenu.html'
})
export class MainMenuPage {

  openQuestionsView = MyQuestionsPage;
  answeredQuestionsView = AnsweredQuestionsPage;
  enterQuestionView = EnterQuestionPage;
  newsView = NewsPage;

  constructor(public navCtrl: NavController) {

  }
}
