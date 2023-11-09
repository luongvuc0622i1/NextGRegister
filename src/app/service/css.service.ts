import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssService {

  constructor() { }

  addCss(url: string) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    head.appendChild(link);
  }

  removeCss(url: string) {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href && links[i].href.indexOf(url) !== -1) {
        // @ts-ignore
        links[i].parentNode.removeChild(links[i]);
      }
    }
  }
}
