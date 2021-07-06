using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Employee;
using Core.Entities;
using Core.Employee.Parameters;

namespace Core.Interfaces
{
    public interface IMessageRepository
    {
        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnection(string connectionId);
        Task<Group> GetMessageGroup(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<Messages>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Messages>> GetMessageThread(string currentUsername, string recipientUsername);
    }
}