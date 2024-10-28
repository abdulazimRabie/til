# ==BOM {Browser Object Model}==

- `alert (message) : returns not thing ... only message tp read`
- `confirm (message) : returns true or false based on your choice`
- `prompt(message, default value) : returns what you've written`

```
  alert("welcome to the page");
  console.log("hellow");
```

```
  let answer = confirm("you want to close ?");
  console.log(answer); true / false
```

```
  let result = prompt("write an age", "eg. 20");
  console.log(result);
```

* * *

## ==setTimeout & clearTimeout==

- `setTimeout(func, time in ms, arguments of func)`
- `clearTimeout(handler)`

```
  window.setTimeout(function () {
    document.querySelector(".pop-up").classList.add("appear");
  },1000);
```

```
  function sayHi(name) {
    console.log(`hi ${name}`);
  }
  setTimeout(sayHi("abdu"), 3030); // function will be triggerd & setTimeout won't work
  setTimeout(sayHi, 3000, "abdu") // gonna work correctly
```

```
  let identifier = setTimeout(() => {
    console.log("say hi");
  },2000);

  document.querySelector("button").onclick = () => {
    clearTimeout(identifier);
  }
```

* * *

## ==setInterval & clearInterval==

- `setInterval(func, time duration in ms, arguments)`
- `clearInterval(handler)`

```
  let div = document.querySelector(".counter");

  function countDown() {
    div.textContent -= 1;
    if (div.textContent === "0") clearInterval(iderntifier);
  };

  let iderntifier = setInterval(countDown, 1000);
```

* * *

## ==window.location==

- - `location.href` (NOTE: doesn't remove from broweser history)
    - `location.host`
    - `location.hostname`
    - `location.hash`
    - `location.protocol`
    - `location.reload()`
    - `location.replace(link)`
    - `location.assign(link)`

```
    console.log(window.location);
    console.log(location);
```

```
    console.log(location.href);
    location.href = "https://google.com";
```

```
    console.log(location.host); // hostname:port number | eg. 127.0.0.1:5500
    console.log(location.hostname); // hostname | eg. 127.0.0.1
```

```
    console.log(location.hash) // hash of section like mdn website has alot of hashes
```

```
    console.log(location.protocol);
    location.protocol = "https";
```

```
    location.reload();
```

```
    location.replace("https://google.com"); // NOTE: this removes the current page from the session history of the browser
```

```
    location.assign("https://openai.com"); // navigates to the given URL
```

* * *

- `window.close()` : closes only windows opend by JS
- `window.open(string: URL[opt],string: target/name of window[opt],string: features[opt],boolean: history session[opt])`

```
  setTimeout(function () {
    window.open("https://google.com", "_blank", "width=400,height=600,top=300");
  }, 1000);
```

* * *

## ==History API==

- `history`
- `history.back()`
- `history.forward()`
- `history.go(Delat)` : position in history
- `history.pushState(data, title, url)` : addes additional string word or path (based on what you want to do) to the current url
    ==WITHOUT RELOADING the page== : think about it while bulding single page application
- `popStateEvent` : only works when user navigates between history stack NOT reloading new page
- `history.replaceState(data, name/title , url)` : exactly like pushState but DOESN'T SAVE ENTRIES of the current page in the history stack session

```
  console.log(history);
  console.log(history.length);
```

```
  history.back();
  history.forward();
  history.forward();
```

```
  history.go(-1); // back step 1
  history.go(-2); // back step 2
```

```
  history.go(1); // forward step 2
  history.go(2); // forward step 2
```

```
  window.addEventListener("popstate", e => {
  console.log(e);
  });
```

```
  history.pushState(null, null, "about");

  function onload() {
    document.body.append("iam 'about' content page");
  }
```

```
  history.replaceState(null, null, "setting");
```

* * *

- `window.stop()` : stops loading
- `window.print()`
- `window.focus()`
- `window.scrollTo(x,y)`
- `window.scroll(x,y)` : scroll & scrollTo are the same without any differences
- `window.scrollBy(x,y)`
- `window.scrollX` == `window.pageXOffset`
- `window.scrollY` == `window.pageYOffset`

```
  window.scrollTo(100,100);
  window.scroll(100,100);
```

```
  window.scrollTo({
    top: 1000,
    left: 1000,
    behavior: "smooth"
  });
```

```
  window.scrollBy(100,100);
  window.scrollBy({
    left: 100, 
    top:100, 
    behavior: "smooth"});
```

* * *

## ==Local Storage==

- `setItme(key, value)`
- `getItem(key)`
- `item(index of property)`
- `remove()`
- `clear()`

```
  console.log(window.localStorage);
  console.log(window.localStorage.length);
  console.log(typeof window.localStorage);
```

```
  // Adding
  window.localStorage.setItem("color", "red");
  window.localStorage.fontWeight = "bold";
  window.localStorage["animation-name"] = "shake";
```

```
  // Removing
  window.localStorage.removeItem("animation-name");
  window.localStorage.clear(); // clears all properties
  console.log(window.localStorage.length);
```

```
  // Accessing
  console.log(window.localStorage.getItem("color"));
  console.log(window.localStorage.color);
  console.log(window.localStorage["color"]);
  console.log(window.localStorage.key(0));
  let localStorage = window.localStorage;
  console.log(localStorage.length);
```

* * *

## ==Session Storage==

- `setItme(key, value)`
- `getItem(key)`
- `item(index of property)`
- `remove()`
- `clear()`