// ==========================================
// ENERGY_USAGE_MODULE_1X0
// ==========================================

// Monthly Labels
const months=[
"Jan25",
"Feb25",
"Mar25",
"Apr25",
"May25",
"Jun25",
"Jul25",
"Aug25",
"Sep25",
"Jan26",
"Feb26",
"Mar26"
];

const fullMonths=[
"Jan 2025",
"Feb 2025",
"Mar 2025",
"Apr 2025",
"May 2025",
"Jun 2025",
"Jul 2025",
"Aug 2025",
"Sep 2025",
"Jan 2026",
"Feb 2026",
"Mar 2026"
];

// Consumption Data (kWh)
const kwh=[
217050,
225960,
235870,
266420,
242200,
168400,
208080,
299140,
226520,
194320,
206930
];

// Cost Data (RM)
const cost=[
130849,
137876,
142057,
158315,
142865,
100957,
128770,
169295,
125260,
125070,
133709
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
        label:'Consumption (kWh)',
        data:kwh,
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

label:"Consumption (kWh)",

data:kwh,

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
// Top 5 Highest Months (computed from months/kwh)
// ==========================================
(function(){
  try{
    const zipped = months.map((m,i)=>({month:fullMonths[i]||m, kwh: kwh[i]||0}));
    const top5 = zipped.sort((a,b)=>b.kwh - a.kwh).slice(0,5);
    const topLabels = top5.map(r=>r.month);
    const topValues = top5.map(r=>r.kwh);

    new Chart(document.getElementById('topChart'), {
      type: 'bar',
      data: {
        labels: topLabels,
        datasets: [{
          label: 'Consumption (kWh)',
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

"Jun25",
"Jul25",
"Aug25",
"Sep25"

],

datasets:[{

label:"Peak Demand",

data:[

168400,
208080,
299140,
226520

],

backgroundColor:"#ea4335"

}]

}

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

data:[

220000,
222000,
225000,
228000,
230000,
226000,
224000,
229000,
227000,
223000,
221000

],

borderColor:"#8e24aa",

fill:false,

tension:.4

}]

}

});

new Chart(

document.getElementById(
"efficiencyChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:"RM/kWh",

data:[

0.60,
0.61,
0.60,
0.59,
0.59,
0.60,
0.62,
0.57,
0.55,
0.64,
0.65

],

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
"Reliability",
"Sustainability"

],

datasets:[{

label:"2025 Index",

data:[

85,
80,
90,
88,
75

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

80,
20

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

"Q1",
"Q2",
"Q3",
"Q4"

],

datasets:[{

data:[

678880,
677020,
733740,
401250

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

label:"Consumption (kWh)",

data:kwh,

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
// AI EXECUTIVE PANEL
// ==========================================

document.getElementById(
"executiveSummary"
).innerHTML=

`
Total electricity consumption exceeded
2.71 million kWh with an estimated cost
of RM1.63 million.

August 2025 recorded the highest
consumption while June 2025 showed
the lowest demand.
`;



document.getElementById(
"trendAnalysis"
).innerHTML=

`
Overall electricity usage remained
relatively stable.

Peak demand occurred during the
third quarter due to increased
campus activities.
`;



document.getElementById(
"recommendation"
).innerHTML=

`
• Optimize air-conditioning schedules.

• Promote energy-saving campaigns.

• Upgrade lighting systems to LED.

• Consider solar integration
in Version 2X0.
`;



document.getElementById(
"forecast"
).innerHTML=

`
Projected monthly consumption is
approximately 220,000 kWh.

Expected monthly expenditure is
around RM130,000.
`;

// ==========================================
// ENERGY TABLE DATA
// ==========================================

let energyData=[

{
month:"Jan 2025",
kwh:217050,
cost:130849
},

{
month:"Feb 2025",
kwh:225960,
cost:137876
},

{
month:"Mar 2025",
kwh:235870,
cost:142057
},

{
month:"Apr 2025",
kwh:266420,
cost:158315
},

{
month:"May 2025",
kwh:242200,
cost:142865
},

{
month:"Jun 2025",
kwh:168400,
cost:100957
},

{
month:"Jul 2025",
kwh:208080,
cost:128770
},

{
month:"Aug 2025",
kwh:299140,
cost:169295
},

{
month:"Sep 2025",
kwh:226520,
cost:125260
},

{
month:"Jan 2026",
kwh:194320,
cost:125070
},

{
month:"Feb 2026",
kwh:206930,
cost:133709
}

];

function loadTable(){

let tableBody=
document.querySelector(
"#energyTable tbody"
);

tableBody.innerHTML="";

energyData.forEach(

(row,index)=>{

tableBody.innerHTML+=`

<tr>

<td>${row.month}</td>

<td>${row.kwh.toLocaleString()}</td>

<td>${row.cost.toLocaleString()}</td>

<td>
${(row.cost/row.kwh).toFixed(3)}
</td>

<td>

<button>Edit</button>

<button>Delete</button>

</td>

</tr>

`;

});

}

loadTable();

document

.getElementById(
"searchInput"
)

.addEventListener(

"keyup",

function(){

let keyword=
this.value.toLowerCase();

let rows=
document.querySelectorAll(
"#energyTable tbody tr"
);

rows.forEach(row=>{

let text=
row.innerText.toLowerCase();

row.style.display=

text.includes(keyword)

?

""

:

"none";

});

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

energyData

);

let workbook=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Energy Data"

);

XLSX.writeFile(

workbook,

"energy_usage.xlsx"

);

});

document
.getElementById(
"csvBtn"
)

.addEventListener(

"click",

()=>{

let worksheet=

XLSX.utils.json_to_sheet(
energyData
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

"energy_usage.csv";

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

"ENERGY_USAGE_MODULE_1X0",

20,

20

);

doc.save(

"energy_report.pdf"

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

"energy_dashboard.png";

link.href=

canvas.toDataURL();

link.click();

}

);

});