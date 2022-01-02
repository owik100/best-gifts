import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHelperService {

  constructor() { }

  prepareBase64imagePrefix(b64image: string): string{
    if (b64image){
      let ext = b64image.charAt(0);
      switch (ext){
        case '/':
          ext = 'jpg';
          break;
          case 'i':
          ext = 'png';
          break;
      }

      return `data:image/${ext};base64,${b64image}`;
    }
    else{
      return null;
    }

  }

}
