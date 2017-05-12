import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AllQuestionsPage } from '../pages/allQuestions/allQuestions';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyQuestionsPage } from '../pages/myQuestions/myQuestions';
import {NewQuestionsPage} from '../pages/newQuestions/newQuestions';
import { SignUpPage } from '../pages/signUp/signUp';
import {SettingsPage} from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { QuestionServiceProvider } from '../providers/question-service/question-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AllQuestionsPage,
    ContactPage,
    HomePage,
    LoginPage,
    MyQuestionsPage,
    NewQuestionsPage,
    SettingsPage,
    SignUpPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AllQuestionsPage,
    ContactPage,
    HomePage,
    LoginPage,
    MyQuestionsPage,
    NewQuestionsPage,
    SettingsPage,
    SignUpPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    QuestionServiceProvider
  ]
})
export class AppModule {}
