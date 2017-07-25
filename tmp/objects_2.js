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
 * @namespace personify
 */
(function() {
    window.personify = window.personify || {};
}());


/**
* Creates a new instance of class Person.
* @class - Represents a person.
* @param {string} name - Somebody Person's name.
* @param {string} sName - Somebody Person's surname.
* @this Person
*/
var Person = function( name, sName ){
	/**
	* Varies private properties
	* @inner
	* @memberOf Person
	*/
	var prop = {
		templates : {view : '<div><strong>$[title]</strong></div>',},
		vars : {title : 'title', uniqid : 'uniqid'},
		varTags : {openTag : '$[', closeTag : ']'}
	}

	/**
	* Gets private properties
	* @method getProp
	* @instance
	* @memberOf Person
	* @returns {object}
	*/
	this.getProp = function(){return prop}

	/**
	* Person's name
	* @name Person#name
	* @type {string}
	* @instance
	* @memberOf Person
	*/
	this.name = name;

	/**
	* Person's name
	* @name Person#sName
	* @type {string}
	* @instance
	* @memberOf Person
	*/
	this.sName = sName;
}

/**
* Does some useful operations
* @method doSomethingGood
* @static
* @memberOf Person
* @returns {number}
*/
Person.doSomethingGood = function(x, y){ return x + y; }

/**
* Gets Person's name
* @method getName
* @instance
* @memberOf Person
* @returns {string}
*/
Person.prototype.getName = function(){ return this.name; }

/**
 * @namespace person
 * @memberof personify
 */
window.personify.person = Person;







var prs = new personify.person('Vasia', 'Pupkin');

console.log( personify.person.doSomethingGood(1,2) );

console.log( prs.getName() );
