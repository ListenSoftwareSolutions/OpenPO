USE [listensoftwareDB]
GO
/****** Object:  Table [dbo].[AcctPay]    Script Date: 5/17/2017 6:11:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AcctPay](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DocNumber] [bigint] NULL,
	[DocType] [varchar](10) NULL,
	[InvoiceNumber] [varchar](50) NULL,
	[InvoiceAmount] [money] NULL,
	[InvoiceDate] [datetime] NULL,
	[PaymentTerms] [varchar](10) NULL,
	[GrossAmount] [money] NULL,
	[Remark] [varchar](max) NULL,
	[GLDate] [datetime] NULL,
	[AccountNumber] [varchar](100) NULL,
	[SupplierAddressId] [bigint] NULL,
	[CustomerAddressId] [bigint] NULL,
	[ContractId] [bigint] NULL,
	[POQuoteId] [bigint] NULL,
	[Description] [varchar](1000) NULL,
	[ItemNumber] [bigint] NULL,
	[PONumber] [varchar](50) NULL,
 CONSTRAINT [PK_AcctPay] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
