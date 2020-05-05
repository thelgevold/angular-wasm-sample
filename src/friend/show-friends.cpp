#include <emscripten.h>
#include "friends.h"
#include <msgpack.hpp>

struct Address {
  public:
    MSGPACK_DEFINE_MAP(firstName, lastName, zip, city, street, state);
    std::string firstName;
    std::string lastName;
    int zip;
    std::string city;
    std::string state;
    std::string street;
};

struct Expression {
  public:
    MSGPACK_DEFINE_MAP(operand1, operand2);
    int operand1;
    int operand2;
};

extern "C" void show_friends(unsigned long* size) {

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

extern "C" char* get_address(unsigned long* size) 
{
  Address address;

  address.firstName = "Joe";
  address.lastName = "Smith";
  address.zip = 12345;
  address.state = "NY";
  address.city = "Test Town";
  address.street = "Test St. 123";

  msgpack::sbuffer sbuf;
  msgpack::pack(sbuf, address);

  *size = sbuf.size();
  return sbuf.data();
}

extern "C" long add_numbers(char* expr, int bufferSize) 
{
  msgpack::object_handle oh = msgpack::unpack(expr, bufferSize);
  msgpack::object obj = oh.get();

  Expression expression;
  obj.convert(expression);

  return expression.operand1 + expression.operand2;
}
