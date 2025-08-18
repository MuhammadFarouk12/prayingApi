city.focus();
async function getTimes(city, countryCode){
  document.getElementById("city").focus()
  document.getElementById("show_city").innerText = city.toUpperCase() + " City "
  document.getElementById("show_country").innerText = countryCode.toUpperCase() + " Country"
  try {
    const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}`)
    const parsedResponse = await response.json();
    const times = parsedResponse.data.timings
    let container = ""
    for (const time in times) {
      container += `<li><span class="cell">${time}</span><span class="cell">${times[time]}</span></li>`
    }
    document.getElementById("times_container").innerHTML = container
  } catch(err){
    console.log("Faild: " + err.message)
  }
}

document.getElementById("getTimes").onclick = ()=> getTimes(city.value, code.value)
