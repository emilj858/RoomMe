namespace RoomMe.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeFloatToDoubleLatLong : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Listings", "Longitude", c => c.Double(nullable: false));
            AlterColumn("dbo.Listings", "Latitude", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Listings", "Latitude", c => c.Single(nullable: false));
            AlterColumn("dbo.Listings", "Longitude", c => c.Single(nullable: false));
        }
    }
}
