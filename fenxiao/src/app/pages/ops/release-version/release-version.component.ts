
import { Component, ViewChild, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { VersionsModel } from '../../../core/models/ops-model';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { Router } from '@angular/router';
import { OpsService } from './../../../core/common-services/ops.service';
import { ShowMessageService } from '@app/compontents/widget/show-message/show-message';
@Component({
    selector: 'app-release-version',
    templateUrl: './release-version.component.html',
    styleUrls: ['./release-version.component.less']
})
export class ReleaseVersionComponent implements OnInit, AfterViewInit {
    @ViewChild('operation', {static: false}) operationTpl: TemplateRef<any>;
    dataList: VersionsModel[];
    tableConfig: UfastTableNs.TableConfig;
    constructor(private opsSer: OpsService,
                private router: Router,
                private message: ShowMessageService) { }

    getDataList() {
        const params = {
            filters: {},
            pageNum: this.tableConfig.pageNum,
            pageSize: this.tableConfig.pageSize
        };
        this.opsSer.getVersionList(params).subscribe((res) => {
            this.dataList = res.data.list || [];
            this.tableConfig.total = res.data.total || 0;
        });
    }

    addVersion() {
        this.router.navigate(['/main/ops/addVersion'], {});
    }

    deleteItem(item) {
        this.message.showAlertMessage('', '是否确认删除', 'confirm').afterClose.subscribe((res) => {
            if (res === 'onCancel') {
                return;
            }
            this.opsSer.deleteVersion(item.id).subscribe(data => {
                this.getDataList();
            });
        });
    }

    private initTb() {
        this.tableConfig = {
            showCheckbox: false,
            showPagination: true,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            loading: false,
            headers: [ {
                title: '名称',
                width: 100,
                field: 'packageName'
            }, {
                title: '类型',
                width: 50,
                field: 'packageType',
                pipe: 'apkType'
            }, {
                title: '版本号',
                width: 80,
                field: 'version'
            }, {
                title: '发布时间',
                width: 80,
                field: 'createDate',
                pipe: 'date:yyyy-MM-dd'
            }, {
                title: '是否强制更新',
                width: 60,
                field: 'isForceUpdate',
                pipe: 'booleanType'
            }, {
                title: '版本说明',
                width: 130,
                field: 'remark'
            }, {
                title: '操作',
                width: 100,
                tdTemplate: this.operationTpl
            }]
        };
    }

    ngAfterViewInit(): void {
        this.initTb();
        this.getDataList();
    }

    ngOnInit() {
        
    }

}
