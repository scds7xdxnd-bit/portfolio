// Shared components for the Sun of Korea portfolio. Artwork contains no UI copy.
import { iconSvg } from '../lib/icons.js';
import { EXTRA_COPY, renderArchive, renderNotes, renderCredentials, renderLab, renderJourney, renderSearch, searchItems, escapeHTML } from './sun-sections.js';
export const SUN_ASSETS = {
  desktop: '/assets/sun-of-korea/dawn-desktop.webp',
  mobile: '/assets/sun-of-korea/dawn-mobile.webp',
  world: '/assets/sun-of-korea/world-atlas.webp',
};

const COPY = {
  en: {
    world: 'My world', work: 'Selected work', story: 'My story', contact: 'Contact', menu: 'Menu', close: 'Close menu', language: 'Language',
    skip: 'Skip to content', name: 'Taeyang Han', meaning: '한 · Korea', sun: '태양 · Sun', eyebrow: 'A NAME TO GROW INTO',
    headline: 'I want to be <br>the sun of Korea.', intro: 'Building systems that help<br>people move forward.', explore: 'Explore my world',
    location: 'Malaysian roots. Growing in Seoul.', roles: 'Engineer · Interpreter · Builder · Mentor', scroll: 'A little further, together',
    storyTitle: 'A name.<br>A direction.<br>A little more light.', storyBody: '한 is Korea. 태양 is the sun. I chose a name that asks something of me: to learn, to build, and to make the next step easier for someone else.',
    storyNote: 'Build systems. Level up life.', worldEyebrow: '01 / A WORLD WE GROW TOGETHER', worldTitle: 'Different places.<br>The same purpose.', worldIntro: 'A lab, a workshop, a table with room for someone new. Explore the places where I put that purpose into practice.',
    worldHint: 'Choose a place to explore', discover: 'Explore this work', selected: 'Selected place', proof: 'From this corner of my world',
    workEyebrow: '02 / THINGS THAT KEEP HELPING', workTitle: 'What I leave for<br>the next person.', workIntro: 'Tools to understand. Structures to build on. A path someone else can follow.',
    lifeDesc: 'A personal operating system, built around how I actually live and think.', rxnDesc: 'Making reaction engineering something you can explore and question.', palsDesc: 'Documented handovers and clearer coordination for the people who come next.',
    caseStudy: 'Read the case study', palsLink: 'PALS leadership certificate', contactTitle: 'Let’s make the next<br>step a little easier.', email: 'Say hello', cv: 'Download CV', footer: '한태양 · Taeyang Han', back: 'Back to the top',
  },
  ko: {
    world: '나의 세계', work: '주요 작업', story: '나의 이야기', contact: '연락', menu: '메뉴', close: '메뉴 닫기', language: '언어',
    skip: '본문으로 이동', name: 'Taeyang Han', meaning: '한 · 한국', sun: '태양 · Sun', eyebrow: '이름을 닮아가는 중',
    headline: '한국의 태양이<br>되고 싶습니다.', intro: '사람들이 앞으로 나아가도록<br>돕는 시스템을 만듭니다.', explore: '나의 세계 둘러보기',
    location: '말레이시아에서 시작해, 서울에서 자라는 중.', roles: '엔지니어 · 통역사 · 개발자 · 멘토', scroll: '함께, 한 걸음 더',
    storyTitle: '하나의 이름.<br>하나의 방향.<br>조금 더 밝게.', storyBody: '한은 한국, 태양은 해를 뜻합니다. 배우고, 만들고, 누군가의 다음 걸음을 조금 더 쉽게 만드는 사람. 저는 그런 사람이 되고 싶어 이 이름을 선택했습니다.',
    storyNote: '시스템을 만들고, 함께 성장합니다.', worldEyebrow: '01 / 함께 키워가는 세계', worldTitle: '서로 다른 공간.<br>같은 마음.', worldIntro: '연구실, 작업실, 새로 온 사람을 위한 자리. 이 마음을 실천하는 공간들을 둘러보세요.',
    worldHint: '궁금한 공간을 선택해 보세요', discover: '관련 작업 보기', selected: '선택한 공간', proof: '이 공간에서 하는 일',
    workEyebrow: '02 / 오래 도움이 되는 것들', workTitle: '다음 사람에게<br>남기는 것.', workIntro: '이해를 돕는 도구. 이어갈 수 있는 구조. 다른 사람도 따라갈 수 있는 길.',
    lifeDesc: '실제로 살고 생각하는 방식에 맞춰 만든 개인 생활 관리 시스템.', rxnDesc: '반응공학을 직접 탐색하고 질문할 수 있는 시뮬레이터.', palsDesc: '다음 임원단을 위해 남긴 인수인계 문서와 명확한 협업 절차.',
    caseStudy: '제작 이야기 읽기', palsLink: 'PALS 회장 활동 증명서', contactTitle: '다음 걸음을<br>조금 더 쉽게, 함께.', email: '인사 건네기', cv: '이력서 다운로드', footer: '한태양 · Taeyang Han', back: '맨 위로',
  },
  zh: {
    world: '我的世界', work: '精选作品', story: '我的故事', contact: '联系', menu: '菜单', close: '关闭菜单', language: '语言',
    skip: '跳至正文', name: 'Taeyang Han', meaning: '한 · 韩国', sun: '태양 · 太阳', eyebrow: '朝着名字里的期待生长',
    headline: '我想成为<br>韩国的太阳。', intro: '建立系统，<br>让人们更容易向前走。', explore: '走进我的世界',
    location: '从马来西亚出发，在首尔成长。', roles: '工程师 · 口译员 · 开发者 · 导师', scroll: '一起，再往前一步',
    storyTitle: '一个名字。<br>一个方向。<br>多一点光。', storyBody: '한是韩国，태양是太阳。我选择了一个对自己有所期待的名字：去学习，去创造，让下一个人的路更好走一点。',
    storyNote: '建立系统，让生活向前。', worldEyebrow: '01 / 一起生长的世界', worldTitle: '不同的地方。<br>同一份心意。', worldIntro: '实验室、工作间、一张给新来的人留着位置的桌子。看看我在哪里把这份心意变成行动。',
    worldHint: '选择一个地方，开始探索', discover: '探索相关作品', selected: '已选地点', proof: '这个角落里的实践',
    workEyebrow: '02 / 让帮助延续下去', workTitle: '留给<br>下一个人。', workIntro: '帮助理解的工具，可以接着用的结构，还有别人也能走的路。',
    lifeDesc: '按照我真实的生活与思考方式，搭建的个人生活管理系统。', rxnDesc: '让反应工程成为可以亲手探索、追问的东西。', palsDesc: '留下交接文档和清晰的协作流程，让下一届团队更容易接手。',
    caseStudy: '阅读制作故事', palsLink: 'PALS 会长活动证明', contactTitle: '一起，让下一步<br>更容易一点。', email: '打个招呼', cv: '下载简历', footer: '한태양 · Taeyang Han', back: '回到顶部',
  },
};

export const WORLD_PLACES = [
  { id: 'engineer', color: '#2580ad', point: [23, 25], icon: 'flask', image: 'reaction_simulator', href: '/projects/reaction-simulator.html',
    en: ['The laboratory', 'Engineer', 'Build to understand.', 'When an equation is hard to picture, I build a model I can question. My reaction simulator turns theory into something you can vary, inspect, and check.'],
    ko: ['연구실', '엔지니어', '이해하기 위해 만듭니다.', '식이 잘 그려지지 않을 때, 직접 질문할 수 있는 모델을 만듭니다. 반응 시뮬레이터에서 조건을 바꾸고 결과를 살피며 이론을 확인합니다.'],
    zh: ['实验室', '工程', '为了理解而创造。', '当公式难以想象，我会做一个可以追问的模型。在反应模拟器里，改变条件、查看结果，再检验理论。'] },
  { id: 'linguist', color: '#297c65', point: [76, 24], icon: 'globe', image: 'apec_cooperation_dialogue', href: 'https://www.yna.co.kr/view/AKR20250218100300053',
    en: ['The meeting table', 'Interpreter', 'Make understanding possible.', 'Korean, English, and Malay bring me into rooms where context matters. I interpreted at an APEC cooperation meeting in 2025. The linked reporting covers the meeting.'],
    ko: ['만남의 테이블', '통역사', '서로 이해할 수 있도록.', '한국어·영어·말레이어로 맥락이 중요한 대화를 잇습니다. 2025년 APEC 협력 회의에서 통역을 맡았습니다. 아래 보도는 해당 회의를 다룹니다.'],
    zh: ['交流桌', '口译', '让理解成为可能。', '用韩语、英语和马来语连接重视语境的对话。我曾为2025年APEC合作会议提供口译。下方报道介绍的是该次会议。'] },
  { id: 'builder', color: '#8060ad', point: [22, 63], icon: 'code', image: 'lifeos', href: '/projects/lifeos.html',
    en: ['The workshop', 'Builder', 'Make room for living.', 'LifeOS began with a personal need: tools that fit how I think. Connecting everyday information gives me more room to learn, build, and show up for people.'],
    ko: ['작업실', '개발자', '삶을 위한 여유를 만듭니다.', 'LifeOS는 제 사고방식에 맞는 도구가 필요해서 시작했습니다. 일상의 정보를 연결해 배우고, 만들고, 사람들과 함께할 여유를 확보합니다.'],
    zh: ['工作间', '开发', '给生活留出空间。', 'LifeOS起源于一个真实需求：找到适合自己思考方式的工具。把日常信息连接起来，为学习、创造和陪伴他人留出空间。'] },
  { id: 'community', color: '#be5844', point: [78, 65], icon: 'users', image: 'pals_copresident', href: '/projects/pals.html',
    en: ['The common ground', 'Community', 'Leave a stronger handover.', 'I joined PALS as a mentee and later became co-president. Clearer handoffs and a written constitution help the next team carry the work forward.'],
    ko: ['함께하는 마당', '커뮤니티', '다음 사람에게 더 나은 시작을.', 'PALS 멘티로 시작해 공동회장이 되었습니다. 명확한 인수인계와 문서화된 회칙으로 다음 팀도 일을 이어갈 수 있게 했습니다.'],
    zh: ['共享庭院', '社群', '给下一届一个更好的起点。', '我从PALS的学弟成长为联合会长。清晰的交接流程和成文章程，让下一届团队能把事情接着做好。'] },
  { id: 'scholar', color: '#99721a', point: [48, 84], icon: 'cap', image: 'zhaoying_ebook', href: 'https://zhaoying-ebook.vercel.app',
    en: ['The reading garden', 'Scholar', 'Pass the light along.', 'Scholarships gave me opportunity and trust. Through 照应, I turn what I learned—including rejection—into a guide someone else can use to find their own way.'],
    ko: ['배움의 정원', '장학생', '받은 빛을 이어갑니다.', '장학금은 기회와 신뢰를 주었습니다. 照应에서는 탈락을 포함한 배움을 정리해, 다른 사람도 자기 길을 찾을 수 있는 안내서를 만듭니다.'],
    zh: ['阅读花园', '学者', '把收到的光传下去。', '奖学金给了我机会与信任。通过照应，我把包括落选在内的经验整理成指南，让别人也能找到自己的路。'] },
];

export function sunMark() {
  return `<svg class="sun-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="currentColor"/><path d="M24 3v5m0 32v5M3 24h5m32 0h5M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4M13 4l2 5m18 30 2 5M4 35l5-2m30-18 5-2" stroke="currentColor" stroke-width="3" stroke-linecap="square"/></svg>`;
}

export function renderSunHeader(c, lang) {
  return `<a class="sun-skip" href="#sun-main">${c.skip}</a><header class="sun-nav"><a class="sun-brand" href="#top" aria-label="${c.footer}">${sunMark()}<span><strong lang="ko">한태양</strong><span>Taeyang Han</span></span></a><button class="sun-menu" aria-expanded="false" aria-controls="sun-nav-links">${c.menu} <span aria-hidden="true">☰</span></button><nav id="sun-nav-links" aria-label="${c.menu}"><a href="#world">${c.world}</a><a href="#work">${c.work}</a><a href="#story">${c.story}</a><a href="#notes">${c.notes}</a><a href="#contact">${c.contact}</a></nav><button class="sun-search-trigger" aria-haspopup="dialog" aria-controls="sun-search" aria-label="${c.search}">⌕ <span>${c.search}</span><kbd>⌘K</kbd></button><div class="sun-languages" role="group" aria-label="${c.language}">${Object.entries({en:'EN',zh:'中文',ko:'한국어'}).map(([key,label])=>`<button data-language="${key}" lang="${key}" aria-pressed="${key===lang}">${label}</button>`).join('')}</div></header>`;
}

export function renderSunHero(c) {
  return `<section class="sun-hero" aria-labelledby="sun-heading"><picture class="sun-hero-art"><source media="(max-width: 600px)" srcset="${SUN_ASSETS.mobile}"><img src="${SUN_ASSETS.desktop}" alt="" width="1672" height="941" fetchpriority="high"></picture><div class="sun-hero-copy"><p class="sun-eyebrow">${c.eyebrow}</p><div class="sun-name-meaning"><span>${c.meaning}</span><span>${c.sun}</span></div><h1 id="sun-heading">${c.headline}</h1><p class="sun-intro">${c.intro}</p><div class="sun-actions"><a class="sun-button sun-button-primary" href="#world">${c.explore}<span aria-hidden="true">↗</span></a><a class="sun-button" href="#work">${c.work}</a></div><div class="sun-identity"><img src="/assets/hero-sm.webp" alt="Taeyang Han" width="56" height="56"><div><p>${c.roles}</p><span>${c.location}</span></div></div></div><a class="sun-scroll" href="#story"><span>${c.scroll}</span><span aria-hidden="true">↓</span></a></section>`;
}

function renderPlace(place, c, lang) {
  const [name,role,title,body]=place[lang];
  return `<div class="sun-place-image"><img src="/assets/projects/${place.image}.webp" alt="${name}" width="640" height="400" loading="lazy"></div><div class="sun-place-copy"><p class="sun-eyebrow">${role} / ${c.proof}</p><h3>${title}</h3><p>${body}</p><a class="sun-text-link" href="${place.href}">${c.discover}<span aria-hidden="true">↗</span></a></div>`;
}

export function renderWorldExplorer(c, lang, selected='engineer') {
  const place=WORLD_PLACES.find(p=>p.id===selected)||WORLD_PLACES[0];
  return `<section class="sun-world sun-section" id="world" aria-labelledby="world-heading"><div class="sun-section-head"><div><p class="sun-eyebrow">${c.worldEyebrow}</p><h2 id="world-heading">${c.worldTitle}</h2></div><p>${c.worldIntro}</p></div><div class="sun-map"><img class="sun-map-art" src="${SUN_ASSETS.world}" alt="" width="1536" height="1024" loading="lazy"><div class="sun-map-points" role="group" aria-label="${c.worldHint}">${WORLD_PLACES.map(p=>`<button class="sun-map-point" data-place="${p.id}" style="--point-x:${p.point[0]}%;--point-y:${p.point[1]}%;--place-color:${p.color}" aria-pressed="${p.id===place.id}" aria-controls="sun-place-panel"><span class="sun-point-icon" aria-hidden="true">${iconSvg(p.icon)}</span><span>${p[lang][1]}</span><span class="sun-point-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><p class="sun-map-hint"><span aria-hidden="true">✳</span> ${c.worldHint}</p></div><div class="sun-place-panel" id="sun-place-panel" style="--place-color:${place.color}" role="region" aria-label="${c.selected}" aria-live="polite" aria-atomic="true">${renderPlace(place,c,lang)}</div></section>`;
}

export function renderStory(c,lang='en') {
  return `<section class="sun-story sun-section" id="story" aria-labelledby="story-heading"><div class="sun-story-title">${sunMark()}<h2 id="story-heading">${c.storyTitle}</h2></div><div class="sun-story-copy"><p>${c.storyBody}</p><span class="sun-hand">${c.storyNote}</span></div>${renderJourney(lang)}</section>`;
}

export function renderWork(c) {
  const cards=[['lifeos','LifeOS',c.lifeDesc,'/projects/lifeos.html',c.caseStudy,'#8060ad'],['reaction_simulator','Reaction Simulator',c.rxnDesc,'/projects/reaction-simulator.html',c.caseStudy,'#2580ad'],['pals_copresident','PALS',c.palsDesc,'/projects/pals.html',c.caseStudy,'#be5844']];
  return `<section class="sun-work sun-section" id="work" aria-labelledby="work-heading"><div class="sun-section-head"><div><p class="sun-eyebrow">${c.workEyebrow}</p><h2 id="work-heading">${c.workTitle}</h2></div><p>${c.workIntro}</p></div><div class="sun-work-grid">${cards.map(([img,title,desc,href,label,color],i)=>`<article class="sun-work-card" style="--place-color:${color}"><a href="${href}" class="sun-work-image" aria-label="${title} — ${label}"><img src="/assets/projects/${img}.webp" alt="" width="640" height="400" loading="lazy"><span aria-hidden="true">↗</span></a><div class="sun-work-title"><span>0${i+1}</span><h3>${title}</h3></div><p>${desc}</p><a class="sun-text-link" href="${href}">${label} <span aria-hidden="true">↗</span></a></article>`).join('')}</div></section>`;
}

export function renderSunFooter(c,lang) {
  const cv={en:'/cv-en.pdf',zh:'/cv-zh.pdf',ko:'/cv.pdf'};
  return `<footer class="sun-footer sun-section" id="contact">${sunMark()}<h2>${c.contactTitle}</h2><p class="sun-available">${c.available}</p><div class="sun-actions"><a class="sun-button sun-button-primary" href="mailto:ammarhakimikm03@gmail.com">${c.email} <span aria-hidden="true">↗</span></a><a class="sun-button" href="${cv[lang]}" download>${c.cv} <span aria-hidden="true">↓</span></a><button class="sun-button sun-copy-email">${c.copy}</button></div><p class="sun-email-address"><a href="mailto:ammarhakimikm03@gmail.com">ammarhakimikm03@gmail.com</a></p><p class="sun-copy-status" role="status"></p><details class="sun-cv-options"><summary>${c.cvMore}</summary><div><a href="/cv-en.pdf" download lang="en">English</a><a href="/cv-zh.pdf" download lang="zh-Hans">简体中文</a><a href="/cv-zh-hant.pdf" download lang="zh-Hant">繁體中文</a><a href="/cv.pdf" download lang="ko">한국어</a></div></details><div class="sun-footer-line"><span>${c.footer}</span><div><a href="https://github.com/scds7xdxnd-bit">GitHub ↗</a><a href="https://www.linkedin.com/in/khairul-ammar-hakimi">LinkedIn ↗</a><a href="https://xhslink.com/m/6pTVib4GbZU">小红书 ↗</a><a href="https://private-brain-rho.vercel.app">Private Brain ↗</a><a href="#top">${c.back} ↑</a></div></div></footer>`;
}

export function renderSunPage(lang='en', selected='engineer') {
  if (!Object.hasOwn(COPY,lang)) lang='en';
  const c={...COPY[lang],...EXTRA_COPY[lang]};
  return `${renderSunHeader(c,lang)}<main id="sun-main" tabindex="-1">${renderSunHero(c)}${renderStory(c,lang)}${renderWorldExplorer(c,lang,selected)}${renderWork(c)}${renderArchive(lang,WORLD_PLACES)}${renderNotes(lang)}${renderCredentials(lang)}${renderLab(lang)}</main>${renderSunFooter(c,lang)}${renderSearch(lang)}`;
}

export function mountSunPortfolio(root) {
  let stored; try { stored=localStorage.getItem('lang'); } catch { /* Storage is optional. */ }
  let lang=Object.hasOwn(COPY,stored)?stored:'en';
  let selected='engineer', filter='all', query='', searchOpener=null, expanded=false;
  let motionObserver;
  const copy=()=>({...COPY[lang],...EXTRA_COPY[lang]});
  const reduce=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const filterArchive=()=>{
    let count=0,total=0;
    root.querySelectorAll('.sun-archive-item').forEach(el=>{
      const show=(filter==='all'||el.dataset.domain===filter)&&el.dataset.search.includes(query.toLocaleLowerCase());
      if(show)total++;
      const visible=show&&(expanded||filter!=='all'||query||count<8);
      el.hidden=!visible;if(visible)count++;
    });
    root.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.filter===filter)));
    root.querySelector('#archive-search').value=query;
    root.querySelector('#archive-count').textContent=`${count} ${copy().results}`;
    root.querySelector('#archive-empty').hidden=count!==0;
    const more=root.querySelector('.sun-archive-toggle');
    more.hidden=filter!=='all'||!!query||total<=8;more.textContent=expanded?copy().less:copy().more;more.setAttribute('aria-expanded',String(expanded));
  };
  const animate=()=>{
    motionObserver?.disconnect();
    if(reduce())return;
    motionObserver=new IntersectionObserver(entries=>{
      for(const {target,isIntersecting} of entries){if(!isIntersecting)continue;
        target.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:550,easing:'cubic-bezier(.2,.7,.2,1)'});
        motionObserver.unobserve(target);
      }
    },{threshold:.08});
    root.querySelectorAll('.sun-section-head,.sun-work-card,.sun-note,.sun-story-title').forEach(el=>motionObserver.observe(el));
  };
  const render=()=>{
    document.documentElement.lang=lang;
    document.documentElement.classList.add('sun-enhanced');
    root.innerHTML=renderSunPage(lang,selected);
    filterArchive();animate();
  };
  const closeMenu=()=>{
    const button=root.querySelector('.sun-menu');
    button.setAttribute('aria-expanded','false');
    root.querySelector('.sun-nav').classList.remove('is-open');
    button.innerHTML=`${copy().menu} <span aria-hidden="true">☰</span>`;
  };
  const selectPlace=id=>{
    const place=WORLD_PLACES.find(p=>p.id===id);if(!place)return;
    selected=id;
    root.querySelectorAll('[data-place]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.place===id)));
    const panel=root.querySelector('#sun-place-panel');
    panel.style.setProperty('--place-color',place.color);
    panel.innerHTML=renderPlace(place,copy(),lang);
  };
  const navigateHash=()=>{
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const aliases={hero:'top',specializations:'world',projects:'archive',footer:'contact','life-system':'world'};
    const place=WORLD_PLACES.find(p=>p.id===id);
    if(place){selectPlace(id);id='world';}
    else id=aliases[id]||id;
    const target=document.getElementById(id);if(!target)return;
    if(target.matches('.sun-archive-item')){
      filter='all';query='';expanded=true;filterArchive();target.open=true;
    }
    requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));
  };
  const renderSearchResults=()=>{
    const value=root.querySelector('#sun-search-input').value.toLocaleLowerCase().trim();
    const matches=searchItems(lang,WORLD_PLACES).filter(item=>!value||[item.title,item.keywords].join(' ').toLocaleLowerCase().includes(value)).slice(0,12);
    root.querySelector('#sun-search-results').innerHTML=matches.length?matches.map(item=>`<a href="${escapeHTML(item.href)}">${escapeHTML(item.title)}<span aria-hidden="true">↗</span></a>`).join(''):`<p>${copy().searchEmpty}</p>`;
  };
  const closeSearch=()=>{
    const dialog=root.querySelector('#sun-search');
    if(dialog.open)dialog.close();
    searchOpener?.focus({preventScroll:true});
  };
  const openSearch=()=>{
    closeMenu();searchOpener=document.activeElement;
    const dialog=root.querySelector('#sun-search');
    dialog.showModal();root.querySelector('#sun-search-input').value='';
    renderSearchResults();root.querySelector('#sun-search-input').focus();
  };
  root.addEventListener('input',e=>{
    if(e.target.id==='archive-search'){query=e.target.value;filterArchive();}
    if(e.target.id==='sun-search-input')renderSearchResults();
  });
  root.addEventListener('click',async e=>{
    const language=e.target.closest('[data-language]');
    if(language){lang=language.dataset.language;try{localStorage.setItem('lang',lang);}catch{}render();root.querySelector(`[data-language="${lang}"]`).focus({preventScroll:true});return;}
    const point=e.target.closest('[data-place]');
    if(point){selectPlace(point.dataset.place);return;}
    if(e.target.closest('.sun-archive-toggle')){expanded=!expanded;filterArchive();if(!expanded)root.querySelector('#archive-heading').scrollIntoView({behavior:reduce()?'instant':'smooth'});return;}
    const category=e.target.closest('[data-filter]');
    if(category){filter=category.dataset.filter;filterArchive();return;}
    if(e.target.closest('.sun-search-trigger')){openSearch();return;}
    if(e.target.closest('.sun-search-close')){closeSearch();return;}
    if(e.target.matches('#sun-search')){
      const rect=e.target.getBoundingClientRect();
      if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeSearch();
      return;
    }
    if(e.target.closest('.sun-copy-email')){
      try{await navigator.clipboard.writeText('ammarhakimikm03@gmail.com');root.querySelector('.sun-copy-status').textContent=copy().copied;}
      catch{root.querySelector('.sun-copy-status').textContent=copy().copyFailed;}
      return;
    }
    const menu=e.target.closest('.sun-menu');
    if(menu){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));root.querySelector('.sun-nav').classList.toggle('is-open',open);menu.innerHTML=`${open?copy().close:copy().menu} <span aria-hidden="true">${open?'×':'☰'}</span>`;return;}
    const link=e.target.closest('a');
    if(link){
      if(link.closest('#sun-search'))closeSearch();
      if(link.getAttribute('href')?.startsWith('#')&&link.hash===location.hash)navigateHash();
      closeMenu();
    }else if(!e.target.closest('.sun-nav'))closeMenu();
  });
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();return;}
    if(e.key==='Escape'&&root.querySelector('.sun-menu').getAttribute('aria-expanded')==='true'){closeMenu();root.querySelector('.sun-menu').focus();}
    const dialog=root.querySelector('#sun-search');
    if(!dialog.open)return;
    const links=[...dialog.querySelectorAll('#sun-search-results a')];
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();const i=links.indexOf(document.activeElement),delta=e.key==='ArrowDown'?1:-1;
      if(links.length)links[(i+delta+links.length)%links.length].focus();
    }
    if(e.key==='Enter'&&document.activeElement.id==='sun-search-input'&&links[0]){e.preventDefault();links[0].click();}
  });
  window.addEventListener('hashchange',navigateHash);
  render();navigateHash();
  if(!reduce())root.querySelector('.sun-hero-copy').animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out'});
}
