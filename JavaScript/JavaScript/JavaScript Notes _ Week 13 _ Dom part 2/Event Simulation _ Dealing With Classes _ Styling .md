## ==Event Simulation==
 * `.click()`
 *  `.focus()`
 *  `.blur()`
```JS

  let one =  document.getElementsByName("one")[0];
  let two =  document.getElementsByName("two")[0];

  function oneFocus() {
  one.focus();
  }
  function twoFocus() {
  two.focus();
  }

  window.onload = oneFocus();
  one.onblur = function () {
  document.links[0].click();
  };

```
  
* * *
## ==Dealing with classes==
 * classList
 * - length
 * - contains
 * - item(index)
 * - add
 * - remove
 * - toggle
  ```JS
    <div class="show person good">Iam a div</div>
  ```
  ```JS

	  let div = document.querySelector("div");
	  console.log(div.classList);
	  console.log(typeof div.classList);

	  console.log(div.classList.length);

	  console.log(div.classList.contains("show"));
	  console.log(div.classList.contains("one"));

	  console.log(div.classList.item(0));
	  console.log(div.classList.item(1));
	  console.log(div.classList['0']);

	  div.classList.add("one",  "two");

	  div.classList.remove("one", "two", "three");

	  div.onclick = () => {
		div.classList.toggle("toggleClass");
	  }
	  

  ```
  
  
* * *

 ## ==Styling Elements in JS==
 * ### Styling inline
 	 -  `element.style.propertyName = value`
 	 - `element.cssText = csss text`
 
 	 - `element.style.removeProperty(propertName)`
 	 - `element.style.setProperty(propertyName , value , priority)`
 
 * ### Styling in external files
 	 - `documet.styleSheets` => retuens all external style sheets
 	 - `documet.styleSheets[0]` => selects the first stylesheet
 	  - `documet.styleSheets[0].rules` => reutns all rules of the styleshhet
  		 eg. form div input => that's called rule
 	  - `documet.styleSheets[0].rules[0].style.(what you learned above)`
 	   - documet.styleSheets[0].rules[0].style.setProperty("font-weight", "500");
```JS

    let div = document.querySelector("div");

    div.style.color = "yellow";
    div.style.cssText = "font-weight: 500; font-style: italic" // this will overide the above line

    div.style.setProperty("display", "inline-block"); // won't override the above lines ... it just addes a new property
    div.style.removeProperty("color");

```
```JS

    document.styleSheets[0].rules[0].style.setProperty("background-color", "blue");

```
  
  
* * *

 ## ==Adding elements at specific places==
 *  `before()`
 *  `after()`
 *  `append()`
 *  `prepend()`
 *  `insertBefore(element, appendedElement)`
 *  `remove()`
```JS
  
    let div = document.getElementsByTagName("div")[0];
    let newEle = document.createElement("p");
    newEle.textContent = "iam paragraph";
    
    div.before(newEle);
    div.before("before");
    div.after(newEle);
    
    div.prepend(newEle);
    div.prepend(newEle);
    div.prepend("hiiiiiiii", "byeee");
    
	// parent.insertBefore(newEle, lastEle);
    div.insertBefore(newEle, div.children[0]);
    div.appendChild(newEle.cloneNode(true));
    div.appendChild("hiiiiiiiiii", "byeee"); // ERROR

	
    console.log(div.append("ji")); // doesn't return any value => undefined
    console.log(div.appendChild(newEle)); // returns the appended element => newEle

    div.remove();

```

```JS

    1 - .append()      => accepts Node objects and Strings 
    .appendChild() => accepts only Node objects

    2 - .append()      =>  does not have a return value
    .appendChild() =>  returns the appended Node object

    2 - .append()      =>  allows you to add multiple items
    .appendChild() =>  appendChild allows only a single item
    
```
 
 
* * *

 ## ==DOM Traversing==
  - `nextSibling`
  - `nextElementSibling`
  - `previousSibling`
  - `previousElementSibling`
  - `parentElement`
```HTML
  <div class="">
        <!-- comment -->
        <span>first span</span>
        <!-- comment -->
        <span>second span</span>
  </div>

```
 
```JS

    let spans = document.querySelectorAll("div span");

    console.log(spans);

    console.log(spans[0].nextSibling); // #text
    console.log(spans[0].nextElementSibling); // <span></span>
    console.log(spans[1].nextElementSibling); // null

    console.log(spans[0].previousSibling); // #text
    console.log(spans[0].previousElementSibling); // null

    console.log(spans[0].parentElement); // <div></div>


```
 
 ***
  ## ==Cloning==
 * `.cloneNode(true/false)`
 	* false : clones the element without innerHTML content (==attributes => Yes , innerHTML => No==)
	 * true : clones the element with innerHTML (==attributes => Yes , innerHTML => Yes==)
```JS

let myP = document.querySelector("p").cloneNode(true);
let myDiv = document.querySelector("div");

myDiv.appendChild(myP);

``` 
 if you don't clone the element .. it will move the element itself into the Div
```JS

let myP = document.querySelector("p");
let myDiv = document.querySelector("div");

myDiv.appendChild(myP);

``` 

***

 * addEventListener
 * comparisons  
أوجه المقارنة  بين onclick  و  addEventListener
	 *  1) multiple events 
	 *  2) output when : event = not object type 
	 *  3) applying event on element isn't created yet
	 
 ==1) First Comparison== 
```JS

let div = document.querySelector("div");

div.onclick = () => {
  console.log("you clicked on the div FIRST");
}

div.onclick = () => {
  console.log("you clicked on the div SECOND")
}
output:
you clicked on the div SECOND


```
  The second overrides the first
```JS
let div = document.querySelector("div");

div.addEventListener("click", () => {
  console.log("you clicked First");
})

div.addEventListener("click", () => {
  console.log("you clicked Second");
})
output :
you clicked First
you clicked Second


```
  Both of the events works 

  ==2) Second Comparison==
```JS

let div = document.querySelector("div");

div.onclick = ""; // NO Error
div.addEventListener("click", "HAPLA"); // Error

```
  ==3) Third Comparison==
```JS

let div = document.querySelector("div");
div.onclick = function () {
let newP = div.cloneNode(false);
let newTxt = document.createTextNode("Cloned Div");
newP.classList.add("cloned");
newP.appendChild(newTxt);

document.body.appendChild(newP);
}

let clonedDiv = document.querySelector(".cloned");
clonedDiv.onclick = () => {
console.log("you clicked the cloned div");
}; // Error

document.onclick = (event) => {
  if (event.target.className === "cloned") {
    console.log(event.target);
  }
}

document.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") === "cloned") {
    console.log(e.target);
  }
})

```
