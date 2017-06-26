import { Component } from '@angular/core';

import {RandomQuestionsPage} from "../randomQuestions/randomQuestions";
import {NavController} from "ionic-angular";
import {SearchQuestionsPage} from "../searchQuestions/searchQuestions";
import {MainMenuPage} from "../mainMenu/mainMenu";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RandomQuestionsPage;
  tab2Root = MainMenuPage;
  tab3Root = SearchQuestionsPage;

  constructor(public navCtrl: NavController) {

  }
}
