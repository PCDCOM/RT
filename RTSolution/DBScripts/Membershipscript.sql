USE [aspnet]
GO
/****** Object:  Table [dbo].[aspnet_Applications]    Script Date: 09/04/2013 22:27:17 ******/
INSERT [dbo].[aspnet_Applications] ([ApplicationName], [LoweredApplicationName], [ApplicationId], [Description]) VALUES (N'Restaurant', N'restaurant', N'ced710f6-90aa-4093-87b8-a38bc17392b9', NULL)
INSERT [dbo].[aspnet_Applications] ([ApplicationName], [LoweredApplicationName], [ApplicationId], [Description]) VALUES (N'/', N'/', N'66b7615f-7f56-4085-8397-dc3da8a15faa', NULL)
/****** Object:  Table [dbo].[aspnet_Roles]    Script Date: 09/04/2013 22:27:17 ******/
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'ced710f6-90aa-4093-87b8-a38bc17392b9', N'27c198bb-4ed2-4dbb-a44d-7e9ba6fc149c', N'Admin', N'Admin', N'Admin')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'ced710f6-90aa-4093-87b8-a38bc17392b9', N'5455f6a0-0d2b-4411-9ade-40ff3cd891f9', N'Server', N'Server', N'Server')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'66b7615f-7f56-4085-8397-dc3da8a15faa', N'2b7ba99c-7c53-4bac-b691-35d5b6696e1a', N'Manager', N'manager', NULL)
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'66b7615f-7f56-4085-8397-dc3da8a15faa', N'cc21a35f-4344-49f4-873e-aaaac5fb36b1', N'Parcel', N'parcel', NULL)
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'66b7615f-7f56-4085-8397-dc3da8a15faa', N'ac89a638-65ae-43ac-aa1e-4c4f3faf83f0', N'Waiter', N'waiter', NULL)
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'66b7615f-7f56-4085-8397-dc3da8a15faa', N'12370a9d-ea42-46b7-8577-22385f352885', N'Admin', N'admin', NULL)
/****** Object:  Table [dbo].[aspnet_Profile]    Script Date: 09/04/2013 22:27:17 ******/
/****** Object:  Table [dbo].[aspnet_Membership]    Script Date: 09/04/2013 22:27:17 ******/

