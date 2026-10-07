// View-only portfolio viewer for /portfolio/2026/
// Pages are pre-rendered WebP images (see _scripts/render_portfolio.py); no PDF is served.
(function () {
  var container = document.getElementById("pf-viewer-container");
  var viewer = document.getElementById("pf-viewer");
  var pageLabel = document.getElementById("pf-page");
  var pageCount = parseInt(container.dataset.pages, 10);
  var base = container.dataset.base;
  var RATIO = 842 / 595; // A4 landscape
  var GAP = 4;
  var PAD = 12;
  var zoom = 1;
  var rows = [];

  var narrow = function () { return window.matchMedia("(max-width: 800px)").matches; };
  var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };

  // Deterrents: no context menu, no save/print shortcuts, no drag-out
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && ["s", "p"].indexOf(e.key.toLowerCase()) !== -1) e.preventDefault();
  });

  // Load images only as they approach the visible area
  var loader = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var img = entry.target;
      var stem = base + "p" + pad2(img.dataset.page);
      img.srcset = stem + "-1600.webp 1600w, " + stem + "-3000.webp 3000w";
      img.src = stem + "-1600.webp";
      loader.unobserve(img);
    });
  }, { root: container, rootMargin: "100% 0px" });

  var makeImg = function (n) {
    var img = document.createElement("img");
    img.dataset.page = n;
    img.alt = "Page " + n;
    img.width = 842;
    img.height = 595;
    img.draggable = false;
    img.decoding = "async";
    loader.observe(img);
    return img;
  };

  // Rows: cover alone, then 2-3, 4-5, ... on desktop; one page per row on phones
  var build = function () {
    viewer.innerHTML = "";
    rows = [];
    var groups = [];
    if (narrow()) {
      for (var i = 1; i <= pageCount; i++) groups.push([i]);
    } else {
      groups.push([1]);
      for (var j = 2; j <= pageCount; j += 2) groups.push(j + 1 <= pageCount ? [j, j + 1] : [j]);
    }
    groups.forEach(function (pages) {
      var row = document.createElement("div");
      row.className = "pf-row";
      row.dataset.pages = pages.join("–");
      pages.forEach(function (n) { row.appendChild(makeImg(n)); });
      viewer.appendChild(row);
      rows.push(row);
    });
  };

  var currentRow = function () {
    var mid = container.scrollTop + container.clientHeight / 3;
    var idx = 0;
    rows.forEach(function (row, i) { if (row.offsetTop <= mid) idx = i; });
    return idx;
  };

  var goTo = function (idx) {
    idx = Math.max(0, Math.min(rows.length - 1, idx));
    container.scrollTop = rows[idx].offsetTop - PAD;
  };

  var updateLabel = function () {
    if (rows.length) pageLabel.textContent = rows[currentRow()].dataset.pages + " / " + pageCount;
  };

  // Size pages so a whole spread (or one page on phones) fits the window, times the zoom factor
  var layout = function () {
    var keep = rows.length ? currentRow() : 0;
    var xCenter = container.scrollWidth > container.clientWidth
      ? (container.scrollLeft + container.clientWidth / 2) / container.scrollWidth
      : 0.5;
    var w = container.clientWidth - 2 * PAD;
    var h = container.clientHeight - 2 * PAD;
    var fitWidth = narrow() ? w : Math.min((w - GAP) / 2, h * RATIO);
    var pw = Math.max(100, Math.floor(fitWidth * zoom));
    viewer.style.setProperty("--pw", pw + "px");
    viewer.querySelectorAll("img").forEach(function (img) { img.sizes = pw + "px"; });
    goTo(keep);
    container.scrollLeft = xCenter * container.scrollWidth - container.clientWidth / 2; // keep horizontal focus when zooming
    updateLabel();
  };

  var wasNarrow = narrow();
  build();
  layout();

  container.addEventListener("scroll", function () { window.requestAnimationFrame(updateLabel); }, { passive: true });

  var step = function (dir) { goTo(currentRow() + dir); };
  document.getElementById("pf-prev").addEventListener("click", function () { step(-1); });
  document.getElementById("pf-next").addEventListener("click", function () { step(1); });
  document.getElementById("pf-zoom-in").addEventListener("click", function () { zoom = Math.min(zoom * 1.25, 5); layout(); });
  document.getElementById("pf-zoom-out").addEventListener("click", function () { zoom = Math.max(zoom / 1.25, 0.4); layout(); });
  document.getElementById("pf-fit").addEventListener("click", function () { zoom = 1; layout(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown") { step(1); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { step(-1); e.preventDefault(); }
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (narrow() !== wasNarrow) {
        wasNarrow = narrow();
        var keepPage = rows[currentRow()].querySelector("img").dataset.page;
        build();
        layout();
        rows.forEach(function (row, i) { if (row.querySelector('img[data-page="' + keepPage + '"]')) goTo(i); });
      } else {
        layout();
      }
    }, 150);
  });

  // Full screen on the toolbar + viewer; hidden where unsupported (e.g. iPhone Safari)
  var wrap = document.querySelector(".pf-wrap");
  var fsButton = document.getElementById("pf-fullscreen");
  var fsElement = function () { return document.fullscreenElement || document.webkitFullscreenElement; };
  if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
    fsButton.hidden = false;
    document.getElementById("pf-fs-sep").hidden = false;
    fsButton.addEventListener("click", function () {
      if (fsElement()) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        (wrap.requestFullscreen || wrap.webkitRequestFullscreen).call(wrap);
      }
    });
    var onFsChange = function () {
      fsButton.innerHTML = fsElement() ? "&#x2715;<span class=\"pf-fs-text\"> Exit full screen</span>" : "&#x26F6;<span class=\"pf-fs-text\"> Full screen</span>";
      setTimeout(layout, 100); // wait for the new size to settle
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
  }
})();
