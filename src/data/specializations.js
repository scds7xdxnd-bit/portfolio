export const DOMAIN_ICON = {
  linguist: 'globe',
  engineer: 'flask',
  builder: 'code',
  community: 'users',
  scholar: 'cap'
};

export const SPECIALIZATIONS = [
  {
    id: 'linguist',
    icon: '🌐',
    accent: 'sky',
    mastery: 90,
    featuredUrl: 'https://www.yna.co.kr/view/AKR20250218100300053',
    featuredLinkKey: 'spec.linguist.featuredLinkLabel',
    screenshot: '/assets/projects/apec_cooperation_dialogue.webp',
    secondary: [
      { titleKey: 'spec.linguist.item1.title', descKey: 'spec.linguist.item1.desc', screenshot: '/assets/projects/gyeongbuk_provincial_government.webp' },
      { titleKey: 'spec.linguist.item2.title', descKey: 'spec.linguist.item2.desc', screenshot: '/assets/projects/supreme_prosecutors_office.webp'  },
      { titleKey: 'spec.linguist.item3.title', descKey: 'spec.linguist.item3.desc', screenshot: '/assets/projects/anti_corruption.webp' },
      { titleKey: 'spec.linguist.item4.title', descKey: 'spec.linguist.item4.desc' },
      { titleKey: 'spec.linguist.item5.title', descKey: 'spec.linguist.item5.desc' },
      { titleKey: 'spec.linguist.item6.title', descKey: 'spec.linguist.item6.desc' },
      { titleKey: 'spec.linguist.item7.title', descKey: 'spec.linguist.item7.desc' },
    ],
    miniSim: 'lang-quiz',
    certs: [
      { filename: '20241_TOPIK_scorecard', name: 'TOPIK Scorecard', icon: '📝' },
      { filename: '20261_BLCU_transcript', name: 'BLCU Transcript (2026-1)', icon: '🇨🇳' },
    ]
  },
  {
    id: 'engineer',
    icon: '⚗️',
    accent: 'coral',
    mastery: 85,
    featuredUrl: 'https://reactionsimulator.vercel.app',
    featuredLinkKey: 'spec.liveLink',
    caseStudyUrl: 'projects/reaction-simulator.html',
    screenshot: '/assets/projects/reaction_simulator.webp',
    secondary: [
      { titleKey: 'spec.engineer.item6.title', descKey: 'spec.engineer.item6.desc', screenshot: '/assets/projects/fugacity_simulator.webp', link: 'https://fugacity-simulator.vercel.app' },
      { titleKey: 'spec.engineer.item1.title', descKey: 'spec.engineer.item1.desc', screenshot: '/assets/projects/process_game.webp', link: 'https://process-design.vercel.app' },
      { titleKey: 'spec.engineer.item5.title', descKey: 'spec.engineer.item5.desc', screenshot: '/assets/projects/apple_scm_analysis.webp', link: 'https://apple-scm-web.vercel.app' },
      { titleKey: 'spec.engineer.item2.title', descKey: 'spec.engineer.item2.desc', screenshot: '/assets/projects/lp_diet_optimization.webp' },
    ],
    miniSim: null,
    miniSim2: 'rxn',
    certs: []
  },
  {
    id: 'builder',
    icon: '💻',
    accent: 'mint',
    mastery: 87,
    featuredUrl: 'https://lifeos-wine.vercel.app',
    featuredLinkKey: 'spec.liveLink',
    caseStudyUrl: 'projects/lifeos.html',
    screenshot: '/assets/projects/lifeos.webp',
    secondary: [
      { titleKey: 'spec.builder.item2.title', descKey: 'spec.builder.item2.desc', screenshot: '/assets/projects/scm_simulator.webp', link: 'https://scmsimulator.vercel.app' },
      { titleKey: 'spec.builder.item1.title', descKey: 'spec.builder.item1.desc', screenshot: '/assets/projects/accounting.webp', status: 'In Development' },
      { titleKey: 'spec.builder.item3.title', descKey: 'spec.builder.item3.desc', screenshot: '/assets/projects/cnn_emotion_classifier.webp' },
      { titleKey: 'spec.builder.item4.title', descKey: 'spec.builder.item4.desc' },
      { titleKey: 'spec.builder.item5.title', descKey: 'spec.builder.item5.desc' },
    ],
    miniSim: 'bullwhip',
    certs: []
  },
  {
    id: 'community',
    icon: '🤝',
    accent: 'purple',
    mastery: 92,
    featuredUrl: null,
    screenshot: '/assets/projects/pals_copresident.webp',
    secondary: [
      { titleKey: 'spec.community.item3.title', descKey: 'spec.community.item3.desc', screenshot: '/assets/projects/event_host.webp', link: 'https://www.sg-alumni.org/page/bbs/board.php?bo_table=b02&wr_id=705&device=pc' },
      { titleKey: 'spec.community.item1.title', descKey: 'spec.community.item1.desc', screenshot: '/assets/projects/samsung_dream_scholars_president.webp' },
      { titleKey: 'spec.community.item2.title', descKey: 'spec.community.item2.desc', screenshot: '/assets/projects/sea_study_club_president.webp' },
      { titleKey: 'spec.community.item5.title', descKey: 'spec.community.item5.desc', screenshot: '/assets/projects/rainbow_stepping_stone.webp' },
      { titleKey: 'spec.community.item4.title', descKey: 'spec.community.item4.desc' },
      { titleKey: 'spec.community.item6.title', descKey: 'spec.community.item6.desc' },
      { titleKey: 'spec.community.item7.title', descKey: 'spec.community.item7.desc', link: '/samsung-leadership-camp/' },
    ],
    miniSim: 'ph',
    certs: [
      { filename: '20241_PALS_excellence_eng', name: 'PALS Outstanding Mentor (2024-1)', icon: '🏅' },
      { filename: '20241_PALS_activity_eng', name: 'PALS Activity Certificate (2024-1)', icon: '📜' },
      { filename: '20242_PALS_excellence', name: 'PALS Mentor of the Semester (2024-2)', icon: '🏅' },
      { filename: '20251_PALS_president', name: 'PALS Co-President (2025-1)', icon: '👑' },
      { filename: '20252_PALS_president_ENG', name: 'PALS President (2025-2)', icon: '👑' },
      { filename: '20241_PPMKxMSAJ', name: 'PPMK x MSAJ Certificate', icon: '📜' },
      { filename: '20251_stepping_stone_mentoring', name: 'Stepping Stone Mentoring', icon: '🤝' },
    ]
  },
  {
    id: 'scholar',
    icon: '📊',
    accent: 'sunshine',
    mastery: 88,
    featuredUrl: 'https://webzine.sdream.or.kr/webzin/webzine96/sub1_4.html',
    featuredLinkKey: 'spec.scholar.featuredLinkLabel',
    screenshot: '/assets/projects/samsung_dream_scholarship.webp',
    secondary: [
      { titleKey: 'spec.scholar.item4.title', descKey: 'spec.scholar.item4.desc', screenshot: '/assets/projects/xiaohongshu.webp', link: 'https://xhslink.com/m/6pTVib4GbZU' },
      { titleKey: 'spec.scholar.item3.title', descKey: 'spec.scholar.item3.desc', screenshot: '/assets/projects/leenwon_asian_fellowship.webp', link: 'http://www.leewonfoundation.org/bin/minihome/neo_main758.htm?seq=9659&_aldo=154' },
      { titleKey: 'spec.scholar.item2.title', descKey: 'spec.scholar.item2.desc', screenshot: '/assets/projects/sogang_alumni_scholarship.webp' },
      { titleKey: 'spec.scholar.item1.title', descKey: 'spec.scholar.item1.desc' },
      { titleKey: 'spec.scholar.item5.title', descKey: 'spec.scholar.item5.desc' },
    ],
    miniSim: null,
    certs: [
      { filename: '20241_samsung_scholarship', name: 'Samsung Dream Scholarship (2024-1)', icon: '🌟' },
      { filename: '20242_group_study', name: 'Sogang Group Study (2024-2)', icon: '📚' },
      { filename: '20232_lee-won_fellowship_completion', name: 'Lee & Won — Completion', icon: '📜' },
      { filename: '20232_lee-won_fellowship_excellence', name: 'Lee & Won — Excellence Award', icon: '🌟' },
      { filename: '20261_sogang_alumni_scholarship_4', name: 'Sogang Alumni Scholarship (2026-1)', icon: '📜' },
      { filename: '20252_sogang_alumni_scholarship_3', name: 'Sogang Alumni Scholarship (2025-2)', icon: '📜' }
    ]
  }
];

export const HERO_BUILDS = [
  { label: 'LifeOS — unified life OS',           checked: true  },
  { label: 'CNN emotion → color AI',             checked: true  },
  { label: 'Scholarship writing system',         checked: false },
  { label: 'Bullwhip effect simulator',          checked: true  },
];
