import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, Tabs } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { TranslateService } from "@ngx-translate/core";

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { ContactPage } from "../contact/contact";
import { FaqPage } from "../faq/faq";
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

  tab1Root = RandomQuestionsPage;
  tab2Root = MainMenuPage;
  tab3Root = SearchQuestionsPage;
  settingsPage = SettingsPage;
  contactPage = ContactPage;
  faqPage = FaqPage;
  onboardingVisible: boolean = false;

  constructor(private storage: Storage, private alertCtrl: AlertController,
              private navCtrl: NavController, private userService: UserServiceProvider,
              private translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.storage.get('showedOnboarding').then(val => { if (!val) this.showOnboarding(); });
  }

  logout() {
    this.userService.logout();
    this.navCtrl.setRoot(WelcomePage);
  }

  showUsageConditions() {
    this.translate.get(['AGB.TITLE', 'AGB.MESSAGE', 'SIGNUP.OK'], {value: 'world'})
    .subscribe((res: string[]) => {
      this.alertCtrl.create({
        title: res['AGB.TITLE'],
        message: res['AGB.MESSAGE'],
        buttons: [res['SIGNUP.OK']]
      }).present();
    });
  }

  showPrivacy() {
    this.translate.get(['PRIVACY.TITLE', 'PRIVACY.MESSAGE', 'SIGNUP.OK'], {value: 'world'})
    .subscribe((res: string[]) => {
      this.alertCtrl.create({
        title: res['PRIVACY.TITLE'],
        message: res['PRIVACY.MESSAGE'],
        buttons: [res['SIGNUP.OK']]
      }).present();
    });
  }

  showImprint() {
    window.open('https://wepublic.me/impressum.html', '_blank', 'location=yes');
  }

  showOnboarding() {
    console.log("Show onboarding");
    this.tabs.setElementClass('blurred', true);
    this.onboardingVisible = true;
  }

  hideOnboarding() {
    console.log("Hide onboarding");
    this.tabs.setElementClass('blurred', false);
    this.onboardingVisible = false;
    this.storage.set('showedOnboarding', true);
  }
}
