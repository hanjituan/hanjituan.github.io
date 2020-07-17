import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseConfirmModal } from '../base-confirm-modal';

@Component({
    selector: 'app-position-picker',
    templateUrl: './position-picker.component.html',
    styleUrls: ['./position-picker.component.scss']
})
export class PositionPickerComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements OnInit {
    constructor(private modalRef: NzModalRef) {
        super();
    }

    ngOnInit() {
        console.log(this.params);
    }
    protected getCurrentValue() {
        return {
            test: 'ok'
        };
    }

    public clickCallBack() {
        this.modalRef.destroy({ value: 'hshshs' });
    }
}
