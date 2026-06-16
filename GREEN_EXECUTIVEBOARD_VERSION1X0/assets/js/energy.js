// ==========================================
// ENERGY_USAGE
// ==========================================

// ==========================================
// ROLE ACCESS
// ==========================================

const role =
localStorage.getItem(
"role"
);

// ==========================================
// Monthly Labels
// ==========================================

const months=[

"Jul23",
"Aug23",
"Sep23",
"Oct23",
"Nov23",
"Dec23",

"Jan24",
"Feb24",
"Mar24",
"Apr24",
"May24",
"Jun24",

"Jul24",
"Aug24",
"Sep24",
"Oct24",
"Nov24",
"Dec24",

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
"Apr26",
"May26"

];

const fullMonths=[

"Jul 2023",
"Aug 2023",
"Sep 2023",
"Oct 2023",
"Nov 2023",
"Dec 2023",

"Jan 2024",
"Feb 2024",
"Mar 2024",
"Apr 2024",
"May 2024",
"Jun 2024",

"Jul 2024",
"Aug 2024",
"Sep 2024",
"Oct 2024",
"Nov 2024",
"Dec 2024",

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
"Apr 2026",
"May 2026"

];

// ==========================================
// Consumption Data (kWh)
// ==========================================

const kwh=[

// ===== Historical Data =====

181350,
207910,
279980,
280150,
275050,
241130,

188650,
234800,
268120,
222200,
273790,
190100,

196980,
271290,
285090,
291930,
279990,
214740,

// ===== Existing Data =====

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
206930,
221290,
208910

];

// ==========================================
// Cost Data (RM)
// ==========================================

const cost=[

// Historical Cost (using average RM0.60/kWh)

108810,
124746,
167988,
168090,
165030,
144678,

113190,
140880,
160872,
133320,
164274,
114060,

118188,
162774,
171054,
175158,
167994,
128844,

// Existing Cost Data

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
133709,
161181.85,
134579.45

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

backgroundColor:
'rgba(26,115,232,.2)',

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

// ==========================================
// Monthly Cost Trend
// ==========================================

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

// ==========================================
// Consumption vs Cost
// ==========================================

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
// Top 5 Highest Months
// ==========================================

(function(){

try{

const zipped =

months.map(

(m,i)=>({

month:
fullMonths[i]||m,

kwh:
kwh[i]||0

})

);

const top5 =

zipped
.sort(
(a,b)=>
b.kwh-a.kwh
)
.slice(0,5);

const topLabels =

top5.map(
r=>r.month
);

const topValues =

top5.map(
r=>r.kwh
);

new Chart(

document.getElementById(
"topChart"
),

{

type:"bar",

data:{

labels:topLabels,

datasets:[{

label:
"Consumption (kWh)",

data:
topValues,

backgroundColor:
"#ea4335"

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

},

scales:{

y:{
beginAtZero:true
}

}

}

});

}

catch(e){

console.error(

"Failed to render topChart",

e

);

}

})();

// ==========================================
// Peak Demand Chart
// ==========================================

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

label:
"Peak Demand",

data:[

168400,
208080,
299140,
226520

],

backgroundColor:
"#ea4335"

}]

}

});

// ==========================================
// Moving Average
// ==========================================

const movingAverage =

kwh.map(

(_,index,array)=>{

const window =

array.slice(

Math.max(
0,
index-2
),

index+1

);

return Math.round(

window.reduce(

(sum,value)=>

sum+value,

0

)

/

window.length

);

}

);

new Chart(

document.getElementById(
"movingChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:
"Moving Average",

data:
movingAverage,

borderColor:
"#8e24aa",

fill:false,

tension:.4

}]

}

});

// ==========================================
// Cost Efficiency
// ==========================================

const efficiencySeries =

cost.map(

(value,index)=>

Number(

(value/kwh[index])

.toFixed(2)

)

);

new Chart(

document.getElementById(
"efficiencyChart"
),

{

type:"line",

data:{

labels:months,

datasets:[{

label:
"RM/kWh",

data:
efficiencySeries,

borderColor:
"#34a853",

fill:false

}]

}

});

// ==========================================
// Performance Radar
// ==========================================

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

label:
"2025 Index",

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

// ==========================================
// Sustainability Score
// ==========================================

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

// ==========================================
// Quarterly Distribution
// ==========================================

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

// ==========================================
// Yearly Comparison
// ==========================================

new Chart(

document.getElementById(
"yearChart"
),

{

type:"bar",

data:{

labels:
fullMonths,

datasets:[

{

label:
"Consumption (kWh)",

data:
kwh,

backgroundColor:
"#1a73e8"

},

{

label:
"Cost (RM)",

data:
cost,

backgroundColor:
"#34a853"

}

]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

// ==========================================
// ENERGY TABLE DATA
// ==========================================

let energyData=[

// ===== Historical Data =====

{
month:"Jul 2023",
kwh:181350,
cost:108810
},

{
month:"Aug 2023",
kwh:207910,
cost:124746
},

{
month:"Sep 2023",
kwh:279980,
cost:167988
},

{
month:"Oct 2023",
kwh:280150,
cost:168090
},

{
month:"Nov 2023",
kwh:275050,
cost:165030
},

{
month:"Dec 2023",
kwh:241130,
cost:144678
},

{
month:"Jan 2024",
kwh:188650,
cost:113190
},

{
month:"Feb 2024",
kwh:234800,
cost:140880
},

{
month:"Mar 2024",
kwh:268120,
cost:160872
},

{
month:"Apr 2024",
kwh:222200,
cost:133320
},

{
month:"May 2024",
kwh:273790,
cost:164274
},

{
month:"Jun 2024",
kwh:190100,
cost:114060
},

{
month:"Jul 2024",
kwh:196980,
cost:118188
},

{
month:"Aug 2024",
kwh:271290,
cost:162774
},

{
month:"Sep 2024",
kwh:285090,
cost:171054
},

{
month:"Oct 2024",
kwh:291930,
cost:175158
},

{
month:"Nov 2024",
kwh:279990,
cost:167994
},

{
month:"Dec 2024",
kwh:214740,
cost:128844
},

// ===== Existing Data =====

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
},

{
month:"Apr 2026",
kwh:221290,
cost:161181.85
},

{
month:"May 2026",
kwh:208910,
cost:134579.45
}

];


// ==========================================
// AI EXECUTIVE PANEL V3
// ==========================================

// Total Consumption
const totalConsumption =
kwh.reduce(
(sum,value)=>sum+value,
0
);

// Total Cost
const totalCost =
cost.reduce(
(sum,value)=>sum+value,
0
);

// Highest Month
const highestValue =
Math.max(...kwh);

const highestIndex =
kwh.indexOf(highestValue);

const highestMonth =
fullMonths[highestIndex];

// Lowest Month
const lowestValue =
Math.min(...kwh);

const lowestIndex =
kwh.indexOf(lowestValue);

const lowestMonth =
fullMonths[lowestIndex];

// Average Monthly Consumption
const averageConsumption =
Math.round(
totalConsumption / kwh.length
);

// Carbon Emissions
const carbonEmission =
(
totalConsumption
*
0.000584
).toFixed(0);

// ==========================================
// Executive Summary
// ==========================================

document.getElementById(
"executiveSummary"
).innerHTML=`

Total electricity consumption reached

${totalConsumption.toLocaleString()} kWh.

Estimated electricity expenditure
amounted to RM${totalCost.toLocaleString()}.

Highest consumption occurred during

${highestMonth}

with

${highestValue.toLocaleString()} kWh.

Lowest demand occurred during

${lowestMonth}

with

${lowestValue.toLocaleString()} kWh.

`;

// ==========================================
// Performance Indicator
// ==========================================

document.getElementById(
"performanceIndicator"
).innerHTML=`

Energy Performance Index

GOOD

Overall System Efficiency

80 / 100

Status

STABLE

`;

// ==========================================
// Trend Analysis
// ==========================================

document.getElementById(
"trendAnalysis"
).innerHTML=`

Average monthly demand:

${averageConsumption.toLocaleString()} kWh

Demand fluctuations remain
within acceptable limits.

Overall energy consumption
shows stable performance.

`;

// ==========================================
// Cost Efficiency
// ==========================================

document.getElementById(
"costEfficiency"
).innerHTML=`

Average electricity cost

RM${(totalCost/totalConsumption).toFixed(2)}

per kWh.

Overall cost efficiency:

GOOD

`;

// ==========================================
// Carbon Estimate
// ==========================================

document.getElementById(
"carbonEstimate"
).innerHTML=`

Estimated carbon emissions

${carbonEmission}

tCO₂e

Carbon intensity:

MODERATE

`;

// ==========================================
// Forecast
// ==========================================

document.getElementById(
"forecast"
).innerHTML=`

Projected monthly demand

${averageConsumption.toLocaleString()} kWh

Expected expenditure

RM${Math.round(
averageConsumption*0.60
).toLocaleString()}

per month.

`;

// ==========================================
// Recommendation
// ==========================================

document.getElementById(
"recommendation"
).innerHTML=`

• Optimize HVAC schedules.

• Continue LED retrofit programs.

• Improve equipment efficiency.

• Explore solar energy integration.

• Strengthen energy awareness campaigns.

• Monitor monthly peak demand.

`;

// ==========================================
// PERIOD COMPARISON
// ==========================================

// Jan-Dec 2024

const energy2024 =

188650+
234800+
268120+
222200+
273790+
190100+
196980+
271290+
285090+
291930+
279990+
214740;

// Jan-Dec 2025

const energy2025 =

217050+
225960+
235870+
266420+
242200+
168400+
208080+
299140+
226520;

// Percentage change

const percentageChange =

(

(

energy2025-energy2024

)

/

energy2024

*

100

).toFixed(1);

new Chart(

document.getElementById(
"periodComparisonChart"
),

{

type:"bar",

data:{

labels:[

"2024",
"2025"

],

datasets:[{

label:"Energy Consumption (kWh)",

data:[

energy2024,
energy2025

],

backgroundColor:[

"#1a73e8",
"#34a853"

]

}]

},

options:{

responsive:true

}

});

