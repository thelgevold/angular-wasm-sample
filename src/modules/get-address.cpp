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