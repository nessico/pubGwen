using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Core.Entities.Member;
using Microsoft.AspNetCore.Identity;


namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser<int>
    {

        public string DisplayName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }

        public Address Address { get; set; }

        public ICollection<Photo> Photos { get; set; }

        // Self referencing relationship, acts like a join table
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }

        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }





    }
}
