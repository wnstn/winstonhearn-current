import * as params from '@params';
import observability from "./observability";

console.log(params);

if (params.api) {
  observability(params);
}