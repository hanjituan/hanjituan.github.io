import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsService } from '@app/core/common-services/goods.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';
import { environment } from '@env/environment';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-goods-info-add',
    templateUrl: './goods-info-add.component.html',
    styleUrls: ['./goods-info-add.component.less']
})

export class GoodsInfoAddComponent implements OnInit {
    @Output() returnBack = new EventEmitter<any>();
    @Input() id: string;
    validateForm: FormGroup;
    switchValue = false;
    nzOptions: any;
    listOfData: any;
    isVisible: boolean;
    categoryVisiable: boolean;
    modalTitle = '';
    basicUnit: any;
    midUnit: any;
    bigUnit: any;
    maxUnit: any;
    brandList: Array<any>;
    unitList: Array<any>;
    productObj: any;
    unitLevel: any;
    categoryList: any;
    submitFormLoading: boolean;
    upLoadUrl: string;
    fileMineType: string;
    imgUrl: string;
    previewVisible: boolean;
    previewImage: string;
    imgUrlFromCheckDetail: string;
    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private goodsService: GoodsService,
        private http: HttpClient,
    ) {
        this.imgUrlFromCheckDetail = '';
        this.isVisible = false;
        this.submitFormLoading = false;
        this.nzOptions = [];
        this.listOfData = [
            { uomLevel: 0, uomName: '', barcode: '', salePrice: '', buyPrice: '', memberPrice: '', uomId: null, uomRate: 1 },
        ];
        this.unitLevel = ['基础单位', '中单位', '大单位', '最大单位'];
        this.fileMineType = 'image/png,image/jpeg,image/gif,image/bmp';
        this.upLoadUrl = environment.baseUrl.bs + 'company/SysObjectStorage/upload';
    }

    urlChange(e) {
        this.imgUrl = e;
    }

    upLoadImg(e) {
        if (!!e && e.type === 'success') {
            setTimeout(() => {
                this.imgUrl = e.file.response.value;
            }, 0);
        }
        if (!!e && e.type === 'removed') {
            this.imgUrl = '';
        }
    }

    handlePreview = (file: any) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }

    switchUnit() {
        this.midUnit = '';
        this.bigUnit = '';
        this.maxUnit = '';
        if (this.switchValue) {
            this.listOfData.push(
                { uomLevel: 1, uomName: '', barcode: '', salePrice: '', buyPrice: '', memberPrice: '', uomId: null, uomRate: 0 },
                { uomLevel: 2, uomName: '', barcode: '', salePrice: '', buyPrice: '', memberPrice: '', uomId: null, uomRate: 0 },
                { uomLevel: 3, uomName: '', barcode: '', salePrice: '', buyPrice: '', memberPrice: '', uomId: null, uomRate: 0 },
            );
            this.listOfData = JSON.parse(JSON.stringify(this.listOfData));
        } else {
            if (this.listOfData.length !== 1) {
                this.listOfData.splice(1, 3);
                this.listOfData = JSON.parse(JSON.stringify(this.listOfData));
            }
        }
    }

    async inputValue() {
        const res = await this.goodsService.getGoodsNameByFirstLetter(this.validateForm.value.name);
        if (res.code !== 0) {
            res.message.error(res.message);
            return;
        }
        this.validateForm.patchValue({ chineseFirstLetter: res.value });
    }

    calc(uomIndex?) {
        const curUom = this.listOfData[uomIndex] || {};
        const baseUom = this.listOfData[0];
        (this.listOfData as Array<any>).forEach((item, index) => {
            if (!item.uomRate) {
                return;
            }
            if (index === uomIndex) {
                return;
            }
            if (!item.salePrice) {
                item.salePrice = (curUom.salePrice ? (curUom.salePrice / curUom.uomRate) : (baseUom.salePrice || 0)) * item.uomRate;
            }
            if (!item.buyPrice) {
                item.buyPrice = (curUom.buyPrice ? (curUom.buyPrice / curUom.uomRate) : (baseUom.buyPrice || 0)) * item.uomRate;
            }
            if (!item.memberPrice) {
                item.memberPrice = (curUom.memberPrice ? (curUom.memberPrice / curUom.uomRate) : (baseUom.memberPrice || 0)) * item.uomRate;
            }
        });
    }

    showModal(str: string) {
        if (str === 'unit') {
            this.productObj = { list: 'productUomItems', other: 'productUomItem' };
            this.modalTitle = '添加单位';
        } else {
            this.productObj = { list: 'productBrands', other: 'productBrand' };
            this.modalTitle = '添加品牌';
        }
        this.isVisible = true;
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
        this.categoryVisiable = false;
        this.loadCategoryListDate();
    }

    onChanges(values: string[]): void { }

    saveGood() {
        this.submitForm();
    }

    async submitForm() {
        let value: any = String(this.validateForm.value.categoryCode);
        value = value.split(',');
        value = value[value.length - 1];

        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (!this.validateForm.invalid) {
            if (!this.listOfData[0].uomId) {
                this.message.warning('基础单位必须填写');
                return;
            }
            if (!this.listOfData[0].salePrice) {
                this.message.warning('销售价必须填写');
                return;
            }

            this.submitFormLoading = true;

            this.validateForm.patchValue({
                categoryCode: value
            });

            const uomList = [];
            this.listOfData.map(item => {
                if (item.uomId) {
                    uomList.push(item);
                }
                this.unitList.map((el) => {
                    if (item.uomId === el.id) {
                        item.uomName = el.name;
                    }
                });
            });

            const params = {
                uomList,
                name: this.validateForm.value.name,
                brandId: this.validateForm.value.brandId,
                shelfLife: this.validateForm.value.shelfLife,
                specification: this.validateForm.value.specification,
                warningShelfLife: this.validateForm.value.warningShelfLife,
                chineseFirstLetter: this.validateForm.value.chineseFirstLetter,
                categoryCode: this.validateForm.value.categoryCode,
                userCode: this.validateForm.value.userCode,
                initInvtQty: this.validateForm.value.initInvtQty,
                imageUrl: this.imgUrl
            };

            let res: any = null;
            if (this.id) {
                res = await this.goodsService.upDateGood(Object.assign({ id: this.id }, params));
            } else {
                res = await this.goodsService.addGood(params);
            }

            if (res.code !== 0) {
                this.message.error(res.message);
                this.submitFormLoading = false;
                return;
            }
            this.submitFormLoading = false;
            this.message.success(res.message);
            this.returnBack.emit('refresh');
            this.validateForm.reset();
        }
    }

    returnToList() {
        this.returnBack.emit();
    }

    changeUnit(index?) {
        this.unitList.map(item => {
            if (item.id === this.listOfData[0].uomId) {
                this.basicUnit = item.name;
            }
            if (this.listOfData.length === 2) {
                if (item.id === this.listOfData[1].uomId) {
                    this.midUnit = item.name;
                }
            }
            if (this.listOfData.length === 3) {
                if (item.id === this.listOfData[2].uomId) {
                    this.bigUnit = item.name;
                }
            }
            if (this.listOfData.length === 4) {
                if (item.id === this.listOfData[3].uomId) {
                    this.maxUnit = item.name;
                }
            }

        });
    }

    judgNameAndGetAllUnitslist() {
        this.getAllUnitslist();
    }

    addCategory() {
        this.categoryVisiable = true;
    }

    async generateBarcode(index) {
        const res = await this.goodsService.generateBarcode();
        if (res.code === 0) {
            this.listOfData[index].barcode = res.value;
        } else {
            this.message.error(res.message);
        }
    }

    async getDetail() {
        const res = await this.goodsService.getGoodDetail(this.id);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        if (res.value.imageUrl) {
            this.imgUrlFromCheckDetail = environment.useOss ? res.value.imageUrl
                : `${environment.baseUrl.bs}company/SysObjectStorage/read?fileId=${res.value.imageUrl}`;
        }
        const arr = [];
        res.value.categoryList.map(item => {
            arr.push(item.code);
        });
        this.validateForm.patchValue(res.value);
        this.validateForm.patchValue({
            categoryCode: arr.reverse()
        });

        this.listOfData = res.value.uomList;
        if (this.listOfData.length > 1) {
            this.switchValue = true;
        }
        this.changeUnit();
    }

    async getGoodBrand() {
        const res = await this.goodsService.getAllUnitsList(null, 'productBrands');
        if (res.code !== 0) {
            this.message.error(res.message);
        } else {
            this.brandList = res.value;
        }
    }

    async getAllUnitslist() {
        const res = await this.goodsService.getAllUnitsList(null, 'productUomItems');
        if (res.code !== 0) {
            this.message.error(res.message);
        } else {
            this.unitList = res.value;
        }
    }

    async loadCategoryListDate() {
        const res = await this.goodsService.getAllGoodsList(null);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        res.value.map(item => {
            item.label = item.name;
            item.value = item.code;
            if (item.sonCategoryList.length === 0) {
                item.isLeaf = true;
            } else {
                item.sonCategoryList.map(el => {
                    el.label = el.name;
                    el.value = el.code;
                    if (el.sonCategoryList.length === 0) {
                        el.isLeaf = true;
                    } else {
                        el.sonCategoryList.map(th => {
                            th.label = th.name;
                            th.value = th.code;
                            th.isLeaf = true;
                        });
                        el.children = el.sonCategoryList;
                    }
                });
                item.children = item.sonCategoryList;
            }
        });
        this.categoryList = res.value;
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            categoryCode: [null],
            specification: [null],
            brandId: [null],
            chineseFirstLetter: [null],
            userCode: [null],
            shelfLife: [null],
            warningShelfLife: [null],
            initInvtQty: [null],
            brandName: [null],
            categoryName: [null],
        });
    }

    ngOnInit(): void {
        this.initForm();
        this.switchUnit();
        this.getGoodBrand();
        this.getAllUnitslist();
        this.loadCategoryListDate();
        if (this.id) {
            this.getDetail();
        }
    }

}
