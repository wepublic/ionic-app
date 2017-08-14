import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TagsHelper } from '../../utils/TagsHelper';

@Component({
  selector: 'question-bubble',
  templateUrl: 'question-bubble.html'
})

export class QuestionBubbleComponent {
  @ViewChild('votebar') votebar;
  @ViewChild('movable') movable;
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
    if (e.isFinal) {
      const acceptDelta = this.votebar.nativeElement.offsetWidth * 0.8;
      if (e.deltaX > acceptDelta) { this.upvote.emit(this.question); }
      else { this.movable.nativeElement.style.transform = ""; }
    } else {
      this.movable.nativeElement.style.transform = "translateX(" + e.deltaX + "px)";
    }
  }
}
