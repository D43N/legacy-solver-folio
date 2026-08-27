import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/lib/reveal";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  Linkedin,
  Github,
  Send,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Damien Lim — Software Developer (PHP / CodeIgniter)" },
      {
        name: "description",
        content:
          "I solve real, messy legacy-system problems. PHP & CodeIgniter specialist working on enterprise HR platforms, sales ERPs, and compliance-critical integrations.",
      },
      { property: "og:title", content: "Damien Lim — Software Developer" },
      {
        property: "og:description",
        content:
          "PHP / CodeIgniter specialist. Legacy migrations, statutory integrations, and enterprise systems that have to keep working while you rebuild them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

/* ---------------------------------- data ---------------------------------- */

const CASE_STUDIES = [
  {
    id: "ims",
    index: "01",
    title: "IMS System Enhancements",
    subtitle: "Ongoing feature development on a live internal IMS",
    tags: ["PHP", "CodeIgniter", "MySQL", "Client-facing"],
    problem:
      "The business runs on an internal IMS that never stops evolving. Requests arrive constantly from real users — new workflows, reporting tweaks, edge cases nobody anticipated when the feature was first specced. The system can't pause for a rewrite; it has to absorb change while people are actively using it.",
    did: "I manage the system end-to-end: triaging incoming requests, implementing features directly against the live codebase, and shipping enhancements in tight feedback loops with the people who asked for them. That means reading code written years ago, understanding why it behaves the way it does, and extending it without breaking the dozen things quietly depending on it.",
    outcome:
      "Requests turn around in days, not quarters. Clients get changes that fit how they actually work — because the person building the feature is the same person who heard the request, and who'll answer for it if it breaks.",
  },
  {
    id: "iras",
    index: "02",
    title: "IRAS APEX API Integration",
    subtitle: "Migrating statutory reporting to Singapore's new government API",
    tags: ["Government API", "Compliance-critical", "PHP", "Integration"],
    problem:
      "The HR system's statutory reporting ran on a legacy IRAS API that was being retired. The replacement — IRAS's APEX API — came with a new authentication model, new payload formats, and hard submission deadlines. Statutory reporting has zero room for error: a malformed submission isn't a bug report, it's a compliance failure for the client.",
    did: "I mapped the old integration's behaviour field by field before writing anything new, then rebuilt the reporting pipeline against APEX — authentication, payload construction, error handling, and reconciliation. Every statutory scenario was validated against IRAS's test environment before it touched production data.",
    outcome:
      "A clean cutover with zero failed statutory submissions. The kind of project where success is invisible — filings go out on time, and nobody outside the integration layer ever knows it changed.",
  },
  {
    id: "ci4",
    index: "03",
    title: "CI1 → CI4 Migration",
    subtitle: "Rebuilding a legacy HR platform's foundation — in flight",
    inProgress: true,
    tags: ["CodeIgniter 1", "CodeIgniter 4", "Doctrine ORM", "Migration"],
    problem:
      "A CodeIgniter 1 HR platform — Leaves, Payroll, CPF, Attendance — carrying years of accumulated business logic. These aren't CRUD screens; CPF calculations and payroll runs are statutory, high-risk, and load-bearing. The framework underneath them is long past end-of-life, but the logic itself is the source of truth for how the business pays people.",
    did: "I'm leading the migration with one rule above all: the legacy system defines correct behaviour. Business logic is treated as specification, ported deliberately rather than rewritten from assumptions. For the statutory modules, I run old and new in parallel and diff the outputs — a payroll run that doesn't match the legacy system to the cent doesn't ship. All while the live system keeps serving users.",
    outcome:
      "Modules are coming across verified, not just compiled. The end state is a modern, maintainable CI4 codebase that behaves exactly like the system people trust — because it was proven against it, module by module.",
  },
];

const SKILLS = [
  {
    category: "Backend",
    items: ["PHP", "CodeIgniter 1 & 4", "Doctrine ORM", "REST API design"],
  },
  {
    category: "Database",
    items: ["MySQL", "MariaDB", "Schema design", "Query optimisation"],
  },
  {
    category: "Frontend & Tooling",
    items: ["JavaScript", "jQuery", "Bootstrap", "Git", "Composer"],
  },
  {
    category: "Integrations",
    items: ["IRAS APEX API", "Third-party REST APIs", "ERP / HRIS data flows", "Legacy system interop"],
  },
];

const EMAIL = "hello@damienlim.dev";

/* -------------------------------- components ------------------------------- */

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}

function CaseStudyCard({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal>
      <article className="overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_oklch(0.48_0.075_195/0.15)]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start gap-4 p-6 text-left sm:items-center sm:gap-6 sm:p-8"
        >
          <span className="hidden font-mono text-sm text-muted-foreground sm:block">
            {study.index}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {study.title}
              </h3>
              {study.inProgress && (
                <span className="rounded-full border border-primary/30 bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  In progress
                </span>
              )}
            </span>
            <p className="mt-1 text-sm text-muted-foreground">{study.subtitle}</p>
          </span>
          <ChevronDown
            className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 sm:mt-0 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-6 border-t border-border px-6 py-6 sm:px-8 sm:py-8">
              {(
                [
                  ["The problem", study.problem],
                  ["What I did", study.did],
                  ["The outcome", study.outcome],
                ] as const
              ).map(([label, text]) => (
                <div key={label} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
                    {label}
                  </p>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{text}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${data.get("email")})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const fieldClass =
    "w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={fieldClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className={fieldClass}
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="What are you working on? A legacy system misbehaving? A role you're hiring for?"
        className={`${fieldClass} resize-y`}
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_oklch(0.48_0.075_195/0.5)]"
      >
        <Send className="h-4 w-4" />
        {sent ? "Opening your mail client…" : "Send message"}
      </button>
    </form>
  );
}

/* ---------------------------------- page ----------------------------------- */

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm font-medium text-foreground">
            damien<span className="text-primary">.</span>lim
          </a>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#work" className="transition-colors hover:text-foreground">
              Work
            </a>
            <a href="#behind" className="hidden transition-colors hover:text-foreground sm:block">
              Behind the code
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <section className="pb-24 pt-20 sm:pb-32 sm:pt-28">
          <Reveal>
            <p className="font-mono text-sm text-primary">Software Developer</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Damien Lim
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground">
              I specialise in the unglamorous end of software: legacy enterprise systems that
              people actually depend on. The ones with a decade of business logic baked in, where
              "just rewrite it" isn't a plan — it's how you break payroll.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              I work primarily in PHP — CodeIgniter 1 &amp; 4, Doctrine ORM, MySQL/MariaDB —
              building and maintaining enterprise systems like HR platforms, sales ERPs, and the
              integrations between them. I solve real, messy problems: migrations that can't
              afford downtime, statutory APIs that can't afford mistakes, and features the
              business needed yesterday.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_oklch(0.48_0.075_195/0.5)]"
              >
                See my work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </section>

        {/* Case studies */}
        <section id="work" className="scroll-mt-24 pb-24 sm:pb-32">
          <SectionHeading kicker="Selected work" title="Case studies" />
          <div className="mt-10 space-y-4">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </section>

        {/* Behind the code */}
        <section id="behind" className="scroll-mt-24 pb-24 sm:pb-32">
          <SectionHeading kicker="Behind the code" title="How I actually debug" />
          <Reveal>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-secondary-foreground">
              <p>
                There's a version of debugging that looks good in talks: you form a hypothesis,
                design an elegant experiment, and the bug confesses. My reality is less cinematic.
                It's me, a legacy codebase with no tests, and a query log, tracing a symptom
                backwards through layers of code written by people who left years ago — until the
                thing that was supposed to be impossible is suddenly, obviously, the only thing it
                could have been.
              </p>
              <p>
                My favourite example: notifications in one of our HR modules had quietly stopped
                firing for exactly one employee. Everyone else was fine. I spent the better part of
                a day walking the notification pipeline — cron, queue, mailer — all healthy. The
                answer, when I finally cornered it, was an orphaned row in a mapping table: a
                record pointing at a department that no longer existed, left behind by a delete
                years earlier. One join was silently filtering that employee out of every
                notification query. Deleted the row, notifications came back. One row. Most of a
                day. That's the job, honestly — and I'd be lying if I said the moment the query
                finally returned the row isn't one of the best feelings in this line of work.
              </p>
              <p>
                Another time, a payroll figure was off by a few cents for a handful of employees —
                only in months with unpaid leave, only when the leave crossed a weekend. The
                rounding logic was fine. The proration logic was fine. The bug was in how the two
                interacted, in a helper written in 2014, that nobody had touched because it had
                never been wrong before. Fixing it took one line. Proving the one line was right
                took a spreadsheet and the better part of a week.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
                <Terminal className="h-4 w-4" />
                Currently exploring
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                On the side, I'm building a small tool that parses old CodeIgniter route files and
                maps them against controller methods — born directly out of the CI1→CI4 migration,
                because grep only gets you so far.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 pb-24 sm:pb-32">
          <SectionHeading kicker="Capabilities" title="Skills & tech stack" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SKILLS.map((group, i) => (
              <Reveal key={group.category} delay={i * 80}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/30">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
                    {group.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-secondary-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 pb-24 sm:pb-32">
          <SectionHeading kicker="Contact" title="Let's talk" />
          <Reveal>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Hiring for a role, need help with a system that's showing its age, or just want to
              compare notes on legacy PHP? My inbox is open.
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
                <a
                  href="https://www.linkedin.com/in/damien-lim"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Damien Lim</span>
          <span className="font-mono">Built with intent, not a template.</span>
        </div>
      </footer>
    </div>
  );
}
