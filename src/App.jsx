import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  ChartNoAxesCombined,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  FileSpreadsheet,
  Sparkles,
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = ['Home', 'Skills', 'Projects', 'Journey', 'Contact'];

const skillGroups = [
  {
    title: 'Data Analytics',
    icon: ChartNoAxesCombined,
    items: ['Data Cleaning', 'Exploratory Data Analysis', 'Statistical Analysis', 'KPI Analysis', 'Data Visualization', 'Business Reporting'],
  },
  {
    title: 'Programming',
    icon: Code2,
    items: ['Python', 'Pandas', 'NumPy', 'SQL', 'R', 'JavaScript'],
  },
  {
    title: 'BI & Visualization',
    icon: BarChart3,
    items: ['Power BI', 'DAX', 'Power Query', 'Tableau', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Tools & Databases',
    icon: Database,
    items: ['Excel', 'PostgreSQL', 'MySQL', 'Jupyter', 'Git & GitHub'],
  },
];

const projects = [
  {
    no: '01',
    name: 'Customer Churn Analysis',
    type: 'DATA ANALYTICS',
    desc: 'Explored customer behaviour and churn patterns, then translated findings into an interactive dashboard.',
    stack: ['Python', 'SQL', 'Power BI'],
    icon: BarChart3,
    tone: 'orange',
  },
  {
    no: '02',
    name: 'Sales Performance Analysis',
    type: 'BUSINESS INTELLIGENCE',
    desc: 'Analysed sales performance and business KPIs using Excel, SQL and a Power BI reporting dashboard.',
    stack: ['Excel', 'SQL', 'Power BI'],
    icon: FileSpreadsheet,
    tone: 'sand',
  },
  {
    no: '03',
    name: 'Stock Market Analytics',
    type: 'PYTHON PROJECT',
    desc: 'Created an analytics experience to explore market trends, moving averages and volatility.',
    stack: ['Python', 'Streamlit', 'Analytics'],
    icon: ChartNoAxesCombined,
    tone: 'rust',
  },
  {
    no: '04',
    name: 'ScatterMem',
    type: 'HACKATHON PROJECT',
    desc: 'A knowledge handover platform concept focused on capturing, organising and sharing team knowledge.',
    stack: ['React', 'FastAPI', 'Python'],
    icon: Sparkles,
    tone: 'orange',
  },
];

function SectionHeading({ eyebrow, title, accent, note }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title} <span>{accent}</span></h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function ProjectVisual({ variant = 'chart' }) {
  return (
    <div className={`project-visual visual-${variant}`} aria-hidden="true">
      <div className="visual-top"><i /><i /><i /><span>INSIGHT / 0{variant === 'chart' ? '1' : variant === 'table' ? '2' : '3'}</span></div>
      <div className="visual-content">
        <div className="visual-sidebar"><b /><b /><b /><b /></div>
        <div className="visual-main">
          <div className="visual-heading-line" />
          <div className="visual-metric-row"><i /><i /><i /></div>
          <div className="visual-chart">
            <span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="visual-bottom"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.12,
      });

      gsap.from('.hero-gallery .gallery-card', {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.25,
      });

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 32,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const current = navItems.find((item) => item.toLowerCase() === entry.target.id);
            if (current) setActive(current);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <section className="hero" id="home">
        <div
          className="hero-frame"
          onPointerMove={(event) => {
            if (event.pointerType === 'touch') return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width) * 100;
            const y = ((event.clientY - bounds.top) / bounds.height) * 100;
            event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
            event.currentTarget.style.setProperty('--pointer-y', `${y}%`);
            event.currentTarget.style.setProperty('--pointer-dx', `${(x - 50) / 50}`);
            event.currentTarget.style.setProperty('--pointer-dy', `${(y - 50) / 50}`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty('--pointer-x', '50%');
            event.currentTarget.style.setProperty('--pointer-y', '50%');
            event.currentTarget.style.setProperty('--pointer-dx', '0');
            event.currentTarget.style.setProperty('--pointer-dy', '0');
          }}
        >
          <header className="site-header">
            <a className="brand" href="#home" onClick={closeMenu}>
              SANIKA <span>PARATE</span><i>.</i>
            </a>

            <button
              className="menu-toggle"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
              {navItems.map((item) => (
                <a
                  key={item}
                  className={active === item ? 'active' : ''}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                >
                  {item}
                </a>
              ))}
            </nav>

            <a
              className="resume-link"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open resume in a new tab"
            >
              RESUME <ArrowUpRight size={15} />
            </a>
          </header>

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">DATA ANALYTICS · PORTFOLIO 2026</p>
              <h1 style={{ fontSize: 'clamp(44px, 5vw, 68px)', lineHeight: 1.08 }}>Curiosity is<br /><span>my instinct.</span></h1>
              <h2 className="hero-tagline">Data is my language.</h2>
              <p className="hero-intro">
                I'm a Computer Science graduate with a passion for exploring data,
                solving problems and discovering patterns hidden beneath the numbers.
                With hands-on skills in Python, SQL, Excel and Power BI, I transform
                raw information into meaningful insights and interactive visualizations.
                I enjoy combining analytical thinking with creativity to make complex
                data easier to understand and turn findings into informed decisions.
              </p>
              <a className="round-cta" href="#contact">LET'S TALK <ArrowUpRight size={16} /></a>

              <div className="hero-controls">
                <span className="slide-number">01 <i>/</i> 05</span>
                <a href="#skills" aria-label="Scroll to skills"><ArrowDown size={15} /></a>
                <a href="#projects" aria-label="Scroll to projects"><ArrowUp size={15} /></a>
              </div>
            </div>

            <div className="hero-gallery" aria-label="Portfolio preview">
              <div className="gallery-card gallery-tall">
                <div className="gallery-label">01 / ANALYTICS</div>
                <div className="dashboard-art">
                  <div className="dash-head"><span>OVERVIEW</span><b>•••</b></div>
                  <div className="dash-big-number">84.6<span>%</span></div>
                  <div className="dash-caption">CUSTOMER RETENTION</div>
                  <div className="dash-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="dash-line"><i /><i /><i /><i /><i /></div>
                </div>
              </div>

              <div className="gallery-card gallery-middle">
                <div className="gallery-label">02 / REPORTING</div>
                <div className="report-art">
                  <div className="report-ring"><span>72%</span></div>
                  <div className="report-lines"><i /><i /><i /><i /></div>
                  <div className="report-blocks"><i /><i /><i /></div>
                </div>
              </div>

              <div className="gallery-card gallery-small">
                <div className="gallery-label">03 / INSIGHT</div>
                <div className="insight-art">
                  <div className="insight-sun" />
                  <div className="insight-wave wave-one" />
                  <div className="insight-wave wave-two" />
                  <span>DATA<br />IN MOTION</span>
                </div>
              </div>
              <span className="gallery-index">A STUDY IN CLARITY & CURIOSITY</span>
            </div>
          </div>

          <div className="hero-bottom">
            <span>DATA ANALYSIS <i>×</i> VISUAL STORYTELLING</span>
            <p>Exploring patterns. Finding meaning. Creating impact.</p>
          </div>
        </div>
      </section>


      <section className="skills section" id="skills">
        <div className="section-inner">
          <div className="reveal">
            <SectionHeading eyebrow="01 / CAPABILITIES" title="The tools behind" accent="the thinking." note="A growing toolkit for exploring, analysing and communicating data." />
          </div>
          <div className="skill-groups">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article className="skill-group reveal" key={group.title}>
                  <div className="skill-group-head">
                    <span className="skill-icon"><Icon size={19} /></span>
                    <span className="skill-count">0{index + 1}</span>
                  </div>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-inner">
          <div className="projects-top reveal">
            <SectionHeading eyebrow="02 / SELECTED WORK" title="A few things" accent="I’ve built." note="A selection of projects where data, code and curiosity meet." />
            <span className="project-total">04 <small>PROJECTS</small></span>
          </div>
          <div className="project-list">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <article className={`project-item ${project.tone} reveal`} key={project.no}>
                  <div className="project-no">{project.no}</div>
                  <ProjectVisual variant={index === 0 ? 'chart' : index === 1 ? 'table' : 'trend'} />
                  <div className="project-info">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.name}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                  <span className="project-open"><Icon size={18} /></span>
                </article>
              );
            })}
          </div>
          <p className="project-footnote">MORE IDEAS ARE ALWAYS TAKING SHAPE <span>✳</span></p>
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="section-inner journey-layout">
          <div className="reveal">
            <SectionHeading eyebrow="03 / THE JOURNEY" title="Built on learning." accent="Driven by curiosity." note="Every step adds a new perspective. Here’s the foundation I’m building on." />
          </div>
          <div className="timeline reveal">
            <div className="timeline-entry">
              <span className="timeline-dot" />
              <p className="timeline-label">EDUCATION</p>
              <h3>B.Tech — Computer Science</h3>
              <p>GH Raisoni University</p>
              <span className="timeline-meta">CGPA · 8.51</span>
            </div>
            <div className="timeline-entry">
              <span className="timeline-dot" />
              <p className="timeline-label">PRACTICAL EXPERIENCE</p>
              <h3>Analytics & project work</h3>
              <p>Hands-on work across data analysis, dashboards, Python and SQL projects.</p>
              <span className="timeline-meta">LEARNING BY BUILDING</span>
            </div>
            <div className="timeline-entry">
              <span className="timeline-dot" />
              <p className="timeline-label">CURRENT FOCUS</p>
              <h3>Growing as a data professional</h3>
              <p>Strengthening analytical skills, building practical projects and exploring opportunities in data analytics.</p>
              <span className="timeline-meta">WHAT’S NEXT</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-content reveal">
          <p className="eyebrow">05 / GET IN TOUCH</p>
          <h2>Have a good<br /><span>idea in mind?</span></h2>
          <p className="contact-copy">Have a role, a project idea or just want to talk about data and technology? I’d love to hear from you.</p>
          <a className="round-cta" href="mailto:your.email@example.com">Start a conversation <ArrowUpRight size={16} /></a>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a href="mailto:your.email@example.com"><Mail size={16} /> Email</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">SANIKA <span>PARATE</span><i>.</i></a>
        <span>Designed with curiosity and a little bit of warmth.</span>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <small>© {new Date().getFullYear()} SANIKA PARATE</small>
      </footer>
    </main>
  );
}
