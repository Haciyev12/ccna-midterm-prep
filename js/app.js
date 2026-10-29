/* ====================================================
   Network Exam Prep – App Logic
   ==================================================== */

const App = (() => {
  let currentPage = 'home';
  let quizState = null;
  let flashState = null;

  /* --------------------------------------------------
     ROUTER
  -------------------------------------------------- */
  function navigate(page, params = {}) {
    currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`)?.classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
    window.scrollTo(0, 0);
    if (page === 'home') renderHome();
    if (page === 'quiz') renderQuizSelector(params.module);
    if (page === 'predicted') renderPredicted();
    if (page === 'notes') renderNotes();
    if (page === 'flashcards') renderFlashcards();
  }

  /* --------------------------------------------------
     HOME
  -------------------------------------------------- */
  function renderHome() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = Object.entries(MODULES).map(([num, mod]) => `
      <div class="module-card" style="--mod-color:${mod.color}" onclick="App.startQuiz(${num})">
        <div class="module-card-header">
          <div class="module-icon">${mod.icon}</div>
          <div>
            <div class="module-num">Module ${num}</div>
            <div class="module-name">${mod.title}</div>
          </div>
        </div>
        <div class="module-desc">${mod.description}</div>
        <div class="module-topics">
          ${mod.keyTopics.slice(0, 4).map(t => `<span class="topic-tag">${t}</span>`).join('')}
        </div>
        <div style="margin-top:14px;display:flex;gap:8px;">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();App.startQuiz(${num})">Start Quiz →</button>
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();App.startFlashcards(${num})">Flashcards</button>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------
     QUIZ
  -------------------------------------------------- */
  function startQuiz(moduleNum) {
    const questions = QUIZ_DATA[moduleNum];
    if (!questions) return;
    quizState = {
      module: moduleNum,
      questions: shuffle([...questions]),
      current: 0,
      answers: [],
      answered: false
    };
    navigate('quiz');
    renderQuizQuestion();
  }

  function renderQuizSelector(moduleNum) {
    if (moduleNum !== undefined) {
      startQuiz(moduleNum);
      return;
    }
    // Show module selector
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="section-title">Choose a Module to Quiz</div>
      <div class="modules-grid">
        ${Object.entries(MODULES).map(([num, mod]) => `
          <div class="module-card" style="--mod-color:${mod.color}" onclick="App.startQuiz(${num})">
            <div class="module-card-header">
              <div class="module-icon">${mod.icon}</div>
              <div>
                <div class="module-num">Module ${num} · ${QUIZ_DATA[num].length} questions</div>
                <div class="module-name">${mod.title}</div>
              </div>
            </div>
            <div style="margin-top:12px">
              <button class="btn btn-primary btn-sm">Start Quiz →</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderQuizQuestion() {
    const { questions, current, module: mod } = quizState;
    const q = questions[current];
    const total = questions.length;
    const pct = Math.round((current / total) * 100);
    const modInfo = MODULES[mod];
    const letters = ['A','B','C','D','E','F'];

    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="quiz-page">
        <div class="quiz-header">
          <div class="mod-icon">${modInfo.icon}</div>
          <div class="quiz-header-info">
            <h2>Module ${mod}: ${modInfo.title}</h2>
            <p>Practice Quiz</p>
          </div>
          <div class="quiz-meta">
            <span class="meta-badge">Q ${current + 1} of ${total}</span>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('quiz')">← Back</button>
          </div>
        </div>

        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>

        <div class="question-card">
          <div class="question-num">Question ${current + 1} of ${total}</div>
          <div class="question-text">${q.q}</div>
          ${q.multi ? `<div class="multi-hint">⚡ Select all that apply (${Array.isArray(q.answer) ? q.answer.length : 1} answers)</div>` : ''}
          <div class="options-list" id="options-list">
            ${q.options.map((opt, i) => `
              <button class="option-btn" id="opt-${i}" onclick="App.selectOption(${i})" data-idx="${i}">
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="explanation-box" id="explanation-box"></div>
        </div>

        <div class="quiz-controls">
          <div id="quiz-feedback" style="font-size:14px;font-weight:600;"></div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="App.skipQuestion()" id="skip-btn">Skip</button>
            <button class="btn btn-primary" id="next-btn" onclick="App.nextQuestion()" style="display:none;">
              ${current + 1 < total ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        </div>
      </div>
    `;

    quizState.answered = false;
    quizState.selectedMulti = [];
  }

  function selectOption(idx) {
    const q = quizState.questions[quizState.current];
    if (quizState.answered && !q.multi) return;

    if (q.multi) {
      const btn = document.getElementById(`opt-${idx}`);
      const si = quizState.selectedMulti.indexOf(idx);
      if (si === -1) {
        quizState.selectedMulti.push(idx);
        btn.classList.add('selected');
      } else {
        quizState.selectedMulti.splice(si, 1);
        btn.classList.remove('selected');
      }

      // Check if they've selected required number
      const required = q.answer.length;
      if (quizState.selectedMulti.length === required) {
        submitMulti();
      }
      return;
    }

    // Single answer
    if (quizState.answered) return;
    quizState.answered = true;
    const correct = idx === q.answer;
    quizState.answers.push({ correct, selected: idx, answer: q.answer });

    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

    const btn = document.getElementById(`opt-${idx}`);
    btn.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) {
      document.getElementById(`opt-${q.answer}`).classList.add('correct');
    }

    const fb = document.getElementById('quiz-feedback');
    fb.textContent = correct ? '✓ Correct!' : '✗ Incorrect';
    fb.style.color = correct ? 'var(--green)' : 'var(--red)';

    const expBox = document.getElementById('explanation-box');
    const letters = ['A','B','C','D','E','F'];
    expBox.innerHTML = `<strong>Correct Answer: ${letters[q.answer]}.</strong> ${q.explanation || ''}`;
    expBox.classList.add('show');

    document.getElementById('next-btn').style.display = 'inline-flex';
    document.getElementById('skip-btn').style.display = 'none';
  }

  function submitMulti() {
    const q = quizState.questions[quizState.current];
    quizState.answered = true;
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

    const correctSet = new Set(q.answer);
    const selectedSet = new Set(quizState.selectedMulti);
    const isCorrect = q.answer.every(a => selectedSet.has(a)) && quizState.selectedMulti.every(s => correctSet.has(s));

    quizState.answers.push({ correct: isCorrect, selected: quizState.selectedMulti, answer: q.answer });

    q.options.forEach((_, i) => {
      const btn = document.getElementById(`opt-${i}`);
      if (correctSet.has(i)) btn.classList.add('correct');
      else if (selectedSet.has(i)) btn.classList.add('wrong');
    });

    const fb = document.getElementById('quiz-feedback');
    fb.textContent = isCorrect ? '✓ All correct!' : '✗ Not quite';
    fb.style.color = isCorrect ? 'var(--green)' : 'var(--red)';

    const letters = ['A','B','C','D','E','F'];
    const expBox = document.getElementById('explanation-box');
    expBox.innerHTML = `<strong>Correct Answers: ${q.answer.map(a => letters[a]).join(', ')}.</strong> ${q.explanation || ''}`;
    expBox.classList.add('show');

    document.getElementById('next-btn').style.display = 'inline-flex';
    document.getElementById('skip-btn').style.display = 'none';
  }

  function skipQuestion() {
    quizState.answers.push({ correct: false, skipped: true, answer: quizState.questions[quizState.current].answer });
    nextQuestion();
  }

  function nextQuestion() {
    quizState.current++;
    if (quizState.current >= quizState.questions.length) {
      renderResults();
    } else {
      renderQuizQuestion();
    }
  }

  function renderResults() {
    const { answers, questions, module: mod } = quizState;
    const correct = answers.filter(a => a.correct).length;
    const total = answers.length;
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 80 ? 'great' : pct >= 60 ? 'ok' : 'poor';
    const letters = ['A','B','C','D','E','F'];

    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="quiz-page">
        <div class="results-card">
          <div class="score-circle ${grade}">
            <div>${pct}%</div>
            <div class="score-pct">${grade === 'great' ? '🎉' : grade === 'ok' ? '📚' : '💪'}</div>
          </div>
          <h2 style="font-size:22px;font-weight:700;margin-bottom:8px;">
            ${grade === 'great' ? 'Excellent work!' : grade === 'ok' ? 'Good effort!' : 'Keep studying!'}
          </h2>
          <p style="color:var(--text2);font-size:14px;">
            Module ${mod}: ${MODULES[mod].title}
          </p>
          <div class="results-stats">
            <div class="result-stat"><div class="val" style="color:var(--green)">${correct}</div><div class="lbl">Correct</div></div>
            <div class="result-stat"><div class="val" style="color:var(--red)">${total - correct}</div><div class="lbl">Wrong</div></div>
            <div class="result-stat"><div class="val">${total}</div><div class="lbl">Total</div></div>
          </div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
            <button class="btn btn-primary" onclick="App.startQuiz(${mod})">Retry Quiz</button>
            <button class="btn btn-ghost" onclick="App.navigate('quiz')">Other Modules</button>
            <button class="btn btn-ghost" onclick="App.navigate('predicted')">Predicted Q's</button>
          </div>
          <div class="review-list">
            <div class="section-title" style="margin-bottom:16px">Review Answers</div>
            ${questions.map((q, i) => {
              const ans = answers[i];
              if (!ans) return '';
              const isC = ans.correct;
              const selectedArr = Array.isArray(ans.selected) ? ans.selected : [ans.selected];
              const correctArr = Array.isArray(ans.answer) ? ans.answer : [ans.answer];
              return `
                <div class="review-item ${isC ? 'review-correct' : 'review-wrong'}">
                  <span class="ri-badge ${isC ? 'correct' : 'wrong'}">${isC ? '✓' : '✗'}</span>
                  <div class="ri-q">Q${i+1}. ${q.q}</div>
                  <div class="ri-ans">
                    ${ans.skipped ? '<em>Skipped</em>' :
                      `Your answer: ${selectedArr.map(s => letters[s]).join(', ')} |
                       Correct: ${correctArr.map(s => letters[s]).join(', ')}`
                    }
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------
     PREDICTED QUESTIONS
  -------------------------------------------------- */
  function renderPredicted() {
    const container = document.getElementById('predicted-container');
    const byModule = {};
    PREDICTED_QUESTIONS.forEach(q => {
      if (!byModule[q.module]) byModule[q.module] = [];
      byModule[q.module].push(q);
    });

    const letters = ['A','B','C','D'];
    container.innerHTML = `
      <div class="hint-box">💡 These questions are predicted based on CCNA 200-301 exam patterns and match the topics in your modules. Click a question to reveal options and the answer.</div>
      ${Object.entries(byModule).map(([mod, qs]) => `
        <div class="predicted-section">
          <h3>${MODULES[mod].icon} Module ${mod}: ${MODULES[mod].title}</h3>
          ${qs.map((q, qi) => `
            <div class="predicted-card" onclick="App.togglePredicted(this)">
              <span class="module-tag">Module ${q.module}</span>
              <div class="predicted-q">${q.q}</div>
              <div class="predicted-body">
                <ul class="predicted-options">
                  ${q.options.map((opt, i) => `
                    <li class="${i === q.answer ? 'ans-correct' : ''}">
                      <span class="opt-letter">${letters[i]}.</span>
                      <span>${opt}</span>
                    </li>
                  `).join('')}
                </ul>
                <div class="predicted-exp">
                  <strong>Answer: ${letters[q.answer]} — Explanation:</strong> ${q.explanation}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    `;
  }

  function togglePredicted(el) {
    el.classList.toggle('open');
  }

  /* --------------------------------------------------
     STUDY NOTES
  -------------------------------------------------- */
  const NOTES = {
    1: {
      title: "Networking Today", icon: "🌐",
      items: [
        "Host / End device: any device that sends or receives data on the network",
        "Intermediary devices: switches, routers, firewalls, WAPs — interconnect end devices",
        "LAN: small geographic area (home, office); WAN: large geographic area (cities, countries)",
        "Internet = worldwide collection of interconnected LANs & WANs",
        "Intranet = private internal network; Extranet = controlled access for external partners",
        "SOHO: Small Office/Home Office — a small network connecting a few devices",
        "BYOD: Bring Your Own Device — personal devices on corporate network",
        "QoS: Quality of Service — prioritizes time-sensitive traffic like voice & video",
        "Cloud: storing/accessing data & apps over the internet (not local hardware)",
        "Physical topology: physical location of cables & devices; Logical topology: data flow path",
        "Unicast = 1-to-1; Multicast = 1-to-group; Broadcast = 1-to-all"
      ]
    },
    2: {
      title: "IOS Configuration", icon: "⚙️",
      items: [
        "User EXEC mode (>) — limited monitoring only; type 'enable' to elevate",
        "Privileged EXEC mode (#) — full device access; type 'configure terminal' for config",
        "Global Config mode (config)# — device-wide settings",
        "Line config mode (config-line)# — console / vty / aux line settings",
        "Interface config mode (config-if)# — individual interface settings",
        "Ctrl+Z or 'end' — return directly to Privileged EXEC from any submode",
        "'exit' — go back one level in the command hierarchy",
        "Tab key — auto-completes partially typed commands",
        "Ctrl+Shift+6 — interrupt a running process (e.g., ping)",
        "service password-encryption — encrypts all plain-text passwords in config",
        "enable secret [pass] — sets an encrypted privileged EXEC password (stronger than enable password)",
        "copy running-config startup-config — saves RAM config to NVRAM",
        "SVI (Switch Virtual Interface) — logical interface for remote management of a switch",
        "show ip interface brief — summary view of all interfaces and their status"
      ]
    },
    3: {
      title: "Protocols & OSI/TCP-IP Models", icon: "📋",
      items: [
        "OSI: 7 layers — Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "TCP/IP: 4 layers — Network Access, Internet, Transport, Application",
        "TCP/IP Network Access ≈ OSI Physical + Data Link",
        "TCP/IP Internet ≈ OSI Network",
        "TCP/IP Application ≈ OSI Session + Presentation + Application",
        "Encapsulation: data wrapped with headers/trailers as it travels down the stack",
        "De-encapsulation: headers/trailers removed as data travels up the stack",
        "PDUs by layer — Data (App), Segment (Transport), Packet (Network), Frame (Data Link), Bits (Physical)",
        "Protocol suite: a group of related protocols that work together (e.g., TCP/IP)",
        "Open standards promote interoperability and competition; not tied to one vendor",
        "IETF develops internet standards; IEEE develops networking standards (802.x)",
        "TCP = connection-oriented, reliable; UDP = connectionless, fast/unreliable"
      ]
    },
    4: {
      title: "Physical Layer", icon: "🔌",
      items: [
        "Physical layer encodes bits and creates electrical/optical/radio signals on the medium",
        "Bandwidth = maximum data capacity of the medium (bits per second)",
        "Throughput = actual measured data rate; always ≤ bandwidth",
        "Latency = time delay from source to destination (includes propagation + processing delay)",
        "Goodput = useful data throughput (overhead removed)",
        "Attenuation = signal loss over distance",
        "Crosstalk = interference from adjacent wire pairs — reduced by TWISTING wire pairs",
        "UTP: Unshielded Twisted Pair — most common, cheap, 100m max, RJ-45 connector",
        "STP: Shielded Twisted Pair — better noise protection, more expensive",
        "Coaxial cable: single conductor, used in cable TV and older Ethernet",
        "Single-mode fiber: tiny core, lasers, long distance; Multi-mode fiber: larger core, LEDs, shorter",
        "Fiber immune to EMI/RFI; more expensive to install than copper",
        "Straight-through cable: connects UNLIKE devices (PC↔switch, router↔switch)",
        "Crossover cable: connects LIKE devices (PC↔PC, switch↔switch) — less needed with auto-MDIX",
        "Wireless 802.11 uses CSMA/CA (collision avoidance); affected by microwaves & cordless phones"
      ]
    },
    6: {
      title: "Data Link Layer", icon: "🔗",
      items: [
        "Data Link provides node-to-node delivery; divided into LLC and MAC sublayers",
        "LLC (Logical Link Control): identifies upper-layer protocol in use; implemented in software",
        "MAC (Media Access Control): hardware addressing + media access; implemented in hardware (NIC)",
        "Frame structure: Header | Data | Trailer",
        "Frame Check Sequence (FCS) / CRC in trailer — used for error detection",
        "MAC address: 48-bit flat address burned into NIC; used for local delivery only",
        "Broadcast MAC: FF:FF:FF:FF:FF:FF — all devices receive",
        "Multicast MAC: starts with 01:00:5E — specific group of devices",
        "Half-duplex: one device sends at a time; Full-duplex: simultaneous send/receive",
        "CSMA/CD: used by legacy Ethernet (half-duplex); detects collisions after they occur",
        "CSMA/CA: used by 802.11 WLAN; avoids collisions before they occur",
        "Store-and-forward switching: buffers entire frame, checks CRC — lowest error rate",
        "Cut-through switching: forwards after reading destination MAC only — lowest latency",
        "Fast-forward: cut-through, lowest latency",
        "Fragment-free: reads first 64 bytes before forwarding — compromise between the two"
      ]
    },
    8: {
      title: "Network Layer", icon: "🗺️",
      items: [
        "Network layer provides end-to-end logical addressing and routing",
        "IP is connectionless (no session before sending), best-effort (no guaranteed delivery), media-independent",
        "IPv4 header key fields: Version, TTL, Protocol, Source IP, Destination IP, Header Checksum, DS",
        "TTL: decremented by 1 at each router; packet dropped when TTL = 0",
        "Protocol field: identifies upper-layer protocol (6=TCP, 17=UDP, 1=ICMP)",
        "IPv4: 32-bit address, ~4.3 billion addresses — nearly exhausted",
        "IPv6: 128-bit address, vastly larger space; fixed 40-byte header; no broadcast",
        "IPv6 improvements: simplified header, auto-config (SLAAC), built-in IPsec support",
        "IPv6 uses Hop Limit field instead of TTL",
        "Routing: routers forward packets based on destination IP + routing table",
        "Default gateway: router on the same network as the host; used to reach remote networks",
        "ARP: resolves IPv4 address to MAC address on the local network",
        "ARP request sent as broadcast (FF:FF:FF:FF:FF:FF); reply is unicast",
        "ARP table/cache: stores IP-to-MAC mappings; entries time out",
        "IPv6 uses Neighbor Discovery (NDP) with Neighbor Solicitation/Advertisement instead of ARP",
        "Loopback address: 127.0.0.1 — tests the local TCP/IP stack"
      ]
    },
    16: {
      title: "Network Security", icon: "🔒",
      items: [
        "Three types of vulnerability: Technological, Configuration, Security policy",
        "Virus: attaches to files, needs user action to spread",
        "Worm: self-replicates, spreads automatically without host file",
        "Trojan horse: malware disguised as legitimate software",
        "Spyware: secretly collects information; Ransomware: encrypts files for ransom",
        "Reconnaissance attack: information gathering / network mapping (nslookup, fping, ping sweep)",
        "Access attack: exploits authentication weaknesses to gain unauthorized access",
        "DoS attack: overwhelms target to deny service to legitimate users",
        "DDoS: Distributed DoS — uses multiple compromised hosts",
        "Man-in-the-middle: intercepts communication between two parties",
        "Defense-in-depth: layered security — no single point of failure",
        "Firewall: controls traffic between network zones; Stateful Packet Inspection tracks connection state",
        "IDS (Intrusion Detection System): detects & alerts; IPS (Prevention): detects & blocks",
        "AAA framework: Authentication (who are you?), Authorization (what can you do?), Accounting (what did you do?)",
        "SSH (port 22): encrypted remote management — preferred over Telnet (plain text)",
        "SSH setup requires: unique hostname + IP domain name + RSA keys + local user account",
        "login block-for [secs] attempts [n] within [secs] — mitigates brute-force attacks",
        "service password-encryption — encrypts all plain-text passwords in config file",
        "enable secret — uses MD5 encryption; stronger than enable password"
      ]
    }
  };

  function renderNotes() {
    const container = document.getElementById('notes-container');
    container.innerHTML = `
      <div class="notes-grid">
        ${Object.entries(NOTES).map(([num, note]) => `
          <div class="note-card">
            <h3><span>${note.icon}</span> Module ${num}: ${note.title}</h3>
            <ul class="note-list">
              ${note.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* --------------------------------------------------
     FLASHCARDS
  -------------------------------------------------- */
  const FLASHCARDS = [
    { q: "What is the difference between a LAN and a WAN?", a: "LAN covers a small area (home/office). WAN spans large geographic areas (cities/countries), often connecting multiple LANs." },
    { q: "What is an Intranet vs Extranet?", a: "Intranet: private network internal to an organization. Extranet: allows controlled external access to partners/suppliers/customers." },
    { q: "What is BYOD?", a: "Bring Your Own Device — policy allowing personal devices (laptops, phones) to connect to a corporate/campus network." },
    { q: "What are the 7 OSI layers in order?", a: "1-Physical, 2-Data Link, 3-Network, 4-Transport, 5-Session, 6-Presentation, 7-Application. Mnemonic: 'Please Do Not Throw Sausage Pizza Away'" },
    { q: "What are the 4 TCP/IP model layers?", a: "Network Access, Internet, Transport, Application. (Network Access = OSI Physical + Data Link; Internet = OSI Network)" },
    { q: "What is the PDU at the Transport, Network, Data Link, and Physical layers?", a: "Transport → Segment; Network → Packet; Data Link → Frame; Physical → Bits" },
    { q: "What is encapsulation?", a: "The process of adding headers (and trailers) to data as it moves down the protocol stack before transmission." },
    { q: "What is the default IOS prompt for User EXEC mode vs Privileged EXEC mode?", a: "User EXEC: Router> (greater than). Privileged EXEC: Router# (hash/pound sign)." },
    { q: "How do you save the running configuration so it survives a reboot?", a: "copy running-config startup-config — copies RAM → NVRAM." },
    { q: "What command encrypts all plain-text passwords in the config?", a: "service password-encryption (entered in global config mode)" },
    { q: "What is the difference between 'enable password' and 'enable secret'?", a: "enable secret is encrypted with MD5 and is more secure. 'enable password' stores in plain text (unless service password-encryption is used)." },
    { q: "What is bandwidth vs throughput vs latency?", a: "Bandwidth = max capacity of medium (bps). Throughput = actual measured speed. Latency = time delay to travel from source to destination." },
    { q: "What causes crosstalk in UTP cable, and how is it reduced?", a: "Crosstalk is caused by the magnetic field of adjacent wire pairs. Reduced by twisting opposing circuit wire pairs together." },
    { q: "What is the max segment length for standard UTP Ethernet?", a: "100 meters (Cat5e/Cat6 UTP per IEEE standard)" },
    { q: "Straight-through vs crossover cable — which connects PC to switch?", a: "Straight-through: connects UNLIKE devices (PC → switch, router → switch). Crossover: connects LIKE devices (switch → switch). Auto-MDIX eliminates this need on modern equipment." },
    { q: "What are the LLC and MAC sublayers responsible for?", a: "LLC: identifies upper-layer protocols, software-implemented. MAC: hardware addressing (MAC addresses) + controls media access, hardware-implemented in NIC." },
    { q: "What is the purpose of the FCS / CRC in an Ethernet frame?", a: "Error detection — the receiver recalculates the CRC; if it doesn't match, the frame is discarded. (Not error correction)" },
    { q: "What is the difference between store-and-forward and cut-through switching?", a: "Store-and-forward: buffers entire frame, checks CRC for errors — higher latency, no bad frames forwarded. Cut-through: forwards after reading dest MAC — lower latency, may forward errors." },
    { q: "What does CSMA/CD do?", a: "Carrier Sense Multiple Access with Collision Detection — used by legacy Ethernet. Devices listen before transmitting; if collision occurs, they back off and retry." },
    { q: "What does CSMA/CA do?", a: "Carrier Sense Multiple Access with Collision Avoidance — used by 802.11 WLAN. Devices wait before transmitting to try to avoid collisions." },
    { q: "What is a broadcast MAC address?", a: "FF:FF:FF:FF:FF:FF — a frame with this destination is received and processed by ALL devices on the local network segment." },
    { q: "What are the three key characteristics of IP?", a: "1. Connectionless (no prior connection setup). 2. Best-effort (no guaranteed delivery). 3. Media-independent (works over any media type)." },
    { q: "What does the TTL field do in an IPv4 packet?", a: "Time-to-Live: decremented by 1 at each router hop. When TTL reaches 0, the packet is dropped — prevents routing loops." },
    { q: "What is the IPv4 Protocol field used for?", a: "Identifies the Layer 4 protocol carried in the packet. 6 = TCP, 17 = UDP, 1 = ICMP." },
    { q: "What is ARP and when is it used?", a: "Address Resolution Protocol — resolves a known IPv4 address to a MAC address. Used when a host knows the destination IP but needs the MAC for framing." },
    { q: "What is the destination MAC address of an ARP request?", a: "FF:FF:FF:FF:FF:FF (broadcast) — sent to all devices on the local network. Only the device with the matching IP responds." },
    { q: "Why is NAT not needed in IPv6?", a: "IPv6 has an enormous address space (2^128), so every device can have a unique public address — eliminating the need to share addresses via NAT." },
    { q: "What replaces ARP in IPv6?", a: "NDP (Neighbor Discovery Protocol) — uses Neighbor Solicitation (NS) and Neighbor Advertisement (NA) ICMPv6 messages." },
    { q: "What is a default gateway?", a: "The router interface on the same network as the host, used to forward traffic to remote networks. If misconfigured, the host can communicate locally but not remotely." },
    { q: "What are the three types of malware?", a: "Virus: attaches to files, needs user action. Worm: self-replicates, no user action needed. Trojan horse: disguised as legitimate software." },
    { q: "What is the difference between a DoS and a DDoS attack?", a: "DoS: single source floods a target. DDoS: Distributed DoS uses many compromised hosts (botnet) to amplify the attack." },
    { q: "What is a reconnaissance attack?", a: "Information gathering — the attacker maps the network to discover vulnerabilities before launching a real attack. Tools: nslookup, fping, ping sweep." },
    { q: "What are the three components of AAA?", a: "Authentication (verify identity), Authorization (grant resource access), Accounting (track user activity/logging)." },
    { q: "What three things are required to configure SSH on a Cisco router?", a: "1. Unique hostname. 2. IP domain name (ip domain-name). 3. RSA key pair (crypto key generate rsa). Plus a local user account." },
    { q: "What is stateful packet inspection in a firewall?", a: "Tracks the state of active connections and ensures incoming packets are legitimate responses to outbound requests — blocks unsolicited inbound traffic." },
  ];

  function renderFlashcards(moduleNum) {
    flashState = { cards: shuffle([...FLASHCARDS]), current: 0, flipped: false };
    const container = document.getElementById('flashcards-container');
    renderFlashcard(container);
  }

  function startFlashcards(moduleNum) {
    navigate('flashcards');
    renderFlashcards(moduleNum);
  }

  function renderFlashcard(container) {
    const { cards, current } = flashState;
    const card = cards[current];
    container.innerHTML = `
      <div class="flashcard-wrap">
        <div class="flashcard-counter">Card ${current + 1} of ${cards.length}</div>
        <div class="flashcard" id="fc" onclick="App.flipCard()">
          <div class="fc-label">${flashState.flipped ? 'Answer' : 'Question'}</div>
          <div class="fc-text">${flashState.flipped ? card.a : card.q}</div>
          <div class="fc-hint">${flashState.flipped ? '(click to see question)' : '(click to reveal answer)'}</div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button class="btn btn-ghost" onclick="App.prevCard()" ${current === 0 ? 'disabled' : ''}>← Prev</button>
          <button class="btn btn-primary" onclick="App.nextCard()">
            ${current + 1 < cards.length ? 'Next →' : 'Restart'}
          </button>
        </div>
        <div style="margin-top:20px;text-align:center">
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('home')">← Back to Modules</button>
        </div>
      </div>
    `;
  }

  function flipCard() {
    flashState.flipped = !flashState.flipped;
    renderFlashcard(document.getElementById('flashcards-container'));
  }

  function nextCard() {
    if (flashState.current + 1 >= flashState.cards.length) {
      flashState.cards = shuffle([...FLASHCARDS]);
      flashState.current = 0;
    } else {
      flashState.current++;
    }
    flashState.flipped = false;
    renderFlashcard(document.getElementById('flashcards-container'));
  }

  function prevCard() {
    if (flashState.current > 0) flashState.current--;
    flashState.flipped = false;
    renderFlashcard(document.getElementById('flashcards-container'));
  }

  /* --------------------------------------------------
     UTILS
  -------------------------------------------------- */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* --------------------------------------------------
     INIT
  -------------------------------------------------- */
  function init() {
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.page));
    });
    navigate('home');
  }

  return { init, navigate, startQuiz, startFlashcards, selectOption, skipQuestion, nextQuestion, togglePredicted, flipCard, nextCard, prevCard };
})();

document.addEventListener('DOMContentLoaded', App.init);
