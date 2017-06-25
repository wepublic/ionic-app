import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContactPage } from "../pages/contact/contact";
import { SettingsPage } from '../pages/settings/settings';
import {TranslateService} from "@ngx-translate/core";
import { Storage } from '@ionic/storage';
import {WelcomePage} from "../pages/welcome/welcome";
import {UserServiceProvider} from "../providers/user-service/user-service";
import {TabsPage} from "../pages/tabs/tabs";
import {TagsServiceProvider} from "../providers/tags-service/tags-service";
import {TagsHelper} from "../utils/TagsHelper";
import {MainMenuPage} from "../pages/mainMenu/mainMenu";

@Component({
  providers: [TagsServiceProvider, UserServiceProvider],
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = WelcomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public translate: TranslateService, public storage: Storage, public userService: UserServiceProvider,
              public tagsHelper: TagsHelper) {
    this.initApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    this.initSideMenu();

    this.tagsHelper.loadAllTagObjects();

    this.checkLoggedInStatus();
  }

  initApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initSideMenu() {
    this.pages = [
      { title: "", component: TabsPage },
      { title: "", component: SettingsPage },
      { title: "", component: ContactPage },
      { title: "", component: WelcomePage },
    ];

    this.translate.get('MENU.HOME').subscribe(
      value => {
        // value is our translated string
        this.pages[0].title = value;
      }
    );

    this.translate.get('MENU.SETTINGS').subscribe(
      value => {
        // value is our translated string
        this.pages[1].title = value;
      }
    );

    this.translate.get('MENU.CONTACT').subscribe(
      value => {
        // value is our translated string
        this.pages[2].title = value;
      }
    );

    this.translate.get('MENU.LOGOUT').subscribe(
      value => {
        // value is our translated string
        this.pages[3].title = value;
      }
    );
  }

  checkLoggedInStatus() {
    //Test if user logged in -> Skip login page
    this.storage.get('localUserToken').then((val) => {
      console.log(val);
      if(val !== null) {
        this.rootPage = TabsPage;
        console.log('set new root');
      }
    });
  }

  openPage(page) {
    //Equals logout-operation
    if (page.component === WelcomePage) {
      this.logout();
    }
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.get('localUserToken').then((val) => {
      this.userService.logout(val).subscribe((data) => {
        //TODO: fix internal server error!!!
        console.log(data.json());
      });
      this.storage.remove('localUserEmail');
      this.storage.remove('localUserPassword');
      this.storage.remove('localUserToken');
    });
  }
}

