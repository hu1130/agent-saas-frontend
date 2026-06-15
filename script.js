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
const agentDetailTitle = document.querySelector("[data-agent-detail-title]");
const agentDetailIcon = document.querySelector("[data-agent-detail-icon]");
const agentDetailCopy = document.querySelector("[data-agent-detail-copy]");
const agentDetailKicker = document.querySelector("[data-agent-detail-kicker]");
const agentDetailHeading = document.querySelector("[data-agent-detail-heading]");
const agentDetailBody = document.querySelector("[data-agent-detail-body]");
const agentDetailFlow = document.querySelector("[data-agent-detail-flow]");
const agentDetailDemo = document.querySelector("[data-agent-detail-demo]");
const agentDetailList = document.querySelector("[data-agent-detail-list]");
const backTop = document.querySelector("[data-back-top]");
const modal = document.querySelector("[data-modal]");
const modalForm = document.querySelector("[data-modal-form]");
const modalSuccess = document.querySelector("[data-modal-success]");
const formError = document.querySelector("[data-form-error]");
const bookingAgentList = document.querySelector("[data-booking-agent-list]");
const selectedBookingAgents = new Set();
const BOOKING_API_BASE = window.BOOKING_API_BASE || window.VIDEO_AGENT_API_BASE || "http://127.0.0.1:8890";
const AGENT_APP_LINKS = Object.assign({
  doc: "",
  risk: "",
  service: "",
  content: "",
  trend: "",
  video: "",
}, window.AGENT_APP_LINKS || {});

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
  video: {
    signal: "短视频获客智能体正在生成获客内容方案",
    kicker: "短视频获客智能体",
    title: "把企业卖点变成可发布、可获客的短视频资产",
    copy: "它负责把公司介绍、行业痛点、产品卖点拆成短视频选题、脚本、分镜、图片提示词和视频片段，适合企业做抖音、视频号、小红书获客。",
    flow: ["拆解获客卖点", "生成脚本分镜", "输出图片提示词与视频片段"],
  },
};

const agentIcons = {
  doc: "📄",
  risk: "🛡️",
  service: "🎧",
  content: "📦",
  trend: "📡",
  video: "🎬",
};

const agentDemos = {
  doc: {
    role: "把零散材料变成可交付文档，适合法务、销售、运营、行政等高频写作场景。",
    scenarios: ["合同初稿", "起诉状/律师函", "项目方案", "会议纪要", "投标材料"],
    steps: ["上传或粘贴业务材料", "选择文档类型和行业模板", "AI 生成结构化初稿", "人工确认关键事实后一键导出"],
    input: "客户拖欠 38 万货款，合同约定逾期违约金每日万分之五，需生成一份催款律师函。",
    output: "生成律师函正文、事实摘要、法律依据、付款期限、证据清单和可修改版本。",
    value: ["起草时间从 2 小时降到 5 分钟", "统一企业文档格式", "降低漏项和格式错误"]
  },
  risk: {
    role: "提前发现合同、流程、投放和售后规则里的隐性风险，给出风险等级和修改建议。",
    scenarios: ["合同条款审查", "广告合规审查", "售后规则审查", "投放素材风控", "流程漏洞扫描"],
    steps: ["上传合同/规则/素材", "选择审查标准", "AI 标记风险条款", "输出修改建议和人工确认项"],
    input: "审查一份渠道代理合同，重点关注独家授权、回款周期、违约责任和数据归属。",
    output: "标记 7 个风险点，其中 2 个高风险；输出替换条款、风险原因和谈判建议。",
    value: ["把人工初审压缩到分钟级", "避免隐性霸王条款", "让非专业人员也能看懂风险"]
  },
  service: {
    role: "接住官网、私域、电商平台的客户咨询，自动回答常见问题，并把高价值线索分流给销售。",
    scenarios: ["售前咨询", "售后退换货", "物流查询", "多语言问答", "线索分级"],
    steps: ["导入企业知识库", "配置常见问题和转人工规则", "接入官网/企微/电商渠道", "自动记录对话和客户意向"],
    input: "客户问：你们的 AI 智能体适合律师事务所吗？能不能先看演示？",
    output: "自动回答适用方案，推荐律师智能体，并把客户标记为高意向预约线索。",
    value: ["7x24 小时在线", "减少重复客服人力", "让销售优先跟进高意向客户"]
  },
  content: {
    role: "把商品参数、卖点和平台要求变成可上架、可投放、可复用的内容资产。",
    scenarios: ["SKU 标题生成", "详情页文案", "小红书/抖音种草", "多语言 Listing", "短视频脚本"],
    steps: ["录入产品参数和目标平台", "选择内容风格", "AI 批量生成多个版本", "人工挑选后发布或继续改写"],
    input: "一款便携式筋膜枪，目标用户是办公室久坐人群，要生成抖音口播脚本和电商详情页卖点。",
    output: "输出 5 条标题、6 个核心卖点、详情页结构、短视频开场钩子和口播脚本。",
    value: ["批量内容生产", "保持品牌语气统一", "减少运营重复改稿"]
  },
  trend: {
    role: "监测热点、账号定位和竞品内容，提前给出更容易爆的选题、标题和脚本角度。",
    scenarios: ["热点监控", "账号选题库", "爆款标题", "脚本角度", "竞品内容复盘"],
    steps: ["设置行业和账号定位", "抓取平台趋势和竞品内容", "AI 生成选题评分", "输出标题、开场和脚本方向"],
    input: "账号定位是企业 AI 工具科普，目标客户是中小企业老板，想找本周适合拍的短视频选题。",
    output: "输出 12 个选题，按爆发潜力排序，并给出标题、开场 3 秒钩子和拍摄建议。",
    value: ["减少选题焦虑", "让内容更贴近热点", "提前规划一周内容日历"]
  },
  video: {
    role: "把企业服务、行业痛点和核心卖点转成短视频获客素材，按提示词、图片、视频片段分阶段生成。",
    scenarios: ["企业服务获客", "知识科普口播", "客户案例短片", "产品功能演示", "私域引流视频"],
    steps: ["填写公司、行业、产品和卖点", "AI 生成选题、脚本和分镜", "人工修改提示词", "生成参考图和视频片段", "拼接成 30 秒以上获客视频"],
    input: "深度觉醒 AI 智能体 SaaS，目标客户是中小企业老板，卖点是客服自动化、知识库问答、短视频获客引流。",
    output: "输出短视频标题、3 秒开场钩子、完整脚本、分镜、图片提示词、视频提示词和可重新生成的视频片段。",
    value: ["最短 30 秒成片方案", "支持提示词/图片/视频分阶段重生成", "让企业卖点更像真人实拍内容"],
    action: { label: "打开短视频生成工具", detail: "video" }
  }
};

const bookingAgents = [
  ...Object.keys(agents).map((key) => ({
    key,
    icon: agentIcons[key] || "AI",
    name: agents[key].kicker,
    desc: agents[key].title,
  })),
];

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
  if (!agent) return;
  signalText.textContent = agent.signal;
  consoleKicker.textContent = agent.kicker;
  consoleTitle.textContent = agent.title;
  consoleCopy.textContent = agent.copy;
  consoleFlow.innerHTML = agent.flow.map((step, index) => `<li><b>${String(index + 1).padStart(2, "0")}</b> ${step}</li>`).join("");
  document.querySelectorAll("[data-agent-key]").forEach((card) => card.classList.toggle("active", card.dataset.agentKey === key));
}

function renderAgentDemo(key) {
  if (!agentDetailDemo) return;
  const demo = agentDemos[key];
  const agent = agents[key];
  if (!demo) {
    agentDetailDemo.innerHTML = "";
    return;
  }
  const appUrl = AGENT_APP_LINKS[key] || "";
  const actionHtml = `<div class="agent-demo-tool"><button class="btn-primary" type="button" data-agent-app="${key}">进入${agent?.kicker || "智能体"}系统</button><span>进入专属智能体工作台，体验完整业务流程。</span></div>`;
  agentDetailDemo.innerHTML = `
    <section class="agent-demo-summary">
      <div>
        <p class="eyebrow">Product Demo</p>
        <h3>这个智能体能帮企业做什么</h3>
        <p>${demo.role}</p>
      </div>
      <div class="agent-demo-value">
        ${demo.value.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
    <section class="agent-demo-grid">
      <article>
        <span>适合演示的场景</span>
        <ul>${demo.scenarios.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article>
        <span>客户怎么使用</span>
        <ol>${demo.steps.map((item) => `<li>${item}</li>`).join("")}</ol>
      </article>
    </section>
    <section class="agent-demo-example">
      <div>
        <span>演示输入</span>
        <p>${demo.input}</p>
      </div>
      <div>
        <span>演示输出</span>
        <p>${demo.output}</p>
      </div>
    </section>
    ${actionHtml}
  `;
}

function renderAgentDetail(key) {
  const agent = agents[key];
  if (!agent) return;
  renderAgent(key);
  if (agentDetailTitle) agentDetailTitle.textContent = agent.kicker;
  if (agentDetailIcon) agentDetailIcon.textContent = agentIcons[key] || "AI";
  if (agentDetailCopy) agentDetailCopy.textContent = agent.copy;
  if (agentDetailKicker) agentDetailKicker.textContent = agent.kicker;
  if (agentDetailHeading) agentDetailHeading.textContent = agent.title;
  if (agentDetailBody) agentDetailBody.textContent = agent.copy;
  if (agentDetailFlow) {
    agentDetailFlow.innerHTML = agent.flow.map((step, index) => `<li><b>${String(index + 1).padStart(2, "0")}</b>${step}</li>`).join("");
  }
  renderAgentDemo(key);
  if (agentDetailList) {
    agentDetailList.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.agentDetailKey === key);
    });
  }
}

function renderAgentDetailList() {
  if (!agentDetailList) return;
  agentDetailList.innerHTML = Object.keys(agents)
    .map((key) => `<button type="button" data-agent-detail-key="${key}">${agentIcons[key] || "AI"} ${agents[key].kicker}</button>`)
    .join("");
}

function renderBookingAgents() {
  if (!bookingAgentList) return;
  bookingAgentList.innerHTML = bookingAgents
    .map((agent) => `
      <button class="booking-agent-option" type="button" data-booking-agent="${agent.key}">
        <span>${agent.icon}</span>
        <strong>${agent.name}</strong>
        <small>${agent.desc}</small>
      </button>
    `)
    .join("");
}

function setBookingAgentSelected(key, selected) {
  if (selected) selectedBookingAgents.add(key);
  else selectedBookingAgents.delete(key);
  bookingAgentList?.querySelectorAll("[data-booking-agent]").forEach((button) => {
    button.classList.toggle("active", selectedBookingAgents.has(button.dataset.bookingAgent));
  });
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

function setMainSideRailCollapsed(collapsed) {
  document.body.classList.toggle("agent-rail-collapsed", collapsed);
  localStorage.setItem("agentRailCollapsed", collapsed ? "1" : "0");
}

function setWorkspaceSidebarCollapsed(sidebar, collapsed) {
  const workspace = sidebar.closest(".video-agent-workspace");
  workspace?.classList.toggle("sidebar-collapsed", collapsed);
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
  const agentApp = event.target.closest("[data-agent-app]");
  if (agentApp) {
    const appKey = agentApp.dataset.agentApp;
    const appUrl = AGENT_APP_LINKS[appKey];
    if (appUrl) {
      window.open(appUrl, "_blank", "noopener,noreferrer");
    } else {
      openModal();
    }
    return;
  }
  const detail = event.target.closest("[data-detail]");
  if (detail) showDetail(detail.dataset.detail);
  const detailAgent = event.target.closest("[data-agent-detail-key]");
  if (detailAgent) renderAgentDetail(detailAgent.dataset.agentDetailKey);
  const bookingAgent = event.target.closest("[data-booking-agent]");
  if (bookingAgent) setBookingAgentSelected(bookingAgent.dataset.bookingAgent, !selectedBookingAgents.has(bookingAgent.dataset.bookingAgent));
  const interactive = event.target.closest("button, a, input, textarea, select, label, summary, details");
  const sideRail = event.target.closest(".side-rail");
  if (sideRail && !interactive) {
    setMainSideRailCollapsed(!document.body.classList.contains("agent-rail-collapsed"));
  }
  const workspaceSidebar = event.target.closest(".video-agent-sidebar");
  if (workspaceSidebar && !interactive) {
    const workspace = workspaceSidebar.closest(".video-agent-workspace");
    setWorkspaceSidebarCollapsed(workspaceSidebar, !workspace?.classList.contains("sidebar-collapsed"));
  }
  const agent = event.target.closest("[data-agent-key]");
  if (agent) {
    renderAgent(agent.dataset.agentKey);
    if (agent.classList.contains("agent-card")) {
      renderAgentDetail(agent.dataset.agentKey);
      showDetail("agent");
    }
  }
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

document.querySelector("[data-submit-booking]")?.addEventListener("click", async () => {
  const company = document.querySelector("[data-field-company]").value.trim();
  const name = document.querySelector("[data-field-name]").value.trim();
  const phone = document.querySelector("[data-field-phone]").value.trim();
  if (!company || !name || !/^1[3-9]\d{9}$/.test(phone)) {
    formError.textContent = "请填写公司名称、姓名，并输入正确的 11 位手机号。";
    return;
  }
  const bookingRecord = {
    company,
    name,
    phone,
    agents: [...selectedBookingAgents],
    createdAt: new Date().toISOString(),
  };
  formError.textContent = "";
  try {
    const response = await fetch(`${BOOKING_API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...bookingRecord, source: "website" }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.detail || "预约提交失败");
    }
    localStorage.setItem("latestBookingRequest", JSON.stringify({ ...bookingRecord, booking_id: result.booking_id }));
    modalForm.style.display = "none";
    modalSuccess.classList.add("show");
  } catch (error) {
    localStorage.setItem("latestBookingRequest", JSON.stringify({ ...bookingRecord, submit_error: String(error) }));
    formError.textContent = "后端未连接或提交失败，已临时保存在本机浏览器。请确认 FastAPI 已启动。";
  }
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
renderAgentDetailList();
renderBookingAgents();
renderAgent("doc");
renderAgentDetail("doc");
renderPainGrids();
setMainSideRailCollapsed(localStorage.getItem("agentRailCollapsed") === "1");

(function initVideoAgent() {
  const form = document.querySelector("[data-video-agent-form]");
  if (!form) return;

  const title = document.querySelector("[data-video-result-title]");
  const status = document.querySelector("[data-video-status]");
  const output = document.querySelector("[data-video-output]");
  const apiBase = window.VIDEO_AGENT_API_BASE || "http://127.0.0.1:8890";
  let currentPayload = null;
  let currentPromptResult = null;
  let currentImages = [];
  let currentVideos = [];
  let stageState = { prompts: "idle", images: "idle", video: "idle" };
  let stageMessage = "填写企业信息后，先生成提示词，再生成图片和视频。";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const payload = getVideoPayload();

    if (!payload.product_name && !payload.selling_points) {
      setVideoState("待补充", "请至少填写产品/服务或核心卖点。", true);
      return;
    }

    button.disabled = true;
    currentPayload = payload;
    currentPromptResult = null;
    currentImages = [];
    currentVideos = [];
    stageState = { prompts: "running", images: "idle", video: "idle" };
    stageMessage = "正在生成可编辑的视频提示词和分镜...";
    renderPromptWorkspace();
    title.textContent = "正在生成视频提示词";

    try {
      await generateEditablePrompts();
    } catch (error) {
      title.textContent = "生成失败";
      markCurrentStageFailed(`请确认 FastAPI 已启动、密钥已配置。错误信息：${error.message}`);
    } finally {
      button.disabled = false;
    }
  });

  output.addEventListener("click", async (event) => {
    const action = event.target.closest("[data-video-action]")?.dataset.videoAction;
    if (!action || !currentPayload) return;
    try {
      if (action === "regenerate-prompts") {
        stageState = { prompts: "running", images: "idle", video: "idle" };
        stageMessage = "正在重新生成提示词...";
        currentImages = [];
        currentVideos = [];
        renderPromptWorkspace();
        await generateEditablePrompts();
      }
      if (action === "generate-images") {
        await generateImagesFromCurrentPrompts();
      }
      if (action === "generate-video") {
        await generateVideoFromCurrentPrompt();
      }
    } catch (error) {
      markCurrentStageFailed(error.message);
    }
  });

  function getVideoPayload() {
    const data = new FormData(form);
    return {
      company_name: String(data.get("company_name") || "").trim(),
      industry: String(data.get("industry") || "").trim(),
      product_name: String(data.get("product_name") || "").trim(),
      selling_points: String(data.get("selling_points") || "").trim(),
      platform: String(data.get("platform") || "抖音"),
      goal: "视频获客引流",
      tone: "真人实拍、专业可信",
      copy_count: Number(data.get("copy_count") || 1),
      image_count: Number(data.get("image_count") || 2),
      video_duration: Math.max(30, Math.min(600, Number(data.get("video_duration") || 30))),
      generate_video: false,
    };
  }

  function setVideoState(nextStatus, message, isEmpty) {
    status.textContent = nextStatus;
    output.className = isEmpty ? "video-output empty" : "video-output";
    output.textContent = message;
  }

  function markCurrentStageFailed(message) {
    if (stageState.video === "running") stageState.video = "failed";
    else if (stageState.images === "running") stageState.images = "failed";
    else stageState.prompts = "failed";
    stageMessage = message;
    status.textContent = "失败";
    renderPromptWorkspace([message]);
  }

  async function generateEditablePrompts() {
    const response = await fetch(`${apiBase}/api/video-agent/prompts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentPayload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || "提示词生成失败");
    currentPromptResult = result;
    stageState.prompts = "done";
    stageMessage = "提示词已生成。你可以直接修改提示词，或重新生成。";
    status.textContent = "提示词完成";
    renderPromptWorkspace();
  }

  async function generateImagesFromCurrentPrompts() {
    stageState.images = "running";
    stageState.video = currentVideos.length ? "done" : "idle";
    stageMessage = "正在按当前图片提示词生成图片...";
    status.textContent = "图片生成中";
    renderPromptWorkspace();
    const imagePrompts = getImagePrompts();
    currentPromptResult = { ...currentPromptResult, image_prompts: imagePrompts, video_prompt: getVideoPrompt() };
    const response = await fetch(`${apiBase}/api/video-agent/images/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentPayload, image_prompts: imagePrompts, image_count: currentPayload.image_count }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || "图片生成失败");
    currentImages = result.images || [];
    stageState.images = "done";
    stageState.video = currentVideos.length ? "done" : "idle";
    stageMessage = "图片已生成。不满意可以改提示词后重新生成图片。";
    status.textContent = "图片完成";
    renderPromptWorkspace(result.warnings || []);
  }

  async function generateVideoFromCurrentPrompt() {
    if (!currentImages.length) {
      throw new Error("请先生成图片，再用图片和提示词生成视频。");
    }
    stageState.video = "running";
    stageMessage = "正在按当前视频提示词和图片生成视频片段，并在完成后自动拼接...";
    status.textContent = "视频生成中";
    renderPromptWorkspace();
    currentPromptResult = { ...currentPromptResult, video_prompt: getVideoPrompt(), image_prompts: getImagePrompts() };
    const response = await fetch(`${apiBase}/api/video-agent/videos/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...currentPayload,
        video_prompt: getVideoPrompt(),
        images: currentImages,
        generate_video: true,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || "视频生成失败");
    currentVideos = result.videos || [];
    stageState.video = "done";
    stageMessage = "视频已生成。不满意可以继续改提示词、换图片或重新生成视频。";
    status.textContent = "视频完成";
    renderPromptWorkspace(result.warnings || []);
  }

  function renderPromptWorkspace(warnings = []) {
    const result = currentPromptResult || {};
    const first = (result.copywriting || [])[0] || {};
    title.textContent = first.title || result.topic || "提示词已生成";
    const imagePrompts = result.image_prompts || [];
    const warningsHtml = warnings.length ? `<div class="video-warning">${warnings.map(escapeVideoHtml).join("<br>")}</div>` : "";
    const imagePromptHtml = renderImagePromptCards(imagePrompts);
    const imageHtml = currentImages.length
      ? `<div class="video-asset-grid">${currentImages.map((item) => `<figure><img src="${item.url}" alt="${escapeVideoHtml(item.label)}"><figcaption>${escapeVideoHtml(item.label)}</figcaption></figure>`).join("")}</div>`
      : "";
    const videoHtml = currentVideos.length
      ? `<div class="video-file-list">${currentVideos.map((item) => {
          const src = item.url.startsWith("http") ? `${apiBase}/api/video-proxy?url=${encodeURIComponent(item.url)}` : `${apiBase}${item.url}`;
          return `<article><h4>${escapeVideoHtml(item.label)}</h4><video controls src="${src}"></video><a href="${src}" target="_blank" rel="noreferrer">打开视频</a></article>`;
        }).join("")}</div>`
      : "";

    output.className = "video-output";
    output.innerHTML = `
      ${renderStageProgress()}
      ${warningsHtml}
      <section class="video-stage-panel ${stageState.prompts === "running" ? "is-active" : ""}">
        <div class="video-stage-head">
          <div>
            <span>阶段 1</span>
            <h4>提示词和脚本</h4>
          </div>
          <button class="btn-outline" type="button" data-video-action="regenerate-prompts" ${stageState.prompts === "running" ? "disabled" : ""}>${currentPromptResult ? "重新生成提示词" : "生成中"}</button>
        </div>
        <article class="video-copy-card">
        <span>文案</span>
        <h4>${escapeVideoHtml(first.title || "视频方案")}</h4>
        <p><b>开场：</b>${escapeVideoHtml(first.hook || first.subtitle || "")}</p>
        <p><b>脚本：</b>${escapeVideoHtml(first.caption || first.description || "")}</p>
        </article>
        <label class="video-prompt-editor">
          <span>视频提示词（可手动修改后生成/重生成视频）</span>
          <textarea data-video-prompt="video" rows="9">${escapeVideoHtml(result.video_prompt || first.videoPrompt || "")}</textarea>
        </label>
      </section>
      <section class="video-stage-panel ${stageState.images === "running" ? "is-active" : ""}">
        <div class="video-stage-head">
          <div>
            <span>阶段 2</span>
            <h4>参考图素材</h4>
          </div>
          <button class="btn-outline" type="button" data-video-action="generate-images" ${currentPromptResult && stageState.images !== "running" ? "" : "disabled"}>${stageState.images === "running" ? "图片生成中" : currentImages.length ? "重新生成图片" : "生成图片"}</button>
        </div>
      <div class="video-stage-guide">先用角色、场景、产品参考图锁定一致性；首帧卡片用于每个视频片段的开头画面。点卡片可展开修改。</div>
      ${imagePromptHtml}
      ${imageHtml}
      </section>
      <section class="video-stage-panel ${stageState.video === "running" ? "is-active" : ""}">
        <div class="video-stage-head">
          <div>
            <span>阶段 3</span>
            <h4>视频生成</h4>
          </div>
          <button class="btn-primary" type="button" data-video-action="generate-video" ${currentImages.length && stageState.video !== "running" ? "" : "disabled"}>${stageState.video === "running" ? "视频生成中" : currentVideos.length ? "重新生成视频" : "生成视频"}</button>
        </div>
      ${videoHtml}
      </section>
    `;
  }

  function renderImagePromptCards(prompts) {
    if (!prompts.length) {
      return `<div class="video-stage-empty">提示词生成后，这里会出现角色、场景、产品和首帧参考图。</div>`;
    }
    return `<div class="video-reference-grid">${prompts.map((prompt, index) => {
      const meta = getReferenceMeta(prompt, index);
      return `
        <details class="video-reference-card" ${index < 3 ? "" : ""}>
          <summary>
            <span>${escapeVideoHtml(meta.type)}</span>
            <strong>${escapeVideoHtml(meta.title)}</strong>
            <small>${escapeVideoHtml(meta.desc)}</small>
          </summary>
          <label class="video-prompt-editor compact">
            <span>可编辑提示词</span>
            <textarea data-video-prompt="image" rows="4">${escapeVideoHtml(prompt)}</textarea>
          </label>
        </details>
      `;
    }).join("")}</div>`;
  }

  function getReferenceMeta(prompt, index) {
    const value = String(prompt || "");
    if (index === 0 || value.includes("角色参考图")) {
      return { type: "角色", title: "固定主角形象", desc: "锁定五官、服装、职业气质" };
    }
    if (index === 1 || value.includes("场景参考图")) {
      return { type: "场景", title: "固定拍摄地点", desc: "锁定空间、光线、道具位置" };
    }
    if (index === 2 || value.includes("产品参考图")) {
      return { type: "产品", title: "固定产品与界面", desc: "锁定产品外观和使用方式" };
    }
    return { type: "首帧", title: `镜头首帧 ${index - 2}`, desc: "作为视频片段的 first frame" };
  }

  function renderStageProgress() {
    const stages = [
      ["prompts", "导演方案", "总提示词 + shot list"],
      ["images", "参考图", "角色/场景/产品/首帧"],
      ["video", "成片", "逐镜头生成并拼接"],
    ];
    return `
      <div class="video-stage-progress">
        ${stages.map(([key, label, desc], index) => `
          <div class="video-stage-step ${stageState[key]}" data-step="${index + 1}">
            <strong>${label}</strong>
            <span>${stageText(stageState[key])}</span>
            <small>${desc}</small>
          </div>
        `).join("")}
      </div>
      <div class="video-stage-message">${escapeVideoHtml(stageMessage)}</div>
    `;
  }

  function stageText(value) {
    if (value === "running") return "生成中";
    if (value === "done") return "已完成";
    if (value === "failed") return "失败";
    return "等待";
  }

  function getVideoPrompt() {
    return output.querySelector("[data-video-prompt='video']")?.value.trim() || "";
  }

  function getImagePrompts() {
    return Array.from(output.querySelectorAll("[data-video-prompt='image']"))
      .map((item) => item.value.trim())
      .filter(Boolean);
  }

  function escapeVideoHtml(value) {
    return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
  }
})();
