/* =========================================================
   DATA
========================================================= */
const skillsData = [
  { title:"Programming Languages", items:[["JavaScript / TypeScript",90],["Python",85],["Java",70],["C++",60]] },
  { title:"Frontend", items:[["React",85],["Next.js",75],["Tailwind CSS",88],["HTML / CSS",92]] },
  { title:"Backend", items:[["Node.js / Express",82],["REST & GraphQL APIs",78],["Django",65]] },
  { title:"Databases", items:[["PostgreSQL",80],["MongoDB",75],["Redis",60]] },
  { title:"AI & Machine Learning", items:[["TensorFlow / PyTorch",68],["Scikit-learn",72],["Prompt Engineering",85]] },
  { title:"Cloud", items:[["AWS",70],["Docker",75],["CI / CD",65]] },
  { title:"Developer Tools", items:[["VS Code",95],["Postman",85],["Figma",70]] },
  { title:"Version Control", items:[["Git & GitHub",90],["Trunk-based workflows",75]] },
  { title:"UI / UX", items:[["Wireframing",78],["Design Systems",72],["User Research",65]] },
  { title:"Soft Skills", items:[["Communication",88],["Ownership",90],["Collaboration",85]] },
];

const projectsData = [
  {
    title:"TaskFlow — Team Productivity Suite",
    category:"fullstack",
    thumb:"thumb-1",
    featured:true,
    status:"Completed",
    desc:"A full-stack task and sprint manager built for small engineering teams.",
    problem:"Problem solved: scattered task tracking across chat apps and spreadsheets slowed teams down.",
    tech:["React","Node.js","PostgreSQL","WebSockets"],
    learnings:"Learned to design real-time updates with WebSockets and optimistic UI without losing consistency.",
  },
  {
    title:"InsightAI — Resume Screener",
    category:"ai",
    thumb:"thumb-3",
    featured:true,
    status:"In Progress",
    desc:"An ML-powered tool that scores resumes against job descriptions and explains its reasoning.",
    problem:"Problem solved: recruiters spend hours manually shortlisting candidates from large applicant pools.",
    tech:["Python","PyTorch","FastAPI","OpenAI API"],
    learnings:"Learned to balance model accuracy with explainability so results are trustworthy, not a black box.",
  },
  {
    title:"Woodcraft — E-commerce Storefront",
    category:"frontend",
    thumb:"thumb-2",
    featured:false,
    status:"Completed",
    desc:"A fast, accessible storefront for a handmade-furniture brand.",
    problem:"Problem solved: the client's old site had a 6-second load time and no mobile checkout flow.",
    tech:["Next.js","Tailwind CSS","Stripe"],
    learnings:"Learned to optimize image delivery and checkout UX to cut load time by 70%.",
  },
  {
    title:"DevPulse — GitHub Analytics Dashboard",
    category:"fullstack",
    thumb:"thumb-4",
    featured:false,
    status:"Completed",
    desc:"A dashboard that visualizes contribution patterns and code review turnaround for engineering teams.",
    problem:"Problem solved: engineering leads had no lightweight way to see review bottlenecks.",
    tech:["React","Express","GitHub API","Chart.js"],
    learnings:"Learned to design against a rate-limited third-party API using caching and batched requests.",
  },
];

/* =========================================================
   LOADER
========================================================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 900);
});

/* =========================================================
   THEME TOGGLE  (in-memory only — no localStorage)
========================================================= */
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;
themeToggle.addEventListener("click", () => {
  const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
});

/* =========================================================
   MOBILE NAV
========================================================= */
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
  hamburger.classList.toggle("active");
});
document.querySelectorAll("[data-nav]").forEach(link => {
  link.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
  });
});

/* =========================================================
   SCROLLSPY — highlight active nav link
========================================================= */
const sections = document.querySelectorAll("main section[id], header + main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
document.querySelectorAll("main section[id]").forEach(sec => spyObserver.observe(sec));

/* =========================================================
   BACK TO TOP
========================================================= */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
  navbarShadow();
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

function navbarShadow(){
  const nav = document.getElementById("navbar");
  nav.style.boxShadow = window.scrollY > 20 ? "0 8px 24px rgba(0,0,0,0.25)" : "none";
}

/* =========================================================
   TYPING ANIMATION
========================================================= */
const roles = ["Software Engineer", "Full-Stack Developer", "AI Enthusiast", "Product Builder"];
const typedEl = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* =========================================================
   ANIMATED COUNTERS
========================================================= */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-num").forEach(el => counterObserver.observe(el));

/* =========================================================
   RENDER SKILLS
========================================================= */
const skillsGrid = document.getElementById("skillsGrid");
skillsData.forEach(category => {
  const card = document.createElement("div");
  card.className = "skill-card reveal";
  card.innerHTML = `
    <h3>${category.title}</h3>
    ${category.items.map(([name, pct]) => `
      <div class="skill-row">
        <div class="skill-row-top"><span>${name}</span><span>${pct}%</span></div>
        <div class="skill-bar"><span data-pct="${pct}"></span></div>
      </div>
    `).join("")}
  `;
  skillsGrid.appendChild(card);
  revealObserver.observe(card);
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-bar span").forEach(bar => {
        bar.style.width = bar.dataset.pct + "%";
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-card").forEach(card => barObserver.observe(card));

/* =========================================================
   RENDER PROJECTS + FILTER + SEARCH
========================================================= */
const projectGrid = document.getElementById("projectGrid");

function renderProjects(list){
  projectGrid.innerHTML = list.map(p => `
    <div class="project-card reveal visible" data-category="${p.category}" data-title="${p.title.toLowerCase()}">
      <div class="project-thumb ${p.thumb}">
        ${p.featured ? '<span class="badge-featured">Featured</span>' : ''}
        <span>project preview</span>
      </div>
      <div class="project-body">
        <h3>${p.title} <span class="badge-status">${p.status}</span></h3>
        <p>${p.desc}</p>
        <p class="project-meta">${p.problem}</p>
        <div class="tech-tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
        <p class="project-meta"><strong>Key learning:</strong> ${p.learnings}</p>
        <div class="project-actions">
          <a href="#" class="btn btn-outline">GitHub</a>
          <a href="#" class="btn btn-primary">Live Demo</a>
        </div>
      </div>
    </div>
  `).join("");
}
renderProjects(projectsData);

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("projectSearch");
let activeFilter = "all";

function applyFilters(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = projectsData.filter(p => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  renderProjects(filtered);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});
searchInput.addEventListener("input", applyFilters);

/* =========================================================
   GITHUB HEATMAP (decorative placeholder)
========================================================= */
const heatmap = document.getElementById("heatmap");
for (let i = 0; i < 26 * 7; i++) {
  const cell = document.createElement("span");
  const intensity = Math.random();
  let color = "var(--panel-2)";
  if (intensity > 0.85) color = "var(--cyan)";
  else if (intensity > 0.65) color = "var(--emerald)";
  else if (intensity > 0.45) color = "color-mix(in srgb, var(--emerald) 40%, var(--panel-2))";
  cell.style.background = color;
  heatmap.appendChild(cell);
}

/* =========================================================
   CONTACT FORM (front-end only)
========================================================= */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent = "Message captured locally — connect a backend or form service to send it live.";
  contactForm.reset();
});