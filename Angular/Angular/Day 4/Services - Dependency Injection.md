Dependency injection comes to solve coupling code. This means the each class depends on another class.

There is three types of dependency injection 
	- constructor injection
	- property injection
	- method injection

So, dependency injection is to create object of class while creating you main class. This helps to decouple the code.

All services in angular is dependency injection.

`ng g service productList`

```TS
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root' // means that this services is shared within all project
  
})
export class ProductListService {
  private productList : IProduct[];
  constructor() { 
    this.productList = [
      {id: 100, name: 'HP Laptop', price:30000.58 , quantity: 2, imgUrl:'https://fakeimg.pl/250x100/', categoryId:1},
      {id: 200, name: 'Lenovo Laptop', price:700 , quantity: 0, imgUrl:'https://fakeimg.pl/250x100/', categoryId:1},
      {id: 300, name: 'Ipad 6', price:500 , quantity: 4, imgUrl:'https://fakeimg.pl/250x100/', categoryId:2},
      {id: 400, name: 'Samsung Tab6', price:200 , quantity: 1, imgUrl:'https://fakeimg.pl/250x100/', categoryId:2},
      {id: 400, name: 'Oppo Mobile', price:120 , quantity: 10, imgUrl:'https://fakeimg.pl/250x100/', categoryId:3},
      {id: 400, name: 'Samsung S22', price:400 , quantity: 13, imgUrl:'https://fakeimg.pl/250x100/', categoryId:3},
    ]
  }

  getAllProducts(): IProduct[] {
    return this.productList;
  }

  getProdcutsByCatID(cID: number) : IProduct[] {
    if (cID == 0) return this.productList;
    return this.productList.filter(prodcut => prodcut.categoryId == cID);
  }

  getProductByID(pID: number) : IProduct | undefined {
    return this.productList.find(prodcut => prodcut.id === pID);
  }
}

```

```TS
import { Component, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../Models/iproduct';
import { Input, Output } from '@angular/core';
import { ICart } from '../../../ViewModels/icart';
import { ProductListService } from '../../../services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges {
  products: IProduct[];
  productsOfCat: IProduct[];

  totalPrice = 0;

  @Input() selectedCategory:number = 0;
  @Output() itemBought: EventEmitter<ICart>;

  classExpression = "table-danger text-primary"
  classExpression1 = "table-border"
  classExpression2 = ["table-danger", "text-primary"]
  isEmpty = true;

  orderDate: Date;

  // u know that, we don't create object from this classs by our hands
  // angular do it instead
  // when angular finds paramater in the constructor and its type is service
  // it calls the type of this servies immediately and create an object from this service
  // making it private, in TypeScript, this creates a property (it's shortcut)
  // also, it's a best pracitce to make it private

  constructor(private productListSer: ProductListService) {
    this.itemBought = new EventEmitter<ICart>();

    // this.products = [
    //   {id: 100, name: 'HP Laptop', price:30000.58 , quantity: 2, imgUrl:'https://fakeimg.pl/250x100/', categoryId:1},
    //   {id: 200, name: 'Lenovo Laptop', price:700 , quantity: 0, imgUrl:'https://fakeimg.pl/250x100/', categoryId:1},
    //   {id: 300, name: 'Ipad 6', price:500 , quantity: 4, imgUrl:'https://fakeimg.pl/250x100/', categoryId:2},
    //   {id: 400, name: 'Samsung Tab6', price:200 , quantity: 1, imgUrl:'https://fakeimg.pl/250x100/', categoryId:2},
    //   {id: 400, name: 'Oppo Mobile', price:120 , quantity: 10, imgUrl:'https://fakeimg.pl/250x100/', categoryId:3},
    //   {id: 400, name: 'Samsung S22', price:400 , quantity: 13, imgUrl:'https://fakeimg.pl/250x100/', categoryId:3},
    // ]

    // let's use services
    this.products = productListSer.getAllProducts();

    this.productsOfCat = this.products;

    this.orderDate = new Date();
  }

  buy(product: IProduct, count: string) {
    // casting item count; cuase its value is string

    // let itemsCount : number = Number(count);
    // let itemsCount : number = parseInt(count);
    // let itemsCount : number = count;
    console.log("buy")
    // let itemsCount: number = +count;
    // this.totalPrice += productPrice * itemsCount;

    // create object of ICart and send it to the subscriber
    const cartProduct: ICart = {
      prodcutNmae: product.name,
      productPrice: product.price,
      productCount: +count
    }

    this.itemBought.emit(cartProduct);
  }

  updateSelectedCategory(catId: number) {
    this.selectedCategory = catId;
    // this.showSelectedCategory(catId);
  }

  private filterProduct():void {
    // if (this.selectedCategory == 0) {
    //   this.productsOfCat = this.products;
    //   return;
    // }
    // this.productsOfCat = this.products.filter(prod => prod.categoryId == this.selectedCategory);
  }
    
  ngOnChanges(): void {
    // this.filterProduct();
    console.log(this.selectedCategory, typeof this.selectedCategory);
    this.productsOfCat = this.productListSer.getProdcutsByCatID(this.selectedCategory);
  }

  removeItemFromProduct() {
    console.log('i\'ve removed item from product list')
  }
}

```

- We used constructor injection to create instance from this service
- Angular check types of parameters of the constructor and if it finds types of service, it creates object by default
- Making the service `private` is a best practice 
- We used services to apply and implement the logic of the component (that's way we sue services)
- `this.products = this.productListService.getAllProducts()` we used method `getAllProducts` from the services to get products
- We used also `this.productListService.getProductsByCatID(cID)` to apply filter logic and set the value to `this.prodcutsOfCat`
