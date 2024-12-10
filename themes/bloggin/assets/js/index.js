import { isBot } from './bot_detection.js';
import './tracing.js';
import { runAudit } from './audit.js';
// import { trackScroll } from './scroll_depth.js';

function pageAudit() {
  isBot.then((detection) => {
    if (!detection.bot) {
      runAudit({
        images: true,
        books: true,
      });

      // trackScroll();
    }
  });
}


onload = (ev) => {
  setTimeout(pageAudit, 5000);
}


