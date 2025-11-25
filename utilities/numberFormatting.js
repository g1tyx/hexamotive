export function formatNumber(num) {
  // Handle negative numbers
  const isNegative = num < 0;
  num = Math.abs(num);
  
  // Define suffixes for different magnitudes
  const suffixes = [
    { value: 1e12, symbol: 'T' },  // Trillion
    { value: 1e9, symbol: 'B' },   // Billion
    { value: 1e6, symbol: 'M' },   // Million
    { value: 1e3, symbol: 'K' }    // Thousand
  ];
  
  // For numbers less than 1000, return as-is
  if (num < 1000) {
    return (isNegative ? '-' : '') + num.toString();
  }
  
  // Find appropriate suffix
  for (let i = 0; i < suffixes.length; i++) {
    if (num >= suffixes[i].value) {
      const formatted = (num / suffixes[i].value).toFixed(2);
      // Remove unnecessary trailing zeros and decimal point
      const cleaned = formatted.replace(/\.?0+$/, '');
      return (isNegative ? '-' : '') + cleaned + suffixes[i].symbol;
    }
  }
  
  return (isNegative ? '-' : '') + num.toString();
}