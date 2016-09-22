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

/*get图片注释*/
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

/*缩略图相关事件*/
function thumbClk() 
{
	if (this.index > curIndex) 
	{
		curIndex = this.index;
		movRight();
	}
	if (this.index < curIndex) 
	{
		curIndex = this.index;
		movLeft();
	}
	thumbMov();
	oTxt.innerHTML = imgNotes[aLi[curIndex].readIndex+1]; //更新图片注释信息部分
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

/*主图像移动函数*/
function movRight() 
{
	if (curIndex == aLi.length-2) //向右到倒数第二张图的时候，先重置大图和小图位置再运动
	{
		curIndex = aLi.length/3-2;
		oUl.style.left = -oLiWidth*(aLi.length/3-3)+'px';
		oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3-4)+'px';
	}
	setMov(oUl,'left',-oLiWidth*curIndex); //右移大图
}
function movLeft() 
{
	if (curIndex == 1) //向左到倒数第二张图的时候，先重置大图和小图位置再运动
	{
		curIndex = aLi.length/3+1;
		oUl.style.left = -oLiWidth*(aLi.length/3+2)+'px';
		oUlThumb.style.left = -oLiThumbWidth*(aLi.length/3+1)+'px';
	}
	setMov(oUl,'left',-oLiWidth*curIndex); //左移大图
}
/*缩略图移动函数*/
function thumbMov() 
{
	for (var i = 0; i < aLiThumb.length; i++) 
	{
		setMov(aLiThumb[i],'opacity',60);
	}

	setMov(aLiThumb[curIndex],'opacity',100);
	setMov(oUlThumb,'left',-(curIndex-1)*oLiThumbWidth);
}
