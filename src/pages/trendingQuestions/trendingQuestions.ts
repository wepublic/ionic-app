import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utlis/TagsHelper";

@Component({
  selector: 'page-trendingQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'trendingQuestions.html'
})
export class TrendingQuestionsPage {

  public questions: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider,
      public tagsHelper: TagsHelper) {
    this.loadQuestions();
  }

  ionViewWillEnter() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.loadAllQuestions().subscribe(data => {
      if (data !== undefined && data !== []) {
        if (data.hasOwnProperty('results')) {
          this.questions = data.results;
        }
      }
    });
  }

  loadTags(question) {
    return this.tagsHelper.loadTagObjects(question.tags);
  }

}
