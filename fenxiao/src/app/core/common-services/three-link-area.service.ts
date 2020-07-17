import { AREA_DATA } from '../../../assets/area';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThreeLinkAreaService {

    constructor() {
    }

    public setAll() {
        return AREA_DATA;
    }
}
