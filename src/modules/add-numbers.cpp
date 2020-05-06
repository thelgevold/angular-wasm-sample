#include <msgpack.hpp>

struct Expression {
  public:
    MSGPACK_DEFINE_MAP(operand1, operand2);
    int operand1;
    int operand2;
};

extern "C" long add_numbers(char* expr, int bufferSize) 
{
  msgpack::object_handle oh = msgpack::unpack(expr, bufferSize);
  msgpack::object obj = oh.get();

  Expression expression;
  obj.convert(expression);

  return expression.operand1 + expression.operand2;
}