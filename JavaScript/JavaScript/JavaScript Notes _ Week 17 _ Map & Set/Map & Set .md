 ## ==Set Data Type==
 * Syntax : `new Set(iterable)`
 * It's an object to store unique values
 * Cannot access elements by index

  Properties :
  - `size` 

  Methods :
  - `add(value)`
  - `clear()`
  - `delete(value)`
  - `has(value)` : returns true/false
```JS
  let nums = [1,1,1,2,3,5];
  let setNums = new Set([1,1,1,2,3,5]);

  console.log(nums); // [1,1,1,2,3,5]
  console.log(setNums); // set(4) {1,2,3,5}
```
  Size of Set
```JS
  console.log(setNums.size); // 4 : number
```

  Adding method
```JS
  setNums.add(nums[0]).add(nums[1]).add(3).add("A");
  setNums.add(nums);

  console.log(setNums); // set(6) {1,2,3,'A',Array(6)};
```
```JS
  setNums.add(nums[0]).add(nums[1]).add(3).add("A");
  setNums.add(nums);

  console.log(setNums); 
  // set(6) {1,2,3,5,'A',Array(6)};
  /*
  [Entries]
  0: 1
  1: 2
  2: 3
  3: 5
  4: "A"
  5: Array(6)
  */
```
  Clear method
```JS
  console.log(setNums); // Set(4) {1,2,3,5}
  setNums.clear();
  console.log(setNums); // Set (0) {size:0}
```
  Removing method
```JS
  console.log(setNums); // Set(4) {1,2,3,5}
  setNums.delete(1);
  setNums.delete(2);
  console.log(setNums.delete(2)); // true
  console.log(setNums.delete(1000)); // false
  console.log(setNums); // Set(2) {3,5}
```
  Has Method
```JS
  let nums = [1,1,1,2,3,5];
  let obj = {
    name : "Shikabala",
    age : 38,
    jop : "Abo El Gahlawiya"
  }
  let setNums = new Set(nums);

  setNums.add(nums);
  setNums.add(obj);
  setNums.add({
    name : "Shikabala",
    age : 38,
    jop : "Abo El Gahlawiya"
  });

  // Has method

  console.log(nums); // (6) [1,1,1,2,3,5]
  console.log(setNums); // Set(7) {1, 2, 3, 5, Array(6), …}
  console.log(setNums.has(1)); // true
  console.log(setNums.has(nums)); // true
  console.log(setNums.has([1,1,1,2,3,5])); // false
  console.log(setNums.has(obj)); // true
  console.log(setNums.has({
    name : "Shikabala",
    age : 38,
    jop : "Abo El Gahlawiya"
  })); // false
```
```JS
  console.log(nums); // (6) [1,1,1,2,3,5]
  console.log(setNums); // Set(7) {1, 2, 3, 5, Array(6), …}

  console.log(setNums.delete({ name : "Shikabala",
    age : 38,
    jop : "Abo El Gahlawiya"
  })); // false

  console.log(setNums.delete(obj));
```


 ## ==Iterator==
  if you want to loop on elements of set .. How can you do it
  your answer gonna be : use `Object.values(nameOfSet)` which returns the values of any object as array,
  Yes , your are propaply right, but this method will return an enpty array ... that's becuase something called Iterator and Iterable.
```JS
  console.log(Object.values(set)); // []
  console.log(Object.values(iterator)); // []
```
  So that's how i can do iteration on the object
  iterator has a method called `next()`
  `next()` : returns an object with both of properties (value & done)
  `next().value` : indicates to the current value which is its turn to iterate
  `next().done` : indicates if you are out of the object or not
  but ...... this method only works with iterators
  and you can get iterator of a set using `.keys()` or `.values()` they are the same
  these methods returns an object has the `Set` values and also has `next()` methods which enables you to iterate on the items.
```JS
  let set = new Set([1,2,4,1,1,,3]);
  let iterator = set.keys();
  console.log(set); // Set(5) {1, 2, 4, undefined, 0.3}
  console.log(iterator); // SetIterator {1, 2, 4, undefined, 0.3}
```

```JS


  console.log("1 => ", iterator.next()); // 1 =>  {value: 1, done: false}
  console.log("2 => ", iterator.next()); // 2 =>  {value: 2, done: false}
  console.log("3 => ", iterator.next()); // 3 =>  {value: 4, done: false}
  console.log("4 => ", iterator.next()); // 4 =>  {value: undefined, done: false}
  console.log("5 => ", iterator.next()); // 5 =>  {value: 0.3, done: false}
  console.log("6 => ", iterator.next()); // 6 =>  {value: undefined, done: true}
  console.log("7 => ", iterator.next()); // 7 =>  {value: undefined, done: true}
```
  done = true , when it starts to indicates outside the object , so if it is the turn of the last object it will be done = false ... keep it simple man !

  We can loop on elements like this
```JS
  for (;;) {
    let obj = iterator.next();
    if (obj.done === true) break;
    console.log(obj.value);
  }
  // 1
  // 2 
  // 4 
  // undefined 
  // 0.3
```

## ==Set & Weak Set==

Why is it called WeakSet ? cuas it's weak , meanning references to objects in a WeakSet are held weakly ... if no other references to an objeect stored in the WeakSet exist, those objects can be garbage collected

  - ==Set==     => stores any data type values
  - ==WeakSet== => stores only collectio of objects

```JS
  let person = {
    name: "shika",
    age: 38,
    jop: "Abo El Gahlawiya",
  };

  let set = new Set([1,2,4,1,1,,.3]);
  let iter = set.keys();
  let wSet = new WeakSet([person,iter]);


  console.log(wSet);  
  //  0: Object  
  //  1: SetIterator
```
  --
  - ==Set==     => has a `size` property==
  - ==WeakSet== => doesn't have a `size` property
```JS
  console.log(set.size); // 5
  console.log(wSet.size); // undefined
```
  --
  - ==Set==     => Has clear, keys, values , entries
  - ==WeakSet== => Doesn't have clear , keys , values and entries
  --
  - ==Set==    => can use forEach
  - ==WeakSet== => cannot use foreach
```JS
  set.forEach(e => console.log(e));
  wSet.forEach(e => console.log(e)); // error : wSet.forEach is not a function 
```

**** 
  ## Map Data Type
 * Syntax : new Map (Iterable with key/value)
 *  Map VS Object
 * Methods :
    - `set(key, value)`
    - `get(key)`
    - `delete(key)`
    - `clear()`
    - `has(key)`
 * Properties
    - `size`
```JS
  let map = new Map([
    [10, "Number"],
    ["10", "String"],
  ]);

  map.set(false, "Boolean");
  console.log(map); // Map(3) {10 => 'Number', '10' => 'String', false => 'Boolean'}
  console.log(map.get(false)); // Boolean
  console.log(map.has(10)); // true
  console.log(map.delete("10")); // true
  console.log(map.size); // 2
  map.clear();
  console.log(map); // Map(0) {soze:0}
```
  --
  ==Map== => dosn't contain key by default
  ==Object== => has default keys
```JS
let person = {};
let map = new Map();

console.log(person); // {}
console.log(map); // Map(0) {No properties}
```
  --
  ==Map== => key can be anything [function, object, any primitive data type]
  ==Object== => string or symbol
```JS
  let person = {
  10: "Number",
  "10" : "String"
  };

  let map = new Map();
  map.set(10, "Number");
  map.set("10", "String");

  console.log(person); // {10: 'String'}
  console.log(map); // Map(2) {10 => 'Number', '10' => 'String'}
  console.log(person[10]); // String
  console.log(person["10"]); // String
  console.log(map.get(10)); // Number
  console.log(map.get("10")); // String
```
```JS
  let map = new Map();
  map.set(10, "Number");
  map.set("10", "String");
  map.set(true, "Boolean");
  map.set({a:1}, "Object");
  map.set(function foo() {}, "Function");
  console.log(map); // {10 => 'Number', '10' => 'String', true => 'Boolean', {…} => 'Object', ƒ => 'Function'}
```

  --
  ==Map== => has `size` property
  ==Object== => need to get the size manually
```JS
console.log(map.size);
```
  --
  ==Map==  => can be directrley iterated
  ==Object== => cannot iterate directly and you need to use `Object.keys()` or `Object.values()` or `Object.entries()`
```JS
map.forEach ((value , key , map) => console.log(key , value , map));

```
```JS
let map = new Map();
map.set("Banana", 1);
map.set("Orange", 2);
map.set("Pear", 3);

let info = [
  ["Banana",1],
  ["Orange", 2],
  ["Pear", 3]
]

let obj = Object.fromEntries(map.entries());
// we can make it shorter 
obj = Object.fromEntries(map);
let obj1 = Object.fromEntries(info);

console.log(obj);
console.log(obj1);
```

  --
  ==Map== => better performance when add or remove data
  ==Object== => low preformnace when comparing to Map


***
  ## ==Map  vs Weak Map==
  WeakMap allows garbage collector to do its task but not Map

  --

  ==Map== => key can be any data type , anything
  ==WeakMap== => key can only be an object

  --
  ```JS
  let map = new Map();
  map.set("name", "Abdu");
  map.set(false, "boolean");
  console.log(map); // Map(2) {'name' => 'Abdu', false => 'boolean'}
  
  let wMap = new WeakMap();
  wMap.set({a : "name"}, "Abdu"); 
  
  console.log(wMap); // may appear and may not ; depends on garbage collector
  ```

  Same differences between Set and WeakSet applies on Map and WeakMap
  - methods limitation
  - properties limitation
  - ability to loop (forEach)
***
  ## ==Array Methods==
 * `Array.from(iterable, mapFn, this)`
```JS
  console.log(Array.from("abdulazim").map(function (letter) {
    return letter + letter;
  }));
```
```JS
  console.log(Array.from("abdulazim", e => e+e))
```
```JS
  let nums = [1,1,2,2,3,3,4,5];
  let set = new Set(nums); // {1,2,3,4,5}
  console.log(Array.from(set)); // [1,2,3,4,5]
```
```JS
  function fn() {
    return arguments;
  }
  let obj = fn("abdulazim", "Rabie");
  console.log(Array.from(obj)); // ["abdulazim","Rabie"]
```

  * `Array.copyWithin(target, start, end)`
    - target : means the index replacing will start from
    - start : start of indecies i will copy
    - end : end of indecies i will copy [Not including end]

    if you passed any negative value , it is targetted as length + negative value
```JS
  let arr = [1, 2, 3, 4, "a", "b"];
  arr.copyWithin(1,-2,6); // [1, "a", "b", 4, "a", "b"]
  arr.copyWithin(3, 1,3); // [1, "a", "b", "a", "b", "b"]
```
  * `Array.some(function(value, index, array), this)`
  `Array.some()` return a boolean value. it loops on each element in array and if returned true, it'll stop looping otherwise it will keep looping untile the end

```JS
  let nums = [1,2,3,4,5];

  let check = nums.some(function (e) {
    console.log(e);
    return e === 4;
  });
  console.log(check);
```

```JS
  let check = nums.some(function (e) {
    console.log(e);
    return e === 4;
  });
```

```JS
  function isValueExisted(arr, value) {
    let result = arr.some(e => e == value);
    return result;
  }
  console.info(isValueExisted(nums,3));
```

```JS
let range = {
  min: 5,
  max: 20,
}

function numberInRange(arr, range) {
  let result = arr.some(function (e) {
    return e >= this.min && e <= this.max;
  },range)

  return result;
};

console.log(numberInRange(nums, range));
```

  * `Array.every(fn(element, index, array), this)`
    - CallbackFunc : returns every elements on the given array
    - element : current element to processs
    - index : index of current element
    - array : current array working with
    - this : value to use as (this) when executing callbackfunc
  
  this function must return true when checking each element to return `true` at the end
  if one element returns `false` while checking 
```JS
  const locations = {
    20: "egypt",
    10: "morocco",
    30: "iraq",
    40: "jordan"
  }

  let mainlocation = 15;
  let locationArray = Object.keys(locations).map(e => +e);

  let result = locationArray.every(function (e) {
    return e > mainlocation;
  }, mainlocation);

  console.log(result); // false 
```

***
  ## ==Spread Operator (...Iterable)==
  its function is exetracting (expanding) elemnets of the iterable object
```JS
console.log(..."name"); // n a m e
```

Concating arrays
```JS
  let nums = [1,2,3,4];
  let str = ["a", "b", "c", "d"];
  console.log([...nums,...str]); // [1, 2, 3, 4, 'a', 'b', 'c', 'd']
```

Copying an array
```JS
  let group1 = [1,2,3];
  let group2 = [...group1];

  group2[1] = 0;

  console.log(group1); // [1,2,3]
  console.log(group2); // [1,0,3]
```

push inside the array
```JS
  let letters = ['a','b','c'];
  let addesLetters = ['d','e','f'];

  letters.push(addesLetters);
  console.log(letters); // ['a', 'b', 'c', Array(3)]
```
```JS
  letters.push(...addesLetters);
  console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f']
```

With Math Object
```JS
  let nums = [10,20,30,-10];
  console.log(Math.max(...nums));
```

Merging Object
```JS
let obj1 = {
  name : "abdu",
}

let obj2 = {
  age : 19
}

console.log({obj1, obj2}); // {obj1: {…}, obj2: {…}}
console.log({...obj1, ...obj2}); // {name: 'abdu', age: 19}
```