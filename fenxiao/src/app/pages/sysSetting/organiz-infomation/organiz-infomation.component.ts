import { OrganizService } from './../../../core/common-services/sysSetting/organiz.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-organiz-infomation',
    templateUrl: './organiz-infomation.component.html',
    styleUrls: ['./organiz-infomation.component.less']
})

export class OrganizInfomationComponent implements OnInit {
    firstData: any[];
    secondData: any[];
    thirdData: any[];
    constructor(
        private modal: NzModalService,
        private deptSer: OrganizService,
        private message: NzMessageService,
    ) {
        this.firstData = [];
        this.secondData = [];
        this.thirdData = [];
    }

    openFolder(index, val, bool?) {
        if (!this[val][index].open) {
            const str = val === 'firstData' ? 'secondData' : 'thirdData';
            this.getDeptList(this[val][index].id, str);
        }
        if (bool) {
            return;
        }
        this[val][index].open = !this[val][index].open;
    }

    closeFolder(index, val) {
        this[val][index].open = false;
    }

    cancelAdd(index, val) {
        if (this[val][index].editState) {
            this.cancelEdit(index, val);
            return;
        }
        this[val].splice(index, 1);
    }

    async cancelEdit(index, val) {
        const cancelId = this[val][index].pId ? this[val][index].pId : 0;
        const res = await this.deptSer.deptChildrenList({ pId: cancelId });
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this[val][index].name = res.data[index] && res.data[index].name;
        this[val][index].editState = false;
        this[val][index].state = false;
    }

    addChild(index, val) {
        if (!this[val][index].id) {
            this.message.warning('请先保存之后再添加下级');
            return;
        }
        this.openFolder(index, val, true);
        setTimeout(() => {
            this[val][index].open = true;
            if (val === 'firstData') {
                let currIndex = null;
                this.secondData.map((item, num) => { if (!item.name) { currIndex = num; } });
                this.secondData.splice(currIndex, currIndex ? 1 : 0);
                this.secondData = [...this.secondData, ...[{ name: '', state: true, level: 2, pId: this[val][index].id }]];
            } else {
                let currIndex = null;
                this.thirdData.map((item, num) => { if (!item.name) { currIndex = num; } });
                this.thirdData.splice(currIndex, currIndex ? 1 : 0);
                this.thirdData = [...this.thirdData, ...[{ name: '', state: true, level: 3, pId: this[val][index].id }]];
            }
        }, 200);
    }

    editCell(index, val) {
        this[val][index].editState = true;
        this[val][index].state = true;
    }

    deleteCell(index, val) {
        if (!this[val][index].id) {
            this.cancelAdd(index, val);
            return;
        }
        this.modal.confirm({
            nzTitle: `确定删除选中的机构 ${this[val][index].name} 吗?`,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.deleteSer(index, val);
                    resolve();
                }).catch(() => console.log('Oops errors!'))
        });
    }

    async deleteSer(index, val) {
        const id = this[val][index].id;
        const res = await this.deptSer.deptDel({ id });
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.changeLeafAfterDelete(this[val][index].pid, index, val);
        this[val] = this[val].filter(d => d.id !== id);
        this.message.success(res.message);
    }

    async changeLeafAfterDelete(pid, index, val) {
        const res = await this.deptSer.deptChildrenList({ pId: pid });
        if (val === 'thirdData') {
            this.secondData.map(item => {
                if (item.id === pid) {
                    item.leaf = res.data.length === 0;
                }
            });
        }

        if (val === 'secondData') {
            this.firstData.map(item => {
                if (item.id === pid) {
                    item.leaf = res.data.length === 0;
                }
            });
        }
    }

    async saveEdit(index, val) {
        const params = {
            id: this[val][index].id,
            name: this[val][index].name,
            pId: this[val][index].pId ? this[val][index].pId : 0,
        };
        const res = await this.deptSer.deptUpdate(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this[val][index].state = false;
    }

    async saveAdd(index, val) {
        if (!this[val][index].name) {
            this.message.warning('请填写机构名称!');
            return;
        }
        if (this[val][index].editState) {
            this.saveEdit(index, val);
            return;
        }
        const params = {
            pId: this[val][index].pId ? this[val][index].pId : 0,
            name: this[val][index].name,
        };
        const res = await this.deptSer.deptAdd(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this[val][index].state = false;
        this.getCurrentId(params.pId, index, val);
        this.changeLeaf(params.pId, val, index);
    }

    changeLeaf(pid, val, index) {
        if (val === 'thirdData') {
            this.secondData.map(item => {
                if (item.id === pid) {
                    item.leaf = false;
                }
            });
        }
        if (val === 'secondData') {
            this.firstData.map(item => {
                if (item.id === pid) {
                    item.leaf = false;
                }
            });
        }
    }

    async getCurrentId(id, index, val) {
        const res = await this.deptSer.deptChildrenList({ pId: id });
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this[val][index] = res.data[res.data.length - 1];
    }

    addDept() {
        this.firstData = [...this.firstData, ...[{ name: '', state: true, level: 1 }]];
    }

    async getDeptList(id, val) {
        const res = await this.deptSer.deptChildrenList({ pId: id });
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        const tempArr = [];
        this[val].map(item => {
            if (item.id) {
                tempArr.push(item.id);
            }
            item.open = item.open ? item.open : false;
        });

        res.data.map(item => {
            if (!tempArr.includes(item.id)) {
                this[val].push(item);
            }
        });
    }

    ngOnInit() {
        this.getDeptList(0, 'firstData');
    }

}
