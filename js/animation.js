var showNumberWithAnimation=function(x,y,n){
	var numbercell=$('#number-cell-'+x+'-'+y);
	
	numbercell.css('background-color',getnumberbgc(n));
	numbercell.css('color',getnumberc(n));
	numbercell.text(n);
	
	numbercell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getpostop(x,y),
		left:getposleft(x,y)
	},50)
}

var showMoveAnimation=function(fromx ,fromy, tox ,toy){
	var numbercell=$('#number-cell-'+fromx+'-'+fromy);
	
	numbercell.animate({
		top:getpostop(tox,toy),
		left:getposleft(tox,toy)
	},200)
}

var updataScore=function( score ){
	$('#score').text(score);
}
