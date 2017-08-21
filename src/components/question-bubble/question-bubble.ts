import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TagsHelper } from '../../utils/TagsHelper';

@Component({
  selector: 'question-bubble',
  templateUrl: 'question-bubble.html'
})

export class QuestionBubbleComponent {
  @ViewChild('questionbubble') questionBubble;
  @ViewChild('lasche') lasche;
  @ViewChild('votebar') votebar;
  @ViewChild('community') community;
  @Input() question: any;
  @Output() textClick = new EventEmitter<any>();
  @Output() tagClick = new EventEmitter<any>();
  @Output() upvote = new EventEmitter<any>();

  constructor(public tagsHelper: TagsHelper) {
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

  panEvent(e) {
    if (this.question.voted) return;
    const minLeft = 50;
    const acceptDelta = this.votebar.nativeElement.offsetWidth * 0.5;
    const accepted = e.deltaX > acceptDelta;
    if (e.isFinal || accepted) {
      if (accepted) {
        this.upvote.emit(this.question);
        this.question.voted = true;
        this.question.upvotes += 1;
      }
      this.community.nativeElement.style.left = "";
      this.lasche.nativeElement.style.left = "";
      this.questionBubble.nativeElement.style.backgroundColor = "";
      this.lasche.nativeElement.style.fill = "";
    } else {
      let x = Math.max(minLeft, Math.min(this.votebar.nativeElement.offsetWidth - 10, e.center.x));
      this.lasche.nativeElement.style.left = (x - minLeft) + "px";
      this.community.nativeElement.style.left = (x - minLeft) + "px";
      x = x / e.srcEvent.view.innerWidth;
      let s = Math.round(82.9 * x);
      let l = Math.round(88.2 - (88.2 - 48.2) * x);
      let c = "hsl(165," + s + "%," + l + "%)";
      this.questionBubble.nativeElement.style.backgroundColor = c;
      this.lasche.nativeElement.style.fill = c;
    }
  }
}
