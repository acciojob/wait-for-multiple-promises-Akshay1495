//your JS code here. If required.
// Create a function that returns a promise that resolves after a random time
const createRandomPromise = () => {
  const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
};

// Create an array of three promises
const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

// Get the table body element
const tbody = document.querySelector("tbody");

// Add a row with "Loading..." text
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tbody.appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    tbody.removeChild(loadingRow);

    // Populate the table with the results
    results.forEach((time, index) => {
      const row = document.createElement("tr");
      const promiseCell = document.createElement("td");
      const timeCell = document.createElement("td");

      promiseCell.textContent = `Promise ${index + 1}`;
      timeCell.textContent = (time / 1000).toFixed(3); // Convert milliseconds to seconds

      row.appendChild(promiseCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });

    // Calculate the total time taken
    const totalTime = results.reduce((acc, time) => acc + time, 0);
    const totalRow = document.createElement("tr");
    const totalPromiseCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");

    totalPromiseCell.textContent = "Total";
    totalTimeCell.textContent = (totalTime / 1000).toFixed(3);

    totalRow.appendChild(totalPromiseCell);
    totalRow.appendChild(totalTimeCell);
    tbody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("Error:", error);
  });