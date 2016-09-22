window.onload = function () 
{
	var oDiv = document.getElementById('picPlay');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oDiv.getElementsByTagName('li');
	var oLiWidth = parseInt(getStyle(aLi[0],'width'));
	var oBtnPrev = oDiv.getElementsByClassName('prev')[0];
	var oBtnNext = oDiv.getElementsByClassName('next')[0];
	var oLeftMark = oDiv.getElementsByClassName('leftMark')[0];
	var oRightMark = oDiv.getElementsByClassName('rightMark')[0];
	var oDivThumb = document.getElementById('thumbPic');
	var oUlThumb = oDivThumb.getElementsByTagName('ul')[0];
	var aLiThumb = oDivThumb.getElementsByTagName('li');
	var oLiThumbWidth = parseInt(getStyle(aLiThumb[0],'width'));
	var oTxt = document.getElementsByClassName('text')[0];
	var oNo = document.getElementsByClassName('quan')[0];



	oUl.innerHTML = oUl.innerHTML+oUl.innerHTML+oUl.innerHTML;
	oUl.style.width = oLiWidth*aLi.length+'px';
	oUl.style.left = -oLiWidth*aLi.length/3+'px';
	var curIndex = aLi.length/3;
	oUlThumb.innerHTML = oUlThumb.innerHTML+oUlThumb.innerHTML+oUlThumb.innerHTML;
	oUlThumb.style.width = oLiThumbWidth*aLi.length+'px';
	oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3-1)+'px';

	for (var i = 0; i < aLi.length; i++) 
	{
		aLi[i].index = i;
		aLiThumb[i].index = i;

		if (aLi[i].index < aLi.length/3) 
		{
			aLi[i].readIndex = aLi[i].index+1;
		}
		if ((aLi.length/3)*2 > aLi[i].index && aLi[i].index >= aLi.length/3) 
		{
			aLi[i].readIndex = aLi[i].index-(aLi.length/3-1);
		}
		if (aLi[i].index >= (aLi.length/3)*2)
		{
			aLi[i].readIndex = aLi[i].index-((aLi.length/3)*2-1);
		}
	}
	var imgNotes = getNotes();
	function getNotes() 
	{
		var arr = [];
		var aPic = oDiv.getElementsByTagName('img');
		for (var i = 0; i < aPic.length; i++) 
		{
			arr.push(aPic[i].alt);
		}
		return arr;
	}
	oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1];

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

	/*主图像操作*/
	oBtnPrev.onclick=oLeftMark.onclick = function () 
	{
		if (curIndex == 1) //向左到正数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3+1;
			oUl.style.left = -oLiWidth*curIndex+'px';
			oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3)+'px';
		}
		curIndex = curIndex - 1;
		setMov(oUl,'left',-oLiWidth*curIndex);
		thumbMov();
	};
	oBtnNext.onclick=oRightMark.onclick = function () 
	{
		if (curIndex == aLi.length-2) //向右到倒数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3-2;
			oUl.style.left = -oLiWidth*curIndex+'px';
			oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3-3)+'px';
		}
		curIndex = curIndex + 1;
		setMov(oUl,'left',-oLiWidth*curIndex);
		thumbMov();
		
	};

	/*缩略图操作*/
	function thumbMov() 
	{
		for (var i = 0; i < aLiThumb.length; i++) 
		{
			setMov(aLiThumb[i],'opacity',60);
		}

		setMov(aLiThumb[curIndex],'opacity',100);
		setMov(oUlThumb,'left',-(curIndex-1)*oLiThumbWidth);
		oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1];
	}
	function thumbClk() 
	{
		curIndex = this.index;
		if (curIndex == 1) //向左到正数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3+1;
			oUl.style.left = -oLiWidth*(aLi.length/3+2)+'px';
			oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3+1)+'px';
		}
		if (curIndex == aLi.length-2) //向右到倒数第二张图的时候，先重置位置再运动
		{
			curIndex = aLi.length/3-2;
			oUl.style.left = -oLiWidth*(aLi.length/3-3)+'px';
			oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3-4)+'px';
		}
		setMov(oUl,'left',-oLiWidth*curIndex);
		thumbMov();
	}
	function thumbOver() 
	{
		setMov(this,'opacity',100);
	}
	function thumbOut() 
	{
		if (this.index != curIndex) 
		{
			setMov(this,'opacity',60);
		}
	}
	for (var j = 0; j < aLiThumb.length; j++) 
	{
		aLiThumb[j].onmouseover = thumbOver;
		aLiThumb[j].onmouseout = thumbOut;
		aLiThumb[j].onclick = thumbClk;
	}

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

