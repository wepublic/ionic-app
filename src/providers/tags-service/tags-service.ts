import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TagsServiceProvider {

  constructor(public http: Http) {
    console.log('Hello TagsServiceProvider Provider');
  }

  loadAllTags() {
    //Todo: onError!!!
    return this.http.get('http://boiling-spire-20724.herokuapp.com/Tags/')
      .map(res => res.json());
  }

}
