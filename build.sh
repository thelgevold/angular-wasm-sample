emcc \
      -Os \
      -s WASM=1 \
      -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "setValue", "getValue"]' \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s EXPORTED_FUNCTIONS="['_show_friends', '_malloc', '_get_address', '_free', '_add_numbers']" \
      src/friend/show-friends.cpp \
      src/friend/friend.cpp \
      src/friend/friends.cpp \
      -I/Users/torgeirhelgevold/development/msgpack-c/include \
      -o src/app/wasm/friends.js