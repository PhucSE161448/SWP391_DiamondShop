﻿using Application.IRepositories.Promotions;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Promotions
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public PromotionRepository(SWP391_DiamondShopContext dbContext)
        {

            _dbContext = dbContext;

        }
        public async Task<IEnumerable<Promotion>> GetAllPromotionAsync()
        {
            return await _dbContext.Promotions.ToListAsync();
        }
        public async Task<Promotion> GetPromotionByIdAsync(int id)
        {
            return await _dbContext.Promotions.FindAsync(id);
        }
        public async Task<Promotion> CreatePromotionAsync(Promotion promotion)
        {
            _dbContext.Promotions.Add(promotion);
            await _dbContext.SaveChangesAsync();
            return promotion;
        }

        public async Task<bool> DeletePromotionAsync(int id)
        {
            var promotion = await _dbContext.Promotions.FindAsync(id);
            if (promotion == null)
            {
                return false;
            }
            _dbContext.Promotions.Remove(promotion);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
