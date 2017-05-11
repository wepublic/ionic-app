import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../signUp/signUp';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = TabsPage;
  signUpView = SignUpPage;

  constructor(public navCtrl: NavController) {
  }

  login() {
    // console.log("login");
    this.navCtrl.push(this.tabsView);
  }

  signUp() {

    // console.log("signUp");
  }
}
