USE [listensoftwareDB]
GO
/****** Object:  Table [dbo].[ServiceInformation]    Script Date: 5/17/2017 6:11:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceInformation](
	[ServiceId] [bigint] IDENTITY(1,1) NOT NULL,
	[ServiceDescription] [varchar](255) NULL,
	[Price] [money] NULL,
	[AddOns] [varchar](1000) NULL,
	[ServiceTypeXRefId] [bigint] NULL,
	[CreatedDate] [datetime] NULL,
	[AddressId] [bigint] NULL,
	[ContractId] [bigint] NULL,
	[SquareFeetOfStructure] [int] NULL,
	[LocationDescription] [varchar](255) NULL,
	[LocationGPS] [varchar](255) NULL,
	[Comments] [varchar](1000) NULL,
	[Status] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
ALTER TABLE [dbo].[ServiceInformation]  WITH CHECK ADD FOREIGN KEY([AddressId])
REFERENCES [dbo].[AddressBook] ([AddressId])
GO
ALTER TABLE [dbo].[ServiceInformation]  WITH CHECK ADD FOREIGN KEY([ContractId])
REFERENCES [dbo].[Contract] ([ContractId])
GO
ALTER TABLE [dbo].[ServiceInformation]  WITH CHECK ADD FOREIGN KEY([ServiceTypeXRefId])
REFERENCES [dbo].[UDC] ([XRefId])
GO
