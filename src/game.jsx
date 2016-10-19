import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap'; 


//Initializations
var board = [];
var mirrorGrid = [];
var rows = 50, columns = 70;
var  intervalId;



var Body = React.createClass({
  render : function()
  {
    return(
    <div>
    <Header />
    <Game />
    </div>
    );
  }
});

//Header component

var Header = React.createClass({
  render: function()
  {
    return(
      <div className = "header">
        <h1 className = "text1">Free Code Camp</h1>
        <h2 className = "text2">Conway's Game Of Life</h2>
        <h3 className = "text3">Coded and Designed by Prathiksha</h3>
        </div>
    );
  }
});

//Controls component
var Controls = React.createClass({
  render : function()
  {
   return(
     <div className = "controls">
   <ButtonGroup> 
       <Button className = "button" onClick = {this.props.play}>Play</Button>
        <Button className = "button" onClick={this.props.pause}>
     Pause
     </Button>
     <Button className = "button" onClick={this.props.clear}>
     Clear
     </Button>
      <Button className = "button">
      Count
     </Button>
      <Button className = "button">Set </Button>
      <Button className = "button">Restart </Button>
   </ButtonGroup>
       </div>
   ); 
  }
});
          
//A componenet to combine Board and Controls
var Game = React.createClass({
  set: function()
  {
    clearInterval(intervalId);
    var self = this;
    self.setState({array:board});
    intervalId = setInterval(function(){
    updateGrid();
    self.setState({array:board});
    }, 500); 
  },
  pause:function(){
    clearInterval(intervalId);
  },
  play: function()
  {
   var self = this;
   intervalId = setInterval(function(){
   updateGrid();
   self.setState({array:board});
   }, 500); 
  },
  clear: function()
  {
    clearInterval(intervalId);
    createArray();
    createMirrorGrid();
    this.setState({array:board});
  },
  componentWillMount: function()
  {
    init();
    this.setState({array:board});
  },
  componentDidMount: function()
  {
    var self = this;
   intervalId = setInterval(function(){
   updateGrid();
   self.setState({array:board});
   }, 500); 
  },
  render: function()
  {
    return(
    <div>
        <Controls pause={this.pause.bind(this)} play = {this.play.bind(this)} clear={this.clear.bind(this)} />
        <Board board = {this.state.array} set={this.set.bind(this)}/>
    </div>
    );
  }
});

//Individual small buttons
var FlashButton = React.createClass({
  handleChange:function()
  {
    if(this.props.cell == 1)
      {
       board[this.props.r][this.props.c] = 0;
       this.props.set;
      }
    else if(this.props.cell == 0)
      {
        board[this.props.r][this.props.c] = 1;
        this.props.set();
      }
  },
  render : function()
  {
    return(
        <div className = {(this.props.cell == 1 ? "back1 flash" : "back2 flash")} onClick={this.handleChange} >
        </div>
    );
  }
});



//Board buttons components
var ButtonRow = React.createClass({
  render: function()
  {
    var i;
    var userlist = [];
    for(i = 0; i < 70; i++)
      {
      userlist.push(<FlashButton cell = {this.props.row[i]} set={this.props.set} r={this.props.r} c={i} />);
      }
    return(
    <div className = " button-row">
        {userlist}
      </div>
    );
  }
});


//Board Component
var Board = React.createClass({
  render : function()
  { 
    var userlist = [];
    for(var i = 0; i < 50; i++)
      {
        userlist.push(<ButtonRow row = {this.props.board[i]} r = {i} set={this.props.set} />);
      }
    return(
    <div className="box">
     {
          userlist
     }   
    </div>
    );
  }
});


//Logic of the game

//A function to create a 2D array
function createArray()
{
  for(var i = 0; i < rows; i++)
    {
      board[i] = [];
      for(var j = 0; j < columns; j++)
        board[i][j] = 0;
    }
}

//A function to create mirrorGrid
function createMirrorGrid()
{
  for(var i = 0; i < rows; i++)
    {
      mirrorGrid[i] = [];
      for(var j = 0; j < columns; j++)
        {
          mirrorGrid[i][j] = 0;
        }
    }
}

//A function to randomly populate the array
function randomFill()
{
  for(var i = 0; i < rows; i++)
    {
      for(var j = 0; j < columns; j++)
        {
         var randomNumber = Math.floor(Math.random() * 2);
          board[i][j] = randomNumber;
        }
    }
     
}

// An initial function to start the game

function init()
{
  createArray();
  randomFill();
  createMirrorGrid();
}

//A function to update the grid

function updateGrid()
{
  for(var i = 1; i < rows-1; i++)
    {
      for(var j = 1; j < columns-1; j++)
        {
          var totalCells = 0;
          totalCells += board[i - 1][j - 1];  //Top left cell
          totalCells += board[i - 1][j]; //Top cell
          totalCells += board[i - 1][j + 1]; // Top right cell
          totalCells += board[i][j - 1]; //Left cell
          totalCells += board[i][j + 1]; //Right cell
          totalCells += board[i + 1][j - 1]; //Bottom left cell
          totalCells += board[i + 1][j]; //Bottom cell
          totalCells += board[i + 1][j + 1]; //Bottom right cell
          if(board[i][j] == 0)
            {
              switch(totalCells)
                {
                  case 3: {
                    mirrorGrid[i][j] = 1;
                    break;
                  }
                  default:
                    {
                       mirrorGrid[i][j] = 0;
                    }
                }
            }
          else if(board[i][j] == 1)
            {
              switch(totalCells)
                {
                  case 0:
                  case 1:{
                     mirrorGrid[i][j] = 0;
                    break;
                  }
                  case 2:
                  case 3:
                    {
                      mirrorGrid[i][j] = 1;
                      break;
                    }
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                    {
                      mirrorGrid[i][j] = 0;
                      break;
                    }
                  default:
                    {
                      mirrorGrid[i][j] = 1;
                      break;
                    }
                }
            }
          
        }
    }
  for(i = 0; i < rows; i++)
    {
      for(j = 0; j < columns; j++)
        board[i][j] = mirrorGrid[i][j];
    }
}





//Rendering
ReactDOM.render(<Body />, document.getElementById('app'));
