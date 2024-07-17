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
        public async Task<IEnumerable<PromotionDTO>> GetAllPromotionAsync()
        {
            var promotionList = await _unitOfWork.PromotionRepository.GetAllPromotionAsync();
            var promotionListDTO = new List<PromotionDTO>();
            foreach (var promotion in promotionList)
            {
                promotionListDTO.Add(promotion.Adapt<PromotionDTO>());
            }
            return promotionListDTO;

        }
        public async Task<PromotionDTO> GetPromotionByIdAsync(int id)
        {
            var promotion = await _unitOfWork.PromotionRepository.GetPromotionByIdAsync(id);
            if (promotion == null)
            {
                throw new NotFoundException("Id không tồn tại trong hệ thống");
            }
            return promotion.Adapt<PromotionDTO>();
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
        public async Task<CreatePromotionDTO> CreatePromotionAsync(CreatePromotionDTO createPromotionDTO)
        {
            var newPromotion = await _unitOfWork.PromotionRepository.CreatePromotionAsync(createPromotionDTO.Adapt<Promotion>());
            return newPromotion.Adapt<CreatePromotionDTO>();
        }
        public decimal DiscountFromPoint(decimal price, int point)
        {
            decimal result;
            if (point >= 20000)
            {
                result = price * 1.5m;
            }
            else if (point >= 15000)
            {
                result = price * 1m;
            }
            else if (point >= 10000)
            {
                result = price * 0.5m;
            }
            else
            {
                result = price;
            }
            return result;
        }
        public int GetPromotionIdFromPoint(int point)
        {
            var result = 0;
            if (point >= 20000)
            {
                result = 3;
            }
            else if (point >= 15000)
            {
                result = 2;
            }
            else if (point >= 10000)
            {
                result = 1;
            }
            return result;
        }

        public async Task<float> GetDiscountPercentageForUser(int userId)
        {
            var user = await _unitOfWork.AccountRepo.GetByIdAsync(userId);
            float discount = 0f;
            if (user.Point >= 20000)
            {
                discount = 1.5f;
            }
            else if (user.Point >= 15000)
            {
                discount = 1f;
            }
            else if (user.Point >= 10000)
            {
                discount = 0.5f;
            }
            return discount;
        }
    }
}
