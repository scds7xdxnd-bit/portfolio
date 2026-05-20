(() => {
  const CONFIG = {
    globalGroups: 8,
    universityGroups: 22,
    groupSize: 8,
    eventHeadcount: 270,
    targetStickers: 10
  };

  const SPECIES_NAMES = [
    "Moon Deer",
    "Lantern Fox",
    "Sage Owl",
    "Twilight Hare",
    "Wildflower Moth",
    "Forest Stag",
    "Mushroom Lynx",
    "Crescent Squirrel"
  ];

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

  const els = {
    speciesCount: document.getElementById("speciesCount"),
    speciesValue: document.getElementById("speciesValue"),
    exchangeSeconds: document.getElementById("exchangeSeconds"),
    exchangeSecondsValue: document.getElementById("exchangeSecondsValue"),
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
    solutionHeadline: document.getElementById("solutionHeadline"),
    groupRange: document.getElementById("groupRange"),
    peopleRange: document.getElementById("peopleRange"),
    probabilityRange: document.getElementById("probabilityRange"),
    globalPattern: document.getElementById("globalPattern"),
    universityPattern: document.getElementById("universityPattern"),
    speciesRows: document.getElementById("speciesRows"),
    rosterModel: document.getElementById("rosterModel"),
    expectedInteractions: document.getElementById("expectedInteractions"),
    effortText: document.getElementById("effortText"),
    planningSignal: document.getElementById("planningSignal"),
    planningText: document.getElementById("planningText"),
    canvas: document.getElementById("festivalCanvas")
  };

  const ctx = els.canvas.getContext("2d");
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
    exchangeCount: 0
  };

  function balancedCounts(total, slots) {
    const base = Math.floor(total / slots);
    const remainder = total % slots;
    return Array.from({ length: slots }, (_, index) => (
      index >= slots - remainder ? base + 1 : base
    ));
  }

  function expectedRandomEncounters(eligiblePeople) {
    const denominator = CONFIG.eventHeadcount - CONFIG.groupSize;
    const target = Math.min(CONFIG.targetStickers, eligiblePeople);
    if (target < CONFIG.targetStickers) return Infinity;
    let expected = 0;
    for (let collected = 0; collected < target; collected += 1) {
      expected += denominator / (eligiblePeople - collected);
    }
    return expected;
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
        name: SPECIES_NAMES[index] || `Species ${index + 1}`,
        color: SPECIES_COLORS[index % SPECIES_COLORS.length],
        globalGroups,
        universityGroups,
        totalGroups,
        people,
        eligiblePeople,
        probability,
        expectedEncounters: expectedRandomEncounters(eligiblePeople)
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

  function formatRange(values, suffix) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? `${min} ${suffix}` : `${min}-${max} ${suffix}`;
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

  function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function updatePlanUI() {
    const plan = state.plan;
    const groups = plan.species.map(item => item.totalGroups);
    const people = plan.species.map(item => item.people);
    const probabilities = plan.species.map(item => item.probability);
    const expected = plan.species.map(item => item.expectedEncounters);
    const minGroups = Math.min(...groups);
    const maxGroups = Math.max(...groups);
    const avgExpected = average(expected);
    const avgProbability = average(probabilities);

    els.speciesValue.textContent = plan.speciesCount;
    els.globalGroupCount.textContent = CONFIG.globalGroups;
    els.universityGroupCount.textContent = CONFIG.universityGroups;
    els.groupSize.textContent = CONFIG.groupSize;
    els.eventHeadcount.textContent = CONFIG.eventHeadcount;
    els.formulaText.textContent = `(same-species people - ${CONFIG.groupSize}) / ${CONFIG.eventHeadcount - CONFIG.groupSize}`;
    els.solutionHeadline.textContent = plan.speciesCount === 1
      ? "1 species concentrates every group into one animal"
      : `${plan.speciesCount} species gives ${minGroups === maxGroups ? minGroups : `${minGroups}-${maxGroups}`} groups per animal`;
    els.groupRange.textContent = formatRange(groups, "groups");
    els.peopleRange.textContent = formatRange(people, "people");
    els.probabilityRange.textContent = formatDecimalRange(probabilities);
    els.globalPattern.textContent = plan.global.join(" + ");
    els.universityPattern.textContent = plan.university.join(" + ");
    els.rosterModel.textContent = `${plan.groupedPlayers} grouped sticker players + ${plan.ambientAttendees} ambient attendees`;
    els.expectedInteractions.textContent = `About ${Math.round(avgExpected)} random encounters for 10 names`;

    if (avgProbability < 0.1) {
      els.planningSignal.textContent = "Balanced and challenging";
      els.planningText.textContent = "This setup keeps animal groups small, so students need more mixing time and a lively movement pattern.";
    } else if (avgProbability < 0.17) {
      els.planningSignal.textContent = "Balanced and medium difficulty";
      els.planningText.textContent = "This setup keeps the animal totals even while giving each student a reasonable pool of valid partners.";
    } else {
      els.planningSignal.textContent = "Balanced and easier to complete";
      els.planningText.textContent = "This setup gives each animal a larger partner pool, so completion should be faster but identities are less varied.";
    }

    const minExpected = Math.min(...expected);
    const maxExpected = Math.max(...expected);
    els.effortText.textContent = minExpected === maxExpected
      ? `At this balance, a student needs about ${Math.round(avgExpected)} random encounters to collect 10 unique valid names.`
      : `Depending on the animal, a student needs about ${Math.round(minExpected)}-${Math.round(maxExpected)} random encounters to collect 10 unique valid names.`;

    els.speciesRows.innerHTML = plan.species.map(item => `
      <article class="species-row">
        <div class="species-row__top">
          <div class="species-name">
            <i class="species-dot" style="background:${item.color}"></i>
            <strong>${item.name}</strong>
          </div>
          <div class="species-total">${item.totalGroups} groups</div>
        </div>
        <div class="species-row__metrics">
          <div><span>글로벌</span><strong>${item.globalGroups}</strong></div>
          <div><span>대학</span><strong>${item.universityGroups}</strong></div>
          <div><span>People</span><strong>${item.people}</strong></div>
          <div><span>Formula</span><strong>${formatPercent(item.probability)}</strong></div>
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
    state.time = 0;
    state.running = false;
    state.lastFrame = null;
    els.toggleSimulation.textContent = "Start";
    els.runState.textContent = "Paused";

    function addStudent(speciesIndex, groupId, program, color, ambient = false) {
      const point = randomPointInMeadow();
      const angle = Math.random() * Math.PI * 2;
      const speed = ambient ? 8 + Math.random() * 10 : 12 + Math.random() * 16;
      state.students.push({
        id: id,
        speciesIndex,
        groupId,
        program,
        color,
        ambient,
        x: point.x,
        y: point.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        stickers: new Set(),
        complete: false
      });
      id += 1;
    }

    function addGroups(speciesIndex, program, count) {
      const species = plan.species[speciesIndex];
      for (let group = 0; group < count; group += 1) {
        const groupId = `${program}-${groupSerial}`;
        groupSerial += 1;
        for (let seat = 0; seat < CONFIG.groupSize; seat += 1) {
          addStudent(speciesIndex, groupId, program, species.color);
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

    updateLiveStats();
    draw();
  }

  function canExchange(a, b) {
    if (a.ambient || b.ambient) return false;
    if (a.speciesIndex !== b.speciesIndex) return false;
    if (a.groupId === b.groupId) return false;
    return !(a.stickers.has(b.id) && b.stickers.has(a.id));
  }

  function registerExchange(a, b) {
    let changed = false;
    if (!a.stickers.has(b.id)) {
      a.stickers.add(b.id);
      changed = true;
    }
    if (!b.stickers.has(a.id)) {
      b.stickers.add(a.id);
      changed = true;
    }
    a.complete = a.stickers.size >= CONFIG.targetStickers;
    b.complete = b.stickers.size >= CONFIG.targetStickers;

    if (changed) {
      state.exchangeCount += 1;
      state.flashes.push({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        color: a.color,
        life: 1
      });
    }
  }

  function step(seconds) {
    const meadow = bounds();
    const maxSpeed = 42;
    const contactRadius = Math.max(13, Math.min(state.width, state.height) * 0.025);
    const exchangeThreshold = Number(els.exchangeSeconds.value);

    for (const student of state.students) {
      const drift = student.ambient ? 8 : 15;
      student.vx += (Math.random() - 0.5) * drift * seconds;
      student.vy += (Math.random() - 0.5) * drift * seconds;

      const dx = student.x - meadow.cx;
      const dy = student.y - meadow.cy;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance > meadow.radius * 0.82) {
        const pull = (distance - meadow.radius * 0.82) / meadow.radius;
        student.vx -= (dx / distance) * pull * 82 * seconds;
        student.vy -= (dy / distance) * pull * 82 * seconds;
      }

      const speed = Math.hypot(student.vx, student.vy) || 1;
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
    for (let i = 0; i < state.students.length; i += 1) {
      const a = state.students[i];
      for (let j = i + 1; j < state.students.length; j += 1) {
        const b = state.students[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if ((dx * dx) + (dy * dy) > contactRadius * contactRadius) continue;

        const key = `${a.id}:${b.id}`;
        const eligible = canExchange(a, b);
        const previous = state.contacts.get(key);
        if (!previous) {
          state.contactStarts += 1;
          if (eligible) state.validContactStarts += 1;
        }

        const contactTime = (previous?.time || 0) + seconds;
        if (eligible && contactTime >= exchangeThreshold) {
          registerExchange(a, b);
        } else {
          nextContacts.set(key, { time: contactTime, eligible });
        }
      }
    }
    state.contacts = nextContacts;

    for (const flash of state.flashes) {
      flash.life -= seconds * 1.6;
    }
    state.flashes = state.flashes.filter(flash => flash.life > 0);
    updateLiveStats();
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
      if (!contact.eligible) continue;
      const [aId, bId] = key.split(":").map(Number);
      const a = state.students[aId];
      const b = state.students[bId];
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(235, 200, 136, 0.24)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawStudents() {
    for (const student of state.students) {
      ctx.beginPath();
      ctx.arc(student.x, student.y, student.ambient ? 2.1 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = student.color;
      ctx.globalAlpha = student.ambient ? 0.46 : 0.92;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (student.complete) {
        ctx.beginPath();
        ctx.arc(student.x, student.y, 6.2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(235, 200, 136, 0.82)";
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
    drawContacts();
    drawStudents();
    drawFlashes();
  }

  function updateLiveStats() {
    const grouped = state.students.filter(student => !student.ambient);
    const completed = grouped.filter(student => student.complete).length;
    const totalStickers = grouped.reduce((sum, student) => sum + Math.min(student.stickers.size, CONFIG.targetStickers), 0);
    const averageStickers = grouped.length ? totalStickers / grouped.length : 0;
    const validRate = state.contactStarts ? state.validContactStarts / state.contactStarts : 0;

    els.elapsedTime.textContent = formatTime(state.time);
    els.runState.textContent = state.running ? "Running" : "Paused";
    els.completedStudents.textContent = `${completed} / ${grouped.length}`;
    els.averageStickers.textContent = averageStickers.toFixed(1);
    els.validMeetingRate.textContent = formatPercent(validRate);
    els.exchangeCount.textContent = state.exchangeCount.toString();

    if (completed >= grouped.length && grouped.length > 0) {
      state.running = false;
      els.toggleSimulation.textContent = "Start";
    }
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
    els.speciesCount.addEventListener("input", event => {
      applySpeciesCount(event.target.value);
    });

    document.querySelectorAll("[data-species-pick]").forEach(button => {
      button.addEventListener("click", () => applySpeciesCount(button.dataset.speciesPick));
    });

    els.exchangeSeconds.addEventListener("input", () => {
      els.exchangeSecondsValue.textContent = Number(els.exchangeSeconds.value).toFixed(1);
    });

    els.speedMultiplier.addEventListener("input", () => {
      els.speedValue.textContent = Number(els.speedMultiplier.value).toFixed(1);
    });

    els.toggleSimulation.addEventListener("click", () => {
      state.running = !state.running;
      els.toggleSimulation.textContent = state.running ? "Pause" : "Start";
      els.runState.textContent = state.running ? "Running" : "Paused";
      state.lastFrame = null;
    });

    els.resetSimulation.addEventListener("click", resetSimulation);
    window.addEventListener("resize", resizeCanvas);
  }

  function init() {
    els.exchangeSecondsValue.textContent = Number(els.exchangeSeconds.value).toFixed(1);
    els.speedValue.textContent = Number(els.speedMultiplier.value).toFixed(1);
    bindEvents();
    resizeCanvas();
    applySpeciesCount(6);
    requestAnimationFrame(frame);
  }

  init();
})();
