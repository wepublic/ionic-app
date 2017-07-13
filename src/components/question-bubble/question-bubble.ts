import { Component } from '@angular/core';
import { TagsHelper } from '../../utils/TagsHelper';

@Component({
  selector: 'question-bubble',
  inputs: ['question: question', 'textClick: textClick', 'tagClick: tagClick'],
  templateUrl: 'question-bubble.html'
})

export class QuestionBubbleComponent {

  question: any;
  textClick: (question) => void;
  tagClick: (tag) => void;

  constructor(public tagsHelper: TagsHelper) {
  }

  loadTags(question) {
    return this.tagsHelper.getTagObjects(question.tags);
  }

}
