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
 * @namespace person
 * @memberof personify
 */
(function() {
/**
* Creates a new instance of class Person.
* @class - Represents a person.
* @name personify#person
* @param {string} name - Somebody Person's name.
* @param {string} sName - Somebody Person's surname.
* @this Person
*/
personify.person = function( name, sName ){
	/**
	* Varies private properties
	* @inner
	* @memberOf personify#person
	*/
	var prop = {
		templates : {view : '<div><strong>$[title]</strong></div>',},
		vars : {title : 'title', uniqid : 'uniqid'},
		varTags : {openTag : '$[', closeTag : ']'}
	}

	/**
	* Gets private properties
	* @method personify#person#getProp
	* @instance
	* @memberOf personify#person
	* @returns {object}
	*/
	this.getProp = function(){return prop}

	/**
	* Person's name
	* @name personify#person#name
	* @type {string}
	* @instance
	* @memberOf personify#person
	*/
	this.name = name;

	/**
	* Person's name
	* @name personify#person#sName
	* @type {string}
	* @instance
	* @memberOf personify#person
	*/
	this.sName = sName;
}

/**
* Does some useful operations
* @method personify#person.doSomethingGood
* @static
* @memberOf personify#person
* @returns {number}
*/
personify.person.doSomethingGood = function(x, y){ return x + y; }

/**
* Gets Person's name
* @method personify#person#getName
* @instance
* @memberOf personify#person
* @returns {string}
*/
personify.person.prototype.getName = function(){ return this.name; }


}());



/**
 * @namespace solder
 * @memberof personify.person
 */
(function() {
/**
* Creates a new instance of class Solder.
* @class - Represents a solder.
* @name personify#person#solder
* @param {string} name - Somebody solder's name.
* @param {string} sName - Somebody solder's surname.
* @this solder
*/
personify.person.solder = function( name, sName ){}


personify.person.solder.prototype = Object.create(personify.person.prototype);
personify.person.solder.prototype.constructor = personify.person.solder;
}());

var prs = new personify.person('Vasia', 'Pupkin');

console.log( personify.person.doSomethingGood(1,2) );

console.log( prs.getName() );
