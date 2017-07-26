import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'answer-bubble',
  templateUrl: 'answer-bubble.html'
})

export class AnswerBubbleComponent {
  @Input() answer: any;
  @Output() upvote = new EventEmitter<any>();
  @Output() downvote = new EventEmitter<any>();

  constructor() {
  }

}
