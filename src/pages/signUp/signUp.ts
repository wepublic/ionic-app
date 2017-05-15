import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {

  loginView = LoginPage;
  emailValid = false;
  passwordValid = false;
  repeatPWValid = false;
  emailInput = this.emailInput;

  constructor(public navCtrl: NavController) {
  }

  onInputMail(text){

  }

  onInputPW(text){

  }

  onInputPWR(text){

  }

  checkEntries(){
    console.log(this.emailInput);
    if(this.emailInput==""){
      console.log("asdf");
    }
  }

  signUp() {
    if(this.emailValid && this.passwordValid && this.repeatPWValid){
      this.navCtrl.push(this.loginView);
    }
  }
}
