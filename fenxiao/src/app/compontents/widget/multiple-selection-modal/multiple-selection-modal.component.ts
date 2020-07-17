import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseConfirmModal } from '../base-confirm-modal';
import { ShowMessageService } from '../show-message/show-message';

@Component({
    selector: 'app-multiple-selection-modal',
    templateUrl: './multiple-selection-modal.component.html',
    styleUrls: ['./multiple-selection-modal.component.scss']
})
export class MultipleSelectionModalComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements OnInit {

    private dataService: any;
    param: any;
    dataList: any;
    allChecked = false;
    indeterminate = false;
    preClickDataList: any;
    params: any;
    searchCtx: any;

    constructor(public injector: Injector, private messageService: ShowMessageService) {
        super();
        this.dataList = [];
        this.preClickDataList = [];
        this.param = {
            filters: {},
            pageSize: 10,
            pageNum: 1
        };
        this.searchCtx = {
            getDataList: this.getDataList,
            param: this.param
        };
    }

    protected getCurrentValue() {
        return this.preClickDataList;
    }

    getDataList = () => {
        this.messageService.showLoading('');
        const searchParam = {
            filters: Object.assign({}, this.param.filters),
            pageSize: this.param.pageSize,
            pageNum: this.param.pageNum
        };
        if (this.params.service === 'DeviceLedgerService' && this.params.methods === 'getLedgerList') {
            if (!!searchParam.filters.deviceClassId) {
                searchParam.filters.deviceClassId = searchParam.filters.deviceClassId.length > 0
                    ? searchParam.filters.deviceClassId[searchParam.filters.deviceClassId.length - 1]
                    : '';
            }
        }
        this.dataService[this.params.methods](searchParam).subscribe((resData) => {
            if (resData.code !== 0) {
                this.messageService.showAlertMessage('', resData.message, 'warning');
                this.messageService.closeLoading();
                return;
            }
            this.messageService.closeLoading();
            this.dataList = resData.value.list;
            Object.keys(this.dataList).forEach((item) => {
                this.dataList[item].checked = false;
            });
            this.checkIsSelceted();
            this.refreshStatus();
            this.params.tableConfig.total = resData.value.total;
        });
    };

    onIndexChange(index: number) {
        if (index === 0) {
            return;
        }
        this.param.pageNum = index;
        this.getDataList();
    }

    checkIsSelceted() {
        const arrTemp = this.preClickDataList.length > 0 ? this.preClickDataList : this.params.selectedData;
        const selecedDataIds = [];
        Object.keys(arrTemp).forEach((item) => {
            selecedDataIds.push(arrTemp[item][this.params.checkFlag]);
        });
        this.dataList.map((item) => {
            if (selecedDataIds.includes(item[this.params.checkFlag])) {
                return item.checked = true;
            } else {
                return item.checked = false;
            }
        });
    }


    refreshStatus(event?, item?): void {
        const allChecked = this.dataList.every(value => value.checked === true);
        const allUnChecked = this.dataList.every(value => !value.checked);
        this.allChecked = this.dataList.length > 0 ? allChecked : false;
        this.indeterminate = (!allChecked) && (!allUnChecked);

        if (event === true) {
            this.preClickDataList.push(item);
        } else if (event === false) {
            this.preClickDataList = this.preClickDataList.filter((beRemoveItem) => {
                return beRemoveItem[this.params.checkFlag] !== item[this.params.checkFlag];
            });
        }
    }

    checkAll(value: boolean): void {
        this.dataList.forEach((data) => {
            data.checked = value;
            if (value === true) {
                this.preClickDataList.push(data);
            } else if (value === false) {
                this.preClickDataList = this.preClickDataList.filter((item) => {
                    return item[this.params.checkFlag] !== data[this.params.checkFlag];
                });
            }
        });

        const hash = {};
        this.preClickDataList = this.preClickDataList.reduce((preVal, curVal) => {
            if (!hash[curVal[this.params.checkFlag]]) {
                hash[curVal[this.params.checkFlag]] = true && preVal.push(curVal);
            }
            return preVal;
        }, []);
        this.refreshStatus();
    }

    confirmCallback() {
    }

    cancelCallback() {
    }

    ngOnInit() {
        Object.assign(this.param.filters, this.params.searchParams || {});
        this.getDataList();
        this.preClickDataList = this.params.selectedData;

    }

}
