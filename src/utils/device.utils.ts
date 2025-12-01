
import UAParser from 'ua-parser-js';

export const parseDevice = (userAgent: string) => {
  // ua-parser-js's default export may be a function; call without `new` to satisfy typings
  // Some versions allow `new UAParser()`; types in this project mark it as callable.
  // Use it as a function to avoid TS construct signature errors.
  // @ts-ignore-next-line
  const parser = (UAParser as any)(userAgent);

  const os = parser.getOS();
  const browser = parser.getBrowser();
  const device = parser.getDevice();

  let type: 'desktop' | 'tablet' | 'mobile' = 'desktop';

  if (device.type === 'mobile') type = 'mobile';
  else if (device.type === 'tablet') type = 'tablet';

  return {
    type,
    os: os.name || 'Desconocido',
    browser: browser.name || 'Desconocido',
    deviceName: device.model || os.name || 'Dispositivo',
  };
};