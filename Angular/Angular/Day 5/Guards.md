to create guard service
`ng g g authGuard`

```typescript
import { CanActivateFn } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(UserAuthService);
  const router = inject(Router);
  // return authServ.isLogged;

  if(authServ.isLogged) {
    return true;
  } else {
    alert('you must login first')
    router.navigate(["/Login"]);
    return false;
  }
  // return UserAuthService.isLogged; 
  // you can use isLogged directly if the method is static
};
```


```typescript

{path: "Order", component: OrderMasterComponent, canActivate: [authGuard]},

```

