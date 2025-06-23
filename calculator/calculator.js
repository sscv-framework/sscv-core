// Component weights as defined in the SSCV specification
const COMPONENT_WEIGHTS = {
  OS: { L: 3.0, O: 2.0, C: 1.0, H: 0.8, X: null },
  NE: { A: 0.3, I: 1.0, P: 2.0, E: 3.0, X: null },
  AC: { N: 3.0, B: 2.0, F: 1.0, Z: 0.7, X: null },
  EP: { N: 3.0, B: 2.0, A: 1.0, M: 0.8, X: null },
  DL: { P: 0.6, I: 1.5, M: 2.5, C: 3.0, X: null },
  BC: { L: 0.6, M: 1.5, H: 2.5, C: 3.0, X: null },
  PS: { C: 1.0, D: 1.5, B: 2.5, U: 3.0, X: null },
  UM: { A: 1.0, S: 1.5, M: 2.0, N: 3.0, X: null },
  SC: { V: 0.8, M: 1.5, U: 2.5, K: 3.0, X: null },
};

// Calculate Contextual Risk Score
function calculateCRS(cvssBase, components) {
  // Step 1: Calculate Context Multiplier
  const contextComponents = ['OS', 'AC', 'EP', 'PS', 'UM', 'SC'];
  let contextSum = 0;
  let contextCount = 0;
  
  for (const component of contextComponents) {
    const value = components[component];
    if (value !== 'X' && COMPONENT_WEIGHTS[component][value] !== null) {
      contextSum += COMPONENT_WEIGHTS[component][value];
      contextCount += 1;
    }
  }
  
  let contextMultiplier = 1.0;
  if (contextCount > 0) {
    contextMultiplier = contextSum / contextCount;
  }
  
  // Step 2: Calculate Exposure Factor
  let exposureProduct = 1.0;
  let exposureCount = 0;
  
  if (components.NE !== 'X' && COMPONENT_WEIGHTS.NE[components.NE] !== null) {
    exposureProduct *= COMPONENT_WEIGHTS.NE[components.NE];
    exposureCount += 1;
  }
  
  if (components.DL !== 'X' && COMPONENT_WEIGHTS.DL[components.DL] !== null) {
    exposureProduct *= COMPONENT_WEIGHTS.DL[components.DL];
    exposureCount += 1;
  }
  
  if (components.BC !== 'X' && COMPONENT_WEIGHTS.BC[components.BC] !== null) {
    exposureProduct *= COMPONENT_WEIGHTS.BC[components.BC];
    exposureCount += 1;
  }
  
  let exposureFactor = 1.0;
  if (exposureCount === 3) {
    exposureFactor = exposureProduct / 27.0;
  }
  
  // Step 3: Apply Formulas
  const combinedFactor = contextMultiplier * exposureFactor;
  const adjustedScore = cvssBase * 0.7 * combinedFactor;
  const minimumScore = cvssBase * 0.2;
  
  let crs;
  let formulaUsed;
  
  if (combinedFactor <= 1) {
    crs = Math.max(adjustedScore, minimumScore);
    formulaUsed = 'minimum_threshold';
  } else {
    crs = Math.min(cvssBase * combinedFactor, cvssBase * 2);
    formulaUsed = 'amplification';
  }
  
  // Step 4: Cap at 10.0
  crs = Math.min(crs, 10.0);
  
  return {
    crs: Math.round(crs * 10) / 10,
    contextMultiplier: Math.round(contextMultiplier * 1000) / 1000,
    exposureFactor: Math.round(exposureFactor * 1000) / 1000,
    combinedFactor: Math.round(combinedFactor * 1000) / 1000,
    minimumScore: Math.round(minimumScore * 10) / 10,
    adjustedScore: Math.round(adjustedScore * 10) / 10,
    formulaUsed,
  };
}

// Get severity from CRS
function getSeverity(crs) {
  if (crs < 4.0) return 'Low';
  if (crs < 7.0) return 'Medium';  
  if (crs < 9.0) return 'High';
  return 'Critical';
}

// Generate SSCV string from components
function generateSSCV(components) {
  const version = '1.0';
  const componentOrder = ['OS', 'NE', 'AC', 'EP', 'DL', 'BC', 'PS', 'UM', 'SC'];
  
  const parts = [`SSCV:${version}`];
  for (const comp of componentOrder) {
    const value = components[comp] || 'X';
    parts.push(`${comp}:${value.toUpperCase()}`);
  }
  
  return parts.join('/');
}

// Validate and get warnings
function getWarnings(components) {
  const warnings = [];
  
  if (components.NE === 'E') {
    warnings.push('⚠️ External network exposure significantly increases risk');
  }
  if (components.PS === 'U') {
    warnings.push('⚠️ Unpatched systems are at high risk');
  }
  if (components.AC === 'N') {
    warnings.push('⚠️ No access control increases vulnerability');
  }
  if (components.EP === 'N') {
    warnings.push('⚠️ No endpoint protection leaves system vulnerable');
  }
  if (components.DL === 'C' && components.NE === 'E') {
    warnings.push('⚠️ Critical data exposed externally creates severe risk');
  }
  
  return warnings;
}

// Update all calculations and display
function updateCalculator() {
  const cvssScore = parseFloat(document.getElementById('cvss-score').value) || 0;
  
  // Get component values
  const components = {};
  const componentOrder = ['OS', 'NE', 'AC', 'EP', 'DL', 'BC', 'PS', 'UM', 'SC'];
  
  componentOrder.forEach(comp => {
    const select = document.getElementById(comp.toLowerCase());
    components[comp] = select.value;
  });
  
  // Generate SSCV string
  const sscvString = generateSSCV(components);
  document.getElementById('sscv-output').textContent = sscvString;
  
  // Calculate CRS
  const result = calculateCRS(cvssScore, components);
  const severity = getSeverity(result.crs);
  
  // Update display
  document.getElementById('crs-score').textContent = result.crs.toFixed(1);
  document.getElementById('crs-severity').textContent = severity;
  document.getElementById('crs-severity').className = `severity ${severity.toLowerCase()}`;
  
  document.getElementById('context-multiplier').textContent = result.contextMultiplier.toFixed(3);
  document.getElementById('exposure-factor').textContent = result.exposureFactor.toFixed(3);
  document.getElementById('formula-used').textContent = result.formulaUsed.replace('_', ' ');
  
  // Update comparison bars
  const cvssPercent = (cvssScore / 10) * 100;
  const crsPercent = (result.crs / 10) * 100;
  
  document.getElementById('cvss-bar-fill').style.width = `${cvssPercent}%`;
  document.getElementById('crs-bar-fill').style.width = `${crsPercent}%`;
  document.getElementById('cvss-display').textContent = cvssScore.toFixed(1);
  document.getElementById('crs-display').textContent = result.crs.toFixed(1);
  
  // Update bar colors based on severity
  const cvssBarFill = document.getElementById('cvss-bar-fill');
  const crsBarFill = document.getElementById('crs-bar-fill'); 
  const cvssSeverity = getSeverity(cvssScore);
  
  cvssBarFill.className = `bar-fill ${cvssSeverity.toLowerCase()}`;
  crsBarFill.className = `bar-fill ${severity.toLowerCase()}`;
  
  // Show warnings
  const warnings = getWarnings(components);
  const warningsDiv = document.getElementById('warnings');
  if (warnings.length > 0) {
    warningsDiv.innerHTML = `<h4>Security Warnings</h4><ul>${warnings.map(w => `<li>${w}</li>`).join('')}</ul>`;
    warningsDiv.style.display = 'block';
  } else {
    warningsDiv.style.display = 'none';
  }
}

// Copy SSCV string to clipboard
function copySSCV() {
  const sscvText = document.getElementById('sscv-output').textContent;
  navigator.clipboard.writeText(sscvText).then(() => {
    const button = document.getElementById('copy-sscv');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = sscvText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to all inputs
  document.getElementById('cvss-score').addEventListener('input', updateCalculator);
  
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    select.addEventListener('change', updateCalculator);
  });
  
  // Add copy button listener
  document.getElementById('copy-sscv').addEventListener('click', copySSCV);
  
  // Initial calculation
  updateCalculator();
});