import React, {Component} from 'react';
import { parse } from "papaparse";
import './App.css';
import {rank} from './rank.js';
import Drumroll from './drumroll.mp3';
import {Howl,Howler} from 'howler';

var result = [];

const audioClips = {sound: Drumroll};

class RankVote extends Component{
  constructor(props){
    super(props);
    this.state = {
      vote: []
    };
  }

  SoundPlay = (src) =>{
    const sound = new Howl({src});
    sound.play();
  }

  updateVote = () => {
    this.setState({vote: {result}});
  }
  
  render(){
    Howler.volume(0.5);
    if(this.state.vote.length === 0){
      return(
        <div className="page">
        <h1>Rank Voting Calculator</h1>
        <div className="dropbox"
            //prevents users from downloading the file when dropping the file
            onDragOver={(e)=>{
                e.preventDefault();
            }}
            onDrop={(e)=>{
                e.preventDefault();
                this.SoundPlay(audioClips.sound);
                //console.log(e.dataTransfer.files);//checks if file is being dropped in.
                Array.from(e.dataTransfer.files)
                .filter(
                    //makes sure the file drop in is only type .csv
                    (file) => file.type === "text/csv" || file.type === "application/vnd.ms-excel"
                ).forEach(async (file) => {
                    //console.log(file);
                    const text = await file.text();
                    result = parse(text).data;
                    this.updateVote();
                    console.log(result);
                }); 
            }}
        >Please drop your csv file here</div>
      
      
      </div>
      );
    }
    else
    {
      return(
        <div className="page">
        <h1>Rank Voting Calculator</h1>
        <div className="dropbox"
            //prevents users from downloading the file when dropping the file
            onDragOver={(e)=>{
                e.preventDefault();
            }}
            onDrop={(e)=>{
                e.preventDefault();
                this.SoundPlay(audioClips.sound);
                //console.log(e.dataTransfer.files);//checks if file is being dropped in.
                Array.from(e.dataTransfer.files)
                .filter(
                    //makes sure the file drop in is only type .csv
                    (file) => file.type === "text/csv" || file.type === "application/vnd.ms-excel"
                ).forEach(async (file) => {
                    //console.log(file);
                    const text = await file.text();
                    result = parse(text).data;
                    this.updateVote();
                    console.log(result);
                }); 
            }}
        >Please drop your csv file here</div>
        <h1>And the winner is.....</h1>
        <h1>Participant Number: {rank(this.state.vote)}</h1>
      
      </div>
      );
    }
  }
}

export default RankVote;
