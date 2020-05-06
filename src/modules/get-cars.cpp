#include <stdio.h>
#include <string.h>
#include <emscripten.h>
#include <emscripten/fetch.h>

void getCarsSucceeded(emscripten_fetch_t *fetch) {
  EM_ASM({
      window.showCars(UTF8ToString($0));
  }, fetch->data);

  emscripten_fetch_close(fetch);
}

void getCarsFailed(emscripten_fetch_t *fetch) {
  emscripten_fetch_close(fetch);
}

extern "C" void get_cars() {
  emscripten_fetch_attr_t attr;
  emscripten_fetch_attr_init(&attr);
  strcpy(attr.requestMethod, "GET");
  attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY;
  attr.onsuccess = getCarsSucceeded;
  attr.onerror = getCarsFailed;
  emscripten_fetch(&attr, "cars");
}