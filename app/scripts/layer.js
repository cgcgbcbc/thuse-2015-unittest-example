//********************************************************************
//********Layer.js
//********Contains all the function related to DOM(i.e. canvas)
//********ATTENTION: Premise - contains jQuery and kernel.js above
//********Programmer: Zhao Leiyu, Wang Anqi
//********Date: 2014-9-26
//********************************************************************

$(function()	//the funciton being called after finishing initilizing the DOM
{
	$("#CellBase").attr("width",GLOBAL_CONST.CANVAS_SIZE)
				  .attr("height",GLOBAL_CONST.CANVAS_SIZE);

	/*Begin: delete this to use per-pixel drawing*/
	$("#CellBase").attr("width",GLOBAL_CONST.WIDTH)
				  .attr("height",GLOBAL_CONST.HEIGHT);
	/*End*/

	//get the dc of canvas that will be passed to the draw function later:
	GLOBAL_CONST.CANVAS=$("#CellBase")[0].getContext("2d");

	//generate the global arena and initialize it
	GLOBAL_CONST.ARENA=new Arena();
	RefreshOnce();

	//Bind the event of two buttons
	$("#RefreshButton").click(RefreshOnce);
	$("#PlayButton").click(function()
	{
		if (GLOBAL_CONST.TIMER==-1)
			StartPlay();
		else
			PausePlay();
	});
});

function RefreshCanvas(canvas)	//called periodicly to lay the arena to the canvas as well as to calculate the next frame
{
	var perWidth=GLOBAL_CONST.CANVAS_SIZE*1.0/GLOBAL_CONST.WIDTH;
	var perHeight=GLOBAL_CONST.CANVAS_SIZE*1.0/GLOBAL_CONST.HEIGHT;

	/*Begin: delete this to use per-pixel drawing*/
	perWidth=perHeight=1;
	/*End*/


	for (var i=0;i<GLOBAL_CONST.HEIGHT;i++)
		for (var j=0;j<GLOBAL_CONST.WIDTH;j++)
		{
			if (!GLOBAL_CONST.ARENA.changed[i][j]) continue;
			if (GLOBAL_CONST.ARENA.terrain[i][j])
				canvas.fillStyle="#000000";
			else
				canvas.fillStyle="#FFFFFF";
			canvas.fillRect(j*perWidth,i*perHeight,perWidth,perHeight);
		}
	GLOBAL_CONST.ARENA=RefreshArena(GLOBAL_CONST.ARENA);
}

//Followings are functions binded to click-event of the buttons:

function PausePlay()	//Pause the refreshing and change the image of button
{
	if (GLOBAL_CONST.TIMER!=-1)
	{
		$("#PlayButton").attr("src","images/play.png");
		clearInterval(GLOBAL_CONST.TIMER);
	}
	GLOBAL_CONST.TIMER=-1;
}

function StartPlay()	//Continue the refreshing and change the image of button
{
	if (GLOBAL_CONST.TIMER==-1)
	{
		$("#PlayButton").attr("src","images/play-r.png");
		GLOBAL_CONST.TIMER=setInterval(function(){RefreshCanvas(GLOBAL_CONST.CANVAS)},1000/GLOBAL_CONST.FPS);
	}
}

function RefreshOnce()	//Reshuffle the whole arena but pause refreshing
{
	PausePlay();
	RandomShuffle(GLOBAL_CONST.ARENA);
	RefreshCanvas(GLOBAL_CONST.CANVAS);
}
