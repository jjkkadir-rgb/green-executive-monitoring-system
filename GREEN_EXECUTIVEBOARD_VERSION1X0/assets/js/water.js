// ==========================================
// WATER_USAGE
// ==========================================

// ==========================================
// ROLE ACCESS
// ==========================================

const role =

localStorage.getItem(
"role"
);

// Monthly Labels
const months=[
"Oct25",
"Nov25",
"Dec25",
"Jan26",
"Feb26",
"Mar26",
"Apr26"
];

const fullMonths=[
"Oct 2025",
"Nov 2025",
"Dec 2025",
"Jan 2026",
"Feb 2026",
"Mar 2026",
"Apr 2026"
];

// Consumption Data (m³)
const consumption=[
11888,
12903,
11974,
4714,
12371,
11983,
10355
];

// Cost Data (RM)
const cost=[
70925,
76989,
71971,
31864,
73799,
70683,
61191
];

// ==========================================
// Monthly Consumption Trend
// ==========================================

new Chart(
  document.getElementById("monthlyChart"),
  {
    type:'line',
    data:{
      labels:months,
      datasets:[{
        label:'Consumption (m³)',
        data:consumption,
        borderColor:'#1a73e8',
        backgroundColor:'rgba(26,115,232,.2)',
        fill:true,
        tension:.4
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{
          display:true
        }
      }
    }
  }
);

new Chart(

  document.getElementById(
"costChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:"Cost (RM)",

data:cost,

borderColor:"#34a853",

backgroundColor:
"rgba(52,168,83,.2)",

fill:true,

tension:.4

}]

}

});

new Chart(

document.getElementById(
"comparisonChart"
),

{

type:"bar",

data:{

labels:months,

datasets:[

{

label:"Consumption (m³)",

data:consumption,

backgroundColor:
"#1a73e8"

},

{

label:"Cost (RM)",

data:cost,

backgroundColor:
"#34a853"

}

]

}

});

// ==========================================
// Top 5 Highest Months (computed from months/consumption)
// ==========================================
(function(){
  try{
    const zipped = months.map((m,i)=>({month:fullMonths[i]||m, consumption: consumption[i]||0}));
    const top5 = zipped.sort((a,b)=>b.consumption - a.consumption).slice(0,5);
    const topLabels = top5.map(r=>r.month);
    const topValues = top5.map(r=>r.consumption);

    new Chart(document.getElementById('topChart'), {
      type: 'bar',
      data: {
        labels: topLabels,
        datasets: [{
          label: 'Consumption (m³)',
          data: topValues,
          backgroundColor: '#ea4335'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }catch(e){
    console.error('Failed to render topChart', e);
  }
})();

new Chart(

document.getElementById(
"peakChart"
),

{

type:"bar",

data:{

labels:[

"Oct25",
"Nov25",
"Dec25",
"Feb26"

],

datasets:[{

label:"Peak Demand",

data:[

11888,
12903,
11974,
12371

],

backgroundColor:"#ea4335"

}]

}

});

const movingAverage = consumption.map((_, index, array) => {
  const window = array.slice(Math.max(0, index - 2), index + 1);
  return Math.round(window.reduce((sum, value) => sum + value, 0) / window.length);
});

new Chart(

document.getElementById(
"movingChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:"Moving Average",

data:movingAverage,

borderColor:"#8e24aa",

fill:false,

tension:.4

}]

}

});

const efficiencySeries = cost.map((value, index) => Number((value / consumption[index]).toFixed(2)));

new Chart(

document.getElementById(
"efficiencyChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:"RM/m³",

data:efficiencySeries,

borderColor:"#34a853",

fill:false

}]

}

});

new Chart(

document.getElementById(
"performanceChart"
),

{

type:"radar",

data:{

labels:[

"Efficiency",
"Cost",
"Demand",
"Conservation",
"Quality"

],

datasets:[{

label:"2025 Index",

data:[

82,
78,
85,
80,
88

]

}]

}

});

new Chart(

document.getElementById(
"scoreChart"
),

{

type:"doughnut",

data:{

labels:[

"Achieved",
"Remaining"

],

datasets:[{

data:[

82,
18

],

backgroundColor:[

"#34a853",
"#eeeeee"

]

}]

}

});

new Chart(

document.getElementById(
"quarterChart"
),

{

type:"doughnut",

data:{

labels:[

"Q4 2025",
"Q1 2026"

],

datasets:[{

data:[

37665,
29428

]

}]

}

});

new Chart(

document.getElementById(
"yearChart"
),

{

type:"bar",

data:{

labels:fullMonths,

datasets:[{

label:"Consumption (m³)",

data:consumption,

backgroundColor:"#1a73e8"

},

{

label:"Cost (RM)",

data:cost,

backgroundColor:"#34a853"

}

]

},
options:{
  responsive:true,
  plugins:{legend:{display:true}},
  scales:{y:{beginAtZero:true}}
}

});

// ==========================================
// AI EXECUTIVE PANEL V2
// ==========================================

document.getElementById(
"executiveSummary"
).innerHTML=

`
Total water consumption reached
84,188 m³ with an estimated
annual cost of RM479,422.

November 2025 recorded the highest
consumption while January 2026 had the
lowest demand.
`;


document.getElementById(
"performanceIndicator"
).innerHTML=

`
Water Performance Index:

GOOD

Overall system efficiency:

82 / 100

Status:

STABLE
`;


document.getElementById(
"trendAnalysis"
).innerHTML=

`
Water demand remained relatively
stable throughout the monitored period.

Peak consumption occurred during
November due to seasonal factors and
increased facility usage.
`;


document.getElementById(
"costEfficiency"
).innerHTML=

`
Average water cost:

RM5.70 per m³

Overall cost efficiency:

GOOD
`;


document.getElementById(
"carbonEstimate"
).innerHTML=

`
Estimated annual water-related
carbon emissions:

240 tCO₂e

Carbon intensity:

LOW
`;


document.getElementById(
"forecast"
).innerHTML=

`
Projected monthly demand:

12,000 m³

Expected expenditure:

RM68,400/month
`;


document.getElementById(
"recommendation"
).innerHTML=

`
• Install water-efficient fixtures.

• Implement leak detection systems.

• Optimize irrigation schedules.

• Promote water conservation awareness.

• Explore rainwater harvesting systems.
`;

// ==========================================
// WATER TABLE DATA
// ==========================================

let waterData=[

{
month:"Oct 2025",
consumption:11888,
cost:70925
},

{
month:"Nov 2025",
consumption:12903,
cost:76989
},

{
month:"Dec 2025",
consumption:11974,
cost:71971
},

{
month:"Jan 2026",
consumption:4714,
cost:31864
},

{
month:"Feb 2026",
consumption:12371,
cost:73799
},

{
month:"Mar 2026",
consumption:11983,
cost:70683
},

{
month:"Apr 2026",
consumption:10355,
cost:61191
}

];

// ==========================================
// TABLE V2
// ==========================================

let currentPage = 1;
let rowsPerPage = 10;

function loadTable() {

let tableBody =
document.querySelector(
"#waterTable tbody"
);

tableBody.innerHTML = "";

let keyword =

document
.getElementById(
"searchInput"
)
.value
.toLowerCase();


let filteredData =

waterData.filter(row =>

row.month
.toLowerCase()
.includes(keyword)

);


let start =

(currentPage-1)
*
rowsPerPage;


let end =

start + rowsPerPage;


let pageData =

filteredData.slice(
start,
end
);


pageData.forEach(

(row,index)=>{

tableBody.innerHTML +=

`

<tr>

<td>

<input
type="checkbox"
class="rowCheck"
value="${index}">

</td>

<td>${row.month}</td>

<td>${row.consumption.toLocaleString()}</td>

<td>${row.cost.toLocaleString()}</td>

<td>

${(row.cost/row.consumption).toFixed(2)}

</td>

<td>

${
role==="viewer"

?

"View Only"

:

`

<button
onclick="editRow(${index})">

Edit

</button>

<button
onclick="deleteRow(${index})">

Delete

</button>

`

}

</td>

</tr>

`;

});


document
.getElementById(
"pageInfo"
)
.innerHTML=

`
Page ${currentPage}
`;

}

loadTable();

function hideViewerAddControls() {
  if (role === "viewer") {
    const waterAddSection = document.getElementById("waterAddSection");
    const waterAddBtn = document.getElementById("waterAddBtn");
    if (waterAddSection) {
      waterAddSection.style.display = "none";
    }
    if (waterAddBtn) {
      waterAddBtn.style.display = "none";
    }
    const addRecordButtons = document.querySelectorAll("button[onclick='addRecord()'], button[onclick=\"addRecord()\"]");
    addRecordButtons.forEach(btn => {
      if (!btn.closest("#waterAddSection")) {
        btn.style.display = "none";
      }
    });
  }
}

hideViewerAddControls();

document

.getElementById(
"searchInput"
)

.addEventListener(

"keyup",

()=>{

currentPage = 1;

loadTable();

});

function deleteRow(index){

if(

role==="viewer"

){

alert(

"Viewer does not have permission."

);

return;

}

if(

confirm(
"Delete record?"
)

){

waterData.splice(
index,
1
);

loadTable();

}

}

function editRow(index){

if(

role==="viewer"

){

alert(

"Viewer does not have permission."

);

return;

}

let newConsumption =

prompt(

"New Consumption (m³)",

waterData[index].consumption

);


let newCost =

prompt(

"New Cost (RM)",

waterData[index].cost

);


if(

newConsumption!==null &&
newCost!==null

){

waterData[index].consumption=

parseFloat(
newConsumption
);

waterData[index].cost=

parseFloat(
newCost
);

loadTable();

}

}

function addRecord(){

if(

role==="viewer"

){

alert(

"Viewer does not have permission."

);

return;

}

let month=

document
.getElementById(
"newMonth"
)
.value;


let consumption=

parseFloat(

document
.getElementById(
"newConsumption"
)
.value

);


let cost=

parseFloat(

document
.getElementById(
"newCost"
)
.value

);


if(

month==="" ||

isNaN(consumption) ||

isNaN(cost)

){

alert(

"Please complete all fields."

);

return;

}


waterData.push({

month,

consumption,

cost

});


loadTable();



document
.getElementById(
"newMonth"
)
.value="";

document
.getElementById(
"newConsumption"
)
.value="";

document
.getElementById(
"newCost"
)
.value="";

}

function sortMonth(){

waterData.sort((a,b)=>

a.month.localeCompare(b.month)

);

currentPage=1;

loadTable();

}

function sortConsumption(){

waterData.sort((a,b)=>

b.consumption-a.consumption

);

currentPage=1;

loadTable();

}

function sortCost(){

waterData.sort((a,b)=>

b.cost-a.cost

);

currentPage=1;

loadTable();

}

function exportSelected(){

let selected=[];

document

.querySelectorAll(

".rowCheck:checked"

)

.forEach(

checkbox=>{

selected.push(

waterData[
checkbox.value
]

);

});

if(

selected.length===0

){

alert(

"No records selected."

);

return;

}


let worksheet=

XLSX.utils.json_to_sheet(

selected

);


let workbook=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Selected Rows"

);


XLSX.writeFile(

workbook,

"selected_water_records.xlsx"

);

}

document

.getElementById(
"rowsPerPage"
)

.addEventListener(

"change",

function(){

rowsPerPage =

parseInt(
this.value
);

currentPage = 1;

loadTable();

});

document

.getElementById(
"prevBtn"
)

.addEventListener(

"click",

()=>{

if(

currentPage > 1

){

currentPage--;

loadTable();

}

});


document

.getElementById(
"nextBtn"
)

.addEventListener(

"click",

()=>{

currentPage++;

loadTable();

});


document

.getElementById(
"excelBtn"
)

.addEventListener(

"click",

()=>{

let worksheet=

XLSX.utils.json_to_sheet(

waterData

);

let workbook=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Water Data"

);

XLSX.writeFile(

workbook,

"water_usage.xlsx"

);

});

loadTable();

document
.getElementById(
"csvBtn"
)

.addEventListener(

"click",

()=>{

let worksheet=

XLSX.utils.json_to_sheet(
waterData
);

let csv=

XLSX.utils.sheet_to_csv(
worksheet
);

let blob=

new Blob(

[csv],

{

type:
"text/csv"

}

);

let link=

document.createElement(
"a"
);

link.href=

URL.createObjectURL(
blob
);

link.download=

"water_usage.csv";

link.click();

});

document
.getElementById(
"pdfBtn"
)

.addEventListener(

"click",

()=>{

const {

jsPDF

}=window.jspdf;

const doc=

new jsPDF();

doc.setFontSize(
18
);

doc.text(

"WATER_USAGE",

20,

20

);

doc.save(

"water_report.pdf"

);

});

document
.getElementById(
"pngBtn"
)

.addEventListener(

"click",

()=>{

html2canvas(

document.querySelector(
".main"
)

)

.then(

canvas=>{

let link=

document.createElement(
"a"
);

link.download=

"water_dashboard.png";

link.href=

canvas.toDataURL();

link.click();

}

);

});
if(

role==="viewer"

){

document

.getElementById(
"addBtn"
)

.style.display=

"none";

}
