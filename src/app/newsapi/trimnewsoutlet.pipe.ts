import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimnewsoutlet',
})
export class TrimnewsoutletPipe implements PipeTransform {
  transform(title: string, outletname: string): unknown {
    return title.replace(` - ${outletname}`, ' ');
  }
}
