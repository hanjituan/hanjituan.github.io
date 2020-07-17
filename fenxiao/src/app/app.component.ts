import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FxI18nPipe } from './directives/pipe/fxI18n.pipe';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>' ,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private title: Title) {
    this.title.setTitle(new FxI18nPipe().transform('', 'projectTitle'));
  }
}

