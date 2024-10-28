To extract parameters values from the URL path, use `ActivatedRoute` service.

```TS
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../../../services/product-list.service';
import { IProduct } from '../../../Models/iproduct';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  prodcutID: number = 0;
  product : IProduct = {} as IProduct;
  constructor(
    private activatedRouter : ActivatedRoute,
    private productListServ : ProductListService,
    private location : Location

  ) {}

  ngOnInit() {
    this.prodcutID = Number(this.activatedRouter.snapshot.paramMap.get('pid'));
    const productFromServices = this.productListServ.getProductByID(this.prodcutID);
    if (productFromServices) this.product = productFromServices;
  }


  goBack() {
    this.location.back();
  }
}
```

To navigate through the history, use `Location` service from `angular/common`

`Number(null)` = 0 , so it's better than using `+` operator

When we use `this.activatedRouter.snapshot.paramMap` this means that angular takes snapshot from this component.

So this means if you changed the parameter in the URL path, it won't reflect on the page.

Instead use `this.activatedRouter.paramMap` which returns **observable**. 

After using Observable , you can subscribe and watch any change happens to this path


> [!NOTE] Angular Insights 
> When navigate to same component, ANGULAR  WILL NOT reload component even if there's chanes in the route parameters.
