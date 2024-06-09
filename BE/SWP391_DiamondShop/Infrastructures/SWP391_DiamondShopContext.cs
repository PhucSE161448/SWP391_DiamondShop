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

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Diamond> Diamonds { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductPart> ProductParts { get; set; }
        public virtual DbSet<ProductSize> ProductSizes { get; set; }
        public virtual DbSet<Promotion> Promotions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<WarrantyDocument> WarrantyDocuments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//             if (!optionsBuilder.IsConfigured)
//             {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                 optionsBuilder.UseSqlServer("Server=(local);database=SWP391_DiamondShop;uid=sa;pwd=12345;TrustServerCertificate=True;");
//             }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.ConfirmationToken)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Point).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.RoleId).HasColumnName("Role_Id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("account_role_id_foreign");
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

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Diamond>(entity =>
            {
                entity.ToTable("Diamond");

                entity.Property(e => e.CaratWeight).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Clarity)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Cut)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Origin)
                    .IsRequired()
                    .HasMaxLength(255);

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
                    .HasConstraintName("FK__Image__DiamondId__4CA06362");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Image__ProductId__4D94879B");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.AccountId).HasColumnName("Account_Id");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.StatusId).HasColumnName("Status_Id");

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

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_status_id_foreign");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(e => e.OrderItemId).ValueGeneratedNever();

                entity.Property(e => e.ItemType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("fk_order_items_diamonds");

                entity.HasOne(d => d.ItemNavigation)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("fk_order_items_products");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("fk_order_items_orders");
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

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PaymentType)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.WarrantyDocumentsId, "UQ__Products__0133729ABBC0E70A")
                    .IsUnique();

                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DeletedBy).HasMaxLength(255);

                entity.Property(e => e.DeletedDate).HasColumnType("date");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.WarrantyDocumentsId).HasColumnName("WarrantyDocuments_Id");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("products_category_id_foreign");

                entity.HasOne(d => d.WarrantyDocuments)
                    .WithOne(p => p.Product)
                    .HasForeignKey<Product>(d => d.WarrantyDocumentsId)
                    .HasConstraintName("products_warrantydocuments_id_foreign");
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
                    .HasConstraintName("FK__ProductPa__Diamo__5BE2A6F2");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductParts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductPa__Produ__5AEE82B9");
            });

            modelBuilder.Entity<ProductSize>(entity =>
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

                entity.Property(e => e.Price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Size).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSizes)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductSi__Produ__534D60F1");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
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

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.ToTable("Status");

                entity.Property(e => e.AccountId).HasColumnName("Account_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Statuses)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("status_account_id_foreign");
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

                entity.Property(e => e.TermsAndConditions).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
