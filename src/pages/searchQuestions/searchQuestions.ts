import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, Refresher } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ConnectionErrorController } from '../../utils/connection-error';
import { TagsHelper } from "../../utils/TagsHelper";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { AnswersPage } from "../answers/answers";

@Component({
  selector: 'page-search',
  templateUrl: 'searchQuestions.html'
})
export class SearchQuestionsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  public tags: any[];
  public selectedTags: number[] = [];
  public questions = {
    'up_unvoted': [],
    'downvoted': []
  };
  public voting: boolean = false;

  constructor(private navCtrl: NavController, navParams: NavParams,
              private tagsHelper: TagsHelper, private errorCtrl: ConnectionErrorController,
              private questionService: QuestionServiceProvider) {
    this.tags = this.tagsHelper.getAllTagObjectsSorted();
    let tag = navParams.get('tag');
    console.log("Search questions for tag: " + tag);
    if (tag !== undefined) {
      this.selectedTags = [tag.id];
    }
  }

  ionViewDidEnter() {
    this.selectTags();
  }

  clearQuestions() {
    for (var key in this.questions) this.questions[key].length = 0;
  }

  getQuestionType(question) {
    var voted = question.voted;
    return (voted === false) ? 'downvoted' : 'up_unvoted';
  }

  selectTags() {
    this.refresher._top = this.content.contentTop + 'px';
    this.refresher.state = 'ready';
    this.refresher._onEnd();
  }

  loadQuestionsForTags() {
    console.log("Load questions for tags " + this.selectedTags);
    this.clearQuestions();
    let obs = [];
    for (let t of this.selectedTags) {
      obs.push(this.questionService.loadQuestionByTagId(t));
    }
    if (this.selectedTags.length == 0) obs.push(this.questionService.loadAllQuestions());
    Observable.forkJoin(obs)
    .subscribe(
      res => {
        var seen = [];
        var questions = [].concat.apply([], res)
        /* Filter questions with all tags */
        .filter(question => this.selectedTags.every(t => question.tags.includes(t)))
        /* Filter duplicate questions */
        .filter(question => seen.includes(question.id) ? false : seen.push(question.id));
        questions.forEach(q => this.questions[this.getQuestionType(q)].push(q));
        for (var key in this.questions) this.questions[key].sort((a, b) => b.upvotes - a.upvotes);
        this.refresher.complete();
      },
      err => { this.refresher.complete(); this.errorCtrl.show(); }
    );
  }

  loadAnswerPage(question) {
    this.navCtrl.push(AnswersPage, {question: question});
  }

  updateQuestion(question) {
    var questions = this.questions[this.getQuestionType(question)];
    questions[questions.indexOf(question)] = question;
  }

  upvoteQuestion(question) {
    console.log('thumbs up for question ' + question.id);
    this.questionService.upvoteQuestion(question.id).subscribe(
      question => this.updateQuestion(question),
      err => this.errorCtrl.show()
    );
  }

}
