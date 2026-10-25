'use client';

export const dynamic = 'force-static';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Download,
  ExternalLink,
  Gauge,
  GitBranch,
  Mail,
  Menu,
  Network,
  Terminal,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SignatureIntro } from '../components/signature-intro';

const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/Simar-Ahuja-Resume.pdf`;

function ResumeLink({ className = '' }: { className?: string }) {
  return (
    <a className={`resume-link ${className}`.trim()} href={resumePath} download>
      Resume
      <Download size={16} />
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
      'I standardize Terraform modules and Terragrunt pipelines across seven EKS clusters and AWS accounts, reducing configuration drift and bootstrap work for application teams.',
    tags: ['Terraform', 'Terragrunt', 'Amazon EKS'],
  },
  {
    icon: Network,
    label: 'Platform Engineering',
    headline: 'Production platforms, end to end.',
    detail:
      'I automate Helm and Argo CD delivery for banking and markets microservices, with identity, monitoring, backup, storage, and CI/CD built into the platform.',
    tags: ['Helm', 'Argo CD', 'Keycloak', 'Docker'],
  },
  {
    icon: Gauge,
    label: 'Platform Operations',
    headline: 'Reliable, efficient clusters.',
    detail:
      'I build Grafana dashboards on Prometheus metrics to identify CPU and memory slack for workload right-sizing and node planning.',
    tags: ['Prometheus', 'Grafana', 'OpenCost'],
  },
  {
    icon: GitBranch,
    label: 'Infrastructure as Code',
    headline: 'Secure foundations, made reusable.',
    detail:
      'I package monitoring, backup, storage, and CI/CD through Terraform and Azure DevOps for 12 engineering teams.',
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
          href="mailto:simahu.work@gmail.com"
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
          <a href="#contact" onClick={closeMenu}>
            Let&apos;s talk
          </a>
        </nav>
        <div className="menu-reachout">
          <span>Reach out</span>
          <a href="mailto:simahu.work@gmail.com">simahu.work@gmail.com</a>
        </div>
      </dialog>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-status">
            <span /> Building at ION Group
          </div>
          <p className="eyebrow">Cloud Platform Engineer</p>
          <h1>
            <span className="hero-first">Simar</span>
            <span className="hero-last">Ahuja</span>
          </h1>
          <p className="hero-intro">
            I engineer secure cloud foundations that make shipping safer, faster, and repeatable.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#work">
              Explore my work <ArrowDown size={16} />
            </a>
            <ResumeLink className="hero-resume-link" />
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
              Platform operations <i>✦</i> Infrastructure as code <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <section className="statement" id="statement" data-reveal>
        <p>
          <em>secure</em> AWS and Kubernetes
        </p>
        <p>platforms for microservices.</p>
        <span className="statement-detail">
          Cloud platforms for banking and trading workloads across seven production clusters.
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
          <div className="career-timeline" aria-label="Career timeline">
            <article>
              <span>Jan 2025 — Present</span>
              <strong>Cloud Platform Engineer</strong>
              <small>ION Group · Core Architecture Team</small>
            </article>
            <article>
              <span>2021 — 2025</span>
              <strong>B.Tech CSE, Information Security</strong>
              <small>VIT · Branch Rank 2 · CGPA 9.67</small>
            </article>
            <article>
              <span>Certification</span>
              <a
                className="credential-link"
                href="https://www.credly.com/badges/e8c982dc-88f2-43ee-8bf6-e8e307488314"
                target="_blank"
                rel="noreferrer"
              >
                <strong>AWS Cloud Practitioner <ArrowUpRight size={14} /></strong>
                <small>View verified credential</small>
              </a>
            </article>
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
            <strong>99.95%</strong>
            <span>Availability SLO maintained</span>
          </article>
          <article>
            <strong>12-13%</strong>
            <span>EKS cluster cost reduction</span>
          </article>
          <article>
            <strong>~$1K</strong>
            <span>Monthly savings per cluster</span>
          </article>
          <article>
            <strong>80%</strong>
            <span>Bootstrap: 2 days to under 10 hours</span>
          </article>
        </div>
        <div className="experience-note">
          <span>BUILT FOR TEAMS</span>
          <p>
            Terraform, Azure DevOps, and platform modules support{' '}
            <strong>12 engineering teams</strong> across banking and markets workloads.
          </p>
        </div>
      </section>

      <section className="projects" id="work" data-reveal>
        <div className="projects-heading">
          <div>
            <span>02 · Selected work</span>
            <h2>Projects that ship.</h2>
          </div>
          <p>Swipe through two focused builds.</p>
        </div>
        <div className="project-rail" aria-label="Selected projects">
          <article className="project-card project-card-eee">
            <div className="project-card-topline"><span>01 / Developer platform</span><span>Kubernetes · GitOps</span></div>
            <div className="project-card-copy">
              <div className="project-mark"><Terminal size={22} /><span>EEE</span></div>
              <h3>Preview environments, <em>on demand.</em></h3>
              <p>Pull-request previews with isolated namespaces, mock AWS dependencies, and policy checks.</p>
            </div>
            <div className="project-card-visual eee-card-visual" aria-label="Preview environment workflow">
              <small>PR #42 OPENED</small>
              <div className="mini-pipeline"><span>Discover</span><ArrowRight size={14}/><span>Provision</span><ArrowRight size={14}/><span>Deploy</span></div>
              <strong>env-pr-42 <b>READY</b></strong>
            </div>
            <div className="project-links">
              <a href="https://github.com/simxr/Ephemeral-Environment-Engine" target="_blank" rel="noreferrer">Source <ArrowUpRight size={15}/></a>
            </div>
          </article>

          <article className="project-card project-card-upstream">
            <div className="project-card-topline"><span>02 / Open source</span><span>GitHub API · YAML</span></div>
            <div className="project-card-copy">
              <div className="project-mark"><GitBranch size={22} /><span>Upstream</span></div>
              <h3>Discover a fitting <em>issue.</em></h3>
              <p>Ranks cloud-native contribution opportunities from approved CNCF and AWS repositories.</p>
            </div>
            <div className="project-card-visual upstream-card-visual" aria-label="Upstream match example">
              <small>MATCHED OPPORTUNITY</small>
              <strong>Improve Helm release validation</strong>
              <div><span>Kubernetes</span><span>Helm</span><span>8.0 match</span></div>
            </div>
            <div className="project-links">
              <a href="https://simxr.github.io/Upstream/" target="_blank" rel="noreferrer">Live product <ExternalLink size={15} /></a>
              <a href="https://github.com/simxr/Upstream" target="_blank" rel="noreferrer">Source <ArrowUpRight size={15} /></a>
            </div>
          </article>
        </div>
      </section>

      <footer className="contact" id="contact" data-reveal>
        <p className="section-kicker">
          <span>03</span> Start a conversation
        </p>
        <h2>
          Let&apos;s build <em key={contactWords[wordIndex]}>{contactWords[wordIndex]}</em>{" "}
          together.
        </h2>
        <div className="contact-side">
          <a href="mailto:simahu.work@gmail.com">
            <Mail size={19} />
            simahu.work@gmail.com
          </a>
          <p>
            Open to cloud platform, platform engineering, and cloud operations opportunities.
          </p>
          <div className="footer-links">
            <a className="profile-link" href="https://github.com/simxr" target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={14} />
            </a>
            <a
              className="profile-link"
              href="https://www.linkedin.com/in/simarahuja/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={14} />
            </a>
            <ResumeLink />
          </div>
        </div>
        <div className="footer-meta">
          <span>Built with intent.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
