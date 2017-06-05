import { Component } from '@angular/core';

import {RandomQuestionsPage} from "../randomQuestions/randomQuestions";
import {AnswerTabsPage} from "../answerTabs/answerTabs";
import {NavController} from "ionic-angular";
import {EnterQuestionPage} from "../enterQuestion/enterQuestion";
import {SearchQuestionsPage} from "../searchQuestions/searchQuestions";

@Component({
  templateUrl: 'questionTabs.html'
})
export class QuestionTabsPage {

  tab1Root = RandomQuestionsPage;
  tab2Root = EnterQuestionPage;
  tab3Root = SearchQuestionsPage;

  answersTabs = AnswerTabsPage;

  constructor(public navCtrl: NavController) {

  }

  loadQuestions() {
    this.navCtrl.setRoot(this.answersTabs);
  }
}
