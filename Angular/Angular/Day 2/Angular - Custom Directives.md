To create your custom directive : `ng g directive DirectiveName`
Then, you can use it on HTML tags.


```HTML 
<img LightBox src="./path">
```

- Custom Directive is classes , so Angular uses decorator design pattern to mark it as a directive.
- Angular provides use a reference to HTML element by default. So you can use it from constructor to access the element.
- `ElementRef` is a class represents a reference to HTML element
- To access the native element (as if you traverse it using getElementById) , you use property `nativeElement`
- To apply events like hover, you can use function decorator `@HostListener (eventHandler) Fnc() {}`

```TS
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLight]'
})
export class LightDirective {

  constructor(private ele : ElementRef) {
    ele.nativeElement.style.border = "2px solid yellow";
  }

  @HostListener ('mouseover') onMouseOver() {
    // ..
    this.ele.nativeElement.style.padding = "4px";
  }

  @HostListener ('mouseout') onMouseOut() {
    // ...
    this.ele.nativeElement.style.padding = "0px"
  }

}
```

**Arguments in this case**

```HTML
<img LightBox lightColor="red" src="./path">
```

```TS
export class LightDirective {
  @Input() lightColor: string = "yellow";
  @HostListener ('mouseover') onMouseOver() {
	// ..
	this.ele.nativeElement.style.border = `2px solid ${this.lightColor}`
  } 
}
```

The name you used as argument must be the same name in the class.
You can use alias also. Alias is used only for one property.

```HTML
<img appLight="red" [src]="product.imgUrl" [alt]="product.name">
```

```TS
@Input("appLight") lightColor: string = "yellow";
```

In this case you use the name of directive as an alias for this property (`lightColor`)


