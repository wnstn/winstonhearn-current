import { isBot } from './bot_detection.js';
import './tracing.js';
import { runAudit } from './audit.js';

function pageAudit() {
  isBot.then((detection) => {
    if (!detection.bot) {
      runAudit({
        images: true,
        books: true,
      });
    }
  });
}


onload = (ev) => {
  setTimeout(pageAudit, 5000);
}


