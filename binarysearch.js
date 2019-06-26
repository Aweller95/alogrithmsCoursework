let fs = require("fs");

const linearSearch = (arr, value) => {
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == value){
      console.log('found at index ' + i)
      return i
    }
  }
  return -1
}

const binarySearch = (arr, value) => {
  let mid,
  low = 0,
  high = arr.length -1;
  let guesses = 0;
  
  while(low <= high){
    mid = Math.floor((low + high)/2);
    
    if(arr[mid] === value){
      console.log('took ' + guesses + ' guesses')
      return mid;
    }
    
    else if(arr[mid] < value){
      low = mid + 1;
      guesses += 1
    } else {
      high = mid - 1;
      guesses += 1
    }
  }
  return -1;
}

function toCSVLine(array){
	return array.join(',') + '\n'
}

function getNanoTime(){
	var nanoTime = process.hrtime()
	return nanoTime[0] * 1000000000 + nanoTime[1];
}

function generateArray(){
  let arr = []
  for(let i = 0; i < 1001; i++ ){
    arr.push(i)
  }
  return arr
}

function runTenTimes(){
  let times = []
  
  for(let i = 0; i < 10; i++){
    var numToGuess = Math.floor(Math.random() * arraySize[0]);
    var data = generateArray()
    console.log('secret number is: ' + numToGuess);

    var startTime = getNanoTime();
    console.log(binarySearch(data, numToGuess));
    var endTime = getNanoTime();
    var time = endTime - startTime;

    console.log('time elapsed ' + time + ' nanoseconds\n')
    times.push(time)
  }
  return times
}

let arraySize = [1000]
let compiledData = runTenTimes()
let csvContent = toCSVLine(arraySize) + toCSVLine(compiledData);

fs.writeFile("temp.csv", csvContent, (err) => {
	if (err) console.log(err)
	console.log("successfully written to file")
});
