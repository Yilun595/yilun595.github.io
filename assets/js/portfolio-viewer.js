// View-only PDF viewer for /portfolio/2026/ (PDF.js viewer component, no download/print UI)
// PDF.js 4.10.38 is self-hosted under /assets/pdfjs/ so it doesn't depend on a CDN
const container = document.getElementById("pf-viewer-container");
const PDFJS = container.dataset.pdfjs;

const pdfjsLib = await import(`${PDFJS}/pdf.min.js`);
globalThis.pdfjsLib = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS}/pdf.worker.min.js`;
const { EventBus, PDFLinkService, PDFViewer, SpreadMode } = await import(`${PDFJS}/pdf_viewer.js`);

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

// Full screen on the toolbar + viewer; hidden where unsupported (e.g. iPhone Safari)
const wrap = document.querySelector(".pf-wrap");
const fsButton = document.getElementById("pf-fullscreen");
const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;
if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
  fsButton.hidden = false;
  document.getElementById("pf-fs-sep").hidden = false;
  fsButton.addEventListener("click", () => {
    if (fsElement()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (wrap.requestFullscreen || wrap.webkitRequestFullscreen).call(wrap);
    }
  });
  const onFsChange = () => {
    fsButton.innerHTML = fsElement() ? "&#x2715; Exit full screen" : "&#x26F6; Full screen";
    setTimeout(fit, 100); // wait for the new size to settle
  };
  document.addEventListener("fullscreenchange", onFsChange);
  document.addEventListener("webkitfullscreenchange", onFsChange);
}

// Refit only when switching between phone and desktop layouts, so mobile scroll/zoom isn't reset
let wasNarrow = narrow();
window.addEventListener("resize", () => {
  if (narrow() !== wasNarrow) {
    wasNarrow = narrow();
    fit();
  }
});

try {
  const task = pdfjsLib.getDocument({ url: container.dataset.pdf });
  task.onProgress = ({ loaded, total }) => {
    if (status.isConnected && total) {
      status.textContent = `Loading portfolio… ${Math.round((100 * loaded) / total)}%`;
    }
  };
  const pdf = await task.promise;
  viewer.setDocument(pdf);
  linkService.setDocument(pdf);
} catch (err) {
  status.textContent = "Sorry, the portfolio could not be loaded.";
  console.error(err);
}
