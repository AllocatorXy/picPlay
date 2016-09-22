
	oUl.innerHTML = oUl.innerHTML+oUl.innerHTML+oUl.innerHTML;
	oUl.style.width = oLiWidth*aLi.length+'px';
	oUl.style.left = -oLiWidth*aLi.length/3+'px';
	var curIndex = aLi.length/3;
	oUlThumb.innerHTML = oUlThumb.innerHTML+oUlThumb.innerHTML+oUlThumb.innerHTML;
	oUlThumb.style.width = oLiThumbWidth*aLi.length+'px';
	oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3-1)+'px';

	/*给所有li定义index和给用户看的readIndex*/
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

	/*get图片注释*/
	var imgNotes = getNotes();
	oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1];

	/*左右按钮显示和隐藏*/
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
	/*主图像左右按键事件*/
	oBtnPrev.onclick=oLeftMark.onclick = function () 
	{
		curIndex = curIndex - 1;
		movLeft();
		thumbMov();
		oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1]; //更新图片注释信息部分
	};
	oBtnNext.onclick=oRightMark.onclick = function () 
	{
		curIndex = curIndex + 1;
		movRight();
		thumbMov();	
		oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1]; //更新图片注释信息部分
	};
	/*缩略图事件*/
	for (var j = 0; j < aLiThumb.length; j++) 
	{
		aLiThumb[j].onmouseover = thumbOver;
		aLiThumb[j].onmouseout = thumbOut;
		aLiThumb[j].onclick = thumbClk;
	}



