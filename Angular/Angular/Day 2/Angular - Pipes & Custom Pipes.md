Pipes changes the format of the property value.

**Built-In Pipes**
- Currency Pipe
- Date Pipe
- Json Pipe
- LowerCase Pipe
- UpperCase Pipe
- PercentPipe
- SlicePipe
- TitleCasePipe
- AsyncPipe

To use built-in pipes `{{prop | date : 'param1' : 'param2'}}`

You can find params in documentation


## Custom Pipes

`ng g pipe pipeName`

- It's a class, Angular knows that this class is pipe through class decorator `@Pipe`
- This class implements `PipeTransform` interface
- It has to implement `transform` method
- `transform` method takes `value` => input , and parameters you determine 
- `return` returns the output that will be in the page

```TS
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDtoEGP'
})
export class USDtoEGPPipe implements PipeTransform {

  transform(value: number, rate : number = 49): number {
    return value * rate;
  }

}
```


```HTML
<td>{{product.price | USDtoEGP : 13}</td>
```

You can use more than one pipe

```HTML
<td>{{product.price | USDtoEGP : 13 | currency : 'EGP' : 'code'}}</td>
```

