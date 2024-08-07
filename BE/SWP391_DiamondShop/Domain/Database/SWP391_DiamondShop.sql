
USE SWP391_DiamondShop
Create Table "Certificate"(
"Id"       INT           NOT NULL IDENTITY(1,1) PRIMARY KEY,
"ReportNumber" NVarchar(255) NOT NULL,
"Origin"       NVarchar(255) NOT NULL,
"Color"        NVarchar(255) NOT NULL,
"CaratWeight"  DECIMAL(8, 2) NOT NULL,
"Clarity"      NVarchar(255) NOT NULL,
"Cut"          NVarchar(255) NOT NULL,
"Date Of Issue" Date		  NOT NULL,
"CreatedBy"    NVARCHAR(255) NULL,
"CreatedDate"  DATE          NULL,
"ModifiedBy"   NVARCHAR(255) NULL,
"ModifiedDate" DATE          NULL,
"DeletedBy"    NVARCHAR(255) NULL,
"DeletedDate"  DATE          NULL,
"IsDeleted"    BIT           NOT NULL DEFAULT '0'
)
CREATE TABLE "Group"
(
    "Id"       INT           NOT NULL IDENTITY(1,1) PRIMARY KEY,
    "Name"     NVARCHAR(255) NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0'
);
CREATE TABLE "Category"
(
    "Id"           INT           NOT NULL Identity (1,1),
    "Name"         NVARCHAR(255) NOT NULL,
	"Group_Id"	   INT           NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Category"
    ADD CONSTRAINT "category_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Collection"
(
    "Id"           INT           NOT NULL Identity (1,1),
    "Name"         NVARCHAR(255) NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Collection"
    ADD CONSTRAINT "collection_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Products"
(
    "Id"                   INT           NOT NULL Identity (1,1),
    "Name"                 NVARCHAR(255) NOT NULL,
    "Gender"               bit           Not Null,
	"Wage"				   Decimal(8,2)  Null,
    "Category_Id"          INT           NOT NULL,
	"DiamondCase_Id"       INT           NOT NULL,
	"Collection_Id"		   INT			 NULL,
    "CreatedBy"            NVARCHAR(255) NULL,
    "CreatedDate"          DATE          NULL,
    "ModifiedBy"           NVARCHAR(255) NULL,
    "ModifiedDate"         DATE          NULL,
    "DeletedBy"            NVARCHAR(255) NULL,
    "DeletedDate"          DATE          NULL,
    "IsDeleted"            BIT           NOT NULL DEFAULT '0',
	CONSTRAINT fk_products_Collection FOREIGN KEY (Collection_Id) REFERENCES "Collection"(Id)
);
ALTER TABLE
    "Products"
    ADD CONSTRAINT "products_id_primary" PRIMARY KEY ("Id");
	CREATE TABLE "DiamondCase"
(
    "Id"                   INT           NOT NULL Identity (1,1),
    "Material"             NVARCHAR(255) NOT NULL,
    "Color"                NVARCHAR(50)  NOT NULL,
	"Name"				   NVARCHAR(50)  NOT NULL,
    "Price"                DECIMAL(12, 2)  NOT NULL,
    "CreatedBy"            NVARCHAR(255) NULL,
    "CreatedDate"          DATE          NULL,
    "ModifiedBy"           NVARCHAR(255) NULL,
    "ModifiedDate"         DATE          NULL,
    "DeletedBy"            NVARCHAR(255) NULL,
    "DeletedDate"          DATE          NULL,
    "IsDeleted"            BIT           NOT NULL DEFAULT '0'
);
CREATE TABLE "WarrantyDocuments"
(
    "Id"                 INT           NOT NULL Identity (1,1),
    "Period"             Date          NOT NULL,
    "TermsAndConditions" NVARCHAR(Max) NOT NULL,
    "CreatedBy"          NVARCHAR(255) NULL,
    "CreatedDate"        DATE          NULL,
    "ModifiedBy"         NVARCHAR(255) NULL,
    "ModifiedDate"       DATE          NULL,
    "DeletedBy"          NVARCHAR(255) Null,
    "DeletedDate"        DATE          NULL,
    "IsDeleted"          BIT           NOT NULL DEFAULT '0'
);
ALTER TABLE
    "WarrantyDocuments"
    ADD CONSTRAINT "warrantydocuments_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Role"
(
    "Id"   INT           NOT NULL Identity (1,1),
    "Name" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Role"
    ADD CONSTRAINT "role_id_primary" PRIMARY KEY ("Id");


CREATE TABLE "Orders"
(
    "Id"           INT           NOT NULL Identity (1,1),
    "Account_Id"   INT           NOT NULL,
	"Address"	   NVARCHAR(255)  NULL,
	"Phone"		   NVARCHAR(255)  NULL,
    "TotalPrice"   DECIMAL(12, 2) NOT NULL,
    "PaymentId"    INT           NULL,
	"CreatedDate"  DATE			 NULL
);
ALTER TABLE
    "Orders"
    ADD CONSTRAINT "orders_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Account"
(
    "Id"                INT           NOT NULL Identity (1,1),
    "Name"              NVARCHAR(255) NOT NULL,
    "Email"             NVARCHAR(255) NOT NULL,
    "Password"          NVARCHAR(255)  NULL,
    "Address"           NVARCHAR(255)  NULL,
    "PhoneNumber"       NVARCHAR(255)  NULL,
	"Point"             DECIMAL(12, 2) NOT NULL DEFAULT '0',
    "Role_Id"           INT           NOT NULL,
    "Gender"            BIT            NULL,
    "ConfirmationToken" NVARCHAR(255)  NULL,
    "CreatedBy"         NVARCHAR(255) NULL,
    "CreatedDate"       DATE          NULL,
    "ModifiedBy"        NVARCHAR(255) NULL,
    "ModifiedDate"      DATE          NULL,
    "DeletedBy"         NVARCHAR(255) NULL,
    "DeletedDate"       DATE          NULL,
    "IsDeleted"         BIT           NOT NULL DEFAULT '0',
	"IsConfirmed"       BIT			  NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Account"
    ADD CONSTRAINT "account_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "OrderStatus"
(
    "Id"          INT           NOT NULL Identity (1,1),
    "Account_Id"  INT           NOT NULL,
	"OrderId"     INT			Not Null,
    "Status"      Nvarchar(255) NOT NULL,
    "CreatedDate" DATE          NULL
);
ALTER TABLE
    "OrderStatus"
    ADD CONSTRAINT "status_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Diamond"
(
    "Id"           INT           NOT NULL Identity (1,1),
	"Certificate_Id" INT	     NOT NULL UNIQUE,
    "Origin"       NVarchar(255) NOT NULL,
    "Color"        NVarchar(255) NOT NULL,
    "CaratWeight"  DECIMAL(8, 2) NOT NULL,
    "Clarity"      NVarchar(255) NOT NULL,
    "Cut"          NVarchar(255) NOT NULL,
    "Name"         NVARCHAR(255) Not Null,
    "Price"        DECIMAL(12, 2) NOT NULL,
    "Quantity"     INT           NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0',
	CONSTRAINT fk_diamond_certificate FOREIGN KEY (Certificate_Id) REFERENCES "Certificate"(Id)
);
ALTER TABLE
    "Diamond"
    ADD CONSTRAINT "diamond_id_primary" PRIMARY KEY ("Id");
create table [Image]
(
    Id             int Identity (1,1) primary key,
    UrlPath        nvarchar(max),

    DiamondId      Int foreign key references [Diamond] (Id),
    ProductId      Int foreign key references [Products] (Id),
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0',
    constraint CHK_Picture_ForeignKey check (
        (ProductId IS NOT NULL AND DiamondId IS NULL)
            OR (ProductId IS NULL AND DiamondId IS NOT NULL)
        )
);
CREATE TABLE "ProductSizes"
(
    "Id"           INT           NOT NULL Identity (1,1),
    "ProductId"    INT           NOT NULL,
    "Size"         DECIMAL(8, 2) NOT NULL,
    "Quantity"     INT           NOT NULL,
    "Price"        DECIMAL(12, 2) NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0',
    PRIMARY KEY ("Id"),
FOREIGN KEY ("ProductId") REFERENCES "Products" ("Id")
);
CREATE TABLE "Payment"
(
    "Id"           INT           NOT NULL Identity (1,1),
    "Name"         NVARCHAR(255) NOT NULL,
    "PaymentType"  Nvarchar(255) NOT NULL,
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Payment"
    ADD CONSTRAINT "payment_id_primary" PRIMARY KEY ("Id");
CREATE TABLE "Promotions"
(
    "Id"                  INT           NOT NULL Identity (1,1),
    "Point"               INT           NOT NULL, 
    "Discount_Percentage" DECIMAL(8, 2) NOT NULL,
);
CREATE TABLE "Vouchers"
(
    "Id"                  INT           NOT NULL Identity (1,1),
    "ProductId"           INT           NULL,
    "IsAllProduct"        BIT           NOT NULL DEFAULT '0',
    "Discount_Percentage" DECIMAL(8, 2) NOT NULL,
    "StartDate"           DATE          NOT NULL,
    "EndDate"             DATE          NOT NULL,
);
ALTER TABLE
    "Vouchers"
    ADD CONSTRAINT "vouchers_id_primary" PRIMARY KEY ("Id");
create table [ProductPart]
(
    Id             int Identity (1,1) primary key,
    IsMain         bit,

    ProductId      int           not null foreign key references [Products] (Id),
    DiamondId      int           not null foreign key references [Diamond] (Id),
    "CreatedBy"    NVARCHAR(255) NULL,
    "CreatedDate"  DATE          NULL,
    "ModifiedBy"   NVARCHAR(255) NULL,
    "ModifiedDate" DATE          NULL,
    "DeletedBy"    NVARCHAR(255) NULL,
    "DeletedDate"  DATE          NULL,
    "IsDeleted"    BIT           NOT NULL DEFAULT '0'
);

Create Table Cart(
	CartId INT IDENTITY (1,1)Primary Key,
	ProductId INT NULL ,
	DiamondId INT NULL,
	Quantity INT,
    Size     DECIMAL(8,2) NULL,
	TotalPrice DECIMAL(12, 2),
	CreatedBy NVARCHAR(255) NULL,
	CreatedDate DATE NULL,
	DeletedDate DATE NULL,
	DeletedBy NVARCHAR(255) NULL,
	IsDeleted BIT  NOT NULL DEFAULT '0',
	   constraint CHK_Cart_ForeignKey check (
        (ProductId IS NOT NULL AND DiamondId IS NULL)
            OR (ProductId IS NULL AND DiamondId IS NOT NULL)
        ),
	CONSTRAINT fk_cart_products FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT fk_cart_diamonds FOREIGN KEY (DiamondId) REFERENCES Diamond(Id)
);
CREATE TABLE OrderCart
(
    CartId INT ,
    OrderId INT,
    Quantity    INT,
	WarrantyDocument_Id INT ,
    Price       DECIMAL(12, 2),
	PRIMARY KEY (OrderId, CartId),
	CONSTRAINT fk_ordercart_orders FOREIGN KEY (OrderId) REFERENCES Orders(Id),
    CONSTRAINT fk_ordercart_cart FOREIGN KEY (CartId) REFERENCES Cart(CartId),
	CONSTRAINT fk_ordercart_warranty FOREIGN KEY (WarrantyDocument_Id) REFERENCES "WarrantyDocuments"(Id)
);
ALTER TABLE
    "DiamondCase"
    ADD CONSTRAINT "DiamondCase_id_primary" PRIMARY KEY ("Id");
ALTER TABLE 
"Products"
ADD CONSTRAINT "FK_Products_DiamondCase" FOREIGN KEY ("DiamondCase_Id") REFERENCES "DiamondCase"("Id");
ALTER TABLE
    "Promotions"
    ADD CONSTRAINT "promotions_id_primary" PRIMARY KEY ("Id");
ALTER TABLE
    "Account"
    ADD CONSTRAINT "account_role_id_foreign" FOREIGN KEY ("Role_Id") REFERENCES "Role" ("Id");
ALTER TABLE
    "Orders"
    ADD CONSTRAINT "orders_paymentid_foreign" FOREIGN KEY ("PaymentId") REFERENCES "Payment" ("Id");
ALTER TABLE "OrderStatus"
ADD CONSTRAINT "FK_OrderStatus_Orders"
FOREIGN KEY ("OrderId") REFERENCES "Orders"("Id");
ALTER TABLE
    "Products"
    ADD CONSTRAINT "products_category_id_foreign" FOREIGN KEY ("Category_Id") REFERENCES "Category" ("Id");
ALTER TABLE
    "OrderStatus"
ADD CONSTRAINT "status_account_id_foreign" FOREIGN KEY ("Account_Id") REFERENCES "Account" ("Id");
ALTER TABLE
    "Orders"
    ADD CONSTRAINT "orders_account_id_foreign" FOREIGN KEY ("Account_Id") REFERENCES "Account" ("Id");
ALTER TABLE "Category"
ADD CONSTRAINT FK_Category_Group
FOREIGN KEY ("Group_Id") REFERENCES "Group"("Id");