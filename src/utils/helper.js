// 2. Stock Number Generation

const HQ_PRICE_THRESHOLD = 50000;
const MIN_GROSS_PROFIT = 2000;
const MAX_RECON_PERCENTAGE = 0.15; 

export function generateStockNumber(formData) {
  const storeCode = "ST1"; // Fixed store identifier (single rooftop for Phase 1)
  const sourceCode = getSourceCode(formData.channel); // e.g., "TRD", "AUC"
  const buyerInitials = getBuyerInitials(formData.buyer_name); // e.g., "JS"

  const prefix = `${storeCode}-${sourceCode}-${buyerInitials}-`;

  // Get the last used sequential number for this prefix
  const lastNumber = getLastSequentialNumber(prefix); // e.g., returns 12 if last was ST1-TRD-JS-0012
  const newNumber = (lastNumber + 1).toString().padStart(4, '0'); // → "0013"

  // Final stock number
  return `${prefix}${newNumber}`; // e.g., ST1-TRD-JS-0013
}

function getSourceCode(channel) {
  const mapping = {
    "Trade-In": "TRD",
    "Auction": "AUC",
    "Private Party": "PRV",
    "Wholesale": "WHL"
    // Add more as needed
  };
  return mapping[channel] || "OTH"; // Default to "OTH" if unknown
}

function getBuyerInitials(name) {
  if (!name) return "XX";
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
    .slice(0, 2); // Limit to 2 initials
}

function getLastSequentialNumber(prefix) {
  const data = JSON.parse(localStorage.getItem("vehicle_inventory_log")) || [];
  const matchingEntries = data
    .filter(entry => entry.stock_number && entry.stock_number.startsWith(prefix));
  
  if (matchingEntries.length === 0) return 0;

  const numbers = matchingEntries.map(entry => {
    const parts = entry.stock_number.split('-');
    return parseInt(parts[3], 10); // e.g., "0012" → 12
  });

  return Math.max(...numbers);
}



export function evaluateFinancials(vehicle, config = {}) {
  const MIN_GROSS_PROFIT = config.MIN_GROSS_PROFIT ?? 1500;
  const MAX_RECON_PERCENTAGE = config.MAX_RECON_PERCENTAGE ?? 0.2; // 20%

  const purchasePrice = Number(vehicle.purchase_price || 0);
  const plannedRetail = Number(vehicle.planned_retail || 0);
  const estRecon = Number(vehicle.est_recon_cost || 0);
  const mmrValue = Number(vehicle.mmr_value || 0);

  const projectedGross = plannedRetail - purchasePrice - estRecon;
  const marketVariance = plannedRetail - mmrValue;
  const reconPercentage = purchasePrice > 0 ? estRecon / purchasePrice : 0;

  const hq_appraisal_suggested =purchasePrice >= HQ_PRICE_THRESHOLD

  let redFlagStatus = "None";
  if (projectedGross < MIN_GROSS_PROFIT) {
    redFlagStatus = "Low Gross";
  } else if (reconPercentage > MAX_RECON_PERCENTAGE) {
    redFlagStatus = "High Recon";
  }

  return {
    projected_gross: projectedGross,
    market_variance: marketVariance,
    recon_percentage: reconPercentage,
    red_flag_status: redFlagStatus,
    hq_appraisal_suggested
  };
}
