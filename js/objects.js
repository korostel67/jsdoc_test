
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

var Person = function(){
	var prop = {
		templates : {
			view : '<div><strong>$[title]</strong></div>',
		},
		vars : {title : 'title', uniqid : 'uniqid'},
		varTags : {openTag : '$[', closeTag : ']'}
	}
	this.getProp = function(){return prop}
}

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
