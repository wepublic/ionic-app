import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import {RandomQuestionsPage} from "../randomQuestions/randomQuestions";
import {NavController, Tabs} from "ionic-angular";
import {SearchQuestionsPage} from "../searchQuestions/searchQuestions";
import {MainMenuPage} from "../mainMenu/mainMenu";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tabs: Tabs;
  @ViewChild('onboarding') onboarding;

  tab1Root = RandomQuestionsPage;
  tab2Root = MainMenuPage;
  tab3Root = SearchQuestionsPage;

  constructor(public storage: Storage, public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.storage.get('showedOnboarding').then(val => { if (val) this.hideOnboarding(); });
  }

  hideOnboarding() {
    this.tabs.setElementClass('blurred', false);
    this.onboarding.nativeElement.style.display = 'none';
    this.storage.set('showedOnboarding', true);
  }
}
