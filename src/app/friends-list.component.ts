import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `
  <h5>Friends</h5>
  <div *ngFor="let friend of friends">
    {{ friend.firstName }} {{ friend.lastName }}
  </div>
  `
})
export class FriendListComponent {
  friends: any;

  constructor(private ref: ChangeDetectorRef) { }

  @Input()
  set data(value: string) {
    this.friends = JSON.parse(value);
    this.ref.detectChanges();
  }
}