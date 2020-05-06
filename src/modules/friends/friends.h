#include<string>
#include <vector>
#include "friend.h"

class Friends {
  public:
    char* to_json();
    void add_friend(std::string first_name, std::string last_name);
    
  private:
    std::vector<Friend> _friends;
};
