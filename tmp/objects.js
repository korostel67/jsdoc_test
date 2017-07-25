/**
* @fileOverview Objects extending.
* @author <a href="mailto:korostel67@gmail.com">Yuri Korostelev</a>
* @version 1.0
*/
if (!Object.create) {
    Object.create = (function(){
        function F(){}

        return function(o){
            if (arguments.length != 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }
            F.prototype = o;
            return new F()
        }
    })()
}
Object.deepExtend = function(destination, source) {
  for (var property in source) {
    //if(destination[property]) continue;
	if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      if(!destination[property]) destination[property] = source[property];
    }
  }
  return destination;
};

/**
 * @namespace Personify
 */
(function() {
    window.personify = window.Personify || {};
}());


/**
* Creates a new instance of class Person.
* @class - Represents a person.
*/
var Person = function(){
	/**
	* Varies private properties
	* @inner
	* @memberOf Person
	*/
	var prop = {
		templates : {
			view : '<div><strong>$[title]</strong></div>',
		},
		vars : {title : 'title', uniqid : 'uniqid'},
		varTags : {openTag : '$[', closeTag : ']'}
	}
	/**
	* Gets private properties
	* @memberOf Person
	* @returns {object}
	*/
	this.getProp = function(){return prop}
}

/**
 * @namespace person
 * @memberof personify
 */
window.personify.person = Person;

/**
* Creates a new instance of class Robot.
* @class - Represents a Robot.
* @extends Person
*/
var Robot = function(){
	Person.call(this);
	var prop = {
		templates : {
			edit : '<div></div>',
			news : '<div>$[title]</div>',
		}
	}
	Object.deepExtend(prop, this.getProp());
	this.getProp = function(){return prop} //переопределяем родительский метод
}
Robot.prototype = Object.create(Person.prototype);
Robot.prototype.constructor = Robot;

/**
* Creates a new instance of class Cyborg.
* @class - Represents a Cyborg.
* @extends Person
*/
var Cyborg = function(){
	Robot.call(this);
	var prop = {
		templates : {
			galaxy : '<div><h1><h2>$[title]</h2></h1></div>',
		}
	}
	Object.deepExtend(prop, this.getProp());
	this.getProp = function(){return prop} //переопределяем родительский метод
}
Cyborg.prototype = Object.create(Robot.prototype);
Cyborg.prototype.constructor = Cyborg;

/**
* Creates a new instance of class Cat.
* @class - Represents a Cat.
* @extends Person
*/
var Cat = function(){
	Person.call(this);
	var prop = {
		templates : {
			edit : '<div><div class="">{{prop.title}}</div></div>',
			view : '<div><strong>{{prop.title}}</strong></div>',
		},
		vars : {title : 'prop.title', uniqid : 'prop.uniqid'},
		varTags : {openTag : '{{', closeTag : '}}'}
	}
	Object.deepExtend(prop, this.getProp());
	this.getProp = function(){return prop} //переопределяем родительский метод
}
Cat.prototype = Object.create(Person.prototype);
Cat.prototype.constructor = Cat;

person = new Person();
robot = new Robot();
cyborg = new Cyborg();
cat = new Cat();

console.dir(person.getProp());
console.dir(robot.getProp());
console.dir(cyborg.getProp());
console.dir(cat.getProp());
/**/
