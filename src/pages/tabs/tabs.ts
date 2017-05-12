import { Component } from '@angular/core';

import {AllQuestionsPage} from "../allQuestions/allQuestions";
import {MyQuestionsPage} from "../myQuestions/myQuestions";
import {NewQuestionsPage} from "../newQuestions/newQuestions";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AllQuestionsPage;
  tab2Root = NewQuestionsPage;
  tab3Root = MyQuestionsPage;

  constructor() {

  }
}
