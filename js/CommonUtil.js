/*
命名空间
*/
var NLJ={};

/*
*Interface Class
*接口需要两个参数
*参数1: 接口的名字（string）
*参数2：接受方法名称的集合（数组）(Array)
*/
NLJ.Interface=function(name,methods){
	if (arguments.length!=2) {
		throw new Error("the instance interface constructor arguments must be 2 ！");
	}
	this.name=name;
	this.methods=[];
	for(var i=0, len=methods.length; i<len; i++){
		if(typeof methods[i] != 'string'){
			throw new Error('the methods name is not string !');
		}
		this.methods.push(methods[i]);
	}
}
/*  Interface static method */
//检验接口里的方法
NLJ.Interface.checkImplements=function(obj){
	if (arguments.length<2) {
		throw new Error('the constructor arguments must >= 2 ！');
	}
	for(var i=1, len=arguments.length; i<len; i++){
		var interfaceName=arguments[i];
		//判断参数是否是接口类型
		if(interfaceName.constructor != NLJ.Interface){
			throw new Error('the arguments constructor is not Interface class');
		}
		for(var j=0;j<interfaceName.methods.length;j++){
			var methodName=interfaceName.methods[j];
			if( !obj[methodName]  || typeof obj[methodName] !== 'function'){
				throw new Error('the methodName: "'+methodName+'" is error !');
			}
		}
	}
}
/*  extend method */
//父类构造函数
NLJ.extend=function(sub,sup){
	var fn = new Function();//中转函数
	fn.prototype = sup.prototype;
	sub.prototype = new fn();
	sub.prototype.constructor = sub;//还原子类的构造器
	sub.superClass = sup.prototype;//保存父类的原型对象，目的：1.方便解耦 2.得到父类的原型对象
	if (sup.prototype.constructor == Object.prototype.constructor) {
		sup.prototype.constructor=sup;
	}
}

/*
单体模式
实现一个跨浏览器的事件处理程序
*/
NLJ.EventUtil={
	addHandler:function(element,type,handler){
		if (element.addEventListener){  	//FF
			element.addEventListener(type,handler,false);
		}else if(element.attchEvent){		//IE
			element.attchEvent('on'+type,handler);
		}
	},
	removeHandler:function(element,type,handler){
		if (element.removeEventListener){  	//FF
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){		//IE
			element.detachEvent('on'+type,handler);
		}
	}
}


	