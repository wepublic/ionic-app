import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { TagsHelper } from "../../utils/TagsHelper";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { MainMenuPage } from "../mainMenu/mainMenu";

@Component({
  selector: 'page-enterQuestion',
  templateUrl: 'enterQuestion.html'
})
export class EnterQuestionPage {

  public tags = [];
  public selectedTags;
  public questionText;

  private selectOptions = {
    title: ""
  };

  constructor(private navCtrl: NavController, translate: TranslateService,
              private tagsHelper: TagsHelper, private questionService: QuestionServiceProvider) {
    this.tags = this.tagsHelper.getAllTagObjectsSorted();
    translate.get('ENTERQUESTION.TAG_QUESTION', {value: 'world'}).subscribe((res: string) => this.selectOptions.title = res);
  }

  publishQuestion() {
    console.log('publish question');
    console.log(this.questionText);
    console.log(this.selectedTags);
    if (this.questionText !== undefined && this.selectedTags !== undefined) {
      if (this.questionText.length > 0 && this.selectedTags.length > 0) {
        this.questionService.publishQuestion(this.questionText, this.selectedTags)
        .subscribe(data => { console.log(data); });
        this.navCtrl.setRoot(MainMenuPage);
      }
    }
  }

}
