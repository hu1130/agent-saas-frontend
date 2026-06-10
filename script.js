const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const cursorAura = document.querySelector("[data-cursor-aura]");
const hero = document.querySelector("[data-hero]");
const heroScan = document.querySelector("[data-hero-scan]");
const starCanvas = document.querySelector("[data-stars]");
const mainPage = document.querySelector("#main-page");
const detailPages = document.querySelectorAll("[data-detail-page]");
const signalText = document.querySelector("[data-signal-text]");
const solutionPanel = document.querySelector("[data-solution-panel]");
const tabs = document.querySelectorAll("[data-industry]");
const agentCards = document.querySelectorAll("[data-agent-key]");
const consoleKicker = document.querySelector("[data-console-kicker]");
const consoleTitle = document.querySelector("[data-console-title]");
const consoleCopy = document.querySelector("[data-console-copy]");
const consoleFlow = document.querySelector("[data-console-flow]");
const backTop = document.querySelector("[data-back-top]");
const modal = document.querySelector("[data-modal]");
const modalForm = document.querySelector("[data-modal-form]");
const modalSuccess = document.querySelector("[data-modal-success]");
const formError = document.querySelector("[data-form-error]");

const solutions = {
  mfg: {
    title: "让每一台设备、每一道工序、每一个订单，都在 AI 的调度下自动运转",
    copy: "制造业的竞争已经从“谁能造”变成了“谁能造得更快、更省、更准”。订单还在靠 Excel 排、质检还在靠老师傅眼力、设备坏了才知道修，这些效率黑洞每年在吃掉 15%-25% 的利润。",
    cards: [
      ["智能排产系统", "AI 根据订单紧急度、设备状态、物料库存，实时计算最优生产计划。", "交期延误减少 40%，产能利用率提升 25%"],
      ["预测性设备维护", "接入设备传感器数据，AI 提前 7-14 天预警故障，自动生成维修工单。", "非计划停机减少 50%，维修成本降低 30%"],
      ["AI 视觉质检", "产线摄像头实时检测产品外观缺陷，毫秒级判断合格/不合格。", "漏检率从 3% → 0.1%，质检人力减少 70%"],
      ["智能供应链协同", "AI 自动分析供应商交期、原材料价格波动、物流状态，动态调整采购计划。", "库存周转率提升 35%，缺料停工减少 60%"],
      ["智能工单与售后", "客户报修自动诊断故障原因，自动匹配维修方案和备件。", "故障响应时间缩短 80%，一次修复率提升 40%"],
    ],
  },
  finance: {
    title: "风险看得见，合规守得住，客户服务快人一步",
    copy: "金融行业不差钱，差的是效率。一笔企业信贷审 3 天，一份合同合规查 2 天，一个客户问了 5 次还在排队等人工。",
    cards: [
      ["智能风控与授信", "AI 自动采集企业工商、司法、税务、舆情数据，秒级生成风险评估报告。", "信贷审批从 3 天 → 30 分钟，不良率下降 25%"],
      ["智能合规审查", "AI 自动对比合同、产品文案、营销材料与最新监管条款。", "合规审查效率提升 90%，处罚风险降低 80%"],
      ["智能客服与营销", "7×24 小时 AI 回答理财、贷款、保险等高频问题。", "客服人力减少 50%，交叉销售转化率提升 35%"],
      ["智能理赔系统", "AI 识别车损照片/医疗单据，自动匹配保单条款和赔付标准。", "小额理赔从 3 天 → 10 分钟，运营成本降低 60%"],
      ["智能投研助手", "AI 自动抓取研报、新闻、财报，生成行业分析简报。", "投研效率提升 5 倍，信息覆盖率提升 90%"],
    ],
  },
  retail: {
    title: "从选品到售后，AI 搞定全部线上运营",
    copy: "流量越来越贵、客户耐心越来越短。对手用 1 个人 + AI，成本是你的一半，效率是你的两倍。",
    cards: [
      ["AI 商品内容工厂", "输入产品参数，一键生成标题、详情、卖点、多语种版本和短视频脚本。", "上架效率提升 5 倍，内容团队缩减 60%"],
      ["智能客服（大促版）", "大促峰值 10 万+并发秒级响应，自动处理退换货、物流查询、优惠券问题。", "大促人力成本降低 70%，客户满意度提升 25%"],
      ["智能补货与库存", "AI 结合销量趋势、促销计划、季节因素、竞品动态，自动生成补货建议。", "缺货率降低 40%，滞销库存减少 35%"],
      ["精准用户运营", "AI 根据用户行为自动分层打标签，自动推送个性化优惠券和内容。", "复购率提升 30%，营销 ROI 提升 2 倍"],
      ["智能评论分析", "AI 自动分析全平台用户评论，提取高频问题、负面情绪、产品改进建议。", "差评响应速度提升 90%"],
    ],
  },
  edu: {
    title: "让每个老师都有 AI 助教，让每个学生都有 AI 私教",
    copy: "一个老师带 100 个学生，作业改到凌晨，答疑只能覆盖 20%。AI 让老师的精力只花在最值得的地方。",
    cards: [
      ["AI 课程生成系统", "输入教学目标、受众、时长，自动生成课程大纲、讲义、PPT、试题。", "课程开发效率提升 4 倍"],
      ["智能作业批改", "AI 自动批改客观题，辅助批改作文和论述题。", "批改时间减少 75%"],
      ["7×24 AI 答疑助手", "学生随时提问，AI 根据课程知识库个性化解答。", "答疑覆盖率从 20% → 100%"],
      ["AI 招生转化助手", "自动跟进潜在学员，智能回答课程相关问题。", "试听转化率提升 40%，跟进人力减少 60%"],
      ["学情智能分析", "AI 分析学生数据，自动生成个人学情报告和薄弱点诊断。", "续费率提升 25%"],
    ],
  },
  gov: {
    title: "让群众少跑路，让窗口少排队，让政策听得懂",
    copy: "政务服务的三大顽疾：政策看不懂、表单填不对、咨询排不上。AI 把流程变成可理解、可校验、可即时响应的服务。",
    cards: [
      ["政策智能解读", "AI 把政府文件转化为大白话问答，自动告知条件、流程、材料。", "窗口咨询量减少 60%，群众满意度提升 40%"],
      ["智能表单引导", "在线填表时 AI 实时引导，自动校验格式、完整性和逻辑一致性。", "表单一次通过率从 50% → 90%"],
      ["7×24 智能政务客服", "接入官网、公众号、小程序，AI 秒答常见问题。", "人工接线压力降低 55%"],
      ["AI 公文助手", "输入要点自动生成标准格式公文，自动校验格式规范性。", "公文效率提升 5 倍，格式错误率降到 0"],
      ["智能数据分析", "自动汇总多部门数据，AI 生成经济运行分析、民生趋势报告。", "数据报告制作时间从 2 周 → 1 天"],
    ],
  },
  logistics: {
    title: "每一件货的最优路线、最优时间、最优成本，AI 替你算好了",
    copy: "物流行业本质上是数学题。当变量多到人脑算不过来时，“差不多”每年带来的成本浪费通常占总营收的 8%-12%。",
    cards: [
      ["智能路径规划", "AI 实时分析路况、天气、限行、车辆载重，秒级计算最优路线。", "运输成本降低 15%，准点率提升 25%"],
      ["智能仓储管理", "AI 优化货位布局和拣货路径，自动调度 AGV/叉车。", "拣货效率提升 3 倍，空间利用率提升 20%"],
      ["智能报关系统", "AI 自动生成报关单，校验 HS 编码、税率、监管条件。", "清关时间缩短 60%，退单率降到 1% 以下"],
      ["异常预警与调度", "AI 实时监测全链路，自动识别延误、丢失、破损。", "异常响应速度提升 80%，客户投诉减少 45%"],
      ["需求预测与运力调度", "AI 预测未来 7-30 天订单量，自动调度运力。", "运力浪费减少 30%，爆仓概率降低 50%"],
    ],
  },
};

const agents = {
  doc: {
    signal: "文书生成智能体正在生成专业初稿",
    kicker: "文书生成智能体",
    title: "把重复写作变成可校验的专业初稿",
    copy: "它不等于某一个行业产品，而是一种底层能力：能把案情、商品参数、运营目标或内容要求转成结构化文档。",
    flow: ["读取输入材料", "匹配模板与知识库", "生成初稿并标出待确认项"],
  },
  risk: {
    signal: "风险审查智能体正在识别隐性问题",
    kicker: "风险审查智能体",
    title: "在合同、流程和投放里提前发现风险",
    copy: "它负责做审查、比对和预警：合同条款、立案材料、广告投放、售后规则都可以交给它先筛一轮。",
    flow: ["扫描差异和异常", "匹配规则与历史案例", "输出风险等级和修改建议"],
  },
  service: {
    signal: "多语客服智能体正在接待咨询",
    kicker: "多语客服智能体",
    title: "7×24 接住咨询、售后和线索分流",
    copy: "它面向客户沟通场景，先回答标准问题，再把复杂问题、高价值线索或投诉风险交给人工处理。",
    flow: ["识别语言和意图", "调用知识库自动回复", "标记复杂问题并转人工"],
  },
  content: {
    signal: "商品内容智能体正在批量生成 SKU 描述",
    kicker: "商品内容智能体",
    title: "批量生成可上架、可投放的内容资产",
    copy: "它适合电商和出海团队，把产品参数变成标题、卖点、详情页、广告文案和多平台版本。",
    flow: ["读取产品参数", "适配平台风格", "生成多版本内容并优化关键词"],
  },
  trend: {
    signal: "热点选题智能体正在预测高爆选题",
    kicker: "热点选题智能体",
    title: "从趋势里提前发现可爆的内容方向",
    copy: "它不是写稿工具，而是内容雷达：监测热点、匹配账号定位，并把选题、标题和脚本角度提前推给创作者。",
    flow: ["抓取平台趋势", "匹配账号定位", "输出选题、标题和脚本角度"],
  },
};

const pains = {
  law: [
    ["深夜咨询轰炸", "凌晨3点当事人发微信问“这个合同能不能签”，你不得不爬起来查法条", "7×24 AI法律咨询助手", "当事人常见问题自动专业回复，复杂问题智能标记待你处理。不用再凌晨起床翻法条，AI先挡一轮。"],
    ["文书反复修改", "一份起诉状改8遍，立案材料总因格式错误被法院退回", "智能文书生成 + 法院模板库", "输入案情一键生成规范诉状，自动校验立案材料完整性。格式零错误，一次过立案审查。"],
    ["合同肉眼比对", "10页合同对方改了3处，肉眼对比2小时还漏了隐性风险条款", "合同智能比对 + 风险扫描", "3分钟标出所有差异点，自动提示不利条款和修改建议。隐性风险一个不漏。"],
  ],
  cross: [
    ["广告投放不精准", "投了几千美金广告，来的全是印度流量，精准客资转化率不到1%", "AI客资画像 + 投放优化", "自动识别高意向地域人群，广告文案本地化生成，CTR 提升 3 倍。"],
    ["深夜客服缺位", "凌晨2点美国客户问“How to return”，客服 asleep，差评来了", "12语言AI客服实时在线", "覆盖英西法德日等12种语言，自动处理退换货、物流、售后标准问题。"],
    ["产品描述写不完", "100个SKU每个要写5版描述，团队3人写了两周还没上架完", "批量AI产品描述生成", "自动适配亚马逊、TikTok、独立站风格，一键优化 SEO 关键词。"],
  ],
  media: [
    ["选题焦虑", "每天刷3小时热点找选题，写了5篇都没爆，怀疑平台限流", "AI热点雷达 + 选题预测", "实时抓取全平台趋势，结合你的账号定位智能推荐高爆率选题。"],
    ["多平台改稿地狱", "一篇稿子改5版适配抖音/小红书/公众号/视频号，改到想弃号", "一稿多平台智能改写", "自动调整文风、字数、标签、封面话术，一键分发四平台。"],
    ["数据迷宫", "后台数据一堆，不知道哪篇为什么爆、哪篇为什么死", "智能数据复盘", "自动拆解爆款因子，生成下周优化策略。不看Excel，直接告诉你下周三要发什么。"],
  ],
};

const flows = {
  cross: [["1", "AI客资画像", "识别高意向地域"], ["2", "本地化内容", "母语级广告+Listing"], ["3", "多语客服", "12语言24h在线"], ["4", "批量上架", "200SKU/天"], ["5", "智能复盘", "自动数据优化"]],
  media: [["1", "热点雷达", "30秒锁定爆款选题"], ["2", "一稿多平台", "4版本一次生成"], ["3", "智能配图排版", "30秒适配各平台"], ["4", "一键分发", "5分钟完成全平台"], ["5", "数据复盘", "AI直接给策略"]],
};

function renderSolution(key) {
  const item = solutions[key];
  solutionPanel.innerHTML = `<h3>${item.title}</h3><p>${item.copy}</p><div class="sol-grid">${item.cards.map(([title, body, metric]) => `<article class="sol-card"><h4>${title}</h4><p>${body}</p><div class="metric">${metric}</div></article>`).join("")}</div><div class="hero-actions"><button class="btn-primary" type="button" data-open-modal>预约方案演示</button></div>`;
}

function renderAgent(key) {
  const agent = agents[key];
  signalText.textContent = agent.signal;
  consoleKicker.textContent = agent.kicker;
  consoleTitle.textContent = agent.title;
  consoleCopy.textContent = agent.copy;
  consoleFlow.innerHTML = agent.flow.map((step, index) => `<li><b>${String(index + 1).padStart(2, "0")}</b> ${step}</li>`).join("");
  document.querySelectorAll("[data-agent-key]").forEach((card) => card.classList.toggle("active", card.dataset.agentKey === key));
}

function renderPainGrids() {
  Object.keys(pains).forEach((key) => {
    const grid = document.querySelector(`[data-pain-grid="${key}"]`);
    if (!grid) return;
    grid.innerHTML = pains[key].map(([painTitle, painBody, solTitle, solBody]) => `<article class="pain-card"><div class="pain-head"><h4>${painTitle}</h4><p>${painBody}</p></div><div class="solution-body"><h4>✓ ${solTitle}</h4><p>${solBody}</p></div></article>`).join("");
  });
  Object.keys(flows).forEach((key) => {
    const row = document.querySelector(`[data-flow="${key}"]`);
    if (!row) return;
    row.innerHTML = flows[key].map(([num, title, body]) => `<article class="flow-step"><b>${num}</b><h4>${title}</h4><p>${body}</p></article>`).join("");
  });
}

function showMain(target) {
  detailPages.forEach((page) => page.classList.remove("active"));
  mainPage.style.display = "block";
  if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDetail(key) {
  mainPage.style.display = "none";
  detailPages.forEach((page) => page.classList.remove("active"));
  document.getElementById(`detail-${key}`)?.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

menuButton?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  const mainLink = event.target.closest("[data-main-link]");
  if (mainLink) {
    showMain(mainLink.dataset.scrollTarget);
    mobileNav?.classList.remove("is-open");
  }
  const detail = event.target.closest("[data-detail]");
  if (detail) showDetail(detail.dataset.detail);
  const agent = event.target.closest("[data-agent-key]");
  if (agent) renderAgent(agent.dataset.agentKey);
  if (event.target.closest("[data-open-modal]")) openModal();
  if (event.target.closest("[data-close-modal]")) closeModal();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderSolution(tab.dataset.industry);
  });
});

function openModal() {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  modalForm.style.display = "block";
  modalSuccess.classList.remove("show");
  formError.textContent = "";
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelector("[data-submit-booking]")?.addEventListener("click", () => {
  const company = document.querySelector("[data-field-company]").value.trim();
  const name = document.querySelector("[data-field-name]").value.trim();
  const phone = document.querySelector("[data-field-phone]").value.trim();
  if (!company || !name || !/^1[3-9]\d{9}$/.test(phone)) {
    formError.textContent = "请填写公司名称、姓名，并输入正确的 11 位手机号。";
    return;
  }
  modalForm.style.display = "none";
  modalSuccess.classList.add("show");
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 600);
});

backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  cursorAura.style.left = `${event.clientX}px`;
  cursorAura.style.top = `${event.clientY}px`;
  document.documentElement.style.setProperty("--parallax-x", `${x * -22}px`);
  document.documentElement.style.setProperty("--parallax-y", `${y * -14}px`);
  document.documentElement.style.setProperty("--panel-x", `${x * 18}px`);
  document.documentElement.style.setProperty("--panel-y", `${y * 14}px`);
  if (hero && heroScan) {
    const rect = hero.getBoundingClientRect();
    heroScan.style.left = `${event.clientX - rect.left}px`;
    heroScan.style.top = `${event.clientY - rect.top}px`;
  }
});

if (starCanvas) {
  const context = starCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];
  const pointer = { x: 0.5, y: 0.35 };
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = starCanvas.clientWidth;
    height = starCanvas.clientHeight;
    starCanvas.width = width * ratio;
    starCanvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: window.innerWidth < 720 ? 72 : 132 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.35,
      vx: (Math.random() - 0.5) * 0.08,
      vy: Math.random() * 0.08 + 0.02,
      a: Math.random() * 0.45 + 0.18,
    }));
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const driftX = (pointer.x - 0.5) * 0.18;
      const driftY = (pointer.y - 0.35) * 0.12;
      star.x += star.vx + driftX;
      star.y += star.vy + driftY;
      if (star.x < -10) star.x = width + 10;
      if (star.x > width + 10) star.x = -10;
      if (star.y > height + 10) star.y = -10;
      context.beginPath();
      context.fillStyle = `rgba(184,244,255,${star.a})`;
      context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(draw);
  };
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = event.clientY / window.innerHeight;
  });
  window.addEventListener("resize", resize);
  resize();
  draw();
}

renderSolution("mfg");
renderAgent("doc");
renderPainGrids();

(function initVideoAgent() {
  const form = document.querySelector("[data-video-agent-form]");
  if (!form) return;

  const title = document.querySelector("[data-video-result-title]");
  const status = document.querySelector("[data-video-status]");
  const output = document.querySelector("[data-video-output]");
  const apiBase = window.VIDEO_AGENT_API_BASE || "http://127.0.0.1:8888";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const data = new FormData(form);
    const payload = {
      company_name: String(data.get("company_name") || "").trim(),
      industry: String(data.get("industry") || "").trim(),
      product_name: String(data.get("product_name") || "").trim(),
      selling_points: String(data.get("selling_points") || "").trim(),
      platform: String(data.get("platform") || "抖音"),
      goal: "短视频获客引流",
      tone: "专业可信",
      copy_count: Number(data.get("copy_count") || 3),
      image_count: Number(data.get("image_count") || 0),
      video_duration: Number(data.get("video_duration") || 5),
      generate_video: data.get("generate_video") === "on",
    };

    if (!payload.product_name && !payload.selling_points) {
      setVideoState("待补充", "请至少填写产品/服务或核心卖点。", true);
      return;
    }

    button.disabled = true;
    setVideoState("生成中", "正在生成文案、图片和视频，请稍等...", true);
    title.textContent = "正在调用 AI 短视频获客 Agent";

    try {
      const response = await fetch(`${apiBase}/api/video-agent/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || "生成失败");
      status.textContent = "已完成";
      renderVideoAgentResult(result, apiBase);
    } catch (error) {
      title.textContent = "生成失败";
      setVideoState("失败", `请确认 FastAPI 已启动、密钥已配置。错误信息：${error.message}`, true);
    } finally {
      button.disabled = false;
    }
  });

  function setVideoState(nextStatus, message, isEmpty) {
    status.textContent = nextStatus;
    output.className = isEmpty ? "video-output empty" : "video-output";
    output.textContent = message;
  }

  function renderVideoAgentResult(result, apiBase) {
    const plans = result.copywriting || [];
    const images = result.images || [];
    const videos = result.videos || [];
    const first = plans[0] || {};
    title.textContent = first.title || result.topic || "生成完成";

    const plansHtml = plans.map((plan, index) => `
      <article class="video-copy-card">
        <span>方案 ${index + 1}</span>
        <h4>${escapeVideoHtml(plan.title || "未命名方案")}</h4>
        <p><b>开场：</b>${escapeVideoHtml(plan.hook || plan.subtitle || "")}</p>
        <p><b>文案：</b>${escapeVideoHtml(plan.caption || plan.description || "")}</p>
        <p><b>标签：</b>${(plan.hashtags || []).map(escapeVideoHtml).join(" ")}</p>
      </article>
    `).join("");

    const imageHtml = images.length
      ? `<div class="video-asset-grid">${images.map((item) => `<figure><img src="${item.url}" alt="${escapeVideoHtml(item.label)}"><figcaption>${escapeVideoHtml(item.label)}</figcaption></figure>`).join("")}</div>`
      : "";
    const videoItems = videos.length ? videos : result.video_url ? [{ url: result.video_url, label: "生成视频" }] : [];
    const videoHtml = videoItems.length
      ? `<div class="video-file-list">${videoItems.map((item) => {
          const src = item.url.startsWith("http") ? `${apiBase}/api/video-proxy?url=${encodeURIComponent(item.url)}` : `${apiBase}${item.url}`;
          return `<article><h4>${escapeVideoHtml(item.label)}</h4><video controls src="${src}"></video><a href="${src}" target="_blank" rel="noreferrer">打开视频</a></article>`;
        }).join("")}</div>`
      : "";
    const warningHtml = (result.warnings || []).length
      ? `<div class="video-warning">${result.warnings.map(escapeVideoHtml).join("<br>")}</div>`
      : "";

    output.className = "video-output";
    output.innerHTML = `${warningHtml}${plansHtml}${imageHtml}${videoHtml}`;
  }

  function escapeVideoHtml(value) {
    return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
  }
})();
