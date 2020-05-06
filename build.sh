emcc \
      -Os \
      -s WASM=1 \
      -s FETCH=1 \
      -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "setValue", "getValue"]' \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s EXPORTED_FUNCTIONS="['_show_friends', '_malloc', '_get_address', '_free', '_add_numbers', '_get_cars']" \
      src/modules/friends/show-friends.cpp \
      src/modules/friends/friend.cpp \
      src/modules/friends/friends.cpp \
      src/modules/get-address.cpp \
      src/modules/add-numbers.cpp \
      src/modules/get-cars.cpp \
      -I/Users/torgeirhelgevold/development/msgpack-c/include \
      -o src/app/wasm/wasm-module.js