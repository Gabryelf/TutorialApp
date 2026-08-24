using System;

namespace AppConnect
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Start Program");
            Console.ReadKey();

            // Строка подключения к SQL Server
            string connectionString = "Server=localhost;Database=TraneeDB;Integrated Security=True;";

            try
            {
                using ()
                {

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

            }
        }
    }
}

