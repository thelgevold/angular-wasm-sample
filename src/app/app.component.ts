import { Component } from '@angular/core';

declare const msgpack5: any;

declare const Module: any;

@Component({
  selector: 'app-root',
  template: `
    <h5>Address</h5>
    <div> {{ person.firstName }} {{ person.lastName }}</div>
    <div> {{ person.street }} </div>
    <div> {{ person.city }} {{ person.state }} {{ person.zip }} </div>

    <h5>Sum</h5>
    <div> {{ expression.operand1 }} + {{ expression.operand2 }} = {{ result }}</div>
  `
})
export class AppComponent {
  person;
  result: number;
  expression = { operand1: 100, operand2: 1000 };

  ngOnInit() {
    const showFriends = Module.cwrap("show_friends");
    showFriends();

    this.person = this.getAddress();

    this.result = this.add(this.expression);
  }

  getAddress() {
    const get_address = Module.cwrap("get_address", "number", ["number"]);

    const msgpack = msgpack5();

    const bufferSize = Module._malloc(8);

    const addressPtr = get_address(bufferSize);

    var offset = Module.getValue(bufferSize, "i64");

    const addressData = new Uint8Array(Module.HEAPU8.subarray(addressPtr, addressPtr + offset));

    Module._free(offset);
    Module._free(addressPtr);

    return msgpack.decode(addressData);
  }

  add(expression) {
    const msgpack = msgpack5();
    const encoded = msgpack.encode(expression);

    var bufferSize = Module._malloc(encoded.length);

    Module.setValue(bufferSize, encoded, "i8");

    var bytes_per_element = encoded.BYTES_PER_ELEMENT;
    Module.HEAP8.set(encoded, bufferSize / bytes_per_element);

    const add_numbers = Module.cwrap("add_numbers", "number", ["number"]);

    const result = add_numbers(bufferSize, encoded.length);
    Module._free(bufferSize);

    return result;
  }
}