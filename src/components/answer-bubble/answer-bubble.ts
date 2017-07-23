import { Component } from '@angular/core';

@Component({
  selector: 'answer-bubble',
  inputs: ['answer: answer'],
  templateUrl: 'answer-bubble.html'
})

export class AnswerBubbleComponent {

  answer: any;

  constructor() {
  }

}
