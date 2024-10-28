# Regular Expression
## ==Syntax==

- `/pattern/modifiers`
- `new RegExp("pattern", "modifiers")`

## ==Modifiers==

==i== : case insensitive (lowercase and uppercase are the same)
==g== : global (search all over the string you pass)
==m== : multi lines

## ==Search Method==

- matches a string against a regular expression
- returns an array with the matches
- returns `null` if no math is found

```JS
    let string = "Elzero Web School .. i love elzero";
    let regex = /elzero/;
    console.log(string.match(regex)); // Array[elzero : index =28]
```

```JS
    let str = "Abd-Ulazem Rabie abd-ulhafiz";
    let regex = /abd/i;
    console.log(str.mathc(regex)); // Array [Abdu : index = 0]
```

It matched with the first Abdu not the last one because you use "i" modifier

```JS
    let name = "abd-elazem rabie ABD-elhafiz"
    let regex = /abd/ig;
    console.log(name.match(regex)); // Array(2)[abd, Abd]
```

# ==Ranges==

- ==(x|y)== : x or y
- ==[0-9]== : 0 to 9
- ==[^0-9] [^a-z]==: not

- ==[a-z]==
- ==[^a-z]==
- ==[A-Z]==
- ==[^A-Z]==
- ==[abc]== === a | b | c : are the same
- ==[^^]== : not the ^ character
    --

### (x|y) 

```JS
   const tld = "Com Net Org Info Io Code";
   let tldReg = /com|net|info/ig;

   console.log(tld.match(tldReg));
   /* Array(3) [ Com, Net, Info ] */
```

### [0-4]

```Js
   let nums = "12345678910";
   let numsReg = /[0-9]/g;
   
   console.log(nums.match(numsReg));
   /* Array(4)[1, 2, 3, 4, 5, 6,7,8,9]; */
```

### ^ Not

```Js
    let notNums = "1#23@4!56789";
    let notNReg = /[^0-9]/g;
    
    console.log(notNums.match(notNReg)); 
    /* Array(3)[#, @, !] */
```

### practice

```Js
    let test = "os1 os2 os1os os8 os8os";
    let testReg = /os[5-9]/ig;
    
    console.log(test.match(testReg));
    /* Array(2)[os8 , os8os]*/
    
    testreg = /os[5-9]os/ig;
    console.log(test.match(testReg));
    /* Array(1) [os8os] */


```

### a-z

```Js
    const string = "ABcdefGH12345@#!^";

    let azReg = /[a-z]/g;
    console.log(string.match(azReg));
    /* Array(4) [ c, d, e, f ]  */
    
```

### ^a-z

```Js
    let notazReg = /[^a-z]/g;
    console.log(string.match(notazReg));
    /* Array(13) [ A, B, G, H, 1, 2, 3, 4, 5, @, #, !, ^] */
```

### 0-9

```Js
    let notNumsReg = /[^0-9]/g;
    console.log(string.match(notNumsReg));
    /*Array(12) [ A, B, c, d, e, f, G, H, @, #, !, ^ ]  */
```

### A-Z

```Js
    let AZReg = /[A-Z]/g;
    console.log(string.match(AZReg));
    /* Array(4) [ A, B, G, H ] */
```

### ^A-Z

```Js
    let NotAZReg = /[^A-Z]/g;
    console.log(string.match(NotAZReg));
    /* Array(13) [ c, d, e, f, 1, 2, 3, 4, 5, @, #, !, ^ ] */
```

### A-z & a-zA-z

```Js
    let onlyLetters = /[A-z]/g; // === [a-zA-Z]
    console.log(string.match(onlyLetters));
    /* Array(8) [ A, B, c, d, e, f, G, H ] */
```

### [abc] equals to (a|b|c)

```Js
    let ace = /[ace]/g; // === a|c|e
    console.log(string.match(ace));
    /* Array [ c, e ] */
```

### Practice

```JS
    let exceptLetters = /[^A-z]/g; // [^a-zA-Z]
    console.log(string.match(exceptLetters));
    /* Array(9) [ 1 ,2 ,3 ,4 ,5 ,@ ,# ,!] */ // doesn't incide (^)
```

```JS
    let onlySpecial = /[^a-zA-Z0-9]/g;
    console.log(string.match(onlySpecial));
    /* Array(4) [@ ,# ,!, ^] */
```

```JS
    let exceptSmallLetters = /[^a-z^A-Z0-9]/g;
    console.log(string.match(exceptSmallLetters));
    /* Array(4) [@ ,# ,!] */
```

# ==Character Classes==

- ==.== : all ANY character except new line (\n)
- ==\w== : matches word characters [a-z] [A-Z] [0-9] and Underscore _ 
- ==\\W== : matches non word characters 
- ==\\d== : matches only digits [0-9]
- ==\\D== : matches non digits (any character except the digits)
- ==\\s== : matches whitespace characters (" " or \\n or \\t and so on)
- ==\\S== : matches non whitespace character
- ==\\b== : mathces at the beginning or end of a word
- ==\\B== : does't matche at the the beginning or end of a word

### Dot . : any character

```JS
    const string = "abdceABCDE1234%# _ ^\n \t";

    let dot = /./g;
    console.log(string.match(dot));
    /* [a, b, d, c, e, A, B, C, D, E, 1, 2, 3, 4, %, #,  , ^] */
    /* it matched all posible characters includeing the space*/

```

### \\w (word) : a-z A-z 0-9 and _

```JS
    let word = /\w/g;
    console.log(string.match(word));
    /* [a, b, d, c, e, A, B, C, D, E, 1, 2, 3, 4, _] */
```

### \\W (not word) : any character doesn't belong to the above

```JS
    let nonWord = /\W/g;
    console.log(string.match(nonWord));
    /* [%, #,  ,  , ^, \n] */
    
```

### \\d : any digit character

```JS
    let digit = /\d/g;
    console.log(string.match(digit));
    /* [1, 2, 3, 4] */
```

### \\D : any character doesn't belong to digits

```Js
    let nonDigit = /\D/g;
    console.log(string.match(nonDigit));
    /* [a, b, d, c, e, A, B, C, D, E, %, #,  , _,  , ^] */
    
```

### \\s : any space character

```JS
    let space = /\s/g;
    console.log(string.match(space));
    /* (5) [' ', ' ', '\n', ' ', '\t'] */
    
```

### \\S : any character doesn't belong to space characters

```JS
    let nonSpace = /\S/g;
    console.log(string.match(nonSpace));
    /* (18) [a, b, d, c, e, A, B, C, D, E, 1, 2, 3, 4, %, #, _, ^] */
    
```

### \\b : any word start or end with a specific word

`\bspam` : starts with spam
`spam\b` : ends with spam

```JS
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";

    let spamABegin = /\bspam/ig; // begins with 'spam'
    console.log(names.match(spamABegin));
    /* (2) [spam, Spam] */

```

### \\B : any word doesn't start or end with a specific word

`\Bspam` : doesn't start with spam
`spam\B` : doesn't end with spam

```JS
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";
    let notAtEnd = /spam\B/ig; // doesn't end with 'spam' == begins with 'spam'
    console.log(names.match(notAtEnd));
    /* (2) [spam, Spam] */

```

```Js
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";
    let spamAtEnd = /spam\b/ig; // ends with spam
    console.log(names.match(spamAtEnd))
    /* (3) [spaM, sPam, spAM] */

```

```Js
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";
    let notAtBegin = /\Bspam/ig; // doesn't begin with spam == ends with 'spam'
    console.log(names.match(notAtBegin))
    /* (3) [spaM, sPam, spAM] */

```

```Js
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";
    let regex = /(spam\d|\dspam)/ig; 
    // start with a digit the followed by 'spam' 
    // or 'spam' then followed by a digit
    console.log(names.match(regex)); 
    /* [1spaM, 2sPam, 5spAM, spam4] */
    
```

```JS
    const names = "Syed 1spaM 2sPam 35spAM spam4 SpamS osama ahmeed";
    regex = /\bspam|spam\b/ig; // begins with 'spam' or ends with 'spam'
    console.log(names.match(regex));
    /* (5) [spaM, sPam, spAM, spam, Spam] */
    
```

# ==Test Method==

Syntax

- `Regex pattern.test(input)`

```JS
    console.log(/abdulazim/.test("abdulazim")); // true
    console.log(/\bspam/.test("abdulazim")); // false
    console.log(/\d\w/ig.test("abdulazim")); // false
```

# ==Quantifiers==

- ==n+== : one or more
- ==n*== : zero or more
- ==n?== : one or zero
- ==n{x}==: number of x
- ==n{x,y}== : range from x to y
- ==n{x, }== : at least x
- ==$== : ends with something
- ==^== : start with something
- ==?\=== : followed by something
- ==?!== : not followed by something
### Mails example
n+
```JavaScript
    const mails = "a@b.c o@nn.sa osama@gmail.com elzero@gmail.net osama@mail.ru";
    let mailsReg = /\w+@\w+.(com|net)/ig;
    console.log(mails.match(mailsReg));
    /* Array [ osama@gmail.com, elzero@gmail.net ] */
```

```JavaScript
	const mails = "a@b.c o@nn.sa osama@gmail.com elzero@gmail.net osama@mail.ru";
    mailsReg = /\w@\w.\w/ig; 
	// wordCharacter @ wordCharacter anyCharacter wordCharacter
    console.log(mails.match(mailsReg));
    // Array(4) [ "a@b.c", "a@gma", "o@gma", "a@mai" ]
```

```JavaScript
	const mails = "a@b.c o@nn.sa osama@gmail.com elzero@gmail.net osama@mail.ru";
    mailsReg = /\w@\w(.+)\w/ig;
	// wordCharacter -> @ -> wordCharacter -> anyCharacter(one or more) -> wordCharacter
    console.log(mails.match(mailsReg)); 
	// it will return all of the string as a one item
    // Array [ "a@b.c o@nn.sa osama@gmail.com elzero@gmail.net osama@mail.ru" ]
    
```

```JavaScript
	const mails = "a@b.c o@nn.sa osama@gmail.com elzero@gmail.net osama@mail.ru";
    mailsReg = /\w+@\w+.\w+/ig;
	// word character one or more -> @ -> word character (one or more) -> . -> word character one or more
    console.log(mails.match(mailsReg));
    // Array(5) [ "a@b.c", "o@nn.sa", "osama@gmail.com", "elzero@gmail.net", "osama@mail.ru" ]
```

### Nums Example
n*
```Js
	const nums = "0110 01 05120 0560 350 00";
	let numsReg = /0\d0/ig;;
	console.log(nums.match(numsReg));
	// null
```

```Js
	const nums = "0110 01 05120 0560 350 00";
	numsReg = /0\d\d0/ig; // zero - digit - digit - zero
	console.log(nums.match(numsReg));
	// Array [ "0110", "0560" ]
```

```JS
	const nums = "0110 01 05120 0560 350 00";
	numsReg = /0\d+0/ig; // zero - one or more digits - zero
	console.log(nums.match(numsReg));
	// Array(3) [ "0110", "05120", "0560" ]
```

```JS
	const nums = "0110 01 05120 0560 350 00";
	numsReg = /0\d*0/ig; // zero - one or more digits - zero
	console.log(nums.match(numsReg));
	// Array(4) [ "0110", "05120", "0560", "00" ]
```

### URLS Example
n*
```JS
	const urls = "https://google.com http://www.linkedin.com https://twitter.com prettier.com";
	let urlsReg = /\bhttps:\/\/\w+.com/ig;
	console.log(urls.match(urlsReg));
	// Array [ "https://google.com", "https://twitter.com" ]
```

```JS
	const urls = "https://google.com http://www.linkedin.com https://twitter.com prettier.com";
	urlsReg = /http(s?):\/\/(www)?.\w+.com/ig; 
	// http => (s) zero or one => :// => (www) zero or one => . => word character one or more => . => com
	console.log(urls.match(urlsReg));
	// Array(3) [ "https://google.com", "http://www.linkedin.com", "https://twitter.com" ]
```

```JS
	const urls = "https://google.com http://www.linkedin.com https://twitter.com prettier.com";
	urlsReg = /(http(s)?:\/\/(www)?.)?\w+.com/ig; 
	// (http => (s) zero or one => :// => (www) zero one => .) zero or one => word character one or more => . => com
	console.log(urls.match(urlsReg));
	// Array(4) [ "https://google.com", "http://www.linkedin.com", "https://twitter.com", "prettier.com" ]
```

### Serials Example
n{x}
```JS
	const serials = "S100S S5000S s10000S S999000S";
	let reg = /s\d{3}s/ig;
	console.log(serials.match(reg));
	// Array [ "S100S" ]
```
n{x,y}
```JS
	const serials = "S100S S5000S s10000S S999000S";
	reg = /s\d{3,4}s/ig;
	console.log(serials.match(reg));
	// Array [ "S100S", "S5000S" ]
```
n{x, }
```JS

	const serials = "S100S S5000S s10000S S999000S";
	reg = /s\d{4,}s/ig;
	console.log(serials.match(reg));
	// Array(3) [ "S5000S", "s10000S", "S999000S" ]


```

```JS

	const serials = "S100S S5000S s10000S S999000S";
	reg = /s\d{4,}s/g;
	console.log(serials.match(reg));
	// null


```

```JS

	const serials = "S100S S5000S s10000S S999000S";
	reg = /s\d{4,}S/g;
	console.log(serials.match(reg));
	// Array [ "s10000S" ]


```

"$"
``` Js

	let string = "abdulazim";
	console.log(/zim$/ig.test(string)); // true

	let string = "abdulazim";
	console.log(/^abd/ig.test(string)); // true

```
 "?= & ?1"
``` Js

	let str = "i love javascript";
	console.log(/java(?=script)/ig.test(str)); // true

	console.log(/Java(?=OOP)/ig.test(str)); // false

	console.log(/love (?!javascript)/ig.test(str)); //false


```

more practices

``` JS

	let names = "1OsamaZ 2RabieZ 3Yahia 4AbdulazimZ 5Karim";

	console.log(names.match(/\d\w+(?=z)/ig));
	// Array(3) [ "1Osama", "2Rabie", "4Abdulazim" ]

	console.log(names.match(/\w+z/ig));
	// Array(3) [ "1OsamaZ", "2RabieZ", "4AbdulazimZ" ]

	console.log(names.match(/\w+(?=z)/ig));
	// Array(3) [ "1Osama", "2Rabie", "4Abdulazim" ]

	console.log(names.match(/\d\w{5}(?!z)/ig));
	// digit => word char (length = 5) => not followed by 'z'
	// Array(3) [ "3Yahia", "4Abdul", "5Karim" ]

	console.log(names.match(/\d\w{5}(?!z)(?!\w)/ig));
	// digit => word char (5) => not followed 'z' => not followed by any word char
	// Array [ "3Yahia", "5Karim" ]


```

# ==Replace==
- Replace
- ReplaceAll

```JS
	const str = "i love programming and @ because @ is amazing";

	console.log(str.replace("@", "JS"));
	// i love programming and JS because @ is amazing

	console.log(str.replaceAll("@", "JS"));
	// i love programming and JS because JS is amazing

	console.log(str.replace(/@/, "C++"));
	// i love programming and C++ because @ is amazing

	console.log(str.replaceAll(/@/, "C++")); 
	// Error => replace all called with a global regular expression

	console.log(str.replaceAll(/@/g, "C++")) 
	//i love programming and C++ because C++ is amazing
```

# Form Validation
```JS
	document.getElementById("register").onsubmit = (e) => {
	  let phone = document.getElementById("phone").value;
	  let phoneRegex = /\(\d{4}\)\s\d{3}-\d{4}/ig; // (1234) 567-8910
	  if (!phoneRegex.test(phone)) {
		console.log(phoneRegex.test(phone));
		return false;
	  }
	  return true;
	}
```

# Challange
```Js

	let url1 = "elzero.org";
	let url2 = "http://elzero.org";
	let url3 = "https://elzero.org";
	let url4 = "https://www.elzero.org";
	let url5 = "https://www.elzero.org:8080/articles.php?id=100&cat=topics";

	let regex = /(http(s)?:\/\/(www)?.)?\w+.org(:\d{4}\/\w+.\w+)?(\?id=\d+&cat=\w+)?/ig;

	console.log(url1.match(regex));
	console.log(url2.match(regex));
	console.log(url3.match(regex));
	console.log(url4.match(regex));
	console.log(url5.match(regex));


```