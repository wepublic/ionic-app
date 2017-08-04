import { Component } from '@angular/core';

import {MyQuestionsPage} from "../myQuestions/myQuestions";
import {MenuController, NavController} from "ionic-angular";
import {NewsPage} from "../news/news";
import {EnterQuestionPage} from "../enterQuestion/enterQuestion";
import {AnsweredQuestionsPage} from "../answeredQuestions/answeredQuestions";

@Component({
  selector: 'page-main',
  templateUrl: 'mainMenu.html'
})
export class MainMenuPage {

  openQuestionsView = MyQuestionsPage;
  answeredQuestionsView = AnsweredQuestionsPage;
  enterQuestionView = EnterQuestionPage;
  newsView = NewsPage;

  constructor(menuCtrl: MenuController, public navCtrl: NavController) {
    menuCtrl.swipeEnable(true);
  }
}
