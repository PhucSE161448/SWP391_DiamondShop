﻿using Application.Interfaces;
using Application.IRepositories.Accounts;
using Application.IRepositories.Diamonds;
using Application.IRepositories.Products;
using Application.IRepositories.WarrantyDocuments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.IRepositories.Carts;
using Application.IRepositories.Categories;
using Application.IRepositories.Images;
using Application.IRepositories.ProductParts;
using Application.IRepositories.ProductSizes;
using Application.IRepositories.Roles;

namespace Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SWP391_DiamondShopContext context;

        private readonly IWarrantyDocumentRepo warrantyDocumentRepo;
        private readonly IAccountRepo accountRepo;
        private readonly IProductRepo productRepo;
        private readonly IDiamondRepo diamondRepo;
        private readonly ICategoryRepo categoryRepo;
        private readonly IProductPartRepo productPartRepo;
        private readonly IProductSizeRepo productSizeRepo;
        private readonly IRoleRepo roleRepo;
        private readonly IImageRepo imageRepo;
        private readonly ICartRepository cartRepo;
        public UnitOfWork(SWP391_DiamondShopContext _context, IWarrantyDocumentRepo _warrantyDocumentRepo,
            IAccountRepo _accountRepo, IProductRepo _productRepo,
            IDiamondRepo _diamondRepo, ICategoryRepo _categoryRepo,
            IProductPartRepo _productPartRepo, IProductSizeRepo _productSizeRepo, IRoleRepo _roleRepo,
            IImageRepo _imageRepo, ICartRepository _cartRepo)
        {
            context = _context;
            warrantyDocumentRepo = _warrantyDocumentRepo;
            accountRepo = _accountRepo;
            productRepo = _productRepo;
            diamondRepo = _diamondRepo;
            categoryRepo = _categoryRepo;
            productPartRepo = _productPartRepo;
            productSizeRepo = _productSizeRepo;
            roleRepo = _roleRepo;
            imageRepo = _imageRepo;
            cartRepo = _cartRepo;
        }
        
        public IWarrantyDocumentRepo WarrantyDocumentRepo => warrantyDocumentRepo;
        public IAccountRepo AccountRepo => accountRepo;
        public IProductRepo ProductRepo => productRepo;
        public IDiamondRepo DiamondRepo => diamondRepo;

        public ICategoryRepo CategoryRepo => categoryRepo;
        public IProductPartRepo ProductPartRepo => productPartRepo;
        public IProductSizeRepo ProductSizeRepo => productSizeRepo;
        public IRoleRepo RoleRepo => roleRepo;
        public IImageRepo ImageRepo => imageRepo;
        public ICartRepository CartRepository => cartRepo;

        public async Task<int> SaveChangeAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
