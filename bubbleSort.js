function getRandomInt() {
	return Math.floor(Math.random() * 100);
}

function getNanoTime(){
	var nanoTime = process.hrtime()
	return nanoTime[0] * 1000000000 + nanoTime[1];
}

const largeArray = max => {
	let arr = []
	for(let i = 0; i < max; i++){
		arr.push(getRandomInt(max))
	}
	return arr
}

function bubbleSort(a)
{
    var swapped;
    do {
    	swapped = false;
    	for (var i=0; i < a.length-1; i++) {
        	if (a[i] > a[i+1]) {
            	var temp = a[i];
            	a[i] = a[i+1];
            	a[i+1] = temp;
            	swapped = true;
        	}
    	}
    } while (swapped);
}

function selectionSort(list) {
  for (var i = 0; i < list.length - 1; i++) {
    var min = i;

    for (var j = i + 1; j < list.length; j++) {
      if (list[j] < list[min]) {
        min = j;
      }
    }

    if (min !== i) {
      swap(list, i, min);
    }
  }
}

function insertionSort(list) {
  for (var i = 0; i < list.length; i++) {
    for (var j = i; j > 0; j--) {
      if (list[j] < list[j - 1]) {
        swap(list, j, j - 1);
      } else {
        break;
      }
    }
  }
}

function mergeSort(list) {
  if (list.length === 1) {
    return list;
  }

  var listA = mergeSort(list.slice(0, list.length / 2));
  var listB = mergeSort(list.slice(list.length / 2));

  var i = 0;
  var j = 0;

  var newList = [];

  while (i < listA.length || j < listB.length) {
    if (i !== listA.length && (listA[i] < listB[j] || j === listB.length)) {
      newList.push(listA[i]);
      i++;
    } else {
      newList.push(listB[j]);
      j++;
    }
  }

  return newList;
}

var a = largeArray(1000);
var b = largeArray(5000);
var c = largeArray(10000);
var d = largeArray(20000);

var columns = ['', a.length, b.length, c.length, d.length]

function sortTime(func, arr){
	var startTime = getNanoTime()
	func(arr);
	var endTime = getNanoTime()
	var time = endTime - startTime
	return time
}

function sortAllTimes(func){
	let time1 = sortTime(func, a)
	let time2 = sortTime(func, b)
	let time3 = sortTime(func, c)
	let time4 = sortTime(func, d)
	return [time1, time2, time3, time4]
}

var bubbleData = sortAllTimes(bubbleSort)
var selectData = sortAllTimes(selectionSort)
var insertData = sortAllTimes(insertionSort)
var mergeData = sortAllTimes(mergeSort)

bubbleData.unshift('BubbleSort');
selectData.unshift('SelectionSort');
insertData.unshift('InsertionSort');
mergeData.unshift('MergeSort');

function toCSVLine(array){
	return array.join(',') + '\n'
}

let fs = require("fs");

let csvContent = toCSVLine(columns) + toCSVLine(bubbleData) + toCSVLine(selectData) + toCSVLine(insertData) + toCSVLine(mergeData);

fs.writeFile("temp.csv", csvContent, (err) => {
	if (err) console.log(err)
	console.log("successfully written to file")
});