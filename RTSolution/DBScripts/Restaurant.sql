USE [Restaurant]
GO
/****** Object:  Table [dbo].[ProductGroup]    Script Date: 09/04/2013 22:31:53 ******/
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
SET IDENTITY_INSERT [dbo].[ProductGroup] ON
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (1, N'Drinkss', N'Hot or Cold drinkss', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x7E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (2, N'Thaikkk', N'Varieties of Thail dishes aha', 0, N'hema', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (3, N'Roti items', N'Lot of roti items', 1, N'Abirami', CAST(0x7D370B00 AS Date), CAST(0x7E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (4, N'Sweetss', N'All tasty sweetss', 1, N'Kaveri', CAST(0x00000000 AS Date), CAST(0x7E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (12, N'Drinks', N'Hot or Cold drinks', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (13, N'Drinks', N'Hot or Cold drinks', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (14, N'Drinks', N'Hot or Cold drinkss', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (15, N'Drinks', N'Hot or Cold drinkss', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (16, N'Thai', N'Varieties of Thail dishes aha', 1, N'hema', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (17, N'test', N'test', 1, N'admin', CAST(0x8A370B00 AS Date), CAST(0x8A370B00 AS Date))
SET IDENTITY_INSERT [dbo].[ProductGroup] OFF
/****** Object:  Table [dbo].[Product]    Script Date: 09/04/2013 22:31:53 ******/
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
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (1, 1, NULL, N'Tea', N'Tea', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (2, 1, 1, N'Cold Tea', N'Cold Tea', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 120.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (3, 1, 1, N'Hot Tea', N'Hot Tea', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 130.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (4, 2, NULL, N'Rasam', N'Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (5, 2, 4, N'Hot Rasam', N'Hot Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 6.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (6, 2, 4, N'Cold Rasam', N'Cold Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 8.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (7, 2, 4, N'Medium Rasam', N'Medium Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (8, 3, NULL, N'Poori', N'Poori', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (9, 3, 8, N'Chappathi', N'Chappathi', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (10, 3, 8, N'Chappathi', N'Chappathi', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties')
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (13, 4, NULL, N'Halwa', N'Halwa', CAST(0x94360B00 AS Date), 30, 2, 40.0000, 40.0000, 40.0000, 40.0000, 40.0000, N'Menaka', CAST(0x94360B00 AS Date), CAST(0x94360B00 AS Date), 1, NULL)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks]) VALUES (14, 4, 13, N'T Halwa', N'T Halwa', CAST(0x94360B00 AS Date), 10, 3, 50.0000, 50.0000, 50.0000, 50.0000, 50.0000, N'Menaka', CAST(0x94360B00 AS Date), CAST(0x94360B00 AS Date), 1, N'test')
SET IDENTITY_INSERT [dbo].[Product] OFF
/****** Object:  Table [dbo].[Order]    Script Date: 09/04/2013 22:31:53 ******/
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
SET IDENTITY_INSERT [dbo].[Order] ON
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (138, NULL, 0, 350.0000, N'', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (139, NULL, 0, 70.0000, N'A4,B3', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (140, NULL, 0, 70.0000, N'B1,B2', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (141, NULL, 0, 105.0000, N'A6', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (142, NULL, 0, 70.0000, N'A1,A2', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (143, NULL, 0, 70.0000, N'A3,A5', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (144, NULL, 0, 70.0000, N'A8', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (145, CAST(0x0000A22F0129B830 AS DateTime), 0, 70.0000, N'B5', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
SET IDENTITY_INSERT [dbo].[Order] OFF
/****** Object:  Table [dbo].[OrderedProduct]    Script Date: 09/04/2013 22:31:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderedProduct](
	[OrderId] [bigint] NOT NULL,
	[ProductId] [bigint] NOT NULL,
	[Quantity] [int] NULL,
	[Price] [money] NULL,
	[Type] [int] NOT NULL,
	[CreatedBy] [uniqueidentifier] NULL,
 CONSTRAINT [pkc_Name] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC,
	[ProductId] ASC,
	[Type] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (138, 2, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (138, 3, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (138, 5, 1, 70.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (138, 9, 1, 70.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (138, 10, 2, 70.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (139, 1, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (139, 2, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 5, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 6, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 3, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 6, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 8, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (142, 1, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (142, 2, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 9, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 10, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (144, 2, 1, 35.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (144, 3, 1, 35.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (145, 1, 1, 35.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (145, 2, 1, 35.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
/****** Object:  Table [dbo].[Bill]    Script Date: 09/04/2013 22:31:53 ******/
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
/****** Object:  ForeignKey [FK_Bill_aspnet_Users]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_aspnet_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_aspnet_Users]
GO
/****** Object:  ForeignKey [FK_Bill_Order]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_Order]
GO
/****** Object:  ForeignKey [FK_Order_aspnet_Users]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_aspnet_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_aspnet_Users]
GO
/****** Object:  ForeignKey [FK_OrderedProduct_aspnet_Users]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProduct_aspnet_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProduct_aspnet_Users]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Order]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Order]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Product]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Product]
GO
/****** Object:  ForeignKey [FK_Product_ProductGroup]    Script Date: 09/04/2013 22:31:53 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductGroup] FOREIGN KEY([ProductGroupID])
REFERENCES [dbo].[ProductGroup] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductGroup]
GO
