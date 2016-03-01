namespace WeatherWidget.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Linq;

    public class DataModel : DbContext
    {
        // Your context has been configured to use a 'DataModel' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'WeatherWidget.Models.DataModel' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'DataModel' 
        // connection string in the application configuration file.
        public DataModel()
            : base("name=DataModel")
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Properties<DateTime>()
            .Configure(c => c.HasColumnType("datetime2"));
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Widget> Widgets { get; set; }
    }

    public class Widget
    {
        [Key]
        public Guid Id { get; set; }
        [Required] 
        public string Name { get; set; }
        public bool Unit { get; set; }
        public bool ShowWind { get; set; }
        public bool ShowHumidity { get; set; }
        public bool ShowLocation { get; set; }

        public DateTime DateCreated { get; set; }
    }
}