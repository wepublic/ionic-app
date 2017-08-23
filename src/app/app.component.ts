import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from "@ngx-translate/core";

import { UserServiceProvider } from "../providers/user-service/user-service";
import { TagsHelper } from "../utils/TagsHelper";
import { TabsPage } from "../pages/tabs/tabs";
import { WelcomePage } from "../pages/welcome/welcome";

@Component({
  selector: 'app',
  providers: [UserServiceProvider],
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('content') content;

  rootPage: any = WelcomePage;

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
    // Test if user logged in -> Skip login page
    this.userService.loadMe().subscribe(
      me => {
        console.log("Hello: ", me);
        if (me !== null) this.rootPage = TabsPage;
        setTimeout(() => this.splashScreen.hide(), 1000);
      },
      err => {
        console.log("Error logging in: ", err);
        this.splashScreen.hide();
      }
    );
  }
}
