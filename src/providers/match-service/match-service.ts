import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {API_ENDPOINT} from '../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchServiceProvider {

  constructor(public http: Http) {
  }

  loadMatch() {
    return this.http.get(API_ENDPOINT + '/Match/')
      .map(res => res.json());
  }

}
