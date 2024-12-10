import { trace } from '@opentelemetry/api';


class scrollTracker {
  constructor(config) {
    this.tracer = trace.getTracer('scroll-waypoint');
    this.debounced = false;

    this.registerScrollListener();

  }

  registerScrollListener() {
    document.addEventListener('scroll', (ev)=> {
      const scrollPos = window.scrollY;

      if (!this.debounced) {
        window.requestAnimationFrame(() => {
          this.scrollHandler(scrollPos)
          this.debounced = true;
        })
      }

      this.debounced = false;
    })
  }

  scrollHandler(pos) {
    console.log(pos);
  }
}




export function trackScroll(){

  new scrollTracker();
}