let fs = require("fs");

const buildArraySizes = (max, increment) => {
  let arr = []
  for(let i = 0; i < max + increment; i += increment){
    arr.push(i)
  }
  return arr
}

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

function generateArray(size){
  let arr = []
  for(let i = 0; i < size + 1; i++ ){
    arr.push(i)
  }
  return arr
}

function runXTimes(arr, func, iterations){ //TODO: allow for interation through generated dataSet
  let times = []
  
  for(let a = 0; a < arr.length; a++){
    for(let i = 0; i < iterations; i++){
      var numToGuess = Math.floor(Math.random() * dataSet[0]);
      var data = generateArray(arr[a])
      console.log('secret number is: ' + numToGuess);
  
      var startTime = getNanoTime();
      console.log(func(data, numToGuess));
      var endTime = getNanoTime();
      var time = endTime - startTime;
  
      console.log('time elapsed ' + time + ' nanoseconds\n')
      times.push(time)
    }
  }
  return times
}

let dataMaxSize = 10000 // amount of elements to be generated in dataSet array
let dataIncrement = 500 // increment each element in dataSet array by this amount
let testIterations = 10 // indicate how many times to run an algorithm for each dataSet element

let dataSet = buildArraySizes(dataMaxSize, dataIncrement)
let binaryData = runXTimes(dataSet, binarySearch, testIterations)
let linearData = runXTimes(dataSet, linearSearch, testIterations)
let binaryContent = toCSVLine(['Binary Search']) + toCSVLine(dataSet) + toCSVLine(binaryData);
let linearContent = toCSVLine(['Linear Search']) + toCSVLine(dataSet) + toCSVLine(linearData);

fs.writeFile("binaryData.csv", binaryContent, (err) => {
	if (err) console.log(err)
	console.log("successfully written to file")
});

fs.writeFile("linearData.csv", linearContent, (err) => {
	if (err) console.log(err)
	console.log("successfully written to file")
});
