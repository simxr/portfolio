'use client';

export const dynamic = 'force-static';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  DollarSign,
  ExternalLink,
  Gauge,
  GitBranch,
  GitPullRequest,
  GraduationCap,
  Mail,
  Menu,
  Network,
  Server,
  Shield,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const roles = [
  'Cloud Automation',
  'Platform Engineering',
  'SRE',
  'Infrastructure as Code',
];
const contactWords = ['systems', 'reliability', 'impact'];
const currentWork = [
  {
    icon: Cloud,
    label: 'Cloud foundations',
    detail:
      'Reusable Terraform and Terragrunt modules built with Cloud Posse patterns for secure, repeatable AWS and EKS provisioning.',
  },
  {
    icon: Network,
    label: 'End-to-end delivery',
    detail:
      'Production EKS clusters bootstrapped through Terraform, Helm, Argo CD, and Azure DevOps pipelines.',
  },
  {
    icon: Shield,
    label: 'Platform standards',
    detail:
      'Identity, observability, storage, backup, security, and CI/CD standardized with Keycloak and kube-prometheus-stack.',
  },
];

function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = new Image();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    let animationFrame = 0;
    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!image.complete || !bounds.width || !bounds.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);

      const spacing = Math.max(5.5, Math.min(8, bounds.width / 78));
      const columns = Math.ceil(bounds.width / spacing);
      const rows = Math.ceil(bounds.height / spacing);
      const sampler = document.createElement('canvas');
      sampler.width = columns;
      sampler.height = rows;
      const sampleContext = sampler.getContext('2d', {
        willReadFrequently: true,
      });
      const context = canvas.getContext('2d');
      if (!sampleContext || !context) return;

      const sourceRatio = image.width / image.height;
      const targetRatio = columns / rows;
      let sourceWidth = image.width;
      let sourceHeight = image.height;
      let sourceX = 0;
      let sourceY = 0;

      if (sourceRatio > targetRatio) {
        sourceWidth = image.height * targetRatio;
        sourceX = (image.width - sourceWidth) / 2;
      } else {
        sourceHeight = image.width / targetRatio;
        sourceY = (image.height - sourceHeight) / 2;
      }

      sampleContext.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        columns,
        rows,
      );

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const offset = (row * columns + column) * 4;
          const red = pixels[offset];
          const green = pixels[offset + 1];
          const blue = pixels[offset + 2];
          const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          const radius = spacing * (0.11 + brightness * 0.38);
          const boostedRed = Math.min(255, red * 1.08 + 16);
          const boostedGreen = Math.min(255, green * 1.02 + 7);
          const boostedBlue = Math.min(255, blue * 0.9 + 3);

          context.beginPath();
          context.arc(
            (column + 0.5) * spacing,
            (row + 0.5) * spacing,
            radius,
            0,
            Math.PI * 2,
          );
          context.fillStyle = `rgb(${boostedRed} ${boostedGreen} ${boostedBlue})`;
          context.fill();
        }
      }
    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(scheduleDraw);
    resizeObserver.observe(canvas);
    image.addEventListener('load', scheduleDraw);
    image.src = `${basePath}/portrait-source.png`;

    return () => {
      resizeObserver.disconnect();
      image.removeEventListener('load', scheduleDraw);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="systems-portrait ascii-portrait">
      <span className="visually-hidden">Halftone portrait of Simar Ahuja</span>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="ascii-scanline" aria-hidden="true" />
      <div className="ascii-caption">
        <span>HALFTONE / SOURCE PORTRAIT</span>
        <b>SIMAR.AHUJA</b>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [activeRole, setActiveRole] = useState(0);
  const siteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % contactWords.length);
    }, 2300);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const root = siteRef.current;
    if (!root) return;

    let scrollFrame = 0;
    let pointerFrame = 0;
    const updateScroll = () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const distance =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = distance > 0 ? window.scrollY / distance : 0;
        root.style.setProperty('--scroll-progress', progress.toString());
      });
    };
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty('--pointer-x', `${event.clientX}px`);
        root.style.setProperty('--pointer-y', `${event.clientY}px`);
      });
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={siteRef} className="site is-ready">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-nav">
        <button
          className="nav-action"
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          aria-controls="site-menu"
          aria-expanded={menuOpen}
        >
          <Menu size={18} strokeWidth={1.7} />
          <span>Menu</span>
        </button>
        <a className="wordmark" href="#home" aria-label="Simar Ahuja, home">
          Simar<span>Ahuja</span>
        </a>
        <a
          className="nav-action nav-contact"
          href="mailto:simarahuja@outlook.com"
        >
          Let&apos;s talk <ArrowUpRight size={17} />
        </a>
      </header>

      <div
        id="site-menu"
        className={menuOpen ? 'menu-overlay is-open' : 'menu-overlay'}
        aria-hidden={!menuOpen}
      >
        <button
          className="menu-close"
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation"
        >
          Close <X size={18} />
        </button>
        <nav className="overlay-links" aria-label="Primary navigation">
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#impact" onClick={closeMenu}>
            Impact
          </a>
          <a href="#work" onClick={closeMenu}>
            Projects
          </a>
          <a href="#current-work" onClick={closeMenu}>
            Current work
          </a>
        </nav>
        <div className="menu-reachout">
          <span>Reach out</span>
          <a href="mailto:simarahuja@outlook.com">simarahuja@outlook.com</a>
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-status">
            <span /> Available for ambitious infrastructure problems
          </div>
          <p className="eyebrow">Cloud Automation Engineer · Gurgaon, India</p>
          <h1>
            <span className="hero-first">Simar</span>
            <span className="hero-last">Ahuja</span>
          </h1>
          <p className="hero-intro">
            I engineer secure cloud foundations that let teams ship with
            confidence.
          </p>
        </div>

        <AsciiPortrait />

        <div className="hero-socials" aria-label="Social links">
          <a
            href="https://github.com/simxr"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <span className="brand-mark">GH</span>
          </a>
          <a
            href="https://www.linkedin.com/in/simarahuja/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <span className="brand-mark">in</span>
          </a>
        </div>

        <a
          className="scroll-cue"
          href="#statement"
          aria-label="Scroll to introduction"
        >
          <span>Explore</span>
          <ArrowDown size={18} />
        </a>
      </section>

      <div className="signal-ticker" aria-label="Core engineering disciplines">
        <div>
          {[0, 1].map((group) => (
            <span key={group} aria-hidden={group === 1}>
              Cloud automation <i>✦</i> Platform engineering <i>✦</i>{' '}
              Reliability <i>✦</i> Infrastructure as code <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <section className="statement" id="statement" data-reveal>
        <p>
          <em>from</em> infrastructure
        </p>
        <p>to dependable systems.</p>
      </section>

      <section className="impact" id="impact" data-reveal>
        <div className="section-kicker">
          <span>01</span> Production impact
        </div>
        <div className="impact-intro">
          <h2>Reliability you can measure.</h2>
          <p>
            I own infrastructure automation for microservices across financial
            markets and core banking on EKS—standardizing how mission-critical
            workloads are provisioned, observed, and operated.
          </p>
        </div>
        <div className="metrics-strip">
          <article>
            <Gauge aria-hidden="true" />
            <strong>99.96%</strong>
            <span>Production SLA sustained</span>
          </article>
          <article>
            <DollarSign aria-hidden="true" />
            <strong>12-13%</strong>
            <span>Cluster cost reduction</span>
          </article>
          <article>
            <Server aria-hidden="true" />
            <strong>&gt;$1,000</strong>
            <span>Monthly savings per cluster</span>
          </article>
        </div>
        <div className="impact-method">
          <span>Kubernetes right-sizing</span>
          <span>Requests / limits analysis</span>
          <span>Prometheus + Grafana</span>
          <span>AWS Well-Architected</span>
          <span>Keycloak</span>
          <span>Argo CD</span>
        </div>
      </section>

      <section
        className="roles-section"
        aria-label="Engineering focus areas"
        data-reveal
      >
        <div className="roles-orbit" aria-hidden="true">
          <span>{String(activeRole + 1).padStart(2, '0')}</span>
        </div>
        <p className="roles-label">What I work across</p>
        <div className="role-list">
          {roles.map((role, index) => (
            <button
              key={role}
              type="button"
              className={index === activeRole ? 'active' : ''}
              onPointerEnter={() => setActiveRole(index)}
              onFocus={() => setActiveRole(index)}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              {role}
            </button>
          ))}
        </div>
        <p className="roles-note">
          Secure by default. Observable in production. Built for the next team,
          not just the first deployment.
        </p>
      </section>

      <section className="featured-heading" id="work" data-reveal>
        <span>02 · Selected work</span>
        <h2>
          Featured
          <br />
          <em>systems</em>
        </h2>
      </section>

      <section className="project project-upstream" data-reveal>
        <div className="project-topline">
          <span>01 / Open-source intelligence</span>
          <span>Go · Next.js · GitHub API</span>
        </div>
        <div className="project-grid">
          <div className="project-copy">
            <div className="project-mark">
              <GitBranch size={28} />
              <span>Upstream</span>
            </div>
            <h3>
              Find the right issue.
              <br />
              <em>Understand why.</em>
            </h3>
            <p>
              A targeted issue discovery tool for cloud-native engineers. It
              ranks curated opportunities by domain, skill signals, and
              contribution shape, then exposes every scoring reason.
            </p>
            <div className="project-links">
              <a
                href="https://simxr.github.io/Upstream/"
                target="_blank"
                rel="noreferrer"
              >
                Live product <ExternalLink size={15} />
              </a>
              <a
                href="https://github.com/simxr/Upstream"
                target="_blank"
                rel="noreferrer"
              >
                Source <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="upstream-visual" aria-label="Upstream data flow">
            <div className="visual-toolbar">
              <span />
              <span />
              <span />
              <b>UPSTREAM / MATCH ENGINE</b>
            </div>
            <div className="issue-result">
              <div className="issue-score">
                <span>8.0</span>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="46" />
                </svg>
              </div>
              <div>
                <small>MATCHED OPPORTUNITY</small>
                <strong>Improve Helm release validation</strong>
              </div>
            </div>
            <div className="signal-row">
              <span>Kubernetes</span>
              <span>Helm</span>
              <span>bug-fix</span>
            </div>
            <div className="reason-list">
              <p>
                <b>+2</b> infrastructure-as-code domain
              </p>
              <p>
                <b>+1</b> matched Helm skill signal
              </p>
              <p>
                <b>+1</b> preferred contribution shape
              </p>
            </div>
            <div className="visual-footer">
              <span>Curated YAML</span>
              <ArrowRight size={15} />
              <span>Go scorer</span>
              <ArrowRight size={15} />
              <span>Static feed</span>
            </div>
          </div>
        </div>
        <div className="project-foot">
          <span>Deterministic scoring</span>
          <span>Scheduled GitHub Actions refresh</span>
          <span>No backend infrastructure</span>
        </div>
      </section>

      <section className="project project-eee" data-reveal>
        <div className="project-topline">
          <span>02 / Developer platform</span>
          <span>Kubernetes · Argo CD · Terraform</span>
        </div>
        <div className="project-grid reverse">
          <div
            className="eee-visual"
            aria-label="Ephemeral Environment Engine workflow"
          >
            <div className="pipeline-head">
              <GitPullRequest size={20} />
              <span>PR #42 opened</span>
              <small>PREVIEW REQUESTED</small>
            </div>
            <div className="pipeline-line" />
            <div className="pipeline-step">
              <GitBranch />
              <span>
                <b>ApplicationSet</b>
                <small>discovers pull request</small>
              </span>
              <i>01</i>
            </div>
            <div className="pipeline-step">
              <Cloud />
              <span>
                <b>Terraform + LocalStack</b>
                <small>provisions isolated resources</small>
              </span>
              <i>02</i>
            </div>
            <div className="pipeline-step">
              <Server />
              <span>
                <b>Helm + Argo CD</b>
                <small>deploys env-pr-42</small>
              </span>
              <i>03</i>
            </div>
            <div className="preview-ready">
              <Shield size={18} />
              <span>pr42.local.dev</span>
              <b>READY</b>
            </div>
          </div>
          <div className="project-copy">
            <div className="project-mark">
              <Terminal size={28} />
              <span>EEE</span>
            </div>
            <h3>
              Every pull request gets
              <br />
              <em>its own environment.</em>
            </h3>
            <p>
              A fully local preview-environment platform that models PR
              discovery, isolated infrastructure, GitOps deployment, governance
              checks, and stale-environment cleanup.
            </p>
            <div className="project-links">
              <a
                href="https://github.com/simxr/Ephemeral-Environment-Engine"
                target="_blank"
                rel="noreferrer"
              >
                Source <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="project-foot">
          <span>PR-isolated namespaces</span>
          <span>Least-privilege mock IAM</span>
          <span>Dry-run cleanup + policy gates</span>
        </div>
      </section>

      <section className="current-work" id="current-work" data-reveal>
        <div className="section-kicker dark">
          <span>03</span> Current work
        </div>
        <div className="current-work-head">
          <h2>
            Engineering leverage
            <br />
            for <em>critical systems.</em>
          </h2>
          <div className="role-summary">
            <span>Jan 2025 — Present</span>
            <h3>Cloud Automation Engineer</h3>
            <small>Core Architecture Team</small>
            <p>
              I design reusable cloud platforms behind mission-critical
              financial systems—turning security, reliability, and operational
              standards into automation teams can trust.
            </p>
          </div>
        </div>
        <div className="work-pillars">
          {currentWork.map(({ icon: Icon, label, detail }, index) => (
            <article key={label}>
              <div className="pillar-index">0{index + 1}</div>
              <Icon aria-hidden="true" />
              <h3>{label}</h3>
              <p>{detail}</p>
              <CheckCircle2 className="pillar-check" aria-hidden="true" />
            </article>
          ))}
        </div>
        <div className="scope-strip">
          <div>
            <Cpu />
            <span>Scope</span>
            <strong>AWS · EKS · Financial systems</strong>
          </div>
          <div>
            <Sparkles />
            <span>Approach</span>
            <strong>Well-Architected · SRE · GitOps</strong>
          </div>
          <p>
            Secure, observable platform patterns built for repeatable operations
            at production scale.
          </p>
        </div>
        <div className="earlier-role">
          <div>
            <span>Earlier experience</span>
            <strong>Nov — Dec 2023</strong>
          </div>
          <div>
            <h3>Python Developer Intern</h3>
            <p>VVDN Technologies</p>
          </div>
          <p>
            Engineered automation for network-controller workflows and improved
            AWS Lambda and MongoDB-backed internal tooling.
          </p>
        </div>
      </section>

      <section className="credentials" data-reveal>
        <div className="credential-title">
          <span>04 · Credentials</span>
          <h2>
            Proof in the
            <br />
            <em>details.</em>
          </h2>
        </div>
        <div className="credential-list">
          <article>
            <Award />
            <div>
              <small>CERTIFICATION</small>
              <strong>Azure Administrator Associate</strong>
              <span>Microsoft Certified</span>
            </div>
          </article>
          <article>
            <Cloud />
            <div>
              <small>CERTIFICATION</small>
              <strong>AWS Cloud Practitioner</strong>
              <span>AWS Certified</span>
            </div>
          </article>
          <article>
            <GraduationCap />
            <div>
              <small>EDUCATION</small>
              <strong>Branch Rank 2 · CGPA 9.67</strong>
              <span>B.Tech CSE, Information Security · VIT</span>
            </div>
          </article>
          <article>
            <Database />
            <div>
              <small>PUBLICATION</small>
              <strong>Breast Cancer Detection Using ML</strong>
              <span>Published in IJFMR</span>
            </div>
          </article>
        </div>
      </section>

      <footer className="contact" id="contact" data-reveal>
        <p className="section-kicker">
          <span>05</span> Start a conversation
        </p>
        <h2>
          Let&apos;s build
          <br />
          <em key={contactWords[wordIndex]}>{contactWords[wordIndex]}</em>
          <br />
          together.
        </h2>
        <div className="contact-side">
          <a href="mailto:simarahuja@outlook.com">
            <Mail size={19} />
            simarahuja@outlook.com
          </a>
          <p>
            Open to cloud automation, platform engineering, and SRE
            opportunities.
          </p>
          <div className="footer-links">
            <a href="https://github.com/simxr" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/simarahuja/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="giant-name">AHUJA</div>
      </footer>
    </main>
  );
}
