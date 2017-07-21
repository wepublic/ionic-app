import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, public questionService: QuestionServiceProvider, public storage: Storage,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {

    this.messageConnectionError = this.translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.question = navParams.get('question');
    console.log(this.question);
    this.loadTags();
    //this.loadQuestion();
  }

  loadTags(){
    return this.tagsHelper.getTagObjects(this.question.tags);
  }

  loadQuestion(){
    this.storage.get('localUserToken').then((val) => {
      this.questionService.loadAnsweredQuestion(val, this.question.id).subscribe((data) => {
        if (data !== undefined && data !== []) {
          this.question = data;
          console.log(data); //TODO debug ausgabe
          console.log(data.answers); //TODO debug ausgabe
          for(let answer of data.answers){ //TODO not working
            console.log("in for"); //TODO debug ausgabe
            this.questionService.getAnswerById(val, answer.id).subscribe((data2 => {
              if (data !== undefined && data !== []) {
                console.log("data valid"); //TODO debug ausgabe
                console.log(data2);
                this.answers.push(data2);
              }
              else {
                console.log("data invalid"); //TODO debug ausgabe
                let toast = this.toastCtrl.create({
                  message: this.messageConnectionError,
                  duration: 3000
                });
                toast.present();
              }
            }));
          }
        }
        else {
          let toast = this.toastCtrl.create({
            message: this.messageConnectionError,
            duration: 3000
          });
          toast.present();
        }
      });
    });
  }
}
