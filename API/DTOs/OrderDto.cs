using API.Dtos;

namespace API.DTOs
{
    public class
    OrderDto
    {
        public string BasketId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressDto ShiptoAddress { get; set; }
    }
}