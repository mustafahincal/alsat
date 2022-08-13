using Microsoft.Extensions.Configuration;

namespace Core.Utilities.Configurations
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {
                ConfigurationManager configurationManager = new ConfigurationManager();
                configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../WebAPI"));
                configurationManager.AddJsonFile("appsettings.json");
                return configurationManager.GetConnectionString("MSSQL");
            }
        }
    }
}
