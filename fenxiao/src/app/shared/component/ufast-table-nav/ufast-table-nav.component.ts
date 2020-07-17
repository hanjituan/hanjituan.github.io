import { Component, OnInit, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { UfastTableNs } from '../ufast-table/ufast-table.component';
import { StorageTbService } from './../../services/storageTb.service';
@Component({
    selector: 'app-ufast-table-nav',
    templateUrl: './ufast-table-nav.component.html',
    styleUrls: ['./ufast-table-nav.component.scss']
})
export class UfastTableNavComponent implements OnInit {
    tbName: string;
    tbSaveId = '';
    /**
     * 搜索输入框提示文字
     * */
    @Input() searchPlaceholder: string;
    /**
     * 左侧模板
     * */
    @Input() leftTemplate: TemplateRef<any>;
    /**
     * 右侧模板
     * */
    @Input() rightTemplate: TemplateRef<any>;
    /**
     * 搜索按钮点击事件
     * */
    @Output() search: EventEmitter<any>;
    /**
     * 高级搜索按钮点击事件
     * */
    @Output() advancedSearch: EventEmitter<any>;
    /**
     * 刷新按钮点击事件
     * */
    @Output() refresh: EventEmitter<any>;
    /**
     * 是否显示高级搜索按钮
     * 默认: true
     * */
    @Input() showAdvancedSearch: boolean;

    @Input() showConfig: boolean;
    /**
     * 是否显示普通搜索
     * 默认：true
     */
    @Input() showSearch: boolean;
    /**
    * 是否显示刷新按钮
     * 默认：true
     * */
    @Input() showRefresh: boolean;
    /**
     * 表格配置参数
     * */
    @Input()
    set tableConfig(value: UfastTableNs.TableConfig) {
        if (!value) {
            this._tableHeader = null;
            return;
        }
        if (!value.auxDataEmitter) {
            value.auxDataEmitter = new EventEmitter<any>();
        }
        this.tbName = value.tbName;
        this.tableEmitter = value.auxDataEmitter;
        this._tableHeader = value.headers;
        if (this._tableHeader) {
            this._tableHeader.forEach((item: UfastTableNs.TableHeader) => {
                item.show = item.show !== false ? true : false;
            });
        }
    }
    /**
     * 搜索框值双向绑定
     * */
    @Input()
    set searchText(value: string) {
        this._searchText = value;
    }
    get searchText(): string {
        return this._searchText;
    }
    @Output() searchTextChange: EventEmitter<string>;

    _searchText: string;
    _tableHeader: UfastTableNs.TableHeader[];
    showTableConfig: boolean;
    private tableEmitter: EventEmitter<any>;
    constructor(private tbService: StorageTbService) {
        this.showTableConfig = false;
        this._tableHeader = null;
        this.searchPlaceholder = '';
        this._searchText = '';
        this.leftTemplate = null;
        this.rightTemplate = null;
        this.advancedSearch = new EventEmitter<any>();
        this.search = new EventEmitter<any>();
        this.refresh = new EventEmitter<any>();
        this.searchTextChange = new EventEmitter<string>();
        this.showAdvancedSearch = false;
        this.showConfig = false;
        this.showRefresh = true;
        this.showSearch = true;
    }
    public trackByItem(index: number, item: any) {
        return item;
    }
    public onFullSearch() {
        this.advancedSearch.emit();
    }
    public searchChange(value: string) {
        this.searchTextChange.emit(value);
    }
    public onSearch() {
        this.search.emit();
    }
    public onRefresh() {
        this.refresh.emit();
    }
    public onTableConfig(event: Event) {
        event.stopPropagation();
        this.showTableConfig = !this.showTableConfig;
    }
    public showTableConfigChange(value) {
        if (value) {
            return;
        }
        this.saveTbConfig();
    }

    private saveTbConfig() {
        if (!this.tbName) {
            return;
        }
        const configList: { title: string, show: boolean, fixed: boolean }[] = [];
        this._tableHeader.forEach((item) => {
            configList.push({
                title: item.title,
                show: !!item.show,
                fixed: !!item.fixed
            });
        });

        this.tbService.setTbConfig({
            name: this.tbName,
            configInfo: JSON.stringify(configList),
            id: this.tbSaveId
        }).subscribe((resData) => {
        });
    }

    private getTbConfig() {
        if (!this.tbName) {
            return;
        }
        this.tbService.getTbConfig(this.tbName).subscribe((resData) => {
            if (!resData.value) {
                return;
            }
            if (!resData.value.configInfo) {
                return;
            }
            this.tbSaveId = resData.value.id || '';
            const savedConfig = JSON.parse(resData.value.configInfo) as UfastTableNs.TableHeader[];
            if (!this.checkTbConfigSameASLocal(savedConfig)) {
                return;
            }
            const colProxy: any = {};
            const backConfig = Object.assign([], this._tableHeader);
            this._tableHeader.length = 0;
            backConfig.forEach((item) => {
                colProxy[item.title] = item;
            });
            savedConfig.forEach((item) => {
                if (!colProxy[item.title]) {
                    return;
                }
                const col = colProxy[item.title];
                Object.assign(col, item);
                this._tableHeader.push(col);
            });
        });
    }

    private checkTbConfigSameASLocal(tbConfig: UfastTableNs.TableHeader[]) {
        if (tbConfig.length !== this._tableHeader.length) {
            return false;
        }

        let hasDiffCol = false;
        const tbColNameList = [];
        tbConfig.forEach((item) => {
            tbColNameList.push(item.title);
        });

        this._tableHeader.forEach((item) => {
            if (hasDiffCol) {
                return;
            }
            hasDiffCol = tbColNameList.indexOf(item.title) === -1;
        });

        return !hasDiffCol;

    }

    public moveUp(index: number) {
        if (index <= 0) {
            return;
        }
        this._tableHeader.splice(index - 1, 0, this._tableHeader.splice(index, 1)[0]);
    }
    public moveDown(index: number) {
        if (index >= this._tableHeader.length - 1) {
            return;
        }
        this._tableHeader.splice(index + 1, 0, this._tableHeader.splice(index, 1)[0]);
    }
    public onFixedChange(value: boolean, index: number) {
        let fixedI = 0;
        for (const len = this._tableHeader.length; fixedI < len; fixedI++) {
            if (!this._tableHeader[fixedI].fixed) {
                break;
            }
        }
        this._tableHeader[index].fixed = value;
        if (index !== fixedI) {
            if (value) {
                this._tableHeader.splice(fixedI, 0, this._tableHeader.splice(index, 1)[0]);
            } else {
                this._tableHeader.splice(fixedI - 1, 0, this._tableHeader.splice(index, 1)[0]);
            }
        }
        this.tableEmitter.emit();
    }

    ngOnInit() {
        this.getTbConfig();
    }

}
