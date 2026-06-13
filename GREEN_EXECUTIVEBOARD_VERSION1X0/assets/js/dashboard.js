// Dashboard JS
console.log('Dashboard loaded');

async function loadEnergyKPIs() {
	try {
		const resp = await fetch('../data/energy_data.json');
		const data = await resp.json();

		const totalConsumption = data.reduce((s, r) => s + (r.kwh || 0), 0);
		const totalCost = data.reduce((s, r) => s + (r.cost || 0), 0);

		const highest = data.reduce((a, b) => (b.kwh > a.kwh ? b : a), data[0]);
		const lowest = data.reduce((a, b) => (b.kwh < a.kwh ? b : a), data[0]);

		const avgConsumption = totalConsumption / data.length;
		const avgCostPerKwh = totalCost / totalConsumption;

		const fmt = (n) => n.toLocaleString(undefined, {maximumFractionDigits:0});
		const fmtCost = (n) => n.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});

		const el = (id) => document.getElementById(id);
		if (el('totalConsumption')) el('totalConsumption').textContent = fmt(totalConsumption) + ' kWh';
		if (el('totalCost')) el('totalCost').textContent = 'RM ' + fmtCost(totalCost);
		if (el('highestMonth')) el('highestMonth').textContent = `${highest.month} — ${fmt(highest.kwh)} kWh`;
		if (el('lowestMonth')) el('lowestMonth').textContent = `${lowest.month} — ${fmt(lowest.kwh)} kWh`;
		if (el('avgConsumption')) el('avgConsumption').textContent = fmt(Math.round(avgConsumption)) + ' kWh';
		if (el('avgCostPerKwh')) el('avgCostPerKwh').textContent = 'RM ' + fmtCost(avgCostPerKwh);
	} catch (err) {
		console.error('Failed to load energy KPIs', err);
	}
}

document.addEventListener('DOMContentLoaded', loadEnergyKPIs);
