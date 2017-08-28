import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AnsweredQuestionsPage } from '../pages/answeredQuestions/answeredQuestions';
import { ContactPage } from '../pages/contact/contact';
import { FaqPage } from '../pages/faq/faq';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { MyQuestionsPage } from '../pages/myQuestions/myQuestions';
import { EnterQuestionPage } from '../pages/enterQuestion/enterQuestion';
import { SignUpPage } from '../pages/signUp/signUp';
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
import { ConnectionErrorController } from '../utils/connection-error';
import {MainMenuPage} from "../pages/mainMenu/mainMenu";
import {NewsPage} from "../pages/news/news";
import {AnswersPage} from "../pages/answers/answers";
import { NewsServiceProvider } from '../providers/news-service/news-service';
import { QuestionBubbleComponent } from '../components/question-bubble/question-bubble';
import { AnswerBubbleComponent } from '../components/answer-bubble/answer-bubble';
import {CustomIconsModule} from "ionic2-custom-icons";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    MainMenuPage,
    ContactPage,
    FaqPage,
    EnterQuestionPage,
    AnsweredQuestionsPage,
    WelcomePage,
    LoginPage,
    MyQuestionsPage,
    TabsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SignUpPage,
    NewsPage,
    AnswersPage,
    QuestionBubbleComponent,
    AnswerBubbleComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
    }),
    IonicStorageModule.forRoot(),
    CustomIconsModule,
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
    FaqPage,
    EnterQuestionPage,
    AnsweredQuestionsPage,
    LoginPage,
    WelcomePage,
    MyQuestionsPage,
    TabsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SignUpPage,
    NewsPage,
    AnswersPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TagsHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    QuestionServiceProvider,
    TagsServiceProvider,
    NewsServiceProvider,
    ConnectionErrorController
  ]
})
export class AppModule {}
