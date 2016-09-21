function setMov(obj, attr, iTar, timer) 
{
	clearInterval(obj[timer]);

	obj[timer] = setInterval(function () 
	{
		var realAttr = 0;
		if (attr == 'opacity') // 透明度需要特别处理
		{
			realAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
		}
		else
		{
			realAttr = parseInt(getStyle(obj,attr));
		}

		var speed = (iTar-realAttr)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);

		if (realAttr == iTar) 
		{
			clearInterval(obj[timer]);
		}
		else
		{
			if (attr == 'opacity') 
			{
				obj.style.filter = 'alpha(opacity:'+(realAttr+speed)+')'; //ie
				obj.style.opacity = (realAttr+speed)/100; //webkit etc
			}
			else
			{
				obj.style[attr] = realAttr+speed+'px';
			}
		}
	}, 15);
}
function getStyle(obj,name) 
{
	
	if (obj.currentStyle) 
	{
		//IE低版本
		return obj.currentStyle[name];
	}
	else 
	{
		//FF等浏览器
		return getComputedStyle(obj,null)[name]; 
		//getComputedStyle函数中，第二个参数无用，任意设置
	}
}