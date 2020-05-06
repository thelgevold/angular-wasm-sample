#include<string>

class Friend {
  public:
    std::string to_json();
    std::string first_name;
    std::string last_name;
  private:
    std::string format(std::string name, std::string value);
};
