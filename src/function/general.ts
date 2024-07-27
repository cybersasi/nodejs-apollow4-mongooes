import config from '../lib/config';

// API Function
export function appVersion(req: any, res: any) {
  try {
    return res.send(config.appVersion);
  } catch (err: any) {
    res.send(err?.message);
  }
}