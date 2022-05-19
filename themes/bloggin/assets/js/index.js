import * as params from '@params';
import observability from "./observability";

if (params.api) {
  observability(params);
}