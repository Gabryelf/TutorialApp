using System;
using System.Data.SqlClient;

namespace AppConnect
{
    internal class Program_WithBuilder
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Программа с SqlConnectionStringBuilder ===\n");
            Console.ReadKey();

            // 1. СОЗДАЁМ СТРОКУ ПОДКЛЮЧЕНИЯ ЧЕРЕЗ BUILDER
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
            {
                DataSource = "(localdb)\\MSSQLLocalDB",  // Сервер
                InitialCatalog = "TraineeDB",            // База данных
                IntegratedSecurity = true                // Windows-аутентификация
            };

            string connectionString = builder.ConnectionString;
            Console.WriteLine($"Строка подключения: {connectionString}\n");

            // 2. ПОДКЛЮЧАЕМСЯ И ПОЛУЧАЕМ ДАННЫЕ
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    Console.WriteLine("✅ Подключение к базе данных успешно!\n");

                    // 3. ЗАПРОС К ТАБЛИЦЕ Users
                    string query = "SELECT * FROM Users";
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        // 4. ПОЛУЧАЕМ ИНФОРМАЦИЮ О СТОЛБЦАХ
                        Console.WriteLine("=== ИНФОРМАЦИЯ О СТОЛБЦАХ ===");
                        Console.WriteLine($"Количество столбцов: {reader.FieldCount}\n");

                        // Выводим названия столбцов и их типы
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            string columnName = reader.GetName(i);
                            string columnType = reader.GetFieldType(i).Name;
                            Console.WriteLine($"  Столбец {i + 1}: {columnName} ({columnType})");
                        }

                        Console.WriteLine("\n=== ДАННЫЕ ИЗ ТАБЛИЦЫ Users ===");

                        // 5. ВЫВОДИМ ВСЕ ДАННЫЕ
                        int rowCount = 0;
                        while (reader.Read())
                        {
                            rowCount++;
                            Console.WriteLine($"\n📌 Запись #{rowCount}:");

                            // Выводим значение каждого столбца
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                string columnName = reader.GetName(i);
                                object value = reader.GetValue(i);

                                // Если значение NULL, показываем как (NULL)
                                string displayValue = (value == DBNull.Value) ? "(NULL)" : value.ToString();
                                Console.WriteLine($"  {columnName}: {displayValue}");
                            }
                        }

                        if (rowCount == 0)
                        {
                            Console.WriteLine("Таблица Users пуста!");
                        }
                        else
                        {
                            Console.WriteLine($"\n✅ Всего записей: {rowCount}");
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"❌ Ошибка SQL: {ex.Message}");
                Console.WriteLine($"   Номер ошибки: {ex.Number}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Ошибка: {ex.Message}");
            }
            finally
            {
                Console.WriteLine("\n🔒 Соединение закрыто (using автоматически освободил ресурсы)");
                Console.ReadKey();
            }
        }
    }
}