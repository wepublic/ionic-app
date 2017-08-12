import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContactPage } from "../pages/contact/contact";
import { SettingsPage } from '../pages/settings/settings';
import {TranslateService} from "@ngx-translate/core";
import {WelcomePage} from "../pages/welcome/welcome";
import {UserServiceProvider} from "../providers/user-service/user-service";
import {TabsPage} from "../pages/tabs/tabs";
import {TagsServiceProvider} from "../providers/tags-service/tags-service";
import {TagsHelper} from "../utils/TagsHelper";

@Component({
  selector: 'app',
  providers: [TagsServiceProvider, UserServiceProvider],
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('content') content;

  rootPage: any = WelcomePage;
  tabsPage = TabsPage;
  settingsPage = SettingsPage;
  contactPage = ContactPage;
  welcomePage = WelcomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public translate: TranslateService, public userService: UserServiceProvider,
              public tagsHelper: TagsHelper) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    this.tagsHelper.loadAllTagObjects();
    this.checkLoggedInStatus();
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  checkLoggedInStatus() {
    //Test if user logged in -> Skip login page
    this.userService.getToken().subscribe(val =>{
      console.log(val);
      if(val !== null) {
        this.rootPage = TabsPage;
        console.log('set new root');
      } else {
        this.rootPage = WelcomePage;
      }
      setTimeout(() => {
        this.splashScreen.hide();
      }, 400);
    });
  }

  openPage(page) {
    //Equals logout-operation
    if (page === WelcomePage) {
      this.logout();
    }
    this.nav.setRoot(page);
  }

  logout() {
    this.userService.logout();
  }
}

