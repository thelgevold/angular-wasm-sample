emcc \
      -Os \
      -s WASM=1 \
      -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s EXPORTED_FUNCTIONS="['_show_friends']" \
      src/friend/show-friends.cpp \
      src/friend/friend.cpp \
      src/friend/friends.cpp \
      -o src/app/wasm/friends.js