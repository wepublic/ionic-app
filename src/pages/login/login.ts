import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertController, NavController, ToastController} from 'ionic-angular';

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

  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController,
              private toastCtrl: ToastController, private fb: FormBuilder,
              private translate: TranslateService, private userService: UserServiceProvider) {
    this.authForm = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  showToast(text: string, err: string) {
    this.translate.get(text, {value: 'world'})
    .subscribe((res: string) => this.toastCtrl.create({ message: res + ' ' + err, duration: 3000 }).present());
  }

  showAlert(text: string) {
    this.translate.get(text, {value: 'world'})
    .subscribe((res: string) => this.alertCtrl.create({ message: res }).present());
  }

  login(value: string) {
    console.log("login");
    if (!this.authForm.valid) return;
    this.userService.login(this.email.value, this.password.value).subscribe(
      () => this.navCtrl.setRoot(this.tabsView),
      err => this.showToast('LOGIN.FAILED', err)
    );
  }

  forgotPW() {
    console.log("forgot PW");
    this.userService.forgotPW(this.email.value)
    .subscribe(
      res => this.showAlert('SIGNUP.RESETMAIL'),
      err => this.showToast('LOGIN.INVALID_USER', err)
    );
    return false;
  }
}
