import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CacheService } from "ionic-cache";
import {API_ENDPOINT} from '../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsServiceProvider {

  constructor(public http: Http, private cache: CacheService) {
  }

  loadNews(params: string) {
    let request = this.http.get(API_ENDPOINT + '/News/' + params).map(res => res.json());
    return this.cache.loadFromDelayedObservable('news', request, undefined, undefined, 'all');
  }

}
