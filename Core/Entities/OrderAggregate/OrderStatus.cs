using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    //Include Shipped, Completed, etc status if used by actual vendors
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentReceived,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed,
    }
}