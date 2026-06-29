export const deepCopy: any = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }
  const copiedObj:any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copiedObj[key] = deepCopy(obj[key]);
    }
  }
  return copiedObj;
};

const parseTimeValue = (value: unknown) => {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === '' ||
    String(value).trim() === '~' ||
    String(value).trim().toLowerCase() === 'null' ||
    String(value).trim().toLowerCase() === 'undefined'
  ) {
    return { timestamp: null, isInvalid: false };
  }

  if (value instanceof Date) {
    const timestamp = value.getTime();
    return { timestamp, isInvalid: Number.isNaN(timestamp) };
  }

  const numericTime = Number(value);
  if (Number.isFinite(numericTime)) {
    const timestamp = numericTime < 1_000_000_000_000 ? numericTime * 1000 : numericTime;
    return { timestamp, isInvalid: false };
  }

  const timestamp = new Date(String(value)).getTime();
  return Number.isNaN(timestamp)
    ? { timestamp: null, isInvalid: true }
    : { timestamp, isInvalid: false };
};

export const checkTimeExpired = (timeStart: unknown, timeEnd: unknown) => {
  const now = Date.now();
  const startParsed = parseTimeValue(timeStart);
  const endParsed = parseTimeValue(timeEnd);

  if (startParsed.isInvalid || endParsed.isInvalid) {
    return false;
  }

  const startTime = startParsed.timestamp ?? now;
  const endTime = endParsed.timestamp ?? Infinity;

  return now >= startTime && now <= endTime;
};
