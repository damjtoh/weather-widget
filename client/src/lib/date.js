import _format from "date-fns/format";
import es from "date-fns/locale/es";

export const format = (date, formatStr) =>
  _format(date, formatStr, { locale: es });
