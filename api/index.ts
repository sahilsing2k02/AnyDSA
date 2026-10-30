import { createApp } from '../server/app.js';

let appInstance: any = null;

export default async function handler(req: any, res: any) {
  if (!appInstance) {
    appInstance = await createApp();
  }
  return appInstance(req, res);
}

