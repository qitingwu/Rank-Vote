function populationCount(voting){
    var largest = -1;
    for(var row = 1; row<voting.length; row++){
        for(var column = 1; column<voting[0].length; column++){
            if(largest < voting[row][column]){
                largest = voting[row][column];
            }
        }
    }
    return largest;
}