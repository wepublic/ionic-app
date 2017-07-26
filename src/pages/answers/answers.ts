import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private navParams: NavParams, public questionService: QuestionServiceProvider,
              public toastCtrl: ToastController, public translate: TranslateService, public tagsHelper: TagsHelper) {

    this.messageConnectionError = this.translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.question = navParams.get('question');
    console.log(this.question);
    this.loadTags();
    this.loadAnswers();
    //this.loadQuestion();
  }

  loadTags(){
    return this.tagsHelper.getTagObjects(this.question.tags);
  }

  // loadQuestion(){
  //   this.storage.get('localUserToken').then((val) => {
  //     this.questionService.loadAnsweredQuestion(val, this.question.id).subscribe((data) => {
  //       if (data !== undefined && data !== []) {
  //         this.question = data;
  //       }
  //       else {
  //         let toast = this.toastCtrl.create({
  //           message: this.messageConnectionError,
  //           duration: 3000
  //         });
  //         toast.present();
  //       }
  //     });
  //   });
  // }

  loadAnswers(){
    if(this.question !== undefined && this.question !== []){
      for (let answer of this.question.answers) {
        this.questionService.getAnswerById(answer.id).subscribe(data => {
          if (data !== undefined && data !== []) {
            this.answers.push(data);
          } else {
            let toast = this.toastCtrl.create({
              message: this.messageConnectionError,
              duration: 3000
            });
            toast.present();
          }
        });
      }
    };
  }

  downvote(answer) {
    console.log('thumbs down ' + answer.id);
    this.questionService.downvoteAnswer(answer.id);
    this.loadAnswers();
  }

  upvote(answer) {
    console.log('thumbs up ' + answer.id);
    this.questionService.upvoteAnswer(answer.id);
    this.loadAnswers();
  }

}
