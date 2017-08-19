import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { ContactPage } from "../contact/contact";
import { MainMenuPage } from "../mainMenu/mainMenu";
import { RandomQuestionsPage } from "../randomQuestions/randomQuestions";
import { SearchQuestionsPage } from "../searchQuestions/searchQuestions";
import { SettingsPage } from '../settings/settings';
import { WelcomePage } from "../welcome/welcome";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tabs: Tabs;
  @ViewChild('onboarding') onboarding;

  tab1Root = RandomQuestionsPage;
  tab2Root = MainMenuPage;
  tab3Root = SearchQuestionsPage;
  settingsPage = SettingsPage;
  contactPage = ContactPage;

  constructor(private storage: Storage, private navCtrl: NavController, private userService: UserServiceProvider) {
  }

  ionViewWillEnter() {
    this.storage.get('showedOnboarding').then(val => { if (val) this.hideOnboarding(); });
  }

  logout() {
    this.userService.logout();
    this.navCtrl.setRoot(WelcomePage);
  }

  hideOnboarding() {
    this.tabs.setElementClass('blurred', false);
    this.onboarding.nativeElement.style.display = 'none';
    this.storage.set('showedOnboarding', true);
  }
}
