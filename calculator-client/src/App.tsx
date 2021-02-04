import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './Components/Calculator.css';
import Frame from './Components/Frame';
import axios from 'axios';
import Pin from './Components/Pin'

class App extends Component {
  state = {
    frames:[],
    pins:0,
    
  }
  componentDidMount(){
    axios.get('http://localhost:5000/api/bowling/get')
    .then((response)=>{
      console.log(response)
      this.setState({
        frames: response.data.frameList,
        pins:Number(response.data.pinsLeft),
      })
    })
  
  }
  knockHandler =(val:any)=>{
    console.log(10-Number(val))
   
   
     
    axios.post('http://localhost:5000/api/bowling/post',{"pins": val})
    .then((response)=>{
      console.log(response)
      this.setState({
        frames: response.data.frameList,
        pins:Number(response.data.pinsLeft),
   
      })
     })
  
  }

reset=()=>{
  axios.get('http://localhost:5000/api/bowling/Reset')
  .then((response)=>{
    this.setState({
      frames: response.data.frameList,
      pins:Number(response.data.pinsLeft),
    })
  })
}



  render(){
    let frames = this.state.frames;
   frames.map((frame : any) => {
      frame.firstShotScore = frame.firstShotScore=="-1"?"":frame.firstShotScore
    })
    frames.map((frame : any) => {
      frame.secondShotScore = frame.secondShotScore=="-1"?"":frame.secondShotScore
    })
    frames.map((frame : any) => {
      frame.thirdShotScore = frame.thirdShotScore=="-1"?"":frame.thirdShotScore
    })
    let pins = this.state.pins;
    return (
      <div className="App">
         <div className="pins">
          <h1 className="">Click to knock down pins</h1>
          {[...Array(pins+1)].map((e, i) => <Pin click={this.knockHandler.bind(this,i)} pin_num={i}/>)}
          </div>
          <div className="game-table">
         {frames.map((frame : any) =>      
                    <Frame 
                    position={frame.position}
                    shotOne={frame.status=="2"?frame.secondShotScore="X":frame.firstShotScore}
                    shotTwo={frame.status=="3"?"/":frame.secondShotScore}
                    shotThreeClass={frame.tenthFrame?"shot3":""}
                    shotThree={frame.tenthFrame?frame.thirdShotScore:""}
                    frame_total={frame.frameComputed?frame.runningTotal:""}
                    />
                     
                    )}
      </div>
      <button className="reset-button" onClick={this.reset} value="4">Reset</button>
      </div>
    );
  }
}

export default App;
