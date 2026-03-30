/* ══════════════════════════════════════════════════════════
   0. I18N — TRANSLATIONS & LANGUAGE SWITCHER
   ══════════════════════════════════════════════════════════ */

let currentLang = localStorage.getItem('lang') || 'en';

const TRANSLATIONS = {
  en: {
    'nav.about': 'About', 'nav.projects': 'Projects', 'nav.skills': 'Skills',
    'nav.ai-tools': 'AI Tools', 'nav.certificates': 'Certificates',
    'hero.micro': 'BUILDER · MULTILINGUAL · SYSTEMS THINKER',
    'hero.oneliner': 'I build systems for life management — finance, health, habits, all in one place.',
    'about.micro': 'ABOUT',
    'about.headline': 'Builder, not a credential collector',
    'about.body': 'Malaysian student at Sogang University double-majoring in Chemical & Biomolecular Engineering and International Business. I learn by building — from a personal accounting system maintained since 2021 to a unified life management platform spanning 6 domains. Currently leading PALS as president and mentoring through Samsung Dream Scholars.',
    'about.stat.languages': 'Languages', 'about.stat.certificates': 'Certificates',
    'about.stat.leadership': 'Leadership Roles', 'about.stat.building': 'Building',
    'projects.micro': 'PROJECTS', 'projects.headline': "What I've built",
    'project.hero.label': 'HERO PROJECT',
    'project.status.in-development': 'In Development', 'project.status.active': 'Active',
    'skills.micro': 'SKILLS', 'skills.headline': 'What I work with',
    'skills.group.languages': 'Languages', 'skills.group.frameworks': 'Frameworks',
    'skills.group.tools': 'Tools & Data', 'skills.group.domains': 'Domains',
    'ai.micro': 'AI-AUGMENTED DEVELOPMENT', 'ai.headline': 'How I build with AI',
    'ai.cc.name': 'Claude Code',
    'ai.cc.desc': 'Agentic terminal assistant with full-repo context. Used for architecture decisions, end-to-end feature builds, and complex refactors across multiple files.',
    'ai.cc.tag1': 'Agentic coding', 'ai.cc.tag2': 'Architecture', 'ai.cc.tag3': 'Terminal',
    'ai.gc.name': 'GitHub Copilot',
    'ai.gc.desc': 'Inline suggestions and multi-file edits in VS Code. Used daily for boilerplate elimination, rapid prototyping, and code review assistance.',
    'ai.gc.tag1': 'Autocomplete', 'ai.gc.tag2': 'VS Code', 'ai.gc.tag3': 'Code review',
    'ai.cx.name': 'OpenAI Codex',
    'ai.cx.desc': 'Code generation via API for scripts, data pipelines, and automating repetitive dev tasks. Integrated into custom tooling across projects.',
    'ai.cx.tag1': 'Code generation', 'ai.cx.tag2': 'API', 'ai.cx.tag3': 'Automation',
    'ai.aw.name': 'Agentic Workflows',
    'ai.aw.desc': 'Multi-agent pipelines for autonomous task completion — chaining models for research, implementation, testing, and deployment without manual steps.',
    'ai.aw.tag1': 'Multi-agent', 'ai.aw.tag2': 'Pipelines', 'ai.aw.tag3': 'Orchestration',
    'certs.micro': 'CERTIFICATES & AWARDS', 'certs.headline': 'Recognition',
    'certs.all': 'All', 'certs.scholarship': 'Scholarships', 'certs.academic': 'Academic',
    'certs.leadership': 'Leadership', 'certs.cultural': 'Cultural', 'certs.language': 'Language',
    'footer.tagline': 'Built with intention',
    'footer.cta': 'Open to consulting, mentoring, or building together →',
  },
  zh: {
    'nav.about': '关于', 'nav.projects': '项目', 'nav.skills': '技能',
    'nav.ai-tools': 'AI 工具', 'nav.certificates': '证书',
    'hero.micro': '构建者 · 多语言 · 系统思维者',
    'hero.oneliner': '我构建生活管理系统——财务、健康、习惯，一切尽在其中。',
    'about.micro': '关于我',
    'about.headline': '构建者，而非证书收藏家',
    'about.body': '就读于西江大学的马来西亚留学生，双修化学与生物分子工程及国际商务。我通过构建来学习——从2021年开始维护的个人记账系统，到涵盖6个领域的统一生活管理平台。目前担任PALS会长，同时通过三星全球梦想奖学金项目担任导师。',
    'about.stat.languages': '语言', 'about.stat.certificates': '证书',
    'about.stat.leadership': '领导职位', 'about.stat.building': '构建年限',
    'projects.micro': '项目', 'projects.headline': '我构建的作品',
    'project.hero.label': '主要项目',
    'project.status.in-development': '开发中', 'project.status.active': '运行中',
    'skills.micro': '技能', 'skills.headline': '我的技术栈',
    'skills.group.languages': '编程语言', 'skills.group.frameworks': '框架',
    'skills.group.tools': '工具与数据', 'skills.group.domains': '应用领域',
    'ai.micro': 'AI 辅助开发', 'ai.headline': '我如何与 AI 协作构建',
    'ai.cc.name': 'Claude Code',
    'ai.cc.desc': '具备完整代码库上下文的智能终端助手。用于架构决策、端到端功能开发及跨文件的复杂重构。',
    'ai.cc.tag1': '智能编程', 'ai.cc.tag2': '架构', 'ai.cc.tag3': '终端',
    'ai.gc.name': 'GitHub Copilot',
    'ai.gc.desc': '在 VS Code 中提供内联建议和多文件编辑。每日用于消除样板代码、快速原型开发和代码审查辅助。',
    'ai.gc.tag1': '自动补全', 'ai.gc.tag2': 'VS Code', 'ai.gc.tag3': '代码审查',
    'ai.cx.name': 'OpenAI Codex',
    'ai.cx.desc': '通过 API 进行代码生成，用于脚本编写、数据管道构建及自动化重复开发任务，已集成到多个项目的自定义工具中。',
    'ai.cx.tag1': '代码生成', 'ai.cx.tag2': 'API', 'ai.cx.tag3': '自动化',
    'ai.aw.name': '智能工作流',
    'ai.aw.desc': '用于自主完成任务的多智能体流水线——将多个模型串联，实现从研究、实现、测试到部署的无人工干预全流程。',
    'ai.aw.tag1': '多智能体', 'ai.aw.tag2': '流水线', 'ai.aw.tag3': '编排',
    'certs.micro': '证书与奖项', 'certs.headline': '荣誉',
    'certs.all': '全部', 'certs.scholarship': '奖学金', 'certs.academic': '学术',
    'certs.leadership': '领导力', 'certs.cultural': '文化', 'certs.language': '语言',
    'footer.tagline': '用心而建',
    'footer.cta': '欢迎咨询、合作或共同构建 →',
  }
};

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    ? TRANSLATIONS[currentLang][key]
    : (TRANSLATIONS.en[key] || key);
}

/* ══════════════════════════════════════════════════════════
   1. DATA — PROJECTS
   ══════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id: "proj-001",
    name: "LifeOS",
    description: "Unified personal life management platform — finance, health, habits, skills across 6 integrated domains. Features event-driven architecture, LP macro optimizer, and a custom Botanical Editorial design system.",
    description_zh: "统一的个人生活管理平台——涵盖财务、健康、习惯、技能等6个集成领域。具备事件驱动架构、LP宏观优化器及自定义植物学编辑设计系统。",
    tech_stack: ["Next.js", "Flask", "PostgreSQL", "Python", "TypeScript"],
    status: "In Development",
    url: "https://lifeos-wine.vercel.app",
    image_path: "assets/projects/lifeos.jpg",
    is_hero: true,
    highlights: [
      "6 integrated life domains",
      "LP macro optimizer",
      "Event-driven architecture",
      "Custom design system"
    ],
    highlights_zh: [
      "6个生活领域集成",
      "LP宏观优化器",
      "事件驱动架构",
      "自定义设计系统"
    ]
  },
  {
    id: "proj-002",
    name: "小红书 Content",
    description: "Documenting the LifeOS building journey on Xiaohongshu. Strategy, content creation, and audience growth with brother handling editing and posting.",
    description_zh: "在小红书上记录LifeOS的构建历程。负责策略与内容创作，弟弟负责剪辑和发布。",
    tech_stack: ["Content Strategy", "Xiaohongshu"],
    status: "Active",
    url: "https://xhslink.com/m/6pTVib4GbZU",
    image_path: "assets/projects/xiaohongshu.jpg",
    is_hero: false,
    theme: "red",
    highlights: []
  },
  {
    id: "proj-003",
    name: "Personal Accounting System",
    description: "Full personal accounting system built from scratch since 2021 — my first ever project, continuously maintained and improved over 5 years.",
    description_zh: "从零开始构建的完整个人记账系统，自2021年起持续维护与迭代——这是我的第一个项目，已坚持5年。",
    tech_stack: ["Python", "Flask", "PostgreSQL"],
    status: "Active",
    url: "https://finance-app-private-alpha.fly.dev/",
    image_path: "assets/projects/accounting.jpg",
    is_hero: false,
    theme: "green",
    highlights: []
  }
];

/* ══════════════════════════════════════════════════════════
   2. DATA — CERTIFICATES
   ══════════════════════════════════════════════════════════ */

const CERTIFICATES = [
  // ===== SCHOLARSHIPS =====
  {
    id: "sch-001",
    name: "서강동문장학 (Sogang Alumni Scholarship)",
    category: "scholarship",
    date: "2025-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20252_sogang_alumni_scholarship_3.jpg"
  },
  {
    id: "sch-002",
    name: "서강동문장학 (Sogang Alumni Scholarship)",
    category: "scholarship",
    date: "2025-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20251_sogang_alumni_scholarship_1.jpg"
  },
  {
    id: "sch-003",
    name: "서강동문장학 (Sogang Alumni Scholarship)",
    category: "scholarship",
    date: "2024-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20242_sogang_alumni_scholarship_2.jpg"
  },
  {
    id: "sch-004",
    name: "삼성글로벌꿈장학 (Samsung Global Dream Scholarship)",
    category: "scholarship",
    date: "2024-1",
    issuer: "Samsung",
    image_path: "assets/certs/20241_samsung_scholarship.jpg"
  },
  {
    id: "sch-005",
    name: "리앤원장학 (Lee & Won Scholarship)",
    category: "scholarship",
    date: "2023-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20232_lee-won_scholarship.jpg"
  },
  {
    id: "sch-006",
    name: "1st Class Admission Scholarship",
    category: "scholarship",
    date: "2023-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20231_Admission_Scholarship_1.jpg"
  },

  // ===== ACADEMIC =====
  {
    id: "acd-001",
    name: "디딤돌 멘토링 (Stepping Stone Mentoring)",
    category: "academic",
    date: "2025-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20251_stepping_stone_mentoring.jpg"
  },
  {
    id: "acd-002",
    name: "PALS 우수상 (Excellence Award)",
    category: "academic",
    date: "2024-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20242_PALS_excellence.jpg"
  },
  {
    id: "acd-003",
    name: "그룹스터디 (Group Study)",
    category: "academic",
    date: "2024-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20242_group_study.jpg"
  },
  {
    id: "acd-004",
    name: "PALS 우수상 (Excellence Award)",
    category: "academic",
    date: "2024-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20241_PALS_excellence_eng.jpg"
  },
  {
    id: "acd-005",
    name: "PALS 활동증명 (Activity Certificate)",
    category: "academic",
    date: "2024-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20241_PALS_activity_eng.jpg"
  },
  {
    id: "acd-006",
    name: "INTEC 우수상 (Excellence Award)",
    category: "academic",
    date: "2022-1",
    issuer: "INTEC Education College",
    image_path: "assets/certs/20221_INTEC_excellence.jpg"
  },
  {
    id: "acd-007",
    name: "INTEC Graduation Certificate",
    category: "academic",
    date: "2022-1",
    issuer: "INTEC Education College",
    image_path: "assets/certs/20221_INTEC_graduation.jpg"
  },

  // ===== LEADERSHIP =====
  {
    id: "ldr-001",
    name: "PALS 회장 (President)",
    category: "leadership",
    date: "2025-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20252_PALS_president_ENG.jpg"
  },
  {
    id: "ldr-002",
    name: "PALS 회장 (President)",
    category: "leadership",
    date: "2025-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20251_PALS_president.jpg"
  },
  {
    id: "ldr-003",
    name: "MSDC",
    category: "leadership",
    date: "2024-2",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20242_MSDC.jpg"
  },
  {
    id: "ldr-004",
    name: "리앤원 아시안 펠로우십 우수상 (Asian Fellowship — Excellence)",
    category: "leadership",
    date: "2023-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20232_lee-won_fellowship_excellence.jpg"
  },
  {
    id: "ldr-005",
    name: "MSDC",
    category: "leadership",
    date: "2023-2",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20232_MSDC.jpg"
  },
  {
    id: "ldr-006",
    name: "MSDC — Hari Kebudayaan",
    category: "leadership",
    date: "2023-2",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20232_MSDC_HARI_KEBUDAYAAN.jpg"
  },
  {
    id: "ldr-007",
    name: "MSDC — Majlis Anugerah Dirgahayu",
    category: "leadership",
    date: "2023-2",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20232_MSDC_MAJLIS_ANUGERAH_DIRGAHAYU.jpg"
  },

  {
    id: "ldr-009",
    name: "KASUMA First Aid Committee",
    category: "leadership",
    date: "2022-1",
    issuer: "KASUMA",
    image_path: "assets/certs/20221_KASUMA.jpg"
  },
  
  // ===== CULTURAL =====  
  {
    id: "cul-001",
    name: "Semarak Jiwa Merdeka",
    category: "cultural",
    date: "2024-2",
    issuer: "Malaysian Student Association",
    image_path: "assets/certs/20242_SEMARAK_JIWA_MERDEKA.jpg"
  },
  {
    id: "cul-002",
    name: "Wind Orchestra",
    category: "cultural",
    date: "2024-1",
    issuer: "Sogang University",
    image_path: "assets/certs/20241_WIND_ORCHESTRA.jpg"
  },
  {
    id: "cul-003",
    name: "PPMKxMSAJ",
    category: "cultural",
    date: "2024-1",
    issuer: "PPMK / MSAJ",
    image_path: "assets/certs/20241_PPMKxMSAJ.jpg"
  },
  {
    id: "cul-004",
    name: "리앤원 아시안 펠로우십 수료 (Asian Fellowship — Completion)",
    category: "cultural",
    date: "2023-2",
    issuer: "Sogang University",
    image_path: "assets/certs/20232_lee-won_fellowship_completion.jpg"
  },
  {
    id: "cul-005",
    name: "PPMKxMASAF",
    category: "cultural",
    date: "2023-1",
    issuer: "PPMK / MASAF",
    image_path: "assets/certs/20231_PPMKxMASAF.jpg"
  },
  {
    id: "cul-006",
    name: "MSDC — Look East Policy Event",
    category: "cultural",
    date: "2023-1",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20231_MSDC_LOOK_EAST_POLICY.jpg"
  },
  {
    id: "cul-007",
    name: "MSDC (Malaysian Students Diplomatic Corps)",
    category: "cultural",
    date: "2022-1",
    issuer: "MSDC Korea",
    image_path: "assets/certs/20221_MSDC.jpg"
  },
  
  {
    id: "cul-008",
    name: "KASUMA Telematch",
    category: "cultural",
    date: "2022-1",
    issuer: "KASUMA",
    image_path: "assets/certs/20221_KASUMA_TELEMATCH.jpg"
  },
  {
    id: "cul-009",
    name: "FITPPMK",
    category: "cultural",
    date: "2022-1",
    issuer: "PPMK",
    image_path: "assets/certs/20221_FITPPMK.jpg"
  },

  // ===== LANGUAGE =====
  {
    id: "lng-001",
    name: "TOPIK (Korean Proficiency Test)",
    category: "language",
    date: "2024-1",
    issuer: "National Institute for International Education",
    image_path: "assets/certs/20241_TOPIK_scorecard.jpg"
  },
  {
    id: "lng-002",
    name: "北京语言大学成绩单 (Beijing Language University Transcript)",
    category: "language",
    date: "2026-1",
    issuer: "Beijing Language and Culture University",
    image_path: "assets/certs/20261_BLCU_transcript.jpg"
  }
];

/* ══════════════════════════════════════════════════════════
   3. CATEGORY COLORS MAP
   ══════════════════════════════════════════════════════════ */

const CATEGORY_COLORS = {
  scholarship: { color: 'var(--magenta-tint-text)', label: 'Scholarship' },
  academic:    { color: 'var(--cyan-tint-text)',    label: 'Academic' },
  leadership:  { color: 'var(--lime-dark-text)',    label: 'Leadership' },
  cultural:    { color: 'var(--magenta-tint-text)', label: 'Cultural' },
  language:    { color: 'var(--cyan-tint-text)',     label: 'Language' }
};

/* ══════════════════════════════════════════════════════════
   4. RENDER PROJECTS
   ══════════════════════════════════════════════════════════ */

function renderProjects() {
  const heroContainer = document.getElementById('hero-project');
  const gridContainer = document.getElementById('projects-grid');

  PROJECTS.forEach(project => {
    if (project.is_hero) {
      const heroTag = project.url ? 'a' : 'article';
      const heroLinkAttrs = project.url ? `href="${project.url}" target="_blank" rel="noopener"` : '';
      const desc = (currentLang === 'zh' && project.description_zh) ? project.description_zh : project.description;
      const highlights = (currentLang === 'zh' && project.highlights_zh) ? project.highlights_zh : project.highlights;
      const statusKey = `project.status.${project.status.toLowerCase().replace(' ', '-')}`;
      heroContainer.innerHTML = `
        <${heroTag} class="project-hero__card reveal" ${heroLinkAttrs} style="text-decoration:none;color:inherit;display:block">
          <div class="project-hero__inner">
            <div class="project-hero__content">
              <span class="type-micro" style="color: var(--lime)">${t('project.hero.label')}</span>
              <h3 class="project-hero__title">${project.name}</h3>
              <p class="project-hero__desc">${desc}</p>
              <ul class="project-hero__highlights">
                ${highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
              <div class="project-hero__tech">
                ${project.tech_stack.map(tech => `<span class="pill pill--tech-dark">${tech}</span>`).join('')}
              </div>
              <span class="pill pill--status">${t(statusKey)}</span>
            </div>
            ${project.image_path ? `
            <div class="project-hero__browser">
              <div class="project-hero__browser-bar">
                <span class="project-hero__browser-dot"></span>
                <span class="project-hero__browser-dot"></span>
                <span class="project-hero__browser-dot"></span>
                <div class="project-hero__browser-url">${project.url ? project.url.replace(/^https?:\/\//, '') : ''}</div>
              </div>
              <div class="project-hero__browser-screen">
                <img src="${project.image_path}" alt="${project.name} screenshot">
              </div>
            </div>` : ''}
          </div>
          <div class="blob blob--hero-1" aria-hidden="true"></div>
          <div class="blob blob--hero-2" aria-hidden="true"></div>
        </${heroTag}>`;
    } else {
      const tag = project.url ? 'a' : 'div';
      const linkAttrs = project.url ? `href="${project.url}" target="_blank" rel="noopener"` : '';
      const themeClass = project.theme ? ` project-card--${project.theme}` : '';
      const cardDesc = (currentLang === 'zh' && project.description_zh) ? project.description_zh : project.description;
      gridContainer.innerHTML += `
        <${tag} class="project-card${themeClass} reveal" ${linkAttrs}>
          ${project.image_path ? `<div class="project-card__image"><img src="${project.image_path}" alt="${project.name} screenshot"></div>` : ''}
          <h3 class="project-card__title">${project.name}</h3>
          <p class="project-card__desc">${cardDesc}</p>
          <div class="project-card__tech">
            ${project.tech_stack.map(t => `<span class="pill pill--tech-light">${t}</span>`).join('')}
          </div>
        </${tag}>`;
    }
  });
}

/* ══════════════════════════════════════════════════════════
   5. RENDER CERTIFICATES
   ══════════════════════════════════════════════════════════ */

function renderCertificates() {
  const grid = document.getElementById('cert-grid');
  grid.innerHTML = CERTIFICATES.map(cert => {
    const cat = CATEGORY_COLORS[cert.category];
    const catLabel = t(`certs.${cert.category}`);
    return `
      <article class="cert-card reveal" data-category="${cert.category}"
               tabindex="0" role="button" aria-label="View ${cert.name}"
               data-image="${cert.image_path}">
        <span class="type-micro cert-card__category" style="color: ${cat.color}">
          ${catLabel}
        </span>
        <h3 class="cert-card__title">${cert.name}</h3>
        <span class="cert-card__date">${cert.date}</span>
      </article>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   6. FILTER LOGIC
   ══════════════════════════════════════════════════════════ */

function injectFilterCounts() {
  document.querySelectorAll('.pill--filter').forEach(btn => {
    const filter = btn.dataset.filter;
    const base = t(`certs.${filter === 'all' ? 'all' : filter}`);
    if (filter === 'all') {
      btn.textContent = `${base} (${CERTIFICATES.length})`;
    } else {
      const count = CERTIFICATES.filter(c => c.category === filter).length;
      btn.textContent = `${base} (${count})`;
    }
  });
}

let filtersInitialized = false;
function initFilters() {
  injectFilterCounts();
  if (filtersInitialized) return;
  filtersInitialized = true;

  document.querySelector('.cert-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.pill--filter');
    if (!btn) return;
    document.querySelectorAll('.pill--filter').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cert-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('cert-card--hidden', !match);
    });
  });
}

/* ══════════════════════════════════════════════════════════
   7. LIGHTBOX
   ══════════════════════════════════════════════════════════ */

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const backdrop = lightbox.querySelector('.lightbox__backdrop');

  function openLightbox(imagePath, altText) {
    img.src = encodeURI(imagePath);
    img.alt = altText;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    img.src = '';
  }

  document.getElementById('cert-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (card && card.dataset.image) {
      openLightbox(card.dataset.image, card.querySelector('.cert-card__title').textContent);
    }
  });

  document.getElementById('cert-grid').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.cert-card');
      if (card && card.dataset.image) {
        e.preventDefault();
        openLightbox(card.dataset.image, card.querySelector('.cert-card__title').textContent);
      }
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

/* ══════════════════════════════════════════════════════════
   8. SCROLL REVEAL
   ══════════════════════════════════════════════════════════ */

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i % 5 * 50}ms`;
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════
   9. HERO ANIMATION
   ══════════════════════════════════════════════════════════ */

function initStickyNav() {
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      nav.classList.toggle('visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });
  observer.observe(hero);

  // Smooth scroll for nav links
  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initHeroAnimation() {
  const elements = [
    '.hero__micro',
    '.hero__name',
    '.hero__subtitle',
    '.hero__oneliner',
    '.hero__socials',
    '.hero__photo'
  ];

  elements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 300ms var(--reveal-easing), transform 300ms var(--reveal-easing)`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 50);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   10. I18N — SET LANGUAGE & INIT
   ══════════════════════════════════════════════════════════ */

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = lang === 'zh' ? '韩泰阳 — 个人作品集' : 'Taeyang Han — Portfolio';

  // Update all static [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[lang][key] || TRANSLATIONS.en[key];
    if (val) el.textContent = val;
  });

  // Re-render dynamic content with new language
  document.getElementById('hero-project').innerHTML = '';
  document.getElementById('projects-grid').innerHTML = '';
  renderProjects();
  document.getElementById('cert-grid').innerHTML = '';
  renderCertificates();
  injectFilterCounts();
  initScrollReveal();

  // Update toggle active state
  document.querySelectorAll('#lang-toggle [data-lang]').forEach(span => {
    span.classList.toggle('active', span.dataset.lang === lang);
  });
}

function initI18n() {
  // Apply stored language on first load
  if (currentLang === 'zh') setLanguage('zh');
  else {
    document.querySelectorAll('#lang-toggle [data-lang]').forEach(span => {
      span.classList.toggle('active', span.dataset.lang === 'en');
    });
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'zh' : 'en');
  });
}

/* ══════════════════════════════════════════════════════════
   11. INIT
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderCertificates();
  initFilters();
  initLightbox();
  initScrollReveal();
  initHeroAnimation();
  initStickyNav();
  initI18n();
});
