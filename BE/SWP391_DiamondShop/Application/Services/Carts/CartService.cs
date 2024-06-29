using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.Carts;
using Application.ViewModels.Carts;
using Domain.Model;

namespace Application.Services.Carts
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CartService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Cart> CreateCart(bool check, CreateCartDTO dto)
        {
           var cart = await _unitOfWork.CartRepository.CreateCart(check, dto);
           await _unitOfWork.SaveChangeAsync();
           return cart;
        }

        public async Task<List<CartDTO>> GetCartWithUserName() => await _unitOfWork.CartRepository.GetCartWithUserId();

        public async Task<CartDTO> UpdateQuantity(bool check, int cartId) {
           var cart = await _unitOfWork.CartRepository.UpdateQuantity(check, cartId);
           await _unitOfWork.SaveChangeAsync();
           return cart;
        }

        public async Task Delete(int cartId)
        {
           await _unitOfWork.CartRepository.Delete(cartId);
           await _unitOfWork.SaveChangeAsync();
        }
    }
}
