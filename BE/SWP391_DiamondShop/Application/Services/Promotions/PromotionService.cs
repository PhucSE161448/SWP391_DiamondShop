using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Promotions;
using Application.ViewModels.Promotions;
using Application.ViewModels.Vouchers;
using Domain.Model;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Promotions
{
    public class PromotionService : IPromotionService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PromotionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Promotion>> GetAllPromotionAsync()
        {
            return await _unitOfWork.PromotionRepository.GetAllPromotionAsync();
        }
        public async Task<Promotion> GetPromotionByIdAsync(int id)
        {
            var promotion = await _unitOfWork.PromotionRepository.GetPromotionByIdAsync(id);
            if (promotion == null)
            {
                throw new NotFoundException("Id không tồn tại trong hệ thống");
            }
            return promotion;
        }
        public async Task<bool> DeletePromotionAsync(int id)
        {
            var getPromotionToDelete = await _unitOfWork.PromotionRepository.DeletePromotionAsync(id);
            if (getPromotionToDelete)
            {
                return true;
            }
            else
            {
                throw new NotFoundException("Promotion không tồn tại");
            }
        }
        public async Task<Promotion> CreatePromotionAsync(CreatePromotionDTO createPromotionDTO)
        {
            var newPromotion = createPromotionDTO.Adapt<Promotion>();
            await _unitOfWork.PromotionRepository.CreatePromotionAsync(newPromotion);
            return newPromotion;
        }
    }
}
