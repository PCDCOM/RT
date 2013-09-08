USE [Restaurant]
GO
/****** Object:  Table [dbo].[ProductGroup]    Script Date: 09/08/2013 12:06:21 ******/
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
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (1, N'Drinkss', N'Hot or Cold drinksssdf', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (2, N'Thaikkk', N'Varieties of Thail dishes aha', 0, N'hema', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (3, N'Roti items', N'Lot of roti items', 1, N'Abirami', CAST(0x7D370B00 AS Date), CAST(0x7E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (4, N'Sweetss', N'All tasty sweetss', 1, N'Kaveri', CAST(0x00000000 AS Date), CAST(0x7E370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (12, N'Drinks', N'Hot or Cold drinks', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (13, N'Drinks', N'Hot or Cold drinks', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (14, N'Drinks', N'Hot or Cold drinkss', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (15, N'Drinks', N'Hot or Cold drinkss', 1, N'suresh', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (16, N'Thai', N'Varieties of Thail dishes aha', 1, N'hema', CAST(0x00000000 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (17, N'test', N'test', 1, N'admin', CAST(0x8A370B00 AS Date), CAST(0x8A370B00 AS Date))
INSERT [dbo].[ProductGroup] ([Id], [Name], [Details], [Status], [CreatedBy], [CreatedDate], [ModifiedDate]) VALUES (18, N'South Indian', N'South Indian', 0, N'menaka', CAST(0x8B370B00 AS Date), CAST(0x8E370B00 AS Date))
SET IDENTITY_INSERT [dbo].[ProductGroup] OFF
/****** Object:  Table [dbo].[Order]    Script Date: 09/08/2013 12:06:21 ******/
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
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (140, NULL, 1, 70.0000, N'B1,B2', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (141, NULL, 1, 105.0000, N'A6', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (142, NULL, 1, 3255.0000, N'A1,A2', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (143, NULL, 1, 70.0000, N'A3,A5', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (144, NULL, 1, 70.0000, N'A8', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (145, CAST(0x0000A22F0129B830 AS DateTime), 1, 70.0000, N'B5', N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (146, CAST(0x0000A230015D06C1 AS DateTime), 0, 105.0000, N'F1', N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[Order] ([Id], [CreatedDate], [Status], [TotalAmount], [Seats], [CreatedBy]) VALUES (147, CAST(0x0000A23100FC43E3 AS DateTime), 1, 105.0000, N'A7', N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
SET IDENTITY_INSERT [dbo].[Order] OFF
/****** Object:  Table [dbo].[Kitchen]    Script Date: 09/08/2013 12:06:21 ******/
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
SET IDENTITY_INSERT [dbo].[Kitchen] ON
INSERT [dbo].[Kitchen] ([KitchenID], [KitchenName]) VALUES (1, N'Brother DCP-7060D Printer')
INSERT [dbo].[Kitchen] ([KitchenID], [KitchenName]) VALUES (2, N'Microsoft XPS Document Writer')
SET IDENTITY_INSERT [dbo].[Kitchen] OFF
/****** Object:  Table [dbo].[Bill]    Script Date: 09/08/2013 12:06:21 ******/
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
/****** Object:  Table [dbo].[Product]    Script Date: 09/08/2013 12:06:21 ******/
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
SET IDENTITY_INSERT [dbo].[Product] ON
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (1, 18, NULL, N'Tea', N'Tea', CAST(0xD8440B00 AS Date), 5, 3, 35.0000, 60.0000, 56.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'Available in all varieties', 2, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (2, 16, NULL, N'Cold Tea', N'Cold Tea', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 120.0000, 6.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'Available in all varietiesf', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (3, 1, 1, N'Hot Tea', N'Hot Tea', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 130.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (4, 2, NULL, N'Rasam', N'Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 2, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (5, 2, 4, N'Hot Rasam', N'Hot Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 6.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (6, 2, 4, N'Cold Rasam', N'Cold Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 8.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 2, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (7, 2, 4, N'Medium Rasam', N'Medium Rasam', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (8, 3, NULL, N'Poori', N'Poori', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 2, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (9, 3, 8, N'Chappathi', N'Chappathi', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (10, 3, 8, N'Chappathi', N'Chappathi', CAST(0xD8440B00 AS Date), 30, 12, 35.0000, 60.0000, 70.0000, 80.0000, 90.0000, N'Menaka', CAST(0x7C370B00 AS Date), CAST(0x7C370B00 AS Date), 1, N'Available in all varieties', 2, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (13, 4, NULL, N'Halwa', N'Halwa', CAST(0x94360B00 AS Date), 30, 2, 40.0000, 40.0000, 40.0000, 40.0000, 40.0000, N'Menaka', CAST(0x94360B00 AS Date), CAST(0x94360B00 AS Date), 1, NULL, 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (14, 4, 13, N'T Halwa', N'T Halwa', CAST(0x94360B00 AS Date), 10, 3, 50.0000, 50.0000, 50.0000, 50.0000, 50.0000, N'Menaka', CAST(0x94360B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'test', 2, 0)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (16, 1, NULL, N'Group1', N'group 1 detsild', NULL, 56, 4, 67.0000, 67.0000, NULL, NULL, NULL, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'hgghgh', 1, 1)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (17, 1, NULL, N'Group1', N'group 1 detsild', CAST(0xA8290B00 AS Date), 56, 4, 67.0000, 6.0000, NULL, NULL, NULL, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'hgghgh', 1, 0)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (18, 1, NULL, N'dffd', N'dxc', CAST(0xA8290B00 AS Date), 3, 3, 3.0000, 3.0000, NULL, NULL, NULL, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'33', 1, NULL)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (19, 16, NULL, N'fffggg', N'ffff', CAST(0xA8290B00 AS Date), 5, 5, 5.0000, 5.0000, NULL, NULL, NULL, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x8E370B00 AS Date), 1, N'rrrr', 2, NULL)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (20, 3, NULL, N'New Product', N'ddd', CAST(0xA8290B00 AS Date), 4, 4, 4.0000, NULL, NULL, NULL, NULL, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x8E370B00 AS Date), 0, N'dfsdfsd', 1, NULL)
INSERT [dbo].[Product] ([Id], [ProductGroupID], [MasterProductID], [Name], [Details], [ExpiryDate], [Stock], [LowStockRange], [ActualPrice], [FirstSellingPrice], [SecondSellingPrice], [ThirdSellingPrice], [FourthSellingPrice], [CreatedBy], [CreatedDate], [ModifiedDate], [IsQuickProduct], [Remarks], [KitchenID], [Status]) VALUES (21, 2, NULL, N'TestProduct', N'Details1', CAST(0x75250B00 AS Date), 23, 23, 34.0000, 35.0000, 37.0000, 67.0000, 78.0000, N'menaka', CAST(0x8E370B00 AS Date), CAST(0x00000000 AS Date), 1, N'test', 1, 1)
SET IDENTITY_INSERT [dbo].[Product] OFF
/****** Object:  Table [dbo].[OrderedProduct]    Script Date: 09/08/2013 12:06:21 ******/
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
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 1, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 2, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 3, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 5, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (140, 6, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 1, 1, 70.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 2, 1, 70.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 3, 2, 105.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 6, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (141, 8, 1, 35.0000, 0, N'92d6e911-541e-491a-ae84-c389655c9495')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (142, 1, 23, 1575.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (142, 2, 9, 595.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (142, 3, 8, 560.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 1, 17, 1155.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 2, 16, 1085.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 3, 16, 1085.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 9, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (143, 10, 1, 35.0000, 0, NULL)
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (144, 1, 4, 280.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (144, 2, 5, 315.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (144, 3, 5, 315.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (145, 1, 5, 315.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (145, 2, 5, 315.0000, 0, N'ed2841ac-e2ca-409f-8123-60d1729d7f70')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (145, 3, 4, 280.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (146, 2, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (146, 8, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (146, 9, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (147, 1, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (147, 2, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
INSERT [dbo].[OrderedProduct] ([OrderId], [ProductId], [Quantity], [Price], [Type], [CreatedBy]) VALUES (147, 3, 1, 35.0000, 0, N'87e4d19b-0162-489f-a30a-7fdf28c1c663')
/****** Object:  ForeignKey [FK_Bill_Order]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_Order]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Order]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Order]
GO
/****** Object:  ForeignKey [FK_OrderedProducts_Product]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[OrderedProduct]  WITH CHECK ADD  CONSTRAINT [FK_OrderedProducts_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[OrderedProduct] CHECK CONSTRAINT [FK_OrderedProducts_Product]
GO
/****** Object:  ForeignKey [FK_Product_Kitchen]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Kitchen] FOREIGN KEY([KitchenID])
REFERENCES [dbo].[Kitchen] ([KitchenID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Kitchen]
GO
/****** Object:  ForeignKey [FK_Product_Product]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Product] FOREIGN KEY([MasterProductID])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Product]
GO
/****** Object:  ForeignKey [FK_Product_ProductGroup]    Script Date: 09/08/2013 12:06:21 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductGroup] FOREIGN KEY([ProductGroupID])
REFERENCES [dbo].[ProductGroup] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductGroup]
GO
