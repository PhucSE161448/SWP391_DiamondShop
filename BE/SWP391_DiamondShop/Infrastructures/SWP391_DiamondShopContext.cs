using System;
using System.Collections.Generic;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Infrastructures
{
    public partial class SWP391_DiamondShopContext : DbContext
    {
        public SWP391_DiamondShopContext()
        {
        }

        public SWP391_DiamondShopContext(DbContextOptions<SWP391_DiamondShopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Diamond> Diamonds { get; set; } = null!;
        public virtual DbSet<DiamondCase> DiamondCases { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderCart> OrderCarts { get; set; } = null!;
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductPart> ProductParts { get; set; } = null!;
        public virtual DbSet<ProductSize> ProductSizes { get; set; } = null!;
        public virtual DbSet<Promotion> Promotions { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<WarrantyDocument> WarrantyDocuments { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);uid=sa;pwd=12345;database=SWP391_DiamondShop;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.ConfirmationToken).HasMaxLength(255);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(255);

                entity.Property(e => e.Point).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.RoleId).HasColumnName("Role_Id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("account_role_id_foreign");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.Diamond)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.DiamondId)
                    .HasConstraintName("fk_cart_diamonds");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("fk_cart_products");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Diamond>(entity =>
            {
                entity.ToTable("Diamond");

                entity.Property(e => e.CaratWeight).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Clarity).HasMaxLength(255);

                entity.Property(e => e.Color).HasMaxLength(255);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Cut).HasMaxLength(255);

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.DiscountPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("Discount_Price")
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Origin).HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnType("decimal(8, 2)");
            });

            modelBuilder.Entity<DiamondCase>(entity =>
            {
                entity.ToTable("DiamondCase");

                entity.Property(e => e.Color).HasMaxLength(50);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.Material).HasMaxLength(255);

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(8, 2)");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("Image");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.HasOne(d => d.Diamond)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.DiamondId)
                    .HasConstraintName("FK__Image__DiamondId__4E88ABD4");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Image__ProductId__4F7CD00D");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.AccountId).HasColumnName("Account_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_account_id_foreign");

                entity.HasOne(d => d.Payment)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.PaymentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_paymentid_foreign");
            });

            modelBuilder.Entity<OrderCart>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.CartId })
                    .HasName("PK__OrderCar__A68B96B4E7D608DE");

                entity.ToTable("OrderCart");

                entity.HasIndex(e => e.WarrantyDocumentId, "UQ__OrderCar__BD0CDCB7D25ADA6B")
                    .IsUnique();

                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.WarrantyDocumentId).HasColumnName("WarrantyDocument_Id");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.OrderCarts)
                    .HasForeignKey(d => d.CartId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_ordercart_cart");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderCarts)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_ordercart_orders");

                entity.HasOne(d => d.WarrantyDocument)
                    .WithOne(p => p.OrderCart)
                    .HasForeignKey<OrderCart>(d => d.WarrantyDocumentId)
                    .HasConstraintName("fk_ordercart_warranty");
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.ToTable("OrderStatus");

                entity.Property(e => e.AccountId).HasColumnName("Account_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Status).HasMaxLength(255);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.OrderStatuses)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("status_account_id_foreign");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderStatuses)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderStatus_Orders");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.PaymentType).HasMaxLength(255);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.DiamondCaseId).HasColumnName("DiamondCase_Id");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Wage).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("products_category_id_foreign");

                entity.HasOne(d => d.DiamondCase)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.DiamondCaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_DiamondCase");
            });

            modelBuilder.Entity<ProductPart>(entity =>
            {
                entity.ToTable("ProductPart");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.HasOne(d => d.Diamond)
                    .WithMany(p => p.ProductParts)
                    .HasForeignKey(d => d.DiamondId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductPa__Diamo__5FB337D6");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductParts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductPa__Produ__5EBF139D");
            });

            modelBuilder.Entity<ProductSize>(entity =>
            {
                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.DiscountPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("Discount_Price")
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Size).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSizes)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductSi__Produ__5629CD9C");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.DiscountPercentage)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("Discount_Percentage");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Promotions)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("fk_promotions_category");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<WarrantyDocument>(entity =>
            {
                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Period).HasColumnType("date");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
