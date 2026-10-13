// <student-testimonials>: shows testimonials from window.TESTIMONIALS (see testimonials-data.js).
// Theming: reads CSS custom properties (--st-*) set by the site SCSS; fallbacks are light-mode values.
class StudentTestimonials extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.items = [];
    this.index = 0;
  }

  connectedCallback() {
    this.items = Array.isArray(window.TESTIMONIALS) ? window.TESTIMONIALS : [];
    if (!this.items.length) return;
    this.index = Math.floor(Math.random() * this.items.length);
    this.render();
    this.paused = false;
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.addEventListener("mouseenter", () => this.pause());
    this.addEventListener("mouseleave", () => this.resume());
    this.addEventListener("focusin", () => this.pause());
    this.addEventListener("focusout", () => this.resume());
    this.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.show(this.index - 1, true);
      if (e.key === "ArrowRight") this.show(this.index + 1, true);
    });
    this.addEventListener("touchstart", (e) => (this.touchX = e.changedTouches[0].clientX), { passive: true });
    this.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - this.touchX;
      if (Math.abs(dx) > 50) this.show(this.index + (dx < 0 ? 1 : -1));
    });
    this.start();
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  start() {
    clearInterval(this.timer);
    if (this.reduceMotion || this.items.length < 2) return;
    this.timer = setInterval(() => {
      if (!this.paused) this.show(this.index + 1);
    }, 8000);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.start();
  }

  show(i, keepFocus = false) {
    this.index = (i + this.items.length) % this.items.length;
    const hadFocus = keepFocus || this.shadowRoot.activeElement !== null;
    this.render();
    if (hadFocus) this.shadowRoot.querySelector(".dot[aria-current='true']")?.focus();
  }

  avatar(item) {
    if (item.image) {
      return `<img class="avatar" src="${this.esc(item.image)}" alt="" loading="lazy">`;
    }
    return `<svg class="avatar" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
    </svg>`;
  }

  esc(value) {
    const el = document.createElement("div");
    el.textContent = value ?? "";
    return el.innerHTML.replace(/"/g, "&quot;");
  }

  render() {
    const item = this.items[this.index];
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; max-width: 640px; margin: 2rem auto; }
        figure {
          margin: 0; padding: 1.5rem; text-align: center;
          background: var(--st-bg, #f5f5f5);
          color: var(--st-text, #212529);
          border: 1px solid var(--st-border, #e0e0e0);
          border-radius: 15px;
        }
        .avatar {
          width: 72px; height: 72px; border-radius: 50%; object-fit: cover;
          display: block; margin: 0 auto 1rem;
          box-sizing: border-box;
          border: 2px solid var(--st-accent, #6c757d);
        }
        svg.avatar { fill: none; stroke: var(--st-accent, #6c757d); stroke-width: 1.5; padding: 10px; }
        blockquote { margin: 0 0 1rem; font-style: italic; }
        figcaption { font-size: 0.9rem; color: var(--st-muted, #6c757d); }
        .name { font-weight: 600; color: var(--st-text, #212529); }
        .dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
        .dot {
          width: 10px; height: 10px; padding: 0; border-radius: 50%; cursor: pointer;
          border: 1px solid var(--st-accent, #6c757d); background: transparent;
        }
        .dot[aria-current="true"] { background: var(--st-accent, #6c757d); }
      </style>
      <figure>
        ${this.avatar(item)}
        <blockquote>${this.esc(item.text)}</blockquote>
        <figcaption>
          <span class="name">${this.esc(item.name || "Anonym")}</span>,
          <span class="origin">${this.esc(item.origin)}</span>
        </figcaption>
        <div class="dots">
          ${this.items
            .map(
              (_, i) =>
                `<button class="dot" data-i="${i}" aria-label="Stimme ${i + 1} von ${this.items.length}" aria-current="${i === this.index}"></button>`
            )
            .join("")}
        </div>
      </figure>`;
    this.shadowRoot.querySelectorAll(".dot").forEach((dot) =>
      dot.addEventListener("click", () => this.show(Number(dot.dataset.i)))
    );
  }
}

customElements.define("student-testimonials", StudentTestimonials);
