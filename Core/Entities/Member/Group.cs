using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Member
{
    public class Group
    {
        public Group()
        {
        }

        public Group(string name)
        {
            Name = name;
        }

        //Primary key
        [Key]
        public string Name { get; set; }

        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}