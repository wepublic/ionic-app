import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { CacheService } from "ionic-cache";
import {API_ENDPOINT} from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';

@Injectable()
export class NewsServiceProvider {

  constructor(private http: Http, private storage: Storage, private cache: CacheService) {
  }

  unseenNews() {
    return Observable.zip(
      Observable.fromPromise(this.storage.get('seenNews')),
      this.loadNews(),
      (seenNews: number[], news) =>
        news.reduce((res, e) => { if (seenNews == null || !seenNews.includes(e.id)) res++; return res; }, 0)
    );
  }

  updateSeenNews(ids: number[]) {
    this.storage.set('seenNews', ids);
  }

  loadNews(params: string = '?ordering=-time_created') {
    let request = this.http.get(API_ENDPOINT + '/News/' + params).map(res => res.json());
    return this.cache.loadFromDelayedObservable('news', request, undefined, undefined, 'all');
  }

}
