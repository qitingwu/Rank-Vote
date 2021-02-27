import React from "react";
import { parse } from "papaparse";

export default function App(){
    return(
        <div>
            <h1 className="text-center text-4xl">Rank Voting Calculator</h1>
            <div className={`p-6 my-2 mx-auto max-w-md border-2`}
                //prevents users from downloading the file when dropping the file
                onDragOver={(e)=>{
                    e.preventDefault();
                }}
                onDrop={(e)=>{
                    e.preventDefault();
                    console.log(e.dataTransfer.files);//checks if file is being dropped in.
                    Array.from(e.dataTransfer.files).select(
                        //makes sure the file drop in is only type .csv
                        (file) => file.type === "text/csv"
                    ).forEach(file => {
                        console.log(file);
                    }); 
                }}
            >Please drop your csv file here</div>
        </div>
    );
}