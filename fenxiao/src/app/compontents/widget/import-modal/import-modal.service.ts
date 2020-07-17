import { Injectable, Injector } from '@angular/core';
import { BaseConfirmModal } from '../base-confirm-modal';
import { ImportModalComponent } from './import-modal.component';

@Injectable()
export class ImportModalService extends BaseConfirmModal.BaseConfirmModalService {

    constructor(private injector: Injector) {
        super(injector);
    }

    getContentComponent(): any {
        return ImportModalComponent;
    }

    private confirmCallback_child(contentComponentInstance?: any) {
        return contentComponentInstance.getCurrentValue();
    }

    cancelCallback_child(contentComponentInstance?: object) {
        return this.modalRef.destroy(null);
    }

    show(params: any = {}) {
        return super.show({
            nzTitle: '导入', nzFooter: [{
                label: '导入',
                type: 'primary',
                show: true,
                onClick: (this.confirmCallback_child).bind(this)
            }, {
                label: '取消',
                type: 'default',
                show: true,
                onClick: (this.cancelCallback_child).bind(this)
            }]
        }, params);
    }
}
