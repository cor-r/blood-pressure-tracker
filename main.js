
function closeModal() {
  document.getElementById("submit").style.display = "none";
  document.getElementById("submit-dark").style.display = "none";
  document.getElementById("diastolic").value = "";
  document.getElementById("systolic").value = "";
  document.getElementById("date").value = "";
}

function openModal() {
  document.getElementById("submit").style.display = "block";
  document.getElementById("submit-dark").style.display = "block";
}

var chart;
window.onload = function () {
  var canvas = document.getElementById('chart');

  chart = new Chart(canvas, {
    type: 'line',

    data: {
      labels: loadDatesFromLocalStorage() || [],
      datasets: [{
        label: 'Systolic',
        yAxisID: 'y',
        borderColor: "blue",
        data: loadSystolicDataFromLocalStorage() || []
      }, {
        label: 'Diastolic',
        yAxisID: 'y1',
        borderColor: "red",
        data: loadDiastolicDataFromLocalStorage() || []
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',


            grid: {
              drawOnChartArea: false,
            },
          },

        }]
      }

    }

  }
  );
}

var inc = parseInt(localStorage.getItem("count")) || 0;

function addElement() {
  var diastolicData = document.getElementById("diastolic").value;
  var systolicData = document.getElementById("systolic").value;
  var date = document.getElementById("date").value;
  const formattedDate = formatDate(date);
  chart.data.datasets[0].data[inc] = systolicData;
  chart.data.datasets[1].data[inc] = diastolicData;
  chart.data.labels[inc++] = formattedDate;
  chart.update();
  saveToLocalStorage(formattedDate, systolicData, diastolicData);
  document.getElementById("diastolic").value = "";
  document.getElementById("systolic").value = "";
  document.getElementById("date").value = "";
  localStorage.setItem("count", inc);

}

function formatDate(inputDate) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + 1);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function randomData() {
  for (var i = 0; i < 20; i++) {
    var randomDiastolic = Math.floor(Math.random() * (92 - 50) + 50);
    var randomSystolic = Math.floor(Math.random() * (140 - 90) + 90);
    chart.data.datasets[0].data[inc] = randomSystolic;
    chart.data.datasets[1].data[inc] = randomDiastolic;
    chart.data.labels[inc++] = "Gen. Date";

    saveToLocalStorage("Gen. Data", randomSystolic, randomDiastolic);
    chart.update();

    localStorage.setItem("count", inc);
  }

}

function saveToLocalStorage(date, systolic, diastolic) {
  let storedDates = loadDatesFromLocalStorage() || [];
  storedDates.push(date);
  localStorage.setItem('dates', JSON.stringify(storedDates));

  let storedSystolic = loadSystolicDataFromLocalStorage() || [];
  storedSystolic.push(systolic);
  localStorage.setItem('systolicData', JSON.stringify(storedSystolic));

  let storedDiastolic = loadDiastolicDataFromLocalStorage() || [];
  storedDiastolic.push(diastolic);
  localStorage.setItem('diastolicData', JSON.stringify(storedDiastolic));

}

function loadDatesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('dates'));
}

function loadSystolicDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('systolicData'));
}

function loadDiastolicDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('diastolicData'));
}

function resetReadings() {
  localStorage.removeItem("dates");
  localStorage.removeItem("systolicData");
  localStorage.removeItem("diastolicData");
  localStorage.removeItem("count");
  window.location.reload();
}