import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TranslateService} from "@ngx-translate/core";
import {WelcomePage} from "../welcome/welcome";
import {Storage} from "@ionic/storage";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AGBPage} from "../agb/agb";
import {PrivacyPage} from "../privacy/privacy";

@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {
  username;
  password;
  email;
  passwordRepeat;
  sex; //m/w
  birthYear; //YYYY
  plz; //2 numbers
  inputsValid=false;

  loginView = LoginPage;
  welcomeView = WelcomePage;
  agbView = AGBPage;
  privacyView = PrivacyPage;
  messageCheckEmail;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public storage: Storage, public translate: TranslateService,
              public userService: UserServiceProvider) {
    translate.get('SIGNUP.CHECK_EMAIL', {value: 'world'}).subscribe((res: string) => {
      this.messageCheckEmail = res;
    });
  }

  checkInputs(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidEmail = re.test(this.email);
    if(isValidEmail) {
      if (this.password.length >= 8) {
        if (this.passwordRepeat === this.password) {
          return true;
        }
      }
    }
    return false;
  }

  signUp() {
    if(this.checkInputs()){ //show toast that a verification email has been sent
      //TODO send E-Mail for verification
      let toast = this.toastCtrl.create({
        message: this.messageCheckEmail,
        duration: 3000
      });
      toast.present();
      this.userService.createNewUser(this.username, this.email, this.password, this.sex, this.birthYear, this.plz);
      this.navCtrl.push(this.loginView);
    }
  }
}
