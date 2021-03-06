USE [listensoftwareDB]
GO
/****** Object:  Table [dbo].[AddressBook]    Script Date: 5/17/2017 6:11:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AddressBook](
	[AddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Company] [varchar](255) NULL,
	[CellPhone] [nchar](20) NULL,
	[MailingCity] [varchar](50) NULL,
	[MailingState] [varchar](50) NULL,
	[MailingAddress] [varchar](255) NULL,
	[MailingZipcode] [varchar](50) NULL,
	[BillingCity] [varchar](50) NULL,
	[BillingState] [varchar](50) NULL,
	[BillingZipcode] [varchar](50) NULL,
	[BillingAddress] [varchar](255) NULL,
	[Type] [varchar](20) NULL,
	[PeopleXrefId] [bigint] NULL,
	[ProductKey] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[Fax] [varchar](50) NULL,
	[ShippingAddress] [varchar](255) NULL,
	[ShippingCity] [varchar](100) NULL,
	[ShippingZipcode] [varchar](50) NULL,
	[ShippingState] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
