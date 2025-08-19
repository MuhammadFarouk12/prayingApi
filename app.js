city.focus();
async function getTimes(city, countryCode, wantsAll){
  document.getElementById("city").focus()
  document.getElementById("show_city").innerText = city.toUpperCase() + " City "
  document.getElementById("show_country").innerText = countryCode.toUpperCase() + " Country"
  try {
    const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}`)
    const parsedResponse = await response.json();
    const times = parsedResponse.data.timings
    let container = ""
    let current = 0
    for (const time in times) {
      if (wantsAll) {
        container += `<li><span class="cell">${time}</span><span class="cell">${times[time]}</span></li>`
      } else {
        const fiveTimes = [0, 2, 3, 5, 6]
        if(fiveTimes.includes(current)){
          container += `<li><span class="cell">${time}</span><span class="cell">${times[time]}</span></li>`
        }
        current++
      }
    }
    document.getElementById("times_container").innerHTML = container
  } catch(err){
    console.log("Faild: " + err.message)
  }
}

document.getElementById("getTimes").onclick = ()=> getTimes(city.value, code.value, document.getElementById("wantsAll").checked)
