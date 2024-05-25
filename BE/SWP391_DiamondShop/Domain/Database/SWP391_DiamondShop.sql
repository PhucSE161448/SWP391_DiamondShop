

CREATE TABLE "Clarity"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Color" NVARCHAR(255) NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Clarity" ADD CONSTRAINT "clarity_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Cut"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Price" BIGINT NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIGINT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Cut" ADD CONSTRAINT "cut_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Origin"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "CreatedBy" NVARCHAR(255) NULL,
    "CreatedDate" DATE NULL,
    "ModifiedBy" NVARCHAR(255) NULL,
    "ModifiedDate" DATE NULL,
    "DeletedBy" NVARCHAR(255) NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Origin" ADD CONSTRAINT "origin_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Category"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Category" ADD CONSTRAINT "category_id_primary" PRIMARY KEY("Id");
CREATE TABLE "CaratWeight"(
    "Id" INT NOT NULL,
    "Weight" FLOAT NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "CaratWeight" ADD CONSTRAINT "caratweight_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Products"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Size" DECIMAL(8, 2) NOT NULL,
    "Image_Url" NVARCHAR(255) NOT NULL,
    "Quantity" INT NOT NULL,
    "Category_Id" INT NOT NULL,
    "Diamond_Id" INT NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "Wage" DECIMAL(8, 2) NOT NULL,
    "WarrantyDocuments_Id" INT NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "isDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Products" ADD CONSTRAINT "products_id_primary" PRIMARY KEY("Id");
CREATE TABLE "WarrantyDocuments"(
    "Id" INT NOT NULL,
    "Period" INT NOT NULL,
    "TermsAndConditions" NVARCHAR(255) NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "WarrantyDocuments" ADD CONSTRAINT "warrantydocuments_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Role"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Role" ADD CONSTRAINT "role_id_primary" PRIMARY KEY("Id");
CREATE TABLE "OrderProduct"(
    "ProductId" INT NOT NULL,
    "OrderId" INT NOT NULL,
    "Quantity" INT NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
	Primary Key("ProductId","OrderID")
);

CREATE TABLE "Orders"(
    "Id" INT NOT NULL,
    "Account_Id" INT NOT NULL,
    "TotalPrice" DECIMAL(8, 2) NOT NULL,
    "Status_Id" INT NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0',
    "PaymentId" INT NOT NULL
);
ALTER TABLE
    "Orders" ADD CONSTRAINT "orders_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Account"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "Password" NVARCHAR(255) NOT NULL,
    "Address" NVARCHAR(255) NOT NULL,
    "PhoneNumber" NVARCHAR(255) NOT NULL,
    "Role_Id" INT NOT NULL,
    "Gender" BIT NOT NULL,
    "ConfirmationToken" NVARCHAR(255) NOT NULL,
    "CreatedBy" NVARCHAR(255) NULL,
    "CreatedDate" DATE NULL,
    "ModifiedBy" NVARCHAR(255) NULL,
    "ModifiedDate" DATE NULL,
    "DeletedBy" NVARCHAR(255) NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0',
    "Point" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "Account" ADD CONSTRAINT "account_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Status"(
    "Id" INT NOT NULL,
    "Account_Id" INT NOT NULL,
    "Name" INT NOT NULL,
    "CreatedDate" DATE NOT NULL
);
ALTER TABLE
    "Status" ADD CONSTRAINT "status_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Diamond"(
    "Id" INT NOT NULL,
    "Origin_Id" INT NOT NULL,
    "CaratWeight_Id" INT NOT NULL,
    "Color_Id" INT NOT NULL,
    "Clarity_Id" INT NOT NULL,
    "Cut_Id" INT NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "Quantity" INT NOT NULL,
    "ImageUrl" NVARCHAR(255) NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Diamond" ADD CONSTRAINT "diamond_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Payment"(
    "Id" INT NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "PaymentType" BIGINT NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Payment" ADD CONSTRAINT "payment_id_primary" PRIMARY KEY("Id");
CREATE TABLE "Promotions"(
    "Id" INT NOT NULL,
    "Discount_Percentage" DECIMAL(8, 2) NOT NULL,
    "StartDate" DATE NOT NULL,
    "EndDate" DATE NOT NULL,
    "CreatedBy" NVARCHAR(255) NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedBy" NVARCHAR(255) NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "DeletedBy" NVARCHAR(255) NOT NULL,
    "DeletedDate" DATE NOT NULL,
    "IsDeleted" BIT NOT NULL DEFAULT '0'
);
ALTER TABLE
    "Promotions" ADD CONSTRAINT "promotions_id_primary" PRIMARY KEY("Id");
ALTER TABLE
    "Diamond" ADD CONSTRAINT "diamond_clarity_id_foreign" FOREIGN KEY("Clarity_Id") REFERENCES "Clarity"("Id");
ALTER TABLE
    "OrderProduct" ADD CONSTRAINT "orderproduct_orderid_foreign" FOREIGN KEY("OrderId") REFERENCES "Orders"("Id");
ALTER TABLE
    "Diamond" ADD CONSTRAINT "diamond_caratweight_id_foreign" FOREIGN KEY("CaratWeight_Id") REFERENCES "CaratWeight"("Id");
ALTER TABLE
    "Account" ADD CONSTRAINT "account_role_id_foreign" FOREIGN KEY("Role_Id") REFERENCES "Role"("Id");
ALTER TABLE
    "Diamond" ADD CONSTRAINT "diamond_cut_id_foreign" FOREIGN KEY("Cut_Id") REFERENCES "Cut"("Id");
ALTER TABLE
    "Orders" ADD CONSTRAINT "orders_paymentid_foreign" FOREIGN KEY("PaymentId") REFERENCES "Payment"("Id");
ALTER TABLE
    "Orders" ADD CONSTRAINT "orders_status_id_foreign" FOREIGN KEY("Status_Id") REFERENCES "Status"("Id");
ALTER TABLE
    "OrderProduct" ADD CONSTRAINT "products_id_foreign" FOREIGN KEY("ProductId") REFERENCES "Products"("Id");

ALTER TABLE
    "Products" ADD CONSTRAINT "products_warrantydocuments_id_foreign" FOREIGN KEY("WarrantyDocuments_Id") REFERENCES "WarrantyDocuments"("Id");
ALTER TABLE
    "Products" ADD CONSTRAINT "products_category_id_foreign" FOREIGN KEY("Category_Id") REFERENCES "Category"("Id");
ALTER TABLE
    "Status" ADD CONSTRAINT "status_account_id_foreign" FOREIGN KEY("Account_Id") REFERENCES "Account"("Id");
ALTER TABLE
    "Diamond" ADD CONSTRAINT "diamond_origin_id_foreign" FOREIGN KEY("Origin_Id") REFERENCES "Origin"("Id");
ALTER TABLE
    "Products" ADD CONSTRAINT "products_diamond_id_foreign" FOREIGN KEY("Diamond_Id") REFERENCES "Diamond"("Id");
ALTER TABLE
    "Orders" ADD CONSTRAINT "orders_account_id_foreign" FOREIGN KEY("Account_Id") REFERENCES "Account"("Id");