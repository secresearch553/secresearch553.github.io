// Progressive enhancements: mobile menu, active link, reading progress, copy buttons.
(function () {
  "use strict";

  var page = location.pathname.split("/").pop() || "index.html";
  var research = /^CVE-/i.test(page);
  var notes = ["BeanShell1","BeanValidationToRce","CommonsBeanUtils1","CommonsCollection1","CommonsCollection2",
    "CommonsCollection3","CommonsCollection4","CommonsCollection5","CommonsCollection6","CommonsCollection7",
    "GPGBypass","Groovy1","HackingJWT","InsecureDeserialization","JDBCInjection","JNDIToRCE",
    "beyondcommoncollections","customgadget","ysoserial","test"];
  var section = research ? "research.html" : notes.indexOf(page.replace(".html", "")) > -1 ? "blogs.html" : page;

  document.querySelectorAll(".site-nav a[href]").forEach(function (a) {
    if (a.getAttribute("href") === section) a.setAttribute("aria-current", "page");
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  var article = document.querySelector(".article");
  if (article) {
    var bar = document.createElement("div");
    bar.className = "progress";
    document.body.appendChild(bar);
    var tick = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    addEventListener("scroll", tick, { passive: true });
    tick();
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    if (!navigator.clipboard) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var clone = pre.cloneNode(true);
      var b = clone.querySelector(".copy-btn");
      if (b) b.remove();
      navigator.clipboard.writeText(clone.textContent).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      });
    });
    pre.appendChild(btn);
  });
})();
