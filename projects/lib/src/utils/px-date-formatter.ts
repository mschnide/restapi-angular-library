// https://github.com/dherges/ng-packagr/issues/775
// import dayjsImported from 'dayjs'; 
// import utcImported from 'dayjs/plugin/utc';
// import localizedFormatImported from 'dayjs/plugin/localizedFormat';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// const utc = utcImported;
// const localizedFormat = localizedFormatImported;
// dayjsImported.extend(utc);
// dayjsImported.extend(localizedFormat);
// const dayjs = dayjsImported;
dayjs.extend(utc);
dayjs.extend(localizedFormat);

/**
 * Formathelfer für die Datumsformatierung
*/
export class PxDateFormatter {

  public static PxDateFormat = 'YYYY-MM-DD HH:mm:ss';
  public static ISO_8601 = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  /**
   * Funktion für die PROFFIX Datumsstring Formatierung.
   */
  public static toPxDateString(date: Date | string): string {
    if (typeof date === 'string') {
      if (dayjs(date, "L", true).isValid()) {
        // Der Input ist im lokalen Datumsformat.
        date = dayjs(date, "L", true).utc().toDate();
      } else if (dayjs(date, PxDateFormatter.PxDateFormat, true).isValid()) {
        // Der Input ist im PxDateFormat Datumsformat.
        date = dayjs(date, PxDateFormatter.PxDateFormat, true).utc().toDate();
      } else if (dayjs(date, PxDateFormatter.ISO_8601, true).isValid()) {
        // Der Input ist im ISO_8601 Datumsformat.
        date = dayjs(date, PxDateFormatter.ISO_8601, true).utc().toDate();
      } else {
        throw new Error('Die Konvertierung konnte nicht durchgeführt werden da das übergebene Format nicht unterstützt wird.' +
          'Input: ' + date);
      }
      return dayjs(date.toString()).format(PxDateFormatter.PxDateFormat);
    } else {
      return dayjs(date).format(PxDateFormatter.PxDateFormat);
    }
  }
}
