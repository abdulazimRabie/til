# Date - Generators - Modules
# <span style="background-color:#fce4ec; color: #000; border-radius: 5px; padding: 4px">Date & Time</span>

- Date constructor
`Date()`
```Js
let date = new Date();
console.log(date); // Sun Jul 23 2023 00:29:44 GMT+0300 (Eastern European Summer Time)
```
- Static method
`now()`
  - It returns number of milliseconds from 1 january,1970 at midnight untill now
  - It's a static method, so we call it using class name not the object
```JS
console.log(Date.now()); // 1690061384032
```
An experiment to asure this number of milliseconds is right
```Js
let milli = Date.now();
let seconds = milli / 1000; // 1000 Milli = 1 Second
let minutes = second / 60;
let hours = minutes / 60;
let days = hours / 24;
let years = days / 365;
console.log(years); // 53.59149492744801 => Right Answer - it's 53 years from 1970 till 2023
```

## Get Date & Time
```JS
let dateNow = new Date();
console.log(dateNow); // Sun Jul 23 2023 03:39:40 GMT+0300 (Eastern European Summer Time)
```

```Js
let birthday = new Date("Sun June 7 2003 7:6:12");
console.log(birthday); // Sun June 7 2003 7:6:12 GMT+0300 (Eastern European Summer Time)
```
>>>  It will ignore "Sun" you have written; because it's not right that  the 6th of june 2003 was Saturday not Sunday

```Js
// Difference between two dates in milliseconds
console.log(dateNow - bithday); // return time in milliseconds
console.log((dateNow - birthday) / 1000 / 60 / 60 / 24 / 365); // 20.139299836282344
```
```JS
// getTime() : Returns the stored time value in milliseconds since midnight, January 1, 1970
console.log(birthday.getTime());
```
```JS
// getFullYear() : Returns the year
console.log(birthday.getFullYear()); // 2003
console.log(dateNow.getFullYear()); // 2023
```
```JS
// getDate() : Returns the day of the months
console.log(birthday.getDate()); // 7
```
```JS
// getDay() : Returns the day of the weak : start from index 0 
console.log(birthday.getDay()); // 6 [sunday , moday , tuesday , wednesday , thursday, friday, saturday]
```
```JS
// getMonth() : Return the index of the month [Jan, Feb, Mar, Abr, May, June, Jul, Aug, Sept, Oct, Nov, Dec]
console.log(birthday.getMonth()); // 6
```

```JS
// getHours()
console.log(birthday.getHours()); // 7
```
```JS
// getMinutes()
console.log(birthday.getMinutes()); // 6
```
```JS
// getSeconds()
console.log(birthday.getSeconds()); // 12
```
```JS
// getMilliseconds()
console.log(birthday.getMilliseconds()); // 0
```

## Set Date & Time
How to manipulate with dates and times
1. date
- `setFullYear(year, month?, date?)`
```Js
let date = new Date();
console.log(date);// Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)


date.setFullYear(1960, 3);
console.log(date); // Sat Apr 23 1960 05:09:59 GMT+0200 (Eastern European Standard Time)
```
- `setMonth(month[index], date?)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setMonth(5);
console.log(date); // Fri Jun 23 2023 05:14:51 GMT+0300 (Eastern European Summer Time)
```
- `setDate(date:day of month)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setDate(31);
console.log(date); // Mon Jul 31 2023 05:40:31 GMT+0300 (Eastern European Summer Time)
```
2. Set Time
- `setHours(hours, minutes?, seconds?, milliseconds?)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setHours(13);
console.log(date); // Sun Jul 23 2023 13:09:59 GMT+0300 (Eastern European Summer Time)
```
- `setSeconds(minutes, secoonds?, milliseconds?)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setMinutes(13);
console.log(date); // Sun Jul 23 2023 05:13:59 GMT+0300 (Eastern European Summer Time)
```
- `setSeconds(seconds, milliseconds?)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setSeconds(30);
console.log(date); // Sun Jul 23 2023 05:13:30 GMT+0300 (Eastern European Summer Time)
```
- `setMilliseconds(milliseconds)`
```JS
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setMilliseconds(1000);
console.log(date); // Sun Jul 23 2023 05:10:00 GMT+0300 (Eastern European Summer Time)
```

- `setTime(number of milliseconds after the timestamp)`
```Js
let date = new Date();
console.log(date); // Sun Jul 23 2023 05:09:59 GMT+0300 (Eastern European Summer Time)

date.setTime(0);
console.log(date); // Thu Jan 1 1970 02:00:00 GMT+0200 (Eastern European Summer Time)
```
## Tracking Operation Time
```Js
let start = new Date();
for(let i = 0; i < 1000; i++) {
  document.write(`<div> ${i+1} </div>`);
}
let end = new Date();
console.log(end-start);
```
- `performance.now()` : evaluates the time from begginig to the current moment
```JS
let pre = performance.now();
for(let i = 0; i < 1000; i++) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(`${i+1001}`));
  document.body.appendChild(div);
}
let aft = performance.now();
console.log(`Duration : ${aft - pre}`);
```
***
# <span style="background-color:#fce4ec; color: #000; border-radius: 5px; padding: 4px">Generators</span>
 * Generator runs its code when required
 * Generator function is an object and iterable
 * generator function returns special object (generator object)
```JS
function* geneFun() {}
```
- `yield` keyword is used to run a block of code, and it's responsible for yielding
```JS
function* geneFun() {
  yield "first";
  yield 2;
  yield true;
}
```
It's mentiond above that generator function is iterable, So we yield the code by `next()` method
```Js
console.log(geneFun().next()); // {value:"first", done:false}
console.log(geneFun().next()); // {value:2, done:false}
console.log(geneFun().next()); // {value:true, done:false}
console.log(geneFun().next()); // {value:undefined, done:true}
```

مثال بسيط يا حبايب قلبى

خد مثال
```JS
let count = 0;
let button = document.createElement("button");
button.appendChild(document.createTextNode("Show More"));
document.body.appendChild(button);

function createItem() {
  let div = document.createElement("div");
  let para = document.createElement("p");
  para.appendChild(document.createTextNode(++count));
  div.appendChild(para);
  button.before(div);
}

function* gene() {
  yield createItem();
}

button.onclick = function() {
  for(let i = 0; i < 10; i++) {
    gene().next();
  }
}
```
خد مثال تانى
```Js
function* geneFun() {
  let count = 0;
  for(let i = 0; i < 5; i++) {
    console.log(++count);
  };
  yield;
}

let g = geneFun();

console.log(g.next());
console.log(g.next());
```
## Deleget Generator

```JS
function* gene1() {
  yield 1;
  yield 2;
  yield 3;
}

function* gene2() {
  yield 'A';
  yield 'B';
  yield 'C';
}

function* geneAll() {
  yield gene1();
  yield gene2();
}

let myGene = geneAll();
```
Here are the results if (*) is not used
```JS
console.log(myGene.next()); // Object { value: Generator, done: false }
console.log(myGene.next()); // Object { value: Generator, done: false }
```
So, we used astryic to yield all items of the generator
```JS
function* geneAll() {
  yield* gene1();
  yield* gene2();
}

let myGene = geneAll();

console.log(myGene.next()); // Object { value: 1, done: false }
console.log(myGene.next()); // Object { value: 2, done: false }
console.log(myGene.next()); // Object { value: 3, done: false }
console.log(myGene.next()); // Object { value: 'A', done: false }
console.log(myGene.next()); // Object { value: 'B', done: false }
console.log(myGene.next()); // Object { value: 'C', done: false }
console.log(myGene.next()); // Object { value: undefined, done: true }
```
another example
```JS
function* gene1() {
  yield [1,2,'R'];
}

console.log(gene1().next()); // Object { value: (3) […], done: false }
```
After using *
```JS
function* gene1() {
  yield* [1,2,'B'];
}

console.log(gene1().next()); // Object { value: 1, done: false }
console.log(gene1().next()); // Object { value: 2, done: false }
console.log(gene1().next()); // Object { value: 'B', done: false }
console.log(gene1().next()); // Object { value: undefined, done: true }
```
`return` : stops function and generator function
```JS
function* gene1() {
  yield "first Yield";
  yield "Second Yield";
  return;
  yield [1,2,'R'];
}

let gene = gene1();

console.log(gene.next()); // Object { value: "first Yield", done: false }
console.log(gene.next()); // Object { value: "Second Yield", done: false }
console.log(gene.next()); // Object { value: undefined, done: true }
```
`.return(msg?)`
```JS
console.log(gene.next()); // Object { value: "first Yield", done: false }
console.log(gene.return("stop now , and return done:true"));;
console.log(gene.next()); // Object { value: "Second Yield", done: false }
console.log(gene.next()); // Object { value: undefined, done: true }
```

## Infinite Generator
ازاى نعمل yield ميخلصش

```Js
function* gene() {
  for(;;)
    yield 1;
}
let myGene = gene();
console.log(myGene.next()); // Object {value: 1, done: false}
console.log(myGene.next()); // Object {value: 1, done: false}
console.log(myGene.next()); // Object {value: 1, done: false}
console.log(myGene.next()); // Object {value: 1, done: false}
```
```JS
function* gene() {
  let count = 0;
  for(;;) {
    yield count++;
  }
  
}

let gen = gene();

console.log(gen.next()); // Object {value: 0, done: false}
console.log(gen.next()); // Object {value: 1, done: false}
console.log(gen.next()); // Object {value: 2, done: false}
console.log(gen.next()); // Object {value: 3, done: false}
console.log(gen.next()); // Object {value: 4, done: false}

console.log("=".repeat(20));

let gen1 = gene();

console.log(gen1.next()); // Object {value: 0, done: false}
console.log(gen1.next()); // Object {value: 1, done: false}
console.log(gen1.next()); // Object {value: 2, done: false}
```
***
# <span style="background-color:#fce4ec; color: #000; border-radius: 5px; padding: 4px">Modules</span>

You have to add `type` attribute and set it to `module`

📁 <span style="color:#ffca28">index.html</span>
```html
<script src="main.js" type="module">
<script src="app.js" type="module">
```

📁 <span style="color:#ffca28">app.js</span>

```Js
export let user = "user";
export let nums = [0,1,2,3];
export function fun() {
  return "function";
}
// or 
export {user, nums, fun}
```

📁 <span style="color:#ffca28">main.js</span>

```JS
import {user, nums, fun} from "./app.js"
console.log(user); // user
console.log(nums); // [0,1,2,3]
console.log(fun()); // "function"
```

using alias
`name as alias `

```JS
import {user as u, nums as n, fun as f} from "./app.js"
```

## Default Export
==A module cannot have multiple default exports.==

`export deafult`
📁 <span style="color:#ffca28">app.js</span>

```Js
export default function myFun() {
  return "iam a function";
}
```

📁 <span style="color:#ffca28">main.js</span>

```Js
import abdu from './app.js'
console.log(abdu()); // "iam a function"
```

Named & Default Export

📁 <span style="color:#ffca28">app.js</span>

```Js
let user = "user";
let num = 44;

export default () {
  return "anonymous function";
}

export {user as u, num as n};
```

📁 <span style="color:#ffca28">main.js</span>

```Js
import myFun, {u, n} from "./app.js"
console.log(u); // user
console.log(n); // 4
console.log(myFun()); // anonymous function
```
`import * as name from '...js'` : imports all

📁 <span style="color:#ffca28">main.js</span>

```Js
import * as myAll from "./app.js"
console.log(myAll); // Object { default: default(), n: 44, u: "user"}
console.log(myAll.default()); // anonumous function
console.log(myAll.n); // 44
console.log(myAll.u); // user
```