import { Injectable } from '@angular/core';

@Injectable()
export class FormatService {

  constructor() { }


  /* extract the id of a given url xxx/{id}. By default, if this is not a URL, return the parameter itself */
  extractURLID(url: string) {
    if(url.indexOf("/") == -1)
      return url;
    return url.substring(url.lastIndexOf("/") + 1);
  }

}
