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

/*这个函数只能获取单个样式，例如width，而不能获取比如background等复合样式的全部信息。
如果要获取复合样式，只能单独获取复合样式的某个值例如backgroundColor*/

/*getStyle(obj.backgroundColor); 则返回值为obj的背景颜色*/