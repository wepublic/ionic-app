import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {TagsHelper} from "../../utils/TagsHelper";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-search',
  templateUrl: 'searchQuestions.html'
})
export class SearchQuestionsPage {

  public tags;
  public searchKey;
  public showTags: boolean;
  public questions;
  public messageConnectionError;

  constructor(public navCtrl: NavController, public tagsHelper: TagsHelper,
              public questionService: QuestionServiceProvider, public toastCtrl: ToastController,) {
    this.initTagsArray();
    this.showTags = true;
  }

  initTagsArray() {
    this.tags = this.tagsHelper.getAllTagObjects();
    this.tags.sort(function(a, b) {
      var tagA = a.text.toUpperCase(); // ignore upper and lowercase
      var tagB = b.text.toUpperCase(); // ignore upper and lowercase
      if (tagA < tagB) {
        return -1;
      }
      if (tagA > tagB) {
        return 1;
      }
      return 0;
    });
  }

  refreshTags(event) {
    this.showTags = true;

    // Reset items back to all of the items
    this.tags = this.tagsHelper.getAllTagObjects();

    // set val to the value of the ev target
    var val = event.target.value;

    this.searchKey = val;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tags = this.tags.filter((item) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }).sort();
    }
  }

  selectTag(tagObject) {
    this.searchKey = tagObject.text;
    this.showTags = false;
    this.loadQuestionsByTagId(tagObject.id);
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  loadQuestionsByTagId(tagId) {
    this.questionService.loadQuestionByTagId(tagId).subscribe(data => {
      if (data !== undefined && data !== []) {
        if (data.hasOwnProperty('results')) {
          this.questions = data.results;
          console.log(data);
        }
      }
      else{
        let toast = this.toastCtrl.create({
          message: this.messageConnectionError,
          duration: 3000
        });
        toast.present();
      }
    });
  }

  showTagList() {
    this.showTags = true;
  }

}

