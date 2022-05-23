// extra property solution: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare namespace Express {
  interface Response {
    ok: (data: any) => null;
    fail: (data: any) => null;
  }
}