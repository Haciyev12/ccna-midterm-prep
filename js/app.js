/* ════════════════════════════════════════════════════
   NetPrep — App
   ════════════════════════════════════════════════════ */

/* ── State ──────────────────────────────────────────── */
const State = {
  view:     'home',
  module:   null,
  quiz:     null,
  progress: {}   // { [moduleId]: { answered, correct } }
};

/* ── Utils ──────────────────────────────────────────── */
const $     = id  => document.getElementById(id);
const mk    = tag => document.createElement(tag);
const ALPHA = ['A','B','C','D','E','F'];

function div(cls, html) {
  const d = mk('div');
  if (cls)  d.className = cls;
  if (html != null) d.innerHTML = html;
  return d;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function totalAnswered() {
  return Object.values(State.progress).reduce((s, p) => s + (p.answered || 0), 0);
}

/* ── Router ──────────────────────────────────────────── */
function navigate(view, moduleId) {
  State.view   = view;
  State.module = moduleId || null;

  document.querySelectorAll('.mod-nav-item').forEach(el =>
    el.classList.toggle('active', +el.dataset.mod === moduleId));
  document.querySelectorAll('.sidebar-link').forEach(el =>
    el.classList.toggle('active', el.dataset.view === view && !moduleId));
  if (moduleId) document.querySelectorAll('.sidebar-link').forEach(el => el.classList.remove('active'));

  const inner = $('content-inner');
  inner.innerHTML = '';

  switch (view) {
    case 'home':       renderHome(inner);           break;
    case 'module':     renderModule(inner, moduleId); break;
    case 'predicted':  renderPredicted(inner);      break;
    case 'notes':      renderNotes(inner);           break;
    case 'flashcards': renderFlashcards(inner);      break;
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMobileSidebar();
}

/* ── Sidebar builder ─────────────────────────────────── */
function buildSidebar() {
  const list = $('module-nav-list');
  list.innerHTML = '';
  Object.entries(MODULES).forEach(([id, mod]) => {
    const prog  = State.progress[id] || { answered: 0 };
    const pct   = Math.round((prog.answered / mod.questions) * 100);
    const item  = div('mod-nav-item');
    item.dataset.mod = id;
    item.innerHTML = `
      <div class="mod-nav-row">
        <span class="mod-nav-icon">${mod.icon}</span>
        <span class="mod-nav-name">M${id} · ${mod.title}</span>
      </div>
      <div class="mod-nav-track">
        <div class="mod-nav-fill" id="mnf-${id}" style="width:${pct}%"></div>
      </div>
      <div class="mod-nav-count" id="mnc-${id}">${prog.answered} / ${mod.questions}</div>`;
    item.addEventListener('click', () => navigate('module', +id));
    list.appendChild(item);
  });
}

function refreshProgress(moduleId) {
  const prog  = State.progress[moduleId] || { answered: 0 };
  const total = MODULES[moduleId].questions;
  const pct   = Math.round((prog.answered / total) * 100);
  const fill  = $(`mnf-${moduleId}`);
  const cnt   = $(`mnc-${moduleId}`);
  if (fill) fill.style.width = pct + '%';
  if (cnt)  cnt.textContent  = `${prog.answered} / ${total}`;
  updateFooter();
  refreshHomeCardProgress(moduleId);
}

function refreshHomeCardProgress(moduleId) {
  const fill  = $(`hcp-${moduleId}`);
  const label = $(`hcl-${moduleId}`);
  if (!fill) return;
  const prog  = State.progress[moduleId] || { answered: 0 };
  const total = MODULES[moduleId].questions;
  const pct   = Math.round((prog.answered / total) * 100);
  fill.style.width   = pct + '%';
  label.textContent  = `${prog.answered} / ${total} questions`;
}

function updateFooter() {
  const a = totalAnswered(), t = 105;
  $('footer-stat').textContent    = `${a} / ${t} answered`;
  $('footer-bar-fill').style.width = Math.round(a / t * 100) + '%';
}

/* Mobile sidebar */
function closeMobileSidebar() {
  $('sidebar').classList.remove('open');
  $('sidebar-overlay').classList.remove('open');
}
$('sidebar-toggle').addEventListener('click', () => {
  $('sidebar').classList.toggle('open');
  $('sidebar-overlay').classList.toggle('open');
});
$('sidebar-overlay').addEventListener('click', closeMobileSidebar);

/* ════════════════════════════════════════════════════
   HOME
   ════════════════════════════════════════════════════ */
function renderHome(root) {

  /* Hero */
  const hero = div('home-hero');
  hero.innerHTML = `
    <div class="hero-eyebrow">
      <span class="hero-dot"></span>
      CCNA ITN · Intro to Networks · Midterm Prep
    </div>
    <h1 class="hero-h1">
      Master Computer<br>Networks <em>Before</em><br>Your Midterm.
    </h1>
    <p class="hero-sub">
      Topic recaps for every module, practice quizzes with instant explanations,
      hints, and predicted exam questions — all in one place.
    </p>
    <div class="hero-actions">
      <button class="btn btn-primary btn-lg" id="hero-start">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Start with Module 1
      </button>
      <button class="btn btn-ghost btn-lg" id="hero-predicted">
        View Predicted Questions
      </button>
    </div>
    <div class="hero-stats">
      <div class="h-stat"><div class="h-stat-num">7</div><div class="h-stat-lbl">Modules</div></div>
      <div class="h-stat"><div class="h-stat-num">105</div><div class="h-stat-lbl">Quiz Questions</div></div>
      <div class="h-stat"><div class="h-stat-num">14</div><div class="h-stat-lbl">Predicted Q's</div></div>
      <div class="h-stat"><div class="h-stat-num">34</div><div class="h-stat-lbl">Flashcards</div></div>
    </div>`;
  root.appendChild(hero);

  hero.querySelector('#hero-start').addEventListener('click', () => navigate('module', 1));
  hero.querySelector('#hero-predicted').addEventListener('click', () => navigate('predicted'));

  /* Module grid */
  const section = div('home-modules-section');
  section.innerHTML = `
    <div class="home-section-header">
      <div class="home-section-title">All Modules</div>
      <div class="home-section-sub">Click any module to open its recap and quiz</div>
    </div>`;

  const grid = div('module-grid');
  Object.entries(MODULES).forEach(([id, mod]) => {
    const prog  = State.progress[id] || { answered: 0 };
    const pct   = Math.round((prog.answered / mod.questions) * 100);
    const card  = div('module-card');
    card.style.setProperty('--mc', mod.color);
    card.innerHTML = `
      <div class="mc-banner"></div>
      <div class="mc-body">
        <div class="mc-top">
          <div class="mc-num-badge">Module ${id}</div>
          <div class="mc-icon-wrap">${mod.icon}</div>
        </div>
        <div class="mc-title">${mod.title}</div>
        <div class="mc-desc">${modDesc(+id)}</div>
        <div class="mc-footer">
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar">
              <div class="mc-prog-fill" id="hcp-${id}" style="width:${pct}%"></div>
            </div>
            <div class="mc-prog-label" id="hcl-${id}">${prog.answered} / ${mod.questions} questions</div>
          </div>
          <button class="btn btn-primary btn-sm" style="background:${mod.color};box-shadow:none">
            Open
          </button>
        </div>
      </div>`;
    card.addEventListener('click', () => navigate('module', +id));
    grid.appendChild(card);
  });

  section.appendChild(grid);
  root.appendChild(section);
}

function modDesc(id) {
  const d = {
    1:  'Networks, components, topologies, internet connections, BYOD, QoS, and cloud.',
    2:  'Cisco IOS modes, navigation, commands, switch configuration, SSH vs Telnet.',
    3:  'Communication protocols, OSI model, TCP/IP model, encapsulation, and PDUs.',
    4:  'Physical media, bandwidth, UTP cabling, fiber-optics, and wireless.',
    6:  'Data Link sublayers, frames, MAC addressing, CSMA/CD, and switching methods.',
    8:  'IP characteristics, IPv4 & IPv6 headers, routing, ARP, and default gateways.',
    16: 'Security threats, malware types, attack mitigations, firewalls, SSH, and AAA.'
  };
  return d[id] || '';
}

/* ════════════════════════════════════════════════════
   MODULE PAGE
   ════════════════════════════════════════════════════ */
function renderModule(root, moduleId) {
  const mod   = MODULES[moduleId];
  const recap = MODULE_RECAP[moduleId];

  /* ── Header ── */
  const header = div('mod-page-header');
  header.style.setProperty('--mph-color', mod.color);
  header.innerHTML = `
    <div class="mph-accent-bar"></div>
    <div class="mph-inner">
      <div class="mph-icon-wrap" style="background:${mod.color}18;border-color:${mod.color}33">
        ${mod.icon}
      </div>
      <div class="mph-content">
        <div class="mph-eyebrow">Module ${moduleId} · CCNA Introduction to Networks</div>
        <div class="mph-title">${mod.title}</div>
        <div class="mph-desc">${modDesc(moduleId)}</div>
        <div class="mph-chips">
          <span class="mph-chip"><strong>${recap ? recap.sections.length : 0}</strong>&nbsp;topics covered</span>
          <span class="mph-chip"><strong>${(QUIZ_DATA[moduleId] || []).length}</strong>&nbsp;practice questions</span>
        </div>
      </div>
    </div>`;
  root.appendChild(header);

  /* ── Recap ── */
  if (recap && recap.sections.length) {
    const rs = div('recap-section');
    const rt = div('recap-section-title');
    rt.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/>
        <path d="M4 5h5M4 7.5h3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      Topic Recap`;
    rs.appendChild(rt);

    recap.sections.forEach((sec, i) => {
      const det = document.createElement('details');
      det.className = 'recap-block';
      if (i === 0) det.open = true;

      const sum = document.createElement('summary');
      sum.innerHTML = `
        <span>${sec.title}</span>
        <span class="summary-arrow">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>`;
      det.appendChild(sum);

      const body = div('recap-body');
      body.appendChild(div('recap-divider'));

      /* Bullet list */
      if (sec.points && sec.points.length) {
        const ul = document.createElement('ul');
        ul.className = 'recap-points';
        sec.points.forEach(p => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span class="rp-bullet">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 4l1.5 1.5L6 2.5" stroke="#2563EB" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>${p}</span>`;
          ul.appendChild(li);
        });
        body.appendChild(ul);
      }

      /* Table */
      if (sec.table) {
        const tbl = document.createElement('table');
        tbl.className = 'recap-table';
        const thead = document.createElement('thead');
        const hr = document.createElement('tr');
        sec.table.headers.forEach(h => {
          const th = document.createElement('th');
          th.innerHTML = h;
          hr.appendChild(th);
        });
        thead.appendChild(hr);
        tbl.appendChild(thead);
        const tbody = document.createElement('tbody');
        sec.table.rows.forEach(row => {
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.innerHTML = cell;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        tbl.appendChild(tbody);
        body.appendChild(tbl);
      }

      /* Callout */
      if (sec.callout) {
        const c = div(`callout callout-${sec.callout.type}`);
        c.innerHTML = `<span class="callout-icon">${sec.callout.type === 'trap' ? '⚠' : '💡'}</span><span>${sec.callout.text}</span>`;
        body.appendChild(c);
      }

      det.appendChild(body);
      rs.appendChild(det);
    });
    root.appendChild(rs);
  }

  /* ── Quiz ── */
  if (QUIZ_DATA[moduleId]) {
    State.quiz = {
      moduleId,
      questions:    shuffle([...QUIZ_DATA[moduleId]]),
      current:      0,
      answers:      [],
      answered:     false,
      selectedMulti: []
    };
    if (!State.progress[moduleId])
      State.progress[moduleId] = { answered: 0, correct: 0 };

    const qz = div('quiz-section');
    qz.id = 'quiz-root';
    root.appendChild(qz);
    renderQuestion();
  }
}

/* ════════════════════════════════════════════════════
   QUIZ
   ════════════════════════════════════════════════════ */
function renderQuestion() {
  const qr = $('quiz-root');
  if (!qr) return;
  qr.innerHTML = '';

  const { questions, current, moduleId } = State.quiz;
  const q     = questions[current];
  const total = questions.length;
  const pct   = Math.round((current / total) * 100);
  const mod   = MODULES[moduleId];

  /* Section divider */
  const div0 = div('section-divider');
  div0.innerHTML = `
    <span class="section-divider-label">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="display:inline-block;vertical-align:middle;margin-right:4px">
        <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.3"/>
        <path d="M4.5 6l1 1 2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Practice Quiz
    </span>
    <div class="section-divider-line"></div>`;
  qr.appendChild(div0);

  /* Meta bar */
  const hbar = div('quiz-header-bar');
  hbar.innerHTML = `
    <h2>Module ${moduleId}: ${mod.title}</h2>
    <div class="quiz-meta">
      <span class="quiz-badge">Question ${current + 1} of ${total}</span>
      <span class="quiz-badge" style="color:${mod.color};border-color:${mod.color}33">${mod.icon} ${Math.round(pct)}% done</span>
    </div>`;
  qr.appendChild(hbar);

  /* Progress bar */
  const pt = div('progress-track');
  pt.innerHTML = `
    <div class="progress-row">
      <span>${current} of ${total} answered</span>
      <span>${Math.round(pct)}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${pct}%"></div>
    </div>`;
  qr.appendChild(pt);

  /* Question card */
  const card = div('q-card');

  /* Card header */
  const ch = div('q-card-header');
  ch.innerHTML = `
    <div class="q-num">Question ${current + 1}</div>
    ${q.multi ? `<div class="multi-badge">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6" y="1" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="6" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6" y="6" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>
      Select ${Array.isArray(q.answer) ? q.answer.length : 1} answers
    </div>` : ''}`;
  card.appendChild(ch);

  /* Question body */
  const qb = div('q-body');
  qb.innerHTML = `<div class="q-text">${q.q}</div>`;

  /* Hint panel */
  const hintPanel = div('hint-panel');
  hintPanel.id = 'hint-panel';
  hintPanel.innerHTML = `<span class="hint-label">💡 Hint:</span><span>${q.hint || ''}</span>`;
  qb.appendChild(hintPanel);
  card.appendChild(qb);

  /* Options */
  const optsWrap = div('options');
  optsWrap.id = 'opts';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="opt-letter">${ALPHA[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectOption(i));
    optsWrap.appendChild(btn);
  });
  card.appendChild(optsWrap);

  /* Footer */
  const footer = div('q-footer');
  footer.innerHTML = `
    <div class="q-footer-left">
      ${q.hint ? `<button class="hint-btn" id="hint-btn">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4.5v.5M6 7.5V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="6" cy="5.75" r="0.5" fill="currentColor"/></svg>
        Hint
      </button>` : ''}
      <button class="skip-btn" id="skip-btn">Skip →</button>
    </div>
    <div>
      <span class="feedback-badge" id="feedback-badge"></span>
      <button class="btn btn-primary" id="next-btn" style="display:none">
        ${current + 1 < total ? 'Next Question' : 'See Results'}
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`;
  card.appendChild(footer);
  qr.appendChild(card);

  State.quiz.answered      = false;
  State.quiz.selectedMulti = [];

  /* Hint wiring */
  const hBtn = $('hint-btn');
  if (hBtn) {
    hBtn.addEventListener('click', () => {
      const panel  = $('hint-panel');
      const isOpen = panel.classList.contains('visible');
      panel.classList.toggle('visible', !isOpen);
      hBtn.innerHTML = isOpen
        ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4.5v.5M6 7.5V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="6" cy="5.75" r="0.5" fill="currentColor"/></svg> Hint`
        : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Hide`;
    });
  }
  $('skip-btn').addEventListener('click', skipQuestion);
  $('next-btn').addEventListener('click', nextQuestion);
}

/* ── Answer logic ──────────────────────────────────── */
function selectOption(idx) {
  if (State.quiz.answered) return;
  const q = State.quiz.questions[State.quiz.current];

  if (q.multi) {
    const btn = document.querySelector(`.opt-btn[data-idx="${idx}"]`);
    const si  = State.quiz.selectedMulti.indexOf(idx);
    if (si === -1) { State.quiz.selectedMulti.push(idx); btn.classList.add('selected'); }
    else           { State.quiz.selectedMulti.splice(si, 1); btn.classList.remove('selected'); }
    if (State.quiz.selectedMulti.length === q.answer.length) submitMulti();
    return;
  }
  submitSingle(idx);
}

function submitSingle(idx) {
  State.quiz.answered = true;
  const q = State.quiz.questions[State.quiz.current];
  const correct = idx === q.answer;

  recordAnswer({ correct, selected: idx, answer: q.answer });

  document.querySelectorAll('.opt-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('answered');
    const i = +b.dataset.idx;
    if (i === q.answer)               b.classList.add('is-correct');
    else if (i === idx && !correct)   b.classList.add('is-wrong');
  });

  /* Wrong explanation under the chosen wrong option */
  if (!correct && q.wrongExp && q.wrongExp[idx]) {
    const wrongBtn = document.querySelector(`.opt-btn[data-idx="${idx}"]`);
    const exp = div('opt-explanation exp-wrong show');
    exp.innerHTML = `<span class="exp-label">Why this is wrong:</span> ${q.wrongExp[idx]}`;
    wrongBtn.appendChild(exp);
  }

  /* Correct explanation under the correct option */
  if (q.explanation) {
    const correctBtn = document.querySelector(`.opt-btn[data-idx="${q.answer}"]`);
    const exp = div(`opt-explanation exp-right show`);
    exp.innerHTML = `<span class="exp-label">${correct ? '✓ Correct:' : 'Correct answer:'}</span> ${q.explanation}`;
    correctBtn.appendChild(exp);
  }

  showFeedback(correct);
}

function submitMulti() {
  State.quiz.answered = true;
  const q       = State.quiz.questions[State.quiz.current];
  const sel     = State.quiz.selectedMulti;
  const corrSet = new Set(q.answer);
  const selSet  = new Set(sel);
  const correct = q.answer.every(a => selSet.has(a)) && sel.every(s => corrSet.has(s));

  recordAnswer({ correct, selected: sel, answer: q.answer, multi: true });

  document.querySelectorAll('.opt-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('answered');
    const i = +b.dataset.idx;
    if (corrSet.has(i))  b.classList.add('is-correct');
    else if (selSet.has(i)) b.classList.add('is-wrong');
  });

  if (q.explanation) {
    const cb = document.querySelector(`.opt-btn[data-idx="${q.answer[0]}"]`);
    if (cb) {
      const exp = div('opt-explanation exp-right show');
      exp.innerHTML = `<span class="exp-label">${correct ? '✓ All correct:' : 'Correct answers:'}</span> ${q.explanation}`;
      cb.appendChild(exp);
    }
  }
  showFeedback(correct);
}

function recordAnswer(data) {
  State.quiz.answers.push(data);
  const mid = State.quiz.moduleId;
  if (!State.progress[mid]) State.progress[mid] = { answered: 0, correct: 0 };
  State.progress[mid].answered++;
  if (data.correct) State.progress[mid].correct++;
  refreshProgress(mid);
}

function showFeedback(correct) {
  const fb  = $('feedback-badge');
  fb.className = `feedback-badge show ${correct ? 'feedback-correct' : 'feedback-wrong'}`;
  fb.innerHTML = correct
    ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="currentColor" fill-opacity="0.15"/><path d="M3.5 6l2 2 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Correct!`
    : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="currentColor" fill-opacity="0.12"/><path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Incorrect`;
  $('next-btn').style.display = 'inline-flex';
  $('skip-btn').style.display = 'none';
  const hb = $('hint-btn');
  if (hb) hb.style.display = 'none';
}

function skipQuestion() {
  const q = State.quiz.questions[State.quiz.current];
  recordAnswer({ skipped: true, correct: false, answer: q.answer });
  nextQuestion();
}

function nextQuestion() {
  State.quiz.current++;
  if (State.quiz.current >= State.quiz.questions.length) {
    renderResults();
  } else {
    renderQuestion();
    const qr = $('quiz-root');
    if (qr) window.scrollTo({ top: qr.offsetTop - 24, behavior: 'smooth' });
  }
}

/* ════════════════════════════════════════════════════
   RESULTS
   ════════════════════════════════════════════════════ */
function renderResults() {
  const qr  = $('quiz-root');
  qr.innerHTML = '';
  const { answers, questions, moduleId } = State.quiz;
  const correct = answers.filter(a => a.correct).length;
  const total   = answers.length;
  const pct     = Math.round(correct / total * 100);
  const grade   = pct >= 80 ? 'great' : pct >= 60 ? 'ok' : 'poor';
  const emoji   = grade === 'great' ? '🎉' : grade === 'ok' ? '📚' : '💪';
  const msg     = grade === 'great' ? 'Excellent work!' : grade === 'ok' ? 'Good effort — keep going!' : 'Review the recap and try again.';

  const card = div('results-card');
  card.innerHTML = `
    <div class="score-ring ${grade}">
      <div class="score-ring-num">${pct}%</div>
      <div class="score-ring-emoji">${emoji}</div>
    </div>
    <div class="results-headline">${msg}</div>
    <div class="results-sub">Module ${moduleId}: ${MODULES[moduleId].title}</div>
    <div class="results-row">
      <div class="result-stat"><div class="v" style="color:var(--ok)">${correct}</div><div class="l">Correct</div></div>
      <div class="result-stat"><div class="v" style="color:var(--bad)">${total - correct}</div><div class="l">Wrong/Skipped</div></div>
      <div class="result-stat"><div class="v">${total}</div><div class="l">Total</div></div>
    </div>
    <div class="results-btns">
      <button class="btn btn-primary" onclick="App.retryQuiz()">Retry Quiz</button>
      <button class="btn btn-ghost" onclick="App.navigate('home')">All Modules</button>
      <button class="btn btn-ghost" onclick="App.navigate('predicted')">Predicted Q's</button>
    </div>
    <div class="review-list">
      <div class="review-list-label">Answer Review</div>
      ${questions.map((q, i) => {
        const a   = answers[i];
        if (!a) return '';
        const sel = Array.isArray(a.selected) ? a.selected : (a.selected !== undefined ? [a.selected] : []);
        const cor = Array.isArray(a.answer)   ? a.answer   : [a.answer];
        return `
          <div class="review-item ${a.correct ? 'rc' : 'rw'}">
            <span class="review-tag ${a.correct ? 'correct' : 'wrong'}">${a.correct ? '✓' : '✗'}</span>
            <div class="review-q">Q${i+1}. ${q.q.length > 90 ? q.q.slice(0, 90) + '…' : q.q}</div>
            <div class="review-ans">
              ${a.skipped
                ? '<em>Skipped</em>'
                : `Your answer: ${sel.map(s => ALPHA[s]).join(', ')} &nbsp;·&nbsp; Correct: ${cor.map(s => ALPHA[s]).join(', ')}`}
            </div>
          </div>`;
      }).join('')}
    </div>`;

  qr.appendChild(card);
}

/* ════════════════════════════════════════════════════
   PREDICTED QUESTIONS
   ════════════════════════════════════════════════════ */
function renderPredicted(root) {
  const intro = div('page-intro');
  intro.innerHTML = `
    <div class="page-intro-eyebrow">Exam Preparation</div>
    <h1>Predicted Midterm Questions</h1>
    <p>Crafted from CCNA 200-301 exam patterns and your module topics. These question types and styles consistently appear on Introduction to Networks exams.</p>`;
  root.appendChild(intro);

  const notice = div('notice');
  notice.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M8 5v3.5M8 11v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <span>Click any question to expand it and reveal the hint, all options, and a detailed explanation of the correct answer.</span>`;
  root.appendChild(notice);

  const byMod = {};
  PREDICTED_QUESTIONS.forEach(q => {
    if (!byMod[q.module]) byMod[q.module] = [];
    byMod[q.module].push(q);
  });

  Object.entries(byMod).forEach(([mod, qs]) => {
    const group = div('predicted-group');
    const gt = div('predicted-group-title');
    gt.innerHTML = `${MODULES[mod].icon} Module ${mod}: ${MODULES[mod].title}`;
    group.appendChild(gt);

    qs.forEach(q => {
      const card = div('pred-card');
      card.innerHTML = `
        <div class="pred-head">
          <div class="pred-q">${q.q}</div>
          <span class="pred-chevron">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="pred-body">
          ${q.hint ? `<div class="pred-hint">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 4.5v2.5M6.5 9v.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            <span><strong>Hint:</strong> ${q.hint}</span>
          </div>` : ''}
          <ul class="pred-options">
            ${q.options.map((o, i) => `
              <li class="${i === q.answer ? 'ans' : ''}">
                <span class="pred-opt-letter">${ALPHA[i]}.</span>
                <span>${o}</span>
              </li>`).join('')}
          </ul>
          <div class="pred-exp">
            <strong>✓ ${ALPHA[q.answer]} — </strong>${q.explanation}
          </div>
        </div>`;
      card.querySelector('.pred-head').addEventListener('click', () => card.classList.toggle('open'));
      group.appendChild(card);
    });

    root.appendChild(group);
  });
}

/* ════════════════════════════════════════════════════
   STUDY NOTES
   ════════════════════════════════════════════════════ */
const NOTES_DATA = {
  1:  { icon:'🌐', items:['Host/End device: any device that sends or receives data on a network','Server provides services; Client requests them; P2P: one device plays both roles','LAN: small area (office/home) · WAN: large geographic area connecting multiple LANs','Internet = global public LANs+WANs · Intranet = private internal · Extranet = controlled external access','BYOD: Bring Your Own Device — personal devices on corporate network','QoS: prioritizes voice/video traffic to ensure low latency and no jitter','Cloud: internet-based storage/computing — accessible from any device, anywhere','Unicast = 1→1 · Multicast = 1→group · Broadcast = 1→all on network'] },
  2:  { icon:'⚙️',  items:['User EXEC (>) — limited monitoring · type enable to elevate to Privileged','Privileged EXEC (#) — full access · type configure terminal for Global Config','Global Config (config)# · Interface (config-if)# · Line (config-line)#','Ctrl+Z / end → jump directly to Privileged EXEC · exit → go up one level','service password-encryption: Type 7 (weak) — encrypts ALL plain-text passwords','enable secret [pw]: Type 5 MD5 — stronger than enable password','copy running-config startup-config → save RAM to NVRAM (survives reload)','SVI (interface vlan 1) = logical interface for remote IP management of a switch','show ip interface brief: one-line summary of all interfaces and their status'] },
  3:  { icon:'📋', items:['OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application','TCP/IP 4 layers: Network Access = OSI 1+2 · Internet = OSI 3 · Transport = OSI 4 · App = OSI 5–7','PDUs: Data (App) → Segment (Transport) → Packet (Network) → Frame (Data Link) → Bits (Physical)','Encapsulation: add headers moving DOWN the stack · De-encapsulation: remove going UP','TCP: connection-oriented, reliable, ordered · UDP: connectionless, fast, unreliable','Open standards allow any vendor to implement them → interoperability between devices'] },
  4:  { icon:'🔌', items:['Bandwidth: max capacity (theoretical) · Throughput: actual measured rate (always ≤ bandwidth)','Latency: total delay source→destination · Goodput: useful data rate (no overhead)','Attenuation: signal weakening over distance — reason for 100 m UTP limit','Crosstalk: interference from adjacent wire pairs — reduced by twisting the pairs together','UTP: most common, RJ-45 connector, 100 m max — cheap but susceptible to EMI','Straight-through: unlike devices (PC↔switch) · Crossover: like devices (PC↔PC)','Single-mode fiber: laser, km distances · Multi-mode fiber: LED, ~550 m · Both immune to EMI','Wireless 802.11: CSMA/CA · Interfered by microwaves and cordless phones'] },
  6:  { icon:'🔗', items:['LLC sublayer (software): identifies upper-layer protocol · MAC sublayer (hardware): addressing + access control','Frame structure: Header (dest MAC, src MAC, type) | Data | Trailer (FCS/CRC)','FCS/CRC in trailer: detects errors — if mismatch the frame is DISCARDED (not corrected)','Broadcast MAC: FF:FF:FF:FF:FF:FF · Multicast MAC: starts with 01:00:5E','CSMA/CD: wired Ethernet half-duplex (detects collisions) · CSMA/CA: 802.11 wireless (avoids them)','Full-duplex: simultaneous send/receive — no arbitration needed','Store-and-forward: checks CRC → accurate · Cut-through/Fast-forward: reads dest MAC only → fastest'] },
  8:  { icon:'🗺️',  items:['IP is C-B-M: Connectionless, Best-effort delivery, Media-independent','TTL: decremented by 1 at each router · dropped when TTL=0 (prevents routing loops)','Protocol field: 6=TCP, 17=UDP, 1=ICMP — tells receiver which Layer 4 process to use','IPv4: 32-bit (~4.3B addresses) · IPv6: 128-bit (340 undecillion), fixed 40-byte header','IPv6: no broadcast (uses multicast) · no in-transit fragmentation · built-in IPsec','ARP: resolves known IPv4 address → unknown MAC on local network (broadcast request, unicast reply)','Default gateway: IP of router interface on the same subnet — used ONLY for remote traffic','For local traffic: ARP directly to destination · For remote: ARP to get gateway MAC'] },
  16: { icon:'🔒', items:['Virus: attaches to files, needs user action to spread · Worm: self-replicates automatically · Trojan: disguised as legit software','Reconnaissance: info gathering (nslookup, ping sweep) · DoS: flood to deny service · MitM: intercept between two parties','Stateful Packet Inspection: tracks connection state — blocks inbound that has no matching outbound request','IDS: detects and alerts only · IPS: detects and BLOCKS in real time','AAA: Authentication (who?) · Authorization (what can they do?) · Accounting (what did they do?)','SSH requires: unique hostname + ip domain-name + RSA key pair + local user account','login block-for [s] attempts [n] within [s] — mitigates brute-force login attacks','enable secret: MD5 (stronger) · service password-encryption: Type 7 (weaker, all passwords)'] }
};

function renderNotes(root) {
  const intro = div('page-intro');
  intro.innerHTML = `
    <div class="page-intro-eyebrow">Quick Reference</div>
    <h1>Study Notes</h1>
    <p>Key facts and definitions for each module. Perfect for a quick review before your exam.</p>`;
  root.appendChild(intro);

  const grid = div('notes-grid');
  Object.entries(NOTES_DATA).forEach(([modId, note]) => {
    const mod  = MODULES[modId];
    const card = div('note-card');
    card.innerHTML = `
      <div class="note-card-head">
        <div class="note-card-icon">${note.icon}</div>
        <div>
          <div class="note-num">Module ${modId}</div>
          <h3>${mod.title}</h3>
        </div>
      </div>
      <ul class="note-list">
        ${note.items.map(item => `
          <li>
            <span class="note-bullet"></span>
            <span>${item}</span>
          </li>`).join('')}
      </ul>`;
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

/* ════════════════════════════════════════════════════
   FLASHCARDS
   ════════════════════════════════════════════════════ */
function renderFlashcards(root) {
  const intro = div('page-intro');
  intro.innerHTML = `
    <div class="page-intro-eyebrow">Active Recall</div>
    <h1>Flashcards</h1>
    <p>Click a card to flip it. ${FLASHCARDS.length} cards covering key concepts from all 7 modules.</p>`;
  root.appendChild(intro);

  const cards   = shuffle([...FLASHCARDS]);
  let   idx     = 0;
  let   flipped = false;

  const outer = div('flash-outer');
  outer.id = 'flash-outer';
  root.appendChild(outer);

  function draw() {
    outer.innerHTML = `
      <div class="flash-counter">Card ${idx + 1} of ${cards.length}</div>
      <div class="flash-card${flipped ? ' flipped' : ''}" id="fc" role="button" tabindex="0" aria-label="${flipped ? 'Answer' : 'Question'}: ${flipped ? cards[idx].a : cards[idx].q}">
        <div class="flash-side-label">
          <span class="flash-side-dot"></span>
          ${flipped ? 'Answer' : 'Question'}
        </div>
        <div class="flash-text">${flipped ? cards[idx].a : cards[idx].q}</div>
        <div class="flash-tap-hint">${flipped ? 'Click to see question' : 'Click to reveal answer'}</div>
      </div>
      <div class="flash-nav">
        <button class="btn btn-ghost" id="fc-prev" ${idx === 0 ? 'disabled' : ''}>← Previous</button>
        <button class="btn btn-primary" id="fc-next">
          ${idx + 1 < cards.length ? 'Next →' : 'Restart'}
        </button>
      </div>`;
    const fc = $('fc');
    fc.addEventListener('click', () => { flipped = !flipped; draw(); });
    fc.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { flipped = !flipped; draw(); } });
    $('fc-prev').addEventListener('click', () => { if (idx > 0) { idx--; flipped = false; draw(); } });
    $('fc-next').addEventListener('click', () => {
      if (idx + 1 < cards.length) { idx++; flipped = false; draw(); }
      else { idx = 0; flipped = false; draw(); }
    });
  }
  draw();
}

/* ── Public API ──────────────────────────────────────── */
window.App = {
  navigate: (view, mod) => navigate(view, mod),
  retryQuiz: () => {
    const mid = State.quiz.moduleId;
    State.quiz = {
      moduleId:      mid,
      questions:     shuffle([...QUIZ_DATA[mid]]),
      current:       0,
      answers:       [],
      answered:      false,
      selectedMulti: []
    };
    const qr = $('quiz-root');
    if (qr) { renderQuestion(); window.scrollTo({ top: qr.offsetTop - 24, behavior: 'smooth' }); }
  }
};

/* ── Init ────────────────────────────────────────────── */
document.querySelectorAll('[data-view]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.view));
});
buildSidebar();
navigate('home');
updateFooter();
