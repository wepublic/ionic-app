import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utlis/TagsHelper";

@Component({
  selector: 'page-likedQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'likedQuestions.html'
})
export class LikedQuestionsPage {

  public questions: any;

  constructor(public navCtrl: NavController, public questionService: QuestionServiceProvider, public storage: Storage,
      public tagsHelper: TagsHelper) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadLikedQuestions(val).subscribe((data) => {
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
