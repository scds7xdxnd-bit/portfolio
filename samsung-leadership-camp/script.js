(() => {
  const CONFIG = {
    globalGroups: 8,
    universityGroups: 22,
    groupSize: 8,
    eventHeadcount: 270,
    targetStickers: 10,
    stickersPerPerson: 10,
    minStickersPerPerson: 1,
    maxStickersPerPerson: 50,
    minCompletionGoal: 1,
    maxCompletionGoal: 30,
    maxExchangeSeconds: 60,
    exchangeBehaviorBaseline: 1.22,
    exchangeCrowdBaseline: 1.08,
    crowdRadius: 34,
    personalSpace: 13,
    helperWaitSeconds: [35, 90],
    helperExitAfterRange: [2, 5],
    statusSampleInterval: 1,
    statusHistoryLimit: 180
  };

  const TRANSLATIONS = {
    ko: {
      "document.title": "삼성 리더십 캠프 조 편성 시뮬레이터 | DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "event.name": "DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "topbar.camp": "삼성 리더십 캠프",
      "topbar.attendees": "270명 참여",
      "lang.toggle": "EN",
      "hero.eyebrow": "DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "hero.title": "동물 조 편성 계산기와 교류 시뮬레이터",
      "hero.description": "글로벌과 대학 장학생 조를 동물 종별로 배정하고, 학생들이 행사 현장에서 10개의 서로 다른 이름 스티커를 얼마나 쉽게 모을 수 있는지 시뮬레이션합니다.",
      "planner.eyebrow": "플래너",
      "planner.title": "캠프 입력값",
      "input.species": "전체 동물 종 수",
      "quick.4": "4종",
      "quick.6": "6종",
      "quick.8": "8종",
      "input.globalGroups": "글로벌 조",
      "input.universityGroups": "대학 조",
      "input.groupSize": "조당 학생 수",
      "input.eventHeadcount": "전체 참여 인원",
      "input.exchangeThreshold": "교환 완료 기준 시간",
      "input.completionGoal": "완료 목표 이름 수",
      "input.simulationSpeed": "시뮬레이션 속도",
      "action.start": "시작",
      "action.pause": "일시정지",
      "action.reset": "초기화",
      "formula.eyebrow": "만남 확률 공식",
      "formula.text": "(같은 동물 전체 인원 - 8) / 262",
      "state.running": "실행 중",
      "state.paused": "정지",
      "stats.completed": "완료 학생",
      "stats.averageStickers": "평균 스티커 수",
      "stats.validMeetings": "유효 만남 비율",
      "stats.exchanges": "교환 횟수",
      "graph.title": "상태 추이",
      "graph.open": "열기",
      "graph.close": "접기",
      "graph.collecting": "수집 중",
      "graph.helping": "도움 대기",
      "graph.exited": "퇴장",
      "panel.animalStatus": "동물별 조 현황",
      "panel.collapse": "접기",
      "panel.open": "열기",
      "supply.title": "상세정보",
      "supply.open": "열기",
      "supply.close": "접기",
      "supply.given": "교환 건수",
      "supply.blocked": "스티커 부족한 학생",
      "input.stickersPerPerson": "1인당 스티커 수",
      "solution.eyebrow": "최적 편성",
      "solution.groupsPerSpecies": "동물별 조 수",
      "solution.peoplePerSpecies": "동물별 인원",
      "solution.eligibleProbability": "유효 만남 확률",
      "solution.oneSpecies": "1종 편성: 모든 조가 하나의 동물에 배정됨",
      "solution.multiSpecies": "{species}종 편성: 동물마다 {groups}",
      "species.global": "글로벌",
      "species.university": "대학",
      "species.people": "인원",
      "species.formula": "공식",
      "unit.group": "조",
      "unit.groups": "조",
      "unit.person": "명",
      "unit.people": "명"
    },
    en: {
      "document.title": "Samsung Leadership Camp Grouping Simulator | DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "event.name": "DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "topbar.camp": "Samsung Leadership Camp",
      "topbar.attendees": "270 attendees",
      "lang.toggle": "한국어",
      "hero.eyebrow": "DREAM FOREST FESTIVAL 한 여름밤의 꿈",
      "hero.title": "Animal grouping calculator and exchange simulator",
      "hero.description": "Balance global and university scholar groups by animal species, then simulate how students can collect 10 different name stickers in the festival crowd.",
      "planner.eyebrow": "Planner",
      "planner.title": "Camp inputs",
      "input.species": "Total animal species",
      "quick.4": "4 species",
      "quick.6": "6 species",
      "quick.8": "8 species",
      "input.globalGroups": "Global groups",
      "input.universityGroups": "University groups",
      "input.groupSize": "Students per group",
      "input.eventHeadcount": "Event headcount",
      "input.exchangeThreshold": "Exchange threshold",
      "input.completionGoal": "Completion goal",
      "input.simulationSpeed": "Simulation speed",
      "action.start": "Start",
      "action.pause": "Pause",
      "action.reset": "Reset",
      "formula.eyebrow": "Encounter formula",
      "formula.text": "(same-species people - 8) / 262",
      "state.running": "Running",
      "state.paused": "Paused",
      "stats.completed": "Completed",
      "stats.averageStickers": "Average stickers",
      "stats.validMeetings": "Valid meetings",
      "stats.exchanges": "Exchanges",
      "graph.title": "Status trend",
      "graph.open": "Open",
      "graph.close": "Close",
      "graph.collecting": "Collecting",
      "graph.helping": "Waiting to help",
      "graph.exited": "Exited",
      "panel.animalStatus": "Animal group status",
      "panel.collapse": "Collapse",
      "panel.open": "Open",
      "input.stickersPerPerson": "Stickers per person",
      "supply.title": "Sticker supply",
      "supply.open": "Open",
      "supply.close": "Close",
      "supply.given": "Stickers given",
      "supply.blocked": "Blocked by supply",
      "solution.eyebrow": "Optimal grouping",
      "solution.groupsPerSpecies": "Groups per species",
      "solution.peoplePerSpecies": "People per species",
      "solution.eligibleProbability": "Eligible encounter probability",
      "solution.oneSpecies": "1 species concentrates every group into one animal",
      "solution.multiSpecies": "{species} species gives {groups} per animal",
      "species.global": "Global",
      "species.university": "University",
      "species.people": "People",
      "species.formula": "Formula",
      "unit.group": "group",
      "unit.groups": "groups",
      "unit.person": "person",
      "unit.people": "people"
    }
  };

  let currentLang = localStorage.getItem("samsungCampLang") || "ko";
  if (!Object.prototype.hasOwnProperty.call(TRANSLATIONS, currentLang)) currentLang = "ko";

  const SPECIES_NAMES = {
    ko: [
      "달빛 사슴",
      "랜턴 여우",
      "세이지 부엉이",
      "황혼 토끼",
      "들꽃 나방",
      "숲의 수사슴",
      "버섯 스라소니",
      "초승달 다람쥐"
    ],
    en: [
      "Moon Deer",
      "Lantern Fox",
      "Sage Owl",
      "Twilight Hare",
      "Wildflower Moth",
      "Forest Stag",
      "Mushroom Lynx",
      "Crescent Squirrel"
    ]
  };

  const SPECIES_COLORS = [
    "#ebc888",
    "#86a17d",
    "#b79ccb",
    "#6d7ba8",
    "#f1d99b",
    "#64b097",
    "#d69bc7",
    "#a8c982"
  ];

  const BEHAVIOR_PROFILES = {
    seeker: {
      weight: 0.28,
      scanRadius: [132, 205],
      scanCooldown: [0.55, 1.6],
      patience: [2.2, 5.2],
      maxSpeed: 54,
      steer: 96,
      exchangeFactor: [0.78, 1.18],
      zonePull: 0.28,
      groupPull: 0.03
    },
    wanderer: {
      weight: 0.25,
      scanRadius: [0, 0],
      scanCooldown: [Infinity, Infinity],
      patience: [0, 0],
      maxSpeed: 40,
      steer: 0,
      exchangeFactor: [0.95, 1.45],
      zonePull: 0.2,
      groupPull: 0.04
    },
    social: {
      weight: 0.2,
      scanRadius: [76, 126],
      scanCooldown: [1.4, 3.4],
      patience: [1.2, 2.8],
      maxSpeed: 34,
      steer: 44,
      exchangeFactor: [1.0, 1.7],
      zonePull: 0.12,
      groupPull: 0.34
    },
    shy: {
      weight: 0.15,
      scanRadius: [58, 104],
      scanCooldown: [2.6, 5.8],
      patience: [0.8, 2.2],
      maxSpeed: 29,
      steer: 30,
      exchangeFactor: [1.45, 2.35],
      zonePull: 0.08,
      groupPull: 0.2
    },
    hyper: {
      weight: 0.12,
      scanRadius: [175, 255],
      scanCooldown: [0.25, 0.9],
      patience: [1.7, 3.6],
      maxSpeed: 68,
      steer: 126,
      exchangeFactor: [0.52, 0.95],
      zonePull: 0.36,
      groupPull: 0.02
    },
    ambient: {
      weight: 0,
      scanRadius: [0, 0],
      scanCooldown: [Infinity, Infinity],
      patience: [0, 0],
      maxSpeed: 26,
      steer: 0,
      exchangeFactor: [1, 1],
      zonePull: 0.16,
      groupPull: 0
    }
  };

  const VENUE_ZONES = [
    { x: 0.25, y: 0.25, radius: 82, pull: 20, label: "lantern" },
    { x: 0.72, y: 0.29, radius: 94, pull: 24, label: "music" },
    { x: 0.42, y: 0.74, radius: 88, pull: 18, label: "food" },
    { x: 0.78, y: 0.72, radius: 78, pull: 16, label: "photo" }
  ];

  const HUMAN_TRAITS = {
    seeker: {
      awareness: [0.76, 1.12],
      stamina: [0.82, 1.12],
      anxiety: [0.06, 0.18],
      fear: [0.04, 0.14]
    },
    wanderer: {
      awareness: [0.46, 0.78],
      stamina: [0.86, 1.18],
      anxiety: [0.04, 0.14],
      fear: [0.03, 0.12]
    },
    social: {
      awareness: [0.56, 0.88],
      stamina: [0.78, 1.06],
      anxiety: [0.08, 0.2],
      fear: [0.04, 0.16]
    },
    shy: {
      awareness: [0.42, 0.74],
      stamina: [0.62, 0.94],
      anxiety: [0.18, 0.36],
      fear: [0.16, 0.34]
    },
    hyper: {
      awareness: [0.72, 1.08],
      stamina: [0.94, 1.26],
      anxiety: [0.02, 0.12],
      fear: [0.02, 0.1]
    },
    ambient: {
      awareness: [0.32, 0.62],
      stamina: [0.72, 1.02],
      anxiety: [0.02, 0.1],
      fear: [0.02, 0.1]
    }
  };

  const els = {
    languageToggle: document.getElementById("languageToggle"),
    speciesCount: document.getElementById("speciesCount"),
    speciesValue: document.getElementById("speciesValue"),
    exchangeSeconds: document.getElementById("exchangeSeconds"),
    exchangeSecondsValue: document.getElementById("exchangeSecondsValue"),
    completionGoal: document.getElementById("completionGoal"),
    completionGoalValue: document.getElementById("completionGoalValue"),
    stickersPerPerson: document.getElementById("stickersPerPerson"),
    stickersPerPersonValue: document.getElementById("stickersPerPersonValue"),
    speedMultiplier: document.getElementById("speedMultiplier"),
    speedValue: document.getElementById("speedValue"),
    toggleSimulation: document.getElementById("toggleSimulation"),
    resetSimulation: document.getElementById("resetSimulation"),
    globalGroupCount: document.getElementById("globalGroupCount"),
    universityGroupCount: document.getElementById("universityGroupCount"),
    groupSize: document.getElementById("groupSize"),
    eventHeadcount: document.getElementById("eventHeadcount"),
    formulaText: document.getElementById("formulaText"),
    elapsedTime: document.getElementById("elapsedTime"),
    runState: document.getElementById("runState"),
    completedStudents: document.getElementById("completedStudents"),
    averageStickers: document.getElementById("averageStickers"),
    validMeetingRate: document.getElementById("validMeetingRate"),
    exchangeCount: document.getElementById("exchangeCount"),
    statusGraphToggle: document.getElementById("statusGraphToggle"),
    statusGraphState: document.getElementById("statusGraphState"),
    statusGraphPanel: document.getElementById("statusGraphPanel"),
    statusAreaChart: document.getElementById("statusAreaChart"),
    statusCollectingCount: document.getElementById("statusCollectingCount"),
    statusHelpingCount: document.getElementById("statusHelpingCount"),
    statusExitedCount: document.getElementById("statusExitedCount"),
    animalStatusPanel: document.getElementById("animalStatusPanel"),
    animalPanelToggle: document.getElementById("animalPanelToggle"),
    animalPanelToggleLabel: document.getElementById("animalPanelToggleLabel"),
    animalPanelBody: document.getElementById("animalPanelBody"),
    animalStatusContent: document.getElementById("animalStatusContent"),
    supplyMetricsToggle: document.getElementById("supplyMetricsToggle"),
    supplyMetricsState: document.getElementById("supplyMetricsState"),
    supplyMetricsPanel: document.getElementById("supplyMetricsPanel"),
    stickersGivenTotal: document.getElementById("stickersGivenTotal"),
    blockedByStickerSupply: document.getElementById("blockedByStickerSupply"),
    canvas: document.getElementById("festivalCanvas"),
    solutionHeadline: document.getElementById("solutionHeadline"),
    groupRange: document.getElementById("groupRange"),
    peopleRange: document.getElementById("peopleRange"),
    probabilityRange: document.getElementById("probabilityRange"),
    globalPattern: document.getElementById("globalPattern"),
    universityPattern: document.getElementById("universityPattern"),
    speciesRows: document.getElementById("speciesRows")
  };

  const ctx = els.canvas.getContext("2d");
  const chartCtx = els.statusAreaChart?.getContext("2d");
  const state = {
    plan: null,
    running: false,
    time: 0,
    lastFrame: null,
    width: 1200,
    height: 780,
    students: [],
    contacts: new Map(),
    flashes: [],
    lanterns: [],
    contactStarts: 0,
    validContactStarts: 0,
    exchangeCount: 0,
    stickersGivenTotal: 0,
    blockedByStickerSupply: 0,
    statusHistory: [],
    lastStatusSample: -Infinity,
    statusGraphOpen: false,
    animalPanelOpen: true,
    supplyMetricsOpen: false
  };

  function t(key, replacements = {}) {
    const dictionary = TRANSLATIONS[currentLang] || TRANSLATIONS.ko;
    const fallback = TRANSLATIONS.ko[key] || key;
    return (dictionary[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => (
      Object.prototype.hasOwnProperty.call(replacements, name) ? replacements[name] : `{${name}}`
    ));
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.title = t("document.title");
    document.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    if (els.languageToggle) {
      els.languageToggle.setAttribute(
        "aria-label",
        currentLang === "ko" ? "영어로 전환" : "Switch to Korean"
      );
    }
    updateStatusGraphToggle();
    updateSupplyMetricsToggle();
    updateAnimalPanelToggle();
    drawStatusChart();
  }

  function getSpeciesName(index) {
    const names = SPECIES_NAMES[currentLang] || SPECIES_NAMES.ko;
    return names[index] || (currentLang === "ko" ? `동물 ${index + 1}` : `Species ${index + 1}`);
  }

  function balancedCounts(total, slots) {
    const base = Math.floor(total / slots);
    const remainder = total % slots;
    return Array.from({ length: slots }, (_, index) => (
      index >= slots - remainder ? base + 1 : base
    ));
  }

  function buildPlan(speciesCount) {
    const global = balancedCounts(CONFIG.globalGroups, speciesCount);
    const universityBase = balancedCounts(CONFIG.universityGroups, speciesCount);
    const globalVaries = new Set(global).size > 1;
    const university = globalVaries ? [...universityBase].reverse() : universityBase;
    const denominator = CONFIG.eventHeadcount - CONFIG.groupSize;

    const species = global.map((globalGroups, index) => {
      const universityGroups = university[index];
      const totalGroups = globalGroups + universityGroups;
      const people = totalGroups * CONFIG.groupSize;
      const eligiblePeople = people - CONFIG.groupSize;
      const probability = eligiblePeople / denominator;
      return {
        index,
        color: SPECIES_COLORS[index % SPECIES_COLORS.length],
        globalGroups,
        universityGroups,
        totalGroups,
        people,
        eligiblePeople,
        probability
      };
    });

    return {
      speciesCount,
      global,
      university,
      species,
      groupedPlayers: (CONFIG.globalGroups + CONFIG.universityGroups) * CONFIG.groupSize,
      ambientAttendees: Math.max(0, CONFIG.eventHeadcount - ((CONFIG.globalGroups + CONFIG.universityGroups) * CONFIG.groupSize))
    };
  }

  function formatPercent(value) {
    return `${(value * 100).toFixed(1)}%`;
  }

  function formatUnit(value, singularKey, pluralKey) {
    const key = value === 1 ? singularKey : pluralKey;
    const unit = t(key);
    return currentLang === "ko" ? `${value}${unit}` : `${value} ${unit}`;
  }

  function formatRange(values, singularKey, pluralKey) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (min === max) return formatUnit(min, singularKey, pluralKey);
    const unit = t(pluralKey);
    return currentLang === "ko" ? `${min}-${max}${unit}` : `${min}-${max} ${unit}`;
  }

  function formatDecimalRange(values) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? formatPercent(min) : `${formatPercent(min)} - ${formatPercent(max)}`;
  }

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
    const secs = (safeSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function formatExchangeSeconds(seconds) {
    const value = Number(seconds);
    if (value >= CONFIG.maxExchangeSeconds) {
      return currentLang === "ko" ? "1분" : "1 min";
    }
    return `${value.toFixed(1)}s`;
  }

  function updateExchangeSecondsUI() {
    els.exchangeSecondsValue.textContent = formatExchangeSeconds(els.exchangeSeconds.value);
  }

  function formatCompletionGoal(value) {
    const goal = Math.max(CONFIG.minCompletionGoal, Math.min(CONFIG.maxCompletionGoal, Number(value)));
    return currentLang === "ko" ? `${goal}명` : `${goal} names`;
  }

  function formatStickersPerPerson(value) {
    const count = Math.max(CONFIG.minStickersPerPerson, Math.min(CONFIG.maxStickersPerPerson, Number(value)));
    return currentLang === "ko" ? `${count}개` : `${count}`;
  }

  function updateStickersPerPersonUI() {
    CONFIG.stickersPerPerson = Math.max(
      CONFIG.minStickersPerPerson,
      Math.min(CONFIG.maxStickersPerPerson, Number(els.stickersPerPerson.value))
    );
    els.stickersPerPerson.value = CONFIG.stickersPerPerson;
    els.stickersPerPersonValue.textContent = formatStickersPerPerson(CONFIG.stickersPerPerson);
  }

  function updateCompletionGoalUI() {
    CONFIG.targetStickers = Math.max(
      CONFIG.minCompletionGoal,
      Math.min(CONFIG.maxCompletionGoal, Number(els.completionGoal.value))
    );
    els.completionGoal.value = CONFIG.targetStickers;
    els.completionGoalValue.textContent = formatCompletionGoal(CONFIG.targetStickers);
  }

  function statusCounts() {
    const counts = {
      collecting: 0,
      helping: 0,
      exited: 0,
      total: 0
    };

    for (const student of state.students) {
      if (student.ambient) continue;
      counts.total += 1;
      if (student.status === "exited") counts.exited += 1;
      else if (student.status === "helping") counts.helping += 1;
      else counts.collecting += 1;
    }

    return counts;
  }

  function updateStatusCountLabels(counts = statusCounts()) {
    if (els.statusCollectingCount) els.statusCollectingCount.textContent = counts.collecting.toString();
    if (els.statusHelpingCount) els.statusHelpingCount.textContent = counts.helping.toString();
    if (els.statusExitedCount) els.statusExitedCount.textContent = counts.exited.toString();
  }

  function sampleStatusHistory(force = false) {
    if (!state.students.length) return;
    if (!force && state.time - state.lastStatusSample < CONFIG.statusSampleInterval) return;
    const counts = statusCounts();
    state.statusHistory.push({
      time: state.time,
      collecting: counts.collecting,
      helping: counts.helping,
      exited: counts.exited,
      total: counts.total
    });
    while (state.statusHistory.length > CONFIG.statusHistoryLimit) state.statusHistory.shift();
    state.lastStatusSample = state.time;
    drawStatusChart();
  }

  function updateStatusGraphToggle() {
    if (!els.statusGraphToggle || !els.statusGraphPanel || !els.statusGraphState) return;
    els.statusGraphToggle.setAttribute("aria-expanded", String(state.statusGraphOpen));
    els.statusGraphPanel.hidden = !state.statusGraphOpen;
    const key = state.statusGraphOpen ? "graph.close" : "graph.open";
    els.statusGraphState.dataset.i18n = key;
    els.statusGraphState.textContent = t(key);
  }

  function updateSupplyMetricsToggle() {
    if (!els.supplyMetricsToggle || !els.supplyMetricsPanel || !els.supplyMetricsState) return;
    els.supplyMetricsToggle.setAttribute("aria-expanded", String(state.supplyMetricsOpen));
    els.supplyMetricsPanel.hidden = !state.supplyMetricsOpen;
    const key = state.supplyMetricsOpen ? "supply.close" : "supply.open";
    els.supplyMetricsState.dataset.i18n = key;
    els.supplyMetricsState.textContent = t(key);
  }

  function updateSupplyMetrics() {
    if (!els.supplyMetricsPanel) return;
    els.stickersGivenTotal.textContent = state.stickersGivenTotal.toString();
    els.blockedByStickerSupply.textContent = state.blockedByStickerSupply.toString();
  }

  function updateAnimalPanelToggle() {
    if (!els.animalPanelToggle || !els.animalPanelBody || !els.animalPanelToggleLabel) return;
    els.animalPanelToggle.setAttribute("aria-expanded", String(state.animalPanelOpen));
    els.animalPanelBody.hidden = !state.animalPanelOpen;
    els.animalStatusPanel.setAttribute("data-collapsed", String(!state.animalPanelOpen));
    const simLayout = document.querySelector(".sim-layout");
    if (simLayout) {
      simLayout.classList.toggle("sim-layout--panel-collapsed", !state.animalPanelOpen);
    }
    const key = state.animalPanelOpen ? "panel.collapse" : "panel.open";
    els.animalPanelToggleLabel.dataset.i18n = key;
    els.animalPanelToggleLabel.textContent = t(key);
  }

  function drawStatusChart() {
    if (!chartCtx || !els.statusAreaChart || !state.statusHistory.length || els.statusGraphPanel?.hidden) return;
    const rect = els.statusAreaChart.getBoundingClientRect();
    const width = Math.max(320, rect.width || 900);
    const height = Math.max(220, rect.height || 280);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.statusAreaChart.width = Math.round(width * dpr);
    els.statusAreaChart.height = Math.round(height * dpr);
    chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    chartCtx.clearRect(0, 0, width, height);

    const history = state.statusHistory.length === 1
      ? [state.statusHistory[0], state.statusHistory[0]]
      : state.statusHistory;
    const latest = state.statusHistory[state.statusHistory.length - 1];
    const total = Math.max(1, latest.total, ...history.map(point => point.total));
    const left = 46;
    const right = 18;
    const top = 20;
    const bottom = 34;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const xFor = index => left + (history.length === 1 ? plotWidth : (index / (history.length - 1)) * plotWidth);
    const yFor = value => top + plotHeight - (value / total) * plotHeight;

    const background = chartCtx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "rgba(13, 19, 38, 0.96)");
    background.addColorStop(0.55, "rgba(16, 45, 39, 0.88)");
    background.addColorStop(1, "rgba(8, 19, 31, 0.96)");
    chartCtx.fillStyle = background;
    chartCtx.fillRect(0, 0, width, height);

    chartCtx.save();
    chartCtx.strokeStyle = "rgba(247, 236, 209, 0.12)";
    chartCtx.fillStyle = "rgba(247, 236, 209, 0.58)";
    chartCtx.font = "11px Inter, system-ui, sans-serif";
    chartCtx.textBaseline = "middle";
    for (let tick = 0; tick <= 4; tick += 1) {
      const value = Math.round((total * tick) / 4);
      const y = yFor(value);
      chartCtx.beginPath();
      chartCtx.moveTo(left, y);
      chartCtx.lineTo(width - right, y);
      chartCtx.stroke();
      chartCtx.fillText(value.toString(), 10, y);
    }
    chartCtx.restore();

    function drawStack(lowerFor, upperFor, topColor, bottomColor, strokeColor) {
      const fill = chartCtx.createLinearGradient(0, top, 0, height - bottom);
      fill.addColorStop(0, topColor);
      fill.addColorStop(1, bottomColor);

      chartCtx.beginPath();
      history.forEach((point, index) => {
        const x = xFor(index);
        const y = yFor(upperFor(point));
        if (index === 0) chartCtx.moveTo(x, y);
        else chartCtx.lineTo(x, y);
      });
      for (let index = history.length - 1; index >= 0; index -= 1) {
        chartCtx.lineTo(xFor(index), yFor(lowerFor(history[index])));
      }
      chartCtx.closePath();
      chartCtx.fillStyle = fill;
      chartCtx.fill();

      chartCtx.beginPath();
      history.forEach((point, index) => {
        const x = xFor(index);
        const y = yFor(upperFor(point));
        if (index === 0) chartCtx.moveTo(x, y);
        else chartCtx.lineTo(x, y);
      });
      chartCtx.strokeStyle = strokeColor;
      chartCtx.lineWidth = 1.3;
      chartCtx.stroke();
    }

    drawStack(
      () => 0,
      point => point.collecting,
      "rgba(134, 161, 125, 0.74)",
      "rgba(134, 161, 125, 0.38)",
      "rgba(180, 213, 166, 0.9)"
    );
    drawStack(
      point => point.collecting,
      point => point.collecting + point.helping,
      "rgba(235, 200, 136, 0.78)",
      "rgba(235, 200, 136, 0.42)",
      "rgba(255, 223, 152, 0.95)"
    );
    drawStack(
      point => point.collecting + point.helping,
      point => point.collecting + point.helping + point.exited,
      "rgba(183, 156, 203, 0.78)",
      "rgba(183, 156, 203, 0.36)",
      "rgba(218, 191, 235, 0.9)"
    );

    chartCtx.save();
    chartCtx.fillStyle = "rgba(247, 236, 209, 0.66)";
    chartCtx.font = "11px Inter, system-ui, sans-serif";
    chartCtx.textBaseline = "alphabetic";
    chartCtx.fillText(formatTime(history[0].time), left, height - 10);
    const lastLabel = formatTime(latest.time);
    chartCtx.textAlign = "right";
    chartCtx.fillText(lastLabel, width - right, height - 10);
    chartCtx.restore();
  }

  function updatePlanUI() {
    const plan = state.plan;
    const groups = plan.species.map(item => item.totalGroups);
    const people = plan.species.map(item => item.people);
    const probabilities = plan.species.map(item => item.probability);
    const minGroups = Math.min(...groups);
    const maxGroups = Math.max(...groups);

    els.speciesValue.textContent = plan.speciesCount;
    els.globalGroupCount.textContent = CONFIG.globalGroups;
    els.universityGroupCount.textContent = CONFIG.universityGroups;
    els.groupSize.textContent = CONFIG.groupSize;
    els.eventHeadcount.textContent = CONFIG.eventHeadcount;
    els.formulaText.textContent = t("formula.text");
    els.solutionHeadline.textContent = plan.speciesCount === 1
      ? t("solution.oneSpecies")
      : t("solution.multiSpecies", {
          species: plan.speciesCount,
          groups: minGroups === maxGroups
            ? formatUnit(minGroups, "unit.group", "unit.groups")
            : formatRange(groups, "unit.group", "unit.groups")
        });
    els.groupRange.textContent = formatRange(groups, "unit.group", "unit.groups");
    els.peopleRange.textContent = formatRange(people, "unit.person", "unit.people");
    els.probabilityRange.textContent = formatDecimalRange(probabilities);
    els.globalPattern.textContent = plan.global.join(" + ");
    els.universityPattern.textContent = plan.university.join(" + ");

    els.speciesRows.innerHTML = plan.species.map(item => `
      <article class="species-row">
        <div class="species-row__top">
          <div class="species-name">
            <i class="species-dot" style="background:${item.color}"></i>
            <strong>${getSpeciesName(item.index)}</strong>
          </div>
          <div class="species-total">${formatUnit(item.totalGroups, "unit.group", "unit.groups")}</div>
        </div>
        <div class="species-row__metrics">
          <div><span>${t("species.global")}</span><strong>${item.globalGroups}</strong></div>
          <div><span>${t("species.university")}</span><strong>${item.universityGroups}</strong></div>
          <div><span>${t("species.people")}</span><strong>${item.people}</strong></div>
          <div><span>${t("species.formula")}</span><strong>${formatPercent(item.probability)}</strong></div>
        </div>
        <div class="probability-track" aria-hidden="true">
          <i style="width:${Math.min(100, item.probability * 420)}%"></i>
        </div>
      </article>
    `).join("");
  }

  function resizeCanvas() {
    const rect = els.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = rect.width || 1200;
    state.height = rect.height || 560;
    els.canvas.width = Math.round(state.width * dpr);
    els.canvas.height = Math.round(state.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
    drawStatusChart();
  }

  function bounds() {
    return {
      cx: state.width / 2,
      cy: state.height / 2,
      radius: Math.min(state.width, state.height) * 0.43
    };
  }

  function randomPointInMeadow() {
    const meadow = bounds();
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * meadow.radius * 0.9;
    return {
      x: meadow.cx + Math.cos(angle) * radius,
      y: meadow.cy + Math.sin(angle) * radius
    };
  }

  function pointNearInMeadow(origin, spread) {
    const meadow = bounds();
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * spread;
    const point = {
      x: origin.x + Math.cos(angle) * radius,
      y: origin.y + Math.sin(angle) * radius
    };
    const dx = point.x - meadow.cx;
    const dy = point.y - meadow.cy;
    const distance = Math.hypot(dx, dy) || 1;
    const limit = meadow.radius * 0.92;
    if (distance <= limit) return point;
    return {
      x: meadow.cx + (dx / distance) * limit,
      y: meadow.cy + (dy / distance) * limit
    };
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomFromRange(range) {
    if (range[0] === Infinity) return Infinity;
    return randomRange(range[0], range[1]);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function chooseBehavior() {
    const roll = Math.random();
    let cumulative = 0;
    for (const [behavior, profile] of Object.entries(BEHAVIOR_PROFILES)) {
      if (behavior === "ambient") continue;
      cumulative += profile.weight;
      if (roll <= cumulative) return behavior;
    }
    return "wanderer";
  }

  function profileFor(student) {
    return BEHAVIOR_PROFILES[student.behavior] || BEHAVIOR_PROFILES.wanderer;
  }

  function traitForBehavior(behavior) {
    return HUMAN_TRAITS[behavior] || HUMAN_TRAITS.wanderer;
  }

  function attentionFactor(student) {
    return clamp(
      student.awareness * (1 - student.anxiety * 0.38) * (1 - student.fatigue * 0.28),
      0.28,
      1.18
    );
  }

  function humanSpeedFactor(student) {
    return clamp(
      (1 - student.fatigue * 0.48) * (1 - student.anxiety * 0.28) * (1 - student.fear * 0.2),
      0.34,
      1.1
    );
  }

  function updateHumanState(student, crowdContext, seconds, currentSpeed) {
    const crowdPressure = clamp(crowdContext.count / 10, 0, 1.6);
    const movementLoad = clamp(currentSpeed / Math.max(1, profileFor(student).maxSpeed), 0, 1.4);
    const nearGroup = crowdContext.groupCenter
      ? distanceBetween(student, crowdContext.groupCenter) < 46
      : false;
    const fatigueGain = seconds * (0.004 + movementLoad * 0.012) / Math.max(0.45, student.stamina);
    const fatigueRecovery = seconds * (nearGroup ? 0.009 : 0.003);
    student.fatigue = clamp(student.fatigue + fatigueGain - fatigueRecovery, 0, 1);

    const anxietyGain = seconds * ((crowdPressure * student.fear * 0.026) + (student.fatigue * 0.006));
    const anxietyRecovery = seconds * (nearGroup ? 0.022 : 0.008);
    student.anxiety = clamp(student.anxiety + anxietyGain - anxietyRecovery, 0, 1);

    const fearDrift = seconds * (crowdContext.count > 9 ? 0.012 : -0.004);
    student.fear = clamp(student.fear + fearDrift, 0, 1);
  }

  function canScan(student) {
    return !student.ambient && student.status === "collecting" && profileFor(student).scanRadius[1] > 0;
  }

  function effectiveScanRadius(student, crowdContext = null) {
    if (!canScan(student)) return 0;
    const visibility = crowdContext?.visibilityFactor ?? student.visibilityFactor ?? 1;
    return Math.min(
      Math.min(state.width, state.height) * 0.36,
      (student.scanRadius + student.stickers.size * 6) * visibility * attentionFactor(student)
    );
  }

  function remembersToAvoid(student, candidateId) {
    return (student.recentAvoid?.get(candidateId) || 0) > state.time;
  }

  function rememberAvoid(student, candidateId, duration = randomRange(3.5, 9)) {
    if (!student.recentAvoid || candidateId == null) return;
    student.recentAvoid.set(candidateId, state.time + duration);
  }

  function pruneRecentAvoid(student) {
    if (!student.recentAvoid || student.recentAvoid.size === 0) return;
    for (const [candidateId, expiresAt] of student.recentAvoid) {
      if (expiresAt <= state.time) student.recentAvoid.delete(candidateId);
    }
  }

  function distanceBetween(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function venueZonePoint(zone) {
    return {
      x: state.width * zone.x,
      y: state.height * zone.y,
      radius: zone.radius,
      pull: zone.pull
    };
  }

  function getCrowdContext(student, approachId = null) {
    let count = 0;
    let repelX = 0;
    let repelY = 0;
    let groupX = 0;
    let groupY = 0;
    let groupCount = 0;

    for (const other of state.students) {
      if (other.id === student.id) continue;
      if (other.status === "exited") continue;
      const dx = student.x - other.x;
      const dy = student.y - other.y;
      const distance = Math.hypot(dx, dy) || 1;

      if (distance < CONFIG.crowdRadius) {
        count += 1;
        if (other.id !== approachId) {
          const personalSpaceForce = distance < CONFIG.personalSpace
            ? ((CONFIG.personalSpace - distance) / CONFIG.personalSpace) * 1.8
            : 0;
          const force = ((CONFIG.crowdRadius - distance) / CONFIG.crowdRadius) + personalSpaceForce;
          repelX += (dx / distance) * force;
          repelY += (dy / distance) * force;
        }
      }

      if (!student.ambient && other.groupId === student.groupId) {
        groupX += other.x;
        groupY += other.y;
        groupCount += 1;
      }
    }

    return {
      count,
      visibilityFactor: clamp(1 - count * 0.045, 0.42, 1),
      speedFactor: clamp(1 - count * 0.035, 0.48, 1),
      repelX,
      repelY,
      groupCenter: groupCount ? { x: groupX / groupCount, y: groupY / groupCount } : null
    };
  }

  function exchangeKey(a, b) {
    return a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
  }

  function isEngaged(student) {
    return student.engagedWith !== null && student.engagedWith !== undefined;
  }

  function isAvailableForExchange(student, partnerId) {
    return !isEngaged(student) || student.engagedWith === partnerId;
  }

  function engagePair(a, b, key) {
    a.engagedWith = b.id;
    b.engagedWith = a.id;
    a.engagedKey = key;
    b.engagedKey = key;
    a.targetId = b.id;
    b.targetId = a.id;
    a.vx = 0;
    a.vy = 0;
    b.vx = 0;
    b.vy = 0;
  }

  function releasePair(a, b) {
    if (a?.engagedWith === b?.id) {
      a.engagedWith = null;
      a.engagedKey = null;
      a.targetId = null;
    }
    if (b?.engagedWith === a?.id) {
      b.engagedWith = null;
      b.engagedKey = null;
      b.targetId = null;
    }
  }

  function resetSimulation() {
    const plan = state.plan;
    let id = 0;
    let groupSerial = 1;
    state.students = [];
    state.contacts = new Map();
    state.flashes = [];
    state.contactStarts = 0;
    state.validContactStarts = 0;
    state.exchangeCount = 0;
    state.stickersGivenTotal = 0;
    state.blockedByStickerSupply = 0;
    state.statusHistory = [];
    state.lastStatusSample = -Infinity;
    state.time = 0;
    state.running = false;
    state.lastFrame = null;
    els.toggleSimulation.textContent = t("action.start");
    els.runState.textContent = t("state.paused");

    function addStudent(speciesIndex, groupId, program, color, ambient = false, groupAnchor = null) {
      const behavior = ambient ? "ambient" : chooseBehavior();
      const profile = BEHAVIOR_PROFILES[behavior];
      const traits = traitForBehavior(behavior);
      const spread = ambient ? 0 : behavior === "social" ? 24 : 42;
      const point = groupAnchor ? pointNearInMeadow(groupAnchor, spread) : randomPointInMeadow();
      const angle = Math.random() * Math.PI * 2;
      const speed = ambient ? randomRange(6, 14) : randomRange(8, profile.maxSpeed * 0.46);
      const scans = !ambient && profile.scanRadius[1] > 0;
      state.students.push({
        id: id,
        speciesIndex,
        groupId,
        program,
        color,
        ambient,
        behavior,
        intelligent: scans,
        targetId: null,
        engagedWith: null,
        engagedKey: null,
        scanCooldown: scans ? randomFromRange(profile.scanCooldown) : Infinity,
        scanPulse: 0,
        focusTimer: 0,
        scanRadius: scans ? randomFromRange(profile.scanRadius) : 0,
        patience: scans ? randomFromRange(profile.patience) : 0,
        exchangeFactor: randomFromRange(profile.exchangeFactor),
        awareness: randomFromRange(traits.awareness),
        stamina: randomFromRange(traits.stamina),
        anxiety: randomFromRange(traits.anxiety),
        fear: randomFromRange(traits.fear),
        fatigue: 0,
        zoneIndex: Math.floor(Math.random() * VENUE_ZONES.length),
        zoneTimer: randomRange(5, 18),
        homeX: groupAnchor?.x ?? point.x,
        homeY: groupAnchor?.y ?? point.y,
        crowdCount: 0,
        visibilityFactor: 1,
        x: point.x,
        y: point.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        recentAvoid: new Map(),
        stickers: new Set(),
        givenStickers: new Set(),
        status: ambient ? "ambient" : "collecting",
        helpTimer: 0,
        helpCount: 0,
        helperExitAfter: 0,
        complete: false,
        completeTime: null
      });
      id += 1;
    }

    function addGroups(speciesIndex, program, count) {
      const species = plan.species[speciesIndex];
      for (let group = 0; group < count; group += 1) {
        const groupId = `${program}-${groupSerial}`;
        const groupAnchor = randomPointInMeadow();
        groupSerial += 1;
        for (let seat = 0; seat < CONFIG.groupSize; seat += 1) {
          addStudent(speciesIndex, groupId, program, species.color, false, groupAnchor);
        }
      }
    }

    plan.species.forEach((species, index) => {
      addGroups(index, "global", species.globalGroups);
      addGroups(index, "university", species.universityGroups);
    });

    for (let extra = 0; extra < plan.ambientAttendees; extra += 1) {
      addStudent(-1, "ambient", "ambient", "rgba(247, 236, 209, 0.38)", true);
    }

    state.lanterns = Array.from({ length: 48 }, () => {
      const point = randomPointInMeadow();
      return {
        x: point.x,
        y: point.y,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2
      };
    });

    sampleStatusHistory(true);
    updateLiveStats();
    drawStatusChart();
    draw();
  }

  function canGive(student, receiverId) {
    return student.givenStickers.size < CONFIG.stickersPerPerson && !student.givenStickers.has(receiverId);
  }

  function canExchange(a, b) {
    if (a.ambient || b.ambient) return false;
    const aActive = a.status === "collecting" || a.status === "helping";
    const bActive = b.status === "collecting" || b.status === "helping";
    if (!aActive || !bActive) return false;
    if (a.status !== "collecting" && b.status !== "collecting") return false;
    if (a.speciesIndex !== b.speciesIndex) return false;
    if (a.groupId === b.groupId) return false;
    if (a.stickers.has(b.id) || b.stickers.has(a.id)) return false;
    return canGive(a, b.id) && canGive(b, a.id);
  }

  function wouldExchangeExceptSupply(a, b) {
    if (a.ambient || b.ambient) return false;
    const aActive = a.status === "collecting" || a.status === "helping";
    const bActive = b.status === "collecting" || b.status === "helping";
    if (!aActive || !bActive) return false;
    if (a.status !== "collecting" && b.status !== "collecting") return false;
    if (a.speciesIndex !== b.speciesIndex) return false;
    if (a.groupId === b.groupId) return false;
    if (a.stickers.has(b.id) || b.stickers.has(a.id)) return false;
    return true;
  }

  function canApproachStudent(seeker, candidate) {
    if (!candidate || candidate.id === seeker.id || seeker.status !== "collecting") return false;
    if (seeker.ambient || candidate.ambient) return false;
    if (candidate.status !== "collecting" && candidate.status !== "helping") return false;
    if (seeker.groupId === candidate.groupId) return false;
    if (isEngaged(seeker) || isEngaged(candidate)) return false;
    if (remembersToAvoid(seeker, candidate.id)) return false;
    if (seeker.speciesIndex === candidate.speciesIndex && seeker.stickers.has(candidate.id) && candidate.stickers.has(seeker.id)) return false;
    return true;
  }

  function canIneffectiveCheck(a, b) {
    if (a.ambient || b.ambient) return false;
    const aActive = a.status === "collecting" || a.status === "helping";
    const bActive = b.status === "collecting" || b.status === "helping";
    if (!aActive || !bActive) return false;
    if (a.status !== "collecting" && b.status !== "collecting") return false;
    if (a.groupId === b.groupId) return false;
    if (a.speciesIndex === b.speciesIndex) return false;
    if (remembersToAvoid(a, b.id) || remembersToAvoid(b, a.id)) return false;
    return true;
  }

  function getStudentById(id) {
    return state.students[id] && state.students[id].id === id
      ? state.students[id]
      : state.students.find(student => student.id === id);
  }

  function canTargetStudent(seeker, candidate) {
    return canApproachStudent(seeker, candidate);
  }

  function findTargetFor(seeker, crowdContext) {
    const scanRadius = effectiveScanRadius(seeker, crowdContext);
    const options = [];
    if (scanRadius <= 0) return null;

    for (const candidate of state.students) {
      if (!canTargetStudent(seeker, candidate)) continue;
      const distance = distanceBetween(seeker, candidate);
      if (distance > scanRadius) continue;
      const sightQuality = ((scanRadius - distance) / scanRadius) * attentionFactor(seeker);
      const noticingChance = clamp(0.08 + sightQuality * 0.86, 0.08, 0.94);
      if (Math.random() > noticingChance) continue;
      const sameSpecies = candidate.speciesIndex === seeker.speciesIndex;
      const misreadChance = clamp(
        0.32 + seeker.anxiety * 0.3 + seeker.fatigue * 0.2 + crowdContext.count * 0.016 - seeker.awareness * 0.24,
        0.04,
        0.62
      );
      if (!sameSpecies && Math.random() > misreadChance) continue;
      const progressBonus = sameSpecies && seeker.behavior === "hyper" ? Math.max(0, 16 - candidate.stickers.size) : 0;
      const shyPenalty = seeker.behavior === "shy" && distance > scanRadius * 0.62 ? 20 : 0;
      const speciesScore = sameSpecies ? 46 : (-18 + seeker.anxiety * 18 + seeker.fatigue * 10);
      const score = (scanRadius - distance) * noticingChance + speciesScore + progressBonus - shyPenalty + Math.random() * 24;
      options.push({ candidate, score });
    }

    if (!options.length) return null;
    options.sort((a, b) => b.score - a.score);
    return options[0].candidate;
  }

  function updateIntentions(seconds) {
    for (const student of state.students) {
      if (isEngaged(student)) {
        student.scanPulse = 0;
        student.scanCooldown = Math.max(student.scanCooldown, 0.2);
        continue;
      }

      if (!canScan(student)) {
        student.targetId = null;
        continue;
      }

      const profile = profileFor(student);
      const crowdContext = getCrowdContext(student);
      const scanRadius = effectiveScanRadius(student, crowdContext);
      pruneRecentAvoid(student);
      student.scanCooldown -= seconds;
      student.scanPulse = Math.max(0, student.scanPulse - seconds * 1.5);
      if (student.focusTimer > 0) student.focusTimer -= seconds;

      const target = getStudentById(student.targetId);
      const targetDistance = target ? distanceBetween(student, target) : Infinity;
      const leash = student.behavior === "hyper" ? 1.65 : 1.35;
      const losesFocus = target && Math.random() < seconds * student.anxiety * 0.075;
      const staleTarget = !canTargetStudent(student, target) || targetDistance > scanRadius * leash || student.focusTimer <= 0 || losesFocus;

      if (staleTarget) {
        if (target) rememberAvoid(student, target.id, student.behavior === "shy" ? randomRange(7, 14) : randomRange(2.5, 7));
        student.targetId = null;
      }

      if (!student.targetId && student.scanCooldown <= 0) {
        const nextTarget = findTargetFor(student, crowdContext);
        student.scanPulse = 1;
        student.scanCooldown = randomFromRange(profile.scanCooldown);
        if (nextTarget) {
          student.targetId = nextTarget.id;
          student.focusTimer = randomFromRange(profile.patience);
        }
      }
    }
  }

  function exchangeRequirement(a, b, baseSeconds) {
    const pairTempo = (randomRange(0.55, 1.45) + randomRange(0.55, 1.45)) / 2;
    const personalTempo = (a.exchangeFactor + b.exchangeFactor) / 2;
    const crowdDrag = 1 + Math.min(0.46, ((a.crowdCount || 0) + (b.crowdCount || 0)) * 0.012);
    const maxPairSeconds = Math.min(CONFIG.maxExchangeSeconds, baseSeconds * 2.85);
    const normalizedTempo = pairTempo
      * (personalTempo / CONFIG.exchangeBehaviorBaseline)
      * (crowdDrag / CONFIG.exchangeCrowdBaseline);
    return clamp(baseSeconds * normalizedTempo, baseSeconds * 0.35, maxPairSeconds);
  }

  function identityCheckRequirement(a, b, baseSeconds) {
    const confusionTempo = randomRange(0.12, 0.34);
    const stressDrag = 1 + ((a.anxiety + b.anxiety + a.fatigue + b.fatigue) / 4) * 0.35;
    const maxCheckSeconds = Math.max(0.18, Math.min(baseSeconds * 0.34, CONFIG.maxExchangeSeconds * 0.22));
    const minCheckSeconds = Math.min(maxCheckSeconds * 0.72, Math.max(0.12, baseSeconds * 0.08));
    return clamp(baseSeconds * confusionTempo * stressDrag, minCheckSeconds, maxCheckSeconds);
  }

  function helperExitQuota() {
    return Math.floor(randomRange(CONFIG.helperExitAfterRange[0], CONFIG.helperExitAfterRange[1] + 1));
  }

  function exitStudent(student) {
    if (!student || student.ambient || student.status === "exited") return;
    const partner = getStudentById(student.engagedWith);
    if (partner) releasePair(student, partner);
    student.status = "exited";
    student.targetId = null;
    student.engagedWith = null;
    student.engagedKey = null;
    student.vx = 0;
    student.vy = 0;
  }

  function updateHelperStates(seconds) {
    for (const student of state.students) {
      if (student.status !== "helping" || isEngaged(student)) continue;
      student.helpTimer -= seconds;
      if (student.helpTimer <= 0 || student.helpCount >= student.helperExitAfter) {
        exitStudent(student);
      }
    }
  }

  function recordCompletion(student) {
    if (student.ambient || student.status !== "collecting" || student.complete || student.stickers.size < CONFIG.targetStickers) return;
    student.complete = true;
    student.completeTime = state.time;
    student.status = "helping";
    student.helpTimer = randomRange(CONFIG.helperWaitSeconds[0], CONFIG.helperWaitSeconds[1]);
    student.helpCount = 0;
    student.helperExitAfter = helperExitQuota();
    student.targetId = null;
    student.scanPulse = 0;
  }

  function registerExchange(a, b) {
    const aWasHelping = a.status === "helping";
    const bWasHelping = b.status === "helping";

    a.stickers.add(b.id);
    b.stickers.add(a.id);
    a.givenStickers.add(b.id);
    b.givenStickers.add(a.id);

    state.stickersGivenTotal += 2;

    if (aWasHelping) a.helpCount += 1;
    if (bWasHelping) b.helpCount += 1;

    state.exchangeCount += 1;
    state.flashes.push({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
      color: a.color,
      life: 1
    });

    recordCompletion(a);
    recordCompletion(b);
  }

  function step(seconds) {
    const meadow = bounds();
    const contactRadius = Math.max(17, Math.min(state.width, state.height) * 0.032);
    const exchangeThreshold = Number(els.exchangeSeconds.value);
    updateHelperStates(seconds);
    updateIntentions(seconds);

    for (const student of state.students) {
      const profile = profileFor(student);
      if (student.status === "exited") {
        student.vx = 0;
        student.vy = 0;
        continue;
      }

      if (isEngaged(student)) {
        const exchangeCrowdContext = getCrowdContext(student, student.engagedWith);
        student.crowdCount = exchangeCrowdContext.count;
        student.visibilityFactor = exchangeCrowdContext.visibilityFactor;
        student.fatigue = clamp(student.fatigue - seconds * 0.012, 0, 1);
        student.anxiety = clamp(student.anxiety - seconds * 0.006 + exchangeCrowdContext.count * seconds * 0.001, 0, 1);
        student.vx = 0;
        student.vy = 0;
        continue;
      }

      const activeTarget = canScan(student) ? getStudentById(student.targetId) : null;
      const targetIsValid = activeTarget && canTargetStudent(student, activeTarget);
      const crowdContext = getCrowdContext(student, targetIsValid ? activeTarget.id : null);
      student.crowdCount = crowdContext.count;
      student.visibilityFactor = crowdContext.visibilityFactor;

      const drift = student.ambient ? 7 : student.behavior === "wanderer" ? 22 : student.behavior === "hyper" ? 18 : 12;
      student.vx += (Math.random() - 0.5) * drift * seconds;
      student.vy += (Math.random() - 0.5) * drift * seconds;
      student.vx += crowdContext.repelX * (student.ambient ? 42 : 116) * seconds;
      student.vy += crowdContext.repelY * (student.ambient ? 42 : 116) * seconds;

      let inBottleneck = false;
      student.zoneTimer -= seconds;
      if (student.zoneTimer <= 0 || !VENUE_ZONES[student.zoneIndex]) {
        student.zoneIndex = Math.floor(Math.random() * VENUE_ZONES.length);
        student.zoneTimer = randomRange(6, student.behavior === "hyper" ? 15 : 24);
      }

      const zone = venueZonePoint(VENUE_ZONES[student.zoneIndex]);
      const zoneDx = zone.x - student.x;
      const zoneDy = zone.y - student.y;
      const zoneDistance = Math.hypot(zoneDx, zoneDy) || 1;
      const zoneRange = zone.radius * 2.05;
      if (zoneDistance < zoneRange) {
        const zoneInfluence = (zoneRange - zoneDistance) / zoneRange;
        const zoneForce = zoneInfluence * zone.pull * profile.zonePull;
        if (zoneDistance > zone.radius * 0.45) {
          student.vx += (zoneDx / zoneDistance) * zoneForce * seconds;
          student.vy += (zoneDy / zoneDistance) * zoneForce * seconds;
        } else {
          inBottleneck = true;
          const linger = Math.max(0, 1 - seconds * (student.behavior === "hyper" ? 0.08 : 0.22));
          student.vx *= linger;
          student.vy *= linger;
        }
      }

      if (!student.ambient && profile.groupPull > 0) {
        const anchor = student.behavior === "social" && crowdContext.groupCenter
          ? crowdContext.groupCenter
          : { x: student.homeX, y: student.homeY };
        const groupDx = anchor.x - student.x;
        const groupDy = anchor.y - student.y;
        const groupDistance = Math.hypot(groupDx, groupDy) || 1;
        if (groupDistance > 18) {
          const pull = clamp(groupDistance / 110, 0.25, 1.2) * profile.groupPull * 78;
          student.vx += (groupDx / groupDistance) * pull * seconds;
          student.vy += (groupDy / groupDistance) * pull * seconds;
        }
      }

      const target = targetIsValid ? activeTarget : null;
      if (target) {
        const targetDx = target.x - student.x;
        const targetDy = target.y - student.y;
        const targetDistance = Math.hypot(targetDx, targetDy) || 1;
        const scanRadius = Math.max(1, effectiveScanRadius(student));
        const proximity = targetDistance < contactRadius * 2.4;
        const urgency = proximity ? 1.25 : clamp(targetDistance / scanRadius, 0.45, 1.35);
        const closingBonus = student.stickers.size >= CONFIG.targetStickers - 2 ? 1.18 : 1;
        const steering = profile.steer * urgency * closingBonus;
        student.vx += (targetDx / targetDistance) * steering * seconds;
        student.vy += (targetDy / targetDistance) * steering * seconds;
        if (proximity) {
          const pause = Math.max(0, 1 - seconds * 1.2);
          student.vx *= pause;
          student.vy *= pause;
        }
      }

      const dx = student.x - meadow.cx;
      const dy = student.y - meadow.cy;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance > meadow.radius * 0.82) {
        const pull = (distance - meadow.radius * 0.82) / meadow.radius;
        student.vx -= (dx / distance) * pull * 82 * seconds;
        student.vy -= (dy / distance) * pull * 82 * seconds;
      }

      const speed = Math.hypot(student.vx, student.vy) || 1;
      updateHumanState(student, crowdContext, seconds, speed);
      const targetBoost = student.targetId ? 1.12 : 1;
      const bottleneckDrag = inBottleneck ? 0.76 : 1;
      const maxSpeed = profile.maxSpeed * crowdContext.speedFactor * targetBoost * bottleneckDrag * humanSpeedFactor(student);
      if (speed > maxSpeed) {
        student.vx = (student.vx / speed) * maxSpeed;
        student.vy = (student.vy / speed) * maxSpeed;
      }

      student.x += student.vx * seconds;
      student.y += student.vy * seconds;

      const nextDx = student.x - meadow.cx;
      const nextDy = student.y - meadow.cy;
      const nextDistance = Math.hypot(nextDx, nextDy) || 1;
      if (nextDistance > meadow.radius) {
        student.x = meadow.cx + (nextDx / nextDistance) * meadow.radius;
        student.y = meadow.cy + (nextDy / nextDistance) * meadow.radius;
        student.vx -= (nextDx / nextDistance) * 34 * seconds;
        student.vy -= (nextDy / nextDistance) * 34 * seconds;
      }
    }

    const nextContacts = new Map();
    const activeExchangeKeys = new Set();
    for (let i = 0; i < state.students.length; i += 1) {
      const a = state.students[i];
      if (a.status === "exited") continue;
      for (let j = i + 1; j < state.students.length; j += 1) {
        const b = state.students[j];
        if (b.status === "exited") continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if ((dx * dx) + (dy * dy) > contactRadius * contactRadius) continue;

        const key = exchangeKey(a, b);
        const previous = state.contacts.get(key);
        const available = isAvailableForExchange(a, b.id) && isAvailableForExchange(b, a.id);
        const intendedPair = a.targetId === b.id || b.targetId === a.id;
        const spontaneousCheckChance = seconds * 0.018 * (attentionFactor(a) + attentionFactor(b));
        const eligible = canExchange(a, b) && available;
        const mistaken = canIneffectiveCheck(a, b) && available && (
          intendedPair || previous?.mistaken || Math.random() < spontaneousCheckChance
        );
        const interactionStarted = eligible || mistaken;
        const requiredTime = previous?.requiredTime || (
          mistaken ? identityCheckRequirement(a, b, exchangeThreshold) : exchangeRequirement(a, b, exchangeThreshold)
        );
        if (!previous && interactionStarted) {
          state.contactStarts += 1;
          if (eligible) state.validContactStarts += 1;
        }
        if (!previous && !eligible && !mistaken && available && wouldExchangeExceptSupply(a, b)) {
          state.blockedByStickerSupply += 1;
        }

        const contactTime = (previous?.time || 0) + seconds;
        if (eligible) {
          engagePair(a, b, key);

          if (contactTime >= requiredTime) {
            registerExchange(a, b);
            rememberAvoid(a, b.id, randomRange(12, 20));
            rememberAvoid(b, a.id, randomRange(12, 20));
            releasePair(a, b);
          } else {
            activeExchangeKeys.add(key);
            nextContacts.set(key, { time: contactTime, eligible: true, requiredTime, exchanging: true });
          }
        } else if (mistaken) {
          engagePair(a, b, key);

          if (contactTime >= requiredTime) {
            rememberAvoid(a, b.id, randomRange(18, 32));
            rememberAvoid(b, a.id, randomRange(18, 32));
            releasePair(a, b);
          } else {
            activeExchangeKeys.add(key);
            nextContacts.set(key, { time: contactTime, eligible: false, mistaken: true, requiredTime, exchanging: true });
          }
        } else {
          if (previous?.exchanging) releasePair(a, b);
          if (previous) nextContacts.set(key, { time: contactTime, eligible: false, requiredTime, exchanging: false });
        }
      }
    }
    state.contacts = nextContacts;
    for (const student of state.students) {
      if (student.engagedKey && !activeExchangeKeys.has(student.engagedKey)) {
        releasePair(student, getStudentById(student.engagedWith));
      }
    }

    for (const flash of state.flashes) {
      flash.life -= seconds * 1.6;
    }
    state.flashes = state.flashes.filter(flash => flash.life > 0);
    sampleStatusHistory();
    updateLiveStats();
  }

  function drawVenueZones() {
    for (const sourceZone of VENUE_ZONES) {
      const zone = venueZonePoint(sourceZone);
      const pulse = 0.5 + Math.sin(state.time * 0.7 + zone.x * 0.01) * 0.5;
      const gradient = ctx.createRadialGradient(zone.x, zone.y, 4, zone.x, zone.y, zone.radius);
      gradient.addColorStop(0, `rgba(235, 200, 136, ${0.12 + pulse * 0.04})`);
      gradient.addColorStop(0.48, "rgba(134, 161, 125, 0.07)");
      gradient.addColorStop(1, "rgba(235, 200, 136, 0)");
      ctx.beginPath();
      ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(zone.x, zone.y, zone.radius * 0.48, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(235, 200, 136, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawBackground() {
    const meadow = bounds();
    const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
    gradient.addColorStop(0, "rgba(13, 19, 38, 0.86)");
    gradient.addColorStop(0.54, "rgba(12, 40, 35, 0.76)");
    gradient.addColorStop(1, "rgba(7, 18, 23, 0.94)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.save();
    ctx.translate(meadow.cx, meadow.cy);
    ctx.beginPath();
    ctx.arc(0, 0, meadow.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(8, 26, 31, 0.54)";
    ctx.fill();
    ctx.strokeStyle = "rgba(235, 200, 136, 0.34)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    for (let ring = 0.35; ring <= 0.95; ring += 0.2) {
      ctx.beginPath();
      ctx.arc(0, 0, meadow.radius * ring, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(235, 200, 136, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    drawVenueZones();

    for (const lantern of state.lanterns) {
      const pulse = 0.5 + Math.sin(state.time * 1.6 + lantern.phase) * 0.5;
      ctx.beginPath();
      ctx.arc(lantern.x, lantern.y, lantern.size + pulse * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 200, 136, ${0.13 + pulse * 0.18})`;
      ctx.fill();
    }
  }

  function drawContacts() {
    for (const [key, contact] of state.contacts) {
      if (!contact.eligible && !contact.exchanging) continue;
      const [aId, bId] = key.split(":").map(Number);
      const a = state.students[aId];
      const b = state.students[bId];
      if (!a || !b) continue;
      if (a.status === "exited" || b.status === "exited") continue;
      const progress = contact.requiredTime ? clamp(contact.time / contact.requiredTime, 0, 1) : 0;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = contact.mistaken
        ? `rgba(183, 156, 203, ${0.2 + progress * 0.38})`
        : `rgba(235, 200, 136, ${0.22 + progress * 0.42})`;
      ctx.lineWidth = contact.exchanging ? 1.6 : 1;
      ctx.stroke();
    }
  }

  function drawIntentions() {
    for (const student of state.students) {
      if (!canScan(student)) continue;

      if (student.scanPulse > 0) {
        const scanRadius = effectiveScanRadius(student);
        ctx.beginPath();
        ctx.arc(student.x, student.y, scanRadius * (1.05 - student.scanPulse * 0.25), 0, Math.PI * 2);
        const pulseColor = student.behavior === "hyper" ? "235, 200, 136" : student.behavior === "social" ? "134, 161, 125" : "183, 156, 203";
        ctx.strokeStyle = `rgba(${pulseColor}, ${0.16 * student.scanPulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const target = getStudentById(student.targetId);
      if (!target || !canTargetStudent(student, target)) continue;
      ctx.beginPath();
      ctx.moveTo(student.x, student.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = "rgba(235, 200, 136, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function drawStudents() {
    for (const student of state.students) {
      if (student.status === "exited") continue;
      const radiusByBehavior = {
        seeker: 4.1,
        wanderer: 3.4,
        social: 3.8,
        shy: 3,
        hyper: 4.6,
        ambient: 2.1
      };
      ctx.beginPath();
      ctx.arc(student.x, student.y, radiusByBehavior[student.behavior] || 3.5, 0, Math.PI * 2);
      ctx.fillStyle = student.color;
      ctx.globalAlpha = student.ambient ? 0.46 : student.behavior === "shy" ? 0.74 : 0.92;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (!student.ambient && student.behavior !== "wanderer" && !student.complete) {
        ctx.beginPath();
        ctx.arc(student.x, student.y, student.behavior === "hyper" ? 7.4 : 6.2, 0, Math.PI * 2);
        const idleStroke = student.behavior === "social" ? "rgba(134, 161, 125, 0.32)" : "rgba(247, 236, 209, 0.24)";
        ctx.strokeStyle = student.targetId ? "rgba(235, 200, 136, 0.72)" : idleStroke;
        ctx.lineWidth = student.behavior === "hyper" ? 1.35 : 1;
        ctx.stroke();
      }

      if (student.complete) {
        ctx.beginPath();
        ctx.arc(student.x, student.y, 6.2, 0, Math.PI * 2);
        ctx.strokeStyle = student.status === "helping" ? "rgba(235, 200, 136, 0.82)" : "rgba(183, 156, 203, 0.72)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }
  }

  function drawFlashes() {
    for (const flash of state.flashes) {
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, 4 + (1 - flash.life) * 16, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(235, 200, 136, ${Math.max(0, flash.life)})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, state.width, state.height);
    drawBackground();
    drawIntentions();
    drawContacts();
    drawStudents();
    drawFlashes();
  }

  function updateAnimalStatusPanel() {
    if (!els.animalStatusContent || !state.plan || !state.students.length) return;
    const plan = state.plan;
    const speciesGroups = new Map();

    for (const student of state.students) {
      if (student.ambient) continue;
      if (!speciesGroups.has(student.speciesIndex)) {
        speciesGroups.set(student.speciesIndex, new Map());
      }
      const byGroup = speciesGroups.get(student.speciesIndex);
      if (!byGroup.has(student.groupId)) {
        byGroup.set(student.groupId, { collecting: 0, helping: 0, exited: 0, program: student.program, groupId: student.groupId });
      }
      const group = byGroup.get(student.groupId);
      if (student.status === "exited") group.exited += 1;
      else if (student.status === "helping") group.helping += 1;
      else group.collecting += 1;
    }

    const overall = { collecting: 0, helping: 0, exited: 0 };
    const rows = [];
    for (const species of plan.species) {
      const byGroup = speciesGroups.get(species.index);
      if (!byGroup || byGroup.size === 0) continue;
      let totalCollecting = 0;
      let totalHelping = 0;
      let totalExited = 0;
      const groupRows = [];

      for (const [, group] of byGroup) {
        totalCollecting += group.collecting;
        totalHelping += group.helping;
        totalExited += group.exited;
        const programLabel = currentLang === "ko"
          ? (group.program === "global" ? "글로벌" : "대학")
          : (group.program === "global" ? "Global" : "University");
        const groupLabel = `${programLabel}-${group.groupId.split("-").pop()}`;
        groupRows.push(
          `<div class="group-row">` +
            `<span class="group-row__label">${groupLabel}</span>` +
            `<span class="group-row__counts">` +
              `<i class="counts--collecting">${group.collecting}</i>` +
              `<i class="counts--helping">${group.helping}</i>` +
              `<i class="counts--exited">${group.exited}</i>` +
            `</span>` +
          `</div>`
        );
      }

      overall.collecting += totalCollecting;
      overall.helping += totalHelping;
      overall.exited += totalExited;

      rows.push(
        `<div class="animal-section">` +
          `<div class="animal-section__header">` +
            `<i class="animal-section__dot" style="background:${species.color}"></i>` +
            `<span class="animal-section__name">${getSpeciesName(species.index)}</span>` +
            `<span class="animal-section__totals">` +
              `<i class="totals--collecting">${totalCollecting}</i>` +
              `<i class="totals--helping">${totalHelping}</i>` +
              `<i class="totals--exited">${totalExited}</i>` +
            `</span>` +
          `</div>` +
          `<div class="animal-section__groups">` +
            groupRows.join("") +
          `</div>` +
        `</div>`
      );
    }

    const totalLabel = currentLang === "ko" ? "전체" : "Total";
    const totalRow = rows.length
      ? `<div class="animal-section animal-section--overall">` +
          `<div class="animal-section__header">` +
            `<span class="animal-section__name">${totalLabel}</span>` +
            `<span class="animal-section__totals">` +
              `<i class="totals--collecting">${overall.collecting}</i>` +
              `<i class="totals--helping">${overall.helping}</i>` +
              `<i class="totals--exited">${overall.exited}</i>` +
            `</span>` +
          `</div>` +
        `</div>`
      : "";

    els.animalStatusContent.innerHTML = totalRow + (rows.join("") || (currentLang === "ko" ? "학생 데이터 없음" : "No student data"));
  }

  function updateLiveStats() {
    const grouped = state.students.filter(student => !student.ambient);
    const completed = grouped.filter(student => student.complete).length;
    const statuses = statusCounts();
    updateStatusCountLabels(statuses);
    const totalStickers = grouped.reduce((sum, student) => sum + Math.min(student.stickers.size, CONFIG.targetStickers), 0);
    const averageStickers = grouped.length ? totalStickers / grouped.length : 0;
    const validRate = state.contactStarts ? state.validContactStarts / state.contactStarts : 0;

    els.elapsedTime.textContent = formatTime(state.time);
    els.runState.textContent = state.running ? t("state.running") : t("state.paused");
    els.completedStudents.textContent = `${completed} / ${grouped.length}`;
    els.averageStickers.textContent = averageStickers.toFixed(1);
    els.validMeetingRate.textContent = formatPercent(validRate);
    els.exchangeCount.textContent = state.exchangeCount.toString();

    if (statuses.exited >= grouped.length && grouped.length > 0) {
      state.running = false;
      els.toggleSimulation.textContent = t("action.start");
    }

    updateAnimalStatusPanel();
    updateSupplyMetrics();
  }

  function frame(timestamp) {
    if (!state.lastFrame) state.lastFrame = timestamp;
    const delta = Math.min(0.05, (timestamp - state.lastFrame) / 1000);
    state.lastFrame = timestamp;

    if (state.running) {
      const speed = Number(els.speedMultiplier.value);
      const seconds = delta * speed;
      state.time += seconds;
      step(seconds);
    }

    draw();
    requestAnimationFrame(frame);
  }

  function applySpeciesCount(count) {
    const nextCount = Math.max(1, Math.min(8, Number(count)));
    els.speciesCount.value = nextCount;
    document.querySelectorAll("[data-species-pick]").forEach(button => {
      button.classList.toggle("is-active", Number(button.dataset.speciesPick) === nextCount);
    });
    state.plan = buildPlan(nextCount);
    updatePlanUI();
    resetSimulation();
  }

  function bindEvents() {
    els.languageToggle.addEventListener("click", () => {
      currentLang = currentLang === "ko" ? "en" : "ko";
      localStorage.setItem("samsungCampLang", currentLang);
      applyTranslations();
      updatePlanUI();
      updateLiveStats();
      updateExchangeSecondsUI();
      updateCompletionGoalUI();
      updateStickersPerPersonUI();
      updateAnimalStatusPanel();
      updateSupplyMetrics();
      updateSupplyMetricsToggle();
      updateAnimalPanelToggle();
      els.toggleSimulation.textContent = state.running ? t("action.pause") : t("action.start");
    });

    els.speciesCount.addEventListener("input", event => {
      applySpeciesCount(event.target.value);
    });

    document.querySelectorAll("[data-species-pick]").forEach(button => {
      button.addEventListener("click", () => applySpeciesCount(button.dataset.speciesPick));
    });

    els.exchangeSeconds.addEventListener("input", () => {
      updateExchangeSecondsUI();
    });

    els.stickersPerPerson.addEventListener("input", () => {
      updateStickersPerPersonUI();
      resetSimulation();
    });

    els.completionGoal.addEventListener("input", () => {
      updateCompletionGoalUI();
      resetSimulation();
    });

    els.speedMultiplier.addEventListener("input", () => {
      els.speedValue.textContent = Number(els.speedMultiplier.value).toFixed(1);
    });

    els.toggleSimulation.addEventListener("click", () => {
      state.running = !state.running;
      els.toggleSimulation.textContent = state.running ? t("action.pause") : t("action.start");
      els.runState.textContent = state.running ? t("state.running") : t("state.paused");
      state.lastFrame = null;
    });

    els.resetSimulation.addEventListener("click", resetSimulation);

    els.statusGraphToggle.addEventListener("click", () => {
      state.statusGraphOpen = !state.statusGraphOpen;
      updateStatusGraphToggle();
      drawStatusChart();
    });

    els.animalPanelToggle.addEventListener("click", () => {
      state.animalPanelOpen = !state.animalPanelOpen;
      updateAnimalPanelToggle();
      resizeCanvas();
    });

    els.supplyMetricsToggle.addEventListener("click", () => {
      state.supplyMetricsOpen = !state.supplyMetricsOpen;
      updateSupplyMetricsToggle();
    });

    window.addEventListener("resize", resizeCanvas);
  }

  function init() {
    applyTranslations();
    els.exchangeSeconds.max = CONFIG.maxExchangeSeconds.toString();
    updateExchangeSecondsUI();
    els.completionGoal.min = CONFIG.minCompletionGoal.toString();
    els.completionGoal.max = CONFIG.maxCompletionGoal.toString();
    els.completionGoal.value = CONFIG.targetStickers.toString();
    updateCompletionGoalUI();
    els.stickersPerPerson.min = CONFIG.minStickersPerPerson.toString();
    els.stickersPerPerson.max = CONFIG.maxStickersPerPerson.toString();
    els.stickersPerPerson.value = CONFIG.stickersPerPerson.toString();
    updateStickersPerPersonUI();
    els.speedValue.textContent = Number(els.speedMultiplier.value).toFixed(1);
    updateAnimalPanelToggle();
    updateSupplyMetricsToggle();
    updateAnimalStatusPanel();
    updateSupplyMetrics();
    bindEvents();
    resizeCanvas();
    applySpeciesCount(6);
    requestAnimationFrame(frame);
  }

  init();
})();
