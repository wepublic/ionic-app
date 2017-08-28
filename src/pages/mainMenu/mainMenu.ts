import { Component } from '@angular/core';

import { OpenQuestionsPage } from "../openQuestions/openQuestions";
import { NewsPage } from "../news/news";
import { EnterQuestionPage } from "../enterQuestion/enterQuestion";
import { AnsweredQuestionsPage } from "../answeredQuestions/answeredQuestions";

@Component({
  selector: 'page-main',
  templateUrl: 'mainMenu.html'
})
export class MainMenuPage {

  openQuestionsView = OpenQuestionsPage;
  answeredQuestionsView = AnsweredQuestionsPage;
  enterQuestionView = EnterQuestionPage;
  newsView = NewsPage;

  constructor() {
  }

}
