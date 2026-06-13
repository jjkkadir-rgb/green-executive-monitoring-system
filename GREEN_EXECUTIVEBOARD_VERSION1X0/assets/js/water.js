// Water JS
console.log('Water module loaded');

const waterCostCtx = document.getElementById("costChart");
if (waterCostCtx) {
  new Chart(waterCostCtx, {
    type: "line",
    data: {
      labels: [
        "Oct25",
        "Nov25",
        "Dec25",
        "Jan26",
        "Feb26",
        "Mar26",
        "Apr26"
      ],
      datasets: [{
        label: "Cost (RM)",
        data: [
          70925,
          76989,
          71971,
          31864,
          73799,
          70683,
          61191
        ],
        borderColor: "#34a853",
        backgroundColor: "rgba(52,168,83,.2)",
        fill: true,
        tension: .4
      }]
    }
  });
}

const comparisonCtx = document.getElementById("comparisonChart");
if (comparisonCtx) {
  new Chart(comparisonCtx, {
    type: "bar",
    data: {
      labels: [
        "Oct25",
        "Nov25",
        "Dec25",
        "Jan26",
        "Feb26",
        "Mar26",
        "Apr26"
      ],
      datasets: [
        {
          label: "Consumption",
          data: [
            11888,
            12903,
            11974,
            4714,
            12371,
            11983,
            10355
          ],
          backgroundColor: "#00acc1"
        },
        {
          label: "Cost",
          data: [
            70925,
            76989,
            71971,
            31864,
            73799,
            70683,
            61191
          ],
          backgroundColor: "#1a73e8"
        }
      ]
    }
  });
}

// ==========================================
// Top 5 Highest Months
// ==========================================

const topChartCtx = document.getElementById("topChart");
if (topChartCtx) {
  new Chart(topChartCtx, {
    type: "bar",
    data: {
      labels: [
        "Nov25",
        "Feb26",
        "Mar26",
        "Dec25",
        "Oct25"
      ],
      datasets: [{
        label: "Consumption (m³)",
        data: [
          12903,
          12371,
          11983,
          11974,
          11888
        ],
        backgroundColor: "#ea4335"
      }]
    },
    options: {
      indexAxis: "y"
    }
  });
}

// ==========================================
// Quarterly Analysis
// ==========================================

const quarterChartCtx = document.getElementById("quarterChart");
if (quarterChartCtx) {
  new Chart(quarterChartCtx, {
    type: "doughnut",
    data: {
      labels: [
        "Q4 2025",
        "Q1 2026",
        "Q2 2026"
      ],
      datasets: [{
        data: [
          36765,
          29068,
          10355
        ]
      }]
    }
  });
}

// ==========================================
// Year Comparison
// ==========================================

const yearChartCtx = document.getElementById("yearChart");
if (yearChartCtx) {
  new Chart(yearChartCtx, {
    type: "bar",
    data: {
      labels: [
        "2025",
        "2026"
      ],
      datasets: [{
        label: "Consumption (m³)",
        data: [
          36765,
          39423
        ],
        backgroundColor: [
          "#00acc1",
          "#34a853"
        ]
      }]
    }
  });
}

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
// AI EXECUTIVE PANEL
// ==========================================

document.getElementById(
  "executiveSummary"
).innerHTML=
`
Total water consumption reached
approximately 76,188 m³ with a total
expenditure of RM457,422.

November 2025 recorded the highest
water usage while January 2026 showed
the lowest demand.
`;


document.getElementById(
  "trendAnalysis"
).innerHTML=
`
Water consumption remained relatively
stable except for January 2026, which
experienced a significant decrease.

The overall trend indicates consistent
water demand across the campus.
`;


document.getElementById(
  "recommendation"
).innerHTML=
`
• Monitor water leakages.

• Promote water-saving campaigns.

• Install smart water meters.

• Implement rainwater harvesting.

• Continue monthly monitoring.
`;


document.getElementById(
  "forecast"
).innerHTML=
`
Projected monthly water consumption
is approximately 11,000 m³.

Expected monthly expenditure is
around RM70,000.
`;

function loadWaterTable(){
  let tableBody = document.querySelector(
    "#waterTable tbody"
  );

  tableBody.innerHTML = "";

  waterData.forEach(
    (row, index) => {
      tableBody.innerHTML += `
        <tr>
          <td>${row.month}</td>
          <td>${row.consumption.toLocaleString()}</td>
          <td>${row.cost.toLocaleString()}</td>
          <td>${(row.cost / row.consumption).toFixed(2)}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      `;
    }
  );
}

loadWaterTable();

document
  .getElementById(
    "searchInput"
  )
  .addEventListener(
    "keyup",
    function(){
      let keyword =
        this.value.toLowerCase();

      let rows =
        document.querySelectorAll(
          "#waterTable tbody tr"
        );

      rows.forEach(row => {
        let text =
          row.innerText.toLowerCase();

        row.style.display =
          text.includes(keyword)
            ? ""
            : "none";
      });
    }
  );

document
  .getElementById(
    "excelBtn"
  )
  .addEventListener(
    "click",
    ()=>{
      let worksheet =
        XLSX.utils.json_to_sheet(
          waterData
        );

      let workbook =
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
    }
  );

document
  .getElementById(
    "csvBtn"
  )
  .addEventListener(
    "click",
    ()=>{
      const worksheet = XLSX.utils.json_to_sheet(waterData);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "water_usage.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  );

document
  .getElementById(
    "pdfBtn"
  )
  .addEventListener(
    "click",
    ()=>{
      const tableElement = document.getElementById("waterTable");
      html2canvas(tableElement, { backgroundColor: "white" })
        .then(canvas => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jspdf.jsPDF({ orientation: "landscape" });
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pageWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
          pdf.save("water_usage.pdf");
        });
    }
  );

document
  .getElementById(
    "pngBtn"
  )
  .addEventListener(
    "click",
    ()=>{
      const tableElement = document.getElementById("waterTable");
      html2canvas(tableElement, { backgroundColor: "white" })
        .then(canvas => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "water_usage.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    }
  );
