import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";
import {SearchQuestionsPage} from '../searchQuestions/searchQuestions';

@Component({
  selector: 'page-answers',
  providers: [QuestionServiceProvider],
  templateUrl: 'answers.html'
})
export class AnswersPage {
  //This contains all answered questions

  public questions: any;
  messageConnectionError;
  question;
  answers: any[] = [];
  likePerc = 66;

  constructor(public navCtrl: NavController, private navParams: NavParams, public questionService: QuestionServiceProvider,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {

    this.messageConnectionError = this.translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
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
      this.questionService.getAnswersForQuestion(this.question.id)
      .subscribe(data => {
        console.log(data);
        this.answers = data;
       }, err => {
        let toast = this.toastCtrl.create({
          message: this.messageConnectionError,
          duration: 3000
        });
        toast.present();
      });
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
