## Intro

Nodejs is an environment to run javascript outside the browser.

V8: is an engine developed by google. it is the responsible for converting javascript code to run outside the browser

Now with the ability to run javascript outside the browser. it enables us to build a server side application and enable us to use javascript to manipulate with file system and building network application.

Nodejs pros
	- Single threaded, base on event driven , non blocking , I/O model
	- Perfect for building **fast** and **scalable** data intensive application
	- Javascript  across the entire stack
	- NPM: huge libraries and packages 
	- Community
Nodejs Use
	- API with database behind it (preferably NoSQL)
	- Data streaming (Youtube)
	- Real time chat application
	- Server-side  web application

Don't use Nodejs
	- Building application with high server side processing (CPU intensive) such as image manipulation , video conversion, file compression
	 in this case , it is preferably to use technologies like Rails, PHP , Python

---
## Working with Nodejs

`node` : write JS in terminal
`tab tab` : view the global variable you can use. such as `fs`, `os` , `https` and so on.
`ctrl + D` : exit
`.exit` : exit 

----
## Modules

Nodejs depends on module concept. Everything is a module. Dealing with file system , http , operating system and anything require module.

module is a collection of function and variable that is used to improve development and reduce time consuming.

```JS
const fs = require("fs")
```

---

## File System

- Read
- Write

To read data from file, use `fs` module. especially `readFileSync` and `readFile` function.

```JS
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `File Content (input.txt) : ${textIn}.\nCreated at ${new Date()}`;
fs.writeFileSync("./txt/output.txt", textOut);
```

----

## Sync and Async
sync = blocking
async = non-blocking

sync operation blocks all execution after it till it ends. so it sometimes is non preferably.
using async operation makes the code more efficient and faster.

```JS
fs.readFile("./txt/input.txt", "utf-8", (error , data) => {
    if (error) {}
    else {
        console.log(data);
    }
})
```

Usually we use callback function with async code. But this doesn't mean that callback = async

because of the async is used much in Nodejs, we use callback so much too.

but more of callback may lead to callback hell. we avoid that by using promises or async - await feature.

```JS
fs.readFile("./txt/input.txt", "utf-8", (error , data) => {
    fs.readFile("./txt/append.txt", "utf-8", (error, data) => {
        fs.ureadFile("./txt/final.txt", "utf-8", (error, data) => {

        })
    })
})
```

Example of callback hell and real life use => 
Reading file content which is
the name of the another file. We use the content of the second file and append it to final file.

```JS
// we get the file name from `start.txt`
// and get the content from the `read-this.txt` (value of the start.txt)
// and get the `append.txt` content
// then append all content in `final.txt`

fs.readFile("./txt/start.txt", "utf-8", (error , fileName) => {
    if (error) return console.log("Error!!");
    fs.readFile(`./txt/${fileName}.txt`, "utf-8", (error, data) => {
        fs.readFile("./txt/append.txt", "utf-8", (error, appendData) => {
            const content = `${data}\n${appendData}`;
            fs.writeFile("./txt/final.txt", content, (error) => {
                console.log("Content has been written");
            })
        })
    })
})
```

Previous code is not readable and ugly. We can solve it using async / await feature.

## Creating a server
To create a server, we will use `http` module. This enables us to deal with the network (request and response)

Steps of initiating a server 
1- Create a server
2- Listen to this server

```JS
const http = require(http);
// 1- create a server
const server = http.createServer((req, res) => {
	res.end("Congratulations ! your first server has been created");
})

// 2- listen to it
server.listen(8000, "localhost", () => {
	console.log("Server is runnig on localhost:8000");
})
```

We listened to the server on localhost (127.0.0.1) on port 8000.

## Routing
Routing is a hard thing to manage from scratch. So we user Express to manage it easily.
But now we'll learn how to manage routes using Nodejs.

Using `req.url`  provide us the URL of the opened path in the browser.Using this info enables use to specify what we send back as a response.

```Js
const server = http.createServer((req, res) => {
  const pathFile = req.url;
  if (pathFile == "/" || pathFile == "/overview") {
    return res.end("<h1>Welcome to the overview page</h1>");
  } else if (pathFile === "/products") {
    return res.end("<h1>Welcome to the products page</h1>");
  }

  res.end("<h1>404 Not Found</h1>");
});

server.listen(8000, "localhost", () => {
  console.log("Server is running");
});
```

## Building A Very Simple API

First let us mention what is the difference from "./" and "${__dirname}"
 
> [!Warning] Dot (.) and dirname
> In Node.js, when reading files using `fs.readFile`, there is an important distinction between using `./` (relative path) and `${__dirname}` (absolute path) when specifying file paths.

##### 1. **Using `./` (Relative Path)**
When you use `./` in a file path (like `fs.readFile("./palplapla")`), it specifies a path relative to the **current working directory** where the script is executed. This means the relative path depends on where you run the Node.js process, not where the script itself is located.

For example, if you run your Node.js script from different directories:
- Running the script from `/home/user/project/`, `./palplapla` will refer to `/home/user/project/palplapla`.
- Running it from `/home/user/`, it will look for `/home/user/palplapla`, which may not exist.

This can cause errors if the working directory is different from where the file is located.

##### 2. **Using `${__dirname}` (Absolute Path)**
`__dirname` is a special global variable in Node.js that gives the **absolute path to the directory** where the current script file is located. By using `${__dirname}`, you're ensuring that the file path is always resolved based on the location of the script itself, not the working directory where the Node.js process was started.

Example using `${__dirname}`:

```js
fs.readFile(`${__dirname}/palplapla`, (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```

In this case, regardless of where you run your script from, it will always resolve to the correct path based on the script's location.

### Key Differences
- **`./`**: Relative to the current working directory (the directory from which you execute the script).
- **`${__dirname}`**: Absolute path to the directory where the script is located, making it more reliable when dealing with file paths inside your project structure.

##### When to Use
- Use `./` for simple, small scripts where you always control the working directory.
- Use `${__dirname}` in larger applications or modules to ensure file paths are correctly resolved regardless of where the script is run from.

##### Example of this video
- Manage new route such as `/api`
- Read file from data-dev/data.json
- Send it back as a response

```JS
const server = http.crateServer((req, res) => {
	const pathName = req.url;
	if (pathName === "./api") {
		fs.readFile(`${__direname}/data-dev/data.json`, 'utf-8', (err, data) => {
			if (err)
				return console.log("Error happened !!")
			
			res.writeHead(200, {
				"Content-type" : "application/json"
			})
			res.end(data);
		})
	}
})
```


Is It good to read the file each time the client navigate the route (URL). Absolutely Not.
So reading the file one time while starting the program is much better than reading it each time the client request this URL.

```JS
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productsData = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === "/api") {
		res.writeHead(200, {
			"Content-type" : "application/json"
		})
		res.end(data);
	}
})
```

We used `readFielSync` instead of `readFile` cause it doesn't matter in this case which one to use. Both will accomplish the task so we prefer to use which more clear and easy to write.

## HTML Template - Building The Templates
`template-product.html`
```HTML
<div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <figure class="product">
        <div class="product__organic {%NOT_ORGANIC%}"><h5>Organic</h5></div>
        <a href="#" class="product__back">
          <span class="emoji-left">👈</span>Back
        </a>
        <div class="product__hero">
          <span class="product__emoji product__emoji--1">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--2">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--3">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--4">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--5">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--6">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--7">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--8">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--9">{%IMAGE%}</span>
        </div>
        <h2 class="product__name">{%PRODUCT_NAME%}</h2>
        <div class="product__details">
          <p><span class="emoji-left">🌍</span> From {%FROM%}</p>
          <p><span class="emoji-left">❤️</span>{%NUTRIENTS%}</p>
          <p><span class="emoji-left">📦</span>{%QUANTITY%} {%IMAGE%}</p>
          <p><span class="emoji-left">🏷</span>{%PRICE%}€</p>
        </div>
  
        <a href="#" class="product__link">
          <span class="emoji-left">🛒</span>
          <span>Add to shopping card ({%PRICE%}€)</span>
        </a>
  
        <p class="product__description">
          {%DESCRIBTION%}
        </p>
      </figure>
      
    </div>
```

`template-overview.html`
```HTML
<div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <div class="cards-container">
        {%PRODUCTS_CARDS%}
      </div>
    </div>
```

`template-card.html`
```HTML
<figure class="card">
    <div class="card__emoji">{%IMAGE%}{%IMAGE%}</div>

    <div class="card__title-box">
      <h2 class="card__title">{%PRODUCT_NAME%}</h2>
    </div>

    <div class="card__details">
      <div class="card__detail-box {%NOT_ORGANIC%}">
        <h6 class="card__detail card__detail--organic">Organic!</h6>
      </div>

      <div class="card__detail-box">
        <h6 class="card__detail">{%QUANTITY%} {%IMAGE%} per 📦</h6>
      </div>

      <div class="card__detail-box">
        <h6 class="card__detail card__detail--price">{%PRICE%}€</h6>
      </div>
    </div>

    <a class="card__link" href="/product?id={%ID%}">
      <span>Detail <i class="emoji-right">👉</i></span>
    </a>
</figure>
```

We will replace all the placeholders with accurate values later. But, we are building the templates at this moment.
## HTML Template - Filling The Templates
In this section
- you will read all templates you have edited.
- create card HTML by function called `structCard(product, template) : string`
- join all returned cards and replace `{%PRODUCTS_CARDS%}`
- return this as a response

```JS
const tempOverview = fs.readFileSync(`${__dirname}/templates/tamplate-overview.html`, `utf-8`);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, `utf-8`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, `utf-8`);

const structCard = (product, template) => {
  console.log("================================== PRODUCT");
  console.log(product);
  let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%DESCRIBTION%}/g, product.description);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
}
```

This is the server : 
```JS
let server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName == "/" || pathName == "/overview") {
		res.writeHead(200, {
			"Content-Type" : "text/html" // you must return it as text/html
		})
		// loop on ProductData
		// change the overView template by replacing each item
		let filledCards = 
		productsData.map(product => structCard(product, tempCard));
		
		let newOverView = 
		tempOverview.replace("{%PRODUCTS_CARDS%}", filledCards.join(""));
		
		return res.end(`${newOverView}`);
	}
})
```

> [!NOTE] Download File When Access A Path
> Controlling the header you send with response, makes the browser understand this file will be downloaded and it will start download the file immediately
> ```JS
> if (urlPath == "/downloadFile") {
> 	res.writeHead(200, {
> 		"Content-Type" : "text/html",
> 		 "Content-Disposition": "attachment: filename=template-overview.html"
> 	})
> 	
> 	res.end(tempOverview);
> }

## Parsing Variables From URLs
To parse query from the URL path, you have to require `url`
`const url = require("url")`

- use `parse` function to parse the URL
- destructure parsing value to `{query, pathname}`

if URL :  `/product?id=10`
then -> path name = product -> query = {id : 10}

this how it looks like what parse function return :
``` JSON
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: [Object: null prototype] {id : '10'},
  pathname: '/favicon.ico',
  path: '/favicon.ico',
  href: '/favicon.ico'
}
```

Leverage this function and module to handle `/product?id=0` path :
```JS
let server = createServer((req, res) => {
	const {query, pathname : pathName} = url.parse(req.url);
		if (pathName == "/product") {
		try {
	      const productID = query.id;
	      const product = productsData.filter(product => product.id == productID);
	      console.log(product[0]);
	      const productPage = structHTML(product[0], tempProduct);
	
	      res.writeHead(200, {
	        "Content-Type" : "text/html"
	      })
	
	      return res.end(productPage);
	
	    } catch (error) {
	      return res.end("<h1>There is no product with this id</h1>");
	    }
	}
})
```

## Using Modules 2 Our Own Modules

Use modules for more efficient and readable code. So create module `replaceTemplate.js` and export `structHTML` function then use it from `index.js`

```JS
module.exports = (product, template) => {}
```

```JS
const structHTML = require("./modules/replaceTemplate.js");
```

## Introduction To NPM and The package.json
`npm init` creates `package.json` 

## Types Of Packages And Installs
- `npm install slugify`  : dependency
- `npm install nodemon --save-dev` : development dependency
- `npm i nodemon --global` : install dependency over the application
- `npm run start` : run the script `start`

## Using Modules 3 3rd Party Modules
Nothing is important. Just require any module and start using it by following the documentation.
## Package Versioning And Updating

**Versioning**
version : `1.3.4`

1 -> major version
3 -> minor version
4 -> patch version

major -> big releases
minor -> new features
patch -> fixes of bugs

Symbols
`^1.2.3` : ^ -> wanted is latest minor & patch versions
`~1.2.3` : ~ -> wanted is latest patch versions only
`*1.2.3` : * -> wanted is updated of all versions (**==BAD PRACTICE**==)

Commands
`npm i slugify@1.2.3` -> install specific version
`npm outdated` -> list all outdated dependencies in a table
`npm update slugify` -> update dependency based on its wanted version from the table
`npm install` -> install all dependencies of the `package.json` and create node_modules folder
`npm uninstall express`

## Setting Up Prettier In VS Code
## Recap What's Next



