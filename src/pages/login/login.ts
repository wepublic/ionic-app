import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';

import {SignUpPage} from '../signUp/signUp';
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {TabsPage} from "../tabs/tabs";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {MainMenuPage} from "../mainMenu/mainMenu";
import {WelcomePage} from "../welcome/welcome";

@Component({
  selector: 'page-login',
  providers: [UserServiceProvider],
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = TabsPage;
  mainMenuView = MainMenuPage;
  welcomePage = WelcomePage;
  signUpView = SignUpPage;
  messageFailedLogin;
  data;
  email = "";
  password = "";

  constructor(public navCtrl: NavController, public storage: Storage, public toastCtrl: ToastController,
              translate: TranslateService, public userService: UserServiceProvider) {
    translate.get('LOGIN.FAILED', {value: 'world'}).subscribe((res: string) => {
      this.messageFailedLogin = res;
    });
  }

  // ionViewWillEnter() {
  //   this.storage.get('localUserEmail').then((val) => {
  //     console.log(val);
  //   });
  //   this.storage.get('localUserPassword').then((val) => {
  //     console.log(val);
  //   });
  // }

  login() {
    /*this.userService.login(this.email, this.password).subscribe((data) => {
        console.log(data.json());
        this.storage.set('localUserToken', data.json().Token);
        this.storage.set('localUserEmail', this.email);
        this.storage.set('localUserPassword', this.password);
        this.navCtrl.setRoot(this.tabsView);
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: this.messageFailedLogin,
        duration: 3000
      });
      toast.present();
    });*/
    this.navCtrl.setRoot(this.tabsView);
  }

  forgotPW() {
    //TODO -> Backend needs to support EMails
  }

  emailChanged(text){
    this.email = text;
  }

  pwChanged(text){
    this.password = text;
  }
}
