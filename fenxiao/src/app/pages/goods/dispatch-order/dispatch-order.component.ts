import { UserService } from './../../../core/common-services/user.service';
import { GoodsService } from './../../../core/common-services/goods.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';


@Component({
    selector: 'app-dispatch-order',
    templateUrl: './dispatch-order.component.html',
    styleUrls: ['./dispatch-order.component.less']
})
export class DispatchOrderComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    tableConfig: UfastTableNs.TableConfig;
    filters: any;
    dataList: any;
    listOfData: any;
    isVisible = false;
    modalTitle = '';
    isConfirmLoading: any;
    extendConditions: any;
    dateFormat: any;
    constructor(
        private goodsService: GoodsService,
        private userService: UserService
    ) {
        this.filters = {
            name: '',
            locked: '',
            cater: '',
            img: ''
        };
        this.dataList = [{}];
        this.listOfData = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park'
            },
        ];
    }

    searchByCondition() {

    }

    resetCondition() {

    }

    checkTableItem(event) {

    }

    getDataList(val) {

    }

    openDialog(str: string, value?) {
        if (str === 'add') {
            this.modalTitle = '新增调价单';
        } else if (str === 'edit') {
            this.modalTitle = '编辑调价单';
        }
        this.isVisible = true;
    }

    handleOk(): void {
        // this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    ngOnInit() {

    }
    ngAfterViewInit() {
        this.tableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: true,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '序号', fixed: true, width: 50, tdTemplate: this.seqNoTpl },
                { title: '单据编号', fixed: true, width: 80, field: 'loginName' },
                { title: '调价商品品类', fixed: true, width: 80, field: 'name' },
                { title: '创建时间', fixed: true, width: 80, field: 'loginName' },
                { title: '创建人', fixed: true, width: 80, field: 'mobile' },
                { title: '状态', width: 80, field: 'roleNames' },
                { title: '操作', width: 180, tdTemplate: this.operationTpl },
            ]
        };
    }
}
