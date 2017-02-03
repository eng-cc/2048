var board = new Array();
var score=0;
var hasConfilicted = new Array;
var startx=0,
    starty=0,
    endx=0,
    endy=0;

$(document).ready(function(){
	prepareForMobile();
	newgame()
})
var prepareForMobile=function(){
	$('.grid-container').css('width',girdContainerWidth-2*cellSpace);
	$('.grid-container').css('height',girdContainerWidth-2*cellSpace);
	$('.grid-container').css('padding',cellSpace);
	$('.grid-container').css('border-radius',0.02*girdContainerWidth);
	
	$('.container-cell').css('width',cellSideLength);
	$('.container-cell').css('height',cellSideLength);
	$('.container-cell').css('border-radius',0.02*cellSideLength);
}
var newgame=function(){
	//初始化棋盘位置
	init();
	//随机生成两个数字
	generateOneNumber();
	generateOneNumber();
	score=0;
	updataScore(score);
}

var init=function(){
	//初始化位置
	for(var i=0;i<4;++i){
		for(var j=0;j<4;j++){
			var gridcell=$('#container-cell-'+i+"-"+j);
			gridcell.css('top',getpostop(i,j));
			gridcell.css('left',getposleft(i,j));
		}
	}
	//初始化数据
	for(var i =0;i<4;i++){
		board[i]=new Array();
		hasConfilicted[i]=new Array;
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConfilicted[i][j]=false;
			
		}
	}
	updataboardview();
}

var updataboardview=function(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('.grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numbercell=$('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				numbercell.css('width','0px');
				numbercell.css('height','0px');
				numbercell.css('top',getpostop(i,j)+cellSideLength/2);
				numbercell.css('left',getposleft(i,j)+cellSideLength/2);
			}
			else{
				numbercell.css('width',cellSideLength);
				numbercell.css('height',cellSideLength);
				numbercell.css('top',getpostop(i,j));
				numbercell.css('left',getposleft(i,j));
				numbercell.css('background-color',getnumberbgc(board[i][j]));
				numbercell.css('color',getnumberc(board[i][j]));
				numbercell.text(board[i][j]);
		}
			if(board[i][j]>=1024){
				numbercell.css('font-size',0.34*cellSideLength)
			}
			hasConfilicted[i][j]=false;
	}
}
	$('.number-cell').css('line-height',cellSideLength+"px");
	$('.number-cell').css('font-size',0.5*cellSideLength+"px");
}

var generateOneNumber=function(){
	if(nospace(board))
		return false;
		
	//随机一个位置
	var ranx=parseInt(Math.floor(Math.random()*4));
	var rany=parseInt(Math.floor(Math.random()*4));
	
	var times = 0;
	while(times<50){
		if(board[ranx][rany]==0)
			break;
		ranx=parseInt(Math.floor(Math.random()*4));
		rany=parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i = 0;i<4;i++){
			for(var j = 0 ;j>4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}
	}
	//随机生成一个数
	var randNumber=Math.random()>0.5? 2:4;
	if(randNumber==4){
		randNumber=Math.random()>0.5? 2:4;
	}
	
	//在随机位置显示随机数
	board[ranx][rany]=randNumber;
	showNumberWithAnimation(ranx,rany,randNumber)
	
	return true;
}

$(document).keydown(function(event){
	
	switch( event.keyCode ){
		case 37://left
		event.preventDefault();
		if( moveLeft() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 38://up
		event.preventDefault();
		if( moveUp() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 39://right
		event.preventDefault();
		if( moveRight() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 40://down
		event.preventDefault();
		if( moveDown() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
	}
	
})

document.addEventListener('touchmove',function(event){
	event.preventDefault();
})

document.addEventListener('touchstart',function(event){
	startx= event.touches[0].pageX ;
	starty=event.touches[0].pageY ;
});
document.addEventListener('touchend',function(event){
	endx= event.changedTouches[0].pageX;
	endy= event.changedTouches[0].pageY;
	switch(whereChange()){
		case 37://left
		if( moveLeft() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 38://up
		if( moveUp() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 39://right
		if( moveRight() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		case 40://down
		if( moveDown() ){
			setTimeout('generateOneNumber()',210);
			setTimeout('isGameOver()',290);
		}
		break;
		default:break;
	}
});

var whereChange=function(){
	var changex=endx-startx;
	var changey=endy-starty;
	if( Math.abs(changex)<0.1*documentWidth && Math.abs(changey)<0.12*documentWidth ){
		return 2;
	}
	if(Math.abs(changex)>Math.abs(changey)){
		if(changex>0){
			return 39;
		}
		else{
			return 37;
		}
	}
	else{
		if(changey>0){
			return 40;
		}
		else{
			return 38;
		}
	}
}

var moveLeft=function(){
	if(!canMoveLeft(board))
		return false;
	
	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if( board[i][k]==0 && noBlockHorizontal(i ,k,j,  board) ){
						//move
						showMoveAnimation(i ,j, i, k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						
						continue
					}
					else if(board[i][k]==board[i][j]&& noBlockHorizontal(i ,k,j, board) &&! hasConfilicted[i][k] ){
						//move
						showMoveAnimation(i ,j, i, k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+= board[i][k];
						updataScore(score);
						
						hasConfilicted[i][k]=true;
						continue
					}
				}
			}
		}
	}
	setTimeout('updataboardview()',200);
	return true;
}

var moveRight=function(){
	if(!canMoveRight(board))
		return false;
	
	//moveRight
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if( board[i][k]==0 && noBlockHorizontal(i ,j ,k,  board) ){
						//move
						showMoveAnimation(i ,j, i, k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						
						continue
					}
					else if(board[i][k]==board[i][j]&& noBlockHorizontal(i , j,k, board) &&! hasConfilicted[i][k] ){
						//move
						showMoveAnimation(i ,j, i, k);
						//add
						board[i][k]*=2;
						board[i][j]=0;
						//add score
						score+= board[i][k];
						updataScore(score);
						
						hasConfilicted[i][k]=true;
						continue
					}
				}
			}
		}
	}
	setTimeout('updataboardview()',200);
	return true;
}

 var moveUp=function(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) &&! hasConfilicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
						//add score
						score+= board[k][j];
						updataScore(score);
						
						hasConfilicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updataboardview()",200);
    return true;
}

var moveDown=function(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) &&! hasConfilicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
						//add score
						score+= board[k][j];
						updataScore(score);
						
						hasConfilicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updataboardview()",200);
    return true;
}
var isGameOver=function(){
	if( nospace( board ) && nomove(board) ){
		gameover();
	}
}

var gameover=function(){
	alert("失败，重新开始");
	
}









