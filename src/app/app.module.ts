import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CustomIconsModule } from "ionic2-custom-icons";

import { MyApp } from './app.component';
import { AnswerBubbleComponent } from '../components/answer-bubble/answer-bubble';
import { QuestionBubbleComponent } from '../components/question-bubble/question-bubble';

import { AnsweredQuestionsPage } from '../pages/answeredQuestions/answeredQuestions';
import { AnswersPage} from "../pages/answers/answers";
import { ContactPage } from '../pages/contact/contact';
import { EnterQuestionPage } from '../pages/enterQuestion/enterQuestion';
import { FaqPage } from '../pages/faq/faq';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from "../pages/mainMenu/mainMenu";
import { OpenQuestionsPage } from '../pages/openQuestions/openQuestions';
import { NewsPage } from "../pages/news/news";
import { RandomQuestionsPage } from "../pages/randomQuestions/randomQuestions";
import { SearchQuestionsPage } from "../pages/searchQuestions/searchQuestions";
import { SignUpPage } from '../pages/signUp/signUp';
import { TabsPage } from "../pages/tabs/tabs";
import { WelcomePage } from '../pages/welcome/welcome';

import { NewsServiceProvider } from '../providers/news-service/news-service';
import { QuestionServiceProvider } from '../providers/question-service/question-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { TagsServiceProvider } from '../providers/tags-service/tags-service';

import { TagsHelper } from "../utils/TagsHelper";
import { ConnectionErrorController } from '../utils/connection-error';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AnswerBubbleComponent,
    QuestionBubbleComponent,
    AnsweredQuestionsPage,
    AnswersPage,
    ContactPage,
    EnterQuestionPage,
    FaqPage,
    LoginPage,
    MainMenuPage,
    OpenQuestionsPage,
    NewsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SignUpPage,
    TabsPage,
    WelcomePage,
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
        deps: [Http],
      },
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnsweredQuestionsPage,
    AnswersPage,
    ContactPage,
    EnterQuestionPage,
    FaqPage,
    LoginPage,
    MainMenuPage,
    OpenQuestionsPage,
    NewsPage,
    RandomQuestionsPage,
    SearchQuestionsPage,
    SignUpPage,
    TabsPage,
    WelcomePage,
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
    ConnectionErrorController,
  ]
})
export class AppModule {}
