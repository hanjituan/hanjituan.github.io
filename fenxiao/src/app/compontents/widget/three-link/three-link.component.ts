import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ThreeLinkAreaService } from '../../../core/common-services/three-link-area.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-three-link',
    templateUrl: './three-link.component.html',
    styleUrls: ['./three-link.component.less'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => ThreeLinkComponent)
    }]
})
export class ThreeLinkComponent implements OnInit, ControlValueAccessor {
    public all: any;   // 所有数据信息
    public provinces: Array<object>;                    // 存储省的信息
    public citys: Array<object>;                       // 存储城市的信息
    public areas: Array<object>;                         // 存储地区的信息
    public selectedList: any = null;
    public selectedProvince: any;
    public selectedCity: any;
    public selectedCountry: any;
    @Input() selectedArea: any;
    @Input() kind: any;
    @Output() selectedAreaChange: EventEmitter<any[]> = new EventEmitter();
    disabled: boolean;
    onChange: (value: string) => void = () => null;
    onTouched: () => void = () => null;

    constructor(private dataService: ThreeLinkAreaService) {
        this.selectedList = [];
    }

    provinceChange(value: string): void {
        this.setCity(value);
        this.selectedList[0] = this.selectedProvince;
        this.onChange(this.selectedList);
        this.selectedCity = null;
        this.selectedCountry = null;
    }

    cityChange(value: string) {
        this.setArea(value);
        this.selectedList[1] = this.selectedCity;
        this.onChange(this.selectedList);
        this.selectedCountry = null;
    }

    areasChange(value: string) {
        this.selectedList = [this.selectedProvince, this.selectedCity, this.selectedCountry];
        console.info(this.selectedList);
        this.onChange(this.selectedList);
    }

    ngOnInit() {
        this.all = this.dataService.setAll();
        this.provinces = this.setProvinces();
    }

    public onChanges(values: any): void {
        this.onChange(values);
    }

    public loadData(node: any, index: number): PromiseLike<any> {
        return new Promise((resolve) => {
            if (index < 0) {
                node.children = this.provinces;
            } else if (index === 0) {
                node.children = this.setCity(node.value);
            } else {
                node.children = this.setArea(node.value);
            }
            resolve();
        });
    }

    // 设置省
    private setProvinces() {
        if (this.all !== undefined) {
            const result = new Array<object>();
            Object.keys(this.all).forEach(key => {
                if (key.slice(2, 6) === '0000') {
                    result.push({ label: this.all[key], value: key });
                }
            });
            return result;
        }
    }

    // 设置市
    private setCity(province: string) {
        if (this.all !== undefined) {
            const result = new Array<object>();
            Object.keys(this.all).forEach(key => {
                if (!province) {
                    return;
                }
                if (key.slice(0, 2) === province.slice(0, 2) && key !== province && key.slice(4, 6) === '00') {
                    result.push({ label: this.all[key], value: key });
                }
            });
            this.citys = result;
            return result;
        }
    }

    // 设置县
    private setArea(city: string) {
        if (this.all !== undefined) {
            const result = new Array<object>();
            Object.keys(this.all).forEach(key => {
                if (!city) {
                    return;
                }
                if (key.slice(0, 4) === city.slice(0, 4) && key !== city) {
                    result.push({ label: this.all[key], value: key, isLeaf: true });
                }
            });
            this.areas = result;
            return result;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: any): void {
        this.selectedList = value;
        if (this.kind && this.selectedList && this.selectedList.length) {
            this.selectedProvince = this.selectedList[0];
            this.provinceChange(this.selectedList[0]);
            this.selectedCity = this.selectedList[1];
            this.cityChange(this.selectedList[1]);
            this.selectedCountry = this.selectedList[2];
        }

        if (value && value.length === 0) {
            this.selectedProvince = null;
            this.provinceChange('');
        }
        // this.selectedList = [this.selectedProvince, this.selectedCity, this.selectedCountry];
    }
}
