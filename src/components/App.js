import React, { useEffect, useState,useRef } from 'react'

const App = () => {
   const [trackingTime,setTrackingTime]=useState(0);
   const [lapItem,SetLapItem]=useState([]);
   let intervalTime=useRef();
   
   useEffect(()=>{
    return ()=> clearInterval(intervalTime.current);
   },[])
  function handleStart(){
    clearInterval(intervalTime.current);
    if(!intervalTime.current){
    intervalTime.current=setInterval(()=>{
      setTrackingTime((prevTime)=>prevTime+1);
    },1);}
    

  }
  function handleStop(){
    if(intervalTime.current){
    clearInterval(intervalTime.current);
    intervalTime.current=null;}
  }
  function handleLap() {
    SetLapItem((prevItem) => [...prevItem, trackingTime])
  }
  function handleReset(){
    clearInterval(intervalTime.current);
    intervalTime.current=null
    setTrackingTime(0);
    SetLapItem([]);


  }
  function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

  return (
    <div>
         {`${pad(Math.floor(trackingTime / 3600))}:${pad(Math.floor((trackingTime / 60) % 60))}:${pad(trackingTime % 60)}`}
         <div>
         The lap items are :{lapItem.map((item,index)=>{
        return<ul> <li> <p key={index}> {`${pad(Math.floor(item / 3600))}:${pad(Math.floor((item / 60) % 60))}:${pad(item % 60)}`}</p></li> </ul>
         })}    </div>
        
         <div id="root" >
        <button onClick={handleStart} >Start</button>
        <button onClick={handleStop} >Stop</button>
        <button onClick={handleLap} >Lap</button>
        <button onClick={handleReset} >Reset</button></div>

    </div>
  )
}

export default App
