 ## ==Destructuring== : is a javascript expression that allows us to extract data from (arrays, objects) then maps and sets them into new distinct variables

  - ### Destructuring Array
```
  let names = ["osama", "Karim", "Abdu", "Yahia"];

  [one, two, three, four] = names;

  console.log(one); // osama
  console.log(two); // karim
  console.log(three); // abdu
  console.log(four); // yahia

  console.log(names); // ["osama", "Karim", "Abdu", "Yahia"]
```
  Skipping Element
```
  let names = ["osama", "Karim", "Abdu", "Yahia"];

  [one, two, , four] = names;

  console.log(one); // osama
  console.log(two); // karim
  console.log(four); // yahia

  console.log(names); // ["osama", "Karim", "Abdu", "Yahia"]
```
  Overriding existed variables
```
  let one = 1,
  two = 2,
  three = 3,
  four = 4;

  let names = ["osama", "Karim", "Abdu", "Yahia"];

  [one, two, , four] = names;

  console.log(one); // osam
  console.log(two); // karim
  console.log(three); // 3
  console.log(four); // yahia

  console.log(names); // ["osama", "Karim", "Abdu", "Yahia"]
```
  Dealing with deault value for variables
  Extracting elements larger than elements array
```
  let one = 1,
      two = 2,
      three = 3,
      four = 4;

  let names = ["osama", "Karim", "Abdu"];

  [one = "one", two, , three = "three", four] = names;

  console.log(one); // osama
  console.log(two); // karim
  console.log(three); // three
  console.log(four); // undefined

  console.log(names); // ["osama", "Karim" , "Abdu"]
```
  Destructuring With Nested Array

```
  let friends = [1,2,3,[4,5,[6]]];
  let [,,,[a,,[b]]] = friends;

  console.log(a); // 4
  console.log(b); // 6
```

  Swapping using destructuring
```
  let a = 10;
  let b = 20;

  [a,b] = [b,a];

  console.log("a = ", a); // 20
  console.log("b = " , b); // 10
```

 * ### Destructring Object
 * With destructuring object you don't access elements by indecies but the property name
  So, there is no skipping here; cause you're retreiving values with its properties

```
  let person = {
    title: "abdulazim",
    age: 19,
    jop: "developer",
    country: "egypt"
  };
```
  Normal way to access properties values of object
  
```
  let title = person.title;
  let age = person.age;
  let jop = person.jop;
  let country = person.country;

  console.log(title);
  console.log(age);
  console.log(jop);
  console.log(country);
```

  Using Destructuring

```
  // {title, age, jop, country} = person; // error => you have to wrap the expression between parentheses
  ({thetitle, age, jop, country} = person);

  console.log(thetitle); // undefined => it's like declaring variables witout assigning
  console.log(age); // 19
  console.log(jop); // developer
  console.log(country); // egypt
```

  Naming variables
  `property : new Name`

```
  ({title: t, age: a, jop} = person);

  console.log(t); // abdulazim
  console.log(title); // error : tle is not defined
```
  What happend ? 
  - he declared a variable with the name "a"
  - the value of the variable is the value of property is called 'title' in object
  so, the error popped up cause you tying to access variable has not been decalered yet
  setting default value
  property = value;

  Setting default value for the variable if the property isn't existed
```
  let {club = "zamalek"} = person;
  console.log(club); // zamalek
```
  Destructuring nested object
```
  let person = {
    title: "abdulazim",
    age: 19,
    jop: "developer",
    skills: {
      html: 70,
      css: 80
    }
  };
```
```
  ({skills} = person);
  console.log(skills); // {html: 70, css: 80}
```
```
  ({skills : {html}} = person);
  console.log(html); // 70
```
```
  ({skills : {html : h, css}} = person);
  console.log(h); // 70
  console.log(css); // 80
```
```
  ({html, css} = person.skills);
  console.log(html);
  console.log(css);
```
  Destructuring function parameter
```
  function showDetails({title , jop, skills: {css}} = obj) {
    console.log(`
      name : ${title}
      jop : ${jop}
      CSS : ${css}
    `)
  };
  
  showDetails(person);
```

  Invalid property name
```
  let person = {
    "ski-ils": {
      html: 70,
      css: 80
    }
  };
  
  let {"ski-ils" : foo} = person;
  console.info(foo);
```