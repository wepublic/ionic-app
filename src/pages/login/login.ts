import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import {SignUpPage} from '../signUp/signUp';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = TabsPage;
  signUpView = SignUpPage;

  email = "";
  password = "";

  constructor(public navCtrl: NavController, public storage: Storage, public toastCtrl: ToastController) {
  }

  login() {
    if(true){ //TODO check if user account exists, maybe special message if not activated yet
      this.storage.set('localUserEmail', this.email);
      this.storage.set('localUserPassword', this.password);
      this.navCtrl.push(this.tabsView);
      // this.storage.get('localUserEmail').then((val) => {
      //   console.log('Email is: ', val);
      // });
    }
    else{
      // let toast = this.toastCtrl.create({
      //   message: 'Anmeldung fehlgeschlagen. E-Mail oder Passwort sind ungültig.',
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
