import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagsHelper } from '../../utils/TagsHelper';

@Component({
  selector: 'question-bubble',
  templateUrl: 'question-bubble.html'
})

export class QuestionBubbleComponent {
  @Input() question: any;
  @Output() textClick = new EventEmitter<any>();
  @Output() tagClick = new EventEmitter<any>();

  constructor(public tagsHelper: TagsHelper) {
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

}
