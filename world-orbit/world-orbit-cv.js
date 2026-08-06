/* ------------------------------------------------------------------
   IMÁGENES — reemplaza cada `img` (y los `img` de scenery) por la URL
   real en /public. Si queda vacío se usa el degradado de respaldo.
------------------------------------------------------------------ */
const PROJECTS = [
  {
    name:"AuditFlow", tag:"Chat-to-Case Architecture", stack:"Next.js · n8n · LLM", role:"AuditFlow PMO",
    img:"", fallback:"linear-gradient(180deg,#2d3a63 0%,#6b5a86 34%,#c98fa0 58%,#5b4653 78%,#241c26 100%)",
    lede:"Arquitectura Chat-to-Case que automatiza la consolidación de datos combinando Next.js, n8n y modelos LLM, con persistencia en Supabase.",
    scenery:[
      {t:"Clasificación por LLM", d:"Integración de modelos LLM para la clasificación de intenciones y automatización de flujos (Chat-to-Case).", img:"", fallback:"linear-gradient(160deg,#5c6ea0,#c79caa 55%,#3a2f3d)"},
      {t:"Orquestación n8n", d:"Orquestación de procesos backend mediante n8n y almacenamiento estructurado en Supabase.", img:"", fallback:"linear-gradient(160deg,#7c6a55,#c9a97c 50%,#33291f)"}
    ]
  },
  {
    name:"Web Check-in", tag:"Automated Guest Check-in", stack:"Next.js · Vercel · Make", role:"—",
    img:"", fallback:"linear-gradient(180deg,#1e3a63 0%,#3f7ab0 30%,#a9c9dd 52%,#e6e2da 66%,#2a3644 100%)",
    lede:"Aplicación web para la gestión automatizada de check-in de huéspedes, con captura de reservas en tiempo real y generación de tokens únicos de seguridad.",
    scenery:[
      {t:"Captura en Tiempo Real", d:"Captura de reservas en tiempo real desde plataformas externas como Booking.", img:"", fallback:"linear-gradient(160deg,#2f6796,#bcd4e4 55%,#2b3743)"},
      {t:"Tokens de Seguridad", d:"Generación de tokens únicos de seguridad por huésped para validar datos de forma segura.", img:"", fallback:"linear-gradient(160deg,#8c3d2c,#d08a63 55%,#2c1d18)"}
    ]
  },
  {
    name:"Integración de Cumplimiento y Validación de Identidad", tag:"Compliance & Identity", stack:"ASP.NET · APIs REST", role:"—",
    img:"", fallback:"linear-gradient(180deg,#1d2230 0%,#4a3b34 32%,#8a5f45 54%,#c08a5c 68%,#221a17 100%)",
    lede:"Arquitectura e integración de sistemas críticos de validación antifraude y normativos conectados a plataformas de registro en línea (.NET).",
    scenery:[
      {t:"Datacrédito Experian", d:"Integración de API con Datacrédito Experian para validación de identidad en tiempo real.", img:"", fallback:"linear-gradient(160deg,#a83a2a,#e0724f 50%,#2a1a15)"},
      {t:"Sistema SARLAFT", d:"Implementación de sistema API de prevención de lavado de activos (SARLAFT).", img:"", fallback:"linear-gradient(160deg,#3d5a34,#8fae62 55%,#1c2418)"}
    ]
  },
  {
    name:"Automatización y Procesamiento Masivo de Facturación Electrónica", tag:"Electronic Invoicing at Scale", stack:"Oracle JDE · Facture SAS", role:"—",
    img:"", fallback:"linear-gradient(180deg,#8fa3b4 0%,#b7c4cc 26%,#6e7d84 48%,#3c4750 70%,#151b21 100%)",
    lede:"Implementación de motor de facturación electrónica a gran escala conectado al ERP corporativo.",
    scenery:[
      {t:"11K–21K Facturas / Mes", d:"Automatización del procesamiento y emisión de 11,000 a 21,000 facturas mensuales de forma ininterrumpida.", img:"", fallback:"linear-gradient(160deg,#123a3a,#3fbf8f 45%,#101b2c)"},
      {t:"Comisiones Automáticas", d:"Liderazgo en el proyecto de generación automática de comisiones dentro del ERP.", img:"", fallback:"linear-gradient(160deg,#2c5f7a,#8fc4d8 50%,#16232c)"}
    ]
  },
  {
    name:"Ecosistema E-Commerce y Salesforce Multipaís", tag:"Multi-Country E-Commerce", stack:"Commerce Cloud · Tableau", role:"—",
    img:"", fallback:"linear-gradient(180deg,#12161f 0%,#3b2330 30%,#a63a4a 52%,#d4695f 62%,#161014 100%)",
    lede:"Despliegue y arquitectura de plataformas de experiencia de cliente y comercio electrónico a nivel regional.",
    scenery:[
      {t:"5 Países", d:"Implementación regional de Commerce Cloud para Colombia, Argentina, Perú, Uruguay y México.", img:"", fallback:"linear-gradient(160deg,#a3283c,#e2705a 50%,#1a1216)"},
      {t:"Tableau + Salesforce", d:"Validación de flujos de analítica de datos en tiempo real conectando Tableau directamente con Salesforce.", img:"", fallback:"linear-gradient(160deg,#42505f,#9aa7b3 52%,#1b2027)"}
    ]
  },
  {
    name:"Infraestructura Datacenter y Redes Críticas", tag:"Critical Infrastructure", stack:"AWS EC2 · Ruby on Rails", role:"—",
    img:"", fallback:"linear-gradient(180deg,#3a2f1a 0%,#6b5730 30%,#a68a4e 52%,#4a3d24 70%,#1a1610 100%)",
    lede:"Diseño y despliegue físico y lógico de la infraestructura tecnológica corporativa para sede de 1,000 metros cuadrados.",
    scenery:[
      {t:"Data Center Completo", d:"Instalación de centro de cómputo completo, 3 servidores físicos, terminales de simcards y 20 estaciones de trabajo.", img:"", fallback:"linear-gradient(160deg,#5a4a2a,#c0a05a 55%,#241d10)"},
      {t:"Ruby on Rails en AWS", d:"Implementación de sistema de gestión de garantías sobre Ruby on Rails en servidores Linux desplegados en AWS EC2.", img:"", fallback:"linear-gradient(160deg,#2c4a5a,#6a9ab0 55%,#101d24)"}
    ]
  }
];

const N = PROJECTS.length;
let active = 0; // arranca en AuditFlow

/* GSAP es opcional: si no carga, todo sigue funcionando sin animación */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const HAS_GSAP = typeof window.gsap !== "undefined" && !reduce;

/* ---------- build cards + dots ---------- */
const stage = document.getElementById("stage");
const dotsEl = document.getElementById("dots");

PROJECTS.forEach((d,i)=>{
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.dataset.index = i;
  card.setAttribute("aria-label", `${d.name} — ${d.tag}`);
  card.innerHTML = `
    <div class="media" style="background-image:${d.img?`url('${d.img}')`:d.fallback}"></div>
    <div class="veil"></div>
    <div class="label">
      <div class="name">${d.name}</div>
      <div class="tag">${d.tag}</div>
    </div>`;
  card.addEventListener("click",()=>{
    if(i===active) openSheet(); else goTo(i);
  });
  stage.appendChild(card);

  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("role","tab");
  dot.setAttribute("aria-label", d.name);
  dot.addEventListener("click",()=>goTo(i));
  dotsEl.appendChild(dot);
});

const cards = [...stage.querySelectorAll(".card")];
const dots  = [...dotsEl.querySelectorAll(".dot")];

/* ---------- carousel ---------- */
function offsetOf(i){
  let o = i - active;
  if(o >  N/2) o -= N;
  if(o < -N/2) o += N;
  return o;
}

function render(){
  const d = PROJECTS[active];

  cards.forEach((c,i)=>{
    const o = offsetOf(i);
    c.dataset.pos = Math.abs(o) > 2 ? (o>0?2:-2) : o;
    c.tabIndex = o === 0 ? 0 : -1;
    c.setAttribute("aria-hidden", Math.abs(o) > 1 ? "true" : "false");
  });

  dots.forEach((dot,i)=>dot.setAttribute("aria-current", i===active ? "true" : "false"));

  document.getElementById("ctaLabel").textContent = "Explorar " + d.name;
  document.getElementById("roPlace").textContent = d.name;
  document.getElementById("roStack").textContent = d.stack;
  document.getElementById("roRole").textContent = d.role;
}

function goTo(i){ active = (i % N + N) % N; render(); }
const step = n => goTo(active + n);

document.getElementById("prev").addEventListener("click",()=>step(-1));
document.getElementById("next").addEventListener("click",()=>step(1));
document.getElementById("cta").addEventListener("click",openSheet);

/* rueda / teclado / swipe */
let wheelLock = false;
window.addEventListener("wheel",e=>{
  if(sheet.classList.contains("open")) return;
  if(wheelLock || Math.abs(e.deltaY) < 8) return;
  wheelLock = true;
  step(e.deltaY > 0 ? 1 : -1);
  setTimeout(()=>wheelLock=false,620);
},{passive:true});

window.addEventListener("keydown",e=>{
  if(e.key === "Escape") return closeSheet();
  if(sheet.classList.contains("open")) return;
  if(e.key === "ArrowLeft")  step(-1);
  if(e.key === "ArrowRight") step(1);
});

let touchX = null;
stage.addEventListener("touchstart",e=>touchX = e.touches[0].clientX,{passive:true});
stage.addEventListener("touchend",e=>{
  if(touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(Math.abs(dx) > 44) step(dx < 0 ? 1 : -1);
  touchX = null;
},{passive:true});

/* ---------- modal ---------- */
const scrim = document.getElementById("scrim");
const sheet = document.getElementById("sheet");
const sheetScroll = document.querySelector(".sheet-scroll");

function openSheet(){
  const d = PROJECTS[active];
  document.getElementById("sheetMedia").style.backgroundImage = d.img ? `url('${d.img}')` : d.fallback;
  document.getElementById("sheetGeo").textContent = d.role !== "—" ? d.role : d.stack;
  document.getElementById("sheetTitle").textContent = d.name;
  document.getElementById("sheetTag").textContent = d.tag;
  document.getElementById("sheetLede").textContent = d.lede;
  document.getElementById("sheetGrid").innerHTML = d.scenery.map(s=>`
    <div class="tile">
      <div class="media" style="background-image:${s.img?`url('${s.img}')`:s.fallback}"></div>
      <div class="txt"><h3>${s.t}</h3><p>${s.d}</p></div>
    </div>`).join("");

  scrim.classList.add("open");
  sheet.classList.add("open");
  sheetScroll.scrollTop = 0;

  /* El modal se centra por CSS (inset:0;margin:auto), sin transform. GSAP solo
     anima opacity/scale/y en píxeles, nunca porcentajes, para no volver a chocar
     con el centrado (ver el comentario en .sheet en world-orbit-cv.css). */
  if(HAS_GSAP){
    gsap.fromTo(scrim,{opacity:0},{opacity:1,duration:.42,ease:"power2.out"});
    gsap.fromTo(sheet,
      {opacity:0,y:16,scale:.97},
      {opacity:1,y:0,scale:1,duration:.62,ease:"power3.out"});
  }else{
    scrim.style.opacity = 1;
    sheet.style.opacity = 1;
  }
  document.getElementById("close").focus();
}

function closeSheet(){
  if(!sheet.classList.contains("open")) return;
  const done = ()=>{scrim.classList.remove("open");sheet.classList.remove("open")};
  if(!HAS_GSAP) return done();
  gsap.to(scrim,{opacity:0,duration:.3,ease:"power2.in"});
  gsap.to(sheet,{opacity:0,y:16,scale:.98,duration:.34,ease:"power2.in",onComplete:done});
}

document.getElementById("close").addEventListener("click",closeSheet);
scrim.addEventListener("click",closeSheet);

/* ---------- starfield (tsParticles, mismo efecto que spa-prototype.js) ---------- */
window.tsParticles?.load({
  id: "tsparticles",
  options: {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 90, density: { enable: true, area: 900 } },
      color: { value: "#ffffff" },
      opacity: { value: { min: 0.2, max: 0.8 } },
      size: { value: { min: 0.5, max: 2 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        random: true,
        outModes: { default: "out" },
      },
      links: { enable: false },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
    detectRetina: true,
  },
});

/* ---------- intro ---------- */
/* IMPORTANTE: las tarjetas ya están en el DOM (se construyeron arriba) y su
   visibilidad la maneja el CSS por atributo data-pos, no GSAP. Nunca animar
   .card con gsap.from({opacity:0}) — si la animación no llega a completarse,
   las tarjetas quedan invisibles para siempre. Solo el masthead/controles
   (que no controlan si las tarjetas se ven) se animan con GSAP. */
render();
if(HAS_GSAP){
  gsap.from(".masthead h1",{opacity:0,y:16,duration:1.1,ease:"power3.out"});
  gsap.from(".eyebrow",{opacity:0,duration:1,delay:.35,ease:"power2.out"});
  gsap.from(".controls > *",{opacity:0,y:12,duration:.9,delay:.5,ease:"power3.out",stagger:.1});
}
