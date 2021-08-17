using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Member.Parameters;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, OrderAddress shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail, PaginationParams paginationParams);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}