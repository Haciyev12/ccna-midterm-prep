/* ── State ──────────────────────────────────────── */
const State = {
  view: 'home',
  module: null,
  quiz: null,   // { questions, current, answers, hintOpen }
  progress: {}  // moduleId → { answered, correct }
};

/* ── Utilities ──────────────────────────────────── */
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const shuffle = arr => { const a = [...arr]; for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const LETTERS = ['A','B','C','D','E','F'];

function totalAnswered() {
  return Object.values(State.progress).reduce((s,p) => s + (p.answered||0), 0);
}

function updateFooter() {
  const t = 105, a = totalAnswered();
  $('footer-stat').textContent = `${a} / ${t} questions answered`;
  $('footer-bar-fill').style.width = Math.round(a/t*100)+'%';
}

/* ── Router ─────────────────────────────────────── */
function navigate(view, moduleId) {
  State.view = view;
  State.module = moduleId || null;

  // sidebar active states
  document.querySelectorAll('.mod-nav-item').forEach(i => i.classList.toggle('active', i.dataset.mod == moduleId));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.toggle('active', l.dataset.view === view && !moduleId));
  if (moduleId) document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  const inner = $('content-inner');
  inner.innerHTML = '';
  if (view === 'home')       renderHome(inner);
  else if (view === 'module') renderModule(inner, moduleId);
  else if (view === 'predicted') renderPredicted(inner);
  else if (view === 'notes') renderNotes(inner);
  else if (view === 'flashcards') renderFlashcards(inner);

  window.scrollTo(0, 0);
  closeMobileSidebar();
}

/* ── Sidebar ─────────────────────────────────────── */
function buildSidebar() {
  const list = $('module-nav-list');
  list.innerHTML = '';
  Object.entries(MODULES).forEach(([id, mod]) => {
    const prog = State.progress[id] || { answered: 0, correct: 0 };
    const total = mod.questions;
    const pct = Math.round(prog.answered / total * 100);
    const div = el('div', 'mod-nav-item');
    div.dataset.mod = id;
    div.innerHTML = `
      <div class="mod-nav-row">
        <span class="mod-nav-icon">${mod.icon}</span>
        <span class="mod-nav-name">M${id} · ${mod.title}</span>
      </div>
      <div class="mod-nav-progress"><div class="mod-nav-progress-fill" id="mnp-${id}" style="width:${pct}%"></div></div>
      <div class="mod-nav-count" id="mnc-${id}">${prog.answered}/${total}</div>`;
    div.addEventListener('click', () => navigate('module', +id));
    list.appendChild(div);
  });
}

function refreshSidebarProgress(moduleId) {
  const prog = State.progress[moduleId] || { answered: 0 };
  const total = MODULES[moduleId].questions;
  const pct = Math.round(prog.answered / total * 100);
  const fill = $(`mnp-${moduleId}`);
  const cnt = $(`mnc-${moduleId}`);
  if (fill) fill.style.width = pct+'%';
  if (cnt) cnt.textContent = `${prog.answered}/${total}`;
  updateFooter();
}

/* Mobile */
function closeMobileSidebar() {
  $('sidebar').classList.remove('open');
  $('sidebar-overlay').classList.remove('open');
}
$('sidebar-toggle').addEventListener('click', () => {
  $('sidebar').classList.toggle('open');
  $('sidebar-overlay').classList.toggle('open');
});
$('sidebar-overlay').addEventListener('click', closeMobileSidebar);

/* ── HOME ────────────────────────────────────────── */
function renderHome(root) {
  const hero = el('div','home-hero');
  hero.innerHTML = `
    <h1>Intro to <em>Computer Networks</em><br>Midterm Workbook</h1>
    <p>Topic recaps, practice quizzes with instant feedback, and predicted exam questions — built from your CCNA ITN slides.</p>`;
  root.appendChild(hero);

  const bar = el('div','stats-bar');
  bar.innerHTML = `
    <div class="stat-pill"><strong>7</strong> modules</div>
    <div class="stat-pill"><strong>105</strong> quiz questions</div>
    <div class="stat-pill"><strong>14</strong> predicted questions</div>
    <div class="stat-pill"><strong>34</strong> flashcards</div>`;
  root.appendChild(bar);

  const lbl = el('div','section-label','Modules — click to open recap + quiz');
  root.appendChild(lbl);

  const grid = el('div','module-grid');
  Object.entries(MODULES).forEach(([id, mod]) => {
    const prog = State.progress[id] || { answered: 0 };
    const pct = Math.round(prog.answered / mod.questions * 100);
    const card = el('div','module-card');
    card.style.setProperty('--mc', mod.color);
    card.innerHTML = `
      <div class="mc-head">
        <div class="mc-icon">${mod.icon}</div>
        <div class="mc-meta">
          <div class="mc-num">Module ${id}</div>
          <div class="mc-title">${mod.title}</div>
        </div>
      </div>
      <div class="mc-footer">
        <div class="mc-progress-wrap">
          <div class="mc-progress-bar"><div class="mc-progress-fill" style="width:${pct}%"></div></div>
          <div class="mc-progress-label">${prog.answered} / ${mod.questions} questions answered</div>
        </div>
        <button class="btn btn-primary btn-sm" style="background:${mod.color}">Start →</button>
      </div>`;
    card.addEventListener('click', () => navigate('module', +id));
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

/* ── MODULE PAGE ─────────────────────────────────── */
function renderModule(root, moduleId) {
  const mod = MODULES[moduleId];
  const recap = MODULE_RECAP[moduleId];

  // Header
  const header = el('div','mod-page-header');
  header.innerHTML = `
    <div class="mph-icon">${mod.icon}</div>
    <div class="mph-body">
      <div class="mph-num">Module ${moduleId} · CCNA ITN</div>
      <div class="mph-title">${mod.title}</div>
      <div class="mph-pills">
        <div class="mph-pill"><strong>${recap.sections.length}</strong>&nbsp;topics</div>
        <div class="mph-pill"><strong>${QUIZ_DATA[moduleId].length}</strong>&nbsp;quiz questions</div>
      </div>
    </div>`;
  root.appendChild(header);

  // Recap
  if (recap) {
    const rs = el('div','recap-section');
    const rl = el('div','recap-section-title','📖 Topic Recap');
    rs.appendChild(rl);
    recap.sections.forEach(sec => {
      const details = document.createElement('details');
      details.className = 'recap-block';
      const summary = document.createElement('summary');
      summary.textContent = sec.title;
      details.appendChild(summary);

      const body = el('div','recap-body');

      if (sec.points) {
        const ul = el('ul','recap-points');
        sec.points.forEach(p => {
          const li = document.createElement('li');
          li.innerHTML = p;
          ul.appendChild(li);
        });
        body.appendChild(ul);
      }

      if (sec.table) {
        const tbl = document.createElement('table');
        tbl.className = 'recap-table';
        const thead = document.createElement('thead');
        const hr = document.createElement('tr');
        sec.table.headers.forEach(h => { const th = document.createElement('th'); th.innerHTML = h; hr.appendChild(th); });
        thead.appendChild(hr); tbl.appendChild(thead);
        const tbody = document.createElement('tbody');
        sec.table.rows.forEach(row => {
          const tr = document.createElement('tr');
          row.forEach(cell => { const td = document.createElement('td'); td.innerHTML = cell; tr.appendChild(td); });
          tbody.appendChild(tr);
        });
        tbl.appendChild(tbody);
        body.appendChild(tbl);
      }

      if (sec.callout) {
        const c = el('div', `callout callout-${sec.callout.type}`);
        c.innerHTML = `<span class="callout-icon">${sec.callout.type === 'trap' ? '⚠' : '💡'}</span><span>${sec.callout.text}</span>`;
        body.appendChild(c);
      }

      details.appendChild(body);
      rs.appendChild(details);
    });

    // Expand first by default
    const first = rs.querySelector('details');
    if (first) first.open = true;
    root.appendChild(rs);
  }

  // Quiz
  const quizQuestions = QUIZ_DATA[moduleId];
  if (quizQuestions) {
    State.quiz = {
      moduleId,
      questions: shuffle([...quizQuestions]),
      current: 0,
      answers: [],
      hintOpen: false
    };
    if (!State.progress[moduleId]) State.progress[moduleId] = { answered: 0, correct: 0 };
    const quizRoot = el('div','quiz-section');
    quizRoot.id = 'quiz-root';
    root.appendChild(quizRoot);
    renderQuestion();
  }
}

/* ── QUIZ ────────────────────────────────────────── */
function renderQuestion() {
  const qr = $('quiz-root');
  if (!qr) return;
  qr.innerHTML = '';

  const { questions, current, moduleId } = State.quiz;
  const q = questions[current];
  const total = questions.length;
  const mod = MODULES[moduleId];

  // Header bar
  const hbar = el('div','quiz-header-bar');
  hbar.innerHTML = `
    <h2>Practice Quiz</h2>
    <div class="quiz-meta">
      <span class="quiz-badge">Q ${current+1} of ${total}</span>
      <span class="quiz-badge" style="color:${mod.color}">${mod.icon} Module ${moduleId}</span>
    </div>`;
  qr.appendChild(hbar);

  // Progress
  const pt = el('div','progress-track');
  pt.innerHTML = `
    <div class="progress-row"><span></span><span>${Math.round(current/total*100)}%</span></div>
    <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(current/total*100)}%"></div></div>`;
  qr.appendChild(pt);

  // Card
  const card = el('div','q-card');
  card.innerHTML = `<div class="q-num">Question ${current+1}</div>`;

  // Question text
  const qt = el('div','q-text', q.q);
  card.appendChild(qt);

  // Multi-select badge
  if (q.multi) {
    card.appendChild(el('div','multi-badge',`Select ${Array.isArray(q.answer) ? q.answer.length : 1} answers`));
  }

  // Hint panel
  const hint = el('div','hint-panel');
  hint.id = 'hint-panel';
  hint.innerHTML = `<span class="hint-label">💡 Hint:</span><span>${q.hint || ''}</span>`;
  card.appendChild(hint);

  // Options
  const opts = el('div','options');
  opts.id = 'options';
  q.options.forEach((opt, i) => {
    const btn = el('button','opt-btn');
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectOption(i));
    opts.appendChild(btn);
  });
  card.appendChild(opts);

  // Footer
  const footer = el('div','q-footer');
  footer.innerHTML = `
    <div class="q-footer-left">
      <button class="hint-btn" id="hint-btn" ${!q.hint ? 'style="display:none"' : ''}>💡 Hint</button>
      <button class="skip-btn" id="skip-btn">Skip</button>
    </div>
    <div>
      <span class="feedback-badge" id="feedback-badge"></span>
      <button class="btn btn-primary" id="next-btn" style="display:none">Next →</button>
    </div>`;
  card.appendChild(footer);
  qr.appendChild(card);

  State.quiz.selectedMulti = [];
  State.quiz.answered = false;

  // Hint toggle
  const hintBtn = $('hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      const panel = $('hint-panel');
      const open = panel.classList.contains('visible');
      panel.classList.toggle('visible', !open);
      hintBtn.textContent = open ? '💡 Hint' : '🙈 Hide Hint';
    });
  }

  $('skip-btn').addEventListener('click', skipQuestion);
  $('next-btn').addEventListener('click', nextQuestion);
}

function selectOption(idx) {
  if (State.quiz.answered) return;
  const q = State.quiz.questions[State.quiz.current];

  if (q.multi) {
    const btn = document.querySelector(`.opt-btn[data-idx="${idx}"]`);
    const si = State.quiz.selectedMulti.indexOf(idx);
    if (si === -1) {
      State.quiz.selectedMulti.push(idx);
      btn.classList.add('selected');
    } else {
      State.quiz.selectedMulti.splice(si, 1);
      btn.classList.remove('selected');
    }
    if (State.quiz.selectedMulti.length === q.answer.length) {
      submitMulti();
    }
    return;
  }

  // Single answer
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`.opt-btn[data-idx="${idx}"]`);
  btn.classList.add('selected');
  submitSingle(idx);
}

function submitSingle(idx) {
  State.quiz.answered = true;
  const q = State.quiz.questions[State.quiz.current];
  const correct = idx === q.answer;

  State.quiz.answers.push({ correct, selected: idx, answer: q.answer });
  if (!State.progress[State.quiz.moduleId]) State.progress[State.quiz.moduleId] = { answered:0, correct:0 };
  State.progress[State.quiz.moduleId].answered++;
  if (correct) State.progress[State.quiz.moduleId].correct++;
  refreshSidebarProgress(State.quiz.moduleId);

  // Disable all buttons + apply classes
  document.querySelectorAll('.opt-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('answered');
    const i = +b.dataset.idx;
    if (i === q.answer) b.classList.add('is-correct');
    else if (i === idx && !correct) b.classList.add('is-wrong');
  });

  // Show wrong explanation for selected wrong option
  if (!correct && q.wrongExp && q.wrongExp[idx]) {
    const btn = document.querySelector(`.opt-btn[data-idx="${idx}"]`);
    const exp = el('div','opt-explanation exp-wrong show');
    exp.innerHTML = `<span class="exp-label">Why this is wrong:</span>${q.wrongExp[idx]}`;
    btn.appendChild(exp);
  }

  // Show correct explanation
  if (q.explanation) {
    const correctBtn = document.querySelector(`.opt-btn[data-idx="${q.answer}"]`);
    const exp = el('div',`opt-explanation exp-right show`);
    exp.innerHTML = `<span class="exp-label">${correct ? '✓ Correct:' : 'Correct answer:'}</span>${q.explanation}`;
    correctBtn.appendChild(exp);
  }

  showFeedback(correct);
}

function submitMulti() {
  State.quiz.answered = true;
  const q = State.quiz.questions[State.quiz.current];
  const sel = State.quiz.selectedMulti;
  const correctSet = new Set(q.answer);
  const selSet = new Set(sel);
  const isCorrect = q.answer.every(a => selSet.has(a)) && sel.every(s => correctSet.has(s));

  State.quiz.answers.push({ correct: isCorrect, selected: sel, answer: q.answer, multi: true });
  if (!State.progress[State.quiz.moduleId]) State.progress[State.quiz.moduleId] = { answered:0, correct:0 };
  State.progress[State.quiz.moduleId].answered++;
  if (isCorrect) State.progress[State.quiz.moduleId].correct++;
  refreshSidebarProgress(State.quiz.moduleId);

  document.querySelectorAll('.opt-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('answered');
    const i = +b.dataset.idx;
    if (correctSet.has(i)) b.classList.add('is-correct');
    else if (selSet.has(i)) b.classList.add('is-wrong');
  });

  if (q.explanation) {
    const firstCorrectBtn = document.querySelector(`.opt-btn[data-idx="${q.answer[0]}"]`);
    if (firstCorrectBtn) {
      const exp = el('div','opt-explanation exp-right show');
      exp.innerHTML = `<span class="exp-label">${isCorrect ? '✓ Correct:' : 'Correct answers:'}</span>${q.explanation}`;
      firstCorrectBtn.appendChild(exp);
    }
  }

  showFeedback(isCorrect);
}

function showFeedback(correct) {
  const fb = $('feedback-badge');
  fb.textContent = correct ? '✓ Correct!' : '✗ Incorrect';
  fb.className = `feedback-badge show ${correct ? 'feedback-correct' : 'feedback-wrong'}`;
  $('next-btn').style.display = 'inline-flex';
  $('skip-btn').style.display = 'none';
  if ($('hint-btn')) $('hint-btn').style.display = 'none';
}

function skipQuestion() {
  const q = State.quiz.questions[State.quiz.current];
  State.quiz.answers.push({ skipped: true, correct: false, answer: q.answer });
  if (!State.progress[State.quiz.moduleId]) State.progress[State.quiz.moduleId] = { answered:0, correct:0 };
  State.progress[State.quiz.moduleId].answered++;
  refreshSidebarProgress(State.quiz.moduleId);
  nextQuestion();
}

function nextQuestion() {
  State.quiz.current++;
  if (State.quiz.current >= State.quiz.questions.length) {
    renderResults();
  } else {
    renderQuestion();
    window.scrollTo(0, document.getElementById('quiz-root').offsetTop - 20);
  }
}

/* ── RESULTS ─────────────────────────────────────── */
function renderResults() {
  const qr = $('quiz-root');
  qr.innerHTML = '';
  const { answers, questions, moduleId } = State.quiz;
  const correct = answers.filter(a => a.correct).length;
  const total = answers.length;
  const pct = Math.round(correct/total*100);
  const grade = pct >= 80 ? 'great' : pct >= 60 ? 'ok' : 'poor';

  const card = el('div','results-card');
  card.innerHTML = `
    <div class="score-ring ${grade}">
      ${pct}%<span>${grade==='great'?'🎉':grade==='ok'?'📚':'💪'}</span>
    </div>
    <h2 style="font-size:18px;font-weight:700;margin-bottom:4px">${grade==='great'?'Excellent!':grade==='ok'?'Good effort!':'Keep studying!'}</h2>
    <p style="font-size:12px;color:var(--text2)">Module ${moduleId}: ${MODULES[moduleId].title}</p>
    <div class="results-row">
      <div class="result-stat"><div class="v" style="color:var(--green)">${correct}</div><div class="l">Correct</div></div>
      <div class="result-stat"><div class="v" style="color:var(--red)">${total-correct}</div><div class="l">Wrong / Skipped</div></div>
      <div class="result-stat"><div class="v">${total}</div><div class="l">Total</div></div>
    </div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px">
      <button class="btn btn-primary" onclick="App.retryQuiz()">Retry Quiz</button>
      <button class="btn btn-ghost" onclick="App.navigate('home')">All Modules</button>
      <button class="btn btn-ghost" onclick="App.navigate('predicted')">Predicted Q's</button>
    </div>`;

  const rl = el('div','review-list');
  const lbl = el('div','section-label','Answer Review');
  rl.appendChild(lbl);
  questions.forEach((q, i) => {
    const a = answers[i];
    if (!a) return;
    const item = el('div',`review-item ${a.correct?'rc':'rw'}`);
    const selArr = Array.isArray(a.selected) ? a.selected : (a.selected !== undefined ? [a.selected] : []);
    const corrArr = Array.isArray(a.answer) ? a.answer : [a.answer];
    item.innerHTML = `
      <span class="review-tag ${a.correct?'correct':'wrong'}">${a.correct?'✓':'✗'}</span>
      <div class="review-q">Q${i+1}. ${q.q.length > 80 ? q.q.slice(0,80)+'…' : q.q}</div>
      <div class="review-ans">${a.skipped ? '<em>Skipped</em>' : `Your answer: ${selArr.map(s=>LETTERS[s]).join(', ')} &nbsp;·&nbsp; Correct: ${corrArr.map(s=>LETTERS[s]).join(', ')}`}</div>`;
    rl.appendChild(item);
  });
  card.appendChild(rl);
  qr.appendChild(card);
}

/* ── PREDICTED ───────────────────────────────────── */
function renderPredicted(root) {
  const intro = el('div','page-intro');
  intro.innerHTML = `<h1>Predicted Midterm Questions</h1><p>Based on CCNA 200-301 exam patterns. Click a question to reveal options, hint, and explanation.</p>`;
  root.appendChild(intro);

  const note = el('div','notice');
  note.innerHTML = `<span>⚡</span><span>These question styles and topics appear most frequently on CCNA Introduction to Networks exams. Master these and you'll be ready for similar questions in your midterm.</span>`;
  root.appendChild(note);

  const byMod = {};
  PREDICTED_QUESTIONS.forEach(q => { if (!byMod[q.module]) byMod[q.module] = []; byMod[q.module].push(q); });

  Object.entries(byMod).forEach(([mod, qs]) => {
    const group = el('div','predicted-group');
    group.innerHTML = `<div class="predicted-group-title">${MODULES[mod].icon} Module ${mod}: ${MODULES[mod].title}</div>`;
    qs.forEach((q, qi) => {
      const card = el('div','pred-card');
      card.innerHTML = `
        <div class="pred-head">
          <div class="pred-q">${q.q}</div>
          <span class="pred-chevron">▼</span>
        </div>
        <div class="pred-body">
          ${q.hint ? `<div class="pred-hint">💡 <strong>Hint:</strong> ${q.hint}</div>` : ''}
          <ul class="pred-options">
            ${q.options.map((o,i) => `<li class="${i===q.answer?'ans':''}"><span class="pred-opt-letter">${LETTERS[i]}.</span><span>${o}</span></li>`).join('')}
          </ul>
          <div class="pred-exp"><strong>✓ ${LETTERS[q.answer]} — Explanation:</strong> ${q.explanation}</div>
        </div>`;
      card.querySelector('.pred-head').addEventListener('click', () => card.classList.toggle('open'));
      group.appendChild(card);
    });
    root.appendChild(group);
  });
}

/* ── NOTES ───────────────────────────────────────── */
const NOTES_DATA = {
  1: { title:"Networking Today", icon:"🌐", items:["Host/End device: any device that sends or receives data","Server provides services; Client requests them; Peer-to-peer: both roles on one device","LAN: small area (office/home) · WAN: large area, connects multiple LANs","Internet = global LANs+WANs · Intranet = private internal · Extranet = controlled external","BYOD: Bring Your Own Device — personal devices on corporate network","QoS: prioritizes voice/video traffic to ensure low latency","Cloud: internet-based storage/computing accessible from anywhere","Unicast=1→1 · Multicast=1→group · Broadcast=1→all"] },
  2: { title:"IOS Configuration", icon:"⚙️",  items:["User EXEC (>) → limited monitoring only · type 'enable' to go up","Privileged EXEC (#) → full access · type 'configure terminal' for config mode","Global Config (config)# → device-wide · Interface (config-if)# · Line (config-line)#","Ctrl+Z / 'end' → jump to Privileged EXEC · 'exit' → go back one level","service password-encryption: encrypts all plain-text passwords (Type 7)","enable secret [pw]: MD5 encrypted privileged password — stronger than enable password","copy running-config startup-config → save RAM to NVRAM (persists on reload)","SVI = Switch Virtual Interface: logical IP for remote switch management (interface vlan 1)","show ip interface brief: one-line summary of all interfaces and status"] },
  3: { title:"Protocols & Models", icon:"📋", items:["OSI 7: Physical, Data Link, Network, Transport, Session, Presentation, Application","TCP/IP 4: Network Access = OSI 1+2 · Internet = OSI 3 · Transport = OSI 4 · Application = OSI 5-7","Encapsulation: add headers going DOWN stack · De-encapsulation: remove going UP","PDUs: Data (App) → Segment (Transport) → Packet (Network) → Frame (Data Link) → Bits (Physical)","TCP: connection-oriented, reliable, sequenced · UDP: connectionless, fast, no guarantees","Open standards: any vendor can implement → interoperability between different systems"] },
  4: { title:"Physical Layer", icon:"🔌", items:["Bandwidth: max capacity (theoretical) · Throughput: actual measured rate · Latency: total delay","Attenuation: signal loss over distance — reason for cable length limits","Crosstalk: interference from adjacent wire pairs — reduced by twisting","UTP max length: 100 m · Connector: RJ-45 · Types: Cat5e, Cat6","Straight-through: unlike devices (PC↔switch) · Crossover: like devices (PC↔PC)","Single-mode fiber: laser, km range · Multi-mode fiber: LED, ~550 m — immune to EMI","Wireless 802.11: CSMA/CA · Interfered by microwaves and cordless phones"] },
  6: { title:"Data Link Layer", icon:"🔗", items:["LLC sublayer: identifies upper-layer protocol (software) · MAC sublayer: addressing + access control (hardware)","Frame: Header (dest MAC, src MAC, type) | Data | Trailer (FCS/CRC)","CRC in FCS trailer: detects errors. If mismatch → frame DISCARDED (not corrected)","Broadcast MAC: FF:FF:FF:FF:FF:FF · Multicast MAC: starts 01:00:5E","CSMA/CD: wired Ethernet half-duplex · CSMA/CA: 802.11 wireless · Full-duplex: no arbitration needed","Store-and-forward: checks CRC → accurate · Cut-through: reads dest MAC only → fast","Fast-forward: lowest latency · Fragment-free: reads first 64 bytes · Store-and-forward: highest accuracy"] },
  8: { title:"Network Layer", icon:"🗺️",  items:["IP is C-B-M: Connectionless, Best-effort, Media-independent","TTL: decremented by 1 at each router hop → dropped at 0 (prevents loops)","Protocol field: 6=TCP, 17=UDP, 1=ICMP — identifies Layer 4 protocol","IPv4: 32-bit, ~4.3B addresses · IPv6: 128-bit, 340 undecillion, fixed 40-byte header","IPv6: no broadcast, uses multicast · no fragmentation in transit · built-in IPsec","ARP: resolves known IPv4 address → unknown MAC on local network","ARP request: broadcast (FF:FF:FF:FF:FF:FF) · ARP reply: unicast","Default gateway: IP address of router interface on same subnet as host","For local traffic: direct ARP · For remote traffic: ARP for gateway MAC then forward"] },
  16: { title:"Network Security", icon:"🔒", items:["Virus: needs host file, user action to spread · Worm: self-replicates automatically · Trojan: disguised as legit software","Reconnaissance: info gathering (nslookup, ping sweep) · DoS: flood to deny service · MitM: intercept between two parties","Stateful Packet Inspection: tracks connection state — blocks unsolicited inbound traffic","IDS: detects and alerts · IPS: detects and blocks in real time","AAA: Authentication (who?) · Authorization (what?) · Accounting (what did you do?)","SSH requires: unique hostname + ip domain-name + RSA keys + local user account","login block-for [s] attempts [n] within [s]: blocks brute-force login attacks","enable secret: MD5 (stronger) · service password-encryption: Type 7 (weaker, all passwords)"] }
};
function renderNotes(root) {
  const intro = el('div','page-intro');
  intro.innerHTML = `<h1>Study Notes</h1><p>Key facts per module for quick review before your exam.</p>`;
  root.appendChild(intro);
  const grid = el('div','notes-grid');
  Object.entries(NOTES_DATA).forEach(([mod, note]) => {
    const card = el('div','note-card');
    card.innerHTML = `<h3>${note.icon} Module ${mod}: ${note.title}</h3>
      <ul class="note-list">${note.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

/* ── FLASHCARDS ──────────────────────────────────── */
function renderFlashcards(root) {
  const intro = el('div','page-intro');
  intro.innerHTML = `<h1>Flashcards</h1><p>Click a card to flip it. ${FLASHCARDS.length} cards covering all 7 modules.</p>`;
  root.appendChild(intro);

  const shuffled = shuffle([...FLASHCARDS]);
  let idx = 0;
  let flipped = false;

  const wrap = el('div','flash-wrap');
  wrap.id = 'flash-wrap';
  root.appendChild(wrap);

  function draw() {
    wrap.innerHTML = `
      <div class="flash-counter">Card ${idx+1} of ${shuffled.length}</div>
      <div class="flash-card ${flipped?'flipped':''}" id="fc">
        <div class="flash-side-label">${flipped ? 'Answer' : 'Question'}</div>
        <div class="flash-text">${flipped ? shuffled[idx].a : shuffled[idx].q}</div>
        <div class="flash-tip">${flipped ? '(click to see question)' : '(click to reveal answer)'}</div>
      </div>
      <div class="flash-nav">
        <button class="btn btn-ghost" id="fc-prev" ${idx===0?'disabled':''}>← Prev</button>
        <button class="btn btn-primary" id="fc-next">${idx+1<shuffled.length?'Next →':'Restart'}</button>
      </div>`;
    $('fc').addEventListener('click', () => { flipped = !flipped; draw(); });
    $('fc-prev').addEventListener('click', () => { if(idx>0){idx--;flipped=false;draw();} });
    $('fc-next').addEventListener('click', () => {
      if (idx+1 < shuffled.length) { idx++; flipped=false; draw(); }
      else { idx=0; flipped=false; draw(); }
    });
  }
  draw();
}

/* ── Public API ──────────────────────────────────── */
window.App = {
  navigate: (view, mod) => navigate(view, mod),
  retryQuiz: () => {
    const mid = State.quiz.moduleId;
    State.quiz = {
      moduleId: mid,
      questions: shuffle([...QUIZ_DATA[mid]]),
      current: 0,
      answers: [],
      hintOpen: false
    };
    const qr = $('quiz-root');
    if (qr) { renderQuestion(); window.scrollTo(0, qr.offsetTop - 20); }
  }
};

/* ── Init ───────────────────────────────────────── */
document.querySelectorAll('[data-view]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.view));
});

buildSidebar();
navigate('home');
updateFooter();
