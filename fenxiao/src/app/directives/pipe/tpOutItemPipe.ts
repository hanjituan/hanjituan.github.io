import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tpOutItem'
})
export class TpOutItemPipe implements PipeTransform {

    transform(value: any, index: number): any {
        return { ...value, _item: value, _index: index };
    }

}