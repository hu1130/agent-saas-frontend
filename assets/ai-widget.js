(function () {
  const defaults = {
    brandName: "深度觉醒 AI 顾问",
    greeting: "你好，我是深度觉醒的 AI 数字人顾问。你可以问我企业方案、智能体产品、适合哪个场景，或直接预约演示。",
    presenceTitle: "你好，我在这里",
    presenceMessage: "想知道哪类智能体适合你？点我聊聊。",
    avatar: "assets/ai-digital-human.png",
    figure: "assets/ai-halfbody-consultant.png",
    figures: [
      "assets/ai-halfbody-consultant.png",
      "assets/ai-halfbody-strategist.png",
      "assets/ai-halfbody-operator.png"
    ],
    avatars: [
      "assets/ai-avatar-consultant.png",
      "assets/ai-avatar-strategist.png",
      "assets/ai-avatar-operator.png"
    ],
    endpoint: "http://8.210.39.222/v1/chat",
    apiKey: "",
    sessionNamespace: "default",
    sessionTtlMs: 30 * 60 * 1000,
    quickQuestions: ["我们有哪些智能体？", "律师适合哪个产品？", "跨境电商怎么用？", "预约演示"]
  };

  const config = Object.assign({}, defaults, window.AI_DIGITAL_HUMAN_CONFIG || {});
  if (!config.endpoint) {
    config.endpoint = "http://8.210.39.222/v1/chat";
  }
  const avatarPool = Array.isArray(config.avatars) && config.avatars.length ? config.avatars : [config.avatar];
  const figurePool = Array.isArray(config.figures) && config.figures.length ? config.figures : [config.figure];
  const personaIndex = Math.floor(Math.random() * Math.max(figurePool.length, avatarPool.length));
  config.figure = figurePool[personaIndex % figurePool.length] || config.figure;
  config.avatar = avatarPool[personaIndex % avatarPool.length] || config.avatar;
  const icons = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="M9 21H3v-6"/><path d="m3 21 7-7"/></svg>',
    collapse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 3v5H3"/><path d="m3 8 6-6"/><path d="M16 21v-5h5"/><path d="m21 16-6 6"/></svg>'
  };

  const widget = document.createElement("section");
  widget.className = "ai-human-widget";
  widget.setAttribute("aria-label", config.brandName);
  widget.innerHTML = `
    <button class="ai-human-presence" type="button" aria-label="打开${escapeHtml(config.brandName)}">
      <span class="ai-human-presence-frame">
        <img class="ai-human-presence-image" src="${config.figure}" alt="" />
      </span>
      <span class="ai-human-presence-bubble">
        <strong>${escapeHtml(config.presenceTitle)}</strong>
        ${escapeHtml(config.presenceMessage)}
      </span>
    </button>
    <button class="ai-human-size" type="button" aria-label="缩小数字人">${icons.collapse}</button>
    <button class="ai-human-launcher" type="button" aria-label="打开${escapeHtml(config.brandName)}">
      <img class="ai-human-launcher-avatar" src="${config.avatar}" alt="" />
      <span class="ai-human-launcher-label">
        <strong>${escapeHtml(config.brandName)}</strong>
        <span>在线为你解答</span>
      </span>
    </button>
    <div class="ai-human-panel" role="dialog" aria-label="${escapeHtml(config.brandName)}">
      <div class="ai-human-hero">
        <div class="ai-human-topbar">
          <div class="ai-human-title">
            <strong>${escapeHtml(config.brandName)}</strong>
            <span>智能咨询中</span>
          </div>
          <button class="ai-human-close" type="button" aria-label="关闭">${icons.close}</button>
        </div>
        <div class="ai-human-avatar-stage">
          <img class="ai-human-avatar" src="${config.avatar}" alt="${escapeHtml(config.brandName)}形象" />
        </div>
        <div class="ai-human-status">在线</div>
      </div>
      <div class="ai-human-messages" aria-live="polite"></div>
      <div class="ai-human-quick"></div>
      <form class="ai-human-form">
        <input class="ai-human-input" name="message" autocomplete="off" placeholder="请输入你的问题" />
        <button class="ai-human-send" type="submit" aria-label="发送">${icons.send}</button>
      </form>
    </div>
  `;

  document.body.appendChild(widget);

  const sizeKey = "aiHumanDisplayMode";
  const presence = widget.querySelector(".ai-human-presence");
  const sizeButton = widget.querySelector(".ai-human-size");
  const launcher = widget.querySelector(".ai-human-launcher");
  const close = widget.querySelector(".ai-human-close");
  const messages = widget.querySelector(".ai-human-messages");
  const quick = widget.querySelector(".ai-human-quick");
  const form = widget.querySelector(".ai-human-form");
  const input = widget.querySelector(".ai-human-input");
  const avatarStage = widget.querySelector(".ai-human-avatar-stage");

  addMessage(config.greeting, "bot");
  config.quickQuestions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ai-human-chip";
    button.textContent = question;
    button.addEventListener("click", () => submitMessage(question));
    quick.appendChild(button);
  });

  if (window.localStorage.getItem(sizeKey) === "mini") {
    widget.classList.add("is-mini");
  }
  updateSizeButton();

  presence.addEventListener("click", openPanel);
  launcher.addEventListener("click", openPanel);
  sizeButton.addEventListener("click", toggleDisplayMode);
  close.addEventListener("click", () => widget.classList.remove("is-open"));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitMessage(input.value.trim());
  });
  messages.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });
  let touchStartX = 0;
  let touchStartY = 0;
  messages.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    touchStartX = touch?.clientX || 0;
    touchStartY = touch?.clientY || 0;
  }, { passive: true });
  messages.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = Math.abs(touch.clientX - touchStartX);
    const deltaY = Math.abs(touch.clientY - touchStartY);
    if (deltaX > deltaY) {
      event.preventDefault();
    }
    event.stopPropagation();
  }, { passive: false });

  function openPanel() {
    widget.classList.add("is-open");
    window.setTimeout(() => input.focus(), 140);
  }

  function toggleDisplayMode(event) {
    event.stopPropagation();
    widget.classList.toggle("is-mini");
    window.localStorage.setItem(sizeKey, widget.classList.contains("is-mini") ? "mini" : "large");
    updateSizeButton();
  }

  function updateSizeButton() {
    const isMini = widget.classList.contains("is-mini");
    sizeButton.innerHTML = isMini ? icons.expand : icons.collapse;
    sizeButton.setAttribute("aria-label", isMini ? "放大数字人" : "缩小数字人");
  }

  async function submitMessage(text) {
    if (!text) return;
    input.value = "";
    addMessage(text, "user");
    const typingIndicator = addTypingIndicator();
    setSpeaking(true);
    try {
      const answer = await getAnswer(text);
      removeTypingIndicator(typingIndicator);
      await addBotAnswer(answer);
    } catch {
      addMessage("抱歉，当前智能服务暂时不可用。你也可以点击官网的“预约演示”，我们会安排顾问跟进。", "bot");
    } finally {
      removeTypingIndicator(typingIndicator);
      setSpeaking(false);
    }
  }

  async function getAnswer(text) {
    if (config.endpoint) {
      if (!config.apiKey) {
        throw new Error("AI apiKey is not configured");
      }
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: getSessionId(),
          api_key: config.apiKey || ""
        })
      });
      if (!response.ok) throw new Error("AI endpoint failed");
      const data = await response.json();
      if (Array.isArray(data.messages) && data.messages.length) return data.messages;
      return data.answer || data.message || "我已收到你的问题，会继续为你整理答案。";
    }
    await wait(520);
    return demoReply(text);
  }

  async function addBotAnswer(answer) {
    if (Array.isArray(answer)) {
      for (const item of answer) {
        const delay = Number(item.delay_ms || 0);
        if (delay > 0) await wait(Math.min(delay, 2200));
        addMessage(item.text || item.message || String(item), "bot");
      }
      return;
    }
    addMessage(answer, "bot");
  }

  function getSessionId() {
    const key = `aiHumanSession:${config.sessionNamespace || "default"}`;
    const now = Date.now();
    let stored = null;
    try {
      stored = JSON.parse(window.localStorage.getItem(key) || "null");
    } catch {
      stored = null;
    }
    const isFresh = stored && stored.id && now - Number(stored.updatedAt || 0) < Number(config.sessionTtlMs || 0);
    const sessionId = isFresh ? stored.id : `web-${now}-${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(key, JSON.stringify({ id: sessionId, updatedAt: now }));
    if (window.localStorage.getItem("aiHumanSessionId")) {
      window.localStorage.removeItem("aiHumanSessionId");
    }
    return sessionId;
  }

  function demoReply(text) {
    const normalized = text.toLowerCase();
    if (text.includes("智能体") || text.includes("产品")) {
      return "目前官网重点展示三类智能体：律智AI适合法律文书、合同审查和当事人咨询；跨境智营适合海外获客、多语客服和SKU内容；爆文工厂适合选题、改稿、分发和数据复盘。";
    }
    if (text.includes("律师") || text.includes("合同") || text.includes("法律")) {
      return "律师场景建议看律智AI。它能做合同风险扫描、起诉状生成、法院模板校验，以及7×24常见法律咨询预处理，让律师把时间留给庭审策略。";
    }
    if (text.includes("跨境") || text.includes("电商") || text.includes("客服") || normalized.includes("return")) {
      return "跨境电商建议看跨境智营。它覆盖海外获客、广告文案本地化、多语言客服、退换货售后处理和SKU描述批量生成。";
    }
    if (text.includes("自媒体") || text.includes("创作") || text.includes("爆文") || text.includes("选题")) {
      return "内容团队建议看爆文工厂。它能做热点雷达、选题预测、一稿多平台改写、封面话术和数据复盘，适合把创作者从重复运营里解放出来。";
    }
    if (text.includes("方案") || text.includes("行业")) {
      return "企业方案覆盖制造、金融保险、电商零售、教育培训、政务公共服务、物流供应链六类场景。你可以告诉我你的行业，我帮你定位优先落地的AI流程。";
    }
    if (text.includes("预约") || text.includes("演示") || text.includes("联系")) {
      return "可以预约演示。你可以点击页面右上角或底部按钮提交公司、姓名和手机号，我们会按你的行业安排对应方案演示。";
    }
    if (text.includes("价格") || text.includes("报价") || normalized.includes("price")) {
      return "价格通常会根据使用人数、智能体类型、对话量和是否需要系统接入来配置。建议先预约演示，我们会按场景给你估算版本和报价。";
    }
    return "我理解了。你可以继续告诉我你的行业、团队规模和最想交给AI的任务，我会帮你判断适合企业方案，还是先从律智AI、跨境智营、爆文工厂中的一个开始。";
  }

  function addMessage(text, type) {
    const item = document.createElement("div");
    item.className = `ai-human-message ${type}`;
    const avatar = document.createElement("span");
    avatar.className = "ai-human-message-avatar";
    if (type === "bot") {
      const image = document.createElement("img");
      image.src = config.avatar;
      image.alt = "";
      avatar.appendChild(image);
    } else {
      avatar.textContent = "用户";
      avatar.setAttribute("aria-hidden", "true");
    }
    const bubble = document.createElement("span");
    bubble.className = "ai-human-message-bubble";
    bubble.textContent = text;
    item.appendChild(avatar);
    item.appendChild(bubble);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function addTypingIndicator() {
    const item = document.createElement("div");
    item.className = "ai-human-message bot ai-human-typing";
    item.setAttribute("aria-label", "\u6b63\u5728\u8f93\u5165\u4e2d");

    const avatar = document.createElement("span");
    avatar.className = "ai-human-message-avatar";
    const image = document.createElement("img");
    image.src = config.avatar;
    image.alt = "";
    avatar.appendChild(image);

    const bubble = document.createElement("span");
    bubble.className = "ai-human-message-bubble";
    const label = document.createElement("span");
    label.className = "ai-human-typing-label";
    label.textContent = "\u6b63\u5728\u8f93\u5165\u4e2d";
    const dots = document.createElement("span");
    dots.className = "ai-human-typing-dots";
    dots.setAttribute("aria-hidden", "true");

    for (let index = 0; index < 3; index += 1) {
      dots.appendChild(document.createElement("i"));
    }

    bubble.appendChild(label);
    bubble.appendChild(dots);
    item.appendChild(avatar);
    item.appendChild(bubble);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    return item;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  function setSpeaking(isSpeaking) {
    avatarStage.classList.toggle("ai-human-speaking", isSpeaking);
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
