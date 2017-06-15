import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-trendingQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'trendingQuestions.html'
})
export class TrendingQuestionsPage {

  public questions: any;
  messageConnectionError;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, translate: TranslateService, public questionService: QuestionServiceProvider,
  public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.loadQuestions();
  }

  ionViewWillEnter() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.loadAllQuestions().subscribe(data => {
      if (data !== undefined && data !== []) {
        if (data.hasOwnProperty('results')) {
          this.questions = data.results;
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

  loadTags(question) {
    return this.tagsHelper.loadTagObjects(question.tags);
  }

}
