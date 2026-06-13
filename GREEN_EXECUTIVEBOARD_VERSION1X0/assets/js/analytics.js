const analyticsData=[
  {
    utility:"Electricity",
    consumption:"2.71 Million kWh",
    cost:1630000,
    contribution:"78%"
  },
  {
    utility:"Water",
    consumption:"76,188 m³",
    cost:457422,
    contribution:"22%"
  }
];

// =====================================
// Utility Cost Comparison
// =====================================

new Chart(
  document.getElementById("utilityChart"),
  {
    type: "bar",
    data: {
      labels: [
        "Electricity",
        "Water"
      ],
      datasets: [{
        label: "Cost (RM)",
        data: [
          1630000,
          457422
        ],
        backgroundColor: [
          "#1a73e8",
          "#00acc1"
        ]
      }]
    }
  }
);

// =====================================
// Cost Distribution
// =====================================

new Chart(
  document.getElementById("pieChart"),
  {
    type: "pie",
    data: {
      labels: [
        "Electricity",
        "Water"
      ],
      datasets: [{
        data: [
          1630000,
          457422
        ]
      }]
    }
  }
);

// =====================================
// AI ANALYTICS PANEL
// =====================================

document.getElementById(
  "executiveSummary"
).innerHTML=
`
Combined utility expenditure exceeded
RM2.09 million.

Electricity accounts for approximately
78% of the total utility cost, while
water contributes about 22%.

Overall utility performance remains
stable.
`;


document.getElementById(
  "trendAnalysis"
).innerHTML=
`
Electricity remains the dominant
resource consumption.

Water consumption is relatively stable.

No abnormal utility fluctuations
were observed.
`;


document.getElementById(
  "recommendation"
).innerHTML=
`
• Optimize HVAC schedules.

• Continue LED replacement programs.

• Implement smart water metering.

• Strengthen energy awareness campaigns.

• Consider solar integration
for Version 2X0.
`;


document.getElementById(
  "forecast"
).innerHTML=
`
Projected monthly utility expenditure:

RM170,000 to RM180,000.

Expected utility demand remains
stable for the next quarter.
`;


document.getElementById(
  "score"
).innerHTML=
`
Current Sustainability Score:

80 / 100

Status:

GOOD
`;

document
  .getElementById(
    "excelBtn"
  )
  .addEventListener(
    "click",
    ()=>{
      let worksheet =
        XLSX.utils.json_to_sheet(
          analyticsData
        );

      let workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Analytics"
      );

      XLSX.writeFile(
        workbook,
        "analytics_report.xlsx"
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
      const worksheet = XLSX.utils.json_to_sheet(analyticsData);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "analytics_report.csv";
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
      const printable = document.querySelector(".main");
      html2canvas(printable, { backgroundColor: "white", scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF({ orientation: "landscape" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 10;
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        let remainingHeight = imgHeight - pageHeight + 10;
        while (remainingHeight > 0) {
          position -= pageHeight - 20;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          remainingHeight -= pageHeight - 20;
        }
        pdf.save("analytics_report.pdf");
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
      const printable = document.querySelector(".main");
      html2canvas(printable, { backgroundColor: "white", scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "analytics_report.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  );

