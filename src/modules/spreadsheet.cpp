#include <msgpack.hpp>
#include <vector>

struct Cell {
  public:
    MSGPACK_DEFINE_MAP(cellValue);
    std::string cellValue;
};

struct Row {
  public:
    MSGPACK_DEFINE_MAP(cells);
    std::vector<Cell> cells;
};

struct Spreadsheet {
  public:
    MSGPACK_DEFINE_MAP(rows);
    std::vector<Row> rows;
};

class SpreadsheetCalculations {
  private:
    Spreadsheet spreadsheet;
    int columnIndex;
  public:
    long sum = 0;
  
  SpreadsheetCalculations(Spreadsheet spreadsheet, int columnIndex)
  {
    this -> spreadsheet = spreadsheet;
    this -> columnIndex = columnIndex;
  }

  void calculate_column_sum()
  {
    for (int rowIndex = 0; rowIndex < spreadsheet.rows.size(); rowIndex++) {
      sum += stol(spreadsheet.rows[rowIndex].cells[columnIndex].cellValue);
    }
  }
};

void *thread_func(void *data_struct) {
 
  SpreadsheetCalculations* data = static_cast<SpreadsheetCalculations*>(data_struct);
  data -> calculate_column_sum();

  return data_struct;
}

pthread_t create_thread(SpreadsheetCalculations* spreadsheet)
{
  pthread_t  t;

  if (pthread_create(&t, NULL, thread_func, spreadsheet)) {
    perror("Thread failed");
    return -1;
  }

  return t;
}

bool wait_for_thread(pthread_t thread)
{
  if (pthread_join(thread, NULL)) {
    perror("Thread join failed");
    return false;
  }

  return true;
}

extern "C" long calculate_sums(char* expr, int bufferSize) 
{
  msgpack::object_handle oh = msgpack::unpack(expr, bufferSize);
  msgpack::object obj = oh.get();

  Spreadsheet spreadsheet;
  obj.convert(spreadsheet);

  SpreadsheetCalculations *data1 = new SpreadsheetCalculations(spreadsheet, 0);
  pthread_t  t1 = create_thread(data1);

  SpreadsheetCalculations *data2 = new SpreadsheetCalculations(spreadsheet, 1);
  pthread_t  t2 = create_thread(data2);

  SpreadsheetCalculations *data3 = new SpreadsheetCalculations(spreadsheet, 2);
  pthread_t  t3 = create_thread(data3);

  SpreadsheetCalculations *data4 = new SpreadsheetCalculations(spreadsheet, 3);
  pthread_t  t4 = create_thread(data4);

  wait_for_thread(t1);

  wait_for_thread(t2);

  wait_for_thread(t3);

  wait_for_thread(t4);

  int sum = data1 -> sum + data2 -> sum + data3 -> sum + data4 -> sum;

  delete data1;
  delete data2;
  delete data3;
  delete data4;

  return sum;
}
