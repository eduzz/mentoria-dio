import dateFnsFormat from 'date-fns/format';
import dateFnsIsValid from 'date-fns/isValid';
import locale from 'date-fns/locale/pt-BR';
import dateFnsParse from 'date-fns/parse';

export function dateParse(value: any, format: string = null): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  const date = !format ? new Date(value) : dateFnsParse(value, format, new Date(), { locale });
  if (!dateFnsIsValid(date)) return value;

  return date;
}

export function dateFormat(date: Date, format = 'dd/MM/yyyy'): string {
  return dateFnsFormat(date, format, { locale });
}
