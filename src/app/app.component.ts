import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContactPage } from "../pages/contact/contact";
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { AnswerTabsPage } from '../pages/answerTabs/answerTabs';
import {TranslateService} from "@ngx-translate/core";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              translate: TranslateService,public storage: Storage) {
    this.initApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    //Test if user logged in (if userEmail is valid E-Mail address) -> Skip login page
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.storage.get('localUserEmail').then((val) => {
      console.log(val);
      if(re.test(val)){
        this.rootPage = AnswerTabsPage;
        console.log('set new root');
      }
    });

    //side-menu
    this.pages = [
      { title: "", component: AnswerTabsPage },
      { title: "", component: SettingsPage },
      { title: "", component: ContactPage },
      { title: "", component: LoginPage },
    ]

    translate.get('MENU.QUESTIONS').subscribe(
      value => {
        // value is our translated string
        this.pages[0].title = value;
      }
    );

    translate.get('MENU.SETTINGS').subscribe(
      value => {
        // value is our translated string
        this.pages[1].title = value;
      }
    );

    translate.get('MENU.CONTACT').subscribe(
      value => {
        // value is our translated string
        this.pages[2].title = value;
      }
    );

    translate.get('MENU.LOGOUT').subscribe(
      value => {
        // value is our translated string
        this.pages[3].title = value;
      }
    );

  }

  initApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

