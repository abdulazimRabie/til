This topics talks about the how to access html element inside TS file. This could be super easy in vanilla JavaScript. But in MVC application this concept the the opposite of main goal. 

Here we are trying to access viewer from controller. We will have element in HTML and access it in TS file.

```HTML
<div>Element From The Viewer</div>
```

```TS
  ClientElem : ElementRef = new ElementRef(); 
  // we don't use this solution at all because you have to create object and u don't need it , second reason is that the constructur will ask u some arguments and you don't know or have these info
```

```TS
ClientElem : ElementRef = {} as ElementRef;
// we use assertion to assert empty object as ElementRef obj, here it is trying to cast the empty object
  ```
  
```TS
ClientElem? : ElementRef; // Optional , means tha value could be undefined
  ```
  
```TS
ClientElem : ElementRef | undefined; // same soultion as the above one
```
  
```TS
ClientElem! : ElementRef; // Non-null assertino , here you till type checker to stop checking this property
```

The last solution will not annoying you every time to check if the property is not `null`.


For Example

```TS
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-master',
  templateUrl: '
	  <div #viewChildEle>View Child function decorator</div>
	  <app-product-list [selectedCategory]="selectedCategory" (itemBought)="onItemBought($event)"></app-product-list>

  ',
  styleUrl: './order-master.component.css'
})
export class OrderMasterComponent implements AfterViewInit{

  @ViewChild('viewChildEle') ElemFromHtml! : ElementRef;
  @ViewChild(ProductListComponent) proList! : ProductListComponent;


  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.ElemFromHtml.nativeElement)
  }
}

```


Difference between `@Output` and `@ViewChild` is that when i use `@Output` the event emitter always call the function when an change happen.But i use `@ViewChild` at specific action i know when i will use it and i don't need any notifications to call the needed function.
