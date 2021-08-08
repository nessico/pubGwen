namespace Core.Entities.Member
{
    public class Connection
    {
        public Connection()
        {
        }

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        // Primary key, name + id will make entity framework consider this primary key
        public string ConnectionId { get; set; }

        public string Username { get; set; }
    }
}