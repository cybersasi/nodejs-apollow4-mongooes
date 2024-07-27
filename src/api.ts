import { appVersion } from "./function/general";

export const api = async (app: any) => { 
  app.use((req: any, res: any, next: any) => {
    if(req.headers['content-encoding'] == "utf-8") {
      delete req.headers['content-encoding'];
    }
    next();
  });
  
  app.use("/version", appVersion);
}