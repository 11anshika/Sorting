const container = document.querySelector(".data-container");

// Function to generate bars
function generatebars(num = 20) {
    container.innerHTML = '';

    for (let i = 0; i < num; i += 1) {
        const value = Math.floor(Math.random() * 100) + 1;

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.style.transform = `translateX(${i * 30}px)`;

        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;

        bar.appendChild(barLabel);
        container.appendChild(bar);
    }
}

// Merge Sort helper functions
async function mergeSort(low, high, delay) {
    if (low >= high) return;

    const mid = Math.floor((low + high) / 2);
    
    // Divide
    await mergeSort(low, mid, delay);
    await mergeSort(mid + 1, high, delay);

    // Conquer
    await merge(low, mid, high, delay);
}

async function merge(low, mid, high, delay) {
    let bars = document.querySelectorAll(".bar");
    let left = [], right = [];
    
    // Create temporary arrays for left and right
    for (let i = low; i <= mid; i++) {
        left.push(parseInt(bars[i].childNodes[0].innerHTML));
    }
    for (let i = mid + 1; i <= high; i++) {
        right.push(parseInt(bars[i].childNodes[0].innerHTML));
    }

    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        // Set background color for comparison
        bars[k].style.backgroundColor = "red";
        if (k + 1 < bars.length) {
            bars[k + 1].style.backgroundColor = "red";
        }
        await new Promise((resolve) =>
            setTimeout(() => resolve(), delay)
        );

        if (left[i] <= right[j]) {
            bars[k].style.height = `${left[i] * 3}px`;
            bars[k].childNodes[0].innerText = left[i];
            i++;
        } else {
            bars[k].style.height = `${right[j] * 3}px`;
            bars[k].childNodes[0].innerText = right[j];
            j++;
        }
        k++;
        if (k - 1 < bars.length) {
            bars[k - 1].style.backgroundColor = "rgb(24, 190, 255)";
        }
    }

    while (i < left.length) {
        bars[k].style.height = `${left[i] * 3}px`;
        bars[k].childNodes[0].innerText = left[i];
        i++;
        k++;
    }

    while (j < right.length) {
        bars[k].style.height = `${right[j] * 3}px`;
        bars[k].childNodes[0].innerText = right[j];
        j++;
        k++;
    }

    // Mark sorted
    for (let x = low; x <= high; x++) {
        bars[x].style.backgroundColor = "rgb(49, 226, 13)";
    }
}

async function startMergeSort() {
    disable(); // Disable buttons to prevent interaction during sorting
    let bars = document.querySelectorAll(".bar");
    await mergeSort(0, bars.length - 1, 300);

    // Enable buttons after sorting is complete
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1").style.backgroundColor = "#6f459e";

    document.getElementById("Button2").disabled = false;
    document.getElementById("Button2").style.backgroundColor = "#6f459e";
}

// Call "generatebars" function
generatebars();

// Function to generate new random array
function generate() {
    window.location.reload();
}

// Function to disable the buttons
function disable() {
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button1").style.backgroundColor = "#d8b6ff";

    document.getElementById("Button2").disabled = true;
    document.getElementById("Button2").style.backgroundColor = "#d8b6ff";
}
