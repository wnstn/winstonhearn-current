import { trace } from '@opentelemetry/api';

function bookHelper(book, sel, attr) {
  const el = book.querySelector(sel);
  return el[attr] ? el[attr] : null;
}


class PageAudit {
  constructor(config) {
    this.tracer = trace.getTracer('page-audit');

    Object.keys(config).forEach((audit) => {
      if (typeof this[audit] === "function") {
        this.queue(this[audit]);
      }
    });   
  }

  queue(fn) {
    window.requestIdleCallback(fn.bind(this)) 
  }

  images() {
    const imgs = [...document.getElementsByTagName('img')];

    this.tracer.startActiveSpan('image-audit', (span) => {
      // loop through every image tag and audit some specific info
      imgs.map((img) => {
        const spanName = img.complete ? 'loaded-image' : 'unloaded-image';
        
        this.tracer.startActiveSpan(spanName, (imgSpan) => {
          imgSpan.setAttributes({
            "img.alt": img.alt,
            "img.hasAlt": !!img.alt,
            "img.src": img.src,
            "img.loading": img.loading,
            "img.classname": img.className,
            "img.id": img.id,
            "img.height": img.height,
            "img.width": img.width,
            "img.naturalWidth": img.naturalWidth,
            "img.naturalHeight": img.naturalHeight, 
            "img.hidden": img.hidden,
          })
          imgSpan.end();
        });
      })
      span.end();
    });
  }

  books() {
    const books = [...document.querySelectorAll('.book')];
    if (!books.length) {return false;}

    this.tracer.startActiveSpan('books-on-page', (span) => {
      books.map((book) => {
        this.tracer.startActiveSpan('book-on-page', (bookSpan)=> {
          bookSpan.setAttributes({
            "book.cover": bookHelper(book, "img", "src"),
            "book.title": bookHelper(book, ".book-title a", "innerText"),
            "book.categories":  bookHelper(book, ".book-category", "innerText"),
            "book.author":  bookHelper(book, ".book-author", "innerText")
          })

          bookSpan.end();
        });
      });
      span.end();
    })
  }
}

export function runAudit(config){
  if (!config) {return false;};

  new PageAudit(config);
}