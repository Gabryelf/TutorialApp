using System;
using System.Data.SqlClient;

// namespace уровень проекта
namespace AppConnect
{
    // internal - модификатор доступа только в этом сборке - инкапсуляция
    // тут можно не писать, или сделать класс public 
    // добавил просто для объяснения
    internal class Program
    {
        // static - статический класс
        // здесь добавил для того что бы не создавать экземпляр
        // позже будет переделан для того что бы показать обратное
        static void Main(string[] args)
        {
            // показал строку и ожидаю ввода
            // если не ожидать программа завершится и не будет видна надпись
            Console.WriteLine("Start Program");
            Console.ReadKey();

            // Строка подключения к SQL Server  -- Server= имя сервера  -- Database= имя базы 
            // Далее буду создавать через SqlBuilder, тут упрощенная версия
            string connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=TraineeDB;Integrated Security=True;";

            // конструкция try-catch-finaly - "пробуем, если ошибка - ловим, завершаем" если дословно
            try
            {
                // метод using - страховка от разных опасностей и прирываний
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    // connection - объект подключения со строкой адресом
                    // открываем, естественный старт
                    connection.Open();
                    Console.WriteLine("Подключение к базе данных успешно!\n");

                    // просто сообщение для отдачи пользователю при успешном подключении
                    // по сути можно было какой ни будь столбец вернуть, 
                    // но это мы будем дальше делать, так что просто показываю что так можно
                    string query = "SELECT 'Hello from SQL Server!' AS Message";
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        // cmd - объект запроса к базе
                        object result = cmd.ExecuteScalar();
                        Console.WriteLine($"Сообщение из БД: {result}");
                        Console.ReadKey();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка подключения: {ex.Message}");
            }
            finally 
            {
                Console.WriteLine("Закрываем соединение!");
                Console.ReadKey();
                // мы нигде не закрываем подключение только по той причине, что займемся этим позже
                // и тут в этом нет необходимости, так как подключение происходит в using и 
                // будет закрыто автоматически - вот такая магия!

            }
            // короче весь сценарий в том что бы неправильно ввести имя сервера или базы, 
            // посмотреть на то что блоки catch и finaly отработали последовательно как надо
            // потом ввести правильные данные и получит ответ - что все ок!
        }
    }
}

