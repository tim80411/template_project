// extra property solution: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
import * as express from 'express-serve-static-core'

declare module 'express-serve-static-core' {
  export interface Response {
    ok: (data: any) => null;
    fail: (data: any) => null;
  }
}