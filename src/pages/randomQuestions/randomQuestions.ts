import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TranslateService} from "@ngx-translate/core";
import { Storage } from '@ionic/storage';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {TagsHelper} from "../../utils/TagsHelper";

@Component({
  selector: 'page-randomQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'randomQuestions.html'
})
export class RandomQuestionsPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  //public question: any;
  messageConnectionError;

  currentQuestion;
  questions: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  allTags;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, translate: TranslateService,
              public questionService: QuestionServiceProvider, public storage: Storage, public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.currentQuestion = undefined;
    this.allTags = this.tagsHelper.getAllTagObjects();
    this.questions = [];
    this.initSwipe();
    this.loadNewQuestion();
    console.log('all Tags');
    console.log(this.allTags);
  }

  ionViewWillEnter() {
    if (!(this.questions !== [] || this.questions.length > 0)) {
      this.loadNewQuestion();
    }
  }

  downvote() {
    console.log('thumbs down');
    this.questions.pop();
    //TODO: send downvote to server
    this.loadNewQuestion();
  }

  upvote() {
    console.log('thumbs up');
    this.questions.pop();
    //TODO: send upvote to server
    this.loadNewQuestion();
  }

  /**
   *
   *
   * THIS IS THE SWIPE LOGIC START
   *
   *
   */

  initSwipe() {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Add new questions to our array
  loadNewQuestion() {
    const newQuestion = this.questionService.loadRandomQuestion(null);
    if (newQuestion === undefined){
      let toast = this.toastCtrl.create({
        message: this.messageConnectionError,
        duration: 3000
      });
      toast.present();
    } else {
      //TODO: remove when real data
      //if necessary for dummy data because of cached views
      if (this.currentQuestion === undefined) {
        this.questions.push(newQuestion);
        this.currentQuestion = newQuestion;
        console.log(this.questions);
      } else if (newQuestion.id !== this.currentQuestion.id) {
        this.questions.push(newQuestion);
        this.currentQuestion = newQuestion;
        console.log(this.questions);
      } else {
        this.loadNewQuestion();
      }
    }
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  /**
   *
   *
   * THIS IS THE SWIPE LOGIC END
   *
   *
   */

}
