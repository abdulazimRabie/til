# Promises

```JS
let posts = null;

function allPosts(posts) {
  console.log("All posts is fired !");
  somePosts(posts);
}

function somePosts(posts) {
  console.log("Some posts is fired !");
  console.log(posts.slice(0, 10));;
}

function getPosts() {
  let req = new XMLHttpRequest();
  req.open("get", "https://jsonplaceholder.typicode.com/posts");
  req.onload = function() {
    if (req.status == 200) {
      posts = JSON.parse(req.response);
      function allPosts(posts  = {empty: true}) {
        console.log("All posts is fired !");

        function somePosts(posts  = [{empty: true}]) {
          console.log("Some posts is fired !");
          console.log(posts);
          console.log(posts.slice(0, 10));
        };

        somePosts();
      };

      allPosts();

    } else {
      console.log(new Error("an error happend"));
    }
  };
  req.send();
}

console.log("Welcome to JS");
getPosts(); // asynchronous - non-blocking
console.log("Welcome again to JS");
```

```JS
function getUsers() {
  let promise = new Promise((resolved, rejected) => {
    let req = new XMLHttpRequest();
    req.open("GET", "https://jsonplaceholder.typicode.com/posts");
    req.onload = function() {
      if (req.status == 200) {
        resolved(JSON.parse(req.response));
      } else {
        rejected(new Error("an error"));
      }
    }
    req.send();
  });

  return promise;
};


getUsers().then(
  function(data) {console.log(data)} ,
  function (error) {console.log(error)}
  )
```

```JS
let prom = new Promise(function(resolved, rejected) {
  resolved("result and msg");
  rejected(new Error("my error"));
});

prom.finally(
  () => {console.log("Do it anyway");}
).then(
  (msg) => console.log("It's a " + msg)
).catch(
  (err) => console.log(err)
)
// first Arg => if the promise resolved
// second Arg => if the promise rejected
// if you write one argument , then you don't care about rejection or you won't do anything
```

callback hell

```Js
const hs = [...document.getElementsByTagName("h3")];

setTimeout( 
  function() {
    hs[0].style.visibility = "visible";

    setTimeout(function() {
      hs[1].style.visibility = "visible";

      setTimeout(function() {
        hs[2].style.visibility = "visible";
      }, 1000);

    }, 1000);

  }, 1000);
```

==IS PROMISE ASYNC? NO==
>No, the callback passed into the Promise constructor is executed immediately and synchronously, though it is definitely possible to start an asynchronous task, such as a timeout or writing to a file and wait until that asynchronous task has completed before resolving the promise; in fact that is the primary use-case of promises.

```Js
console.log('a');

let prom = new Promise(function(resolve, reject) {
  console.log('b');
  setTimeout(function() {
    console.log('d');
  }, 0)
});

console.log('c');
```

```
a
b
c
d
```

```JS
const hs = [...document.getElementsByTagName("h3")];

new Promise((resolve) => {

  setTimeout(() => {
    hs[0].style.visibility = "visible";
    console.log("one");
    resolve();
  }, 1000);

})
.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        hs[1].style.visibility = "visible";
        resolve();
      }, 1000);
    })
})
.then(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      hs[2].style.visibility = "visible";
      resolve();
    }, 1000);
  })
})
.then(() => {
  setTimeout(() => {
    hs[3].style.visibility = "visible";
  }, 1000)
})
```

## Examples
```Js
const usersWrapper = document.querySelector(".users");
const postsWrapper = document.querySelector(".posts");

new Promise((resolve) => {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (response.ok) return response.json();
  })
  .then((users) => {
    for(let user of users) {
      let content = `
        <div class="user" data-id=${user.id}>
              <h3 class="name">${user.name}</h3>
              <p class="email">${user.email}</p>
          </div>
      `;
      usersWrapper.insertAdjacentHTML("beforeend", content);
    }
    resolve();
  })
}).then(()=> {
  initUserBtn();
  getPosts(1);
})


function getPosts(userId) {
  postsWrapper.innerHTML = ``;

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((posts) => {
    for (const post of posts) {
      let content = `
      <div class="post">
          <p class="content">
              ${post.body}
          </p>
      </div>
      `;
      postsWrapper.insertAdjacentHTML("beforeend", content);
    }
  })
}

function initUserBtn() {
  let users = document.querySelectorAll(".user");

  users.forEach(user => {
    user.addEventListener("click", (e) => {
      let userId = +e.currentTarget.dataset.id;
      getPosts(userId);
    })
  })
}
```


## Then, Catch, Finally

- `.then()`
```
promise.then(
  (resolveMsg) => {return resolveMsg},
  (rejectMsg) => {return rejectMsg}
)
```

resolove call back function always return the msg and passes it to the next resolve call back function of `then`

for example
```JS
let p = new Promise((resolve, reject) => {
  let flag = true;

  if (flag) {
    resolve("Completed");
  }
  else reject(new Error("Error"))
});

/*chained `.then` pass the value to themselves with any value type of return*/
/*i said "any value type of return"; because if it is not chained and the returned value was (array, objec), they will pass it propably*/
p.then(
  (msg) => {return 4}
).then(
  (num) => {console.log(num);} // 4
)
```

```Js
let p = new Promise((resolve, reject) => {
  let flag = true;

  if (flag) {
    resolve("Completed");
  }
  else reject(new Error("Error"))
});

p.then(
  (msg) => {
    msg = 4;
    return msg;
  }
);

p.then(
  (num) => {console.log(num)} // Completed
)
```

what if the passed value was array or object with separated chain of 'then's

```JS
let p = new Promise((resolve, reject) => {
  let stuff = ["Abdulazim", "Karim", "Osama", "Yahia"];
  resolve(stuff);
});

p.then(
  (resolvedVal) => {
    resolvedVal.push("ahmed")
    return resolvedVal; // if you returned or not, it will be passed
  }
);

p.then(
  (resolvedVal) => {
    console.log(resolvedVal);
  }
);

```

- Catch
`.catch((err) => {do something})`

catch is called only one time with each then, So it can't be chained

```JS
let p = new Promise((resolve, reject) => {
  let stuff = ["Abdulazim", "Karim", "Osama", "Yahia"];
  reject(("ERROR ! Pay Attention"));
});

p.then(
  (resolvedVal) => {
    resolvedVal.push("ahmed")
    return resolvedVal;
  }
).then(
  (resolvedVal) => {
    console.log(resolvedVal);
  }
).catch(
  (err) => {
    err = "new ERROR! AGAIN";
    return err; // won't pass any thing
  }
).catch(
  (err) => {
    console.log(err); // won't work; beacause catch is called onr time
  }
)

p.then(
  (val) => {

  }
).catch(
  (err) => {
    console.log(err); // ERROR ! Pay Attention
  }
)
```

- Finally
`.finally( () => {do something})`

you can do a chain of `.finally()`s but can't depend on themselves (you can't return value).




```Js
.finally(
  () => {
    console.log("finally Ok!"); // finally OK!
    return "Second Finally";
  }
).finally(
  (val) => {
    console.log("Second Finally"); // Second Finally
    console.log(val); // undefined
  }
)
```

## XHR and Promises
```JS
function getData(linkApi) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("get", "https://jsonplaceholder.typicode.com/todos");
    req.send();
    req.onload = function() {
      if (req.status == 200 && req.readyState == 4)
        resolve(JSON.parse(req.response));
      else 
      reject(Error("ERROR! Pay Atention"));
    }
  })
};

getData("https://jsonplaceholder.typicode.com/todos/1")
.then(
  (todos) => {
    todos.length = 10;
    return todos;
  }
).then(
  (_10todos) => {
    for (const todo of _10todos) {
      console.log(`${todo.id} : ${todo.title}`);
    }
  }
).catch((err) => {console.log(err);})
```

## Replace The Above Code in Fetch API

```Js
fetch("https://jsonplaceholder.typicode.com/todos").then(
  (response) => response.json()
).then(
  (todos) => todos.slice(0, 10)
).then(
  (_10todos) => {
    for (const todo of _10todos) {
      console.log(`${todo.id} : ${todo.title}`);
    }
  }
).catch(
  (err) => {console.log(err);}
)
```

OOOh, Awesome.

## All, AllSettled, Race
- all
`Promise.all([array of promise])`
-- all promises should be resolved to fire the `.then((resolve) => {})`
-- if any promise has been rejected, the error will be thrown

```Js
let prom1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("First Promise");
  }, 2000)
});

let prom2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Second Promise");
  }, 1000)
});

let prom3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Third Promise");
  }, 3000)
});

Promise.all([prom1, prom2, prom3]).then(
  (result) => {console.log(result);}
).catch(
  (reason) => {console.log(reason);}
);

// (3) ['First Promise', 'Second Promise', 'Third Promise']
```

```Js
let prom1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("First Promise");
  }, 2000)
});

let prom2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Second Promise");
  }, 1000)
});

let prom3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Third Promise");
  }, 3000)
});

Promise.all([prom1, prom2, prom3]).then(
  (result) => {console.log(result);}
).catch(
  (reason) => {console.log(reason);}
);

// Second Promise
```

- allSettled
`Promise.allSettled()`

Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.

```Js
let prom1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("First Promise");
  }, 2000)
});

let prom2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Second Promise");
  }, 1000)
});

let prom3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Third Promise");
  }, 3000)
});

Promise.allSettled([prom1, prom2, prom3]).then(
  (results) => console.log(results)
)
/*
(3) [{…}, {…}, {…}]
0: {status: 'fulfilled', value: 'First Promise'}
1: {status: 'fulfilled', value: 'Second Promise'}
2: {status: 'rejected', reason: 'Third Promise'}
length: 3
[[Prototype]]: Array(0)
*/
```
- race
`Promise.race([]).then()`
اللى سبق كل النبق

```Js
let prom1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("First Promise");
  }, 2000)
});

let prom2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Second Promise");
  }, 1000)
});

let prom3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Third Promise");
  }, 3000)
});

Promise.race([prom1, prom2, prom3]).then(
  (results) => console.log(results)
)
// Second Promise
```

# Async - Await

```Js
function getData() {
  return new Promise((resolve, reject) => {
    let users = [];
    if (users.length) {
      resolve("Users Found");
    } else {
      reject("Not Found");
    }
  })
}

getData().then(
  (result) => {console.log(result)}
).catch(
  (reason) => {console.log(reason)}
)
```

Let's Make it clean

```Js
function getData() {
  let users = [];
  if (users.length) {
    return Promise.resolve("Users Found");
  } else {
    return Promise.reject("Not Found");
  }
}

getData().then(
  (result) => {console.log(result)}
).catch(
  (reason) => {console.log(reason)}
)
```

Async Makes It Cleaner

```Js
async function getData() {
  let users = [];
  if (users.length) {
    return "Users Found";
  } else {
    return "Not Found";
  }
}

getData().then(
  (result) => {console.log(result)}
).catch(
  (reason) => {console.log(reason)}
)
```

- Async before function, makes it return a promise;
- Async and Await helps us to create asynchronous promise behavior in cleaner flair


## Await
Before Await
```Js
let prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Run Resolve");
    // reject("Stop Resolve");
  }, 2000)
});

function run() {
  console.log("Before Promise");
  // await prom.catch((reason) => {console.log(reason);});
  prom.then((result) => {console.log(result);})
  console.log("After Promise");
}

run();
// Before Promise
// After Promise
// Run Resolve
```

After Await
```Js
let prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Run Resolve");
    // reject("Stop Resolve");
  }, 2000)
});

async function run() {
  console.log("Before Promise");
  // await prom.catch((reason) => {console.log(reason);});
  await prom.then((result) => {console.log(result);})
  console.log("After Promise");
}

run();
// Before Promise
// Run Resolve
// After Promise
```

So...
- Await works only inside async function
- Await delays the the function untill the promise works
- Await is more elegent syntax of getting promise result