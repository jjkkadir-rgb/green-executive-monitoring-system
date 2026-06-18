// ==========================================
// PERIOD COMPARISON ANALYSIS (DYNAMIC)
// ==========================================

function initPeriodComparison() {
    const ctx = document.getElementById('periodComparisonChart');
    if (!ctx) {
        console.warn('periodComparisonChart not found');
        return;
    }
    
    // Group data by quarter from your actual energyData
    const quarters = {
        'Jan-Mar': { consumption: 0, cost: 0, count: 0 },
        'Apr-Jun': { consumption: 0, cost: 0, count: 0 },
        'Jul-Sep': { consumption: 0, cost: 0, count: 0 },
        'Oct-Dec': { consumption: 0, cost: 0, count: 0 }
    };
    
    // Map month names to quarters
    function getQuarter(monthStr) {
        const month = monthStr.split(' ')[0]; // "Jan", "Feb", etc.
        if (['Jan', 'Feb', 'Mar'].includes(month)) return 'Jan-Mar';
        if (['Apr', 'May', 'Jun'].includes(month)) return 'Apr-Jun';
        if (['Jul', 'Aug', 'Sep'].includes(month)) return 'Jul-Sep';
        if (['Oct', 'Nov', 'Dec'].includes(month)) return 'Oct-Dec';
        return null;
    }
    
    // Aggregate your actual data
    energyData.forEach(record => {
        const quarter = getQuarter(record.month);
        if (quarter) {
            quarters[quarter].consumption += record.kwh;
            quarters[quarter].cost += record.cost;
            quarters[quarter].count += 1;
        }
    });
    
    // Prepare chart data (only include quarters with data)
    const labels = Object.keys(quarters).filter(q => quarters[q].count > 0);
    const consumptionData = labels.map(q => Math.round(quarters[q].consumption / quarters[q].count));
    const costData = labels.map(q => Math.round(quarters[q].cost / quarters[q].count));
    
    // If no data, use fallback
    if (labels.length === 0) {
        console.warn('No quarter data found, using fallback');
        const fallbackLabels = ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: fallbackLabels,
                datasets: [
                    {
                        label: 'Consumption (kWh)',
                        data: [185000, 210000, 245000, 195000],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Cost (RM)',
                        data: [111000, 126000, 147000, 117000],
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
                        text: 'Quarterly Consumption vs Cost (Sample Data)'
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
        return;
    }
    
    // Create chart with your actual data
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Avg Consumption (kWh)',
                    data: consumptionData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Avg Cost (RM)',
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
                    text: 'Average Quarterly Consumption vs Cost'
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
// PERIOD SUMMARY (DYNAMIC)
// ==========================================

function updatePeriodSummary() {
    const summaryEl = document.getElementById('periodSummary');
    if (!summaryEl) return;
    
    // Use your actual data
    const totalConsumption = energyData.reduce((sum, r) => sum + r.kwh, 0);
    const totalCost = energyData.reduce((sum, r) => sum + r.cost, 0);
    const avgConsumption = Math.round(totalConsumption / energyData.length);
    const avgCost = (totalCost / energyData.length).toFixed(2);
    
    // Find highest/lowest months
    const maxRecord = energyData.reduce((a, b) => a.kwh > b.kwh ? a : b);
    const minRecord = energyData.reduce((a, b) => a.kwh < b.kwh ? a : b);
    
    summaryEl.innerHTML = `
        <strong>📊 Executive Summary (${energyData.length} months):</strong><br>
        • Total Consumption: <strong>${totalConsumption.toLocaleString()} kWh</strong><br>
        • Total Cost: <strong>RM ${totalCost.toLocaleString()}</strong><br>
        • Average Monthly: <strong>${avgConsumption.toLocaleString()} kWh</strong><br>
        • Average Cost/Month: <strong>RM ${parseFloat(avgCost).toLocaleString()}</strong><br>
        • Highest Month: <strong>${maxRecord.month}</strong> (${maxRecord.kwh.toLocaleString()} kWh)<br>
        • Lowest Month: <strong>${minRecord.month}</strong> (${minRecord.kwh.toLocaleString()} kWh)<br>
        • Cost Efficiency: <strong>RM ${(totalCost/totalConsumption).toFixed(3)}/kWh</strong>
    `;
}

// ==========================================
// INITIALIZE PERIOD COMPARISON
// ==========================================

// Call both functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    initPeriodComparison();
    updatePeriodSummary();
});
