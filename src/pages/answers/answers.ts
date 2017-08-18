import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import { ConnectionErrorController } from '../../utils/connection-error';
import {TagsHelper} from "../../utils/TagsHelper";
import {SearchQuestionsPage} from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-answers',
  providers: [QuestionServiceProvider],
  templateUrl: 'answers.html'
})
export class AnswersPage {
  //This contains all answered questions

  public questions: any;
  connectionErrorMsg: string;
  question;
  answers: any[] = [];
  likePerc = 66;

  constructor(private navParams: NavParams,
              public navCtrl: NavController, public errorCtrl: ConnectionErrorController,
              public questionService: QuestionServiceProvider, public tagsHelper: TagsHelper) {
    this.question = navParams.get('question');
    console.log(this.question);
    this.loadTags();
    this.loadAnswers();
  }

  loadTags(){
    return this.tagsHelper.getTagObjects(this.question.tags);
  }

  loadAnswers() {
    if (this.question !== undefined && this.question !== []) {
      this.questionService.getAnswersForQuestion(this.question.id).subscribe(
        data => { console.log(data); this.answers = data;},
        err => this.errorCtrl.show()
      );
    };
  }

  downvote(answer) {
    console.log('thumbs down ' + answer.id);
    this.questionService.downvoteAnswer(answer.id).
    subscribe(updatedAnswer => { this.loadAnswers(); });
  }

  upvote(answer) {
    console.log('thumbs up ' + answer.id);
    this.questionService.upvoteAnswer(answer.id).
    subscribe(updatedAnswer => { this.loadAnswers(); });
  }

  upvoteQuestion(question) {
    console.log('thumbs up for question ' + question.id);
    this.questionService.upvoteQuestion(question.id)
    .subscribe(question => {
       console.log(question);
       this.question = question;
     });
  }

  loadSearchPage(tag) {
    this.navCtrl.push(SearchQuestionsPage, {tag: tag});
  }
}
