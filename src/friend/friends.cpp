#include<string>
#include "friends.h"

void Friends::add_friend(std::string first_name, std::string last_name)
{
  Friend f;
  f.first_name = first_name;
  f.last_name = last_name;

  _friends.push_back(f);
}

char* Friends::to_json() {
  
  std::string json = "[";
  
  for(int i = 0; i < _friends.size(); i++)
  {
    json += _friends[i].to_json();

    if(i < _friends.size() -1)
    {
      json += ",";
    }
  }
  
  json += "]";

  char* char_array = new char[json.length()]();
  strcpy(char_array, json.c_str());

  return char_array;
}