using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdWithItemsSpecification : BaseSpecification<Order>
    {

        //set o.paymentIntentId to the paymentIntentId that we are passing in
        public OrderByPaymentIntentIdWithItemsSpecification(string paymentIntentId) : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }
    }
}