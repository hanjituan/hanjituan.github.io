import { Component, OnInit } from '@angular/core';
import { MenuService, MenuServiceNs } from './../../../core/common-services/menu.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent implements OnInit {
    menuList: any;
    isCollapsed = false;
    selectedItem: string;
    showSecondMenu = false;
    selectedMenu: MenuServiceNs.MenuModal;
    secondMenuList: any;
    currentUrl: string;
    constructor(private menuSer: MenuService, private router: Router) {
        this.router.events.subscribe((event: NavigationEnd) => {
            if (event instanceof NavigationEnd) {
                this.selectedItem = event.urlAfterRedirects;
            }
        });
        this.secondMenuList = [];
        this.currentUrl = '';
        this.menuList = [
            {
                'id': 100,
                'name': '首页',
                'code': '001',
                'icon': 'mc-menu-merchant',
                'seq': 100,
                'state': '',
                'url': '/main/workboard',
                'show': true,
                'leaf': false,
                'children': [],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 100,
                'name': '销售',
                'code': '001',
                'icon': 'mc-menu-merchant',
                'seq': 100,
                'state': '',
                'url': '/main/merchant',
                'show': true,
                'leaf': false,
                'children': [
                    {
                        'id': 110,
                        'name': '销售订单',
                        'code': '001001',
                        'icon': '',
                        'seq': 110,
                        'state': '',
                        'url': '',
                        'show': true,
                        'leaf': false,
                        'children': [
                            {
                                'id': 111,
                                'name': '订单查询',
                                'code': '001001001',
                                'icon': '',
                                'seq': 111,
                                'state': '',
                                'url': '/main/merchant/merchantDetail',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [{
                                    'id': 10000,
                                    'name': '新增',
                                    'detail': '新增',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10001,
                                    'name': '修改',
                                    'detail': '修改',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10002,
                                    'name': '变更',
                                    'detail': '变更',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10003,
                                    'name': '上线',
                                    'detail': '上线',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10004,
                                    'name': '下线',
                                    'detail': '下线',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10005,
                                    'name': '注销',
                                    'detail': '注销',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10006,
                                    'name': '支付配置',
                                    'detail': '支付配置',
                                    'ownerMenuId': 111
                                }],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 112,
                                'name': '销售开单',
                                'code': '001001002',
                                'icon': '',
                                'seq': 112,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 113,
                                'name': '零售开单',
                                'code': '001001002',
                                'icon': '',
                                'seq': 113,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            }, {
                                'id': 114,
                                'name': '销售退货',
                                'code': '001001002',
                                'icon': '',
                                'seq': 114,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 115,
                                'name': '订单结算',
                                'code': '001001002',
                                'icon': '',
                                'seq': 115,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 116,
                                'name': '待出库订单',
                                'code': '001001002',
                                'icon': '',
                                'seq': 116,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            }
                        ],
                        'auths': null,
                        'pid': 100,
                        'pId': 100
                    },
                    {
                        'id': 111,
                        'name': '出入库单',
                        'code': '001001',
                        'icon': '',
                        'seq': 111,
                        'state': '',
                        'url': '',
                        'show': true,
                        'leaf': false,
                        'children': [
                            {
                                'id': 111,
                                'name': '销售出库查询',
                                'code': '001001001',
                                'icon': '',
                                'seq': 111,
                                'state': '',
                                'url': '/main/merchant/merchantDetail',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [{
                                    'id': 10000,
                                    'name': '新增',
                                    'detail': '新增',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10001,
                                    'name': '修改',
                                    'detail': '修改',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10002,
                                    'name': '变更',
                                    'detail': '变更',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10003,
                                    'name': '上线',
                                    'detail': '上线',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10004,
                                    'name': '下线',
                                    'detail': '下线',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10005,
                                    'name': '注销',
                                    'detail': '注销',
                                    'ownerMenuId': 111
                                },
                                {
                                    'id': 10006,
                                    'name': '支付配置',
                                    'detail': '支付配置',
                                    'ownerMenuId': 111
                                }],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 112,
                                'name': '销售退入库查询',
                                'code': '001001002',
                                'icon': '',
                                'seq': 112,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            },
                            {
                                'id': 113,
                                'name': '零售开单',
                                'code': '001001002',
                                'icon': '',
                                'seq': 113,
                                'state': '',
                                'url': '/main/merchant/merchantTpl',
                                'show': true,
                                'leaf': true,
                                'children': [],
                                'auths': [],
                                'pid': 110,
                                'pId': 110
                            }],
                        'auths': null,
                        'pid': 100,
                        'pId': 100
                    }
                ],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 200,
                'name': '进货',
                'code': '002',
                'icon': 'mc-menu-partner',
                'seq': 200,
                'state': '',
                'url': '/main/partner',
                'show': true,
                'leaf': false,
                'children': [{
                    'id': 210,
                    'name': '市场',
                    'code': '002001',
                    'icon': '',
                    'seq': 210,
                    'state': '',
                    'url': '/main/partner/marketList',
                    'show': true,
                    'leaf': false,
                    'children': [{
                        'id': 211,
                        'name': '市场信息',
                        'code': '002001001',
                        'icon': '',
                        'seq': 211,
                        'state': '',
                        'url': '/main/partner/marketDetail',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [{
                            'id': 11000,
                            'name': '新增',
                            'detail': '新增',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11001,
                            'name': '编辑',
                            'detail': '编辑',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11002,
                            'name': '下线',
                            'detail': '下线',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11003,
                            'name': '添加入驻商户',
                            'detail': '添加入驻商户',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11004,
                            'name': '同步',
                            'detail': '同步',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11005,
                            'name': '商户信息维护',
                            'detail': '商户信息维护',
                            'ownerMenuId': 211
                        },
                        {
                            'id': 11006,
                            'name': '移除',
                            'detail': '移除',
                            'ownerMenuId': 211
                        }],
                        'pid': 210,
                        'pId': 210
                    }],
                    'auths': null,
                    'pid': 200,
                    'pId': 200
                }],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 300,
                'name': '库存',
                'code': '003',
                'icon': 'mc-menu-analysis',
                'seq': 300,
                'state': '',
                'url': '/main/dataAnalysis',
                'show': true,
                'leaf': false,
                'children': [{
                    'id': 320,
                    'name': '商户数据',
                    'code': '003002',
                    'icon': '',
                    'seq': 320,
                    'state': '',
                    'url': '',
                    'show': true,
                    'leaf': false,
                    'children': [{
                        'id': 321,
                        'name': '存量商户统计',
                        'code': '003002001',
                        'icon': '',
                        'seq': 321,
                        'state': '',
                        'url': '/main/dataAnalysis/stockMerchant',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 320,
                        'pId': 320
                    },
                    {
                        'id': 323,
                        'name': '活跃度统计',
                        'code': '003002003',
                        'icon': '',
                        'seq': 323,
                        'state': '',
                        'url': '/main/dataAnalysis/activenessData',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 320,
                        'pId': 320
                    }],
                    'auths': null,
                    'pid': 300,
                    'pId': 300
                }],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 400,
                'name': '财务',
                'code': '004',
                'icon': 'mc-menu-ops',
                'seq': 400,
                'state': '',
                'url': '/main/ops',
                'show': true,
                'leaf': false,
                'children': [{
                    'id': 420,
                    'name': '系统维护',
                    'code': '004002',
                    'icon': '',
                    'seq': 420,
                    'state': '',
                    'url': '/main/ops/sysMaintenance',
                    'show': true,
                    'leaf': false,
                    'children': [{
                        'id': 421,
                        'name': '版本发布',
                        'code': '004002001',
                        'icon': '',
                        'seq': 421,
                        'state': '',
                        'url': '/main/ops/releaseVersion',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 420,
                        'pId': 420
                    }],
                    'auths': null,
                    'pid': 400,
                    'pId': 400
                }],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 600,
                'name': '商品',
                'code': '006',
                'icon': 'mc-menu-member',
                'seq': 500,
                'state': '',
                'url': '/main/member',
                'show': true,
                'leaf': false,
                'children': [{
                    'id': 610,
                    'name': '平台会员',
                    'code': '006001',
                    'icon': '',
                    'seq': 510,
                    'state': '',
                    'url': '',
                    'show': true,
                    'leaf': false,
                    'children': [{
                        'id': 611,
                        'name': '会员信息',
                        'code': '006001001',
                        'icon': '',
                        'seq': 511,
                        'state': '',
                        'url': '/main/member/plMember',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 610,
                        'pId': 610
                    },
                    {
                        'id': 612,
                        'name': '积分设置',
                        'code': '006001002',
                        'icon': '',
                        'seq': 512,
                        'state': '',
                        'url': '/main/member/integralRule',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 610,
                        'pId': 610
                    },
                    {
                        'id': 613,
                        'name': '兑换商户',
                        'code': '006001003',
                        'icon': '',
                        'seq': 513,
                        'state': '',
                        'url': '/main/member/exchangeMerchant',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 610,
                        'pId': 610
                    }],
                    'auths': null,
                    'pid': 600,
                    'pId': 600
                }],
                'auths': null,
                'pid': 0,
                'pId': 0
            },
            {
                'id': 500,
                'name': '系统设置',
                'code': '005',
                'icon': 'mc-menu-sys',
                'seq': 600,
                'state': '',
                'url': '/main/sys',
                'show': true,
                'leaf': false,
                'children': [{
                    'id': 510,
                    'name': '组织架构',
                    'code': '005001',
                    'icon': '',
                    'seq': 610,
                    'state': '',
                    'url': '/main/sys/orgStructure',
                    'show': true,
                    'leaf': false,
                    'children': [{
                        'id': 511,
                        'name': '机构信息',
                        'code': '005001001',
                        'icon': '',
                        'seq': 611,
                        'state': '',
                        'url': '/main/sys/orgInfo',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [],
                        'pid': 510,
                        'pId': 510
                    },
                    {
                        'id': 512,
                        'name': '角色权限',
                        'code': '005001002',
                        'icon': '',
                        'seq': 612,
                        'state': '',
                        'url': '/main/sys/role',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [{
                            'id': 1300,
                            'name': '新增',
                            'detail': '新增',
                            'ownerMenuId': 512
                        },
                        {
                            'id': 1301,
                            'name': '编辑',
                            'detail': '编辑',
                            'ownerMenuId': 512
                        },
                        {
                            'id': 1302,
                            'name': '删除',
                            'detail': '删除',
                            'ownerMenuId': 512
                        },
                        {
                            'id': 1306,
                            'name': '设置权限',
                            'detail': '设置权限',
                            'ownerMenuId': 512
                        }],
                        'pid': 510,
                        'pId': 510
                    },
                    {
                        'id': 513,
                        'name': '用户信息',
                        'code': '005001003',
                        'icon': '',
                        'seq': 613,
                        'state': '',
                        'url': '/main/sys/userInfo',
                        'show': true,
                        'leaf': true,
                        'children': [],
                        'auths': [{
                            'id': 1001,
                            'name': '新增',
                            'detail': '新增',
                            'ownerMenuId': 513
                        },
                        {
                            'id': 1002,
                            'name': '编辑',
                            'detail': '编辑',
                            'ownerMenuId': 513
                        },
                        {
                            'id': 1005,
                            'name': '停用/启用',
                            'detail': '停用/启用',
                            'ownerMenuId': 513
                        },
                        {
                            'id': 1006,
                            'name': '重置密码',
                            'detail': '重置密码',
                            'ownerMenuId': 513
                        }],
                        'pid': 510,
                        'pId': 510
                    }],
                    'auths': null,
                    'pid': 500,
                    'pId': 500
                }],
                'auths': null,
                'pid': 0,
                'pId': 0
            }
        ];
    }

    getMenuList() {
        this.menuSer.getMenuLists().subscribe((resData) => {
            // this.menuList = resData;
            this.menuList = [];
        });
    }

    switchSecondMenu(menu) {
        this.secondMenuList = menu.children;
        if (!menu.children.length) {
            return;
        }
        this.showSecondMenu = true;
    }

    navigate(menu: MenuServiceNs.MenuModal) {
        this.currentUrl = menu.url;
        if (menu.leaf !== 0) {
            this.router.navigateByUrl(menu.url);
        }
        if (menu.leaf === 0 && menu.children.length === 0) {
            this.router.navigateByUrl(menu.url);
        }
        this.showSecondMenu = false;
    }

    switchCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }

    ngOnInit() {
        this.getMenuList();
        // TODO: 执行关闭菜单操作
        document.addEventListener('click', (e) => {
            // console.log(e);
            if (e.clientX > 360 || e.clientY < 60) {
                this.showSecondMenu = false;
            }
        });
    }

}
