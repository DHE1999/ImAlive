

const hutLocation = document.getElementById("hutLocation")! as HTMLInputElement;
const searchButton = document.getElementById("searchButton")! as HTMLInputElement;
const resultsContainer = document.getElementById("resultsContainer")! as HTMLElement;

const addTrampers = document.getElementById('addTrampers')! as HTMLImageElement;
const removeTrampers = document.getElementById('removeTrampers')! as HTMLImageElement;
const counterDisplay = document.getElementById('counterDisplay')! as HTMLElement

interface Hut {
  name: string;
}

let huts: Hut[] = [];
let trampers: number = 1;

async function callHutAndCampApis() {
  try {
    const apiUrl = 'https://api.doc.govt.nz/v2/huts';
    const response = await fetch(apiUrl, {
      method: 'GET',  // You can specify other HTTP methods like POST
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    huts = await response.json();
    console.log('API Response:', response.status);
  } catch (error) {
    console.error('Error fetching data from api');
  }
}

callHutAndCampApis();

searchButton.addEventListener('click', function () {
    console.log("Searched for Hut/Campsite:", hutLocation.value);
    const name : string = hutLocation.value as string;
    
    const filteredHutNames: string[] = huts
        .filter(hut => hut.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        .map(hut => hut.name)

    resultsContainer.innerHTML = ""; // reset the list field so data isn't concatenated each search

    if ((huts.length == 0 && hutLocation.value == '') || filteredHutNames.length == 0){
      const item = document.createElement("li");
      item.textContent = "We can't find that hut/campsite out there!?";
      resultsContainer.appendChild(item);
      return;
    } 

    console.log("found", filteredHutNames.length, "hut/s");
    
    // sort the filtered huts by case (insensitive)
    filteredHutNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // add the hut names to a unordered list tag (in alphabetical order lol ^)
    filteredHutNames.forEach(hutName => {
      const item = document.createElement("li");
      item.textContent = hutName;
      resultsContainer.appendChild(item);
    });
})

// Add a click event listener to the image
addTrampers.addEventListener('click', () => {
    trampers++; // Increment the counter
    counterDisplay.textContent = trampers.toString(); // Update the counter display
});

removeTrampers.addEventListener('click', () => {
    if (trampers > 1) {
        trampers--;
        counterDisplay.textContent = trampers.toString();
    }
})

// Add a mouseover event listener
addTrampers.addEventListener('mouseover', () => {
    addTrampers.style.transform = 'scale(1.2)'; // Scale the image up
});

addTrampers.addEventListener('mouseout', () => {
    addTrampers.style.transform = 'scale(1)'; // Scale the image up
});

// Add a mouseout event listener
removeTrampers.addEventListener('mouseover', () => {
    removeTrampers.style.transform = 'scale(1.2)'; // Reset the image scale
});
// Add a mouseout event listener
removeTrampers.addEventListener('mouseout', () => {
    removeTrampers.style.transform = 'scale(1)'; // Reset the image scale
});