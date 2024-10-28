## Ways to select an element or group of elements from HTML 

```JavaScript

  let elementById = document.getElementById("username");

  let elementsByTageName =  document.getElementsByTagName("p");

  let elementsByClass = document.getElementsByClassName("span")

  let elementQuerySelector = document.querySelector("\[name=\\"button\\"\]");

  let elementQuerySelectorAll = document.querySelectorAll(".span");

  console.log(elementById);

  console.log(elementsByTageName\[1\]);

  console.log(elementsByClass);

  console.info("#".repeat(20));

  console.log(elementQuerySelector);

  console.log(elementQuerySelectorAll);

  console.log(document.title)

  console.log(document.forms\[1\].username); 
// it's a value of an attribute for this input .. you can use it for selecting and specifying the element

  console.log(document.forms\[1\].value);

  console.log(document.images);

  console.log(document.links);

  console.log(document.body);


```

* * *
## innerHTML & textContent
 * `object.innerHTML`
 * `object.textContent`
 
 ```
  
  console.log(document.querySelector(".p1").innerHTML);
    console.log(document.querySelector(".p1").textContent);

    document.querySelector(".p1").innerHTML = "paragraph <span>p1</span>"
    console.log(document.querySelector(".p1").textContent);
	
```
  * manipulation with attributes
  `Object.attributeName`
  `Object.getAttribute("attributeName")`
  `Object.setAttribute("attrName", "value")`
  
  ```
  
    let links = document.links;
    
    links[0].title = "facebook";
    links[0].className = "facebook";
    links[0].id = "fb";
    
    console.info(links[1].getAttribute("href"));
    links[1].setAttribute("href", "https://twitter.com");
    links[1].setAttribute("class", "twitter");
	
```

* * *
## Attributes of elements
 * `attributes`
 * `**hasAttribute(name)**`
 * `hasAttributes()`
 * `removeAttribute()`
 ```
 
	 let myDiv = document.querySelector("div")
	 let myP = document.querySelector("p")

	  console.log(myDiv.attributes);
	  console.log(Object.keys(myDiv.attributes));
	  // returns all attibutes of the element as objects
	  // returns nested object
	  console.log(myDiv.attributes.class); // class="div"
	  console.log(myDiv.attributes.class.value); // div


	  console.log(myP.hasAttribute("class"));
	  console.log(myP.hasAttributes());
	  if (myP.hasAttribute("data-src")) {
		myP.removeAttribute("data-src");
	  }
	  
```

* * *
## Create & Append
 * `createElement()`
 * `createAttribute()`
 * `createTextNode()`
 * `createCommner()`
 * `appendChild()`
 
 
```
	
		let div = document.createElement("div");
		let attribute = document.createAttribute("data-custom"); // object
		let text = document.createTextNode("iam a silly text"); // object
		let comment = document.createComment("a commnet"); // object

		// adding attributes to the element .. set it without a value
		div.setAttributeNode(attribute);
		// attribute with value or empty value
		div.setAttribute("class", "myClass");
		div.appendChild(text);
		div.appendChild(comment);

		document.body.appendChild(div);
	
``` 

* * *

 * example for adding product div multiple times in HTML page

  ```

    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    let h3Content = document.createTextNode("Product");
    let pContent = document.createTextNode("decription of product");
    h3.appendChild(h3Content);
    p.appendChild(pContent);

    div.setAttribute("class", "main");
    div.appendChild(h3);
    div.appendChild(p);

    for(let i = 0; i < 100; i++) {
      document.body.appendChild(div.cloneNode(true));
      document.querySelectorAll("div.main h3")[i].textContent += ` ${i}`;
    }


  ```
  
  
* * *
## Manipulation with element children
 * `.children`
 * `.childNodes`
 * `.firstChild`
 * `.lastChild`
 * `.firstElementChild`
 * `.lastElementChild` 
 
    ```

    let div = document.getElementsByTagName("div")[0];

    console.log(div);
    console.log(div.children);
    console.log(div.childNodes);
    console.log(div.hasChildNodes());

    console.log(div.firstChild);
    console.log(div.firstElementChild);

    console.log(div.lastChild);
    console.log(div.lastElementChild);
    
    ```
	
	***
	## Events 
 * `.onclick`
 * `.oncontextmenue`
 * `.onmouseenter` => triggers when mouse enter the element only
 * `.onmouseover` => triggers when mouse over the element ot its childs
 * `.onmousemove` => triggers when mousr move each pixel in the page
 * `. onmouseleave`

 * `onload`
 * `onscroll`
 * `onresize`
 
 
 * `onfocus`
 * ` onblur`
 * `onsubmit`

***

  ## Form Validation
 * additional note => ==event is an object== 
 * so ...  when we type object.onclick = function (event) { event.preventDefault() }
 	- event -> object of click
 	- ==event.preventDefault()== -> preventing event from doing its normal behavior

```

    document.forms[0].onsubmit = function (e) {
      let usernameValidation = false;
      let ageValidation = false;

      let usernameField = document.querySelector("input[name='username']");
      let ageField = document.querySelector("input[name='age']");

      console.log(e);

      if (usernameField.value !== "" && usernameField.value.length < 10) {
        usernameValidation = true;
      }

      if (!isNaN(Number(ageField.value)) && Number(ageField.value) > 0) {
        ageValidation = true;
      }

      if (usernameValidation && ageValidation) {}
      else {
        e.preventDefault();
        console.log(document.URL)
      }
    }
	
```