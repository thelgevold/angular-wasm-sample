import { createCustomElement } from '@angular/elements';
import { FriendListComponent } from './friends-list.component';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpreadsheetModule } from './spreadsheet/spreadsheet.module';

declare const window: any;

@NgModule({
  declarations: [
    FriendListComponent,
    AppComponent
  ],
  imports: [BrowserModule, SpreadsheetModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const el = createCustomElement(FriendListComponent, { injector: this.injector });
    customElements.define('friends-list', el);
  }
}

export function initApp() {
  return () => {
    return new Promise((resolve) => {
      const poll = setInterval(() => {
        if (window.ready) {
          resolve();
          clearInterval(poll);
        }
      }, 100)
    });
  };
}