(function () {
  const routes = {
    "#/": { view: "main", title: "深度觉醒 | AI 行业智能工作台", description: "深度觉醒为企业提供 AI 行业解决方案与智能体工作台。" },
    "#/law": { view: "law", title: "律智AI | 深度觉醒", description: "面向律师与法务团队的 AI 智能工作台。" },
    "#/cross-border": { view: "cross", title: "跨境智营 | 深度觉醒", description: "面向跨境电商的 AI 增长与运营引擎。" },
    "#/media": { view: "media", title: "爆文工厂 | 深度觉醒", description: "面向内容团队与创作者的 AI 内容中台。" },
    "#/agent": { view: "agent", title: "企业智能体目录 | 深度觉醒", description: "查看深度觉醒企业智能体能力与使用场景。" },
    "#/video-agent": { view: "video", title: "短视频获客智能体 | 深度觉醒", description: "用 AI 生成短视频获客内容资产。" }
  };
  const routeByDetail = { law: "#/law", cross: "#/cross-border", media: "#/media" };
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const canonical = document.querySelector('link[rel="canonical"]');
  const modal = document.querySelector("[data-modal]");
  let modalOpener = null;
  const status = document.createElement("div");
  status.className = "site-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  document.body.appendChild(status);

  function announce(message, tone = "info") {
    status.textContent = message;
    status.dataset.tone = tone;
    status.classList.add("show");
    clearTimeout(announce.timer);
    announce.timer = setTimeout(() => status.classList.remove("show"), 4200);
  }

  function setMetadata(route) {
    document.title = route.title;
    description?.setAttribute("content", route.description);
    ogTitle?.setAttribute("content", route.title);
    ogDescription?.setAttribute("content", route.description);
    canonical?.setAttribute("href", `https://www.setdx.com/${location.hash || ""}`);
  }

  function applyRoute() {
    const key = routes[location.hash] ? location.hash : "#/";
    const route = routes[key];
    if (route.view === "main") showMain();
    else showDetail(route.view);
    setMetadata(route);
  }

  document.addEventListener("click", (event) => {
    const detail = event.target.closest("[data-detail]");
    const agent = event.target.closest(".agent-card[data-agent-key]");
    const main = event.target.closest("[data-main-link]");
    if (detail) location.hash = routeByDetail[detail.dataset.detail] || "#/";
    else if (agent) location.hash = agent.dataset.agentKey === "video" ? "#/video-agent" : "#/agent";
    else if (main && !main.dataset.scrollTarget) location.hash = "#/";
    if (event.target.closest("[data-open-modal]")) modalOpener = event.target.closest("button, a");
    if (detail) window.trackSiteEvent?.("product_detail_open", { product: detail.dataset.detail });
    if (event.target.closest("[data-open-modal]")) window.trackSiteEvent?.("booking_modal_open");
    if (event.target.closest("[data-submit-booking]")) window.trackSiteEvent?.("booking_submit_attempt");
  });

  window.addEventListener("hashchange", applyRoute);
  if (location.hash) applyRoute();

  document.querySelectorAll("img:not(.hero-bg)").forEach((img) => {
    img.loading = "lazy";
    img.decoding = "async";
  });
  document.querySelector(".hero-bg")?.setAttribute("fetchpriority", "high");

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("active")) {
      closeModal();
      modalOpener?.focus();
    }
  });
  new MutationObserver(() => {
    if (modal?.classList.contains("active")) modal.querySelector("input, button")?.focus();
    else modalOpener?.focus();
  }).observe(modal, { attributes: true, attributeFilter: ["class"] });

  window.trackSiteEvent = function (name, detail = {}) {
    window.dispatchEvent(new CustomEvent("site:analytics", { detail: { name, ...detail } }));
  };

  window.addEventListener("offline", () => announce("网络已断开，请检查连接后重试。", "error"));
  window.addEventListener("online", () => announce("网络已恢复。", "success"));
  window.addEventListener("unhandledrejection", () => announce("服务暂时繁忙，请稍后重试。", "error"));

  if ("PerformanceObserver" in window) {
    try {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => window.trackSiteEvent("web_vital", {
          metric: entry.entryType,
          value: Math.round(entry.duration || entry.startTime || 0)
        }));
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
  }

  document.documentElement.lang = localStorage.getItem("siteLanguage") || "zh-CN";
  window.setSiteLanguage = function (language) {
    const next = language === "en" ? "en" : "zh-CN";
    localStorage.setItem("siteLanguage", next);
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent("site:language", { detail: { language: next } }));
  };
})();
