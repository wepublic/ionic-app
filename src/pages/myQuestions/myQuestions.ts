import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnterQuestionPage } from '../enterQuestion/enterQuestion';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utlis/TagsHelper";

@Component({
  selector: 'page-myQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'myQuestions.html'
})
export class MyQuestionsPage {

  enterQuestionView = EnterQuestionPage;
  public questions;
  public allTags;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage,
        public tagsHelper: TagsHelper) {
    this.loadQuestions();
    this.allTags = this.storage.get('allTags');
  }

  ionViewWillEnter() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadMyQuestions(val).subscribe((data) => {
        if (data !== undefined && data !== []) {
          this.questions = data.map((question) => {
            return question;
          });
        }
      });
    });
  }

  loadTags(question) {
    return this.tagsHelper.loadTagObjects(question.tags);
  }

}
