### Hot and Cold Observable
Hot : emits items as soon as it is created
Cold : waits until an observable subscribes to it before it begins to emit items.

- `from` operator
	creates an observable and take list of values 
`promotionService.ts`
```TS
getSerialAds(): Observable<string> {
    return from(this.adsList)
}	
```

`HomeComponent.ts`
```TS
ngOnInit() {
this.subscription = this.promotionService.getSerialAds().subscribe((data) => {console.log(data)});
}

ngOnDestroy() {
this.subscribtion.unsubscribe();
}
```

- `of` operator
	return an observable , takes multi value as parameters
```TS
getSerialAds(): Observable<string> {
    return of('ads1', 'ads2', 'ads3')
}
```

```TS
ngOnInit() {
this.subscription = this.promotionService.getSerialAds().subscribe((data) => {console.log(data)});
}

ngOnDestroy() {
this.subscribtion.unsubscribe();
}
```

### Using `.pipe()`

Use `.pipe()` method to apply some filters and operator over the list (which will be returned by observable ) before it is emitted
```TS
let someOperations = this.promotionService.getSerialAds().pipe(
  filter(ad => ad.includes("ad1")),
  map(ad => `ads : ${ad}`)
)

this.subscription = someOperations.subscribe(observer)
```


- `retry(numberOfTrys)`
	 if u are dealing with API and u get an error after sending request, before diving into error and handling it , you may retry connecting again to server to avoid if there were an error connection or error coming from the user's Wifi connection.
```TS
let someOperations = this.promotionService.getSerialAds().pipe(
	retry(3)
)

this.subscription = someOperations.subscribe(observer)
```
