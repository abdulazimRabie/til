unsubscribe will be called
	1- Error
	2- Complete
	3- Unsubscribe

```typescript
import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private adsList : string[];
  constructor() { 
    this.adsList = [
      "Big Discounts"
      ,"Sale up to 50%"
      ,"Check our white Friday offers"
      // ,""
      ,"Special white Friday offers up to 70%"
    ]
  }


  getScheduledAds(intervalInSeconds : number) : Observable<string> {
    return new Observable<string> ((observer) => {
      // observer.next()
      // observer.error()
      // observer.complete() 

      let counter=0;

      // async code
      let adsTimer= setInterval(()=>{
        if (counter==this.adsList.length)
        {
          observer.complete();
          clearInterval(adsTimer);
          return;
        }
        if(this.adsList[counter] =="")
        {
          observer.error(["Error: Empty Ad."]); // Will stop Observable
          clearInterval(adsTimer);
          return;
        }

        observer.next(this.adsList[counter]);
        counter++;
      },intervalInSeconds*1000);

      return {
        unsubscribe: () => {
          console.log('unsubscribed !! 😔')
        }
      }

    })

  }

  getSerialAds(): Observable<string> {
    return of('ad1', "ad2");
    return from(this.adsList)
  }
}
```


using this observable in home component 

`homeComponent.ts`
```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreInfo } from '../../ViewModels/store-info';
import { PromotionsService } from '../../services/promotions.service';
import { addAbortSignal } from 'stream';
import { Subscription, filter , map} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  promotionService : PromotionsService;
  storeInfo: StoreInfo;
  isImageShown = true;
  subscription!: Subscription;

  constructor() {
    this.promotionService = new PromotionsService();
    this.storeInfo = new StoreInfo(
      'ITI', 'https://picsum.photos/200/300', ['Cairo', 'Giza', 'Minia ']
    );
  }


  toggleImage() {
    this.isImageShown = !this.isImageShown;
  }



  ngOnInit(): void {
    let adsCount = 1;
    let observer = {
      next: (data : string) => {
        console.log(data)
        adsCount++;
        // if (adsCount == 3)  {
        //   // subscription.unsubscribe();
        // }
      },
      error: (err: string) => {console.log(err)},
      complete:() => {console.log('stream has been completed')}
    }
    
    // subscribtino.unsubscribe();
    // const adsSubscription = this.promotionService.getScheduledAds(5).subscribe(observer);

    // this.subscription = adsSubscription;
    // this.subscription = this.promotionService.getSerialAds().subscribe(observer);
    let someOperations = this.promotionService.getSerialAds().pipe(
      filter(ad => ad.includes("ad1")),
      map(ad => `ads : ${ad}`)
    )

    this.subscription = someOperations.subscribe(observer)
  }

  ngOnDestroy(): void {
    // for (const item of this.subscriptions) {
    //   item.unsubscribe();
    // }
    this.subscription.unsubscribe();
  }
}

```