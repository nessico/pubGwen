using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }

        public List<BasketItemDto> Items { get; set; }

        // Optional, because they won't have a delivery method until they get to the checkout
        public int? DeliveryMethodId { get; set; }

        // Used by Stripe to confirm payment intent
        public string ClientSecret { get; set; }

        // Used to update payment intent in case customer wants to change items in their basket
        public string PaymentIntentId { get; set; }
    }
}