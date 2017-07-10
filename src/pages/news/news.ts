import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {TagsHelper} from "../../utils/TagsHelper";
import {TranslateService} from "@ngx-translate/core";
import {NewsServiceProvider} from "../../providers/news-service/news-service";

@Component({
  templateUrl: 'news.html',
  selector: 'page-news',
  providers: [NewsServiceProvider],
})
export class NewsPage {

  public news: any;

  constructor(public navCtrl: NavController, public newsService: NewsServiceProvider) {
    this.loadNews();
  }

  ionViewWillEnter() {
    this.loadNews();
  }

  loadNews() {
    this.news = this.newsService.loadNews();
  }

}
