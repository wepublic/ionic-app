import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from "@ngx-translate/core";
import { ConnectionErrorController } from '../../utils/connection-error';
import { TagsHelper } from "../../utils/TagsHelper";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { AnswersPage } from "../answers/answers";

@Component({
  selector: 'page-search',
  templateUrl: 'searchQuestions.html'
})
export class SearchQuestionsPage {

  public tags: any[];
  public selectedTags: number[];
  public loading: boolean;
  public questions: Array<any>;
  private selectOptions = {
    title: ""
  };

  constructor(private navCtrl: NavController, navParams: NavParams, translate: TranslateService,
              private tagsHelper: TagsHelper, private errorCtrl: ConnectionErrorController,
              private questionService: QuestionServiceProvider) {
    translate.get('ENTERQUESTION.TAG_QUESTION', {value: 'world'}).subscribe((res: string) => this.selectOptions.title = res);
    this.tags = this.tagsHelper.getAllTagObjectsSorted();
    this.loading = false;
    let tag = navParams.get('tag');
    console.log("Search questions for tag: " + tag);
    if (tag !== undefined) {
      this.selectedTags = [tag.id];
      this.selectTags();
    }
  }

  selectTags() {
    console.log("Load questions for tags " + this.selectedTags);
    this.loading = true;
    this.questions = [];
    let obs = [];
    for (let t of this.selectedTags) {
      obs.push(this.questionService.loadQuestionByTagId(t));
    }
    Observable.forkJoin(obs)
    .subscribe(
      res => {
        var seen = [];
        this.loading = false;
        this.questions = [].concat.apply([], res)
        /* Filter questions with all tags */
        .filter(question => this.selectedTags.every(t => question.tags.includes(t)))
        /* Filter duplicate questions */
        .filter(question => seen.includes(question.id) ? false : seen.push(question.id));
        console.log(this.questions);
      },
      err => { this.loading = false; this.errorCtrl.show(); }
    );
  }

  loadAnswerPage(question) {
    this.navCtrl.push(AnswersPage, {question: question});
  }

  upvoteQuestion(question) {
    console.log('thumbs up for question ' + question.id);
    this.questionService.upvoteQuestion(question.id).subscribe(
      question => this.selectTags(),
      err => this.errorCtrl.show()
    );
  }

}
