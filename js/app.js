/* ══════════════════════════════════════════════════════
   NETPREP · Premium App — Complete Edition
   ══════════════════════════════════════════════════════ */
const State = { view:'home', module:null, quiz:null, progress:{} };
const $ = id => document.getElementById(id);
const ALPHA = ['A','B','C','D','E','F'];

function mk(tag,cls,html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function div(cls,html){ return mk('div',cls,html); }
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function totalAnswered(){ return Object.values(State.progress).reduce((s,p)=>s+(p.answered||0),0); }

/* Reading bar */
function updateReadingBar(){ const el=$('reading-fill'); if(!el)return; const{scrollTop,scrollHeight,clientHeight}=document.documentElement; const pct=scrollHeight<=clientHeight?0:(scrollTop/(scrollHeight-clientHeight))*100; el.style.width=Math.min(100,pct)+'%'; }
window.addEventListener('scroll',updateReadingBar,{passive:true});

/* Router */
function navigate(view,moduleId){
  State.view=view; State.module=moduleId||null;
  document.querySelectorAll('.mod-nav-item').forEach(e=>e.classList.toggle('active',+e.dataset.mod===moduleId));
  document.querySelectorAll('.sb-link').forEach(e=>e.classList.toggle('active',e.dataset.view===view&&!moduleId));
  if(moduleId) document.querySelectorAll('.sb-link').forEach(e=>e.classList.remove('active'));
  const inner=$('content-inner'); inner.innerHTML='';
  switch(view){
    case 'home':       renderHome(inner);           break;
    case 'module':     renderModule(inner,moduleId); break;
    case 'predicted':  renderPredicted(inner);       break;
    case 'notes':      renderNotes(inner);           break;
    case 'flashcards': renderFlashcards(inner);      break;
  }
  window.scrollTo({top:0,behavior:'instant'}); updateReadingBar(); closeMobile();
}

/* Sidebar */
function buildSidebar(){
  const list=$('module-nav-list'); list.innerHTML='';
  Object.entries(MODULES).forEach(([id,mod])=>{
    const prog=State.progress[id]||{answered:0};
    const pct=Math.round((prog.answered/mod.questions)*100);
    const item=div('mod-nav-item'); item.dataset.mod=id;
    item.innerHTML=`<div class="mni-inner"><div class="mni-badge">${id}</div><div class="mni-info"><div class="mni-title">${mod.title}</div></div></div><div class="mni-progress"><div class="mni-track"><div class="mni-fill" id="mnf-${id}" style="width:${pct}%"></div></div><div class="mni-count" id="mnc-${id}">${prog.answered}/${mod.questions}</div></div>`;
    item.addEventListener('click',()=>navigate('module',+id)); list.appendChild(item);
  });
}
function refreshProgress(mid){
  const prog=State.progress[mid]||{answered:0}; const total=MODULES[mid].questions;
  const pct=Math.round((prog.answered/total)*100);
  const f=$(`mnf-${mid}`),c=$(`mnc-${mid}`),hf=$(`hcp-${mid}`),hl=$(`hcl-${mid}`);
  if(f)f.style.width=pct+'%'; if(c)c.textContent=`${prog.answered}/${total}`;
  if(hf)hf.style.width=pct+'%'; if(hl)hl.textContent=`${prog.answered} / ${total} questions`;
  updateFooter();
}
function updateFooter(){
  const a=totalAnswered(),t=105;
  const fs=$('footer-stat'),ff=$('footer-bar-fill');
  if(fs)fs.textContent=`${a} / ${t} answered`; if(ff)ff.style.width=Math.round(a/t*100)+'%';
}
function closeMobile(){ $('sidebar').classList.remove('open'); $('sidebar-overlay').classList.remove('open'); }
$('sidebar-toggle').addEventListener('click',()=>{ $('sidebar').classList.toggle('open'); $('sidebar-overlay').classList.toggle('open'); });
$('sidebar-overlay').addEventListener('click',closeMobile);

/* ── SVG Diagrams ─────────────────────────────────── */
function makeNetworkSVG(){
  return `<svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <line x1="150" y1="150" x2="60" y2="80" stroke="#2558D3" stroke-width="1" stroke-opacity="0.18"/>
    <line x1="150" y1="150" x2="240" y2="80" stroke="#2558D3" stroke-width="1" stroke-opacity="0.18"/>
    <line x1="150" y1="150" x2="60" y2="220" stroke="#2558D3" stroke-width="1" stroke-opacity="0.18"/>
    <line x1="150" y1="150" x2="240" y2="220" stroke="#2558D3" stroke-width="1" stroke-opacity="0.18"/>
    <line x1="150" y1="150" x2="150" y2="40" stroke="#2558D3" stroke-width="1" stroke-opacity="0.12"/>
    <line x1="150" y1="150" x2="150" y2="260" stroke="#2558D3" stroke-width="1" stroke-opacity="0.12"/>
    <line x1="60" y1="80" x2="240" y2="80" stroke="#2558D3" stroke-width="0.8" stroke-opacity="0.1"/>
    <line x1="60" y1="220" x2="240" y2="220" stroke="#2558D3" stroke-width="0.8" stroke-opacity="0.1"/>
    <circle cx="150" cy="150" r="120" stroke="#2558D3" stroke-opacity="0.06" stroke-width="1" stroke-dasharray="4 8"/>
    <circle cx="150" cy="150" r="22" fill="#EBF1FF" stroke="#2558D3" stroke-width="1.5" filter="url(#glow)"/>
    <circle cx="150" cy="150" r="10" fill="#2558D3" fill-opacity="0.85"/>
    <text x="150" y="185" text-anchor="middle" font-family="Inter" font-size="9" fill="#2558D3" fill-opacity="0.7" font-weight="600">ROUTER</text>
    <circle cx="150" cy="40" r="14" fill="#F5F0FF" stroke="#6D28D9" stroke-width="1.2"/>
    <circle cx="150" cy="40" r="6" fill="#6D28D9" fill-opacity="0.7"/>
    <text x="150" y="24" text-anchor="middle" font-family="Inter" font-size="8" fill="#6D28D9" fill-opacity="0.65" font-weight="600">INTERNET</text>
    <circle cx="60" cy="80" r="13" fill="#EDFAF3" stroke="#16A34A" stroke-width="1.2"/>
    <circle cx="60" cy="80" r="5.5" fill="#16A34A" fill-opacity="0.8"/>
    <text x="60" y="64" text-anchor="middle" font-family="Inter" font-size="8" fill="#16A34A" fill-opacity="0.7" font-weight="600">SWITCH</text>
    <circle cx="240" cy="80" r="13" fill="#EDFAF3" stroke="#16A34A" stroke-width="1.2"/>
    <circle cx="240" cy="80" r="5.5" fill="#16A34A" fill-opacity="0.8"/>
    <text x="240" y="64" text-anchor="middle" font-family="Inter" font-size="8" fill="#16A34A" fill-opacity="0.7" font-weight="600">SWITCH</text>
    <circle cx="60" cy="220" r="11" fill="#FFF9EB" stroke="#C47C0E" stroke-width="1.2"/>
    <circle cx="60" cy="220" r="4.5" fill="#C47C0E" fill-opacity="0.8"/>
    <text x="60" y="238" text-anchor="middle" font-family="Inter" font-size="8" fill="#C47C0E" fill-opacity="0.7" font-weight="600">HOST</text>
    <circle cx="240" cy="220" r="11" fill="#FFF9EB" stroke="#C47C0E" stroke-width="1.2"/>
    <circle cx="240" cy="220" r="4.5" fill="#C47C0E" fill-opacity="0.8"/>
    <text x="240" y="238" text-anchor="middle" font-family="Inter" font-size="8" fill="#C47C0E" fill-opacity="0.7" font-weight="600">HOST</text>
    <rect x="226" y="140" width="22" height="22" rx="4" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.2"/>
    <rect x="233" y="147" width="8" height="8" rx="2" fill="#DC2626" fill-opacity="0.7"/>
    <text x="237" y="128" text-anchor="middle" font-family="Inter" font-size="8" fill="#DC2626" fill-opacity="0.65" font-weight="600">FIREWALL</text>
    <rect x="136" y="247" width="28" height="22" rx="4" fill="#F5F4F0" stroke="#8B929E" stroke-width="1.2"/>
    <rect x="141" y="252" width="18" height="7" rx="2" fill="#8B929E" fill-opacity="0.5"/>
    <text x="150" y="280" text-anchor="middle" font-family="Inter" font-size="8" fill="#8B929E" font-weight="600">SERVER</text>
  </svg>`;
}

function makeOSIDiagram(){
  const osiLayers=[{n:7,name:'Application',color:'#F5F0FF',border:'#C4B5FD',text:'#4C1D95',pdu:'Data'},{n:6,name:'Presentation',color:'#F5F0FF',border:'#C4B5FD',text:'#4C1D95',pdu:'Data'},{n:5,name:'Session',color:'#F5F0FF',border:'#C4B5FD',text:'#4C1D95',pdu:'Data'},{n:4,name:'Transport',color:'#EBF1FF',border:'#B8CCFF',text:'#1B44B0',pdu:'Segment'},{n:3,name:'Network',color:'#EDFAFA',border:'#9FE0DC',text:'#0D6B64',pdu:'Packet'},{n:2,name:'Data Link',color:'#EDFAF3',border:'#9DE9BE',text:'#14532D',pdu:'Frame'},{n:1,name:'Physical',color:'#FFF9EB',border:'#FDE29A',text:'#713F12',pdu:'Bits'}];
  const tcpGroups=[{name:'Application',layers:[7,6,5],color:'#F5F0FF',border:'#C4B5FD',text:'#4C1D95'},{name:'Transport',layers:[4],color:'#EBF1FF',border:'#B8CCFF',text:'#1B44B0'},{name:'Internet',layers:[3],color:'#EDFAFA',border:'#9FE0DC',text:'#0D6B64'},{name:'Net. Access',layers:[2,1],color:'#EDFAF3',border:'#9DE9BE',text:'#14532D'}];
  const lH=32,gap=3; let osiSvg='';
  osiLayers.forEach((l,i)=>{ const y=i*(lH+gap); osiSvg+=`<g><rect x="0" y="${y}" width="140" height="${lH}" rx="5" fill="${l.color}" stroke="${l.border}" stroke-width="1"/><text x="24" y="${y+12}" font-family="Inter" font-size="9" font-weight="700" fill="${l.text}" fill-opacity="0.6">Layer ${l.n}</text><text x="24" y="${y+24}" font-family="Plus Jakarta Sans,Inter" font-size="11" font-weight="600" fill="${l.text}">${l.name}</text><text x="146" y="${y+20}" font-family="Inter" font-size="10" fill="#8B929E" font-weight="500">${l.pdu}</text></g>`; });
  let tcpSvg='',yOff=0;
  tcpGroups.forEach(g=>{ const h=g.layers.length*(lH+gap)-gap; tcpSvg+=`<rect x="0" y="${yOff}" width="120" height="${h}" rx="5" fill="${g.color}" stroke="${g.border}" stroke-width="1"/><text x="10" y="${yOff+h/2-4}" font-family="Plus Jakarta Sans,Inter" font-size="11" font-weight="700" fill="${g.text}">${g.name}</text><text x="10" y="${yOff+h/2+10}" font-family="Inter" font-size="9" fill="${g.text}" fill-opacity="0.65">layer</text>`; yOff+=h+gap; });
  const totalH=osiLayers.length*(lH+gap)-gap;
  return `<div class="net-diagram"><div class="net-diagram-label">OSI vs TCP/IP Model Comparison</div><div style="display:flex;gap:20px;align-items:flex-start;overflow-x:auto;padding:4px 2px"><div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-4);text-align:center;margin-bottom:8px">OSI Model (7 layers)</div><svg viewBox="0 0 200 ${totalH}" width="200" height="${totalH}" xmlns="http://www.w3.org/2000/svg">${osiSvg}</svg></div><div style="display:flex;align-items:center;padding-top:${totalH/2-12}px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M14 7l5 5-5 5" stroke="var(--ink-4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-4);text-align:center;margin-bottom:8px">TCP/IP Model (4 layers)</div><svg viewBox="0 0 130 ${totalH}" width="130" height="${totalH}" xmlns="http://www.w3.org/2000/svg">${tcpSvg}</svg></div></div></div>`;
}

function makeFrameDiagram(){
  const fields=[{label:'Preamble',w:52,color:'#F5F0FF',text:'#4C1D95',bytes:'7B'},{label:'SFD',w:32,color:'#F5F0FF',text:'#4C1D95',bytes:'1B'},{label:'Dest MAC',w:60,color:'#EBF1FF',text:'#1B44B0',bytes:'6B'},{label:'Src MAC',w:60,color:'#EBF1FF',text:'#1B44B0',bytes:'6B'},{label:'Type',w:40,color:'#EDFAFA',text:'#0D6B64',bytes:'2B'},{label:'Data',w:100,color:'#EDFAF3',text:'#14532D',bytes:'46-1500B'},{label:'FCS',w:40,color:'#FEF2F2',text:'#7F1D1D',bytes:'4B'}];
  let x=0,rects=''; const h=48;
  fields.forEach(f=>{ rects+=`<g><rect x="${x+1}" y="0" width="${f.w-2}" height="${h}" rx="3" fill="${f.color}" stroke="${f.color}" stroke-width="1.5"/><rect x="${x+1}" y="0" width="${f.w-2}" height="${h}" rx="3" fill="none" stroke="white" stroke-width="0.5"/><text x="${x+f.w/2}" y="17" text-anchor="middle" font-family="Inter" font-size="8" font-weight="700" fill="${f.text}" fill-opacity="0.7">${f.bytes}</text><text x="${x+f.w/2}" y="33" text-anchor="middle" font-family="Inter" font-size="9" font-weight="600" fill="${f.text}">${f.label}</text></g>`; x+=f.w; });
  return `<div class="net-diagram"><div class="net-diagram-label">Ethernet Frame Structure</div><div style="overflow-x:auto;padding:4px 2px"><svg viewBox="0 0 ${x} ${h}" height="48" style="min-width:${x}px;width:100%;max-width:${x}px" xmlns="http://www.w3.org/2000/svg">${rects}</svg></div></div>`;
}

/* ── Page Banner Builder ───────────────────────────── */
function makeBanner({eyebrow, title, sub, stats, visual, accentColor}){
  const banner = div('pg-banner');
  if(accentColor) banner.style.setProperty('--ba',accentColor);
  banner.innerHTML = `
    <div class="pg-banner-content">
      <div class="pg-banner-left">
        <div class="pg-eyebrow"><span class="pg-dot"></span>${eyebrow}</div>
        <h1 class="pg-title">${title}</h1>
        <p class="pg-sub">${sub}</p>
        ${stats ? `<div class="pg-stats">${stats.map(s=>`<div class="pg-stat"><strong>${s.num}</strong><span>${s.lbl}</span></div>`).join('')}</div>` : ''}
      </div>
      ${visual ? `<div class="pg-banner-right" aria-hidden="true">${visual}</div>` : ''}
    </div>`;
  return banner;
}

/* ══════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════ */
function renderHome(root){
  const hero=div('home-hero');
  hero.innerHTML=`
    <div class="hero-left">
      <h1 class="hero-h1">CCNA ITN<br>Midterm<br>Workbook</h1>
      <p class="hero-sub">Seven modules, 105 practice questions with explanations on every answer, hints, flashcards, and predicted exam questions — built from your CCNA slides.</p>
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg" id="h-start">Start with Module 1</button>
        <button class="btn btn-ghost btn-lg" id="h-pred">Predicted Questions</button>
      </div>
      <div class="hero-stats">
        <div class="h-stat"><div class="h-stat-num">7</div><div class="h-stat-lbl">Modules</div></div>
        <div class="h-stat"><div class="h-stat-num">105</div><div class="h-stat-lbl">Quiz Questions</div></div>
        <div class="h-stat"><div class="h-stat-num">14</div><div class="h-stat-lbl">Predicted Qs</div></div>
        <div class="h-stat"><div class="h-stat-num">34</div><div class="h-stat-lbl">Flashcards</div></div>
      </div>
    </div>
    <div class="hero-right"><div class="hero-diagram">${makeNetworkSVG()}</div></div>`;
  root.appendChild(hero);
  hero.querySelector('#h-start').addEventListener('click',()=>navigate('module',1));
  hero.querySelector('#h-pred').addEventListener('click',()=>navigate('predicted'));

  const sec=div('');
  const divider=div('home-divider');
  divider.innerHTML=`<div class="home-divider-title">All Modules</div><div class="home-divider-line"></div><div class="home-divider-sub">Click to open recap + quiz</div>`;
  sec.appendChild(divider);
  const grid=div('module-grid');
  Object.entries(MODULES).forEach(([id,mod])=>{
    const prog=State.progress[id]||{answered:0};
    const pct=Math.round((prog.answered/mod.questions)*100);
    const card=div('module-card'); card.style.setProperty('--mc',mod.color);
    card.innerHTML=`<div class="mc-main"><div class="mc-watermark">${String(id).padStart(2,'0')}</div><div class="mc-top"><div class="mc-label"><span class="mc-label-dot"></span>Module ${id}</div><div class="mc-icon">${mod.icon}</div></div><div class="mc-title">${mod.title}</div><div class="mc-desc">${modDesc(+id)}</div><div class="mc-footer"><div class="mc-prog-wrap"><div class="mc-prog-bar"><div class="mc-prog-fill" id="hcp-${id}" style="width:${pct}%"></div></div><div class="mc-prog-label" id="hcl-${id}">${prog.answered} / ${mod.questions}</div></div><button class="btn btn-primary btn-sm" style="background:${mod.color};box-shadow:none;flex-shrink:0">Open</button></div></div>`;
    card.addEventListener('click',()=>navigate('module',+id));
    grid.appendChild(card);
  });
  sec.appendChild(grid);
  root.appendChild(sec);
}

function modDesc(id){
  return {1:'Networks, components, topologies, internet connections, BYOD, QoS, and cloud.',2:'Cisco IOS modes, navigation, commands, switch configuration, SSH vs Telnet.',3:'Communication protocols, OSI model, TCP/IP model, encapsulation, and PDUs.',4:'Physical media, bandwidth, UTP cabling, fiber-optics, and wireless.',6:'Data Link sublayers, frames, MAC addressing, CSMA/CD, and switching methods.',8:'IP characteristics, IPv4 & IPv6 headers, routing, ARP, and default gateways.',16:'Security threats, malware types, attack mitigations, firewalls, SSH, and AAA.'}[id]||'';
}

/* ══════════════════════════════════════════════════════
   MODULE PAGE
   ══════════════════════════════════════════════════════ */
function renderModule(root,mid){
  const mod=MODULES[mid]; const recap=MODULE_RECAP[mid];
  const hdr=div('mod-page-header'); hdr.style.setProperty('--mph-c',mod.color);
  hdr.innerHTML=`<div class="mph-color-bar"></div><div class="mph-body"><div class="mph-icon" style="background:${mod.color}15;border-color:${mod.color}30">${mod.icon}</div><div class="mph-content"><div class="mph-eyebrow">Module ${mid} · CCNA Introduction to Networks</div><div class="mph-title">${mod.title}</div><div class="mph-desc">${modDesc(mid)}</div><div class="mph-chips"><span class="mph-chip"><strong>${recap?recap.sections.length:0}</strong>&nbsp;topics</span><span class="mph-chip"><strong>${(QUIZ_DATA[mid]||[]).length}</strong>&nbsp;questions</span></div></div></div>`;
  root.appendChild(hdr);

  if(recap&&recap.sections.length){
    const rs=div('recap-section');
    const rh=div('recap-hdr');
    rh.innerHTML=`<div class="recap-hdr-title"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="vertical-align:middle;margin-right:7px;margin-bottom:1px"><rect x="1" y="1" width="13" height="13" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h7M4 7.5h5M4 10h7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Topic Recap</div><div class="recap-hdr-line"></div><span class="recap-hdr-count">${recap.sections.length} sections</span>`;
    rs.appendChild(rh);
    if(mid===3){ const d=div(''); d.innerHTML=makeOSIDiagram(); rs.appendChild(d); }
    if(mid===6){ const d=div(''); d.innerHTML=makeFrameDiagram(); rs.appendChild(d); }
    recap.sections.forEach((sec,i)=>{
      const det=document.createElement('details'); det.className='rk-block'; det.style.setProperty('--mc',mod.color); if(i===0)det.open=true;
      const sum=document.createElement('summary'); sum.className='rk-summary';
      sum.innerHTML=`<div class="rk-num">${String(i+1).padStart(2,'0')}</div><div class="rk-title">${sec.title}</div><span class="rk-chevron"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
      det.appendChild(sum);
      const body=div('rk-body');
      if(sec.points){ const facts=div('rk-facts'); sec.points.forEach((p,pi)=>{ const fact=div('rk-fact'); fact.innerHTML=`<div class="rk-fact-num">${pi+1}</div><div class="rk-fact-content">${p}</div>`; facts.appendChild(fact); }); body.appendChild(facts); }
      if(sec.table){ const tbl=document.createElement('table'); tbl.className='recap-table'; const thead=mk('thead'); const hr=mk('tr'); sec.table.headers.forEach(h=>{ const th=mk('th'); th.innerHTML=h; hr.appendChild(th); }); thead.appendChild(hr); tbl.appendChild(thead); const tbody=mk('tbody'); sec.table.rows.forEach(row=>{ const tr=mk('tr'); row.forEach(cell=>{ const td=mk('td'); td.innerHTML=cell; tr.appendChild(td); }); tbody.appendChild(tr); }); tbl.appendChild(tbody); body.appendChild(tbl); }
      if(sec.callout){ const c=div(`rk-callout rk-callout-${sec.callout.type}`); c.innerHTML=`<div class="rk-co-icon">${sec.callout.type==='trap'?'⚠️':'💡'}</div><div class="rk-co-text"><strong>${sec.callout.type==='trap'?'Watch out:':'Pro tip:'}</strong> ${sec.callout.text}</div>`; body.appendChild(c); }
      det.appendChild(body); rs.appendChild(det);
    });
    root.appendChild(rs);
  }

  if(QUIZ_DATA[mid]){
    State.quiz={moduleId:mid,questions:shuffle([...QUIZ_DATA[mid]]),current:0,answers:[],answered:false,selectedMulti:[]};
    if(!State.progress[mid]) State.progress[mid]={answered:0,correct:0};
    const qr=div('quiz-section'); qr.id='quiz-root'; root.appendChild(qr); renderQuestion();
  }
}

/* ══════════════════════════════════════════════════════
   QUIZ
   ══════════════════════════════════════════════════════ */
function renderQuestion(){
  const qr=$('quiz-root'); if(!qr)return; qr.innerHTML='';
  const{questions,current,moduleId}=State.quiz;
  const q=questions[current]; const total=questions.length;
  const pct=Math.round((current/total)*100); const mod=MODULES[moduleId];
  const sh=div('quiz-section-hdr'); sh.innerHTML=`<div class="qsh-title"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" style="vertical-align:middle;margin-right:4px"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 5.5l1 1 2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Practice Quiz</div><div class="qsh-line"></div>`; qr.appendChild(sh);
  const mb=div('quiz-meta-bar'); mb.innerHTML=`<div class="qmb-left"><span class="quiz-badge">${mod.icon} Module ${moduleId}</span><span class="quiz-badge">Q ${current+1} of ${total}</span></div><span class="quiz-badge" style="color:${mod.color};">${Math.round(pct)}% done</span>`; qr.appendChild(mb);
  const pt=div('quiz-progress'); pt.innerHTML=`<div class="qp-row"><span>${current} of ${total} answered</span><span>${Math.round(pct)}%</span></div><div class="qp-bar"><div class="qp-fill" style="width:${pct}%"></div></div>`; qr.appendChild(pt);
  const card=div('q-card');
  const top=div('q-card-top'); top.innerHTML=`<div class="q-num">Question ${current+1}</div>${q.multi?`<div class="multi-badge"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6" y="1" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="6" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6" y="6" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>Select ${Array.isArray(q.answer)?q.answer.length:1} answers</div>`:''}`;
  card.appendChild(top);
  const stem=div('q-stem'); stem.innerHTML=`<div class="q-text">${q.q}</div>`; card.appendChild(stem);
  const hp=div('hint-panel'); hp.id='hint-panel'; hp.innerHTML=`<span class="hint-label">💡 Hint:</span><span>${q.hint||''}</span>`; card.appendChild(hp);
  const opts=div('options'); opts.id='opts';
  q.options.forEach((opt,i)=>{ const btn=document.createElement('button'); btn.className='opt-btn'; btn.dataset.idx=i; btn.innerHTML=`<span class="opt-letter">${ALPHA[i]}</span><span>${opt}</span>`; btn.addEventListener('click',()=>selectOption(i)); opts.appendChild(btn); });
  card.appendChild(opts);
  const foot=div('q-footer');
  foot.innerHTML=`<div class="q-footer-left">${q.hint?`<button class="hint-btn" id="hint-btn"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4v3M6 9v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Hint</button>`:''}<button class="skip-btn" id="skip-btn">Skip →</button></div><div style="display:flex;align-items:center;gap:10px"><span class="feedback-badge" id="feedback-badge"></span><button class="btn btn-primary" id="next-btn" style="display:none">${current+1<total?'Next Question':'See Results'}<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
  card.appendChild(foot); qr.appendChild(card);
  State.quiz.answered=false; State.quiz.selectedMulti=[];
  const hb=$('hint-btn');
  if(hb){ hb.addEventListener('click',()=>{ const p=$('hint-panel'); const on=p.classList.contains('visible'); p.classList.toggle('visible',!on); hb.innerHTML=on?`<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4v3M6 9v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Hint`:`<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Hide`; }); }
  $('skip-btn').addEventListener('click',skipQ); $('next-btn').addEventListener('click',nextQ);
}

function selectOption(idx){
  if(State.quiz.answered)return; const q=State.quiz.questions[State.quiz.current];
  if(q.multi){ const btn=document.querySelector(`.opt-btn[data-idx="${idx}"]`); const si=State.quiz.selectedMulti.indexOf(idx); if(si===-1){State.quiz.selectedMulti.push(idx);btn.classList.add('selected');}else{State.quiz.selectedMulti.splice(si,1);btn.classList.remove('selected');} if(State.quiz.selectedMulti.length===q.answer.length)submitMulti(); return; }
  submitSingle(idx);
}
function submitSingle(idx){
  State.quiz.answered=true; const q=State.quiz.questions[State.quiz.current]; const ok=idx===q.answer;
  recordAnswer({correct:ok,selected:idx,answer:q.answer});
  document.querySelectorAll('.opt-btn').forEach(b=>{ b.disabled=true; b.classList.add('answered'); const i=+b.dataset.idx; if(i===q.answer)b.classList.add('is-correct'); else if(i===idx&&!ok)b.classList.add('is-wrong'); });
  if(!ok&&q.wrongExp&&q.wrongExp[idx]){ const wb=document.querySelector(`.opt-btn[data-idx="${idx}"]`); const e=div('opt-explanation exp-wrong show'); e.innerHTML=`<span class="exp-label">Why this is wrong:</span> ${q.wrongExp[idx]}`; wb.appendChild(e); }
  if(q.explanation){ const cb=document.querySelector(`.opt-btn[data-idx="${q.answer}"]`); const e=div('opt-explanation exp-right show'); e.innerHTML=`<span class="exp-label">${ok?'✓ Correct:':'Correct answer:'}</span> ${q.explanation}`; cb.appendChild(e); }
  showFeedback(ok);
}
function submitMulti(){
  State.quiz.answered=true; const q=State.quiz.questions[State.quiz.current];
  const sel=State.quiz.selectedMulti,cs=new Set(q.answer),ss=new Set(sel);
  const ok=q.answer.every(a=>ss.has(a))&&sel.every(s=>cs.has(s));
  recordAnswer({correct:ok,selected:sel,answer:q.answer,multi:true});
  document.querySelectorAll('.opt-btn').forEach(b=>{ b.disabled=true; b.classList.add('answered'); const i=+b.dataset.idx; if(cs.has(i))b.classList.add('is-correct'); else if(ss.has(i))b.classList.add('is-wrong'); });
  if(q.explanation){ const cb=document.querySelector(`.opt-btn[data-idx="${q.answer[0]}"]`); if(cb){const e=div('opt-explanation exp-right show'); e.innerHTML=`<span class="exp-label">${ok?'✓ All correct:':'Correct answers:'}</span> ${q.explanation}`; cb.appendChild(e);} }
  showFeedback(ok);
}
function recordAnswer(data){ State.quiz.answers.push(data); const mid=State.quiz.moduleId; if(!State.progress[mid])State.progress[mid]={answered:0,correct:0}; State.progress[mid].answered++; if(data.correct)State.progress[mid].correct++; refreshProgress(mid); }
function showFeedback(ok){
  const fb=$('feedback-badge'); fb.className=`feedback-badge show ${ok?'feedback-correct':'feedback-wrong'}`;
  fb.innerHTML=ok?`<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="currentColor" fill-opacity="0.15"/><path d="M3.5 6l2 2 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Correct!`:`<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="currentColor" fill-opacity="0.12"/><path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Incorrect`;
  $('next-btn').style.display='inline-flex'; $('skip-btn').style.display='none';
  const hb=$('hint-btn'); if(hb)hb.style.display='none';
}
function skipQ(){ const q=State.quiz.questions[State.quiz.current]; recordAnswer({skipped:true,correct:false,answer:q.answer}); nextQ(); }
function nextQ(){ State.quiz.current++; if(State.quiz.current>=State.quiz.questions.length)renderResults(); else{ renderQuestion(); const qr=$('quiz-root'); if(qr)window.scrollTo({top:qr.offsetTop-24,behavior:'smooth'}); } }

/* Results */
function renderResults(){
  const qr=$('quiz-root'); qr.innerHTML='';
  const{answers,questions,moduleId}=State.quiz;
  const correct=answers.filter(a=>a.correct).length; const total=answers.length;
  const pct=Math.round(correct/total*100); const grade=pct>=80?'great':pct>=60?'ok':'poor';
  const emoji=grade==='great'?'🎉':grade==='ok'?'📚':'💪';
  const msg=grade==='great'?'Excellent work!':grade==='ok'?'Good effort — keep going!':'Review the recap and try again.';
  const card=div('results-card');
  card.innerHTML=`<div class="score-ring ${grade}"><div class="score-ring-num">${pct}%</div><div class="score-ring-emoji">${emoji}</div></div><div class="results-headline">${msg}</div><div class="results-sub">Module ${moduleId}: ${MODULES[moduleId].title}</div><div class="results-row"><div class="result-stat"><div class="v" style="color:var(--green)">${correct}</div><div class="l">Correct</div></div><div class="result-stat"><div class="v" style="color:var(--red)">${total-correct}</div><div class="l">Wrong/Skipped</div></div><div class="result-stat"><div class="v">${total}</div><div class="l">Total</div></div></div><div class="results-btns"><button class="btn btn-primary" onclick="App.retryQuiz()">Retry Quiz</button><button class="btn btn-ghost" onclick="App.navigate('home')">All Modules</button><button class="btn btn-ghost" onclick="App.navigate('predicted')">Predicted Qs</button></div><div class="review-list"><div class="rl-label">Answer Review</div>${questions.map((q,i)=>{ const a=answers[i]; if(!a)return ''; const sel=Array.isArray(a.selected)?a.selected:(a.selected!==undefined?[a.selected]:[]); const cor=Array.isArray(a.answer)?a.answer:[a.answer]; return `<div class="review-item ${a.correct?'rc':'rw'}"><span class="review-tag ${a.correct?'correct':'wrong'}">${a.correct?'✓':'✗'}</span><div class="review-q">Q${i+1}. ${q.q.length>92?q.q.slice(0,92)+'…':q.q}</div><div class="review-ans">${a.skipped?'<em>Skipped</em>':`Your: ${sel.map(s=>ALPHA[s]).join(', ')} · Correct: ${cor.map(s=>ALPHA[s]).join(', ')}`}</div></div>`; }).join('')}</div>`;
  qr.appendChild(card);
}

/* ══════════════════════════════════════════════════════
   PREDICTED — Full-page treatment
   ══════════════════════════════════════════════════════ */
function makePredictedVisual(){
  return `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:200px">
    <rect x="10" y="10" width="180" height="40" rx="8" fill="#EBF1FF" stroke="#B8CCFF" stroke-width="1"/>
    <rect x="20" y="20" width="60" height="8" rx="4" fill="#2558D3" fill-opacity="0.25"/>
    <rect x="88" y="20" width="90" height="8" rx="4" fill="#2558D3" fill-opacity="0.12"/>
    <rect x="20" y="32" width="100" height="8" rx="4" fill="#2558D3" fill-opacity="0.12"/>
    <rect x="148" y="32" width="30" height="8" rx="4" fill="#16A34A" fill-opacity="0.35"/>
    <rect x="10" y="60" width="180" height="40" rx="8" fill="#F4F3EF" stroke="#E3E2DC" stroke-width="1"/>
    <rect x="20" y="70" width="80" height="8" rx="4" fill="#0F1117" fill-opacity="0.15"/>
    <rect x="108" y="70" width="70" height="8" rx="4" fill="#0F1117" fill-opacity="0.08"/>
    <rect x="20" y="82" width="110" height="8" rx="4" fill="#0F1117" fill-opacity="0.08"/>
    <rect x="10" y="110" width="180" height="40" rx="8" fill="#F4F3EF" stroke="#E3E2DC" stroke-width="1"/>
    <rect x="20" y="120" width="50" height="8" rx="4" fill="#0F1117" fill-opacity="0.15"/>
    <rect x="78" y="120" width="100" height="8" rx="4" fill="#0F1117" fill-opacity="0.08"/>
    <rect x="20" y="132" width="90" height="8" rx="4" fill="#0F1117" fill-opacity="0.08"/>
  </svg>`;
}

function renderPredicted(root){
  /* Banner */
  const banner=makeBanner({
    eyebrow:'Exam Preparation',
    title:'Predicted Midterm<br>Questions.',
    sub:'Built from CCNA 200-301 exam patterns. These question styles consistently appear on Introduction to Networks midterm exams.',
    stats:[{num:'14',lbl:'Questions'},{num:'7',lbl:'Modules'},{num:'100%',lbl:'With answers'}],
    visual: makePredictedVisual(),
    accentColor:'#2558D3'
  });
  root.appendChild(banner);

  /* Questions grouped by module */
  const byMod={};
  PREDICTED_QUESTIONS.forEach((q,qi)=>{
    if(!byMod[q.module])byMod[q.module]=[];
    byMod[q.module].push({...q,_gi:qi});
  });

  let globalIdx=0;
  Object.entries(byMod).forEach(([mod,qs])=>{
    const m=MODULES[mod];
    const group=div('pred-group');

    /* Module header */
    const gh=div('pred-module-hdr'); gh.style.setProperty('--mc',m.color);
    gh.innerHTML=`<div class="pmh-badge" style="background:${m.color}">${mod}</div><div class="pmh-info"><div class="pmh-mod">Module ${mod}</div><div class="pmh-title">${m.title}</div></div><div class="pmh-icon">${m.icon}</div>`;
    group.appendChild(gh);

    const cardsWrap=div('pred-cards');
    qs.forEach(q=>{
      globalIdx++;
      const card=div('pred-card');
      card.innerHTML=`
        <div class="pred-head">
          <div class="pred-qnum" style="background:${m.color}18;color:${m.color};border-color:${m.color}30">${globalIdx}</div>
          <div class="pred-q">${q.q}</div>
          <span class="pred-chevron"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </div>
        <div class="pred-body">
          ${q.hint?`<div class="pred-hint"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 4.5v2.5M6.5 9v.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><span><strong>Hint:</strong> ${q.hint}</span></div>`:''}
          <ul class="pred-options">${q.options.map((o,i)=>`<li class="${i===q.answer?'ans':''}"><span class="pred-opt-letter">${ALPHA[i]}.</span><span>${o}</span></li>`).join('')}</ul>
          <div class="pred-exp"><strong>✓ ${ALPHA[q.answer]} —</strong> ${q.explanation}</div>
        </div>`;
      card.querySelector('.pred-head').addEventListener('click',()=>card.classList.toggle('open'));
      cardsWrap.appendChild(card);
    });
    group.appendChild(cardsWrap);
    root.appendChild(group);
  });
}

/* ══════════════════════════════════════════════════════
   STUDY NOTES — Full-page treatment
   ══════════════════════════════════════════════════════ */
const NOTES_DATA={
  1:{icon:'🌐',items:['Host/End device: any device that sends or receives data on a network','Server provides services; Client requests them; P2P: one device plays both roles','LAN: small area (office/home) · WAN: large area connecting multiple LANs','Internet = global public · Intranet = private internal · Extranet = controlled external','BYOD: Bring Your Own Device — personal devices on corporate network','QoS: prioritizes voice/video traffic to ensure low latency and no jitter','Cloud: internet-based storage/computing accessible from any device','Unicast=1→1 · Multicast=1→group · Broadcast=1→all']},
  2:{icon:'⚙️',items:['User EXEC (>) — limited monitoring · type enable to elevate','Privileged EXEC (#) — full access · type configure terminal for Global Config','Global Config (config)# · Interface (config-if)# · Line (config-line)#','Ctrl+Z / end → back to Privileged EXEC · exit → up one level','service password-encryption: Type 7 — encrypts ALL plain-text passwords in config','enable secret [pw]: Type 5 MD5 — stronger than enable password','copy running-config startup-config → saves RAM to NVRAM (survives reload)','SVI (interface vlan 1): logical IP interface for remote management of switch','show ip interface brief: one-line summary of all interfaces and status']},
  3:{icon:'📋',items:['OSI 7 layers: Physical · Data Link · Network · Transport · Session · Presentation · Application','TCP/IP 4 layers: Network Access=OSI 1+2 · Internet=OSI 3 · Transport=OSI 4 · App=OSI 5–7','PDUs: Data (App) → Segment (Transport) → Packet (Network) → Frame (Data Link) → Bits (Physical)','Encapsulation: add headers going DOWN the stack · De-encapsulation: strip headers going UP','TCP: connection-oriented, reliable, ordered · UDP: connectionless, fast, unreliable','Open standards = any vendor can implement → interoperability between devices']},
  4:{icon:'🔌',items:['Bandwidth: max capacity (theoretical) · Throughput: actual measured rate (always ≤ bandwidth)','Latency: total delay source→destination · Goodput: useful data rate (no overhead)','Attenuation: signal weakening over distance — main reason for cable length limits','Crosstalk: interference between adjacent wire pairs — reduced by twisting the pairs','UTP: most common, RJ-45, 100 m max — cheap but susceptible to EMI','Straight-through: unlike devices (PC↔switch) · Crossover: like devices (PC↔PC)','Single-mode fiber: laser, km distances · Multi-mode: LED, ~550 m · Both immune to EMI','Wireless 802.11 uses CSMA/CA · Interfered by microwaves and cordless phones']},
  6:{icon:'🔗',items:['LLC sublayer (software): identifies upper-layer protocol · MAC sublayer (hardware): addressing + media access','Frame structure: Header (dest MAC, src MAC, type) | Data | Trailer (FCS/CRC)','FCS/CRC in trailer: detects errors — if mismatch the frame is DISCARDED, not corrected','Broadcast MAC: FF:FF:FF:FF:FF:FF · Multicast MAC: starts with 01:00:5E','CSMA/CD: wired Ethernet half-duplex (detects collisions) · CSMA/CA: 802.11 (avoids them)','Full-duplex: simultaneous send/receive — no media arbitration needed','Store-and-forward: checks CRC → accurate · Cut-through/Fast-forward: reads dest MAC → fastest']},
  8:{icon:'🗺️',items:['IP is C-B-M: Connectionless · Best-effort delivery · Media-independent','TTL: decremented by 1 at each router · dropped when TTL=0 (prevents routing loops)','Protocol field: 6=TCP · 17=UDP · 1=ICMP — tells receiver which Layer 4 process to use','IPv4: 32-bit (~4.3B addresses) · IPv6: 128-bit (340 undecillion), fixed 40-byte header','IPv6: no broadcast (uses multicast) · no in-transit fragmentation · built-in IPsec','ARP: resolves known IPv4 address → unknown MAC on local network','ARP request: broadcast (FF:FF:FF:FF:FF:FF) · ARP reply: unicast back to requester','Default gateway: IP of router on same subnet — used ONLY for traffic to remote networks']},
  16:{icon:'🔒',items:['Virus: attaches to files, needs user action · Worm: self-replicates automatically · Trojan: disguised as legit software','Reconnaissance: info gathering (nslookup, ping sweep) · DoS: flood to deny service · MitM: intercept between two parties','Stateful Packet Inspection: tracks connection state — blocks inbound with no matching outbound','IDS: detects and alerts only · IPS: detects and BLOCKS in real time','AAA: Authentication (who?) · Authorization (what can they do?) · Accounting (what did they do?)','SSH requires: unique hostname + ip domain-name + RSA key pair + local user account','login block-for [s] attempts [n] within [s] — mitigates brute-force login attacks','enable secret: MD5 (stronger) · service password-encryption: Type 7 (weaker, all passwords)']}
};

function makeNotesVisual(){
  const colors=['#2558D3','#059669','#7C3AED','#D97706','#DC2626','#0891B2','#BE185D'];
  const mods=[1,2,3,4,6,8,16];
  let cols='';
  mods.forEach((m,i)=>{
    const c=colors[i];
    cols+=`<div style="flex:1;min-width:18px;height:100%;background:${c};opacity:${0.12+(i%3)*0.06};border-radius:3px"></div>`;
  });
  return `<div style="display:flex;gap:4px;height:80px;align-items:flex-end">${cols}</div>`;
}

function renderNotes(root){
  const banner=makeBanner({
    eyebrow:'Quick Reference',
    title:'Study Notes.',
    sub:'Key facts and definitions for all 7 modules. Built for rapid review before your exam.',
    stats:[{num:'7',lbl:'Modules'},{num:'60+',lbl:'Key Facts'},{num:'8',lbl:'Per Module'}],
    visual: makeNotesVisual(),
    accentColor:'#2558D3'
  });
  root.appendChild(banner);

  /* Two-column grid of module note sections */
  const grid=div('notes-full-grid');
  Object.entries(NOTES_DATA).forEach(([mid,note])=>{
    const mod=MODULES[mid];
    const section=div('note-module'); section.style.setProperty('--mc',mod.color);
    section.innerHTML=`
      <div class="nm-header">
        <div class="nm-num">${String(mid).padStart(2,'0')}</div>
        <div class="nm-title">${mod.title}</div>
        <div class="nm-icon">${note.icon}</div>
      </div>
      <div class="nm-body">
        <ul class="nm-list">
          ${note.items.map(item=>`
            <li>
              <span class="nm-dot"></span>
              <span>${item}</span>
            </li>`).join('')}
        </ul>
      </div>`;
    grid.appendChild(section);
  });
  root.appendChild(grid);
}

/* ══════════════════════════════════════════════════════
   FLASHCARDS — Full-page treatment
   ══════════════════════════════════════════════════════ */
function makeFlashVisual(total){
  let dots='';
  for(let i=0;i<Math.min(total,12);i++){
    const a=0.15+((i/total)*0.7);
    dots+=`<circle cx="${14+i*16}" cy="24" r="${4+i%3}" fill="#2558D3" fill-opacity="${a}"/>`;
  }
  return `<svg viewBox="0 0 ${14+Math.min(total,12)*16} 48" style="width:100%;max-width:220px" fill="none" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
}

function renderFlashcards(root){
  const cards=shuffle([...FLASHCARDS]);
  let idx=0, flipped=false;

  const banner=makeBanner({
    eyebrow:'Active Recall',
    title:'Flashcards.',
    sub:`${cards.length} cards covering all 7 modules. Click any card to flip it. Use spaced repetition to maximise retention.`,
    stats:[{num:cards.length,lbl:'Cards'},{num:'7',lbl:'Modules'},{num:'∞',lbl:'Repeats'}],
    visual: makeFlashVisual(cards.length),
    accentColor:'#2558D3'
  });
  root.appendChild(banner);

  /* Progress bar above card */
  const progWrap=div('fc-prog-wrap');
  progWrap.id='fc-prog-wrap';
  root.appendChild(progWrap);

  /* Card stage */
  const stage=div('fc-stage');
  stage.id='fc-stage';
  root.appendChild(stage);

  function updateProg(){
    const pct=Math.round((idx/cards.length)*100);
    $('fc-prog-wrap').innerHTML=`
      <div class="fc-prog-meta">
        <span class="fc-prog-label">Card ${idx+1} of ${cards.length}</span>
        <span class="fc-prog-pct">${pct}% through deck</span>
      </div>
      <div class="fc-prog-bar"><div class="fc-prog-fill" style="width:${pct}%"></div></div>`;
  }

  function draw(){
    const c=cards[idx]; updateProg();
    $('fc-stage').innerHTML=`
      <div class="fc-scene" id="fcs" role="button" tabindex="0" aria-label="${flipped?'Answer: '+c.a:'Question: '+c.q}">
        <div class="fc-inner${flipped?' flipped':''}" id="fci">
          <div class="fc-face fc-face-front">
            <div class="fc-face-label"><span class="fc-face-dot"></span>Question</div>
            <div class="fc-q">${c.q}</div>
            <div class="fc-face-hint">Click or press Space to reveal answer</div>
          </div>
          <div class="fc-face fc-face-back">
            <div class="fc-face-label"><span class="fc-face-dot"></span>Answer</div>
            <div class="fc-a">${c.a}</div>
            <div class="fc-face-hint">Click to see question again</div>
          </div>
        </div>
      </div>
      <div class="fc-controls">
        <button class="btn btn-ghost" id="fcp" ${idx===0?'disabled':''}>← Previous</button>
        <div class="fc-ctrl-center">
          <button class="btn btn-ghost" id="fcf">Flip Card</button>
        </div>
        <button class="btn btn-primary" id="fcn">${idx+1<cards.length?'Next →':'Restart'}</button>
      </div>`;
    const scene=$('fcs');
    const flip=()=>{ flipped=!flipped; $('fci').classList.toggle('flipped',flipped); scene.setAttribute('aria-label',flipped?'Answer: '+c.a:'Question: '+c.q); };
    scene.addEventListener('click',flip);
    scene.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();} });
    $('fcf').addEventListener('click',e=>{e.stopPropagation();flip();});
    $('fcp').addEventListener('click',()=>{ if(idx>0){idx--;flipped=false;draw();} });
    $('fcn').addEventListener('click',()=>{ if(idx+1<cards.length){idx++;flipped=false;draw();}else{idx=0;flipped=false;draw();} });
  }
  draw();
}

/* ── Public API ──────────────────────────────────── */
window.App={
  navigate:(v,m)=>navigate(v,m),
  retryQuiz:()=>{ const mid=State.quiz.moduleId; State.quiz={moduleId:mid,questions:shuffle([...QUIZ_DATA[mid]]),current:0,answers:[],answered:false,selectedMulti:[]}; const qr=$('quiz-root'); if(qr){renderQuestion();window.scrollTo({top:qr.offsetTop-24,behavior:'smooth'});} }
};

/* ── Init ────────────────────────────────────────── */
document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>navigate(el.dataset.view)));
buildSidebar(); navigate('home'); updateFooter();
