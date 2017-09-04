import { Component } from '@angular/core';

import { NewsServiceProvider } from "../../providers/news-service/news-service";

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
  unseenNews: number = 0;

  constructor(private newsService: NewsServiceProvider) {
  }

  ionViewWillEnter() {
    this.newsService.unseenNews().subscribe(unseen => this.unseenNews = unseen);
  }

}
