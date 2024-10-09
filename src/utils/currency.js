import numeral from 'numeral'
import big from 'big.js'

export {
  formatCurrency,
  removeCurrencySymbol
}

function formatCurrency(input, { convertFromCents = false, currencyCode = 'USD' } = {}){
  let amountNumeral;
  if(convertFromCents){
    amountNumeral = numeral(Number(big(input).div(100)));
  }
  else{
    amountNumeral = numeral(input);
  }

  const localeString = amountNumeral.value().toLocaleString(undefined, { style: 'currency', currency: currencyCode });

  return localeString ? localeString : amountNumeral.format('$0,0.00');
}

function removeCurrencySymbol(value) {
  return value.replace(/\$/g, '');
}