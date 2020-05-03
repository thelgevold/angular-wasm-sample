#include <emscripten.h>
#include "friends.h"

extern "C" void show_friends() {
  Friends friends;
  friends.add_friend("Joe", "Smith");
  friends.add_friend("Jane", "Doe");

  char* json = friends.to_json();

  EM_ASM({
      const e = document.createElement("friends-list");
      e.data = UTF8ToString($0);
      document.body.appendChild(e);    
  }, json);

  delete json;
}

