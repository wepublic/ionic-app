import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';

import {SignUpPage} from '../signUp/signUp';
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

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
              translate: TranslateService, public userService: UserServiceProvider) {
    translate.get('LOGIN.FAILED', {value: 'world'}).subscribe((res: string) => {
      this.messageFailedLogin = res;
    });
  }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      data => { this.navCtrl.setRoot(this.tabsView); },
      error => {
        let toast = this.toastCtrl.create({
          message: this.messageFailedLogin,
          duration: 3000
        });
        toast.present();
      }
    );
  }

  forgotPW() {
    this.userService.forgotPW(this.email).subscribe(
      null,
      (error) => {
        let toast = this.toastCtrl.create({
          message: this.messageFailedLogin,
          duration: 3000
        });
        toast.present();
      });
  }

  emailChanged(text){
    this.email = text;
  }

  pwChanged(text){
    this.password = text;
  }
}
