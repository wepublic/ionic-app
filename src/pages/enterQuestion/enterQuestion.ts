import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { TagsHelper } from "../../utils/TagsHelper";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { MainMenuPage } from "../mainMenu/mainMenu";

@Component({
  selector: 'page-enterQuestion',
  templateUrl: 'enterQuestion.html'
})
export class EnterQuestionPage {

  public maxTags = 3;
  public maxTextLength = 250;
  public tags = [];
  public selectedTags: number[] = [];
  public questionText: string = "";

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private translate: TranslateService,
              private tagsHelper: TagsHelper, private questionService: QuestionServiceProvider) {
    this.tags = this.tagsHelper.getAllTagObjectsSorted();
  }

  showErrorToast(text: string) {
    this.translate.get(text, {value: 'world'})
    .subscribe(text => this.toastCtrl.create({ message: text, duration: 3000 }).present());
  }
    
  onSelectTags() {
    if (this.selectedTags.length > 3) this.selectedTags.length = 3;
  }
    
  publishQuestion() {
    console.log('publish question');
    console.log(this.questionText);
    console.log(this.selectedTags);
    if (this.selectedTags === undefined || this.selectedTags.length == 0) {
      this.showErrorToast('ENTERQUESTION.ERROR_NO_TAGS');
      return;
    }        
    if (this.questionText === undefined || this.questionText.length < 10) {
      this.showErrorToast('ENTERQUESTION.ERROR_SHORT_TEXT');
      return;
    } 
    this.questionService.publishQuestion(this.questionText, this.selectedTags)
    .subscribe(data => { console.log(data); });
    this.navCtrl.setRoot(MainMenuPage);
  }

}
