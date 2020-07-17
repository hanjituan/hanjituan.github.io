import { Injectable, Injector } from '@angular/core';
import { BaseConfirmModal } from '../base-confirm-modal';
import { MultipleSelectionModalComponent } from './multiple-selection-modal.component';

@Injectable()
export class MulSelModalService extends BaseConfirmModal.BaseConfirmModalService {
    getContentComponent() {
        return MultipleSelectionModalComponent;
    }

    show(params: any = {}) {
        return super.show({ nzTitle: '请勾选数据', nzWidth: '1000' }, params);
    }

    constructor(private injector: Injector) {
        super(injector);
    }
}
