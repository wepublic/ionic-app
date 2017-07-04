import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TagsHelper} from "../../utils/TagsHelper";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import { Storage } from '@ionic/storage';
import {MainMenuPage} from "../mainMenu/mainMenu";

@Component({
  selector: 'page-enterQuestion',
  templateUrl: 'enterQuestion.html'
})
export class EnterQuestionPage {

  public tags = [];
  public selectedTags;
  public questionText;

  constructor(public navCtrl: NavController, public tagsHelper: TagsHelper, public questionService: QuestionServiceProvider,
      public storage: Storage) {
    this.initTagsArray();
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
    console.log(this.tags);
  }

  publishQuestion() {
    console.log('publish question');
    console.log(this.questionText);
    console.log(this.selectedTags);
    if (this.questionText !== undefined && this.selectedTags !== undefined) {
      if (this.questionText.length > 0 && this.selectedTags.length > 0) {
        this.storage.get('localUserToken').then((val) => {
          this.questionService.publishQuestion(this.questionText, this.selectedTags, val)
          .subscribe((data) => {
            console.log(data);
          });
          this.navCtrl.setRoot(MainMenuPage);
        });
      }
    }
  }

}
