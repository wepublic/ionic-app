import { Component } from '@angular/core';

import {MyQuestionsPage} from "../myQuestions/myQuestions";
import {NavController} from "ionic-angular";
import {TrendingQuestionsPage} from "../trendingQuestions/trendingQuestions";
import {LikedQuestionsPage} from "../likedQuestions/likedQuestions";
import {NewsPage} from "../news/news";
import {EnterQuestionPage} from "../enterQuestion/enterQuestion";

@Component({
  templateUrl: 'mainMenu.html'
})
export class MainMenuPage {

  openQuestionsView = MyQuestionsPage;
  answeredQuestionsView = MyQuestionsPage;
  enterQuestionsView = EnterQuestionPage;
  newsView = NewsPage;

  constructor(public navCtrl: NavController) {

  }
}
