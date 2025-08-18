city.focus();
async function getTimes(city, countryCode){
  console.log("Starting . . .")
  document.getElementById("show_city").innerText = city.toUpperCase() + " City "
  document.getElementById("show_country").innerText = countryCode.toUpperCase() + " Country"
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}`)
  const parsedResponse = await response.json();
  const times = parsedResponse.data.timings
  let container = ""
  for (const time in times) {
    console.log(time + " : " + times[time])
    container += `<li>${time} : ${times[time]}</li>`
  }
    document.getElementById("times_container").innerHTML = container
}

document.getElementById("getTimes").onclick = ()=> getTimes(city.value, code.value)
