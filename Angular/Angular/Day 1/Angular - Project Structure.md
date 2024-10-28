**Design Patterns for Angular**
- Singleton
- Factory Method
- Decorator
- Observer
- Dependency Injection

we know that angular consists of modules. Each module contains components.
We use these modules to link (import) them together.

**Extension For Angular**
- Angular Files
- Angular Language Service
- Angular Snippets (version 18)

**Angular Life Cycle**
- Open main.ts file (Angular knows the entry file from `angular.json` where main indicates the entry file)
- main.ts imports some modules and use `bootstrapModule` to start the first module (`AppModule`) which contain app.component
```Typescript
platformBrowserDynamic().bootstrapModule(AppModule, {

ngZoneEventCoalescing: true

})
.catch(err => console.error(err));
```
you will find (`AppModule`) in the app folder. It is `app.module.ts` contains a class named (`AppModule`)

> [!NOTE] Most things in Angular are classes
> Most of things (component - directives - modules) are classes. Angular uses decorator design patterns to mark them whether it is component or modules. It use class decorator.

> [!NOTE] Component must be in a module
> When you create a component, it should be in a module. Angular puts this component in declaration property
>

```ts
@NgModule({

declarations: [
	AppComponent,
],

imports: [
	BrowserModule,
	AppRoutingModule,
],

providers: [
	provideClientHydration()
],

bootstrap: [AppComponent]
})
export class AppModule { }
```

- After calling the component, it calls the controller (`app.component.ts`) then the controller calls the view (HTML & CSS)

----
The component class contains @component decorator function to mark it as a component.
The decorator function contains `templateUrl` , `styelUrl` , `selector`.
`selector`  is a component directive. Directive is like an HTML tag but it's added by Angular.
They called is 'directive' to differ between HTML tag and angular component.

You can replace `templateUrl` with `template`, and it will be better if your component only has one element.
Same thing with `styleUrl` => `styels` 

---
Binding - interpolation
Binding is to use property value in `app.component.html`. Interpolation is  a type of binding.

```TS
@Component({
selector : 'app-comp'
template : '
	<h1> Hi From {{city}} {{1 + 1}}</h1>
'
})
export class AppComp {
	city = 'Minia'
}
```




