import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';

import {SignUpPage} from '../signUp/signUp';
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {QuestionTabsPage} from "../questionTabs/questionTabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = QuestionTabsPage;
  signUpView = SignUpPage;
  messageFailedLogin

  email = "";
  password = "";

  constructor(public navCtrl: NavController, public storage: Storage, public toastCtrl: ToastController, translate: TranslateService) {
    translate.get('LOGIN.FAILED', {value: 'world'}).subscribe((res: string) => {
      this.messageFailedLogin = res;
    });
  }

  login() {
    if(true){ //TODO check if user account exists, maybe special message if not activated yet
      this.storage.set('localUserEmail', this.email);
      this.storage.set('localUserPassword', this.password);
      this.navCtrl.setRoot(this.tabsView);
      // this.storage.get('localUserEmail').then((val) => {
      //   console.log('Email is: ', val);
      // });
    }
    else{ //TODO auskommentiert weil nicht erreichbar
      // let toast = this.toastCtrl.create({
      //   message: this.messageFailedLogin,
      //   duration: 3000
      // });
      // toast.present();
    }
  }

  emailChanged(text){
    this.email = text;
  }

  pwChanged(text){
    this.password = text;
  }
}
