import { Component } from '@angular/core';

declare const Module: any;

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent {
  ngOnInit() {
    const showFriends = Module.cwrap("show_friends");
    showFriends();
  }
}