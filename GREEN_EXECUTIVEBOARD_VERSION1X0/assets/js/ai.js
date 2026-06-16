// Executive Summary

document
  .getElementById(
    "executiveSummary"
  )
  .innerHTML=
`
Combined utility expenditure exceeded
RM2.09 million.

Electricity contributes approximately
78% of total utility costs.

Overall sustainability performance
is considered GOOD.
`;


// Forecast

document
  .getElementById(
    "forecast"
  )
  .innerHTML=
`
Projected monthly utility cost:

RM170,000 - RM180,000.

Resource demand is expected to remain
stable for the next quarter.
`;


// ISO 14001

document
  .getElementById(
    "iso14001"
  )
  .innerHTML=
`
• Continue water conservation programs.

• Implement waste reduction initiatives.

• Strengthen environmental awareness.
`;


// ISO 50001

document
  .getElementById(
    "iso50001"
  )
  .innerHTML=
`
• Optimize HVAC operations.

• Increase LED implementation.

• Explore solar energy integration.
`;


// ESG

document
  .getElementById(
    "esg"
  )
  .innerHTML=
`
• Improve sustainability reporting.

• Enhance resource efficiency.

• Monitor carbon emissions regularly.
`;

document.getElementById(
"periodSummary"
).innerHTML=`

2024 consumption:

${energy2024.toLocaleString()} kWh

2025 consumption:

${energy2025.toLocaleString()} kWh

Difference:

${percentageChange}%

Overall performance remains stable.

Energy efficiency programs are
showing positive results.

`;
