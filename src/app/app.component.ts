import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContactPage } from "../pages/contact/contact";
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              translate: TranslateService) {
    this.initApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    //side-menu
    this.pages = [
      { title: "", component: TabsPage },
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

