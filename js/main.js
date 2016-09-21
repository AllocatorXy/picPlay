window.onload = function () 
{
	var oDiv = document.getElementById('picPlay');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oDiv.getElementsByTagName('li');
	var oLiWidth = parseInt(getStyle(aLi[0],'width'));
	var iTarLeft = [];
	var oBtnPrev = oDiv.getElementsByClassName('prev')[0];
	var oBtnNext = oDiv.getElementsByClassName('next')[0];
	var oLeftMark = oDiv.getElementsByClassName('leftMark')[0];
	var oRightMark = oDiv.getElementsByClassName('rightMark')[0];
	var oDivThumb = document.getElementById('thumbPic');
	var oUlThumb = oDivThumb.getElementsByTagName('ul')[0];
	var aLiThumb = oDivThumb.getElementsByTagName('li');
	var oLiThumbWidth = parseInt(getStyle(aLiThumb[0],'width'));

	oUl.innerHTML = oUl.innerHTML+oUl.innerHTML+oUl.innerHTML;
	oUl.style.width = oLiWidth*aLi.length+'px';
	oUl.style.left = -oLiWidth*aLi.length/3+'px';
	var curIndex = aLi.length/3;
	oUlThumb.innerHTML = oUlThumb.innerHTML+oUlThumb.innerHTML+oUlThumb.innerHTML;
	oUlThumb.style.width = oLiThumbWidth*aLi.length+'px';
	oUlThumb.style.left = -oLiThumbWidth*aLi.length/3+'px';

	for (var i = 0; i < aLi.length; i++) 
	{
		aLi[i].index = i;
		aLiThumb[i].index = i;
		iTarLeft[i] = -oLiWidth*i;
	}


	/*左右按钮*/
	oBtnPrev.onmouseover=oLeftMark.onmouseover = function () 
	{
		setMov(oBtnPrev,'opacity',100);
	};
	oBtnPrev.onmouseout=oLeftMark.onmouseout = function () 
	{
		setMov(oBtnPrev,'opacity',0);
	};
	oBtnNext.onmouseover=oRightMark.onmouseover = function () 
	{
		setMov(oBtnNext,'opacity',100);
	};
	oBtnNext.onmouseout=oRightMark.onmouseout = function () 
	{
		setMov(oBtnNext,'opacity',0);
	};

	/*切换主图像*/
	function thumbClk() 
	{
		curIndex = this.index;
		setMov(oUl,'left',iTarLeft[curIndex]);
	}
	for (var j = 0; j < aLiThumb.length; j++) 
	{
		aLiThumb[j].onclick = thumbClk;
	}
	
	oBtnPrev.onclick=oLeftMark.onclick = function () 
	{
		if (curIndex == 1) //向左到正数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3+1;
			oUl.style.left = iTarLeft[curIndex]+'px';
		}
		curIndex = curIndex - 1;
		setMov(oUl,'left',iTarLeft[curIndex]);
	};
	oBtnNext.onclick=oRightMark.onclick = function () 
	{
		if (curIndex == aLi.length-2) //向右到倒数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3-1;
			oUl.style.left = iTarLeft[curIndex]+'px';
		}
		curIndex = curIndex + 1;
		setMov(oUl,'left',iTarLeft[curIndex]);
	};

	/*切换缩略图*/
};

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

/*function getByClass(oParent, sClass) 
{
	var aElem = oParent.getElementsByTagName('*');
	var aResult =[];

	for (var i = 0; i < aElem.length; i++) 
	{
		if (aElem[i].className == sClass) 
		{
			aResult.push(aElem[i]);
		}
	}
	return aResult;
}*/