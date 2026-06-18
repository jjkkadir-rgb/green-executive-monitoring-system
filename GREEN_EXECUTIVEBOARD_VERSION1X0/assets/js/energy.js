// ==========================================
// ENERGY_USAGE
// ==========================================

// ==========================================
// ROLE ACCESS (ONLY DECLARED ONCE - KEEP THIS)
// ==========================================
const role = localStorage.getItem("role");

// ==========================================
// ENERGY TABLE DATA (COMPLETE: Jul 2023 - Mar 2026)
// ==========================================
let energyData = [
    // 2023 Data
    { month: "Jul 2023", kwh: 181350, cost: 108810.00 },
    { month: "Aug 2023", kwh: 207910, cost: 124746.00 },
    { month: "Sep 2023", kwh: 279980, cost: 167988.00 },
    { month: "Oct 2023", kwh: 280150, cost: 168090.00 },
    { month: "Nov 2023", kwh: 275050, cost: 165030.00 },
    { month: "Dec 2023", kwh: 241130, cost: 144678.00 },
    // 2024 Data
    { month: "Jan 2024", kwh: 188650, cost: 113190.00 },
    { month: "Feb 2024", kwh: 234800, cost: 140880.00 },
    { month: "Mar 2024", kwh: 268120, cost: 160872.00 },
    { month: "Apr 2024", kwh: 222200, cost: 133320.00 },
    { month: "May 2024", kwh: 273790, cost: 164274.00 },
    { month: "Jun 2024", kwh: 190100, cost: 114060.00 },
    { month: "Jul 2024", kwh: 196980, cost: 118188.00 },
    { month: "Aug 2024", kwh: 271290, cost: 162774.00 },
    { month: "Sep 2024", kwh: 285090, cost: 171054.00 },
    { month: "Oct 2024", kwh: 291930, cost: 175158.00 },
    { month: "Nov 2024", kwh: 279990, cost: 167994.00 },
    { month: "Dec 2024", kwh: 214740, cost: 128844.00 },
    // 2025 Data
    { month: "Jan 2025", kwh: 214740, cost: 126420.75 },
    { month: "Feb 2025", kwh: 217050, cost: 130849.15 },
    { month: "Mar 2025", kwh: 225960, cost: 137876.55 },
    { month: "Apr 2025", kwh: 235870, cost: 142057.00 },
    { month: "May 2025", kwh: 266420, cost: 158314.85 },
    { month: "Jun 2025", kwh: 242200, cost: 142864.70 },
    { month: "Jul 2025", kwh: 168400, cost: 100956.80 },
    { month: "Aug 2025", kwh: 208080, cost: 128770.10 },
    { month: "Sep 2025", kwh: 299140, cost: 169295.20 },
    // 2026 Data
    { month: "Jan 2026", kwh: 226520, cost: 125259.50 },
    { month: "Feb 2026", kwh: 194320, cost: 125070.20 },
    { month: "Mar 2026", kwh: 206930, cost: 133708.50 }
];

// ==========================================
// MONTHLY LABELS (DERIVED FROM energyData)
// ==========================================
const months = energyData.map(record => {
    const [month, year] = record.month.split(' ');
    return month.slice(0, 3) + year.slice(2);
});

const fullMonths = energyData.map(record => record.month);
const kwh = energyData.map(record => record.kwh);
const cost = energyData.map(record => record.cost);

// ==========================================
// MONTHLY CONSUMPTION TREND
// ==========================================
new Chart(document.getElementById("monthlyChart"), {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Consumption (kWh)',
            data: kwh,
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26,115,232,.2)',
            fill: true,
            tension: .4
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } }
    }
});

// ==========================================
// MONTHLY COST TREND
// ==========================================
new Chart(document.getElementById("costChart"), {
    type: "line",
    data: {
        labels: months,
        datasets: [{
            label: "Cost (RM)",
            data: cost,
            borderColor: "#34a853",
            backgroundColor: "rgba(52,168,83,.2)",
            fill: true,
            tension: .4
        }]
    }
});

// ==========================================
// CONSUMPTION VS COST
// ==========================================
new Chart(document.getElementById("comparisonChart"), {
    type: "bar",
    data: {
        labels: months,
        datasets: [
            {
                label: "Consumption (kWh)",
                data: kwh,
                backgroundColor: "#1a73e8"
            },
            {
                label: "Cost (RM)",
                data: cost,
                backgroundColor: "#34a853"
            }
        ]
    }
});

// ==========================================
// TOP 5 HIGHEST MONTHS
// ==========================================
(function() {
    try {
        const zipped = months.map((m, i) => ({
            month: fullMonths[i] || m,
            kwh: kwh[i] || 0
        }));
        const top5 = zipped.sort((a, b) => b.kwh - a.kwh).slice(0, 5);
        const topLabels = top5.map(r => r.month);
        const topValues = top5.map(r => r.kwh);

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
    } catch (e) {
        console.error('Failed to render topChart', e);
    }
})();

// ==========================================
// PEAK DEMAND ANALYSIS
// ==========================================
const sortedByKwh = [...energyData].sort((a, b) => b.kwh - a.kwh);
const peakMonths = sortedByKwh.slice(0, 4).sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA - dateB;
});

new Chart(document.getElementById("peakChart"), {
    type: "bar",
    data: {
        labels: peakMonths.map(r => {
            const [m, y] = r.month.split(' ');
            return m.slice(0, 3) + y.slice(2);
        }),
        datasets: [{
            label: "Peak Demand (kWh)",
            data: peakMonths.map(r => r.kwh),
            backgroundColor: "#ea4335"
        }]
    }
});

// ==========================================
// MOVING AVERAGE TREND (3-month)
// ==========================================
const movingAverage = kwh.map((_, index, array) => {
    const window = array.slice(Math.max(0, index - 2), index + 1);
    return Math.round(window.reduce((sum, value) => sum + value, 0) / window.length);
});

new Chart(document.getElementById("movingChart"), {
    type: "line",
    data: {
        labels: months,
        datasets: [{
            label: "3-Month Moving Average",
            data: movingAverage,
            borderColor: "#8e24aa",
            fill: false,
            tension: .4
        }]
    }
});

// ==========================================
// MONTHLY COST EFFICIENCY
// ==========================================
const efficiencySeries = cost.map((value, index) => Number((value / kwh[index]).toFixed(2)));

new Chart(document.getElementById("efficiencyChart"), {
    type: "line",
    data: {
        labels: months,
        datasets: [{
            label: "RM/kWh",
            data: efficiencySeries,
            borderColor: "#34a853",
            fill: false
        }]
    }
});

// ==========================================
// ANNUAL PERFORMANCE INDEX
// ==========================================
new Chart(document.getElementById("performanceChart"), {
    type: "radar",
    data: {
        labels: ["Efficiency", "Cost", "Demand", "Reliability", "Sustainability"],
        datasets: [{
            label: "Performance Index",
            data: [85, 80, 90, 88, 75]
        }]
    }
});

// ==========================================
// UTILITY PERFORMANCE SCORE
// ==========================================
const totalKwh = kwh.reduce((a, b) => a + b, 0);
const avgKwh = Math.round(totalKwh / kwh.length);
const maxKwh = Math.max(...kwh);
const efficiencyScore = Math.round((avgKwh / maxKwh) * 100);

new Chart(document.getElementById("scoreChart"), {
    type: "doughnut",
    data: {
        labels: ["Performance Score", "Remaining"],
        datasets: [{
            data: [efficiencyScore, 100 - efficiencyScore],
            backgroundColor: ["#34a853", "#eeeeee"]
        }]
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (context.dataIndex === 0) {
                            return `Score: ${context.raw}%`;
                        }
                        return `${context.raw}%`;
                    }
                }
            }
        }
    }
});

// ==========================================
// QUARTERLY ANALYSIS
// ==========================================
const quarters = {
    'Q3 2023': { kwh: 0, cost: 0, count: 0 },
    'Q4 2023': { kwh: 0, cost: 0, count: 0 },
    'Q1 2024': { kwh: 0, cost: 0, count: 0 },
    'Q2 2024': { kwh: 0, cost: 0, count: 0 },
    'Q3 2024': { kwh: 0, cost: 0, count: 0 },
    'Q4 2024': { kwh: 0, cost: 0, count: 0 },
    'Q1 2025': { kwh: 0, cost: 0, count: 0 },
    'Q2 2025': { kwh: 0, cost: 0, count: 0 },
    'Q3 2025': { kwh: 0, cost: 0, count: 0 },
    'Q1 2026': { kwh: 0, cost: 0, count: 0 }
};

energyData.forEach(record => {
    const [month, year] = record.month.split(' ');
    let quarter = '';
    if (['Jan', 'Feb', 'Mar'].includes(month)) quarter = `Q1 ${year}`;
    else if (['Apr', 'May', 'Jun'].includes(month)) quarter = `Q2 ${year}`;
    else if (['Jul', 'Aug', 'Sep'].includes(month)) quarter = `Q3 ${year}`;
    else if (['Oct', 'Nov', 'Dec'].includes(month)) quarter = `Q4 ${year}`;
    
    if (quarters[quarter]) {
        quarters[quarter].kwh += record.kwh;
        quarters[quarter].cost += record.cost;
        quarters[quarter].count += 1;
    }
});

const quarterLabels = Object.keys(quarters).filter(q => quarters[q].count > 0);
const quarterData = quarterLabels.map(q => Math.round(quarters[q].kwh / quarters[q].count));

new Chart(document.getElementById("quarterChart"), {
    type: "doughnut",
    data: {
        labels: quarterLabels,
        datasets: [{
            data: quarterData,
            backgroundColor: [
                '#1a73e8', '#34a853', '#ea4335', '#fbbc04',
                '#4285f4', '#0f9d58', '#db4437', '#f4b400',
                '#8e24aa', '#00acc1'
            ]
        }]
    },
    options: {
        plugins: {
            legend: { position: 'right' }
        }
    }
});

// ==========================================
// MONTHLY KWH AND COST COMPARISON
// ==========================================
new Chart(document.getElementById("yearChart"), {
    type: "bar",
    data: {
        labels: fullMonths,
        datasets: [
            {
                label: "Consumption (kWh)",
                data: kwh,
                backgroundColor: "#1a73e8"
            },
            {
                label: "Cost (RM)",
                data: cost,
                backgroundColor: "#34a853"
            }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true } }
    }
});

// ==========================================
// PERIOD COMPARISON ANALYSIS (APRIL-MARCH FINANCIAL YEAR)
// ==========================================
function initPeriodComparison() {
    const ctx = document.getElementById('periodComparisonChart');
    if (!ctx) {
        console.warn('periodComparisonChart not found');
        return;
    }

    function getFinancialYear(monthStr) {
        const [month, year] = monthStr.split(' ');
        const yearNum = parseInt(year);
        if (['Jan', 'Feb', 'Mar'].includes(month)) {
            return `${yearNum - 1}-${yearNum}`;
        }
        return `${yearNum}-${yearNum + 1}`;
    }

    const financialYears = {};
    energyData.forEach(record => {
        const fy = getFinancialYear(record.month);
        if (!financialYears[fy]) {
            financialYears[fy] = { consumption: 0, cost: 0, count: 0, months: [] };
        }
        financialYears[fy].consumption += record.kwh;
        financialYears[fy].cost += record.cost;
        financialYears[fy].count += 1;
        financialYears[fy].months.push(record.month);
    });

    const sortedFYs = Object.keys(financialYears).sort((a, b) => {
        const [aStart] = a.split('-');
        const [bStart] = b.split('-');
        return parseInt(aStart) - parseInt(bStart);
    });

    const labels = sortedFYs.map(fy => `FY ${fy}`);
    const consumptionData = sortedFYs.map(fy => Math.round(financialYears[fy].consumption / financialYears[fy].count));
    const costData = sortedFYs.map(fy => Math.round(financialYears[fy].cost / financialYears[fy].count));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Avg Monthly Consumption (kWh)',
                    data: consumptionData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Avg Monthly Cost (RM)',
                    data: costData,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Financial Year Comparison (April-March)',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                    title: { display: true, text: 'Consumption (kWh)' }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Cost (RM)' }
                }
            }
        }
    });
}

// ==========================================
// PERIOD SUMMARY (APRIL-MARCH FINANCIAL YEAR)
// ==========================================
function updatePeriodSummary() {
    const summaryEl = document.getElementById('periodSummary');
    if (!summaryEl) return;

    const totalConsumption = energyData.reduce((sum, r) => sum + r.kwh, 0);
    const totalCost = energyData.reduce((sum, r) => sum + r.cost, 0);
    const avgConsumption = Math.round(totalConsumption / energyData.length);
    const avgCost = (totalCost / energyData.length).toFixed(2);
    const maxRecord = energyData.reduce((a, b) => a.kwh > b.kwh ? a : b);
    const minRecord = energyData.reduce((a, b) => a.kwh < b.kwh ? a : b);

    function getFinancialYear(monthStr) {
        const [month, year] = monthStr.split(' ');
        const yearNum = parseInt(year);
        if (['Jan', 'Feb', 'Mar'].includes(month)) {
            return `${yearNum - 1}-${yearNum}`;
        }
        return `${yearNum}-${yearNum + 1}`;
    }

    const fyData = {};
    energyData.forEach(r => {
        const fy = getFinancialYear(r.month);
        if (!fyData[fy]) fyData[fy] = { kwh: 0, cost: 0, count: 0 };
        fyData[fy].kwh += r.kwh;
        fyData[fy].cost += r.cost;
        fyData[fy].count += 1;
    });

    const sortedFYs = Object.keys(fyData).sort((a, b) => {
        const [aStart] = a.split('-');
        const [bStart] = b.split('-');
        return parseInt(aStart) - parseInt(bStart);
    });

    const fySummary = sortedFYs.map(fy => 
        `FY ${fy}: ${Math.round(fyData[fy].kwh / fyData[fy].count).toLocaleString()} kWh avg (${fyData[fy].count} months)`
    ).join(' | ');

    let maxFY = sortedFYs[0];
    let minFY = sortedFYs[0];
    sortedFYs.forEach(fy => {
        if (fyData[fy].kwh > fyData[maxFY].kwh) maxFY = fy;
        if (fyData[fy].kwh < fyData[minFY].kwh) minFY = fy;
    });

    summaryEl.innerHTML = `
        <strong>📊 Financial Year Summary (April-March):</strong><br>
        • Total Consumption: <strong>${totalConsumption.toLocaleString()} kWh</strong><br>
        • Total Cost: <strong>RM ${totalCost.toLocaleString()}</strong><br>
        • Average Monthly: <strong>${avgConsumption.toLocaleString()} kWh</strong><br>
        • Average Cost/Month: <strong>RM ${parseFloat(avgCost).toLocaleString()}</strong><br>
        • Highest Month: <strong>${maxRecord.month}</strong> (${maxRecord.kwh.toLocaleString()} kWh)<br>
        • Lowest Month: <strong>${minRecord.month}</strong> (${minRecord.kwh.toLocaleString()} kWh)<br>
        • Cost Efficiency: <strong>RM ${(totalCost/totalConsumption).toFixed(3)}/kWh</strong><br>
        <br>
        <strong>📆 Financial Year Breakdown:</strong><br>
        • Best FY: <strong>FY ${maxFY}</strong> (${fyData[maxFY].kwh.toLocaleString()} kWh total)<br>
        • Lowest FY: <strong>FY ${minFY}</strong> (${fyData[minFY].kwh.toLocaleString()} kWh total)<br>
        • ${fySummary}
    `;
}

// ==========================================
// AI EXECUTIVE PANEL V2
// ==========================================
const totalKwhAI = kwh.reduce((a, b) => a + b, 0);
const totalCostAI = cost.reduce((a, b) => a + b, 0);
const avgKwhAI = Math.round(totalKwhAI / kwh.length);
const avgCostAI = (totalCostAI / kwh.length).toFixed(2);
const maxKwhAI = Math.max(...kwh);
const maxMonth = fullMonths[kwh.indexOf(maxKwhAI)];
const minKwhAI = Math.min(...kwh);
const minMonth = fullMonths[kwh.indexOf(minKwhAI)];

document.getElementById("executiveSummary").innerHTML = `
    Total electricity consumption reached ${totalKwhAI.toLocaleString()} kWh 
    with an estimated total cost of RM ${totalCostAI.toLocaleString()}.
    ${maxMonth} recorded the highest consumption (${maxKwhAI.toLocaleString()} kWh) 
    while ${minMonth} had the lowest demand (${minKwhAI.toLocaleString()} kWh).
    Data covers ${energyData.length} months from Jul 2023 to Mar 2026.
`;

document.getElementById("performanceIndicator").innerHTML = `
    Energy Performance Index: ${avgKwhAI > 230000 ? 'GOOD' : 'FAIR'}
    Overall system efficiency: ${Math.round((minKwhAI / maxKwhAI) * 100)} / 100
    Status: ${avgKwhAI > 220000 ? 'STABLE' : 'OPTIMIZING'}
`;

document.getElementById("trendAnalysis").innerHTML = `
    Electricity demand shows seasonal patterns,
    with peaks occurring in Q3 (Jul-Sep) averaging ${Math.round(energyData.filter(r => {
        const m = r.month.split(' ')[0];
        return ['Jul','Aug','Sep'].includes(m);
    }).reduce((s,r) => s + r.kwh, 0) / energyData.filter(r => {
        const m = r.month.split(' ')[0];
        return ['Jul','Aug','Sep'].includes(m);
    }).length).toLocaleString()} kWh.
    The highest peak was ${maxKwhAI.toLocaleString()} kWh in ${maxMonth}.
`;

document.getElementById("costEfficiency").innerHTML = `
    Average electricity cost: RM ${(totalCostAI/totalKwhAI).toFixed(3)} per kWh
    Overall cost efficiency: ${(totalCostAI/totalKwhAI) < 0.65 ? 'GOOD' : 'MODERATE'}
`;

document.getElementById("carbonEstimate").innerHTML = `
    Estimated total carbon emissions: ${Math.round(totalKwhAI * 0.0007 * 1000).toLocaleString()} tCO₂e
    Carbon intensity: ${totalKwhAI > 5000000 ? 'MODERATE' : 'LOW'}
`;

document.getElementById("forecast").innerHTML = `
    Projected monthly demand: ${avgKwhAI.toLocaleString()} kWh
    Expected expenditure: RM ${parseFloat(avgCostAI).toLocaleString()}/month
    Based on ${energyData.length} months of historical data (Jul 2023 - Mar 2026)
`;

document.getElementById("recommendation").innerHTML = `
    • Optimize HVAC schedules (highest usage in ${maxMonth.split(' ')[0]})
    • Continue LED retrofit programs
    • Implement peak demand management during Q3 months
    • Consider solar energy integration
    • Strengthen energy awareness campaigns
    • Monitor seasonal patterns (Q3 peaks, Q1 dips)
`;

// ==========================================
// TABLE FUNCTIONS
// ==========================================
let currentPage = 1;
let rowsPerPage = 10;

function loadTable() {
    let tableBody = document.querySelector("#energyTable tbody");
    if (!tableBody) return;
    
    tableBody.innerHTML = "";
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let filteredData = energyData.filter(row => row.month.toLowerCase().includes(keyword));
    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let pageData = filteredData.slice(start, end);

    pageData.forEach((row, index) => {
        const globalIndex = energyData.indexOf(row);
        tableBody.innerHTML += `
            <tr>
                <td><input type="checkbox" class="rowCheck" value="${globalIndex}"></td>
                <td>${row.month}</td>
                <td>${row.kwh.toLocaleString()}</td>
                <td>${row.cost.toLocaleString()}</td>
                <td>${(row.cost / row.kwh).toFixed(3)}</td>
                <td>
                    ${role === "viewer" ? "View Only" :
                    `<button onclick="editRow(${globalIndex})">Edit</button>
                     <button onclick="deleteRow(${globalIndex})">Delete</button>`}
                </td>
            </tr>
        `;
    });
    document.getElementById("pageInfo").innerHTML = `Page ${currentPage}`;
}

// ==========================================
// HIDE VIEWER CONTROLS
// ==========================================
function hideViewerAddControls() {
    if (role === "viewer") {
        const energyAddSection = document.getElementById("energyAddSection");
        const energyAddBtn = document.getElementById("energyAddBtn");
        if (energyAddSection) energyAddSection.remove();
        if (energyAddBtn) energyAddBtn.remove();
        document.querySelectorAll("button[onclick='addRecord()'], button[onclick=\"addRecord()\"]").forEach(btn => btn.remove());
    }
}
hideViewerAddControls();

// ==========================================
// SEARCH
// ==========================================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        currentPage = 1;
        loadTable();
    });
}

// ==========================================
// DELETE ROW
// ==========================================
function deleteRow(index) {
    if (role === "viewer") {
        alert("Viewer does not have permission.");
        return;
    }
    if (confirm("Delete record?")) {
        energyData.splice(index, 1);
        updateDerivedData();
        loadTable();
        location.reload();
    }
}

// ==========================================
// EDIT ROW
// ==========================================
function editRow(index) {
    if (role === "viewer") {
        alert("Viewer does not have permission.");
        return;
    }
    let newKwh = prompt("New Consumption (kWh)", energyData[index].kwh);
    let newCost = prompt("New Cost (RM)", energyData[index].cost);
    if (newKwh !== null && newCost !== null) {
        energyData[index].kwh = parseFloat(newKwh);
        energyData[index].cost = parseFloat(newCost);
        updateDerivedData();
        loadTable();
        location.reload();
    }
}

// ==========================================
// UPDATE DERIVED DATA
// ==========================================
function updateDerivedData() {
    months.length = 0;
    fullMonths.length = 0;
    kwh.length = 0;
    cost.length = 0;
    energyData.forEach(record => {
        const [month, year] = record.month.split(' ');
        months.push(month.slice(0, 3) + year.slice(2));
        fullMonths.push(record.month);
        kwh.push(record.kwh);
        cost.push(record.cost);
    });
}

// ==========================================
// ADD RECORD
// ==========================================
function addRecord() {
    if (role === "viewer") {
        alert("Viewer does not have permission.");
        return;
    }
    let month = document.getElementById("newMonth").value;
    let kwhVal = parseFloat(document.getElementById("newKwh").value);
    let costVal = parseFloat(document.getElementById("newCost").value);
    if (month === "" || isNaN(kwhVal) || isNaN(costVal)) {
        alert("Please complete all fields.");
        return;
    }
    energyData.push({ month, kwh: kwhVal, cost: costVal });
    updateDerivedData();
    loadTable();
    location.reload();
    document.getElementById("newMonth").value = "";
    document.getElementById("newKwh").value = "";
    document.getElementById("newCost").value = "";
}

// ==========================================
// SORT FUNCTIONS
// ==========================================
function sortMonth() {
    energyData.sort((a, b) => a.month.localeCompare(b.month));
    updateDerivedData();
    currentPage = 1;
    loadTable();
}

function sortKwh() {
    energyData.sort((a, b) => b.kwh - a.kwh);
    updateDerivedData();
    currentPage = 1;
    loadTable();
}

function sortCost() {
    energyData.sort((a, b) => b.cost - a.cost);
    updateDerivedData();
    currentPage = 1;
    loadTable();
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================
function exportSelected() {
    let selected = [];
    document.querySelectorAll(".rowCheck:checked").forEach(checkbox => {
        selected.push(energyData[parseInt(checkbox.value)]);
    });
    if (selected.length === 0) {
        alert("No records selected.");
        return;
    }
    let worksheet = XLSX.utils.json_to_sheet(selected);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Rows");
    XLSX.writeFile(workbook, "selected_energy_records.xlsx");
}

// ==========================================
// ROWS PER PAGE
// ==========================================
const rowsPerPageSelect = document.getElementById("rowsPerPage");
if (rowsPerPageSelect) {
    rowsPerPageSelect.addEventListener("change", function() {
        rowsPerPage = parseInt(this.value);
        currentPage = 1;
        loadTable();
    });
}

// ==========================================
// PAGINATION
// ==========================================
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadTable();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentPage++;
        loadTable();
    });
}

// ==========================================
// EXPORT BUTTONS
// ==========================================
const excelBtn = document.getElementById("excelBtn");
if (excelBtn) {
    excelBtn.addEventListener("click", () => {
        let worksheet = XLSX.utils.json_to_sheet(energyData);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Energy Data");
        XLSX.writeFile(workbook, "energy_usage.xlsx");
    });
}

const csvBtn = document.getElementById("csvBtn");
if (csvBtn) {
    csvBtn.addEventListener("click", () => {
        let worksheet = XLSX.utils.json_to_sheet(energyData);
        let csv = XLSX.utils.sheet_to_csv(worksheet);
        let blob = new Blob([csv], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "energy_usage.csv";
        link.click();
    });
}

const pdfBtn = document.getElementById("pdfBtn");
if (pdfBtn) {
    pdfBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("ENERGY_USAGE", 20, 20);
        doc.setFontSize(12);
        doc.text(`Total Records: ${energyData.length}`, 20, 40);
        doc.text(`Total Consumption: ${kwh.reduce((a,b) => a+b, 0).toLocaleString()} kWh`, 20, 50);
        doc.text(`Total Cost: RM ${cost.reduce((a,b) => a+b, 0).toLocaleString()}`, 20, 60);
        doc.save("energy_report.pdf");
    });
}

const pngBtn = document.getElementById("pngBtn");
if (pngBtn) {
    pngBtn.addEventListener("click", () => {
        const mainElement = document.querySelector(".main");
        if (mainElement) {
            html2canvas(mainElement).then(canvas => {
                let link = document.createElement("a");
                link.download = "energy_dashboard.png";
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    });
}

// ==========================================
// LOAD TABLE & INITIALIZE
// ==========================================
loadTable();

document.addEventListener('DOMContentLoaded', function() {
    initPeriodComparison();
    updatePeriodSummary();
});
