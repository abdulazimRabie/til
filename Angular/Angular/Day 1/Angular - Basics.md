`ng new projectName` => creates angular project
`ng new projectName --no-standalone` => creates no standalone project

If you want to use bootstrap layouts for responsive design you can import its needed files in `angular.json`

cause we can't type JavaScript in angular apps except in `index.html` we imports them in scripts as well.

```Json
{
	"webapp"{
		"architecture" {
			"build" {
				"styles" : [
					"style.css",
					"bootstrapPath.min.css"
				],
				"scripts" : [
					"bootsrap.bundle.min.js"
				]
			}
		}
	}
}
```

If you want to use bootstrap component , you can't use normal bootstrap component cause it's used JavaScript, so it's better to use (**ng Bootstrap**, **ngx bootstrap**, **Angular Material**)

----
Creating Components
Best structure to build components
```css
src/
└── app/
    ├── components/
    │   ├── header/
    │   │   ├── header.component.ts
    │   │   ├── header.component.html
    │   │   ├── header.component.scss
    │   │   └── header.component.spec.ts
    │   ├── footer/
    │   │   ├── footer.component.ts
    │   │   ├── footer.component.html
    │   │   ├── footer.component.scss
    │   │   └── footer.component.spec.ts
    │   └── ...
    ├── services/
    │   ├── data.service.ts
    │   └── auth.service.ts
    ├── models/
    │   ├── user.model.ts
    │   └── product.model.ts
    ├── app.module.ts
    ├── app.component.ts
    ├── app.component.html
    └── app.component.scss
```

To create classes in angular , use `ng g class className`. it generate class and its unit testing class.

*Practice time*
In Models folder or ViewModels folder, create new model and name it StoreInfo

```TS
export class StoreInfoo() {
	constructor(
		public name:string, public storeImage:string,
		public branches: string[]
	) {}
}
```

Use it in `home.component.ts`

```TS
import { Component } from '@angular/core';
import { StoreInfo } from '../../ViewModels/store-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  storeInfo = new StoreInfo(
    'ITI', 'https://picsum.photos/200/300', ['Cairo', 'Giza', 'Minia ']
  );
}
```

In `home.component.html`, we will use interpolation, property binding, structure directives.
Any structure directives starts with `*ng`

```HTML
<!-- Data Binding - Interpolation -->
<h1>{{storeInfo.name}}</h1>

<!-- Data Binding -  Property binding -->
<!-- Structure Directives -->
<img [src]="storeInfo.storeImage" *ngIf="isImageShown" alt="storeImage">

<!-- Structure Directives --> 
<ul>
    <li *ngFor="let branch of storeInfo.branches">{{branch}}</li>
</ul>

<!-- Event Binding -->
<button (click)="toggleImage()">ToggleImage</button>
```