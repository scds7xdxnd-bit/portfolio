/* ═══════════════════════════════════════════════
   0. I18N
   ═══════════════════════════════════════════════ */
let currentLang = localStorage.getItem('lang') || 'en';

const TRANSLATIONS = {
  en: {
    'nav.about':'Profile','nav.specializations':'Specializations','nav.opinions':'Field Notes',
    
    'hero.name':'Taeyang Han',
    'hero.stat.languages':'Languages',
    'hero.stat.languages.5':'5',
    'hero.stat.certificates':'Certificates',
    'hero.stat.certificates.30':'30+',
    'hero.stat.building':'Building',
    'hero.stat.building.5yrs':'5yrs',
    'hero.playerProfile':'Player Profile',
    'hero.greeting':"Hi! I\u2019m",
    'hero.role.systemsBuilder':'Systems Builder',
    'hero.role.languageExplorer':'Language Explorer',
    'hero.role.lifeDesigner':'Life Designer',
    'hero.badge.building':'Building',
    'hero.speech':'I build fun, practical systems that help people learn, live better, and chase big goals.',
    'hero.startQuest':'Start Quest',
    'hero.copyEmail':'Copy Email',
    'hero.quests':'Current Quests',
    'hero.quest.lifeos':'LifeOS',
    'hero.quest.lifeosDesc':'Build my personal operating system',
    'hero.quest.finance':'Finance App',
    'hero.quest.financeDesc':'Learn finance. Track. Grow.',
    'hero.quest.processGame':'Process Game',
    'hero.quest.processGameDesc':'Make chemical engineering fun',
    'hero.quest.language':'Language Learning',
    'hero.quest.languageDesc':'6 languages. One adventure.',
    'hero.quest.buildLog':'Build Log',
    'hero.quest.buildLogDesc':'Document the process',

    'projects.headline':'Featured Quests',
    'project.hero.label':'ACTIVE QUEST','project.status.In Development':'In Progress','project.status.Active':'Active','project.status.Completed':'Complete',

    'skills.headline':'Character Stats',
    'skills.group.languages':'Core Stats','skills.group.frameworks':'Build Engines','skills.group.tools':'Equipment','skills.group.domains':'World Knowledge',
    'skills.tool.postgresql':'PostgreSQL','skills.tool.git':'Git','skills.tool.vercel':'Vercel','skills.tool.linux':'Linux',
    'skills.framework.nextjs':'Next.js','skills.framework.flask':'Flask','skills.framework.react':'React',
    'skills.language.python':'Python','skills.language.typescript':'TypeScript','skills.language.sql':'SQL','skills.language.html-css':'HTML/CSS','skills.language.javascript':'JavaScript',
    'skills.domain.systems-design':'Systems Design','skills.domain.content-strategy':'Content Strategy','skills.domain.process-engineering':'Process Engineering','skills.domain.financial-modeling':'Financial Modeling',

    'ai.headline':'Tools I Use',
    'ai.cc.badge':'CC','ai.cc.name':'Claude Code','ai.cc.desc':'Agentic terminal assistant with full-repo context. Used for architecture decisions, end-to-end feature builds, and complex refactors across multiple files.','ai.cc.tag1':'Agentic coding','ai.cc.tag2':'Architecture','ai.cc.tag3':'Terminal',
    'ai.gc.badge':'GC','ai.gc.name':'GitHub Copilot','ai.gc.desc':'Inline suggestions and multi-file edits in VS Code. Used daily for boilerplate elimination, rapid prototyping, and code review assistance.','ai.gc.tag1':'Autocomplete','ai.gc.tag2':'VS Code','ai.gc.tag3':'Code review',
    'ai.cx.badge':'CX','ai.cx.name':'OpenAI Codex','ai.cx.desc':'Code generation via API for scripts, data pipelines, and automating repetitive dev tasks. Integrated into custom tooling across projects.','ai.cx.tag1':'Code generation','ai.cx.tag2':'API','ai.cx.tag3':'Automation',
    'ai.aw.badge':'AW','ai.aw.name':'Agentic Workflows','ai.aw.desc':'Multi-agent pipelines for autonomous task completion — chaining models for research, implementation, testing, and deployment without manual steps.','ai.aw.tag1':'Multi-agent','ai.aw.tag2':'Pipelines','ai.aw.tag3':'Orchestration',
    
    'certs.headline':'Unlocked Milestones',
    'certs.filter.all':'All','certs.filter.scholarship':'Scholarships','certs.filter.academic':'Academic','certs.filter.leadership':'Leadership','certs.filter.competitions':'Competitions','certs.filter.cultural':'Culture','certs.filter.language':'Languages',
    
    'footer.tagline':'Build systems. Level up life.','footer.cta':"Let\u2019s build \u2192",

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
    'project.process-game.name':'Process Game',
    'project.process-game.desc':'Make chemical engineering easier to understand through playful process simulations.',
    'project.samsung-camp.name':'Samsung Leadership Camp Simulator',
    'project.samsung-camp.desc':'Dream Forest Festival planner that optimizes 글로벌 and 대학 scholar animal groupings, then simulates 270 attendees exchanging name stickers.',

    'spec.badge':'★ Specializations',
    'spec.title':'What I Build & Why It Matters',
    'spec.subtitle':'Five domains. Five years of deliberate practice. One integrated story.',
    'spec.masteryLabel':'Mastery',
    'spec.liveLink':'Live',
    'spec.certsTitle':'Certificates',
    'spec.tab.linguist':'Linguist',
    'spec.tab.engineer':'Engineer',
    'spec.tab.builder':'Builder',
    'spec.tab.community':'Community',
    'spec.tab.scholar':'Scholar',
    'spec.linguist.name':'🌐 Linguist',
    'spec.linguist.stat1':'5 languages',
    'spec.linguist.stat2':'7 organizations',
    'spec.linguist.stat3':'Diplomatic-level',
    'spec.linguist.mastery':'90%',
    'spec.linguist.headline':'Official Korean–English–Malay interpreter — work covered by Yonhap News.',
    'spec.linguist.featuredTitle':'APEC Cooperation Dialogue',
    'spec.linguist.featuredDesc':'Interpreted the meeting between Gyeongbuk Governor Lee Cheol-woo and Malaysian Ambassador Mohd Zamruni bin Khalid on APEC 2025 Summit cooperation (Feb 18, 2025). Reported by Yonhap News and the Gyeongbuk provincial government.',
    'spec.linguist.featuredLinkLabel':'Yonhap News Article',
    'spec.linguist.item1.title':'Gyeongbuk Provincial Government',
    'spec.linguist.item1.desc':'Official interpreter for Malaysian Ambassador & Federal Territories Minister meetings (2025).',
    'spec.linguist.item2.title':'Supreme Prosecutors\' Office (Korea)',
    'spec.linguist.item2.desc':'Legal/cultural interpretation & translation (Nov–Dec 2023).',
    'spec.linguist.item3.title':'Anti-Corruption & Civil Rights Commission',
    'spec.linguist.item3.desc':'Financial/legal education interpretation for international trainees (Nov–Dec 2023).',
    'spec.linguist.item4.title':'Sogang University, OIA',
    'spec.linguist.item4.desc':'KO–EN & KO–ZH interpretation and document translation (Feb 2023–present).',
    'spec.linguist.item5.title':'Malaysian Embassy',
    'spec.linguist.item5.desc':'Medical interpretation & medical document translation (Feb–Aug 2022).',
    'spec.linguist.item6.title':'ASEZ',
    'spec.linguist.item6.desc':'Weekly multilingual interpretation on social/environmental safety (Oct 2023–present).',
    'spec.linguist.item7.title':'Incheon Airport Customs',
    'spec.linguist.item7.desc':'Korean–Malay consecutive interpretation for a narcotics suspect interrogation at Incheon Int\'l Airport T2 (June 2026).',
    'spec.engineer.name':'⚗️ Engineer',
    'spec.engineer.stat1':'2 majors',
    'spec.engineer.stat2':'TA ×3',
    'spec.engineer.stat3':'Sogang University',
    'spec.engineer.mastery':'75%',
    'spec.engineer.headline':'Chemical Engineering + Business dual degree, building tools that make process engineering tangible.',
    'spec.engineer.featuredTitle':'Reaction Simulator',
    'spec.engineer.featuredDesc':'Interactive CSTR/PFR reactor network simulator with Levenspiel plots, conversion & temperature profiles, thermal operating diagram, and dynamic response with disturbance injection. React + TypeScript + Recharts.',
    'spec.engineer.featuredLinkLabel':'Live',
    'spec.engineer.item6.title':'Fugacity Simulator',
    'spec.engineer.item6.desc':'Interactive thermodynamics tool plotting vapor/liquid fugacity vs. pressure — fugacity-coefficient integrals, zoom/pan, log-linear toggle, multi-temperature overlay. Vanilla JS + HTML5 Canvas.',
    'spec.engineer.item1.title':'Process Game',
    'spec.engineer.item1.desc':'Playful chemical-engineering process simulations (React, TypeScript, Canvas).',
    'spec.engineer.item2.title':'LP Diet Optimization',
    'spec.engineer.item2.desc':'Linear-programming weekly meal-plan optimizer with nutrition & budget constraints; binding-constraint analysis (Python + Solver).',
    'spec.engineer.item5.title':'Apple SCM Analysis',
    'spec.engineer.item5.desc':'13-slide interactive web presentation analyzing Apple\'s supply chain strategic misfit — Fisher (1997) framework, 5 vulnerabilities, bullwhip effect root causes, and 5 improvement strategies. (HTML/CSS/JS)',
    'spec.builder.name':'💻 Builder',
    'spec.builder.stat1':'5 yrs building',
    'spec.builder.stat2':'6 deployed',
    'spec.builder.stat3':'Full-stack + ML',
    'spec.builder.mastery':'80%',
    'spec.builder.headline':'Five years building. Six deployed systems across full-stack and ML.',
    'spec.builder.featuredTitle':'LifeOS',
    'spec.builder.featuredDesc':'Unified personal life-management platform (finance, health, habits, productivity). Next.js + Flask + PostgreSQL, event-driven architecture, LP macro optimizer, custom design system.',
    'spec.builder.featuredLinkLabel':'Live',
    'spec.builder.item1.title':'Personal Accounting System',
    'spec.builder.item1.desc':'Personal finance app built & maintained 5+ years (Python, Flask, PostgreSQL).',
    'spec.builder.item2.title':'Bullwhip Effect Simulator (SCM)',
    'spec.builder.item2.desc':'Supply-chain demand-shock simulator, 4-agent chain, inventory charting (Vanilla JS, Canvas).',
    'spec.builder.item3.title':'CNN Emotion Classifier',
    'spec.builder.item3.desc':'CNN trained from scratch on FER2013, 7-emotion classification with color-change visualization (Python, TensorFlow).',
    'spec.builder.item4.title':'House Price Regression',
    'spec.builder.item4.desc':'Multivariate regression, feature engineering, RMSE/R² evaluation, residual plots (Python, scikit-learn).',
    'spec.builder.item5.title':'Ollama Local AI Agent',
    'spec.builder.item5.desc':'Offline, privacy-first local LLM agent.',
    'spec.community.name':'🤝 Community',
    'spec.community.stat1':'150+ mentees',
    'spec.community.stat2':'7 leadership roles',
    'spec.community.stat3':'18 countries',
    'spec.community.mastery':'85%',
    'spec.community.headline':'150+ mentees over 4 semesters. Rebuilt PALS from informal knowledge into a constitutional organization.',
    'spec.community.featuredTitle':'PALS Co-President (2025)',
    'spec.community.featuredDesc':'International-student mentoring org. Came up as a mentee, then authored the club\'s first written constitution and a formal executive-transition system. Prior: Outstanding Mentor Award (2024-1), Mentor of the Semester (2024-2).',
    'spec.community.item1.title':'Samsung Dream Scholars President',
    'spec.community.item1.desc':'Led a 4-day camp for 210+ scholars (150+ Korean, 60+ global from 18 countries); reconciled conflicting Korean vs. global camp formats into one program.',
    'spec.community.item2.title':'SEA Study Club President (Samsung)',
    'spec.community.item2.desc':'Southeast-Asian scholar study community.',
    'spec.community.item3.title':'Event Host / Emcee',
    'spec.community.item3.desc':'7+ events incl. International Student Night, Sogang Alumni Scholarship Award Ceremony, Samsung Dream Forest Festival.',
    'spec.community.item4.title':'Didimol AI Curriculum (2025)',
    'spec.community.item4.desc':'Designed an age-appropriate neural-network/AI curriculum for 13-year-old mentees.',
    'spec.community.item5.title':'Rainbow Stepping Stone',
    'spec.community.item5.desc':'Refugee mentoring — supported a Myanmar student via Kolon Group\'s program.',
    'spec.community.item6.title':'Teaching Assistant ×3',
    'spec.community.item6.desc':'Office hours, grading, recitation sections (Spring 2026). Chemical Engineering, Sogang University.',
    'spec.scholar.name':'📊 Scholar',
    'spec.scholar.stat1':'Full Tuition',
    'spec.scholar.stat2':'7 scholarships',
    'spec.scholar.stat3':'4 institutions',
    'spec.scholar.mastery':'80%',
    'spec.scholar.headline':'7 scholarships across 4 institutions.',
    'spec.scholar.featuredTitle':'Samsung Dream Scholarship (Global Hope)',
    'spec.scholar.featuredDesc':'Competitively selected via school nomination + Samsung Foundation panel, across 5 semesters. Differentiators: TOPIK 6, deliberate Korean-language investment, dual degree.',
    'spec.scholar.featuredLinkLabel':'Samsung Webzine',
    'spec.scholar.item1.title':'Sogang 1st-Class Admission Scholarship',
    'spec.scholar.item1.desc':'Full tuition across 7 semesters.',
    'spec.scholar.item2.title':'Sogang Alumni Scholarship',
    'spec.scholar.item2.desc':'Recurring merit + campus-contribution award (4×).',
    'spec.scholar.item3.title':'Lee & Won Asian Fellowship',
    'spec.scholar.item3.desc':'Earned the Excellence Award (above completion tier).',
    'spec.scholar.item4.title':'Xiaohongshu Build Log',
    'spec.scholar.item4.desc':'Public consulting-pipeline content; top post: 336 likes / 215 saves / 18 comments.',
    'spec.scholar.item5.title':'Scholarship Writing System',
    'spec.scholar.item5.desc':'Framework/template product encoding the logic behind multiple winning applications.',
  },
  zh: {
    'nav.about':'个人资料','nav.specializations':'专业领域','nav.opinions':'笔记',
    
    'hero.name':'Taeyang Han',
    'hero.stat.languages':'语言',
    'hero.stat.languages.5':'5',
    'hero.stat.certificates':'证书',
    'hero.stat.certificates.30':'30+',
    'hero.stat.building':'建设',
    'hero.stat.building.5yrs':'5年',
    'hero.playerProfile':'玩家档案',
    'hero.greeting':'你好，我是',
    'hero.role.systemsBuilder':'系统建设者',
    'hero.role.languageExplorer':'语言探索者',
    'hero.role.lifeDesigner':'生活设计师',
    'hero.badge.building':'建设中',
    'hero.speech':'我构建有趣又实用的系统，帮助人们一步步学习、生活得更好，并追逐更大的目标。',
    'hero.startQuest':'开始任务',
    'hero.copyEmail':'复制邮箱',
    'hero.quests':'当前任务',
    'hero.quest.lifeos':'LifeOS',
    'hero.quest.lifeosDesc':'构建我的个人操作系统',
    'hero.quest.finance':'财务应用',
    'hero.quest.financeDesc':'学习财务，追踪，成长',
    'hero.quest.processGame':'过程游戏',
    'hero.quest.processGameDesc':'让化学工程变得有趣',
    'hero.quest.language':'语言学习',
    'hero.quest.languageDesc':'6种语言，一次冒险',
    'hero.quest.buildLog':'构建日志',
    'hero.quest.buildLogDesc':'记录整个过程',

    'projects.headline':'精选任务',
    'project.hero.label':'当前任务','project.status.In Development':'进行中','project.status.Active':'活跃','project.status.Completed':'已完成',

    'skills.headline':'角色能力值',
    'skills.group.languages':'核心能力','skills.group.frameworks':'构建引擎','skills.group.tools':'装备','skills.group.domains':'领域知识',
    'skills.tool.postgresql':'PostgreSQL','skills.tool.git':'Git','skills.tool.vercel':'Vercel','skills.tool.linux':'Linux',
    'skills.framework.nextjs':'Next.js','skills.framework.flask':'Flask','skills.framework.react':'React',
    'skills.language.python':'Python','skills.language.typescript':'TypeScript','skills.language.sql':'SQL','skills.language.html-css':'HTML/CSS','skills.language.javascript':'JavaScript',
    'skills.domain.systems-design':'系统设计','skills.domain.content-strategy':'内容策略','skills.domain.process-engineering':'流程工程','skills.domain.financial-modeling':'财务建模',

    'ai.headline':'我使用的工具',
    'ai.cc.badge':'CC','ai.cc.name':'Claude Code','ai.cc.desc':'具备完整代码库上下文的智能终端助手。用于架构决策、端到端功能开发及跨文件的复杂重构。','ai.cc.tag1':'智能编程','ai.cc.tag2':'架构','ai.cc.tag3':'终端',
    'ai.gc.badge':'GC','ai.gc.name':'GitHub Copilot','ai.gc.desc':'在 VS Code 中提供内联建议和多文件编辑。每日用于消除样板代码、快速原型开发和代码审查辅助。','ai.gc.tag1':'自动补全','ai.gc.tag2':'VS Code','ai.gc.tag3':'代码审查',
    'ai.cx.badge':'CX','ai.cx.name':'OpenAI Codex','ai.cx.desc':'通过 API 进行代码生成，用于脚本编写、数据管道构建及自动化重复开发任务，已集成到多个项目的自定义工具中。','ai.cx.tag1':'代码生成','ai.cx.tag2':'API','ai.cx.tag3':'自动化',
    'ai.aw.badge':'AW','ai.aw.name':'智能工作流','ai.aw.desc':'用于自主完成任务的多智能体流水线——将多个模型串联，实现从研究、实现、测试到部署的无人工干预全流程。','ai.aw.tag1':'多智能体','ai.aw.tag2':'流水线','ai.aw.tag3':'编排',
    
    'certs.headline':'解锁的里程碑',
    'certs.filter.all':'全部','certs.filter.scholarship':'奖学金','certs.filter.academic':'学术','certs.filter.leadership':'领导力','certs.filter.competitions':'竞赛','certs.filter.cultural':'文化','certs.filter.language':'语言',
    
    'footer.tagline':'构建系统，升级人生。','footer.cta':'一起构建 \u2192',

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
    'project.process-game.name':'过程游戏',
    'project.process-game.desc':'用有趣的过程模拟，让化学工程更容易理解。',
    'project.samsung-camp.name':'三星 Leadership Camp 模拟器',
    'project.samsung-camp.desc':'Dream Forest Festival 活动规划工具，优化 글로벌 与 대학 奖学生动物分组，并模拟270名参与者交换姓名贴纸。',

    'spec.badge':'★ 专业领域',
    'spec.title':'我的构建与意义',
    'spec.subtitle':'五大领域。五年专注实践。一个完整的故事。',
    'spec.masteryLabel':'掌握程度',
    'spec.liveLink':'在线演示',
    'spec.certsTitle':'证书',
    'spec.tab.linguist':'语言与翻译',
    'spec.tab.engineer':'工程师',
    'spec.tab.builder':'开发者',
    'spec.tab.community':'社区',
    'spec.tab.scholar':'学者',
    'spec.linguist.name':'🌐 语言与翻译',
    'spec.linguist.stat1':'5种语言',
    'spec.linguist.stat2':'7家机构',
    'spec.linguist.stat3':'外交级别',
    'spec.linguist.mastery':'90%',
    'spec.linguist.headline':'韩英马来语官方口译员——工作获韩联社报道。',
    'spec.linguist.featuredTitle':'APEC合作对话',
    'spec.linguist.featuredDesc':'2025年2月18日，担任庆北道知事李喆雨与马来西亚大使Mohd Zamruni bin Khalid就APEC 2025峰会合作会谈的口译员。获韩联社及庆北道官方报道。',
    'spec.linguist.featuredLinkLabel':'韩联社报道',
    'spec.linguist.item1.title':'庆尚北道道厅',
    'spec.linguist.item1.desc':'为马来西亚大使及联邦直辖区部长会议担任官方口译员（2025）。',
    'spec.linguist.item2.title':'韩国最高检察厅',
    'spec.linguist.item2.desc':'法律/文化口译与翻译（2023年11月—12月）。',
    'spec.linguist.item3.title':'反腐败和公民权利委员会',
    'spec.linguist.item3.desc':'为国际学员提供金融/法律教育口译（2023年11月—12月）。',
    'spec.linguist.item4.title':'西江大学国际处',
    'spec.linguist.item4.desc':'韩英、韩中口译及文件翻译（2023年2月至今）。',
    'spec.linguist.item5.title':'马来西亚大使馆',
    'spec.linguist.item5.desc':'医疗口译及医疗文件翻译（2022年2月—8月）。',
    'spec.linguist.item6.title':'ASEZ',
    'spec.linguist.item6.desc':'每周多语种口译，议题涉及社会和环境安全（2023年10月至今）。',
    'spec.linguist.item7.title':'仁川机场海关',
    'spec.linguist.item7.desc':'仁川国际机场T2，麻醉药品违规嫌疑人审讯韩马连续口译（2026年6月）。',
    'spec.engineer.name':'⚗️ 工程师',
    'spec.engineer.stat1':'双专业',
    'spec.engineer.stat2':'助教×3',
    'spec.engineer.stat3':'西江大学',
    'spec.engineer.mastery':'75%',
    'spec.engineer.headline':'化学工程+商学双学位，用工具让工程可视化。',
    'spec.engineer.featuredTitle':'反应器模拟器',
    'spec.engineer.featuredDesc':'交互式 CSTR/PFR 反应器网络模拟器，含 Levenspiel 图、转化率与温度分布、热操作线图以及带扰动注入的动态响应。React + TypeScript + Recharts。',
    'spec.engineer.featuredLinkLabel':'在线演示',
    'spec.engineer.item6.title':'逸度模拟器',
    'spec.engineer.item6.desc':'交互式热力学工具，绘制气/液逸度与压力关系图（实现逸度系数积分），支持缩放、对数/线性轴切换、多温度叠加。原生JS + HTML5 Canvas。',
    'spec.engineer.item1.title':'过程游戏',
    'spec.engineer.item1.desc':'用趣味流程模拟让化学工程变得易懂（React, TypeScript, Canvas）。',
    'spec.engineer.item2.title':'LP饮食优化模型',
    'spec.engineer.item2.desc':'带营养和预算约束的线性规划周餐计划优化器；约束绑定分析（Python + Solver）。',
    'spec.engineer.item5.title':'苹果供应链分析',
    'spec.engineer.item5.desc':'13页交互式网页演示，基于 Fisher (1997) 框架分析苹果供应链战略错配——5大脆弱点、牛鞭效应根因及5项改进方案。（HTML/CSS/JS）',
    'spec.builder.name':'💻 开发者',
    'spec.builder.stat1':'5年开发经验',
    'spec.builder.stat2':'6个已部署',
    'spec.builder.stat3':'全栈 + ML',
    'spec.builder.mastery':'80%',
    'spec.builder.headline':'五年构建经验，六个已上线系统，涵盖全栈与机器学习。',
    'spec.builder.featuredTitle':'LifeOS',
    'spec.builder.featuredDesc':'统一个人生活管理平台（财务、健康、习惯、效率）。Next.js + Flask + PostgreSQL，事件驱动架构，LP宏观优化器，自定义设计系统。',
    'spec.builder.featuredLinkLabel':'在线演示',
    'spec.builder.item1.title':'个人记账系统',
    'spec.builder.item1.desc':'从零构建并维护5年以上的个人财务应用（Python, Flask, PostgreSQL）。',
    'spec.builder.item2.title':'牛鞭效应模拟器（供应链）',
    'spec.builder.item2.desc':'供应链需求冲击模拟器，4层主体链，库存图表（原生JS, Canvas）。',
    'spec.builder.item3.title':'CNN情绪分类器',
    'spec.builder.item3.desc':'基于FER2013从零训练的CNN，7类情绪分类，带颜色变化可视化（Python, TensorFlow）。',
    'spec.builder.item4.title':'房价回归模型',
    'spec.builder.item4.desc':'多变量回归，特征工程，RMSE/R²评估，残差图（Python, scikit-learn）。',
    'spec.builder.item5.title':'Ollama本地AI代理',
    'spec.builder.item5.desc':'离线、注重隐私的本地大语言模型代理。',
    'spec.community.name':'🤝 社区',
    'spec.community.stat1':'150+名学员',
    'spec.community.stat2':'7个领导职务',
    'spec.community.stat3':'18个国家',
    'spec.community.mastery':'85%',
    'spec.community.headline':'4个学期150+名学员。将PALS从非正式知识型组织重建为有章程的正规组织。',
    'spec.community.featuredTitle':'PALS联合会长（2025）',
    'spec.community.featuredDesc':'国际生辅导组织。从学员成长为领导者，主导撰写俱乐部首份书面章程和正式交接制度。此前荣获优秀导师奖（2024-1）、学期最佳导师（2024-2）。',
    'spec.community.item1.title':'三星梦想奖学金学生会长',
    'spec.community.item1.desc':'主导为210+名学者（150+韩国人，60+来自18国的全球学者）举办4天营地；协调韩国与全球不同营地文化形成统一方案。',
    'spec.community.item2.title':'东南亚学习圈会长（三星）',
    'spec.community.item2.desc':'三星奖学金东南亚学者学习社区。',
    'spec.community.item3.title':'活动主持人/司仪',
    'spec.community.item3.desc':'主持7+场活动，包括国际生之夜、西江校友奖学金颁奖典礼、三星Dream Forest节。',
    'spec.community.item4.title':'Didimol AI课程（2025）',
    'spec.community.item4.desc':'为13岁学员设计适龄的神经网络/AI课程。',
    'spec.community.item5.title':'Rainbow Stepping Stone',
    'spec.community.item5.desc':'难民辅导——通过Kolon集团项目支持一名缅甸学生。',
    'spec.community.item6.title':'助教×3',
    'spec.community.item6.desc':'答疑课、批改作业、习题课（2026年春季）。化学工程，西江大学。',
    'spec.scholar.name':'📊 学者',
    'spec.scholar.stat1':'全额学费',
    'spec.scholar.stat2':'7个奖学金',
    'spec.scholar.stat3':'4所机构',
    'spec.scholar.mastery':'80%',
    'spec.scholar.headline':'7项奖学金，来自4所机构。',
    'spec.scholar.featuredTitle':'三星梦想奖学金（全球希望）',
    'spec.scholar.featuredDesc':'经学校提名+三星基金会评审团竞争选拔，共5学期。核心优势：TOPIK 6、系统性韩语投入、双学位。',
    'spec.scholar.featuredLinkLabel':'三星网刊',
    'spec.scholar.item1.title':'西江大学一等入学奖学金',
    'spec.scholar.item1.desc':'全额学费，共7学期。',
    'spec.scholar.item2.title':'西江校友奖学金',
    'spec.scholar.item2.desc':'每学期择优+贡献奖励（共4次）。',
    'spec.scholar.item3.title':'Lee & Won亚洲奖学金',
    'spec.scholar.item3.desc':'荣获卓越奖（高于基础完成等级）。',
    'spec.scholar.item4.title':'小红书开发日志',
    'spec.scholar.item4.desc':'公开咨询引流内容；最高赞帖：336赞/215收藏/18评论。',
    'spec.scholar.item5.title':'奖学金申请写作系统',
    'spec.scholar.item5.desc':'将多次成功申请背后的逻辑提炼为框架/模板产品。',
  },
  ko: {
    'nav.about':'프로필','nav.specializations':'전문 분야','nav.opinions':'현장 노트',

    'hero.name':'Taeyang Han',
    'hero.stat.languages':'언어',
    'hero.stat.languages.5':'5',
    'hero.stat.certificates':'증서',
    'hero.stat.certificates.30':'30+',
    'hero.stat.building':'개발 연수',
    'hero.stat.building.5yrs':'5년',
    'hero.playerProfile':'캐릭터 프로필',
    'hero.greeting':'안녕하세요, 저는',
    'hero.role.systemsBuilder':'시스템 빌더',
    'hero.role.languageExplorer':'다국어',
    'hero.role.lifeDesigner':'라이프 디자이너',
    'hero.badge.building':'개발중',
    'hero.speech':'저는 사람들을 배우고 더 나은 삶을 살고 큰 목표를 추구할 수 있도록 재미있는 시스템을 만듭니다.',
    'hero.startQuest':'퀘스트 시작',
    'hero.copyEmail':'이메일 복사',
    'hero.quests':'현재 퀘스트',
    'hero.quest.lifeos':'LifeOS',
    'hero.quest.lifeosDesc':'나만의 개인 운영체제 구축',
    'hero.quest.finance':'재무 앱',
    'hero.quest.financeDesc':'재무 학습. 추적. 성장.',
    'hero.quest.processGame':'프로세스 게임',
    'hero.quest.processGameDesc':'화학공학을 재미있게',
    'hero.quest.language':'언어 학습',
    'hero.quest.languageDesc':'6개 언어. 세상을 연결하다',
    'hero.quest.buildLog':'빌드 로그',
    'hero.quest.buildLogDesc':'과정을 기록하다',

    'projects.headline':'주요 퀘스트',
    'project.hero.label':'진행중 퀘스트','project.status.In Development':'개발중','project.status.Active':'액티브','project.status.Completed':'완료',

    'skills.headline':'캐릭터 스탯',
    'skills.group.languages':'핵심 스탯','skills.group.frameworks':'빌드 엔진','skills.group.tools':'장비','skills.group.domains':'도메인 지식',
    'skills.tool.postgresql':'PostgreSQL','skills.tool.git':'Git','skills.tool.vercel':'Vercel','skills.tool.linux':'Linux',
    'skills.framework.nextjs':'Next.js','skills.framework.flask':'Flask','skills.framework.react':'React',
    'skills.language.python':'Python','skills.language.typescript':'TypeScript','skills.language.sql':'SQL','skills.language.html-css':'HTML/CSS','skills.language.javascript':'JavaScript',
    'skills.domain.systems-design':'시스템 설계','skills.domain.content-strategy':'콘텐츠 전략','skills.domain.process-engineering':'공정 엔지니어링','skills.domain.financial-modeling':'재무 모델링',

    'ai.headline':'내가 사용하는 도구',
    'ai.cc.badge':'CC','ai.cc.name':'Claude Code','ai.cc.desc':'전체 코드베이스 컨텍스트를 갖춘 에이전틱 터미널 어시스턴트. 아키텍처 결정, 엔드투엔드 기능 개발, 다중 파일 복잡 리팩토링에 활용.','ai.cc.tag1':'에이전틱 코딩','ai.cc.tag2':'아키텍처','ai.cc.tag3':'터미널',
    'ai.gc.badge':'GC','ai.gc.name':'GitHub Copilot','ai.gc.desc':'VS Code에서 인라인 제안 및 다중 파일 편집. 보일러플레이트 제거, 빠른 프로토타이핑, 코드 리뷰 보조에 매일 사용.','ai.gc.tag1':'자동완성','ai.gc.tag2':'VS Code','ai.gc.tag3':'코드 리뷰',
    'ai.cx.badge':'CX','ai.cx.name':'OpenAI Codex','ai.cx.desc':'스크립트, 데이터 파이프라인 및 반복 개발 작업 자동화를 위한 API 기반 코드 생성. 여러 프로젝트의 커스텀 툴링에 통합.','ai.cx.tag1':'코드 생성','ai.cx.tag2':'API','ai.cx.tag3':'자동화',
    'ai.aw.badge':'AW','ai.aw.name':'에이전틱 워크플로우','ai.aw.desc':'자율 작업 완료를 위한 멀티 에이전트 파이프라인 — 모델을 연결해 연구, 구현, 테스트, 배포를 수동 개입 없이 처리.','ai.aw.tag1':'멀티 에이전트','ai.aw.tag2':'파이프라인','ai.aw.tag3':'오케스트레이션',

    'certs.headline':'달성한 마일스톤',
    'certs.filter.all':'전체','certs.filter.scholarship':'장학금','certs.filter.academic':'학술','certs.filter.leadership':'리더십','certs.filter.competitions':'대회','certs.filter.cultural':'문화','certs.filter.language':'언어',

    'footer.tagline':'시스템을 구축하고, 삶을 레벨업합니다.','footer.cta':'함께 만들어요 \u2192',

    'project.lifeos.name':'LifeOS',
    'project.lifeos.desc':'재무, 건강, 습관, 생산성을 아우르는 통합 개인 생활 관리 플랫폼.',
    'project.lifeos.h1':'6개 통합 생활 도메인','project.lifeos.h2':'LP 매크로 최적화기','project.lifeos.h3':'이벤트 기반 아키텍처','project.lifeos.h4':'커스텀 디자인 시스템',
    'project.fugacity.name':'퓨가시티 시뮬레이터',
    'project.fugacity.desc':'수증기표 데이터를 기반으로 기상, 액상, 포화 영역에서의 압력에 따른 퓨가시티 및 퓨가시티 계수를 시각화하는 인터랙티브 열역학 시뮬레이터.',
    'project.xiaohongshu.name':'샤오홍슈 빌드 로그',
    'project.xiaohongshu.desc':'제품 반복 과정과 실행 흐름을 공개적으로 기록하는 계정.',
    'project.accounting.name':'개인 회계 시스템',
    'project.accounting.desc':'2021년부터 처음부터 구축한 완전한 개인 회계 시스템 — 첫 번째 프로젝트로 5년 이상 지속적으로 유지보수.',
    'project.scm.name':'채찍 효과 시뮬레이터',
    'project.scm.desc':'소규모 하류 수요 충격이 어떻게 대규모 상류 주문 변동(채찍 효과)으로 증폭되는지를 보여주는 브라우저 기반 공급망 시뮬레이터.',
    'project.scm.h1':'4단계 주체 체인 (소매상, 유통업자, 제조업자, 공급업자)','project.scm.h2':'카오스 수요 충격 테스트','project.scm.h3':'재고/주문/적체 차트','project.scm.h4':'이벤트 타임라인 및 시뮬레이션 인사이트',
    'project.process-game.name':'프로세스 게임',
    'project.process-game.desc':'재미있는 공정 시뮬레이션으로 화학공학을 쉽게 이해할 수 있게 만드는 게임.',
    'project.samsung-camp.name':'삼성 리더십 캠프 시뮬레이터',
    'project.samsung-camp.desc':'Dream Forest Festival 기획 도구로, 글로벌 및 대학 장학생 동물 그룹을 최적화하고 270명 참가자의 명찰 스티커 교환을 시뮬레이션합니다.',

    'spec.badge':'★ 전문 분야',
    'spec.title':'내가 만드는 것과 그 이유',
    'spec.subtitle':'다섯 분야. 5년의 집중적인 실천. 하나의 통합된 이야기.',
    'spec.masteryLabel':'숙련도',
    'spec.liveLink':'라이브',
    'spec.certsTitle':'증서',
    'spec.tab.linguist':'통역사',
    'spec.tab.engineer':'엔지니어',
    'spec.tab.builder':'개발자',
    'spec.tab.community':'커뮤니티',
    'spec.tab.scholar':'학자',
    'spec.linguist.name':'🌐 통역사',
    'spec.linguist.stat1':'5개 언어',
    'spec.linguist.stat2':'7개 기관',
    'spec.linguist.stat3':'외교급',
    'spec.linguist.mastery':'90%',
    'spec.linguist.headline':'한·영·말레이어 공식 통역사 — 연합뉴스 보도.',
    'spec.linguist.featuredTitle':'APEC 협력 대화',
    'spec.linguist.featuredDesc':'2025년 2월 18일, APEC 2025 정상회의 협력을 주제로 한 이철우 경북도지사와 모흐드 잠루니 말레이시아 대사 간 회의를 통역했습니다. 연합뉴스 및 경북도 공식 보도.',
    'spec.linguist.featuredLinkLabel':'연합뉴스 기사',
    'spec.linguist.item1.title':'경상북도청',
    'spec.linguist.item1.desc':'말레이시아 대사 및 연방직할구역 장관 회의 공식 통역 (2025).',
    'spec.linguist.item2.title':'대검찰청',
    'spec.linguist.item2.desc':'한·말·영 법률/문화 통역 및 번역 (2023년 11–12월).',
    'spec.linguist.item3.title':'국민권익위원회',
    'spec.linguist.item3.desc':'외국인 연수생 대상 금융/법률 교육 통역 (2023년 11–12월).',
    'spec.linguist.item4.title':'서강대학교 국제처',
    'spec.linguist.item4.desc':'한·영, 한·중 통역 및 문서 번역 (2023년 2월–현재).',
    'spec.linguist.item5.title':'주한 말레이시아 대사관',
    'spec.linguist.item5.desc':'의료 통역 및 의료 문서 번역 (2022년 2–8월).',
    'spec.linguist.item6.title':'ASEZ',
    'spec.linguist.item6.desc':'사회·환경 안전 주제 주간 다국어 통역 (2023년 10월–현재).',
    'spec.linguist.item7.title':'인천공항세관',
    'spec.linguist.item7.desc':'마약류 위반 피의자 신문 한·말 순차통역, 인천국제공항 제2여객터미널 (2026년 6월).',
    'spec.engineer.name':'⚗️ 엔지니어',
    'spec.engineer.stat1':'복수전공 2개',
    'spec.engineer.stat2':'조교 ×3',
    'spec.engineer.stat3':'서강대학교',
    'spec.engineer.mastery':'75%',
    'spec.engineer.headline':'화학공학 + 경영학 복수전공, 공학을 시각화하는 도구를 만들다.',
    'spec.engineer.featuredTitle':'반응기 시뮬레이터',
    'spec.engineer.featuredDesc':'대화형 CSTR/PFR 반응기 네트워크 시뮬레이터 — Levenspiel 플롯, 전환율·온도 프로파일, 열 운전선도, 외란 주입이 포함된 동적 응답. React + TypeScript + Recharts.',
    'spec.engineer.featuredLinkLabel':'라이브',
    'spec.engineer.item6.title':'퓨가시티 시뮬레이터',
    'spec.engineer.item6.desc':'기/액상 퓨가시티 대 압력 그래프를 그리는 인터랙티브 열역학 도구(퓨가시티 계수 적분 구현), 확대/축소, 로그-선형 전환, 다중 온도 오버레이. Vanilla JS + HTML5 Canvas.',
    'spec.engineer.item1.title':'프로세스 게임',
    'spec.engineer.item1.desc':'재미있는 공정 시뮬레이션으로 화학공학을 쉽게 (React, TypeScript, Canvas).',
    'spec.engineer.item2.title':'LP 식단 최적화 모델',
    'spec.engineer.item2.desc':'영양·예산 제약 조건이 있는 선형계획 주간 식단 최적화; 제약 분석 (Python + Solver).',
    'spec.engineer.item5.title':'Apple 공급망 분석',
    'spec.engineer.item5.desc':'Fisher (1997) 프레임워크 기반 Apple 공급망 전략적 미스핏 분석 — 5대 취약점, 채찍 효과 원인, 5가지 개선 방안을 담은 13슬라이드 인터랙티브 웹 프레젠테이션. (HTML/CSS/JS)',
    'spec.builder.name':'💻 개발자',
    'spec.builder.stat1':'5년 개발',
    'spec.builder.stat2':'6개 배포',
    'spec.builder.stat3':'풀스택 + ML',
    'spec.builder.mastery':'80%',
    'spec.builder.headline':'5년 빌딩. 풀스택과 ML을 아우르는 6개 배포 시스템.',
    'spec.builder.featuredTitle':'LifeOS',
    'spec.builder.featuredDesc':'재무·건강·습관·생산성을 아우르는 통합 개인 생활 관리 플랫폼. Next.js + Flask + PostgreSQL, 이벤트 기반 아키텍처, LP 매크로 최적화기, 커스텀 디자인 시스템.',
    'spec.builder.featuredLinkLabel':'라이브',
    'spec.builder.item1.title':'개인 회계 시스템',
    'spec.builder.item1.desc':'5년 이상 직접 구축·유지보수한 개인 재무 앱 (Python, Flask, PostgreSQL).',
    'spec.builder.item2.title':'채찍 효과 시뮬레이터 (SCM)',
    'spec.builder.item2.desc':'공급망 수요 충격 시뮬레이터, 4단계 주체 체인, 재고 차트 (Vanilla JS, Canvas).',
    'spec.builder.item3.title':'CNN 감정 분류기',
    'spec.builder.item3.desc':'FER2013으로 처음부터 학습한 CNN, 7가지 감정 분류, 색상 변화 시각화 (Python, TensorFlow).',
    'spec.builder.item4.title':'주택 가격 회귀 모델',
    'spec.builder.item4.desc':'다변량 회귀, 특성 공학, RMSE/R² 평가, 잔차 시각화 (Python, scikit-learn).',
    'spec.builder.item5.title':'Ollama 로컬 AI 에이전트',
    'spec.builder.item5.desc':'오프라인, 프라이버시 중심 로컬 LLM 에이전트.',
    'spec.community.name':'🤝 커뮤니티',
    'spec.community.stat1':'150명+ 멘티',
    'spec.community.stat2':'7개 리더십 역할',
    'spec.community.stat3':'18개국',
    'spec.community.mastery':'85%',
    'spec.community.headline':'4학기 150명+ 멘티. PALS를 비공식 조직에서 회칙 기반 조직으로 재건.',
    'spec.community.featuredTitle':'PALS 공동 회장 (2025)',
    'spec.community.featuredDesc':'국제학생 멘토링 단체. 멘티로 시작해 클럽 최초의 서면 회칙과 공식 임원 인수인계 시스템을 만들었습니다. 수상: 우수 멘토 활동상 (2024-1), 학기 최우수 멘토 (2024-2).',
    'spec.community.item1.title':'삼성 꿈장학생 회장',
    'spec.community.item1.desc':'210명+ 장학생(한국인 150명+, 18개국 글로벌 60명+) 4일 캠프 기획·운영; 한국식·글로벌식 캠프 문화 조율.',
    'spec.community.item2.title':'SEA 스터디 클럽 회장 (삼성)',
    'spec.community.item2.desc':'삼성 장학생 동남아시아 학습 커뮤니티.',
    'spec.community.item3.title':'행사 진행자 / MC',
    'spec.community.item3.desc':'국제학생의 밤, 서강 동문장학금 시상식, 삼성 Dream Forest Festival 등 7회+ 진행.',
    'spec.community.item4.title':'Didimol AI 커리큘럼 (2025)',
    'spec.community.item4.desc':'13세 멘티를 위한 연령 맞춤 신경망/AI 커리큘럼 설계.',
    'spec.community.item5.title':'Rainbow Stepping Stone',
    'spec.community.item5.desc':'난민 멘토링 — Kolon 그룹 프로그램을 통해 미얀마 학생 1명 지원.',
    'spec.community.item6.title':'조교 ×3',
    'spec.community.item6.desc':'오피스 아워, 채점, 보충 수업 (2026년 봄학기). 화학공학과, 서강대학교.',
    'spec.scholar.name':'📊 학자',
    'spec.scholar.stat1':'전액 장학금',
    'spec.scholar.stat2':'7개 장학금',
    'spec.scholar.stat3':'4개 기관',
    'spec.scholar.mastery':'80%',
    'spec.scholar.headline':'4개 기관에서 7개 장학금 수상.',
    'spec.scholar.featuredTitle':'삼성 꿈장학금 (글로벌 희망)',
    'spec.scholar.featuredDesc':'학교 추천 + 삼성재단 심사를 통해 경쟁 선발, 5학기 연속 수혜. 차별점: TOPIK 6, 의도적인 한국어 투자, 복수전공.',
    'spec.scholar.featuredLinkLabel':'삼성 웹진',
    'spec.scholar.item1.title':'서강대 1등 입학 장학금',
    'spec.scholar.item1.desc':'7학기 전액 장학금.',
    'spec.scholar.item2.title':'서강 동문 장학금',
    'spec.scholar.item2.desc':'학기별 공로 + 기여도 기반 반복 수상 (4회).',
    'spec.scholar.item3.title':'Lee & Won 아시아 펠로십',
    'spec.scholar.item3.desc':'우수상 수상 (기본 이수 등급 이상).',
    'spec.scholar.item4.title':'샤오홍슈 빌드 로그',
    'spec.scholar.item4.desc':'공개 컨설팅 파이프라인 콘텐츠; 최고 성과 게시물: 336좋아요 / 215저장 / 18댓글.',
    'spec.scholar.item5.title':'장학금 신청 작성 시스템',
    'spec.scholar.item5.desc':'여러 번의 합격 경험을 바탕으로 프레임워크/템플릿 제품으로 정제.',
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
  document.documentElement.lang = currentLang === 'ko' ? 'ko' : currentLang === 'zh' ? 'zh' : 'en';
}



/* ═══════════════════════════════════════════════
    3a. DATA — SPECIALIZATIONS
    ═══════════════════════════════════════════════ */
const SPECIALIZATIONS = [
  {
    id: 'linguist',
    icon: '🌐',
    accent: 'sky',
    mastery: 90,
    featuredUrl: 'https://www.yna.co.kr/view/AKR20250218100300053',
    featuredLinkKey: 'spec.linguist.featuredLinkLabel',
    secondary: [
      { titleKey: 'spec.linguist.item1.title', descKey: 'spec.linguist.item1.desc' },
      { titleKey: 'spec.linguist.item2.title', descKey: 'spec.linguist.item2.desc' },
      { titleKey: 'spec.linguist.item3.title', descKey: 'spec.linguist.item3.desc' },
      { titleKey: 'spec.linguist.item4.title', descKey: 'spec.linguist.item4.desc' },
      { titleKey: 'spec.linguist.item5.title', descKey: 'spec.linguist.item5.desc' },
      { titleKey: 'spec.linguist.item6.title', descKey: 'spec.linguist.item6.desc' },
      { titleKey: 'spec.linguist.item7.title', descKey: 'spec.linguist.item7.desc' }
    ],
    certs: [
      { filename: '20241_TOPIK_scorecard', name: 'TOPIK 6 Scorecard (265/300)', icon: '📜' },
      { filename: '20261_BLCU_transcript', name: 'BLCU Transcript', icon: '🎓' }
    ]
  },
  {
    id: 'engineer',
    icon: '⚗️',
    accent: 'coral',
    mastery: 75,
    featuredUrl: 'https://reactionsimulator.vercel.app',
    featuredLinkKey: 'spec.engineer.featuredLinkLabel',
    secondary: [
      { titleKey: 'spec.engineer.item6.title', descKey: 'spec.engineer.item6.desc', link: 'https://fugacity-simulator.vercel.app', status: 'Completed' },
      { titleKey: 'spec.engineer.item1.title', descKey: 'spec.engineer.item1.desc', link: 'https://process-design.vercel.app', status: 'In Development' },
      { titleKey: 'spec.engineer.item2.title', descKey: 'spec.engineer.item2.desc' },
      { titleKey: 'spec.engineer.item5.title', descKey: 'spec.engineer.item5.desc', link: 'https://apple-scm-web.vercel.app' }
    ],
    certs: [
      { filename: '20261_enrollment_cert', name: 'Sogang University Enrollment', icon: '🏫' }
    ]
  },
  {
    id: 'builder',
    icon: '💻',
    accent: 'mint',
    mastery: 80,
    featuredUrl: 'https://lifeos-wine.vercel.app',
    featuredLinkKey: 'spec.builder.featuredLinkLabel',
    secondary: [
      { titleKey: 'spec.builder.item1.title', descKey: 'spec.builder.item1.desc', link: 'https://finance-app-private-alpha.fly.dev' },
      { titleKey: 'spec.builder.item2.title', descKey: 'spec.builder.item2.desc', link: 'https://scmsimulator.vercel.app' },
      { titleKey: 'spec.builder.item3.title', descKey: 'spec.builder.item3.desc' },
      { titleKey: 'spec.builder.item4.title', descKey: 'spec.builder.item4.desc' },
      { titleKey: 'spec.builder.item5.title', descKey: 'spec.builder.item5.desc' }
    ],
    certs: []
  },
  {
    id: 'community',
    icon: '🤝',
    accent: 'purple',
    mastery: 85,
    featuredUrl: null,
    featuredLinkKey: null,
    secondary: [
      { titleKey: 'spec.community.item1.title', descKey: 'spec.community.item1.desc' },
      { titleKey: 'spec.community.item2.title', descKey: 'spec.community.item2.desc' },
      { titleKey: 'spec.community.item3.title', descKey: 'spec.community.item3.desc' },
      { titleKey: 'spec.community.item4.title', descKey: 'spec.community.item4.desc' },
      { titleKey: 'spec.community.item5.title', descKey: 'spec.community.item5.desc' },
      { titleKey: 'spec.community.item6.title', descKey: 'spec.community.item6.desc' }
    ],
    certs: [
      { filename: '20241_PALS_excellence_eng', name: 'PALS Outstanding Mentor Award (2024-1)', icon: '🏆' },
      { filename: '20242_PALS_excellence', name: 'PALS Mentor of the Semester (2024-2)', icon: '🏆' },
      { filename: '20251_PALS_president', name: 'PALS President (2025-1)', icon: '📋' },
      { filename: '20252_PALS_president_ENG', name: 'PALS President (2025-2)', icon: '📋' },
      { filename: '20251_stepping_stone_mentoring', name: 'Stepping Stone Mentoring (2025-1)', icon: '🤝' }
    ]
  },
  {
    id: 'scholar',
    icon: '📊',
    accent: 'sunshine',
    mastery: 80,
    featuredUrl: 'https://webzine.sdream.or.kr/webzin/webzine96/sub1_4.html',
    featuredLinkKey: 'spec.scholar.featuredLinkLabel',
    secondary: [
      { titleKey: 'spec.scholar.item1.title', descKey: 'spec.scholar.item1.desc' },
      { titleKey: 'spec.scholar.item2.title', descKey: 'spec.scholar.item2.desc' },
      { titleKey: 'spec.scholar.item3.title', descKey: 'spec.scholar.item3.desc' },
      { titleKey: 'spec.scholar.item4.title', descKey: 'spec.scholar.item4.desc', link: 'https://xhslink.com/m/6pTVib4GbZU' },
      { titleKey: 'spec.scholar.item5.title', descKey: 'spec.scholar.item5.desc' }
    ],
    certs: [
      { filename: '20241_samsung_scholarship', name: 'Samsung Dream Scholarship (2024-1)', icon: '⭐' },
      { filename: '20231_Admission_Scholarship_1', name: '1st Class Admission Scholarship', icon: '🎓' },
      { filename: '20232_lee-won_fellowship_excellence', name: 'Lee & Won — Excellence Award', icon: '🌟' },
      { filename: '20261_sogang_alumni_scholarship_4', name: 'Sogang Alumni Scholarship (2026-1)', icon: '📜' },
      { filename: '20252_sogang_alumni_scholarship_3', name: 'Sogang Alumni Scholarship (2025-2)', icon: '📜' }
    ]
  }
];

/* ═══════════════════════════════════════════════
    3b. RENDER SPECIALIZATIONS
    ═══════════════════════════════════════════════ */
function renderSpecializations() {
  const container = document.getElementById('specs-panels');
  if (!container) return;
  container.innerHTML = '';

  SPECIALIZATIONS.forEach(spec => {
    const panel = document.createElement('div');
    panel.className = `specs__panel specs__panel--${spec.accent} reveal`;
    panel.id = spec.id;

    const statKeys = ['stat1', 'stat2', 'stat3'];
    const statsHtml = statKeys.map(k =>
      `<span class="specs__stat" data-i18n="spec.${spec.id}.${k}">${t(`spec.${spec.id}.${k}`)}</span>`
    ).join('');

    const masteryKey = `spec.${spec.id}.mastery`;
    const masteryPct = t(masteryKey);

    const featuredLinkHtml = spec.featuredUrl
      ? `<a class="specs__featured-link" href="${spec.featuredUrl}" target="_blank" rel="noopener" data-i18n="${spec.featuredLinkKey}">${t(spec.featuredLinkKey)} ↗</a>`
      : '';

    const secondaryHtml = spec.secondary.map((item, i) => {
      const statusHtml = item.status
        ? `<span class="pill pill--status pill--status--in-development" data-i18n="project.status.${item.status}">${t('project.status.' + item.status)}</span>`
        : '';
      const linkHtml = item.link
        ? `<a class="specs__secondary-link" href="${item.link}" target="_blank" rel="noopener"><span data-i18n="spec.liveLink">${t('spec.liveLink')}</span> ↗</a>`
        : '';
      return `
        <div class="specs__secondary-card">
          <h4 class="specs__secondary-title" data-i18n="${item.titleKey}">${t(item.titleKey)}</h4>
          <p class="specs__secondary-desc" data-i18n="${item.descKey}">${t(item.descKey)}</p>
          ${linkHtml}
          ${statusHtml ? `<div class="specs__secondary-meta">${statusHtml}</div>` : ''}
        </div>`;
    }).join('');

    const certsHtml = spec.certs.length > 0 ? `
      <div class="specs__certs">
        <p class="specs__certs-title">📜 <span data-i18n="spec.certsTitle">${t('spec.certsTitle')}</span></p>
        <div class="specs__certs-strip">
          ${spec.certs.map(c => `
            <div class="specs__cert-thumb" data-cert="${c.filename}" data-cert-name="${c.name}">
              <div class="specs__cert-placeholder" style="background: var(--bg-primary); border-color: var(--${spec.accent});">
                <img src="assets/certs/${c.filename}.jpg" alt="${c.name}" data-cert="${c.filename}" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='${c.icon}';" style="display:none">
                <span aria-hidden="true">${c.icon}</span>
              </div>
              <span class="specs__cert-caption">${c.name}</span>
            </div>
          `).join('')}
        </div>
      </div>` : '';

    panel.innerHTML = `
      <div class="specs__panel-header">
        <h3 class="specs__panel-name" data-i18n="spec.${spec.id}.name">${t(`spec.${spec.id}.name`)}</h3>
        <div class="specs__stats">${statsHtml}</div>
      </div>
      <div class="specs__mastery">
        <span class="specs__mastery-label"><span data-i18n="spec.masteryLabel">${t('spec.masteryLabel')}</span></span>
        <div class="progress">
          <div class="progress__fill progress__fill--${spec.accent}" style="width:${spec.mastery}%"></div>
        </div>
        <span class="specs__mastery-pct" data-i18n="${masteryKey}">${masteryPct}</span>
      </div>
      <div class="specs__headline" data-i18n="spec.${spec.id}.headline">${t(`spec.${spec.id}.headline`)}</div>
      <div class="specs__featured specs__featured--${spec.accent}">
        <h4 class="specs__featured-title" data-i18n="spec.${spec.id}.featuredTitle">${t(`spec.${spec.id}.featuredTitle`)}</h4>
        <p class="specs__featured-desc" data-i18n="spec.${spec.id}.featuredDesc">${t(`spec.${spec.id}.featuredDesc`)}</p>
        ${featuredLinkHtml}
      </div>
      <div class="specs__secondary">${secondaryHtml}</div>
      ${certsHtml}
    `;

    container.appendChild(panel);
  });
}

/* ═══════════════════════════════════════════════
    3c. INIT SPECIALIZATION TABS
    ═══════════════════════════════════════════════ */
function initSpecTabs() {
  const tabs = document.querySelectorAll('.specs__tab');
  const panels = document.querySelectorAll('.specs__panel');
  const specsSection = document.getElementById('specializations');
  if (!tabs.length || !panels.length || !specsSection) return;

  function setActiveTab(panelId) {
    tabs.forEach(t => {
      const isActive = t.dataset.panel === panelId;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function activateFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = SPECIALIZATIONS.find(s => s.id === hash);
      if (match) setActiveTab(hash);
    }
  }

  activateFromHash();

  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      const panelId = tab.dataset.panel;
      const target = document.getElementById(panelId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + panelId);
        setActiveTab(panelId);
      }
    });
  });

  window.addEventListener('hashchange', activateFromHash);

  const panelObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveTab(e.target.id);
    });
  }, { threshold: 0.2, rootMargin: '-120px 0px -40% 0px' });

  panels.forEach(p => panelObserver.observe(p));
}

/* ═══════════════════════════════════════════════
    3d. INIT SPEC CERT LIGHTBOX
    ═══════════════════════════════════════════════ */
function initSpecCertLightbox() {
  const lb = document.getElementById('certificate-lightbox');
  const img = document.getElementById('certificate-lightbox-image');
  const caption = document.getElementById('certificate-lightbox-caption');
  if (!lb || !img || !caption) return;

  const panelsEl = document.getElementById('specs-panels');
  if (!panelsEl) return;

  panelsEl.addEventListener('click', e => {
    const thumb = e.target.closest('.specs__cert-thumb');
    if (!thumb) return;
    const filename = thumb.dataset.cert;
    const name = thumb.dataset.certName || '';
    img.src = `assets/certs/${filename}.jpg`;
    img.alt = name;
    caption.textContent = name;
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
   10a. INIT PROGRESS BAR ANIMATION
   ═══════════════════════════════════════════════ */
function initProgressAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.progress__fill');
        fills.forEach(f => {
          const targetW = f.style.width;
          f.style.width = '0%';
          f.classList.add('progress__fill--animate');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              f.style.width = targetW;
            });
          });
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress').forEach(el => obs.observe(el));
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

  function showCopied() {
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
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
  const btn = document.querySelector('.btn--primary');
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

function updateLangToggleLabel() {
  const labels = { en: 'EN', zh: '中文', ko: '한국어' };
  ['lang-toggle', 'mobile-lang-toggle'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.innerHTML = Object.entries(labels)
      .map(([code, label]) =>
        `<span${currentLang === code ? ' style="text-decoration:underline;text-underline-offset:3px;"' : ''}>${label}</span>`
      )
      .join('<span aria-hidden="true"> &middot; </span>');
  });
}

/* ═══════════════════════════════════════════════
   11. INIT LANG TOGGLE
   ═══════════════════════════════════════════════ */
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (currentLang === 'en') currentLang = 'zh';
    else if (currentLang === 'zh') currentLang = 'ko';
    else currentLang = 'en';
    localStorage.setItem('lang', currentLang);
    updateLangToggleLabel();
    applyTranslations();
    renderSpecializations();
    initScrollReveal();
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
  updateLangToggleLabel();
  renderSpecializations();
  initScrollReveal();
  initSpecTabs();
  initSpecCertLightbox();
  initHeroAnimation();
  initProgressAnimation();
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
