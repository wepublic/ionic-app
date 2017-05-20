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
import { EnterQuestionPage } from '../pages/enterQuestion/enterQuestion';
import { SignUpPage } from '../pages/signUp/signUp';
import {SettingsPage} from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { QuestionServiceProvider } from '../providers/question-service/question-service';
import { IonicStorageModule } from '@ionic/storage';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

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
    EnterQuestionPage,
    SettingsPage,
    SignUpPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      },
    })
  ],
  bootstrap: [MyApp, IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AllQuestionsPage,
    ContactPage,
    HomePage,
    LoginPage,
    MyQuestionsPage,
    NewQuestionsPage,
    EnterQuestionPage,
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
