import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, ToastController} from 'ionic-angular';

import {TranslateService} from "@ngx-translate/core";
import {TabsPage} from "../tabs/tabs";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-login',
  providers: [UserServiceProvider],
  templateUrl: 'login.html'
})
export class LoginPage {

  private tabsView = TabsPage;
  private messageFailedLogin;

  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private fb: FormBuilder,
              translate: TranslateService, public userService: UserServiceProvider) {
    translate.get('LOGIN.FAILED', {value: 'world'}).subscribe((res: string) => {
      this.messageFailedLogin = res;
    });
    this.authForm = fb.group({  
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  
    this.email = this.authForm.controls['email'];     
    this.password = this.authForm.controls['password'];
  }

  login(value: string) {
    if (!this.authForm.valid) return;
    this.userService.login(this.email.value, this.password.value).subscribe(
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
