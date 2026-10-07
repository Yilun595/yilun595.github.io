// View-only PDF viewer for /portfolio/2026/ (PDF.js viewer component, no download/print UI)
const PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38";

const pdfjsLib = await import(`${PDFJS}/build/pdf.min.mjs`);
globalThis.pdfjsLib = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS}/build/pdf.worker.min.mjs`;
const { EventBus, PDFLinkService, PDFViewer, SpreadMode } = await import(`${PDFJS}/web/pdf_viewer.mjs`);

const container = document.getElementById("pf-viewer-container");
const status = document.getElementById("pf-status");
const pageLabel = document.getElementById("pf-page");
const narrow = () => window.matchMedia("(max-width: 800px)").matches;

// Deterrents: no context menu, no save/print shortcuts, no drag-out
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && ["s", "p"].includes(e.key.toLowerCase())) e.preventDefault();
});

const eventBus = new EventBus();
const linkService = new PDFLinkService({ eventBus });
const viewer = new PDFViewer({
  container,
  eventBus,
  linkService,
  textLayerMode: 0, // disable text layer: no selecting/copying text
  annotationMode: pdfjsLib.AnnotationMode.DISABLE,
});
linkService.setViewer(viewer);

const fit = () => {
  viewer.spreadMode = narrow() ? SpreadMode.NONE : SpreadMode.EVEN; // EVEN = cover alone, then 2-3, 4-5, ...
  viewer.currentScaleValue = narrow() ? "page-width" : "page-fit";
};

const updateLabel = () => {
  pageLabel.textContent = `${viewer.currentPageNumber} / ${viewer.pagesCount}`;
};

eventBus.on("pagesinit", () => {
  fit();
  updateLabel();
  status.remove();
});
eventBus.on("pagechanging", updateLabel);

// Step by a whole spread when spreads are shown
const step = (dir) => {
  const n = viewer.currentPageNumber;
  let target = n + dir;
  if (viewer.spreadMode === SpreadMode.EVEN && n > 1) {
    const spreadStart = n % 2 === 0 ? n : n - 1;
    target = dir > 0 ? spreadStart + 2 : Math.max(1, spreadStart - 2);
  }
  viewer.currentPageNumber = Math.min(Math.max(1, target), viewer.pagesCount);
};

document.getElementById("pf-prev").addEventListener("click", () => step(-1));
document.getElementById("pf-next").addEventListener("click", () => step(1));
document.getElementById("pf-zoom-in").addEventListener("click", () => { viewer.currentScale *= 1.2; });
document.getElementById("pf-zoom-out").addEventListener("click", () => { viewer.currentScale /= 1.2; });
document.getElementById("pf-fit").addEventListener("click", fit);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "PageDown") { step(1); e.preventDefault(); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { step(-1); e.preventDefault(); }
});

// Refit only when switching between phone and desktop layouts, so mobile scroll/zoom isn't reset
let wasNarrow = narrow();
window.addEventListener("resize", () => {
  if (narrow() !== wasNarrow) {
    wasNarrow = narrow();
    fit();
  }
});

try {
  const pdf = await pdfjsLib.getDocument({ url: container.dataset.pdf }).promise;
  viewer.setDocument(pdf);
  linkService.setDocument(pdf);
} catch (err) {
  status.textContent = "Sorry, the portfolio could not be loaded.";
  console.error(err);
}
