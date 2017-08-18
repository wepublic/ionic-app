import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";

import {
  StackConfig,
  Direction,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

@Component({
  selector: 'page-randomQuestions',
  providers: [QuestionServiceProvider],
  templateUrl: 'randomQuestions.html'
})
export class RandomQuestionsPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  messageConnectionError;

  questions = [];
  stackConfig: StackConfig;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, translate: TranslateService,
              public questionService: QuestionServiceProvider, public tagsHelper: TagsHelper) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.messageConnectionError = res;
    });
    this.initSwipe();
    this.loadNewQuestion();
    this.loadNewQuestion();
    this.loadNewQuestion();
  }

  ionViewWillEnter() {
  }

  loadNewQuestion() {
    this.questionService.loadRandomQuestion().subscribe(
      (res) => {
        if (res === undefined) {
          let toast = this.toastCtrl.create({
            message: this.messageConnectionError,
            duration: 3000
          });
          toast.present();
        } else {
          console.log("Add " + res.id);
          this.questions.push(res);
        }
      });
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  downvote() {
    console.log('thumbs down');
    let q = this.questions.shift();
    console.log("Remove " + q.id);
    this.questionService.downvoteQuestion(q.id);
    this.loadNewQuestion();
  }

  upvote() {
    console.log('thumbs up');
    let q = this.questions.shift();
    console.log("Remove " + q.id);
    this.questionService.upvoteQuestion(q.id).subscribe((res) => {
      console.log(res);}, (err) => { console.log(err);}
    );
    this.loadNewQuestion();
  }

  trackById(index: number, question: any): number { return question.id; }

  /**
   *
   *
   * THIS IS THE SWIPE LOGIC START
   *
   *
   */

  initSwipe() {
    this.stackConfig = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
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
    let min = Math.trunc(Math.min(0xE1 - abs, 0xE1));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#E1' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'E1' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
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
