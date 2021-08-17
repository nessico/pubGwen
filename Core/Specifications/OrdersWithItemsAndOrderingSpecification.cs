using System;
using System.Linq.Expressions;
using Core.Entities.Member.Parameters;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{

    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(string email, PaginationParams paginationParams) : base(o => o.BuyerEmail == email)
        {
            // Relates deliveryMethod And OrderItem properties from order.cs in eager loading
            // Sorts order into date/order, by sorting orders by most recent date
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
            ApplyPaging(paginationParams.PageSize * (paginationParams.PageNumber - 1), paginationParams.PageSize);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}