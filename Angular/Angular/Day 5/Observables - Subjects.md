Subjects can acts as observer and observable at the same time.
So, you can subscribe to the subject and do `next`, `complete` together.

In this lecture , we opposed to `BehaviorSubject` which emits initial value and any observer subscribe to this observable , it will be notified with the new value

for example if we have common behavior between two component and each of them interact depends on this thins. the best solution is to make subject in a services, and both two component inject this service and subscribe to returned observable.

`userAuthService.ts`
```TS
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private userStatus: BehaviorSubject<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isLoggedIn = this.isLogged;
    this.userStatus = new BehaviorSubject<boolean>(isLoggedIn);
  }

  login(userName: string, password: string) {
    if (isPlatformBrowser(this.platformId)) {
      let token = '12345';
      localStorage.setItem('token', token);
      this.userStatus.next(true);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.userStatus.next(false);
    }
  }

  get isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') ? true : false;
    }
    return false;
  }

  get getUserState(): Observable<boolean> {
    return this.userStatus.asObservable();
  }
}

```

`loginComponent`
```TS
import { Component, OnInit, Output } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  // data = localStorage;

  constructor(private userAuth: UserAuthService) {}
  
  ngOnInit() {
    this.userAuth.getUserState.subscribe(data => this.isLogged = data);
  }

  login() {
    this.userAuth.login('usernamae', 'password');
    // this.isLogged = this.userAuth.isLogged;
  }

  logout() {
    this.userAuth.logout();
    // this.isLogged = this.userAuth.isLogged;
  }
  
}
```

`headerComponent.ts`
```TS
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isLogged = false;

  constructor(private userAuth : UserAuthService) {
    this.isLogged = userAuth.isLogged;
  }

  ngOnInit() {
    // this.isLogged = this.userAuth.isLogged;
    this.userAuth.getUserState.subscribe(status => this.isLogged = status);

  }

}
```
``

