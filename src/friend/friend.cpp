#include<string>
#include "friend.h"

std::string Friend::to_json() {
  return "{" + format("firstName", first_name) + "," + format("lastName", last_name) + "}";
}

std::string Friend::format(std::string name, std::string val) {
  return "\"" + name + "\":" + "\"" + val + "\"";
}