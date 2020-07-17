export interface MerchantModel {
    address: string;
    companyAccountType: number;
    companyAreaId: string;
    companyName: string;
    createDate: Date;
    expireDate: Date;
    idCardType: string;
    idcardNo: string;
    isLock: boolean;
    legalName: string;
    linkMan1: string;
    linkManTel1: string;
    orgId: string;
    remark: string;
    salesMan: string;
    servicePersonal: string;
    provinceAreaId?: string;
    prefAreaId?: string;
    countryAreaId?: string;
    salesManDeptCode?: string;
    salesManDeptCodeList?: string[];
    salesManDeptName?: string;
}

export interface MerchantTplModel {
    id: string;
    templateName: string;
    remark: string;
    lx: string; //2：系统默认模板， 0: 自定义
}

export interface TdbcModel {
    devSn: string;
    key: string;
    merchantId: string;
    orgId?: string;
    operNo: string;
    storeNo: string;
}

export const MercActionBaseCode = {
    SupplyBase: 1000000,
    DealerBase: 2000000,
    DealerClassBase: 2010000,
    CompanyBase: 3000000,
    CompanyRoleBase: 3010000,
    CompanyUserBase: 3020000,
    CompanyDeptBase: 3030000,
    CompanySystemBase: 3050000,
    CompanyRenewBase: 3060000,
    CompanySalesOrderBase: 3060400,
    MarketingActivity: 3060700,
    CompanyPurchaseOrderBase: 3060800,
    CompanyInventoryBase: 3070000,
    CompanyInventoryBillPurchaseInBase: 3070100,
    CompanyInventoryBillOtherInBase: 3070200,
    CompanyInventoryBillSalesOutBase: 3070300,
    CompanyInventoryBillOtherOutBase: 3070400,
    CompanyInventoryDispatchBase: 3070500,
    CompanyCheckInventoryBase: 3070600,
    CompanyProfitLossReportBase: 3070700,
    CompanyInventoryReportBase: 3070800,
    InventorySalesReturnInBillBase: 3070900,
    InventoryPurchaseReturnOutBillBase: 3080100,
    InventoryWarningBase: 3080200,
    CheckTaskInventoryBase: 3080300,
    InventoryPriceAdjustBillBase: 3080400,
    PurchaseDeclarationBase: 3080500,
    ProductUomBase: 4000100,
    Product: 4000200,
    MicroMallWXBase: 4020100,
    MicroMallPayBase: 4020200,
    ProductCompanyClassBase: 4000300,
    ProductUomBarcodeBase: 4000400,
    CompanyReportBase: 5010000,
    DailySaleReportBase: 5010100,
    DailyReportBase: 5010200,
    FinanceBase: 6010000,
    MicroMallProductBase: 4010100,
    MicroProductClassBase: 4010200,
    MicroOrderBase: 4010300,
    MicroDealerBase: 4010400,
    MicroMerchantBase: 4010500,
    MicroHomebase: 4010600,
    MicroFreightBase: 4010700,
    MicroBasicConfigBase: 4020300,
    VMallPromotionBase: 4030000,
    VMallCouponBase: 4035000,
    PaymentConfigBase: 6020000,
    SubjectInfoBase: 6030000,
    BranchCompanyDataBase: 6040000
};

export const MercActionCode = {
    /**********************我的供应商*********************/
    /*查看供应商*/
    SupplyList: MercActionBaseCode.SupplyBase + 1,
    /*供应商编辑*/
    ActionSupplyEdit: MercActionBaseCode.SupplyBase + 2,
    /*供应商删除*/
    ActionSupplyDelete: MercActionBaseCode.SupplyBase + 3,
    /*供应商导出*/
    ActionSupplyExport: MercActionBaseCode.SupplyBase + 4,
    /**********************客户*********************/
    /*查看客户*/
    DealerList: MercActionBaseCode.DealerBase + 1,
    /*编辑客户*/
    DealerEdit: MercActionBaseCode.DealerBase + 2,
    /*删除客户*/
    DealerDelete: MercActionBaseCode.DealerBase + 3,
    /*导出客户*/
    DealerExport: MercActionBaseCode.DealerBase + 4,
    /**********************客户分类*********************/
    /*查看客户分类*/
    DealerClassList: MercActionBaseCode.DealerClassBase + 1,
    /*修改客户分类*/
    DealerClassEdit: MercActionBaseCode.DealerClassBase + 2,
    /*删除客户分类*/
    DealerClassDelete: MercActionBaseCode.DealerClassBase + 3,

    /**********************企业介绍*********************/
    /*查看企业介绍*/
    CompanyInfo: MercActionBaseCode.CompanyBase + 1,
    /*修改企业介绍*/
    CompanyInfoEdit: MercActionBaseCode.CompanyBase + 2,


    //[Description('续费管理')]
    CompanyRenewManager: MercActionBaseCode.CompanyRenewBase + 1,
    /**********************岗位管理*********************/
    /*查看岗位列表*/
    RoleManager: MercActionBaseCode.CompanyRoleBase + 1,
    /*编辑岗位*/
    RoleEdit: MercActionBaseCode.CompanyRoleBase + 2,
    /*删除岗位*/
    RoleDelete: MercActionBaseCode.CompanyRoleBase + 3,
    /**********************我的员工*********************/
    /*查看我的员工*/
    UserManager: MercActionBaseCode.CompanyUserBase + 1,
    /*编辑员工*/
    UserEdit: MercActionBaseCode.CompanyUserBase + 2,
    /*删除员工*/
    UserDelete: MercActionBaseCode.CompanyUserBase + 3,
    /*重置登录密码*/
    UserRestPwd: MercActionBaseCode.CompanyUserBase + 4,
    /*停用启用员工*/
    UserEnable: MercActionBaseCode.CompanyUserBase + 5,
    /**********************机构信息*********************/
    /*查看机构*/
    DepartmentBase: MercActionBaseCode.CompanyDeptBase + 1,
    /*修改机构*/
    DepartmentEdit: MercActionBaseCode.CompanyDeptBase + 2,
    /*删除机构*/
    DepartmentDelete: MercActionBaseCode.CompanyDeptBase + 3,
    /**********************系统配置*********************/
    /*查看系统配置*/
    SystemParamInfo: MercActionBaseCode.CompanySystemBase + 1,
    /*基础系统配置*/
    SystemParamSet: MercActionBaseCode.CompanySystemBase + 2,
    /*数据初始化*/
    SystemParamDataInit: MercActionBaseCode.CompanySystemBase + 3,
    /**********************系统支付配置*********************/
    /*查看支付配置*/
    PaymentCheck: MercActionBaseCode.PaymentConfigBase + 1,
    /*编辑支付配置*/
    PaymentEdit: MercActionBaseCode.PaymentConfigBase + 2,
    /**********************科目信息配置*********************/
    /*查看科目配置*/
    SubjectInfoManager: MercActionBaseCode.SubjectInfoBase + 1,
    /*编辑科目配置*/
    SubjectInfoEdit: MercActionBaseCode.SubjectInfoBase + 2,
    /*删除科目配置*/
    SubjectInfoDel: MercActionBaseCode.SubjectInfoBase + 3,
    /**********************销售订单*********************/
    /*查看销售订单列表*/
    SalesOrderManager: MercActionBaseCode.CompanySalesOrderBase + 1,
    /*修改销售订单*/
    SalesOrderEdit: MercActionBaseCode.CompanySalesOrderBase + 2,
    /*作废销售订单*/
    SalesOrderInvalid: MercActionBaseCode.CompanySalesOrderBase + 3,
    /*打印订单*/
    ActionOrderPrint: MercActionBaseCode.CompanySalesOrderBase + 4,
    /*导出订单*/
    OrderExport: MercActionBaseCode.CompanySalesOrderBase + 5,
    /*红冲*/
    ActionOrderWriteBack: MercActionBaseCode.CompanySalesOrderBase + 6,
    /*订单结算*/
    ActionOrderSettleAccount: MercActionBaseCode.CompanySalesOrderBase + 7,
    /*改价*/
    ActionOrderChangePrice: MercActionBaseCode.CompanySalesOrderBase + 8,
    /*删除销售订单*/
    SalesOrderDelete: MercActionBaseCode.CompanySalesOrderBase + 16,
    /*零售开单*/
    RetailOrder: MercActionBaseCode.CompanySalesOrderBase + 9,
    /*销售出库*/
    SaleStockOut: MercActionBaseCode.CompanySalesOrderBase + 10,

    /**********************营销活动*********************/
    /*价格方案管理*/
    ActionMarketingActivity: MercActionBaseCode.MarketingActivity + 1,
    /*编辑价格方案*/
    ActionAddMarketingActivity: MercActionBaseCode.MarketingActivity + 2,
    /*删除价格方案*/
    ActionDelMarketingActivity: MercActionBaseCode.MarketingActivity + 3,
    /*设置商品价格方案*/
    ActionSetMarketingPrice: MercActionBaseCode.MarketingActivity + 4,
    /*查询商品价格方案*/
    ActionMarketingPrice: MercActionBaseCode.MarketingActivity + 5,
    /**********************进货订单管理*********************/
    /*进货订单管理*/
    PurchaseOrderManager: MercActionBaseCode.CompanyPurchaseOrderBase + 1,
    /*查看进货订单进价*/
    PurchasePriceManager: MercActionBaseCode.CompanyPurchaseOrderBase + 2,
    /*编辑进货订单*/
    PurchaseOrderEdit: MercActionBaseCode.CompanyPurchaseOrderBase + 3,
    /*作废进货订单*/
    PurchaseOrderInvalid: MercActionBaseCode.CompanyPurchaseOrderBase + 4,
    /*删除进货订单*/
    PurchaseOrderDelete: MercActionBaseCode.CompanyPurchaseOrderBase + 5,
    /*删除进货订单*/
    PurchaseOrderPrint: MercActionBaseCode.CompanyPurchaseOrderBase + 6,
    /*进货订单导出*/
    PurchaseOrderExport: MercActionBaseCode.CompanyPurchaseOrderBase + 7,
    /*进货订单审核*/
    PurchaseOrderAudit: MercActionBaseCode.CompanyPurchaseOrderBase + 8,

    /**********************仓库管理*********************/
    /*查看仓库管理*/
    WarehouseManager: MercActionBaseCode.CompanyInventoryBase + 1,
    /*编辑仓库管理*/
    WarehouseEdit: MercActionBaseCode.CompanyInventoryBase + 2,
    /*删除仓库管理*/
    WarehouseDelete: MercActionBaseCode.CompanyInventoryBase + 3,

    /**********************进货入库*********************/
    /*查看进货入库单*/
    PurchaseInManager: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 1,
    /*修改退货入库单*/
    PurchaseInEdit: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 2,
    /*删除退货入库单*/
    PurchaseInDelete: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 3,
    /*作废进货入库单*/
    PurchaseInOrderInvalid: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 4,
    /*结算进货入库单*/
    PurchaseInSettleAccount: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 5,
    /*查看进货入库单进价*/
    PurchaseInPriceManager: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 6,
    /*进货入库单打印*/
    PurchaseInPrint: MercActionBaseCode.CompanyInventoryBillPurchaseInBase + 7,

    /**********************其他入库*********************/
    /*查看其他入库单*/
    OtherInManager: MercActionBaseCode.CompanyInventoryBillOtherInBase + 1,
    /*修改其他入库单*/
    OtherInEdit: MercActionBaseCode.CompanyInventoryBillOtherInBase + 2,
    /*其他入库单作废*/
    OtherInInvalid: MercActionBaseCode.CompanyInventoryBillOtherInBase + 3,
    /*其他入库单打印*/
    OtherInPrint: MercActionBaseCode.CompanyInventoryBillOtherInBase + 4,
    /*审核其他入库单*/
    OtherInAudit: MercActionBaseCode.CompanyInventoryBillOtherInBase + 4,

    /**********************销售出库*********************/
    /*查看销售出库单*/
    SalesOutManager: MercActionBaseCode.CompanyInventoryBillSalesOutBase + 1,
    /*修改销售出库单*/
    SalesOutEdit: MercActionBaseCode.CompanyInventoryBillSalesOutBase + 2,
    /*删除销售出库单*/
    SalesOutDelete: MercActionBaseCode.CompanyInventoryBillSalesOutBase + 3,
    /*销售出库单打印*/
    SalesOutPrint: MercActionBaseCode.CompanyInventoryBillSalesOutBase + 4,
    /*销售出库单导出*/
    SalesOutExport: MercActionBaseCode.CompanyInventoryBillSalesOutBase + 5,

    /**********************其他出库*********************/
    /*查看其他出库单*/
    OtherOutManager: MercActionBaseCode.CompanyInventoryBillOtherOutBase + 1,
    /*修改其他出库单*/
    OtherOutEdit: MercActionBaseCode.CompanyInventoryBillOtherOutBase + 2,
    /*作废其他出库单*/
    OtherOutInvalid: MercActionBaseCode.CompanyInventoryBillOtherOutBase + 3,
    /*审核其他出库单*/
    OtherOutAudit: MercActionBaseCode.CompanyInventoryBillOtherOutBase + 4,
    /*导出其他出库单*/
    OtherOutExport: MercActionBaseCode.CompanyInventoryBillOtherOutBase + 5,

    /**********************调拨单*********************/
    /*查看调拨单*/
    InventoryDispatchManager: MercActionBaseCode.CompanyInventoryDispatchBase + 1,
    /*修改调拨单*/
    InventoryDispatchEdit: MercActionBaseCode.CompanyInventoryDispatchBase + 2,
    /*作废调拨单*/
    InventoryDispatchInvalid: MercActionBaseCode.CompanyInventoryDispatchBase + 3,
    /*审核调拨单*/
    InventoryDispatchAudit: MercActionBaseCode.CompanyInventoryDispatchBase + 4,
    /*调拨单打印*/
    InventoryDispatchPrint: MercActionBaseCode.CompanyInventoryDispatchBase + 5,

    /**********************盘点任务*********************/
    /*查看盘点任务*/
    CheckTaskInventoryManager: MercActionBaseCode.CheckTaskInventoryBase + 1,
    /*修改盘点任务*/
    CheckTaskInventoryEdit: MercActionBaseCode.CheckTaskInventoryBase + 2,
    /*作废盘点任务*/
    CheckTaskInventoryInvalid: MercActionBaseCode.CheckTaskInventoryBase + 3,
    /*结束盘点任务*/
    CheckTaskInventoryComplete: MercActionBaseCode.CheckTaskInventoryBase + 4,

    /**********************调价单*********************/
    /*查看调价单*/
    PriceAdjustInventoryManager: MercActionBaseCode.InventoryPriceAdjustBillBase + 1,
    /*修改调价单*/
    PriceAdjustInventorySave: MercActionBaseCode.InventoryPriceAdjustBillBase + 2,
    /*作废调价单*/
    PriceAdjustInventoryInvalid: MercActionBaseCode.InventoryPriceAdjustBillBase + 3,
    /*删除调价单*/
    PriceAdjustInventoryDelete: MercActionBaseCode.InventoryPriceAdjustBillBase + 4,
    /*审核调价单*/
    PriceAdjustInventoryAudit: MercActionBaseCode.InventoryPriceAdjustBillBase + 5,
    /**********************申报单*********************/
    //[Description('进货申报单查看')]
    PurchaseDeclarationQuery: MercActionBaseCode.PurchaseDeclarationBase + 1,
    //[Description('进货申报单编辑')]
    PurchaseDeclarationEdit: MercActionBaseCode.PurchaseDeclarationBase + 2,
    //[Description('进货申报单作废')]
    PurchaseDeclarationInvalid: MercActionBaseCode.PurchaseDeclarationBase + 3,
    //[Description('进货申报单删除')]
    PurchaseDeclarationDel: MercActionBaseCode.PurchaseDeclarationBase + 4,
    /**********************盘点单*********************/
    /*查看盘点单*/
    CheckInventoryManager: MercActionBaseCode.CompanyCheckInventoryBase + 1,
    /*修改盘点单*/
    CheckInventoryEdit: MercActionBaseCode.CompanyCheckInventoryBase + 2,
    /*作废盘点单*/
    CheckInventoryInvalid: MercActionBaseCode.CompanyCheckInventoryBase + 3,
    /*审核盘点单*/
    CheckInventoryAudit: MercActionBaseCode.CompanyCheckInventoryBase + 4,

    /**********************损益表*********************/
    /*查看损益表*/
    ProfitLossReport: MercActionBaseCode.CompanyProfitLossReportBase + 1,
    /*报损报溢单查看*/
    ProfitlLossManager: MercActionBaseCode.CompanyProfitLossReportBase + 2,
    /*报损报溢单编辑*/
    ProfitlLossEdit: MercActionBaseCode.CompanyProfitLossReportBase + 3,
    /*报损报溢单作废*/
    ProfitlLossInvalid: MercActionBaseCode.CompanyProfitLossReportBase + 4,
    /*报损报溢单打印*/
    ProfitlLossPrint: MercActionBaseCode.CompanyProfitLossReportBase + 5,
    /**********************库存查询*********************/
    /*实时库存查询*/
    InventoryQuery: MercActionBaseCode.CompanyInventoryReportBase + 1,

    /**********************销售退入库单*********************/
    /*销售退入库单查看*/
    ActionSalesReturnInManager: MercActionBaseCode.InventorySalesReturnInBillBase + 1,
    /*销售退入库单保存*/
    ActionSalesReturnInEdit: MercActionBaseCode.InventorySalesReturnInBillBase + 2,
    /*销售退入库单作废*/
    ActionSalesReturnInInvalid: MercActionBaseCode.InventorySalesReturnInBillBase + 3,
    /*销售退入库单删除*/
    ActionSalesReturnInDelete: MercActionBaseCode.InventorySalesReturnInBillBase + 4,

    /**********************进货退货出库*******************/
    /*进货退出库单查看*/
    ActionPurchaseReturnOutManager: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 1,
    /*进货退出库单编辑*/
    ActionPurchaseReturnOutEdit: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 2,
    /*进货退出库单作废*/
    ActionPurchaseReturnOutInvalid: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 3,
    /*删除进货退货出库单*/
    ActionPurchaseReturnOutDelete: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 4,
    /*结算进货退货出库单*/
    ActionPurchaseReturnOutSettle: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 5,
    /*进货退货出库单打印*/
    PurchaseReturnOutPrint: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 7,
    /*进货退货出库单导出*/
    PurchaseReturnOutExport: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 8,
    /**********************红冲功能*******************/
    /*红冲功能*/
    ActionWriteBackBill: MercActionBaseCode.InventoryPurchaseReturnOutBillBase + 6,
    /**********************库存预警*********************/
    /*查看*/
    InventoryWarningManager: MercActionBaseCode.InventoryWarningBase + 1,
    /*编辑*/
    InventoryWarningEdit: MercActionBaseCode.InventoryWarningBase + 2,
    /**********************过期预警*********************/
    /*查看*/
    ExpiredWarningManager: MercActionBaseCode.InventoryWarningBase + 3,
    /*导出*/
    ExpiredWarningExport: MercActionBaseCode.InventoryWarningBase + 4,

    /**********************商品单位*********************/
    /*查看商品单位*/
    ProductUomManager: MercActionBaseCode.ProductUomBase + 1,
    /*编辑商品单位*/
    ProductUomEdit: MercActionBaseCode.ProductUomBase + 2,
    /*删除商品单位*/
    ProductUomDelete: MercActionBaseCode.ProductUomBase + 3,
    /**********************商品列表*********************/
    /*查看商品*/
    ProductManager: MercActionBaseCode.Product + 1,
    /*查看商品成本价*/
    ProductCostInfo: MercActionBaseCode.Product + 2,
    /*修改商品*/
    ProductEdit: MercActionBaseCode.Product + 3,
    /*删除商品*/
    ProductDelete: MercActionBaseCode.Product + 4,
    /*导出商品*/
    ProductExport: MercActionBaseCode.Product + 5,
    /*商品属性*/
    ProductAttributeManager: MercActionBaseCode.Product + 6,
    /**********************商品分类*********************/
    /*查看商品分类*/
    ProductCompanyClassManager: MercActionBaseCode.ProductCompanyClassBase + 1,
    /*修改商品分类*/
    ProductCompanyClassEdit: MercActionBaseCode.ProductCompanyClassBase + 2,
    /*删除商品分类*/
    ProductCompanyClassDel: MercActionBaseCode.ProductCompanyClassBase + 3,
    /*商品生成条码*/
    ProductUomBarcodeManager: MercActionBaseCode.ProductUomBarcodeBase + 1,

    /**********************微商城微信管理*********************/
    /*微商城微信管理*/
    MicroMallWXManager: MercActionBaseCode.MicroMallWXBase + 1,
    /*微商城微信编辑*/
    MicroMallWXEdit: MercActionBaseCode.MicroMallWXBase + 2,
    /**********************微商城支付管理*********************/
    /*微商城微信支付查看*/
    MicroMallPayManager: MercActionBaseCode.MicroMallPayBase + 1,
    /*微商城微信支付编辑*/
    MicroMallPayEdit: MercActionBaseCode.MicroMallPayBase + 2,
    /**********************微商城商品管理*********************/
    /*微商城商品查看*/
    MicroMallProductManager: MercActionBaseCode.MicroMallProductBase + 1,
    /* 微商城商品编辑*/
    MicroMallProductEdit: MercActionBaseCode.MicroMallProductBase + 2,
    /**********************微商城商品分类*********************/
    /* 微商城商品分类查看*/
    MicroMallProductClassManager: MercActionBaseCode.MicroProductClassBase + 1,
    /* 微商城商品分类编辑*/
    MicroMallProductClassClassEdit: MercActionBaseCode.MicroProductClassBase + 2,
    MicroMallProductClassClassDelete: MercActionBaseCode.MicroProductClassBase + 3,
    /**********************微商城销售管理*********************/
    /* 微商城销售管理查看*/
    MicroMallOrderManager: MercActionBaseCode.MicroOrderBase + 1,
    /* 微商城销售管理编辑*/
    MicroMallOrderEdit: MercActionBaseCode.MicroOrderBase + 2,
    /* 微商城销售管理发货*/
    MicroMallOrderDeliver: MercActionBaseCode.MicroOrderBase + 3,
    /* 微商城销售管理收货*/
    MicroMallOrderCollect: MercActionBaseCode.MicroOrderBase + 4,
    /* 微商城销售管理打印*/
    MicroMallOrderPrint: MercActionBaseCode.MicroOrderBase + 5,
    /* 微商城销售管理配货调拨*/
    MicroMallOrderDistribution: MercActionBaseCode.MicroOrderBase + 6,
    /* 微商城销售管理配货调拨导出*/
    MicroMallOrderExport: MercActionBaseCode.MicroOrderBase + 7,
    /* 微商城销售管理修改仓库*/
    MicroMallOrderModifyWarehouse: MercActionBaseCode.MicroOrderBase + 8,
    /**********************微商城客户管理*********************/
    /* 微商城销售客户查看*/
    MicroMallDealerManager: MercActionBaseCode.MicroDealerBase + 1,
    /* 微商城销售客户导出*/
    MicroMallDealerExport: MercActionBaseCode.MicroDealerBase + 2,
    /**********************微商城商户管理*********************/
    /* 微商城销售商户查看*/
    MicroMallMerchantManager: MercActionBaseCode.MicroMerchantBase + 1,
    /* 微商城销售商户编辑*/
    MicroMallMerchantEdit: MercActionBaseCode.MicroMerchantBase + 2,
    /**********************微商城首页管理*********************/
    /* 微商城销售首页查看*/
    MicroMallHomeManager: MercActionBaseCode.MicroHomebase + 1,
    /* 微商城销售首页编辑*/
    MicroMallHomeEdit: MercActionBaseCode.MicroHomebase + 2,
    /**********************微商城运费管理*********************/
    /* 微商城运费查看*/
    MicroMallFreightManager: MercActionBaseCode.MicroFreightBase + 1,
    /* 微商城运费编辑*/
    MicroMallFreightEdit: MercActionBaseCode.MicroFreightBase + 2,
    /**********************微商城基础配置*********************/
    /* 微商城会员查看*/
    MicroMallSettingManager: MercActionBaseCode.MicroBasicConfigBase + 1,
    /* 微商城会员编辑*/
    MicroMallSettingEdit: MercActionBaseCode.MicroBasicConfigBase + 2,
    /**********************微商城基础配置*********************/
    //[Description('微店活动')]
    VMallPromotionManager: MercActionBaseCode.VMallPromotionBase + 1,
    //[Description('活动保存')]
    VMallPromotionSave: MercActionBaseCode.VMallPromotionBase + 2,
    //[Description('活动终止')]
    VMallPromotionStop: MercActionBaseCode.VMallPromotionBase + 3,
    //[Description('活动商品查询')]
    VMallPromotionProductManager: MercActionBaseCode.VMallPromotionBase + 5,
    //[Description('活动商品保存')]
    VMallPromotionProductSave: MercActionBaseCode.VMallPromotionBase + 6,
    /********************微商城优惠券**************/
    VMallCouponQuery: MercActionBaseCode.VMallCouponBase + 1,
    VMallCouponAdd: MercActionBaseCode.VMallCouponBase + 2,
    VMallCouponModify: MercActionBaseCode.VMallCouponBase + 3,
    VMallCouponDelete: MercActionBaseCode.VMallCouponBase + 4,
    /**********************报表中心*********************/
    /*销售报表*/
    SalesDetail: MercActionBaseCode.CompanyReportBase + 1,
    /*销售报表导出 */
    SalesDetailExport: MercActionBaseCode.CompanyReportBase + 2,
    /*商品销售明细*/
    ProductSaleDetail: MercActionBaseCode.CompanyReportBase + 3,
    /*商品销售明细导出*/
    ReportProductSaleDetailExport: MercActionBaseCode.CompanyReportBase + 4,
    /*进货报表*/
    ReportPurchaseDetail: MercActionBaseCode.CompanyReportBase + 6,
    /*进货报表导出 */
    ReportPurchaseDetailExport: MercActionBaseCode.CompanyReportBase + 7,

    /*缺货商品*/
    BackOrderManager: MercActionBaseCode.CompanyReportBase + 5,
    /*日销售报表*/
    DailySaleReportManager: MercActionBaseCode.DailySaleReportBase + 1,
    /*日销售报表导出*/
    DailySaleReportExport: MercActionBaseCode.DailySaleReportBase + 2,
    /*日报表*/
    DailyReportManager: MercActionBaseCode.DailyReportBase + 1,
    /*日报表导出*/
    DailyReportExport: MercActionBaseCode.DailyReportBase + 2,

    /**********************财务管理*********************/
    /*应收应付查询*/
    FinanceAllDealerDebtPay: MercActionBaseCode.FinanceBase + 1,
    /*经营历程查询*/
    FinanceBusinessProcess: MercActionBaseCode.FinanceBase + 2,
    /*财务单据红冲*/
    FinanceWriteBack: MercActionBaseCode.FinanceBase + 3,
    /*科目变化查询*/
    SubjectsChange: MercActionBaseCode.FinanceBase + 4,
    /*新增收款单*/
    FinanceAddReceiptBill: MercActionBaseCode.FinanceBase + 5,
    /*新增付款单*/
    FinanceAddPayBill: MercActionBaseCode.FinanceBase + 6,
    /*新增其他收入*/
    FinanceAddOtherReceiptBill: MercActionBaseCode.FinanceBase + 7,
    /*新增存取款单*/
    FinanceChangeAccountMoney: MercActionBaseCode.FinanceBase + 8,
    /*其它收入新增*/
    FinanceFundingIncrease: MercActionBaseCode.FinanceBase + 9,
    /*费用支出新增*/
    FinanceFundingDecrease: MercActionBaseCode.FinanceBase + 10,
    /*其它收入查询*/
    FinanceFundingIncreaseQuery: MercActionBaseCode.FinanceBase + 11,
    /*费用支出查询*/
    FinanceFundingDecreaseQuery: MercActionBaseCode.FinanceBase + 12,
    /*创建预收款单*/
    FinanceAddAdvcRecvAmountBill: MercActionBaseCode.FinanceBase + 13,
    /*创建预付款单*/
    FinanceAddAdvcChargeAmountBill: MercActionBaseCode.FinanceBase + 14,
    /*其他查询*/
    FinanceGetOtherFinanceAccount: MercActionBaseCode.FinanceBase + 15,
    /*资产利润查询*/
    FinancePropertyDebt: MercActionBaseCode.FinanceBase + 16,
    /*预付款单查询*/
    FinanceAdvcChargeAmountBillQuery: MercActionBaseCode.FinanceBase + 17,
    /*预收款查询*/
    FinanceAdvcRecvAmountBillQuery: MercActionBaseCode.FinanceBase + 18,
    /*现金银行初始化*/
    FinancePropertyAccount: MercActionBaseCode.FinanceBase + 19,
    /*开账*/
    FinanceBeginChangeAccount: MercActionBaseCode.FinanceBase + 20,
    /*对账单查询*/
    CheckAmountQuery: MercActionBaseCode.FinanceBase + 21,
    /*对账单导出*/
    CheckAmountExport: MercActionBaseCode.FinanceBase + 22,
    /*应收应付查询*/
    FinanceAllDealerDebtPayExport: MercActionBaseCode.FinanceBase + 23,
    /*查询付款单*/
    FinanceQueryPayBill: MercActionBaseCode.FinanceBase + 24,
    /*查询收款单*/
    FinanceQueryReceiptBill: MercActionBaseCode.FinanceBase + 25,
    /*一键清账*/
    OnekeyClearingAccount: MercActionBaseCode.FinanceBase + 26,
    /*经营历程导出*/
    FinanceBusinessProcessExport: MercActionBaseCode.FinanceBase + 27,
    /*科目变化明细导出*/
    SubjectsChangeExport: MercActionBaseCode.FinanceBase + 28,
    /**********************分公司*********************/
    /* 分公司数据权限查看 */
    BranchCompanyDataQuery: MercActionBaseCode.BranchCompanyDataBase + 1
};

export const MercAppData = {
    mercPrivilege: [
        //销售
        {
            Id: 300,
            text: '销售',
            value: false,
            children: [
                {
                    Id: 30001,
                    text: '订单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.SalesOrderManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesOrderEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesOrderInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesOrderDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionOrderPrint,
                            text: '打印',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OrderExport,
                            text: '导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionOrderWriteBack,
                            text: '红冲',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionOrderSettleAccount,
                            text: '结算',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SaleStockOut,
                            text: '出库',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionOrderChangePrice,
                            text: '销售改价',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesOutManager,
                            text: '销售出库单查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesOutExport,
                            text: '销售出库单导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionSalesReturnInManager,
                            text: '销售退入库单查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.RetailOrder,
                            text: '零售开单',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //进货
        {
            Id: 400,
            text: '进货',
            value: false,
            children: [
                {
                    Id: 40001,
                    text: '进货订单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.PurchaseOrderManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchasePriceManager,
                            text: '进价查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderPrint,
                            text: '打印',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderExport,
                            text: '导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseOrderAudit,
                            text: '审核',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 40002,
                    text: '进货入库',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.PurchaseInManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInOrderInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInSettleAccount,
                            text: '结算',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInPriceManager,
                            text: '进价查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseInPrint,
                            text: '打印',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 40003,
                    text: '进货退出库',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ActionPurchaseReturnOutManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionPurchaseReturnOutEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionPurchaseReturnOutInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionPurchaseReturnOutDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionPurchaseReturnOutSettle,
                            text: '结算',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseReturnOutPrint,
                            text: '打印',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseReturnOutExport,
                            text: '导出',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //库存
        {
            Id: 600,
            text: '库存',
            value: false,
            children: [
                {
                    Id: 60010,
                    text: '库存查询',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.InventoryQuery,
                            text: '库存查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryWarningManager,
                            text: '库存预警',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ExpiredWarningManager,
                            text: '过期预警',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ExpiredWarningExport,
                            text: '过期预警导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.BackOrderManager,
                            text: '缺货商品',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60012,
                    text: '盘点任务',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.CheckTaskInventoryManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckTaskInventoryEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckTaskInventoryInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckTaskInventoryComplete,
                            text: '完成',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60008,
                    text: '盘点单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.CheckInventoryManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckInventoryEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckInventoryInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckInventoryAudit,
                            text: '审核',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60007,
                    text: '调拨单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.InventoryDispatchManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryDispatchEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryDispatchInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryDispatchAudit,
                            text: '审核',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryDispatchPrint,
                            text: '打印',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60009,
                    text: '报损报溢',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ProfitLossReport,
                            text: '损溢表查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProfitlLossManager,
                            text: '报损报溢单查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProfitlLossEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProfitlLossInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        }/*,
                         {
                         Id: MercActionCode.ProfitlLossPrint,
                         text: '打印',
                         value: false,
                         children: []
                         }*/
                    ]
                },
                {
                    Id: 60005,
                    text: '其他出库',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.OtherOutManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherOutEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherOutInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherOutAudit,
                            text: '审核',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherOutExport,
                            text: '导出',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60003,
                    text: '其他入库',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.OtherInManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherInEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherInInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OtherInAudit,
                            text: '审核',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60014,
                    text: '进货申报单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.PurchaseDeclarationQuery,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseDeclarationEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseDeclarationInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PurchaseDeclarationDel,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60013,
                    text: '调价单',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.PriceAdjustInventoryManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PriceAdjustInventorySave,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PriceAdjustInventoryInvalid,
                            text: '作废',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PriceAdjustInventoryDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PriceAdjustInventoryAudit,
                            text: '审核',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 60011,
                    text: '红冲功能',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ActionWriteBackBill,
                            text: '红冲',
                            value: false,
                            children: []
                        }
                    ]

                }
            ]
        },
        //财务
        {
            Id: 700,
            text: '财务',
            value: false,
            children: [
                {
                    Id: 70001,
                    text: '财务中心',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.FinanceAllDealerDebtPay,
                            text: '应收应付查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAllDealerDebtPayExport,
                            text: '应收应付导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckAmountQuery,
                            text: '对账',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CheckAmountExport,
                            text: '对账导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.OnekeyClearingAccount,
                            text: '一键清账',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceBusinessProcess,
                            text: '经营历程',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceBusinessProcessExport,
                            text: '经营历程导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SubjectsChange,
                            text: '科目变化明细',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SubjectsChangeExport,
                            text: '科目变化明细导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinancePropertyAccount,
                            text: '现金银行',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceGetOtherFinanceAccount,
                            text: '收入支出查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinancePropertyDebt,
                            text: '资产负债表',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 70002,
                    text: '财务单据',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.FinanceQueryPayBill,
                            text: '付款单查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAddPayBill,
                            text: '新增付款单',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceQueryReceiptBill,
                            text: '收款单查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAddReceiptBill,
                            text: '新增收款单',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAdvcChargeAmountBillQuery,
                            text: '预付款单查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAddAdvcChargeAmountBill,
                            text: '新增预付款单',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAdvcRecvAmountBillQuery,
                            text: '预收款单查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceAddAdvcRecvAmountBill,
                            text: '新增预收款单',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceFundingIncreaseQuery,
                            text: '非销售收入查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceFundingIncrease,
                            text: '新增非销售收入',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceFundingDecreaseQuery,
                            text: '费用支出查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceFundingDecrease,
                            text: '新增费用支出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.FinanceWriteBack,
                            text: '红冲',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //报表
        {
            Id: 500,
            text: '报表',
            value: false,
            children: [
                {
                    Id: 50001,
                    text: '报表中心',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.DailySaleReportManager,
                            text: '查看日销售统计',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DailySaleReportExport,
                            text: '导出日销售统计',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesDetail,
                            text: '查看销售报表',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SalesDetailExport,
                            text: '导出销售报表',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ReportPurchaseDetail,
                            text: '查看进货报表',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ReportPurchaseDetailExport,
                            text: '导出进货报表',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductSaleDetail,
                            text: '查看商品销售明细',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ReportProductSaleDetailExport,
                            text: '商品销售明细导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DailyReportManager,
                            text: '查看日报表',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DailyReportExport,
                            text: '导出日报表',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //商品
        {
            Id: 200,
            text: '商品',
            value: false,
            children: [
                {
                    Id: 20001,
                    text: '商品列表',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ProductManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductCostInfo,
                            text: '查看成本价',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductUomBarcodeManager,
                            text: '条码',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductExport,
                            text: '导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.InventoryWarningEdit,
                            text: '设置库存预警',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductAttributeManager,
                            text: '商品属性',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 20002,
                    text: '商品分类',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ProductCompanyClassManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductCompanyClassEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductCompanyClassDel,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 20003,
                    text: '商品单位',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ProductUomManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductUomEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ProductUomDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 20004,
                    text: '价格方案',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.ActionMarketingActivity,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionAddMarketingActivity,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionDelMarketingActivity,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionSetMarketingPrice,
                            text: '设置商品价格',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionMarketingPrice,
                            text: '查看商品价格',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //资料
        {
            Id: 100,
            text: '资料',
            value: false,
            children: [
                {
                    Id: 10001,
                    text: '企业信息',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.CompanyInfo,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CompanyInfoEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.CompanyRenewManager,
                            text: '缴费',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10002,
                    text: '机构信息',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.DepartmentBase,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DepartmentEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DepartmentDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10003,
                    text: '岗位权限',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.RoleManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.RoleEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.RoleDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10005,
                    text: '员工信息',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.UserManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.UserEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.UserDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.UserRestPwd,
                            text: '重置密码',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.UserEnable,
                            text: '启用停用',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10007,
                    text: '供应商信息',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.SupplyList,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionSupplyEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionSupplyDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.ActionSupplyExport,
                            text: '导出',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10008,
                    text: '客户管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.DealerList,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DealerEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DealerDelete,
                            text: '删除',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DealerExport,
                            text: '导出',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10009,
                    text: '客户分类',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.DealerClassList,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DealerClassEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.DealerClassDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }

                    ]
                },
                {
                    Id: 10011,
                    text: '仓库管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.WarehouseManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.WarehouseEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.WarehouseDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 10012,
                    text: '数据初始化',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.SystemParamDataInit,
                            text: '初始化',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //微店
        {
            Id: 900,
            text: '微店',
            value: false,
            children: [
                {
                    Id: 90001,
                    text: '商品管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallProductManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallProductEdit,
                            text: '编辑（上下架）',
                            value: false,
                            children: []
                        }/*,
                        {
                            Id: MercActionCode.MicroMallProductEdit,
                            text: '上下架',
                            value: false,
                            children: []
                        }*/
                    ]
                },
                {
                    Id: 90002,
                    text: '商品分类',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallProductClassManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallProductClassClassEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallProductClassClassDelete,
                            text: '删除',
                            value: false,
                            children: []
                        }/*,
                        {
                            Id: MercActionCode.MicroMallProductClassClassEdit,
                            text: '上下移',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallProductClassClassEdit,
                            text: '添加子分类',
                            value: false,
                            children: []
                        }*/
                    ]
                },
                {
                    Id: 90003,
                    text: '销售管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallOrderManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderDeliver,
                            text: '发货',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderCollect,
                            text: '收货',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderEdit,
                            text: '改价',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderPrint,
                            text: '打印',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderDistribution,
                            text: '配货调拨',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderExport,
                            text: '配货调拨导出',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallOrderModifyWarehouse,
                            text: '修改仓库',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90004,
                    text: '客户管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallDealerManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallDealerExport,
                            text: '导出',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90005,
                    text: '商户设置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallMerchantManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallMerchantEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90006,
                    text: '首页装修',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallHomeManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallHomeEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90007,
                    text: '运费设置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallFreightManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallFreightEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90008,
                    text: '微信设置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallWXManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallWXEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90009,
                    text: '支付设置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallPayManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallPayEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90011,
                    text: '基础配置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.MicroMallSettingManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.MicroMallSettingEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90013,
                    text: '活动管理',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.VMallPromotionManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallPromotionSave,
                            text: '保存',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallPromotionStop,
                            text: '活动状态变更',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallPromotionProductManager,
                            text: '商品查询',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallPromotionProductSave,
                            text: '商品保存',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 90014,
                    text: '优惠券',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.VMallCouponQuery,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallCouponAdd,
                            text: '新增',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.VMallCouponModify,
                            text: '修改',
                            value: false,
                            children: []
                        }
                    ]
                }

            ]
        },
        //系统
        {
            Id: 800,
            text: '系统',
            value: false,
            children: [
                {
                    Id: 80001,
                    text: '系统配置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.SystemParamInfo,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SystemParamSet,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 80002,
                    text: '系统支付配置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.PaymentCheck,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.PaymentEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        }
                    ]
                },
                {
                    Id: 80003,
                    text: '科目配置',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.SubjectInfoManager,
                            text: '查看',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SubjectInfoEdit,
                            text: '编辑',
                            value: false,
                            children: []
                        },
                        {
                            Id: MercActionCode.SubjectInfoDel,
                            text: '删除',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        //分公司
        {
            Id: 1000,
            text: '分公司',
            value: false,
            children: [
                {
                    Id: 100001,
                    text: '分公司',
                    value: false,
                    children: [
                        {
                            Id: MercActionCode.BranchCompanyDataQuery,
                            text: '查看分公司数据',
                            value: false,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};
