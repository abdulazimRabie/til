# SASS
- SASS : Syntactically Awesome Style Sheet
- Extension for CSS
- Preprocessor
- Features
  - Variables
  - Functions
  - Loop
  - Extend
  - Control Flow
  - Advanced Structure
  
Some Websites - extensions and Desktop Programs
- (website) 
  - Sass meister : converts your sass code to pure css file
- (extension on vscode) 
  - Live Sass Compiler: Construct a new file with css extension which contains the pure css code 
- (Programs)
  - Koala : GUI program is used to process the Sass file and create pure css file and map file + some good features for instance write the prefix
  - Prepros : does the same with better UI 
  
## Advanced Architecture
It's really important and awesome to build an architecture for the project.
That makes your code readable, easy to debug and edit and clean propably not verbos.
  
  
In Sass, we create a Sass folder and start to contruct our environment
```
> Sass
  > Layout
    _global.scss
  > Pages
    _.home.scss
    _.contact.scss
```
That's how we build advanced architecture
  
But, i know you've a question and it is why we wrote _ [underscore] at the begining while naming sass files.
  
That's not a name convinsion.
It is an indicator for compiler to ignore compiling this file because it will be used somewhere else, so it's not production code . it's a development version.
  
So, if you compiled your project, you will not find pure css file for those ignored file starting with _ [underscore]
  
  
## Import
Architecture
```
> Sass
  > Layout
   _global.scss
  > Pages
    _home.scss
    _contact.scss
  
main.scss
```
  
main.scss
```scss
@import "./Sass/Layout/_global.scss";
// you can write it without extension and underscore
@import "./Sass/Pages/home";
@use "./Sass/Pages/_contact"
```
  
Using `@use` better than `@import` but the do the same, but there is a little bit different.
`@import` will not be deprecated in the near future.
Use Css tricks for more information.
  
  
## Variables
`<img src="https://latex.codecogs.com/gif.latex?name:%20value;`main.scss```scss"/>main-clr: green;
  
.main {
  background-color: @main-clr;
}
```
  
Different between css and scss variables
  
in css : the variable is always linked to the root
in scss : while compiling variable is replaced with its corresponding value
  so, it can be changed ... we will see it soon
  
```scss
  
:root {
  --first-clr: tomato;
}
  
$main_clr: green;
  
.main {
  background-color: $main_clr;
  color: var(--first-clr);
}
  
/*
  .. Compiled file.css
  .main {
    background-color: green;
    color: var(--first-clr);
  }
*/
  
.footer {
  /*local variable*/
  $main_clr: red;
  background-color: $main_clr;
}
  
/*
  .. Compiled file.css
  .footer {
    background-color: red;
  }
*/
  
```
  
`!global` used to set the value of local variable to the global variable
main.scss
```scss
$main_clr: green;
  
.main {
  $main_clr: blue !global;
  background-color: $main_clr;
}
  
.footer {
  background-color: $main_clr;
}
  
/*
  .. Compiled file.css
  .main {
    background-color: blue;
  }
  
  .footer {
  background-color: blue;
}
*/
```
  
<mark>Note</mark>: if there is not a global variable with that name, it will be created
  
```scss
.main {
  $main_clr: black !global;
  background-color: $main_clr;
}
  
.footer {
  color: $main_clr;
}
  
/*
  ...Compiled file.css
  .main {
    $main_clr: black !global;
    background-color: black;
  }
  
  .footer {
    color: black;
  }
*/
```
  
Writing varibles in another file
  
```
> Sass
  > Layout
   _global.scss
  > Pages
    _home.scss
    _contact.scss
  >Variables
    >_colors.scss
  
main.scss
```
  
colors.scss
```scss
$clr: purple;
```
  
main.scss
```scss
@use "./Sass/Varibles/colors";
  
.selector {
  background-color: $clr;
}
  
/*
  ERORRRRRRRRRRRRRRRRRRRR
*/
```
  
Solutuions
- `as *`
- modules
  
```scss
@use "./Sass/Varibles/colors" as *; 
// Bring all varibales inside
  
.selector {
  background-color: $clr;
}
  
  /*
    ...Compiled
    .selector {
      background-color: purple
    }
  */
```
colors.scss
  
  
  
```scss
@use "./Sass/Varibles/colors"; 
// Bring all varibales inside
  
.selector {
  background-color: colors.$clr;
}
  
/*
  ...Compiled
  .selector {
    background-color: purple
  }
*/
```
  
  
## Nesting
`&` referse to the parent
  
```scss
.parent {
  color: red;
  .child {
    background-color: violet;
    .grand-child {
      padding: 10px;
    }
  }
}
  
.container, .wrapper {
  width: 90vw;
  p {
    font-weight: bold;
  }
}
  
.element {
  + p {margin: 0}
  ~ div {color: red};
  > h1 {font-size: 4rem};
  &.theSameElement {
    display: block;
  }
  &:hover {
    .title {
      color: gray;
    }
  }
  
  &:not(:first-child) {
    display: none;
  }
  
  :not(&) {
    padding: 0;
  }
  
  [die="rtl"] & {
    direction: rtl;
  }
}
/*
  ...Compiled
  
  .element + p {
    margin: 0;
  }
  
  .element ~ div {
    color: red; 
  }
  
  .element > h1 {
    font-size: 4rem; 
  }
  
  .element.theSameElement {
    display: block; 
  }
  
  .element:hover .title {
    color: gray; 
  }
  
  .element:not(:first-child) {
    display: none; 
  }
  
  :not(.element) {
    padding: 0; 
  }
  
  [die="rtl"] .element {
    direction: rtl; 
  }
*/
```
  
  
## Property Declaration
Dealing with shorthand property like an object
```scss
.card {
  margin: auto {
    top: 3px;
    bottom: -10px;
  }
}
  
/*
  ...Compiled
  
  .card {
  margin: auto;
  margin-top: 3px;
  margin-bottom: -10px; 
  }
*/
```
  
  
## Placehodlers
Reusable block of code
```scss
.main-box-style {
  padding: 10px;
  text-align: center;
  background-color: rgba(#ffaa, 0.1);
}
  
.card {
  @extend .main-box-style;
  color: darkblue;
}
  
/*
 ...Compiled
  .main-box-style, .card {
    padding: 10px;
    text-align: center;
    background-color: rgba(100, 100, 100, 0.01); 
  }
  
  .card {
    color: darkblue; 
  }
*/
```
The above way depends on creating a class and group elements together.
But if you really want the concept of reusable block of code
`%nameOfCode {}`
  
```scss
%main-box-style {
  padding: 10px;
  text-align: center;
  background-color: rgba(100, 100, 100, .01);
}
  
.card {
  @extend %main-box-style;
  color: darkblue;
}
/*
  ...Compiled
  .card {
    padding: 10px;
    text-align: center;
    background-color: rgba(100, 100, 100, .01);
    color: darkblue;
  }
*/
```
  
## Control Flow
- to write block of code
  - `@if condition {}`
  - `@else {}`
- to write value based on consition
  - `border-radius: if (consiton, if true, if false)`
  
```scss
$theme : 'light';
$rounded : null; 
/*
  @round: false[ or null]; 
  any other value will be considerd true
  for instance
  @round: true - "true" - "anyString" - 121 - "even it's zero" - 0 - "or negative" - -21;
*/
  
%main-box-style {
  padding: 10px;
  text-align: center;
  background-color: rgba(100, 100, 100, .01);
}
  
.card {
  @if $theme == "dark" {
    @extend %main-box-style;
  } @else {
    background-color: white;
    color: #333;
  }
}
  
.box {
  border-radius: if($rounded, 10px, null);
}
  
/*
  ...Compiled
  .card {
  background-color: white;
  color: #333; 
  }
  
*/
```
==Note== : null referse to not writing the property
  
### Example
```scss
.arrow {
  @extend %main-box-style;
  &::before {
    content: '';
    border: 20px solid transparent;
    position: absolute;
    @if $direction == "top" {
      top: $tap;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: inherit;
    } @else if $direction == "bottom" {
      bottom: $tap;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: inherit;
    } @else if $direction == "right" {
      right: $tap;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: inherit;
    } @else if $direction == "left" {
      left: $tap;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: inherit;
    }
  }
}
```
  
##Interpolation
  
Interpolation can be used almost anywhere in a Sass stylesheet to embed the result of a SassScript expression into a chunk of CSS. Just wrap an expression in #{} in any of the following places:
- Selectors in style rules
- Property names in declarations
- Custom property values
- CSS at-rules
- @extends
- Plain CSS @imports
- Quoted or unquoted strings
- Special functions
- Plain CSS function names
- Loud comments
  
```scss
$company: "falcon";
$position: "right";
  
.adver-#{$company} {
  font-size: 1.3rem;
  background-image: url("imgs/#{$company}.png");
  #{$position}: 0;
}
  
/*
...Compiled
.adver-falcon {
  font-size: 1.3rem;
  background-image: url("imgs/falcon.png");
  right: 0; } 
*/
```
  
## Comments
`//` : doesn't appear in css file
`/**/` : appears in css file but not in compressed
`/*! */`: appears in css file and in compressed
`///` : for documentation
  
```scss
// Doesn't care
  
/*
  Multiple lines
  Don't miss interplation
  #{$company}
*/
  
/*! Comment appears in compressed files*/
  
/// Function 
```
  
## Mixin
Mixins allow you to define styles that can be re-used throughout your stylesheet. They make it easy to avoid using non-semantic classes like .float-left, and to distribute collections of styles in libraries.
  
Mixins are defined using the @mixin at-rule, which is written @mixin <name> { ... } or @mixin name(<arguments...>) { ... }. A mixin’s name can be any Sass identifier, and it can contain any statement other than top-level statements. They can be used to encapsulate styles that can be dropped into a single style rule; they can contain style rules of their own that can be nested in other rules or included at the top level of the stylesheet; or they can just serve to modify variables.
  
Mixins are included into the current context using the @include at-rule, which is written @include <name> or @include <name>(<arguments...>), with the name of the mixin being included.
  
```scss
@mixin circle($dimensions) {
  border-radius: 50%;
  width: $dimensions;
  height: $dimensions;
}
.circle-100{
  @include circle(100px);
  background-color: #2a2a2a;
}
```
  
```scss
@mixin rest-list {
  padding: 0;
  margin: 0;
  list-style: square;
}
  
@mixin horizontal-list {
  @include rest-list;
  
  li {
    display: inline;
  
    margin: {
      left: -2px;
      right: 2rem;
    }
  }
}
  
.list {
  @include horizontal-list();
}
```
  
  
## Loop - For
`@for <img src="https://latex.codecogs.com/gif.latex?i%20from%201%20to%2010`:%20execlusive%2010`@for"/>i from 1 through 10`: inclusive 10
  
```scss
@for $i from 1 through 10 {
  .class-#{$i} {
    padding: #{$i}px;
  }
}
```
  
```scss
$dimensions: 0;
@for $i from 1 to 10 {
  $dimensions: $dimensions + 100;
  .circle-#{$dimensions} {
    width: #{$dimensions}px;
    height: #{$dimensions}px;
    border-radius: 50%;
  }
}
```
  
## Each and Map
`@each <img src="https://latex.codecogs.com/gif.latex?variable%20in"/>variables`
`@each <img src="https://latex.codecogs.com/gif.latex?var1,"/>var2, <img src="https://latex.codecogs.com/gif.latex?var3%20in"/>variables`;
  
```scss
$themes: red, blue, green;
@each $theme in $themes{
    .#{$theme}-theme {
      .product {
        background: {
          color: $theme;
        };
        color: $theme;
      }
    }
}
```
  
- Maps
value pairs [key, value]
  
```scss
$socials: (
  "twitter" : blue,
  "discord" : purple,
  "leetcode": yellow
);
  
@each $name, $color in $socials {
  .#{$name}-theme {
    background-color: $color;
    color: white;
  }
}
```
  
```scss
$classes: "one" 20px red, "two" 30px blue, "three" 40px green;
  
@each $name, $size, $clr in $classes {
  .#{$name} {
    font: {
      size: $size;
      weight: bold;
    }
    background-color: $clr;
    color: white;
    padding: $size / 2;
  }
}
```
  
## While Loop
  
`@while condition {}`
  
```scss
$start: 1;
@while $start <= 10 {
  .width-#{ $start * 100} {
    width: $start * 100px;
  }
  $start: $start + 1;
}
```
  
Creating Bootstrap Grid System
```scss
$col: 1;
  
@while $col <= 12 {
  .col-#{$col} {
    width: percentage($col / 12);
  }
  $col: $col + 1;
}
```
  
Better Solution
```scss
$grid: 12;
@for $col from 1 through $grid {
  .col-#{$col} {
    width: percentage($col / $grid);
  }
}
```
  
## Functions
  
```scss
@function half($size) {
  @return $size / 2;
}
```
  
```scss
@function calculate($sizes...) {
  $total: 0;
  @each $size in $sizes {
    $total: $total + $size;
  }
  
  @return $total;
}
```
  
```scss
.ele {
  width: half(300px);
  top: calculate(100px, 200px, 400px);
}
  
/*
...Compiled
.ele {
  width: 150px;
  top: 700px; }
*/
```
  
## Mixin With Content
  
In addition to taking arguments, a mixin can take an entire block of styles, known as a content block. A mixin can declare that it takes a content block by including the @content at-rule in its body. The content block is passed in using curly braces like any other block in Sass, and it’s injected in place of the @content rule.
  
```scss
@mixin set-ani($name) {
  @keyframes #{$name} {
    @content;
  }
  
  @-webkit-keyframes #{$name} {
    @content;
  }
}
  
@include set-ani("fade-in") {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
};
  
/*
... Compiled
@keyframes fade-in {
  0% {
    opacity: 0; }
  100% {
    opacity: 1; } }
@-webkit-keyframes fade-in {
  0% {
    opacity: 0; }
  100% {
    opacity: 1; } }
*/
```
  
```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}
  
.button {
  color: red;
  @include hover {
    border: 2px solid red;
  };
} 
```
  
## Media Query
  
```scss
@mixin breakpoints($point) {
  @if $point == "mobile" {
    @media (max-width: 767px) {
      font-size: 10px;
    }
  } @else if $point == "small" {
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 12px;
    }
  } @else if $points == "medium" {
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 14px;
    }
  } @else if $point == "large" {
    @media (min-width: 1200) {
      font-size: 14px;
    }
  }
}
  
.div {
  @include breakpoints("small");
}
```
  