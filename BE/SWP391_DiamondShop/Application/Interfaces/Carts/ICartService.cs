using Application.ViewModels.Carts;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Carts
{
    public interface ICartService
    {
        Task<Cart> CreateCart(bool check, CreateCartDTO dto);
        Task<List<CartDTO>> GetCartWithUserName();
    }
}
