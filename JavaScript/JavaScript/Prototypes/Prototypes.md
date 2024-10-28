## Prototypes

```JS
function Hero(name, level) {
  this.name = name;
  this.level = level;

  this.sayHi = () => {
    return `${this.name} is saying Hi`;
  }
}

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);
  this.weapon = weapon;
}

function Healer(name, level, spell) {
  Hero.call(this, name, level);
  this.spell = spell;
}

Object.setPrototypeOf(Warrior.prototype , Hero.prototype);
Object.setPrototypeOf(Healer.prototype , Hero.prototype);

Hero.prototype.greet = function() {
  return `Hi iam ${this.name}, my level is ${this.level}`;
}

Warrior.prototype.attack = function() {
  return `${this.name} attacks with ${this.weapon}`;
}

Healer.prototype.heal = function() {
  return `${this.name} casts ${this.spell}`;
}

let hero = new Hero("king", 3);
let warrior = new Warrior("abdulazim", 1, "axe");
let healer = new Healer("Doc", 0, "cure");


console.log(warrior.sayHi()); // abdulazim says Hi
console.log(healer.sayHi()); // Doc says Hi

console.log(warrior.greet()); // hi iam abdulazim my level is 1 
console.log(healer.greet()); // hi iam Doc , my level is 0


// console.log(c1.greet());
// console.log(c1.attack());

// console.log("=".repeat(10));

// console.log(c2.greet());
// console.log(c2.heal());
```