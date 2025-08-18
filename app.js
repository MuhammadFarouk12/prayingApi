async function getTimes(city, countryCode){
  console.log("Starting . . .")
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}`)
  const parsedResponse = await response.json();
  console.log(parsedResponse.data.timings)
}

document.getElementById("getTimes").onclick = ()=> getTimes(city.value, code.value)
