export const formatMoney = (value: any, showSymbol = true, removeCents = false) => {
  let result = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);

  if (!showSymbol) {
    result = result.replace('R$', '');
  }

  if (removeCents) {
    result = result.replace(/,\d{2}$/, '');
  }

  return result.replace('R$', 'R$ ');
};

export const formatWithTextMoney = (value: string | number, showSymbol = true, removeCent = false) => {
  const parts = (value ?? '').toString().split(' ');
  return parts.map(val => (val.match(/\d/gim) ? formatMoney(val, showSymbol, removeCent) : val)).join(' ');
};
