import { Storage } from '@ionic/storage';
import {TagsServiceProvider} from "../providers/tags-service/tags-service";
import { Injectable} from "@angular/core";

@Injectable()
export class TagsHelper {

  public allTagObjects = [];

  constructor(public storage: Storage, public tagsService: TagsServiceProvider) {

  }

  //GET all possible tags from server & store in local storage
  loadAllTagObjects() {
    this.tagsService.loadAllTags().subscribe(data => {
      if (data !== undefined && data !== []) {
        console.log(data);
        this.storage.set('allTags', data);
        this.allTagObjects = data;
      }
    });
  }

  //Load tag objects by id
  loadTagObjects(tagIds) {
    if (this.allTagObjects === []) {
      this.loadAllTagObjects();
    }
    let tags = [];
    for (let i = 0; i < tagIds.length; i++) {
      tags.push(this.allTagObjects.find((tag) => {
        return (tag.id === tagIds[i]);
      }));
    }
    return tags;
  }

}
