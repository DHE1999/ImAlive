"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hutLocation = document.getElementById("hutLocation");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");
const addTrampers = document.getElementById('addTrampers');
const removeTrampers = document.getElementById('removeTrampers');
const counterDisplay = document.getElementById('counterDisplay');
let huts = [];
let trampers = 1;
function callHutAndCampApis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiUrl = 'https://api.doc.govt.nz/v2/huts';
            const response = yield fetch(apiUrl, {
                method: 'GET', // You can specify other HTTP methods like POST
                headers: {
                    'accept': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            huts = yield response.json();
            console.log('API Response:', response.status);
        }
        catch (error) {
            console.error('Error fetching data from api');
        }
    });
}
callHutAndCampApis();
searchButton.addEventListener('click', function () {
    console.log("Searched for Hut/Campsite:", hutLocation.value);
    const name = hutLocation.value;
    const filteredHutNames = huts
        .filter(hut => hut.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        .map(hut => hut.name);
    resultsContainer.innerHTML = ""; // reset the list field so data isn't concatenated each search
    if ((huts.length == 0 && hutLocation.value == '') || filteredHutNames.length == 0) {
        const item = document.createElement("li");
        item.textContent = "We can't find any huts out there!?";
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
});
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
});
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
