## Higher Order Function

is a function that accepts a function as parameter then return a new function

## ==map()==

works on arrays. this method has two parameters (function, this)

- function has three arguments `(element[Mandatory], index[opt], array[opt])`
- you can write a function or pass it
- this method return a new array

## ==filter()==

works with arrays also

- accepts two arguments(function, this)
- function accepts three arguments
    - `(element, index , array)`
- you can write a function or pass it
- this method doesn't change the item , it is testing the item if the function returns true it's gonna return the same item , if not it wont return the item and go for testing the next item
- return a new array

## ==reduce()==

works with arrays also

- returns the sum of elements as a value
- accepts two arguments (callback function , initial value)
- callback function has 4 arguments
    - `(accumulator , element , index , array)`
- initial value is the first item in array if you don't pass it

## ==forEach()==

works on the current array

- loop on each element to do some changes (implement an action on each element)