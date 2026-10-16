// PDF viewer for /CV/ with selectable text, clickable links and a download button
// PDF.js 4.10.38 is self-hosted under /assets/pdfjs/ so it doesn't depend on a CDN
const container = document.getElementById("cv-viewer-container");
const PDFJS = container.dataset.pdfjs;

const pdfjsLib = await import(`${PDFJS}/pdf.min.js`);
globalThis.pdfjsLib = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS}/pdf.worker.min.js`;
const { EventBus, PDFLinkService, PDFViewer, LinkTarget } = await import(`${PDFJS}/pdf_viewer.js`);

const status = document.getElementById("cv-status");
const pageLabel = document.getElementById("cv-page");

const eventBus = new EventBus();
const linkService = new PDFLinkService({ eventBus, externalLinkTarget: LinkTarget.BLANK, externalLinkRel: "noopener" });
const viewer = new PDFViewer({ container, eventBus, linkService }); // text and link layers on by default
linkService.setViewer(viewer);

const fit = () => { viewer.currentScaleValue = "page-width"; };
const updateLabel = () => { pageLabel.textContent = `${viewer.currentPageNumber} / ${viewer.pagesCount}`; };

eventBus.on("pagesinit", () => {
  fit();
  updateLabel();
  status.remove();
});
eventBus.on("pagechanging", updateLabel);

const step = (dir) => {
  viewer.currentPageNumber = Math.min(Math.max(1, viewer.currentPageNumber + dir), viewer.pagesCount);
};

document.getElementById("cv-prev").addEventListener("click", () => step(-1));
document.getElementById("cv-next").addEventListener("click", () => step(1));
document.getElementById("cv-zoom-in").addEventListener("click", () => { viewer.currentScale *= 1.2; });
document.getElementById("cv-zoom-out").addEventListener("click", () => { viewer.currentScale /= 1.2; });
document.getElementById("cv-fit").addEventListener("click", fit);
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea")) return;
  if (e.key === "ArrowRight" || e.key === "PageDown") { step(1); e.preventDefault(); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { step(-1); e.preventDefault(); }
});

// Full screen on the toolbar + viewer; hidden where unsupported (e.g. iPhone Safari)
const wrap = document.querySelector(".cv-wrap");
const fsButton = document.getElementById("cv-fullscreen");
const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;
if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
  fsButton.hidden = false;
  document.getElementById("cv-fs-sep").hidden = false;
  fsButton.addEventListener("click", () => {
    if (fsElement()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (wrap.requestFullscreen || wrap.webkitRequestFullscreen).call(wrap);
    }
  });
  const onFsChange = () => {
    fsButton.innerHTML = fsElement()
      ? "&#x2715;<span class=\"cv-btn-text\"> Exit full screen</span>"
      : "&#x26F6;<span class=\"cv-btn-text\"> Full screen</span>";
    setTimeout(fit, 100); // wait for the new size to settle
  };
  document.addEventListener("fullscreenchange", onFsChange);
  document.addEventListener("webkitfullscreenchange", onFsChange);
}

// Refit on window resize unless the visitor has zoomed in or out
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (viewer.currentScaleValue === "page-width") fit(); }, 150);
});

try {
  const task = pdfjsLib.getDocument({ url: container.dataset.pdf });
  task.onProgress = ({ loaded, total }) => {
    if (status.isConnected && total) status.textContent = `Loading CV… ${Math.round((100 * loaded) / total)}%`;
  };
  const pdf = await task.promise;
  viewer.setDocument(pdf);
  linkService.setDocument(pdf);
} catch (err) {
  status.innerHTML = 'Sorry, the CV could not be shown here. <a href="' + container.dataset.pdf + '" style="pointer-events:auto">Open the PDF</a>.';
  console.error(err);
}
