/* ═══════════════════════════════════════════════
   0. I18N
   ═══════════════════════════════════════════════ */
let currentLang = localStorage.getItem('lang') || 'en';

const TRANSLATIONS = {
  en: {
    'nav.about':'About','nav.projects':'Projects','nav.skills':'Skills','nav.ai-tools':'AI Tools','nav.certificates':'Certificates','nav.opinions':'Opinions',
    
    'hero.micro':'BUILDER · MULTILINGUAL · SYSTEMS THINKER',
    'hero.name':'Taeyang Han',
    'hero.subtitle':'한태양 · Khairul Ammar Hakimi',
    'hero.oneliner':'I design simulations and systems 😄 ',
    'hero.title':'Simulation Engineer',
    'hero.link.twitter':'X (Twitter)',
    'hero.link.github':'GitHub',
    'hero.link.linkedin':'LinkedIn',
    'hero.link.xiaohongshu':'Xiaohongshu',
    'hero.cta.send':'Send Email',
    'hero.cta.copy':'Copy Email',
    'hero.bio.p1.before':"I'm a 23 y/o ",
    'hero.bio.p1.sim-eng':'simulation engineer',
    'hero.bio.p1.middle':' double-majoring in CBE and IB at Sogang University who cares deeply about life, living beings and the ',
    'hero.bio.p1.unpredictability':'unpredictability',
    'hero.bio.p1.between':' of the ',
    'hero.bio.p1.world':'world',
    'hero.bio.p1.end':'.',
    'hero.bio.p2.before':'I created ',
    'hero.bio.p2.after':', and I spend most of my time building systems and simulations to understand life and living beings.',
    'hero.bio.p2.popup-desc':'Unified personal life management \u2014 finance, health, habits, skills, and more.',
    'hero.bio.p2.popup-cta':'Visit \u2192',
    'hero.stat.languages':'Languages',
    'hero.stat.languages.5':'5',
    'hero.stat.certificates':'Certificates',
    'hero.stat.certificates.30':'30+',
    'hero.stat.leadership':'Leadership',
    'hero.stat.leadership.7':'7',
    'hero.stat.building':'Building',
    'hero.stat.building.5yrs':'5yrs',
    'hero.roles.prefix':'Currently president of ',
    'hero.role.sea':'@SEA Studies',
    'hero.roles.and':' and ',
    'hero.role.pals':'@PALS',
    'hero.role.samsung':'@Samsung Dream Scholars',

    'projects.micro':'PROJECTS','projects.headline':'What I have built',
    'project.hero.label':'HERO PROJECT','project.status.In Development':'In Development','project.status.Active':'Active','project.status.Completed':'Completed',
    
    'skills.micro':'SKILLS','skills.headline':'What I work with', 'skills.group.languages':'Programming Languages','skills.group.frameworks':'Frameworks & Libraries','skills.group.tools':'Tools','skills.group.domains':'Other Domains',
    'skills.tool.postgresql':'PostgreSQL','skills.tool.git':'Git','skills.tool.vercel':'Vercel','skills.tool.linux':'Linux',
    'skills.framework.nextjs':'Next.js','skills.framework.flask':'Flask','skills.framework.react':'React',
    'skills.language.python':'Python','skills.language.typescript':'TypeScript','skills.language.sql':'SQL','skills.language.html-css':'HTML/CSS','skills.language.javascript':'JavaScript',
    'skills.domain.systems-design':'Systems Design','skills.domain.content-strategy':'Content Strategy','skills.domain.process-engineering':'Process Engineering','skills.domain.financial-modeling':'Financial Modeling',

    'ai.micro':'AI-AUGMENTED DEVELOPMENT','ai.headline':'How I build with AI',
    'ai.cc.badge':'CC','ai.cc.name':'Claude Code','ai.cc.desc':'Agentic terminal assistant with full-repo context. Used for architecture decisions, end-to-end feature builds, and complex refactors across multiple files.','ai.cc.tag1':'Agentic coding','ai.cc.tag2':'Architecture','ai.cc.tag3':'Terminal',
    'ai.gc.badge':'GC','ai.gc.name':'GitHub Copilot','ai.gc.desc':'Inline suggestions and multi-file edits in VS Code. Used daily for boilerplate elimination, rapid prototyping, and code review assistance.','ai.gc.tag1':'Autocomplete','ai.gc.tag2':'VS Code','ai.gc.tag3':'Code review',
    'ai.cx.badge':'CX','ai.cx.name':'OpenAI Codex','ai.cx.desc':'Code generation via API for scripts, data pipelines, and automating repetitive dev tasks. Integrated into custom tooling across projects.','ai.cx.tag1':'Code generation','ai.cx.tag2':'API','ai.cx.tag3':'Automation',
    'ai.aw.badge':'AW','ai.aw.name':'Agentic Workflows','ai.aw.desc':'Multi-agent pipelines for autonomous task completion — chaining models for research, implementation, testing, and deployment without manual steps.','ai.aw.tag1':'Multi-agent','ai.aw.tag2':'Pipelines','ai.aw.tag3':'Orchestration',
    
    'certs.micro':'CERTIFICATES','certs.headline':'Recognition',
    'certs.filter.all':'All','certs.filter.scholarship':'Scholarship','certs.filter.academic':'Academic','certs.filter.leadership':'Leadership','certs.filter.competitions':'Competitions','certs.filter.cultural':'Cultural','certs.filter.language':'Language',
    
    'footer.tagline':'Built with intention','footer.cta':'Build together with me →',

    'project.lifeos.name':'LifeOS',
    'project.lifeos.desc':'Unified personal life management platform across finance, health, habits, and productivity.',
    'project.lifeos.h1':'6 integrated life domains','project.lifeos.h2':'LP macro optimizer','project.lifeos.h3':'Event-driven architecture','project.lifeos.h4':'Custom design system',
    'project.fugacity.name':'Fugacity Simulator',
    'project.fugacity.desc':'Interactive thermodynamics simulator visualizing fugacity and fugacity coefficient versus pressure across vapor, liquid, and saturation regions using steam-table data.',
    'project.xiaohongshu.name':'Xiaohongshu Build Log',
    'project.xiaohongshu.desc':'Public build-in-public account documenting product iterations and execution process.',
    'project.accounting.name':'Personal Accounting System',
    'project.accounting.desc':'Full personal accounting system built from scratch since 2021 — first project, continuously maintained and improved over 5 years.',
    'project.scm.name':'Bullwhip Effect Simulator',
    'project.scm.desc':'Browser-based supply-chain simulator showing how small downstream demand shocks amplify into large upstream order swings (bullwhip effect).',
    'project.scm.h1':'4-agent chain (Retailer, Distributor, Manufacturer, Supplier)','project.scm.h2':'Chaos demand shock testing','project.scm.h3':'Inventory/order/backlog charting','project.scm.h4':'Event timeline and simulation insights',
  },
  zh: {
    'nav.about':'关于','nav.projects':'项目','nav.skills':'技能','nav.ai-tools':'AI 工具','nav.certificates':'证书','nav.opinions':'观点',
    
    'hero.micro':'构建者 · 多语言 · 系统思维者',
    'hero.name':'Taeyang Han',
    'hero.oneliner':'我构建生活管理系统——财务、健康、习惯，一切尽在其中。',
    'hero.subtitle':'한태양 · Khairul Ammar Hakimi',
    'hero.title':'仿真工程师',
    'hero.link.twitter':'X (推特)',
    'hero.link.github':'GitHub',
    'hero.link.linkedin':'领英',
    'hero.link.xiaohongshu':'小红书',
    'hero.cta.send':'发送邮件',
    'hero.cta.copy':'复制邮箱',
    'hero.bio.p1.before':'我是一名23岁的',
    'hero.bio.p1.sim-eng':'仿真工程师',
    'hero.bio.p1.middle':'，在西江大学双修化学与生物分子工程及国际商务，深深关注生命、生灵以及这个世界的',
    'hero.bio.p1.unpredictability':'不可预测性',
    'hero.bio.p1.between':'',
    'hero.bio.p1.world':'',
    'hero.bio.p1.end':'。',
    'hero.bio.p2.before':'我创建了',
    'hero.bio.p2.after':'，我大部分时间都在构建系统和仿真，以深入理解生命与生灵。',
    'hero.bio.p2.popup-desc':'统一的个人生活管理平台——财务、健康、习惯、技能等。',
    'hero.bio.p2.popup-cta':'访问 \u2192',
    'hero.stat.languages':'语言',
    'hero.stat.languages.5':'5',
    'hero.stat.certificates':'证书',
    'hero.stat.certificates.30':'30+',
    'hero.stat.leadership':'领导',
    'hero.stat.leadership.7':'7',
    'hero.stat.building':'建设',
    'hero.stat.building.5yrs':'5年',
    'hero.roles.prefix':'目前担任',
    'hero.role.sea':'@SEA Studies',
    'hero.roles.and':'和',
    'hero.role.pals':'@PALS',
    'hero.role.samsung':'@Samsung Dream Scholars',

    'projects.micro':'项目','projects.headline':'我构建的作品',
    'project.hero.label':'主要项目','project.status.In Development':'开发中','project.status.Active':'运行中','project.status.Completed':'已完成',
    
    'skills.micro':'技能','skills.headline':'我的技术栈', 'skills.group.languages':'编程语言','skills.group.frameworks':'框架与库','skills.group.tools':'工具','skills.group.domains':'其他领域',
    'skills.tool.postgresql':'PostgreSQL','skills.tool.git':'Git','skills.tool.vercel':'Vercel','skills.tool.linux':'Linux',
    'skills.framework.nextjs':'Next.js','skills.framework.flask':'Flask','skills.framework.react':'React',
    'skills.language.python':'Python','skills.language.typescript':'TypeScript','skills.language.sql':'SQL','skills.language.html-css':'HTML/CSS','skills.language.javascript':'JavaScript',
    'skills.domain.systems-design':'系统设计','skills.domain.content-strategy':'内容策略','skills.domain.process-engineering':'流程工程','skills.domain.financial-modeling':'财务建',

    'ai.micro':'AI 辅助开发','ai.headline':'我如何与 AI 协作构建',
    'ai.cc.badge':'CC','ai.cc.name':'Claude Code','ai.cc.desc':'具备完整代码库上下文的智能终端助手。用于架构决策、端到端功能开发及跨文件的复杂重构。','ai.cc.tag1':'智能编程','ai.cc.tag2':'架构','ai.cc.tag3':'终端',
    'ai.gc.badge':'GC','ai.gc.name':'GitHub Copilot','ai.gc.desc':'在 VS Code 中提供内联建议和多文件编辑。每日用于消除样板代码、快速原型开发和代码审查辅助。','ai.gc.tag1':'自动补全','ai.gc.tag2':'VS Code','ai.gc.tag3':'代码审查',
    'ai.cx.badge':'CX','ai.cx.name':'OpenAI Codex','ai.cx.desc':'通过 API 进行代码生成，用于脚本编写、数据管道构建及自动化重复开发任务，已集成到多个项目的自定义工具中。','ai.cx.tag1':'代码生成','ai.cx.tag2':'API','ai.cx.tag3':'自动化',
    'ai.aw.badge':'AW','ai.aw.name':'智能工作流','ai.aw.desc':'用于自主完成任务的多智能体流水线——将多个模型串联，实现从研究、实现、测试到部署的无人工干预全流程。','ai.aw.tag1':'多智能体','ai.aw.tag2':'流水线','ai.aw.tag3':'编排',
    
    'certs.micro':'证书与奖项','certs.headline':'荣誉',
    'certs.filter.all':'全部','certs.filter.scholarship':'奖学金','certs.filter.academic':'学术','certs.filter.leadership':'领导力','certs.filter.competitions':'竞赛','certs.filter.cultural':'文化','certs.filter.language':'语言',
    
    'footer.tagline ':'用心而建','footer.cta ':'欢迎咨询、合作或共同构建 →',

    'project.lifeos.name':'LifeOS',
    'project.lifeos.desc':'统一个人生活管理平台，涵盖财务、健康、习惯与效率提升。',
    'project.lifeos.h1':'6个生活领域整合','project.lifeos.h2':'LP宏观优化器','project.lifeos.h3':'事件驱动架构','project.lifeos.h4':'自定义设计系统',
    'project.fugacity.name':'逸度模拟器',
    'project.fugacity.desc':'交互式热力学模拟器，基于蒸汽表数据可视化不同压力下气相、液相与饱和边界中的逸度与逸度系数变化。',
    'project.xiaohongshu.name':'小红书开发日志',
    'project.xiaohongshu.desc':'公开记录产品迭代过程，展示执行思路与构建历程。',
    'project.accounting.name':'个人记账系统',
    'project.accounting.desc':'从2021年起从零构建的完整个人记账系统——第一个项目，持续维护改进超过5年。',
    'project.scm.name':'牛鞭效应模拟器',
    'project.scm.desc':'基于浏览器的供应链模拟器，展示小幅下游需求冲击如何放大成大幅上游订单波动（牛鞭效应）。',
    'project.scm.h1':'4层主体链（零售商、分销商、制造商、供应商）','project.scm.h2':'混沌需求冲击测试','project.scm.h3':'库存/订单/积压图表','project.scm.h4':'事件时间线与仿真洞察',
  }
};

function t(key) {
  const lang = TRANSLATIONS[currentLang];
  if (lang && Object.prototype.hasOwnProperty.call(lang, key)) return lang[key];
  if (Object.prototype.hasOwnProperty.call(TRANSLATIONS.en, key)) return TRANSLATIONS.en[key];
  return key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

/* ═══════════════════════════════════════════════
   1. DATA — PROJECTS
   ═══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 'lifeos',
    nameKey: 'project.lifeos.name',
    descriptionKey: 'project.lifeos.desc',
    tech_stack: ['Next.js', 'Flask', 'PostgreSQL', 'TypeScript'],
    status: 'In Development',
    url: 'https://lifeos-wine.vercel.app',
    image_path: 'assets/projects/lifeos.jpg',
    is_hero: true,
    highlightsKeys: ['project.lifeos.h1', 'project.lifeos.h2', 'project.lifeos.h3', 'project.lifeos.h4']
  },
  {
    id: 'fugacity-simulator',
    nameKey: 'project.fugacity.name',
    descriptionKey: 'project.fugacity.desc',
    tech_stack: ['Vanilla JavaScript', 'HTML5 Canvas', 'CSV Data Processing', 'Thermodynamics'],
    status: 'Completed',
    url: 'https://fugacity-simulator.vercel.app',
    image_path: 'assets/projects/fugacity_simulator.jpg',
    is_hero: false,
    highlightsKeys: []
  },
  {
    id: 'xiaohongshu',
    nameKey: 'project.xiaohongshu.name',
    descriptionKey: 'project.xiaohongshu.desc',
    tech_stack: ['Content Strategy', 'Xiaohongshu'],
    status: 'Active',
    url: 'https://xhslink.com/m/6pTVib4GbZU',
    image_path: 'assets/projects/xiaohongshu.jpg',
    is_hero: false,
    highlightsKeys: []
  },
  {
    id: 'accounting',
    nameKey: 'project.accounting.name',
    descriptionKey: 'project.accounting.desc',
    tech_stack: ['Python', 'Flask', 'PostgreSQL'],
    status: 'Active',
    url: 'https://finance-app-private-alpha.fly.dev',
    image_path: 'assets/projects/accounting.jpg',
    is_hero: false,
    highlightsKeys: []
  },
  {
    id: 'scm-simulator',
    nameKey: 'project.scm.name',
    descriptionKey: 'project.scm.desc',
    tech_stack: ['Vanilla JavaScript', 'HTML Canvas', 'CSS', 'Supply Chain Simulation'],
    status: 'Completed',
    url: 'https://scmsimulator.vercel.app',
    image_path: 'assets/projects/scm_simulator.jpg',
    is_hero: false,
    highlightsKeys: []
  }
];

/* ═══════════════════════════════════════════════
   2. DATA — CERTIFICATES
   ═══════════════════════════════════════════════ */
const CERTIFICATES = [
  { id: 'sch-001', name: '서강동문장학 (Sogang Alumni Scholarship)', issuer: 'Sogang University', date: '2026-1', category: 'scholarship', image_path: 'assets/certs/20261_sogang_alumni_scholarship_4.jpg' },
  { id: 'sch-002', name: '서강동문장학 (Sogang Alumni Scholarship)', issuer: 'Sogang University', date: '2025-2', category: 'scholarship', image_path: 'assets/certs/20252_sogang_alumni_scholarship_3.jpg' },
  { id: 'sch-003', name: '서강동문장학 (Sogang Alumni Scholarship)', issuer: 'Sogang University', date: '2025-1', category: 'scholarship', image_path: 'assets/certs/20251_sogang_alumni_scholarship_1.jpg' },
  { id: 'sch-004', name: '서강동문장학 (Sogang Alumni Scholarship)', issuer: 'Sogang University', date: '2024-2', category: 'scholarship', image_path: 'assets/certs/20242_sogang_alumni_scholarship_2.jpg' },
  { id: 'sch-005', name: '삼성글로벌꿈장학 (Samsung Global Dream Scholarship)', issuer: 'Samsung', date: '2024-1', category: 'scholarship', image_path: 'assets/certs/20241_samsung_scholarship.jpg' },
  { id: 'sch-006', name: '리앤원장학 (Lee & Won Scholarship)', issuer: 'Sogang University', date: '2023-2', category: 'scholarship', image_path: 'assets/certs/20232_lee-won_scholarship.jpg' },
  { id: 'sch-007', name: '1st Class Admission Scholarship', issuer: 'Sogang University', date: '2023-1', category: 'scholarship', image_path: 'assets/certs/20231_Admission_Scholarship_1.jpg' },

  { id: 'acd-001', name: '디딤돌 멘토링 (Stepping Stone Mentoring)', issuer: 'Sogang University', date: '2025-1', category: 'academic', image_path: 'assets/certs/20251_stepping_stone_mentoring.jpg' },
  { id: 'acd-002', name: 'PALS 우수상 (Excellence Award)', issuer: 'Sogang University', date: '2024-2', category: 'academic', image_path: 'assets/certs/20242_PALS_excellence.jpg' },
  { id: 'acd-003', name: '그룹스터디 (Group Study)', issuer: 'Sogang University', date: '2024-2', category: 'academic', image_path: 'assets/certs/20242_group_study.jpg' },
  { id: 'acd-004', name: 'PALS 우수상 (Excellence Award)', issuer: 'Sogang University', date: '2024-1', category: 'academic', image_path: 'assets/certs/20241_PALS_excellence_eng.jpg' },
  { id: 'acd-005', name: 'PALS 활동증명 (Activity Certificate)', issuer: 'Sogang University', date: '2024-1', category: 'academic', image_path: 'assets/certs/20241_PALS_activity_eng.jpg' },
  { id: 'acd-006', name: 'INTEC 우수상 (Excellence Award)', issuer: 'INTEC Education College', date: '2022-1', category: 'academic', image_path: 'assets/certs/20221_INTEC_excellence.jpg' },
  { id: 'acd-007', name: 'INTEC Graduation Certificate', issuer: 'INTEC Education College', date: '2022-1', category: 'academic', image_path: 'assets/certs/20221_INTEC_graduation.jpg' },

  { id: 'ldr-001', name: 'PALS 회장 (President)', issuer: 'Sogang University', date: '2025-2', category: 'leadership', image_path: 'assets/certs/20252_PALS_president_ENG.jpg' },
  { id: 'ldr-002', name: 'PALS 회장 (President)', issuer: 'Sogang University', date: '2025-1', category: 'leadership', image_path: 'assets/certs/20251_PALS_president.jpg' },
  { id: 'ldr-003', name: 'MSDC', issuer: 'MSDC Korea', date: '2024-2', category: 'leadership', image_path: 'assets/certs/20242_MSDC.jpg' },
  { id: 'ldr-004', name: '리앤원 아시안 펠로우십 우수상 (Asian Fellowship — Excellence)', issuer: 'Sogang University', date: '2023-2', category: 'leadership', image_path: 'assets/certs/20232_lee-won_fellowship_excellence.jpg' },
  { id: 'ldr-005', name: 'MSDC', issuer: 'MSDC Korea', date: '2023-2', category: 'leadership', image_path: 'assets/certs/20232_MSDC.jpg' },
  { id: 'ldr-006', name: 'MSDC — Hari Kebudayaan', issuer: 'MSDC Korea', date: '2023-2', category: 'leadership', image_path: 'assets/certs/20232_MSDC_HARI_KEBUDAYAAN.jpg' },
  { id: 'ldr-007', name: 'MSDC — Majlis Anugerah Dirgahayu', issuer: 'MSDC Korea', date: '2023-2', category: 'leadership', image_path: 'assets/certs/20232_MSDC_MAJLIS_ANUGERAH_DIRGAHAYU.jpg' },
  { id: 'ldr-008', name: 'KASUMA First Aid Committee', issuer: 'KASUMA', date: '2022-1', category: 'leadership', image_path: 'assets/certs/20221_KASUMA.jpg' },

  { id: 'cul-001', name: 'Semarak Jiwa Merdeka', issuer: 'Malaysian Student Association', date: '2024-2', category: 'cultural', image_path: 'assets/certs/20242_SEMARAK_JIWA_MERDEKA.jpg' },
  { id: 'cul-002', name: 'Wind Orchestra', issuer: 'Sogang University', date: '2024-1', category: 'cultural', image_path: 'assets/certs/20241_WIND_ORCHESTRA.jpg' },
  { id: 'cul-003', name: 'PPMKxMSAJ', issuer: 'PPMK / MSAJ', date: '2024-1', category: 'cultural', image_path: 'assets/certs/20241_PPMKxMSAJ.jpg' },
  { id: 'cul-004', name: '리앤원 아시안 펠로우십 수료 (Asian Fellowship — Completion)', issuer: 'Sogang University', date: '2023-2', category: 'cultural', image_path: 'assets/certs/20232_lee-won_fellowship_completion.jpg' },
  { id: 'cul-005', name: 'PPMKxMASAF', issuer: 'PPMK / MASAF', date: '2023-1', category: 'cultural', image_path: 'assets/certs/20231_PPMKxMASAF.jpg' },
  { id: 'cul-006', name: 'MSDC — Look East Policy Event', issuer: 'MSDC Korea', date: '2023-1', category: 'cultural', image_path: 'assets/certs/20231_MSDC_LOOK_EAST_POLICY.jpg' },
  { id: 'cul-007', name: 'MSDC (Malaysian Students Dancing Club)', issuer: 'MSDC Korea', date: '2022-1', category: 'cultural', image_path: 'assets/certs/20221_MSDC.jpg' },
  { id: 'cul-008', name: 'KASUMA Telematch', issuer: 'KASUMA', date: '2022-1', category: 'cultural', image_path: 'assets/certs/20221_KASUMA_TELEMATCH.jpg' },
  { id: 'cul-009', name: 'FITPPMK', issuer: 'PPMK', date: '2022-1', category: 'cultural', image_path: 'assets/certs/20221_FITPPMK.jpg' },

  { id: 'lng-001', name: '北京语言大学成绩单 (Beijing Language University Transcript)', issuer: 'Beijing Language and Culture University', date: '2026-1', category: 'language', image_path: 'assets/certs/20261_BLCU_transcript.jpg' },
  { id: 'lng-002', name: 'TOPIK (Korean Proficiency Test)', issuer: 'National Institute for International Education', date: '2024-1', category: 'language', image_path: 'assets/certs/20241_TOPIK_scorecard.jpg' }
];

/* ═══════════════════════════════════════════════
   3. DATA — CATEGORY COLORS
   ═══════════════════════════════════════════════ */
const CATEGORY_COLORS = {
  scholarship:  { border: 'var(--magenta)', bg: 'var(--magenta-tint-bg)', text: 'var(--magenta-tint-text)' },
  academic:     { border: 'var(--cyan)',    bg: 'var(--cyan-tint-bg)',    text: 'var(--cyan-tint-text)' },
  leadership:   { border: 'var(--lime)',    bg: 'var(--lime-tint-bg)',    text: 'var(--lime-dark-text)' },
  competitions: { border: 'var(--magenta)', bg: 'var(--magenta-tint-bg)', text: 'var(--magenta-tint-text)' },
  cultural:     { border: 'var(--cyan)',    bg: 'var(--cyan-tint-bg)',    text: 'var(--cyan-tint-text)' },
  language:     { border: 'var(--border-light)', bg: 'var(--bg-section)', text: 'var(--text-muted)' }
};

/* ═══════════════════════════════════════════════
   4. RENDER PROJECTS
   ═══════════════════════════════════════════════ */
function renderProjects() {
  const heroSlot = document.getElementById('projects-hero-slot');
  const gridSlot = document.getElementById('projects-grid-slot');
  heroSlot.innerHTML = '';
  gridSlot.innerHTML = '';
  const secondary = document.createElement('div');
  secondary.className = 'project-secondary-grid';

  PROJECTS.forEach(p => {
    const name = t(p.nameKey);
    const description = t(p.descriptionKey);

    if (p.is_hero) {
      const tag = p.url ? 'a' : 'article';
      const el = document.createElement(tag);
      el.className = 'project-hero-card';
      if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
      const highlights = (p.highlightsKeys || []).map(k => `<li>${t(k)}</li>`).join('');
      el.innerHTML = `
        <div>
          <span class="type-micro project-hero__label">${t('project.hero.label')}</span>
          <h3 class="project-hero__title">${name}</h3>
          <p class="project-hero__desc">${description}</p>
          <ul class="project-hero__highlights">${highlights}</ul>
          <div class="project-hero__tech">${p.tech_stack.map(tech => `<span class="pill pill--tech-dark">${tech}</span>`).join('')}</div>
          <span class="pill pill--status">${t('project.status.' + p.status) || p.status}</span>
        </div>
        ${p.image_path ? `<img src="${p.image_path}" alt="${name} screenshot" class="project-hero__img" />` : ''}`;
      heroSlot.appendChild(el);
    } else {
      const tag = p.url ? 'a' : 'article';
      const el = document.createElement(tag);
      el.className = 'project-secondary-card';
      if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
      el.innerHTML = `
        ${p.image_path ? `<img src="${p.image_path}" alt="${name} screenshot" class="project-secondary-card__img" />` : ''}
        <h3 class="project-secondary-card__title">${name}</h3>
        <p class="project-secondary-card__desc">${description}</p>
        <div class="project-secondary-card__tech">${p.tech_stack.map(tech => `<span class="pill pill--tech-light">${tech}</span>`).join('')}</div>`;
      secondary.appendChild(el);
    }
  });

  gridSlot.appendChild(secondary);
}

/* ═══════════════════════════════════════════════
   5. RENDER CERTIFICATES
   ═══════════════════════════════════════════════ */
function renderCertificates() {
  const grid = document.getElementById('certificates-grid');
  CERTIFICATES.forEach(c => {
    const col = CATEGORY_COLORS[c.category] || { border: 'var(--border-light)', bg: 'var(--bg-section)', text: 'var(--text-muted)' };
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.dataset.category = c.category;
    card.dataset.imagePath = c.image_path;
    card.dataset.name = c.name;
    card.style.borderLeftColor = col.border;
    card.innerHTML = `
      <p class="cert-card__category" style="color:${col.text}">${c.category}</p>
      <p class="cert-card__name">${c.name}</p>
      <p class="cert-card__meta">${c.issuer} · ${c.date}</p>`;
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   6. UPDATE CERTIFICATE FILTER LABELS
   ═══════════════════════════════════════════════ */
function updateCertificateFilterLabels() {
  document.querySelectorAll('.pill--filter').forEach(btn => {
    const key = btn.dataset.i18n;
    const baseLabel = t(key);
    const f = btn.dataset.filter;
    const count = f === 'all'
      ? CERTIFICATES.length
      : CERTIFICATES.filter(c => c.category === f).length;
    btn.textContent = `${baseLabel} (${count})`;
  });
}

/* ═══════════════════════════════════════════════
   7. INIT CERTIFICATE FILTERS
   ═══════════════════════════════════════════════ */
function initCertificateFilters() {
  const buttons = document.querySelectorAll('.pill--filter');
  const cards = document.querySelectorAll('.cert-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('cert-card--hidden', f !== 'all' && card.dataset.category !== f);
      });
    });
  });
}

/* ═══════════════════════════════════════════════
   8. INIT CERTIFICATE LIGHTBOX
   ═══════════════════════════════════════════════ */
function initCertificateLightbox() {
  const lb = document.getElementById('certificate-lightbox');
  const img = document.getElementById('certificate-lightbox-image');
  const caption = document.getElementById('certificate-lightbox-caption');

  document.getElementById('certificates-grid').addEventListener('click', e => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    img.src = card.dataset.imagePath;
    img.alt = card.dataset.name;
    caption.textContent = card.dataset.name;
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lb.setAttribute('hidden', '');
    document.body.style.overflow = '';
    img.src = '';
  }

  lb.querySelectorAll('[data-lightbox-close]').forEach(el => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lb.hasAttribute('hidden')) closeLightbox();
  });
}

/* ═══════════════════════════════════════════════
   9. INIT SCROLL REVEAL
   ═══════════════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   10. INIT HERO ANIMATION
   ═══════════════════════════════════════════════ */
function initHeroAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.hero__blur-item');
  items.forEach((el, i) => {
    const idx = parseInt(el.dataset.revealIndex ?? i, 10);
    const delay = prefersReduced ? 0 : idx * 75;
    setTimeout(() => el.classList.add('is-visible'), delay);
  });
}

/* ═══════════════════════════════════════════════
   10b. INIT LINKS DROPDOWN
   ═══════════════════════════════════════════════ */
function initLinksDropdown() {
  const trigger = document.querySelector('.hero__overflow-trigger');
  const dropdown = document.querySelector('.hero__dropdown');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = !dropdown.hasAttribute('hidden');
    if (isOpen) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      dropdown.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', () => {
    if (!dropdown.hasAttribute('hidden')) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !dropdown.hasAttribute('hidden')) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════════════════════════
   10c. COPY EMAIL
   ═══════════════════════════════════════════════ */
function copyEmail() {
  const email = 'ammarhakimikm03@gmail.com';
  const btn = document.getElementById('copy-email-btn');
  const label = btn ? btn.querySelector('[data-i18n="hero.cta.copy"]') : null;

  function showCopied() {
    if (!label) return;
    const orig = label.textContent;
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = orig; }, 2000);
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(showCopied).catch(showCopied);
  } else {
    const el = document.createElement('textarea');
    el.value = email;
    el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(el);
    showCopied();
  }
}

/* ═══════════════════════════════════════════════
   10d. INIT SHIMMER HOVER
   ═══════════════════════════════════════════════ */
function initShimmerHover() {
  const btn = document.querySelector('.hero__btn--primary');
  if (!btn) return;
  btn.addEventListener('mouseenter', () => {
    btn.classList.remove('shimmer-active');
    void btn.offsetWidth;
    btn.classList.add('shimmer-active');
  });
}

/* ═══════════════════════════════════════════════
   10e. HERO PARALLAX
   ═══════════════════════════════════════════════ */
function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mediaEl = document.querySelector('.hero__media');
  const contentEl = document.querySelector('.hero__content');
  const hero = document.getElementById('hero');
  if (!mediaEl || !contentEl || !hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY <= heroH) {
        // media drifts slightly faster (appears in foreground)
        const mediaY = Math.min(scrollY * 0.08, 32);
        // content drifts more subtly
        const contentY = Math.min(scrollY * 0.04, 20);
        mediaEl.style.transform = `translateY(${-mediaY}px)`;
        contentEl.style.transform = `translateY(${-contentY}px)`;
      } else {
        mediaEl.style.transform = '';
        contentEl.style.transform = '';
      }
      ticking = false;
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════════════
   10f. GRADIENT WAVE TEXT
   ═══════════════════════════════════════════════ */
function initGradientWaveText() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero__bio-gradient');
  if (!el) return;

  const SPEED = 0.8;
  const RANGE = 200;
  let gi = -25;
  let last = performance.now();
  let rafId;

  function tick(now) {
    const dt = Math.min(64, now - last);
    last = now;
    gi += (dt * SPEED) / 16.6667;
    if (gi >= RANGE) gi -= RANGE;
    el.style.setProperty('--gi', gi.toFixed(2));
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  });
}

/* ═══════════════════════════════════════════════
   10g. SPECIAL TEXT (scramble-reveal, once per session)
   ═══════════════════════════════════════════════ */
function initSpecialText() {
  const SESSION_KEY = 'hero_name_scrambled';
  if (sessionStorage.getItem(SESSION_KEY)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero__full-name');
  if (!el) return;

  const RANDOM_CHARS = '_!X$0-+*#';
  const SPEED = 22;
  const targetText = el.textContent;

  el.style.minWidth = el.offsetWidth + 'px';
  el.classList.add('is-scrambling');

  let phase = 1;
  let step = 0;
  let intervalId = null;

  function getRandomChar(prev) {
    let c;
    do { c = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]; }
    while (c === prev);
    return c;
  }

  function buildPhase1() {
    const len = Math.min(step + 1, targetText.length);
    let chars = [];
    for (let i = 0; i < len; i++) {
      chars.push(getRandomChar(chars[i - 1]));
    }
    while (chars.length < targetText.length) chars.push('\u00A0');
    return chars.join('');
  }

  function buildPhase2() {
    const revealed = Math.floor(step / 2);
    let chars = [];
    for (let i = 0; i < revealed && i < targetText.length; i++) {
      chars.push(targetText[i]);
    }
    if (revealed < targetText.length) {
      chars.push(step % 2 === 0 ? '_' : getRandomChar());
    }
    while (chars.length < targetText.length) {
      chars.push(getRandomChar(chars[chars.length - 1]));
    }
    return chars.join('');
  }

  function tick() {
    if (phase === 1) {
      el.textContent = buildPhase1();
      step++;
      if (step >= targetText.length * 2) {
        phase = 2;
        step = 0;
      }
    } else {
      const text = buildPhase2();
      if (Math.floor(step / 2) >= targetText.length) {
        clearInterval(intervalId);
        el.textContent = targetText;
        el.classList.remove('is-scrambling');
        el.style.minWidth = '';
        sessionStorage.setItem(SESSION_KEY, '1');
        return;
      }
      el.textContent = text;
      step++;
    }
  }

  setTimeout(() => {
    intervalId = setInterval(tick, SPEED);
  }, 450);
}

/* ═══════════════════════════════════════════════
   10h. ANIMATED CHECKBOX — HERO BUILDS
   ═══════════════════════════════════════════════ */
const HERO_BUILDS = [
  { label: 'LifeOS — unified life OS',           checked: true  },
  { label: 'CNN emotion → color AI',             checked: true  },
  { label: 'Scholarship writing system',         checked: false },
  { label: 'Bullwhip effect simulator',          checked: true  },
];

function renderHeroBuilds() {
  const container = document.getElementById('hero-builds');
  if (!container) return;

  HERO_BUILDS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'hero__build-item' + (item.checked ? ' is-checked' : '');
    div.setAttribute('role', 'checkbox');
    div.setAttribute('aria-checked', item.checked ? 'true' : 'false');
    div.setAttribute('tabindex', '0');

    const PATH_LEN = 14.5;
    const initialOffset = item.checked ? 0 : PATH_LEN;

    div.innerHTML = `
      <div class="hero__build-box">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path
            class="hero__build-check"
            d="M 5 10.5 L 8.5 14 L 15 7"
            style="stroke-dasharray:${PATH_LEN};stroke-dashoffset:${initialOffset}"
          />
        </svg>
      </div>
      <div class="hero__build-label-wrap">
        <span class="hero__build-label">${item.label}</span>
        <span class="hero__build-strike"
              style="width:${item.checked ? '100%' : '0'}"></span>
      </div>`;

    div.addEventListener('click', () => toggleBuildItem(div));
    div.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleBuildItem(div);
      }
    });

    container.appendChild(div);
  });
}

function toggleBuildItem(div) {
  const isChecked = div.classList.toggle('is-checked');
  div.setAttribute('aria-checked', isChecked ? 'true' : 'false');

  const path   = div.querySelector('.hero__build-check');
  const strike = div.querySelector('.hero__build-strike');
  const PATH_LEN = 14.5;

  if (path)   path.style.strokeDashoffset = isChecked ? 0 : PATH_LEN;
  if (strike) strike.style.width = isChecked ? '100%' : '0';
}

/* ═══════════════════════════════════════════════
   10e-ii. MOBILE NAV MENU
   ═══════════════════════════════════════════════ */
function initMobileNavMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const panel     = document.getElementById('mobile-nav-panel');
  const backdrop  = document.getElementById('mobile-nav-backdrop');
  const mobileLangBtn = document.getElementById('mobile-lang-toggle');
  if (!hamburger || !panel || !backdrop) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstLink = panel.querySelector('.mobile-nav__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Close on nav link click (also smooth-scroll for hash links)
  panel.querySelectorAll('.mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    link.addEventListener('click', e => {
      closeMenu();
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Close on backdrop click or Escape
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeMenu();
  });

  // Sync mobile lang toggle with main lang toggle
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      document.getElementById('lang-toggle').click();
    });
  }
}

/* ═══════════════════════════════════════════════
   11. INIT LANG TOGGLE
   ═══════════════════════════════════════════════ */
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
    updateCertificateFilterLabels();
    renderProjects();
  });
}

/* ═══════════════════════════════════════════════
   12. INIT STICKY NAV
   ═══════════════════════════════════════════════ */
function initStickyNav() {
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');

  const navObserver = new IntersectionObserver(entries => {
    nav.classList.toggle('is-visible', !entries[0].isIntersecting);
  }, { threshold: 0 });
  navObserver.observe(hero);

  nav.querySelectorAll('.site-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ═══════════════════════════════════════════════
   13. INIT
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderProjects();
  renderCertificates();
  updateCertificateFilterLabels();
  initCertificateFilters();
  initCertificateLightbox();
  initScrollReveal();
  initHeroAnimation();
  initLinksDropdown();
  initShimmerHover();
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) copyBtn.addEventListener('click', copyEmail);
  initStickyNav();
  initLangToggle();
  initHeroParallax();
  initGradientWaveText();
  initSpecialText();
  renderHeroBuilds();
  initMobileNavMenu();
});
