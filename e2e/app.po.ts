import { browser, element, by } from 'protractor';

export class TmpPage {
  navigateTo() {
    return browser.get('/home');
  }

  getParagraphText() {
    return element(by.css('h3')).getText();
  }
}
