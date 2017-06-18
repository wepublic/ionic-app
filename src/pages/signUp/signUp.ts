import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TranslateService} from "@ngx-translate/core";
import {WelcomePage} from "../welcome/welcome";

@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {

  loginView = LoginPage;
  emailValid = false;
  passwordValid = false;
  password = "";
  repeatPWValid = false;
  emailInput = this.emailInput;
  messageCheckEmail;
  welcomeView = WelcomePage;
  years = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, translate: TranslateService) {
    translate.get('SIGNUP.CHECK_EMAIL', {value: 'world'}).subscribe((res: string) => {
      this.messageCheckEmail = res;
    });
    this.fillYears();
  }

  onInputMail(text){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(text)){
      this.emailValid = true;
    }
  }

  onInputPW(text){
    this.password = text;
    if(text.toString().length >= 8){
      this.passwordValid = true;
    }
  }

  onInputPWR(text){
      if(text.toString().length >= 8 && text.toString()===this.password.toString()){
        this.repeatPWValid = true;
      }
  }

  signUp() {
    if(this.emailValid && this.passwordValid && this.repeatPWValid){
      //TODO Message that the account has to be verified
      //TODO send E-Mail for verification
      let toast = this.toastCtrl.create({
        message: this.messageCheckEmail,
        duration: 3000
      });
      toast.present();
      this.navCtrl.push(this.loginView);
    }
  }

  fillYears() {
    var currYear = new Date().getFullYear();
    var earliest = currYear - 150;
    var i;
    for(i = currYear-10; i>=earliest; i--){
      // this.years[i-earliest] = i;
      this.years.push(i.toString());
    }
  }
}
