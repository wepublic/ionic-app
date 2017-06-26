import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AnsweredQuestionsPage } from '../pages/answeredQuestions/answeredQuestions';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { MyQuestionsPage } from '../pages/myQuestions/myQuestions';
import { EnterQuestionPage } from '../pages/enterQuestion/enterQuestion';
import { SignUpPage } from '../pages/signUp/signUp';
import {SettingsPage} from '../pages/settings/settings';
import {AGBPage} from '../pages/agb/agb';
import {PrivacyPage} from '../pages/privacy/privacy';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { QuestionServiceProvider } from '../providers/question-service/question-service';
import { IonicStorageModule } from '@ionic/storage';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {TabsPage} from "../pages/tabs/tabs";
import {RandomQuestionsPage} from "../pages/randomQuestions/randomQuestions";
import {SearchQuestionsPage} from "../pages/searchQuestions/searchQuestions";
import { TagsServiceProvider } from '../providers/tags-service/tags-service';
import {TagsHelper} from "../utils/TagsHelper";
import {MainMenuPage} from "../pages/mainMenu/mainMenu";
import {NewsPage} from "../pages/news/news";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    MainMenuPage,
    ContactPage,
    EnterQuestionPage,
    AnsweredQuestionsPage,
    WelcomePage,
    LoginPage,
    MyQuestionsPage,
    TabsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SettingsPage,
    SignUpPage,
    AGBPage,
    PrivacyPage,
    NewsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      },
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainMenuPage,
    ContactPage,
    EnterQuestionPage,
    AnsweredQuestionsPage,
    LoginPage,
    WelcomePage,
    MyQuestionsPage,
    TabsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SettingsPage,
    SignUpPage,
    AGBPage,
    PrivacyPage,
    NewsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TagsHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    QuestionServiceProvider,
    TagsServiceProvider
  ]
})
export class AppModule {}
