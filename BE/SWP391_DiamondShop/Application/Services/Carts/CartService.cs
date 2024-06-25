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

        public Task<List<CartDTO>> GetCartWithUserName() => _unitOfWork.CartRepository.GetCartWithUserId();
    }
}
