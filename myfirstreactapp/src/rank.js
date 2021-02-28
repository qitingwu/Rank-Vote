// let row0 = ["Timestamp", "[1st]","[2nd]","[3rd]"];
// let row1 = ["1/1/11","1","3","2"];
// let row2 = ["1/2/33","3","1","2"];
// let row3 = ["2/1/33","2","3","1"];
// let row4 = ["2/1/11","1","2","3"];
// let vote = [row0,row1,row2,row3,row4];//csv file

let population = 3; //get this from asking the user?
let participants = [];

function fillParticipants(){
    for(var i=1; i<=population; i++){
        participants.push(i);
    }
}

export const populationCount = (voting) =>{
    var largest = -1;
    for(var row = 1; row<voting.length; row++){
        for(var column = 1; column<voting[0].length; column++){
            if(largest < parseInt(voting[row][column])){
                largest = parseInt(voting[row][column]);
            }
        }
    }
    return largest;
}

export const tieBreakWinner = (ties, population, votes, maxRank) => {
    for (var rank = 2; rank <= maxRank; rank++) {
        var numVotes = new Array(population+1).fill(0);
        numVotes[0] = -1;
        var winningCand = 0;
        var newTies = [];
        for(var i=0;i<ties.length;i++){
            var cand = ties[i];
        //ties.forEach (cand => 
            for(var j=0;j<votes.length;j++){
                var vote = votes[j];
            //votes.forEach (vote => {
                if (vote[cand] == rank) {
                    numVotes[cand]++;
                    if (numVotes[cand] > numVotes[winningCand]) {
                        winningCand = cand;
                        newTies = [];
                    } else if (cand != winningCand && numVotes[cand] == numVotes[winningCand]){
                        newTies.push(cand);
                    }
                }
            
            }
        }
        if (newTies.length == 0) {
            return winningCand;
        }
    }
    return -1;
}

export const rank = (vote) => {
    vote=vote.result;
    population=populationCount(vote);
    console.log(population);
    //make sure we have csv array and number of participants
    fillParticipants();

    //Each time, we need to determine last place
    var numRemainingParticipants = population;
    var eliminated = new Array(population+1).fill(false);

    while (numRemainingParticipants > 1) {
        var numVotes = new Array(population+1).fill(0);
        var ties = [];
        var losingIndex = 0;
        numVotes[losingIndex] = vote.length; // maximum - the total number of votes
        var threshold = numRemainingParticipants / 2;
        for(var rowNum=1;rowNum<vote.length;rowNum++){
            var row = vote[rowNum];
            for (var participantNum = 1; participantNum <= participants.length; participantNum++) {
                if (eliminated[participantNum]){
                    continue;
                }
                if (row[participantNum] == 1) {
                    numVotes[participantNum]++;

                    // Check if 50% of the votes have been gained
                    if (numVotes[participantNum] >= threshold) {
                        return participantNum;
                    }
                } else if (numVotes[participantNum] < numVotes[losingIndex]) {
                    losingIndex = participantNum;
                    ties = [];
                } else if (participantNum != losingIndex && numVotes[participantNum] == numVotes[losingIndex]) {
                    ties.push(participantNum);
                }
            }
        }
        if (numRemainingParticipants - ties.length == 0) {
            return tieBreakWinner(ties, population, vote, population);
        }
        eliminated[losingIndex] = true;
        for(var i=0;i<vote.length;i++){
            var row = vote[i];
            if(row[losingIndex] == 1) {
                for (var j=1; j < vote.length; j++) {
                    row[j]--;
                }
                row[losingIndex] = 9999999;
            }
        }
        numRemainingParticipants--;
        
        for(var i=0;i<ties.length;i++){
            var tie = ties[i];
            eliminated[tie] = true;
            for(var i=0;i<vote.length;i++){
                var row = vote[i];
                if(row[tie] == 1) {
                    for (var j=1; j < vote.length; j++) {
                        row[j]--;
                    }
                    row[losingIndex] = 9999999;
                }
            }
            numRemainingParticipants--;
        }

    }

    for(var i = 1; i <= participants.length; i++) {
        if (eliminated[i] == false) {
            return i;
        }
    }
    return -1;
}