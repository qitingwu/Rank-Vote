import React from "react";
import { parse } from "papaparse";
import Header from './Header'
import './App.css';
import {rank} from './rank.js';

var vote = [];

export default function App(){
  
    return(
      <div>
      <h1>Rank Voting Calculator</h1>
      <div className="dropbox"
          //prevents users from downloading the file when dropping the file
          onDragOver={(e)=>{
              e.preventDefault();
          }}
          onDrop={(e)=>{
              e.preventDefault();
              //console.log(e.dataTransfer.files);//checks if file is being dropped in.
              Array.from(e.dataTransfer.files)
              .filter(
                  //makes sure the file drop in is only type .csv
                  (file) => file.type === "text/csv" || file.type === "application/vnd.ms-excel"
              ).forEach(async (file) => {
                  //console.log(file);
                  const text = await file.text();
                  const result = parse(text);
                  vote= result;
                  console.log(vote);
              }); 
          }}
      >Please drop your csv file here</div>
    <Header vote={vote} />
    
    
    </div>
    );
}

