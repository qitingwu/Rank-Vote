let row0 = ["Timestamp", "[1st]","[2nd]","[3rd]"];
let row1 = ["1/1/11","1","3","2"];
let row2 = ["1/2/33","3","1","2"];
let row3 = ["2/1/33","2","3","1"];
let row4 = ["2/1/11","1","2","3"];
let vote = [row0,row1,row2,row3,row4];//csv file

let population = 3; //get this from asking the user?
let participants = [];

function fillParticipants(){
    for(var i=1; i<=population; i++){
        participants.push(i);
    }
}

function rank(){
    //make sure we have csv array and number of participants
    fillParticipants();
    //start ranking
    
    for(var row=1;row<vote[0][0].length;row++){

    }

}