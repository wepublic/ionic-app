import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import { ConnectionErrorController } from '../../utils/connection-error';
import {TagsHelper} from "../../utils/TagsHelper";

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

  questions = [];
  stackConfig: StackConfig;

  constructor(public navCtrl: NavController, public errorCtrl: ConnectionErrorController,
              public questionService: QuestionServiceProvider, public tagsHelper: TagsHelper) {
    this.initSwipe();
    Observable.forkJoin(
      this.questionService.loadRandomQuestion(),
      this.questionService.loadRandomQuestion(),
      this.questionService.loadRandomQuestion()
    ).subscribe(
      res => this.questions = this.questions.concat(res),
      err => this.errorCtrl.show()
    );
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  downvote() {
    console.log('thumbs down');
    let q = this.questions.shift();
    console.log("Remove " + q.id);
    Observable.forkJoin(
      this.questionService.downvoteQuestion(q.id),
      this.questionService.loadRandomQuestion()
    ).subscribe(
      null,
      err => this.errorCtrl.show()
    );
  }

  upvote() {
    console.log('thumbs up');
    let q = this.questions.shift();
    console.log("Remove " + q.id);
    Observable.forkJoin(
      this.questionService.upvoteQuestion(q.id),
      this.questionService.loadRandomQuestion()
    ).subscribe(
      null,
      err => this.errorCtrl.show()
    );
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
