'use client';

export const dynamic = 'force-static';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Database,
  Download,
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
  Terminal,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SignatureIntro } from '../components/signature-intro';

const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.txt`;

function ResumeLink() {
  return (
    <a className="resume-link" href={resumePath} download>
      Resume <Download size={16} />
    </a>
  );
}

const contactWords = ['systems', 'reliability', 'impact'];
const workAreas = [
  {
    icon: Cloud,
    label: 'Cloud Automation',
    headline: 'Automation for critical systems.',
    detail:
      'I own infrastructure automation for microservices across financial markets and core banking on EKS—turning complex operational requirements into dependable platform capabilities.',
    tags: ['AWS', 'EKS', 'Core Cloud Architecture'],
  },
  {
    icon: Network,
    label: 'Platform Engineering',
    headline: 'Production platforms, end to end.',
    detail:
      'I bootstrap production EKS clusters through Terraform, Helm, Argo CD, and Azure DevOps, then standardize Keycloak identity, kube-prometheus-stack observability, storage and backup, security, and CI/CD.',
    tags: ['Helm', 'Argo CD', 'Keycloak', 'Docker'],
  },
  {
    icon: Gauge,
    label: 'SRE',
    headline: 'Reliability you can measure.',
    detail:
      'I apply SRE and AWS Well-Architected principles alongside Prometheus and Grafana utilization analysis to keep mission-critical workloads reliable and efficient.',
    tags: ['kube-prometheus-stack', 'Right-sizing', 'Karpenter'],
  },
  {
    icon: GitBranch,
    label: 'Infrastructure as Code',
    headline: 'Secure foundations, made reusable.',
    detail:
      'I architect Terraform and Terragrunt modules with Cloud Posse patterns so AWS and EKS provisioning is secure, repeatable, and easier for engineering teams to adopt.',
    tags: ['Terraform', 'Terragrunt', 'Cloud Posse'],
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
        <span>ENGINEER / BUILDER / PROBLEM SOLVER</span>
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
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setWordIndex((current) => (current + 1) % contactWords.length);
    }, 2300);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const menu = menuRef.current;
    const trigger = menuTriggerRef.current;
    if (menuOpen && !menu?.open) menu?.showModal();
    if (!menuOpen && menu?.open) menu.close();
    if (menuOpen) menu?.querySelector<HTMLButtonElement>('button')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab' && menuOpen && menu) {
        const items = menu.querySelectorAll<HTMLElement>('a[href], button');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      if (menuOpen) trigger?.focus();
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
      if (
        event.pointerType === 'touch' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return;
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
  const activeArea = workAreas[activeRole];
  const ActiveAreaIcon = activeArea.icon;

  return (
    <main
      ref={siteRef}
      className="site is-ready"
    >
      <SignatureIntro />
      <a href="#statement" className="skip-link">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-nav">
        <button
          className="nav-action"
          ref={menuTriggerRef}
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

      <dialog
        id="site-menu"
        ref={menuRef}
        onCancel={closeMenu}
        aria-modal={menuOpen || undefined}
        aria-label="Navigation"
        inert={!menuOpen}
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
          <a href="#focus" onClick={closeMenu}>
            What I work across
          </a>
          <a href="#work" onClick={closeMenu}>
            Projects
          </a>
          <a href="#credentials" onClick={closeMenu}>
            Credentials
          </a>
          <a href="#contact" onClick={closeMenu}>
            Let&apos;s talk
          </a>
        </nav>
        <div className="menu-reachout">
          <span>Reach out</span>
          <a href="mailto:simarahuja@outlook.com">simarahuja@outlook.com</a>
        </div>
      </dialog>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-status">
            <span /> Building at ION Group
          </div>
          <p className="eyebrow">Cloud Automation Engineer · Gurgaon, India</p>
          <h1>
            <span className="hero-first">Simar</span>
            <span className="hero-last">Ahuja</span>
          </h1>
          <p className="hero-intro">
            I engineer secure cloud foundations that let teams ship with confidence.
            <span className="hero-intro-detail">
              Secure cloud platforms. Reliable systems. Infrastructure as Code.
            </span>
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#work">
              Explore my work <ArrowDown size={16} />
            </a>
          </div>
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
        <span className="statement-detail">
          I build the foundations that help engineering teams move faster.
          <br />
          And keep the critical systems behind them running.
        </span>
      </section>

      <section
        className="roles-section"
        id="focus"
        aria-labelledby="focus-title"
        data-reveal
      >
        <div className="roles-orbit" aria-hidden="true">
          <span>{String(activeRole + 1).padStart(2, '0')}</span>
        </div>
        <div className="roles-context">
          <p className="roles-label" id="focus-title">
            <span>01</span> What I work across
          </p>
          <div>
            <span>Jan 2025 — Present</span>
            <strong>Cloud Automation Engineer</strong>
            <small>ION Group · Core Architecture Team</small>
          </div>
        </div>
        <div className="role-list">
          {workAreas.map((area, index) => (
            <button
              key={area.label}
              type="button"
              className={index === activeRole ? 'active' : ''}
              onPointerEnter={() => setActiveRole(index)}
              onFocus={() => setActiveRole(index)}
              onClick={() => setActiveRole(index)}
              aria-pressed={index === activeRole}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              {area.label}
            </button>
          ))}
        </div>
        <div className="roles-detail" key={activeArea.label} aria-live="polite">
          <div className="roles-detail-copy">
            <ActiveAreaIcon aria-hidden="true" />
            <div>
              <span>{activeArea.label}</span>
              <h2>{activeArea.headline}</h2>
              <p>{activeArea.detail}</p>
            </div>
          </div>
          <div className="roles-tags" aria-label={`${activeArea.label} tools`}>
            {activeArea.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div
          className="roles-metrics"
          aria-label="Verified production outcomes"
        >
          <article>
            <strong>99.96%</strong>
            <span>Production SLA sustained</span>
          </article>
          <article>
            <strong>12-13%</strong>
            <span>EKS cluster cost reduction</span>
          </article>
          <article>
            <strong>&gt;$1,000</strong>
            <span>Monthly savings per cluster</span>
          </article>
          <article>
            <strong>&lt;1 hour</strong>
            <span>Environment setup, down from days</span>
          </article>
        </div>
        <div className="experience-note">
          <span>BUILT FOR TEAMS</span>
          <p>
            Reusable AWS and EKS foundations adopted across{' '}
            <strong>15 teams</strong>, from development to production. Secure
            defaults, repeatable delivery, and infrastructure engineers can own.
          </p>
        </div>
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
              Less searching. More contributing. A config-driven discovery tool
              that matches cloud-native engineers with relevant open-source
              issues. Ranks curated opportunities by domain, skill signals, and
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
              <b>UPSTREAM / EXAMPLE MATCH</b>
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
              Production-minded guardrails, without a cloud bill. A fully local
              preview-environment platform that models PR discovery, isolated
              infrastructure, GitOps deployment, governance checks, and
              stale-environment cleanup.
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

      <section className="credentials" id="credentials" data-reveal>
        <div className="credential-title">
          <span>03 · Credentials</span>
          <h2>
            Proof in the
            <br />
            <em>details.</em>
          </h2>
        </div>
        <div className="credential-list">
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
          <span>04</span> Start a conversation
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
          <ResumeLink />
        </div>
        <div className="footer-meta">
          <span>Gurgaon, India · Built with intent.</span>
          <a href="#home">Back to top ↑</a>
        </div>
        <div className="giant-name" aria-hidden="true">
          AHUJA
        </div>
      </footer>
    </main>
  );
}
