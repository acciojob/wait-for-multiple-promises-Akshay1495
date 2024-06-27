function createRandomPromise(index) {
    return new Promise((resolve) => {
        const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ index: index, time: time });
        }, time * 1000);
    });
}

// Create an array of promises
const promises = [createRandomPromise(1), createRandomPromise(2), createRandomPromise(3)];

// Get reference to the table body
const tableBody = document.getElementById("output");

// Function to update the table after promises resolve
function updateTable(results) {
    // Remove the loading row
    const loadingRow = document.getElementById("loadingRow");
    if (loadingRow) {
        tableBody.removeChild(loadingRow);
    }

    // Calculate total time taken to resolve all promises
    const totalTime = results.reduce((sum, result) => sum + result.time, 0);

    // Populate the table with the results
    results.forEach((result) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.innerHTML = `Promise ${result.index}`;
        cell2.innerHTML = result.time.toFixed(3);
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement('tr');
    const totalCell1 = document.createElement('td');
    const totalCell2 = document.createElement('td');
    totalCell1.innerHTML = "Total";
    totalCell2.innerHTML = totalTime.toFixed(3);
    totalRow.appendChild(totalCell1);
    totalRow.appendChild(totalCell2);
    tableBody.appendChild(totalRow);
}

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
    updateTable(results);
});