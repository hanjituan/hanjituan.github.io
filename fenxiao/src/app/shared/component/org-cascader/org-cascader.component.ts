import { map } from 'rxjs/internal/operators';
import { Component, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { OrganizService } from '@app/core/common-services/sysSetting/organiz.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-org-cascader',
    templateUrl: './org-cascader.component.html',
    styleUrls: ['./org-cascader.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OrgCascaderComponent),
            multi: true
        }
    ]
})
export class OrgCascaderComponent implements OnInit, ControlValueAccessor {
    curOrgValue: string[];
    changeValue: (value: any) => {};
    @Output() optionNameChange = new EventEmitter();
    constructor(private orgSer: OrganizService) { }


    public loadData(node: any, index: number): PromiseLike<any> {
        return new Promise(async (resolve) => {
            const pid = index < 0 ? 0 : node.id;
            this.getOrgList(pid).then((res) => {
                node.children  = res || [];
                resolve();
            });
        });
    }

    public getOrgList(pid) {
        return this.orgSer.deptChildrenList({ pId: pid }).then((res) => {
            res.data.forEach((item) => {
                item.isLeaf = !!item.leaf;
                item.value = item.code;
                item.label = item.name;
            });
            return res.data;
        });
    }

    public dataChange(value) {
        console.info(value);
        this.changeValue(value);
    }

    public optionChange(event) {
        if (!this.optionNameChange) {
            return;
        }
        if (!event || event.length === 0) {
            this.optionNameChange.emit('');
            return;
        }
        this.optionNameChange.emit(event[event.length - 1] ? event[event.length - 1].name : '');
    }

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
        this.curOrgValue = obj;
    }
    registerOnChange(fn: any): void {
        this.changeValue = fn;
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    ngOnInit() {
    }

}
