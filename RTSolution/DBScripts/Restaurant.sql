USE [Restaurant]
GO
/****** Object:  Table [dbo].[ProductGroup]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ProductGroup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Details] [text] NULL,
	[Status] [bit] NOT NULL,
	[CreatedBy] [varchar](25) NOT NULL,
	[CreatedDate] [date] NOT NULL,
	[ModifiedDate] [date] NOT NULL,
 CONSTRAINT [PK_ProductGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Order]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[Status] [tinyint] NULL,
	[TotalAmount] [money] NULL,
	[Seats] [varchar](200) NULL,
	[CreatedBy] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0=ordered     1=Paid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Order', @level2type=N'COLUMN',@level2name=N'Status'
GO
/****** Object:  Table [dbo].[Kitchen]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Kitchen](
	[KitchenID] [int] IDENTITY(1,1) NOT NULL,
	[KitchenName] [varchar](50) NULL,
 CONSTRAINT [PK_Kitchen] PRIMARY KEY CLUSTERED 
(
	[KitchenID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Bill]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bill](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[OrderId] [bigint] NULL,
	[TotalAmount] [money] NULL,
	[PaidAmount] [money] NULL,
	[BalanceAmount] [money] NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_Bill] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ProductGroupID] [bigint] NOT NULL,
	[MasterProductID] [bigint] NULL,
	[Name] [varchar](50) NOT NULL,
	[Details] [text] NOT NULL,
	[ExpiryDate] [date] NULL,
	[Stock] [int] NULL,
	[LowStockRange] [int] NULL,
	[ActualPrice] [money] NULL,
	[FirstSellingPrice] [money] NULL,
	[SecondSellingPrice] [money] NULL,
	[ThirdSellingPrice] [money] NULL,
	[FourthSellingPrice] [money] NULL,
	[CreatedBy] [varchar](25) NOT NULL,
	[CreatedDate] [date] NOT NULL,
	[ModifiedDate] [date] NOT NULL,
	[IsQuickProduct] [bit] NOT NULL,
	[Remarks] [text] NULL,
	[KitchenID] [int] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[OrderedProduct]    Script Date: 09/09/2013 19:23:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OrderedProduct](
	[OrderId] [bigint] NOT NULL,
	[ProductId] [bigint] NOT NULL,
	[Quantity] [int] NULL,
	[Price] [money] NULL,
	[Type] [int] NOT NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[ProductName] [varchar](50) NULL,
	[Amount] [decimal](18, 0) NULL,
 CONSTRAINT [pkc_Name] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC,
	[ProductId] ASC,
	[Type] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_Bill_Order]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_Order]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Order]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Order]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Product]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Product]
GO
/****** Object:  ForeignKey [FK_Product_Kitchen]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Kitchen] FOREIGN KEY([KitchenID])
REFERENCES [dbo].[Kitchen] ([KitchenID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Kitchen]
GO
/****** Object:  ForeignKey [FK_Product_Product]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Product] FOREIGN KEY([MasterProductID])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Product]
GO
/****** Object:  ForeignKey [FK_Product_ProductGroup]    Script Date: 09/09/2013 19:23:59 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductGroup] FOREIGN KEY([ProductGroupID])
REFERENCES [dbo].[ProductGroup] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductGroup]
GO
