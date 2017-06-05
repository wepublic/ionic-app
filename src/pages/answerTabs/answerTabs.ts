import { Component } from '@angular/core';

import {MyQuestionsPage} from "../myQuestions/myQuestions";
import {NavController} from "ionic-angular";
import {QuestionTabsPage} from "../questionTabs/questionTabs";
import {TrendingQuestionsPage} from "../trendingQuestions/trendingQuestions";
import {LikedQuestionsPage} from "../likedQuestions/likedQuestions";
import {SearchQuestionsPage} from "../searchQuestions/searchQuestions";

@Component({
  templateUrl: 'answerTabs.html'
})
export class AnswerTabsPage {

  tab1Root = MyQuestionsPage;
  tab2Root = TrendingQuestionsPage;
  tab3Root = LikedQuestionsPage;
  tab4Root = SearchQuestionsPage;

  questionsTabs = QuestionTabsPage;

  constructor(public navCtrl: NavController) {

  }

  loadQuestions() {
    this.navCtrl.setRoot(this.questionsTabs);
  }
}
