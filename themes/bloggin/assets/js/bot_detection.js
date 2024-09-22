import { load } from '@fingerprintjs/botd'

export const isBot = load({monitoring: false})
    .then((botd) => botd.detect())
    .catch((error) => console.error(error));

