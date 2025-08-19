// Focus on the city input field when the page loads (UX improvement)
city.focus();

/**
 * Fetches and displays prayer times for a given city and country.
 * 
 * @param {string} city - The name of the city (e.g., "London")
 * @param {string} countryCode - The country code (e.g., "UK")
 * @param {boolean} wantsAll - If true, show all prayer times; if false, show only 5 main ones
 * 
 * Uses the Aladhan API to get Islamic prayer times.
 */
async function getTimes(city, countryCode, wantsAll) {
  // Refocus on the city input (keeps UX consistent, especially on mobile)
  document.getElementById("city").focus();

  // Update the UI to show which city and country are being used
  document.getElementById("show_city").innerText = city.toUpperCase() + " City ";
  document.getElementById("show_country").innerText = countryCode.toUpperCase() + " Country";

  try {
    // Construct the API URL with city and country, then fetch data
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}`);

    // Parse the JSON response from the API
    const parsedResponse = await response.json();

    // Extract the prayer times from the response
    const times = parsedResponse.data.timings;

    // This will hold the HTML for the list of prayer times
    let container = "";

    // Counter to track position in the times object (used when filtering to 5 prayers)
    let current = 0;

    // Loop through each prayer time (e.g., Fajr, Dhuhr, etc.)
    for (const time in times) {
      if (wantsAll) {
        // If user wants all times, display every prayer
        container += `<li><span class="cell">${time}</span><span class="cell">${times[time]}</span></li>`;
      } else {
        // Otherwise, show only the 5 main prayers: Fajr, Dhuhr, Asr, Maghrib, Isha
        // These correspond to indices: 0=Fajr, 2=Dhuhr, 3=Asr, 5=Maghrib, 6=Isha
        const fiveTimes = [0, 2, 3, 5, 6];
        if (fiveTimes.includes(current)) {
          container += `<li><span class="cell">${time}</span><span class="cell">${times[time]}</span></li>`;
        }
        current++; // Increment counter for each prayer
      }
    }

    // Insert the generated HTML into the page
    document.getElementById("times_container").innerHTML = container;

  } catch (err) {
    // If the fetch fails (network error, invalid city, etc.), log the error
    console.log("Failed: " + err.message);
    // Optional: show user-friendly message in UI
    document.getElementById("times_container").innerHTML = 
      `<li class="error">Failed to load prayer times. Check city/country and try again.</li>`;
  }
}

/**
 * Attach click event to the "Get Times" button.
 * When clicked, calls getTimes() with:
 * - city input value
 * - country code input value
 * - whether the "Show All" checkbox is checked
 */
document.getElementById("getTimes").onclick = () => 
  getTimes(
    city.value, 
    code.value, 
    document.getElementById("wantsAll").checked
  );
