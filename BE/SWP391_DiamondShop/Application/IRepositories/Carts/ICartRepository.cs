using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Carts;
using Domain.Model;

namespace Application.IRepositories.Carts
{
    public interface ICartRepository 
    {
        Task<Cart> CreateCart(bool check,CreateCartDTO dto);
        Task<CartDTO> UpdateQuantity(bool check, int cartId);
        Task<List<CartDTO>> GetCartWithUserId();
        Task Delete(int cartId);
    }
}
