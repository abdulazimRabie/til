# OOP
 > OOP
 | Constructor
 | Properties & Methods
 | Static keyword
 | Inheritance
 | Encapsulation
 | Object Meta Deta & Descriptor
 > 
## ==Constructor==
- construcutor is used to instantiate an object 
 
> The first way to create a constructor
``` JS
function User() {}
```
`User` : starts with capital letter , that's for best practice

> Passing parameters to the constructor
```JS
function User(i, us, sla) {
  this.id = i;
  this.username = us;
  this.salary = sal;
}
```
`this` stands to the object will be created from this constructor

The above function is gonna to create an object with properties (id , username, salary)

Lets make an instrance of the class using the constructor
```JS
let userOne = new User(100, "Abd-ulazim", 5000);
```

`new` : is a keyword used to create new object from the class using a constructor

Accessing properties and methods of the object
```js
console.log(userOne); // Object{id:100, username: "Abdu-ulazim", salary: 5000};
console.log(userOne.id); // 100
console.log(userOne.username); // Abd-ulazim
console.log(userOne.salary); // 5000
```

`instanceof`
```JS
console.log(userOne instanceof User); // true
```

> New yntax to create a class and constructors
```js
class User {
  constructor (id, username, salary) {
    this.id = id;
    this.username = username;
    this.salary = salary;
  }
}
```
```JS
let user = new User(921, "yahia", 7000);
console.log(user.id); // 921
console.log(user.username); // yahia
console.log(user.salary); // 7000
```

`user.constructor == class/constructor`
```JS
console.log(userOne.construcor == User); // true
```
> Manipulate with properties and methods
```Js
class User {
  constructor (id, username, salary) {
    this.id = id;
    this.username = username || "Unknown";
    this.salary = salary <= 5000 ? salary + 500: salary;
    this.msg = function() {
      return `hello ${this.username}, Your Salary is ${this.salary}`;
    };
  }

  // methods
  sayMsg() {
    return `hello ${this.username}, Your Salary is ${this.salary}`;
  };

}

let user1 = new User(100, "Abd-Ulazim", 5000);
let user2 = new User(200, "", 6000);

console.log(user1.msg()); // hello Abd-Ulazim, Your Salary is 5500
console.log(user2.msg()); // hello Unknown, Your Salary is 6000
console.log(user1.sayMsg()); // hello Unknown, Your Salary is 6000

console.log(user1.msg) // native code => function msg()
console.log(user1.sayMsg); // native code => function msg()
```

Methods are written after the construcotr and withount function keyword
```JS
sayHi () {return `a simple method`}
```

> Updating Properties / Fields
```JS
class User {
  constructor(username) {
    this.username =  username;
  }
  updateName(newName) {
    this.username = newName;
  }
}

let user1 = new User("Abd-Ulazim");
console.log(user1.username); // Abd-Ulazim
user1.updateName("Rabie");
console.log(user1.username); // Rabie

/*ANOTHER Way*/
user1.username = "Yahia";
console.log(user1.username); // Yahia
```

## ==Built In Constructor==

While creating a string otherwise you used string constructor or not, the string constructor is used to create the string in both ways

```Js
let str1 = "string";
let str2 = new String("string");
console.log(str1); // string
console.log(str2); // String {"string"}
```
> constructor
```JS
console.log(str1.constructor === String); // true
console.log(str2.constructor === String); // true
```
> instanceof
```JS
console.log(str1 instanceof String); // true
console.log(str2 instanceof String); // true
```
> typeof
```JS
console.log(typeof str1); // string
console.log(typeof str2); // object
```
The Same Thing with The Number

## ==Static==
 الاستاتك ده بتاع الكلاس من الاخر .. لو عاوز تستخدمه يبقى عن طريق الكلاس مش عن طريق الاوبجكت

Static keyword is used to refer to that the property or the method belongs to the class not the object which is created from the class

static property : belongs to the class
static method : belonhs to class

**Static properties and methods are created only one time**

Syntax
`static count = 0`
```JS
class User {
  static count = 0;
  
  constructor (id,name) {
    this.id = id;
    this.username = name;
  }
}
```
you can reach the static properties and methods directly without object
```JS
console.log(User.count); // 0
```
```JS
class User {
  static count = 0;

  constructor (id, username) {
    this.id = id;
    this.username = username;
    User.count++;
  }

  // Methods
  static sayHello() {
    return `Hello from static method`;
  }

  static countMembers() {
    return `number of members : ${User.count}`;
  }
}
let us1 = new User(100, "Abdu");
let us2 = new User(100, "Abdu");

console.log(User.count); // 2

let us3 = new User(100, "Abdu");

console.log(User.sayHello()); // Hello from static method
console.log(User.countMembers()); // number of members : 3
```

## ==Inheritance==
```Js
 class Admin extends User {}
```
Inheritance is used to reduce repeated code, and to implement reusability.
- makes your code reusable
- reduce repeating
> Here is a snippet of code which misses reuablity 
```Js
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Admin {
  constructor (id, name, permission) {
    this.id = id;
    this.name = name;
    this.permission = permission;
  }
}

/* KILLNIG REUSABILITY */
```
## ==Super== 
- Stands to the parent class 
- Is used to access properties and methods of the parent class
- Is used to access the constructor of the parent class

```JS
class User {
  count = 1;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Methods
  sayHi() {
    return `Hi ${this.name}`;
  }
}

class Admin extends User {
  constructor(id, name, permission) {
    super(id,name);
    this.permission = permission;
  }

  // Methods
  sayHi() {
    return super.sayHi() + " and very welcome";
  }
}
```
```Js
let admin = new Admin(912, "Abd", 1);
console.log(admin); // {id:912, name:"Abd", permission:1}
console.log(admin.sayHi()); // Hi Abdu and very welcome
```

**==Multiple inheritance is not allowed in JavaScript such as Java and c#==**
```JS
class Admin extends User, Account{} // error
```

## ==Encapsulation==
- Class fields are public by default
- Guards the data against illigal access
- Helps to achieve the target without revealing its complex details 
- Will reduce human errors
- Make the app more flexible and managable
- Simplifies the app

```Js
class Student {
  #budget;
  constructor (id,name,budget) {
    this.id = id;
    this.name = name;
    this.#budget = budget;
  }

  setBudget(budget) {
    this.#budget = budget;
  }
  getBudget() {
    return parseInr(this.#budget) * 0.3;
  }
}

let s = new Student(123, "abdu", "123.31 Eg");
console.log(s.id); // 123
console.log(s.name); // abdu
console.log(s.#budget); // Error 
console.log(s.getBudget()); // 36.9
```
In the above code ... you disappeared the complex details of setting budget value .

Class family only can use private properties and methods directly.

Object can use the property via `getter` and setting values by `setter`

```JS
class User {
  #password;
  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  getPassword() {
    let arrPass = this.#password.split("");
    return arrPass.splice(0,3).fill("*").join("") + arrPass.join("");
  }
}

class Student extends User {
  constructor(name, pass, id, grade) {
    super(name, pass);
    this.id = id;
    this.grade = grade;
  }
  getPassword() {
    return super.getPassword() + " From Student Class";
  }
}

let us1 = new User("abdu", "newPass");
console.log(us1.getPassword()); // ***Pass

let student1 = new Student("Yahia", "Yahia_Bubble_@private", 321, 'A');
console.log(student1); // Object { name: "Yahia", id: 321, grade: "A", #password: "Yahia_Bubble_@private" }
console.log(student1.getPassword()); // ***ia_Bubble_@private From Student Class
```

## ==Object Meta Data & Descriptor==
```Js
const obj = {
  a: 1,
  b: 2
}
```
if i asked you to add a new property 'c' associated with value '3'
```JS
const obj = {
  a: 1,
  b: 2,
  c: 3
}
```

What we will learn is how to add new property and control it using `Object.defineProperty()`

- writable : editable value
```Js
const obj = {
  a: 1,
  b: 2
}
Object.defineProperty(obj, 'c', {
  writable: true,
});

obj.c = 99;
console.log(obj.c); // 99

/*================*/

Object.defineProperty(obj, 'c', {
  writable: false,
});
obj.c = 100; // wont edit value cause writable is false
console.log(obj);
```

- Enumerable
```JS
Object.defineProperty(obj, 'c', {
  enumerable: true
});

for(let prp in obj) {
  console.log(`${prp} ${obj[prp]}`)
}
/**
 * a 1
 * b 2
 * c 3
*/

Object.defineProperty(obj, 'c', {
  enumerable: false
});

for(let prp in obj) {
  console.log(`${prp} ${obj[prp]}`)
}
/**
 * a 1
 * b 2
*/
```

- delete property
```JS
console.log(delete obj.c);
for(let prop in obj) {
  console.log(`${prop}, ${obj[prop]}`);
}
/**
 * true
 * a, 1
 * b, 2
*/ 
```

- Configurable
You Cannot delete property
You Cannot redefine it

==The configurable property tells whether the user has permission to change property descriptor such as to change the value of writable and enumerable settings.==

> delete proprty
```JS
const obj = {
  a: 1,
  b: 2
}

Object.defineProperty(obj, 'c', {
  writable: true,
  enumerable: true,
  configurable: false,
  value: 3,
});

delete obj.c; 

console.log(obj); // {a:1, b:2, c:3}
```
```JS
Object.defineProperty(obj, 'c', {
  writable: true,
  enumerable: true,
  configurable: false,
  value: 3,
});

Object.defineProperty(obj, 'c', {
  writable: true,
  enumerable: false, // you change enumerable value
  configurable: false,
  value: 3,
}); // cann't redefine non-configurable property 'c'

console.log(obj);
```

```JS
Object.defineProperty(obj, 'c', {
  writable: true,
  enumerable: true,
  configurable: false,
  value: 3111111111111,
})
// This Code will work normaly since you didn't redefine the property
```

==Define more than a property==
```JS
Object.defineProperties(obj, {
  c : {
    enumerable: true;
    Rest is false by default
    value undefined by default
  }
})

console.log(Object.getOwnPropertyDescriptor(obj, c));
console.log(Object.getOwnPropertyDescriptors(obj));
```

```JS
const obj = {
  a: 1,
  b: 2
}

Object.defineProperties(obj, {
  c: {
    configurable: true
    /**
     * IF you did not write them => they will be false by default 
     * enumerable: false
     * writable: false
     */
  },
  d: {
    writable: true,
    value: 55
  },
});

console.log(obj);// Object { a: 1, b: 2, c: undefined, d: 55 }

console.log(Object.getOwnPropertyDescriptor(obj, 'c'));
// Object { value: undefined, writable: false, enumerable: false, configurable: true }

console.log(Object.getOwnPropertyDescriptors(obj));

// a: Object { value: 1, writable: true, enumerable: true, configurable: true }
// ​
// b: Object { value: 2, writable: true, enumerable: true, configurable: true }
// ​
// c: Object { writable: false, enumerable: false, configurable: true, value: undefined }
// ​
// d: Object { value: 55, writable: true, enumerable: false, configurable: false }
```