import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MerchantModel } from './../../core/models/merchant-model';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { MerchantService } from './../../core/common-services/merchant.service';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';
@Component({
    selector: 'app-merchant',
    templateUrl: './merchant.component.html',
    styleUrls: ['./merchant.component.less']
})
export class MerchantComponent implements OnInit, AfterViewInit {
    public merchantList: MerchantModel[];
    public tableConfig: UfastTableNs.TableConfig;
    @ViewChild('merchantName', { static: false }) merchantNameTpl: TemplateRef<any>;
    @ViewChild('seqNo', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('merchantStatus', { static: false }) merchantStatusTpl: TemplateRef<any>;
    @ViewChild('operation', { static: false }) operationTpl: TemplateRef<any>;
    searchParams = {
        companyAccountType: '',
        companyAreaId: '',
        companyName: '',
        isLock: '',
        createStartDate: null,
        createEndDate: null,
        address: [],
        salesMan: '',
        salesManDeptCodeList: []
    };
    merchantTypeList: {
        value: string;
        label: string;
    }[];
    tplList: {
        value: string;
        label: string;
    }[];
    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any;
        downloadServer: string;
    };
    constructor(
        private router: Router,
        private merchantSer: MerchantService,
    ) {
        this.merchantTypeList = [{
            label: '全部',
            value: ''
        },
        ...(new MapPipe().transformMapToArray(MapSet.merchantType))];
        this.tplList = [{
            label: '全部',
            value: ''
        }];

        this.productExportParam = {
            downloadUrl: 'company/export', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '商户列表', // 导出文件名
            fileParam: this.searchParams,
            downloadServer: 'Bs'
        };
    }

    init(): void {
        this.getMerchantList();
    }

    resetForm(): void {
        this.searchParams.companyAccountType = '';
        this.searchParams.companyAreaId = '';
        this.searchParams.address = [];
        this.searchParams.companyName = '';
        this.searchParams.salesMan = '';
        this.searchParams.createEndDate = null;
        this.searchParams.createStartDate = null;
        this.searchParams.isLock = '';
        this.searchParams.salesManDeptCodeList = [];
    }

    searchData(): void {
        this.tableConfig.pageNum = 1;
        this.getMerchantList();
    }

    addMerchant(): void {
        this.router.navigate(['/main/merchant/edit'], { queryParams: { isDetail: false } });
    }

    goDetail(index: number): void {
        this.router.navigate(['/main/merchant/edit'], { queryParams: { isDetail: true, id: this.merchantList[index].orgId } });
    }

    editInfo(item: MerchantModel) {
        this.router.navigate(['/main/merchant/edit'], { queryParams: { isDetail: false, id: item.orgId } });
    }

    configPayInfo(item: MerchantModel) {
        this.router.navigate(['/main/merchant/paySet'], { queryParams: { isDetail: true, id: item.orgId } });
    }

    initTb(): void {
        this.tableConfig = {
            showCheckbox: false,
            showPagination: true,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            loading: true,
            headers: [
                // { title: '序号', width: 40, tdTemplate: this.seqNoTpl },
                { title: '商户编号', width: 80, field: 'orgId' },
                { title: '商户名称', width: 150, tdTemplate: this.merchantNameTpl },
                { title: '注册时间', width: 100, field: 'createDate', pipe: 'date:yyyy-MM-dd' },
                { title: '到期时间', width: 100, field: 'expireDate', pipe: 'date:yyyy-MM-dd' },
                { title: '联系人', width: 80, field: 'linkMan1' },
                { title: '手机号', width: 80, field: 'linkManTel1' },
                { title: '商户来源', width: 100, field: 'regChannel', pipe: 'regChannel' },
                { title: '销售人员', width: 80, field: 'salesMan' },
                { title: '所属机构', width: 100, field: 'salesManDeptName' },
                { title: '权限模板', width: 100, field: 'templateName' },
                { title: '账户类型', width: 100, field: 'companyAccountType', pipe: 'merchantType' },
                { title: '商户状态', width: 100, tdTemplate: this.merchantStatusTpl },
                { title: '操作', width: 300, tdTemplate: this.operationTpl }
            ]
        };
    }

    public getMerchantList() {
        const param = {
            pageNum: this.tableConfig.pageNum,
            pageSize: this.tableConfig.pageSize,
            filters: this.searchParams
        };
        param.filters.companyAreaId = '';
        param.filters['salesManDeptCode'] = '';
        const addressLength = param.filters.address ? param.filters.address.length : 0;
        if (addressLength > 0) {
            param.filters.companyAreaId = param.filters.address[addressLength - 1];
        }
        const deptLength = param.filters.salesManDeptCodeList ? param.filters.salesManDeptCodeList.length : 0;
        if (deptLength > 0) {
            param.filters['salesManDeptCode'] = param.filters.salesManDeptCodeList[deptLength - 1];
        }
        delete param.filters.address;
        delete param.filters.salesManDeptCodeList;
        this.tableConfig.loading = true;
        this.merchantSer.getMerchantLists(param).subscribe((res) => {
            this.merchantList = res.data.list || [];
            this.tableConfig.total = res.data.total;
        }, () => { }, () => {
            this.tableConfig.loading = false;
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.initTb();
        this.init();
    }

}
