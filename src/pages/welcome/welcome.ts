import { Component } from '@angular/core';

import { SignUpPage } from '../signUp/signUp';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  signUpView = SignUpPage;
  loginView = LoginPage;

  constructor() {
  }

}
