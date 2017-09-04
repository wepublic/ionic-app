import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, Tabs } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { TranslateService } from "@ngx-translate/core";

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { ContactPage } from "../contact/contact";
import { FaqPage } from "../faq/faq";
import { MainMenuPage } from "../mainMenu/mainMenu";
import { RandomQuestionsPage } from "../randomQuestions/randomQuestions";
import { SearchQuestionsPage } from "../searchQuestions/searchQuestions";
import { WelcomePage } from "../welcome/welcome";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tabs: Tabs;

  tab1Root = RandomQuestionsPage;
  tab2Root = MainMenuPage;
  tab3Root = SearchQuestionsPage;
  contactPage = ContactPage;
  faqPage = FaqPage;
  onboardingVisible: boolean = false;

  constructor(private storage: Storage, private alertCtrl: AlertController,
              private navCtrl: NavController, private userService: UserServiceProvider,
              private translate: TranslateService, private fcm: FCM) {
  }

  ionViewWillEnter() {
    this.storage.get('showedOnboarding').then(val => { if (!val) this.showOnboarding(); });
    try {
      this.fcm.subscribeToTopic('test');
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) { // background
          this.tabs.select(1);
          this.alertCtrl.create({
            title: data.title,
            message: JSON.stringify(data),
            buttons: ['OK']
          }).present();
        } else {              // foreground
          this.alertCtrl.create({
            title: data.title,
            message: data.body,
            buttons: ['OK']
          }).present();
        };
      });
    } catch(e) {
      console.log("No FCM available");
    }
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
