import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import {SignUpPage} from '../signUp/signUp';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = TabsPage;
  signUpView = SignUpPage;

  email = "";
  password = "";

  constructor(public navCtrl: NavController) {
  }

  login() {
    if(true){ //TODO check if user account exists, maybe special message if not activated yet
      this.navCtrl.push(this.tabsView);
    }
    else{
      //message: wrong input
    }
  }

  emailChanged(text){
    this.email = text;
  }

  pwChanged(text){
    this.password = text;
  }
}
