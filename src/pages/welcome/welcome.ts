import { Component } from '@angular/core';
import {MenuController, NavController, ToastController} from 'ionic-angular';

import {SignUpPage} from '../signUp/signUp';
import {LoginPage} from '../login/login';
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  signUpView = SignUpPage;
  loginView = LoginPage;

  constructor(menuCtrl: MenuController, public navCtrl: NavController, public storage: Storage, public toastCtrl: ToastController, translate: TranslateService) {
    menuCtrl.enable(false);
  }
}
