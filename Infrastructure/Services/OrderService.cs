using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Member.Parameters;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data.Identity;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        private readonly IBasketRepository _basketRepo;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }



        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, OrderAddress shippingAddress)
        {
            // Get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);
            // Get items from product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                // Verify item's price inside database, so people can't code inject fake prices from the client
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity, item.Brand, item.Type);
                items.Add(orderItem);
            }

            // Get delivery method from repo using DM's id
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            // Calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // Check if there is already an existing order

            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            // If there is an existing order, then we delete that order, 
            //  if customer is repeating the order because payment failed, 
            //  then we are going to  repeat our code and create a new order to replace it

            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);

                // Update payment intent to see if it is accurate to create our replacement order
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }


            // Create order
            var order = new Order(buyerEmail, shippingAddress, deliveryMethod, items, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            // Save to db 
            var result = await _unitOfWork.CompleteStore();

            if (result <= 0) return null;

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }



        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail, PaginationParams paginationParams)
        {
            // var count = await source.CountAsync();
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail, paginationParams);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<int> GetAllOrdersForUserAsync(string buyerEmail)
        {
            // Use CountAsync since it fits out current function, but can change it to ListAsync if you need to fetch all items
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().CountAsync(spec);
        }



    }
}