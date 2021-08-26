using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        // Optional, because they won't have a delivery method until they get to the checkout
        public int? DeliveryMethodId { get; set; }

        // Used by Stripe to confirm payment intent
        public string ClientSecret { get; set; }

        // Used to update payment intent in case customer wants to change items in their basket
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
    }
}