import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectionErrorController } from '../../utils/connection-error';
import {TagsHelper} from "../../utils/TagsHelper";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {AnswersPage} from "../answers/answers";

@Component({
  selector: 'page-search',
  templateUrl: 'searchQuestions.html'
})
export class SearchQuestionsPage {

  public tags;
  public selectedTag = { 'text': '' };
  public loading: boolean;
  public showTags: boolean;
  public questions: Array<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public tagsHelper: TagsHelper,
              public questionService: QuestionServiceProvider, public errorCtrl: ConnectionErrorController) {
    this.tags = this.tagsHelper.getAllTagObjectsSorted();
    this.loading = false;
    this.showTags = true;
    let tag = navParams.get('tag');
    console.log("Tag: " + tag);
    if (tag !== undefined) this.selectTag(tag);
  }

  refreshTags(event) {
    this.loading = false;
    this.showTags = true;

    // Reset items back to all of the items
    this.tags = this.tagsHelper.getAllTagObjects();

    // set val to the value of the ev target
    var val = event.target.value;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tags = this.tags.filter((item) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }).sort();
    }
  }

  selectTag(tag) {
    this.selectedTag = tag;
    this.showTags = false;
    this.loadQuestionsByTagId(tag.id);
  }

  loadQuestionsByTagId(tagId) {
    console.log("Load questions for tag " + tagId);
    this.loading = true;
    this.questions = [];
    this.questionService.loadQuestionByTagId(tagId).subscribe(
      data => { this.loading = false; this.questions = data; },
      err =>  { this.loading = false; this.errorCtrl.show(); } 
    );
  }

  loadQuestionsByTag(tag) {
    this.loadQuestionsByTagId(tag.id);
  }

  loadAnswerPage(question) {
    this.navCtrl.push(AnswersPage, {question: question});
  }

  upvoteQuestion(question) {
    console.log('thumbs up for question ' + question.id);
    this.questionService.upvoteQuestion(question.id).subscribe(
      question => this.loadQuestionsByTag(this.selectedTag),
      err => this.errorCtrl.show() 
    );
  }

  showTagList() {
    this.showTags = true;
  }

}
