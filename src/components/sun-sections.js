import { SUN_ARCHIVE } from '../data/sun-archive.js';

export const EXTRA_COPY = {
  en: {
    notes:'Field notes', lab:'The lab', search:'Search', searchHint:'Search projects, places, and notes', searchClose:'Close search', searchEmpty:'No matches. Try a project name or discipline.',
    archiveLabel:'03 / THE WORK, IN FULL', archiveTitle:'More paths to explore.', archiveIntro:'Engineering tools, communities, and everything I am learning along the way.', all:'All',more:'Show all work',less:'Show less', filter:'Filter the work', archiveSearch:'Find something in the archive', results:'projects shown', empty:'Nothing here yet. Try another filter or search.', details:'Details', visit:'Open project or source', case:'Read case study', evidence:'View evidence',
    notesLabel:'04 / BUILDING TO UNDERSTAND', notesTitle:'Questions worth<br>staying with.', notesIntro:'The experiments, mistakes, and ideas behind the work.', allNotes:'All notes & case studies',
    quantum:'Does quantum chemistry help?', quantumDesc:'Testing an appealing idea—and checking the result when it looks too good.', chemical:'What does chemical potential actually mean?', chemicalDesc:'An interactive way to think about what drives a system to change.', uncertainty:'Engineering under uncertainty', uncertaintyDesc:'Making a decision when the information is incomplete.',
    trustLabel:'05 / TRUST, PASSED FORWARD', trustTitle:'The support behind<br>the story.', trustIntro:'Scholarships made room to learn. Mentoring gave me a way to pass that opportunity on.',
    topik:'TOPIK Level 6', topikDesc:'265 / 300 · achieved in 2024', samsung:'Samsung Dream Scholarship', samsungDesc:'Global Hope scholar · foundation feature', pals:'PALS leadership', palsCredentialDesc:'President · Fall 2025', alumni:'Sogang Alumni Scholarship', alumniDesc:'Spring 2026 · certificate',
    labTitle:'A small lab for big questions.', labDesc:'Change a variable. See what happens. Keep the curiosity.', labCamp:'How do strangers become a community?', labReaction:'What happens when a reactor changes?', labThermo:'Which way will the molecules go?',
    available:'Open to internships, collaborations, and interesting problems.', copy:'Copy email', copied:'Email copied', copyFailed:'Please select and copy the email address below.', cvMore:'CV languages', journeyLabel:'A FEW STEPS ALONG THE WAY',
    journey1:'2021', journey1Text:'A personal accounting tool becomes a lasting building habit.', journey2:'2023', journey2Text:'A PALS mentee, learning how to find my way in a new place.', journey3:'2025', journey3Text:'PALS leadership: making the handover easier for the next team.', journey4:'Today', journey4Text:'Learning, building, and leaving a little more light.',
  },
  ko: {
    notes:'생각의 기록',lab:'작은 실험실',search:'검색',searchHint:'프로젝트, 공간, 기록 검색',searchClose:'검색 닫기',searchEmpty:'결과가 없습니다. 프로젝트나 분야 이름을 입력해 보세요.',
    archiveLabel:'03 / 모든 작업',archiveTitle:'더 많은 길을 둘러보세요.',archiveIntro:'공학 도구, 커뮤니티, 그리고 그 과정에서 배우는 것들.',all:'전체',more:'모든 작업 보기',less:'접기',filter:'분야별 보기',archiveSearch:'작업 목록 검색',results:'개의 작업',empty:'결과가 없습니다. 다른 분야나 검색어를 선택해 보세요.',details:'자세히',visit:'프로젝트 또는 자료 열기',case:'제작 이야기 읽기',evidence:'증빙 보기',
    notesLabel:'04 / 이해하기 위해 만들기',notesTitle:'오래 붙잡고<br>싶은 질문들.',notesIntro:'작업 뒤에 있는 실험, 실수, 생각의 기록.',allNotes:'모든 기록과 제작 이야기',quantum:'양자화학은 예측에 도움이 될까?',quantumDesc:'매력적인 가설을 검증하고, 결과가 너무 좋을 때 다시 확인하기.',chemical:'화학 퍼텐셜은 실제로 무엇을 뜻할까?',chemicalDesc:'시스템의 변화를 이끄는 힘을 직접 탐색하는 방법.',uncertainty:'불확실성 속의 공학적 결정',uncertaintyDesc:'정보가 완전하지 않아도 결정을 내리는 방법.',
    trustLabel:'05 / 신뢰를 이어가기',trustTitle:'이야기를 가능하게 한<br>도움들.',trustIntro:'장학금은 배울 여유를 주었고, 멘토링은 그 기회를 다음 사람에게 전하는 길이 되었습니다.',topik:'TOPIK 6급',topikDesc:'265 / 300 · 2024년 취득',samsung:'삼성꿈장학재단',samsungDesc:'글로벌 희망장학생 · 재단 소개',pals:'PALS 리더십',palsCredentialDesc:'회장 · 2025년 2학기',alumni:'서강동문장학금',alumniDesc:'2026년 1학기 · 증서',
    labTitle:'큰 질문을 위한 작은 실험실.',labDesc:'변수를 바꾸고, 결과를 보고, 호기심을 이어가세요.',labCamp:'낯선 사람들은 어떻게 공동체가 될까?',labReaction:'반응기 조건을 바꾸면 어떻게 될까?',labThermo:'분자는 어느 방향으로 움직일까?',available:'인턴십, 협업, 흥미로운 문제에 열려 있습니다.',copy:'이메일 복사',copied:'이메일을 복사했습니다',copyFailed:'아래 이메일 주소를 선택해 복사해 주세요.',cvMore:'이력서 언어',journeyLabel:'지나온 몇 걸음',journey1:'2021',journey1Text:'개인 가계부 도구에서 시작한 꾸준한 만들기.',journey2:'2023',journey2Text:'PALS 멘티로 새로운 곳에서 길을 찾는 법을 배우다.',journey3:'2025',journey3Text:'PALS 회장으로 다음 팀을 위한 인수인계를 다듬다.',journey4:'오늘',journey4Text:'배우고, 만들고, 조금 더 밝게 남기기.',
  },
  zh: {
    notes:'思考手记',lab:'小实验室',search:'搜索',searchHint:'搜索项目、地点与手记',searchClose:'关闭搜索',searchEmpty:'没有匹配结果，试试项目名称或领域。',
    archiveLabel:'03 / 完整作品',archiveTitle:'还有更多路可以走。',archiveIntro:'工程工具、社群，以及一路上学到的事情。',all:'全部',more:'查看全部',less:'收起',filter:'按领域筛选',archiveSearch:'搜索作品档案',results:'个项目',empty:'暂无结果，试试其他分类或关键词。',details:'详情',visit:'打开项目或来源',case:'阅读制作故事',evidence:'查看证明',
    notesLabel:'04 / 为了理解而创造',notesTitle:'值得多想<br>一会儿的问题。',notesIntro:'作品背后的实验、错误与思考。',allNotes:'所有手记与案例',quantum:'量子化学能帮助预测吗？',quantumDesc:'验证一个诱人的想法，并在结果好得出奇时重新检查。',chemical:'化学势到底意味着什么？',chemicalDesc:'用交互方式理解驱动系统变化的力量。',uncertainty:'不确定性下的工程决策',uncertaintyDesc:'信息还不完整时，如何做出决定。',
    trustLabel:'05 / 把信任传下去',trustTitle:'让故事得以发生<br>的支持。',trustIntro:'奖学金让我有余力学习，导师工作让我有机会把这份支持传给别人。',topik:'TOPIK 6级',topikDesc:'265 / 300 · 2024年取得',samsung:'三星梦想奖学金',samsungDesc:'全球希望奖学生 · 基金会报道',pals:'PALS 领导经历',palsCredentialDesc:'会长 · 2025年秋季',alumni:'西江校友奖学金',alumniDesc:'2026年春季 · 证书',
    labTitle:'小实验室，大问题。',labDesc:'改变一个变量，看看会发生什么，保持好奇。',labCamp:'陌生人如何成为一个社群？',labReaction:'改变反应器条件会怎样？',labThermo:'分子会往哪个方向走？',available:'欢迎实习、合作，以及值得思考的问题。',copy:'复制邮箱',copied:'邮箱已复制',copyFailed:'请选中并复制下方邮箱地址。',cvMore:'简历语言',journeyLabel:'走过的几步',journey1:'2021',journey1Text:'从个人记账工具开始，养成持续创造的习惯。',journey2:'2023',journey2Text:'作为PALS学弟，在新的地方学习找路。',journey3:'2025',journey3Text:'成为PALS会长，让下一届团队更容易接手。',journey4:'今天',journey4Text:'继续学习、创造，多留下一点光。',
  },
};

export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderArchive(lang,places){
  const c=EXTRA_COPY[lang];
  return `<section class="sun-archive sun-section" id="archive" aria-labelledby="archive-heading"><div class="sun-section-head"><div><p class="sun-eyebrow">${c.archiveLabel}</p><h2 id="archive-heading">${c.archiveTitle}</h2></div><p>${c.archiveIntro}</p></div><div class="sun-archive-controls"><div class="sun-filters" role="group" aria-label="${c.filter}"><button data-filter="all" aria-pressed="true">${c.all}</button>${places.map(p=>`<button data-filter="${p.id}" aria-pressed="false">${p[lang][1]}</button>`).join('')}</div><label class="sun-archive-search"><span>${c.archiveSearch}</span><input type="search" id="archive-search" placeholder="${c.search}…" autocomplete="off"></label></div><p class="sun-results" role="status" id="archive-count"></p><div class="sun-archive-list">${SUN_ARCHIVE.map((item,i)=>{
    const [title,desc]=item[lang];const place=places.find(p=>p.id===item.domain);
    return `<details class="sun-archive-item" id="entry-${item.id}" data-domain="${item.domain}" data-search="${escapeHTML([title,desc,...item.en].join(' ').toLocaleLowerCase())}"><summary><span class="sun-archive-number">${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(title)}</h3><span class="sun-archive-domain" style="--place-color:${place.color}">${place[lang][1]}</span><span class="sun-archive-plus" aria-hidden="true">+</span></summary><div class="sun-archive-detail">${item.image?`<img src="${item.image}" alt="${escapeHTML(title)}" width="480" height="300" loading="lazy">`:''}<div><p>${escapeHTML(desc)}</p><div class="sun-archive-links">${item.caseStudy?`<a class="sun-text-link" href="${item.caseStudy}">${c.case} ↗</a>`:''}${item.url?`<a class="sun-text-link" href="${item.url}">${c.visit} ↗</a>`:''}</div></div></div></details>`;
  }).join('')}</div><p id="archive-empty" hidden>${c.empty}</p><button class="sun-archive-toggle" hidden aria-expanded="false">${c.more}</button></section>`;
}

export function noteItems(lang){const c=EXTRA_COPY[lang];return [
  [c.quantum,c.quantumDesc,'/opinions/does-quantum-chemistry-help.html','01','solubility_predictor'],
  [c.chemical,c.chemicalDesc,'/opinions/chemical-potential.html','02','fugacity_simulator'],
  [c.uncertainty,c.uncertaintyDesc,'/opinions/engineering-under-uncertainty.html','03','scm_simulator'],
];}
export function renderNotes(lang){const c=EXTRA_COPY[lang];return `<section class="sun-notes sun-section" id="notes" aria-labelledby="notes-heading"><div class="sun-section-head"><div><p class="sun-eyebrow">${c.notesLabel}</p><h2 id="notes-heading">${c.notesTitle}</h2></div><p>${c.notesIntro}</p></div><div class="sun-notes-grid">${noteItems(lang).map(([title,desc,url,n,image])=>`<a class="sun-note" href="${url}"><img src="/assets/projects/${image}.webp" alt="" loading="lazy" width="480" height="300"><span class="sun-eyebrow">${n} / ${c.notes}</span><h3>${title}</h3><p>${desc}</p><span class="sun-note-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><a class="sun-text-link" href="/opinions/">${c.allNotes} ↗</a></section>`;}

export function renderCredentials(lang){const c=EXTRA_COPY[lang];const items=[
  [c.topik,c.topikDesc,'/assets/certs/20241_TOPIK_scorecard.webp'],
  [c.samsung,c.samsungDesc,'https://webzine.sdream.or.kr/webzin/webzine96/sub1_4.html'],
  [c.pals,c.palsCredentialDesc,'/assets/certs/20252_PALS_president_ENG.webp'],
  [c.alumni,c.alumniDesc,'/assets/certs/20261_sogang_alumni_scholarship_4.webp'],
];return `<section class="sun-trust sun-section" aria-labelledby="trust-heading"><div class="sun-section-head"><div><p class="sun-eyebrow">${c.trustLabel}</p><h2 id="trust-heading">${c.trustTitle}</h2></div><p>${c.trustIntro}</p></div><div class="sun-trust-grid">${items.map(([title,desc,url])=>`<a href="${url}"><span class="sun-trust-symbol" aria-hidden="true">✳</span><div><h3>${title}</h3><p>${desc}</p></div><span aria-hidden="true">↗</span></a>`).join('')}</div></section>`;}

export function renderLab(lang){const c=EXTRA_COPY[lang];return `<section class="sun-lab sun-section" id="lab" aria-labelledby="lab-heading"><span aria-hidden="true" class="sun-lab-symbol">✧</span><div><p class="sun-eyebrow">${c.lab}</p><h2 id="lab-heading">${c.labTitle}</h2><p>${c.labDesc}</p></div><div class="sun-lab-links"><a href="/samsung-leadership-camp/">${c.labCamp} <span aria-hidden="true">↗</span></a><a href="https://reactionsimulator.vercel.app">${c.labReaction} <span aria-hidden="true">↗</span></a><a href="/opinions/chemical-potential.html">${c.labThermo} <span aria-hidden="true">↗</span></a></div></section>`;}

export function renderJourney(lang){const c=EXTRA_COPY[lang];return `<div class="sun-journey"><p class="sun-eyebrow">${c.journeyLabel}</p><ol>${[1,2,3,4].map(i=>`<li><span>${c['journey'+i]}</span><p>${c['journey'+i+'Text']}</p></li>`).join('')}</ol></div>`;}

export function searchItems(lang,places){const c=EXTRA_COPY[lang];return [
  ...places.map(p=>({title:p[lang][0]+' · '+p[lang][1],href:'#'+p.id,keywords:p.id})),
  ...SUN_ARCHIVE.map(p=>({title:p[lang][0],href:p.caseStudy||'#entry-'+p.id,keywords:[...p[lang],...p.en].join(' ')})),
  ...noteItems(lang).map(([title,desc,href])=>({title,href,keywords:desc})),
  {title:c.lab,href:'#lab',keywords:'lab experiment 실험 实验'},
  {title:'CV / 이력서 / 简历',href:'#contact',keywords:'resume curriculum vitae email contact'},
];}
export function renderSearch(lang){const c=EXTRA_COPY[lang];return `<dialog class="sun-search-dialog" id="sun-search" aria-labelledby="search-label"><div class="sun-search-head"><label for="sun-search-input" id="search-label">${c.searchHint}</label><button class="sun-search-close" aria-label="${c.searchClose}">×</button></div><input type="search" id="sun-search-input" autocomplete="off" placeholder="${c.search}…"><div id="sun-search-results" aria-live="polite"></div></dialog>`;}
