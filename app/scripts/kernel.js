//********************************************************************
//********Kernel.js
//********Define the fundamental object of the arena.
//********Programmer: Zhao Leiyu, Wang Anqi
//********Date: 2014-9-26
//********************************************************************

var GLOBAL_CONST=	//a class contains all the global storage used
{
	WIDTH: 120,		//the width of the arena
	HEIGHT: 120,	//the height of the arena
	NEIGHBOR: [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]],	//eight different position that may have impact on the current cell
	FPS: 30,	//the fps to refresh the arena
	CANVAS_SIZE: 400,	//canvas size is x*x
	PROBLEBILITY: 0.2,	//the probability to spawn a living cell
	ARENA: {},	//global arena to hold those cells
	TIMER: -1,   //the refresher-function timer
	CANVAS: 0
}
/*object constructor*/
function Arena()	//generate a arena for the cells to grow on
{
	this.terrain=new Array(GLOBAL_CONST.HEIGHT);
	for (var i=0;i<GLOBAL_CONST.HEIGHT;i++)
	{
		this.terrain[i]=new Array(GLOBAL_CONST.WIDTH);
		for (var j=0;j<GLOBAL_CONST.WIDTH;j++)
			this.terrain[i][j]=0;
	}

	this.changed=new Array(GLOBAL_CONST.HEIGHT);
	for (var i=0;i<GLOBAL_CONST.HEIGHT;i++)
	{
		this.changed[i]=new Array(GLOBAL_CONST.WIDTH);
		for (var j=0;j<GLOBAL_CONST.WIDTH;j++)
			this.changed[i][j]=false;
	}
}

function NavigateCell(pos, delta)	//search for the coordinate of some position
{
	var ans=[pos[0],pos[1]];
	ans[0]=(ans[0]+delta[0]+GLOBAL_CONST.HEIGHT)%GLOBAL_CONST.HEIGHT;
	ans[1]=(ans[1]+delta[1]+GLOBAL_CONST.WIDTH)%GLOBAL_CONST.WIDTH;

	return ans;
}
function RefreshArena(arena)	//refresh the whole arena by one frame
{
	var nextArena=new Arena();	//storing the next arena
	var tCount=0;
	var tPos,mPos;
	/*check each cell accordingly to get the number of living cells*/
	for (var i=0;i<GLOBAL_CONST.HEIGHT;i++)
		for (var j=0;j<GLOBAL_CONST.WIDTH;j++)
		{
			tCount=0;	//the num of living cells
			mPos=[i,j];	
			for (var k=0;k<8;k++)	//enumerate each cell in the neighborhood and count
			{
				tPos=NavigateCell(mPos,GLOBAL_CONST.NEIGHBOR[k]);
				tCount+=arena.terrain[tPos[0]][tPos[1]];
			}
			switch (tCount)
			{
				//to remain the same status
				case 2:
					nextArena.terrain[i][j]=arena.terrain[i][j];
					break;

				//spawn a living cell here
				case 3:
					if (arena.terrain[i][j]==0) nextArena.changed[i][j]=true;
					nextArena.terrain[i][j]=1;
					break;

				//kill the cell
				default:
					if (arena.terrain[i][j]==1) nextArena.changed[i][j]=true;
					nextArena.terrain[i][j]=0;
			}
		}

	return nextArena;
}
function RandomShuffle(arena)	 //assign every pixel(cell)a state of death or aliveness
{
	for (var i=0;i<GLOBAL_CONST.HEIGHT;i++)
		for (var j=0;j<GLOBAL_CONST.WIDTH;j++)
		{
			arena.terrain[i][j]=Math.random()<GLOBAL_CONST.PROBLEBILITY?1:0;
			arena.changed[i][j]=true;
		}
}