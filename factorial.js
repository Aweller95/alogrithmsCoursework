const factorial = (n) => {
  if(n === 2){
    return 1
  } else {
    return factorial(n - 1) + (n - 1)
  }
}

console.log(factorial(4000))