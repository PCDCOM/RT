USE [aspnetdb_RT]
GO

/****** Object:  Table [dbo].[aspnet_Applications]    Script Date: 09/04/2013 22:27:17 ******/
INSERT [dbo].[aspnet_Applications] ([ApplicationName], [LoweredApplicationName], [ApplicationId], [Description]) VALUES (N'Restaurant', N'restaurant', N'FC1778EE-6E7F-439C-8DE2-B6AB378F1599', NULL)
INSERT [dbo].[aspnet_Applications] ([ApplicationName], [LoweredApplicationName], [ApplicationId], [Description]) VALUES (N'ReportList', N'reportlist', N'40b53d5d-e2e0-43a4-92f0-e2e7a52ef8b8', NULL)

GO
/****** Object:  Table [dbo].[aspnet_Roles]    Script Date: 09/04/2013 22:27:17 ******/
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'FC1778EE-6E7F-439C-8DE2-B6AB378F1599', N'8E511EFF-9B4A-4849-B46F-931C267A51DA', N'Admin', N'Admin', N'Admin')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'FC1778EE-6E7F-439C-8DE2-B6AB378F1599', N'D1AEAC81-B709-4841-B114-73C4B0134B2E', N'Manager', N'Manager', N'Manager')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'FC1778EE-6E7F-439C-8DE2-B6AB378F1599', N'86CB055D-1CCD-4429-9F26-3B8416B5C250', N'Cashier', N'Cashier', N'Cashier')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'FC1778EE-6E7F-439C-8DE2-B6AB378F1599', N'6E3D98D3-61B5-4144-8C42-118BB2951032', N'Waiter', N'Waiter', N'Waiter')
INSERT [dbo].[aspnet_Roles] ([ApplicationId], [RoleId], [RoleName], [LoweredRoleName], [Description]) VALUES (N'40b53d5d-e2e0-43a4-92f0-e2e7a52ef8b8', N'ba01dbfa-ac6c-4fe1-8de7-521b75350870', N'Admin', N'admin', NULL)

GO

INSERT [dbo].[aspnet_Users] ([ApplicationId], [UserId], [UserName], [LoweredUserName], [MobileAlias], [IsAnonymous], [LastActivityDate]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'383841b6-2dbe-4999-b5e1-9b8326c51f5c', N'aa', N'aa', NULL, 0, CAST(0x0000A236008C75D0 AS DateTime))
INSERT [dbo].[aspnet_Users] ([ApplicationId], [UserId], [UserName], [LoweredUserName], [MobileAlias], [IsAnonymous], [LastActivityDate]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'f30be40f-d49c-4326-99b7-499172ae8a79', N'cc', N'cc', NULL, 0, CAST(0x0000A236008C8764 AS DateTime))
INSERT [dbo].[aspnet_Users] ([ApplicationId], [UserId], [UserName], [LoweredUserName], [MobileAlias], [IsAnonymous], [LastActivityDate]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'73d572cc-c189-4d41-ba24-a22b5db71790', N'ww', N'ww', NULL, 0, CAST(0x0000A236008CA12C AS DateTime))
INSERT [dbo].[aspnet_Users] ([ApplicationId], [UserId], [UserName], [LoweredUserName], [MobileAlias], [IsAnonymous], [LastActivityDate]) VALUES (N'40b53d5d-e2e0-43a4-92f0-e2e7a52ef8b8', N'04bdd25c-1ae3-4ab7-ad62-15a48ba7df88', N'aa', N'aa', NULL, 0, CAST(0x0000A260005BC85E AS DateTime))

GO

INSERT [dbo].[aspnet_UsersInRoles] ([UserId], [RoleId]) VALUES (N'73d572cc-c189-4d41-ba24-a22b5db71790', N'6e3d98d3-61b5-4144-8c42-118bb2951032')
INSERT [dbo].[aspnet_UsersInRoles] ([UserId], [RoleId]) VALUES (N'f30be40f-d49c-4326-99b7-499172ae8a79', N'86cb055d-1ccd-4429-9f26-3b8416b5c250')
INSERT [dbo].[aspnet_UsersInRoles] ([UserId], [RoleId]) VALUES (N'383841b6-2dbe-4999-b5e1-9b8326c51f5c', N'8e511eff-9b4a-4849-b46f-931c267a51da')
INSERT [dbo].[aspnet_UsersInRoles] ([UserId], [RoleId]) VALUES (N'04bdd25c-1ae3-4ab7-ad62-15a48ba7df88', N'ba01dbfa-ac6c-4fe1-8de7-521b75350870')

GO

INSERT [dbo].[aspnet_Membership] ([ApplicationId], [UserId], [Password], [PasswordFormat], [PasswordSalt], [MobilePIN], [Email], [LoweredEmail], [PasswordQuestion], [PasswordAnswer], [IsApproved], [IsLockedOut], [CreateDate], [LastLoginDate], [LastPasswordChangedDate], [LastLockoutDate], [FailedPasswordAttemptCount], [FailedPasswordAttemptWindowStart], [FailedPasswordAnswerAttemptCount], [FailedPasswordAnswerAttemptWindowStart], [Comment]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'383841b6-2dbe-4999-b5e1-9b8326c51f5c', N'dUUArXODoVyOWMpO21dYveG2g3Y=', 1, N'O1YUEqbNA7KCAA1g92u8AQ==', NULL, N'aa@aa.com', N'aa@aa.com', NULL, NULL, 1, 0, CAST(0x0000A236008C75D0 AS DateTime), CAST(0x0000A236008C75D0 AS DateTime), CAST(0x0000A236008C75D0 AS DateTime), CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), NULL)
INSERT [dbo].[aspnet_Membership] ([ApplicationId], [UserId], [Password], [PasswordFormat], [PasswordSalt], [MobilePIN], [Email], [LoweredEmail], [PasswordQuestion], [PasswordAnswer], [IsApproved], [IsLockedOut], [CreateDate], [LastLoginDate], [LastPasswordChangedDate], [LastLockoutDate], [FailedPasswordAttemptCount], [FailedPasswordAttemptWindowStart], [FailedPasswordAnswerAttemptCount], [FailedPasswordAnswerAttemptWindowStart], [Comment]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'f30be40f-d49c-4326-99b7-499172ae8a79', N'0miLJIhzcackKBD3G82vGJt4oLs=', 1, N'ZCKRmF5uTnP96TXj39WZbQ==', NULL, N'cc@cc.com', N'cc@cc.com', NULL, NULL, 1, 0, CAST(0x0000A236008C8764 AS DateTime), CAST(0x0000A236008C8764 AS DateTime), CAST(0x0000A236008C8764 AS DateTime), CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), NULL)
INSERT [dbo].[aspnet_Membership] ([ApplicationId], [UserId], [Password], [PasswordFormat], [PasswordSalt], [MobilePIN], [Email], [LoweredEmail], [PasswordQuestion], [PasswordAnswer], [IsApproved], [IsLockedOut], [CreateDate], [LastLoginDate], [LastPasswordChangedDate], [LastLockoutDate], [FailedPasswordAttemptCount], [FailedPasswordAttemptWindowStart], [FailedPasswordAnswerAttemptCount], [FailedPasswordAnswerAttemptWindowStart], [Comment]) VALUES (N'fc1778ee-6e7f-439c-8de2-b6ab378f1599', N'73d572cc-c189-4d41-ba24-a22b5db71790', N'AgZpM0SlJZF4xy+mdd8SEh3UKPc=', 1, N'LFVQXVniCCQL0PzVm0aOXw==', NULL, N'ww@ww.com', N'ww@ww.com', NULL, NULL, 1, 0, CAST(0x0000A236008CA12C AS DateTime), CAST(0x0000A236008CA12C AS DateTime), CAST(0x0000A236008CA12C AS DateTime), CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), 0, CAST(0xFFFF2FB300000000 AS DateTime), NULL)
