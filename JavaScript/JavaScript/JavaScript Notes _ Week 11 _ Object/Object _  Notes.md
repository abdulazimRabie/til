## Object :  Notes
### - object : hasOwnProprty()
### - object sorting
-- how to sort an object : concept of sorting object is not correct, but if you need to sort it you can use Array.sort() method with its arguments (comparing function) ...  you can use the comparing function to compare objects values of properties
* **compareFn**
```
	array.sort(function (a,b) {
		return value
	})
```
 value could be (-, +, 0)
we can handle it with these concepts below

```
	** a - b (main concept returs)
	** - => then a is less than b => sort a before b
	** + => then a is greater than b => sort a after b
	** 0 => equality => keep it
```

### object length
you can get length of object using these methods
- `Object.keys(objectName)`
	returns an array of object keys
```
	console.log(Object.keys(maxSpeed));
	console.log(Object.keys(maxSpeed.length()));
```


- `Object.values(objectName)`
	returns an array of object values
```
	console.log(Object.values(maxSpeed));
	console.log(Object.values(maxSpeed.length()));
```

- `Object.entries(objectName)`
	returns an array exists of keys and values. each key and its value is an array
```
	console.log(Object.entries(maxSpeed));
	console.log(Object.entries(maxSpeed.length()));
```

- `object.hasOwnProperty()`
	you can use this function ti check if this property is existed ... true -> increase the counter
	
```
	for (item in maxSpeed) {
	  if (maxSpeed.hasOwnProperty(item)) count++;
	}
```

