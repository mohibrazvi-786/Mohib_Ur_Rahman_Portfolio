// BuildOS case-study content.
// Every claim below is grounded in the BuildOS repository documentation,
// schema, tests and deployment records. Discovery facts (interviews, pilot
// interest, pilot region) are supplied project history, not deployment proof.

export type StatusTone = 'live' | 'progress' | 'planned' | 'partial'

export interface Chapter {
  id: string
  num: string
  title: string
  kicker: string
}

export interface ArchitectureNode {
  id: string
  label: string
  sub: string
  status: StatusTone
  statusLabel: string
  problem: string
  decision: string
  tradeoff: string
}

export interface ArchitectureLayer {
  id: string
  label: string
  note: string
  nodes: ArchitectureNode[]
}

export interface Challenge {
  id: string
  category: string
  title: string
  what: string
  why: string
  investigation: string
  decision: string
  change: string
  validation: string
}

export interface SecurityControl {
  name: string
  state: 'verified' | 'partial' | 'planned'
  note: string
}

export interface SecurityDomain {
  id: string
  title: string
  summary: string
  controls: SecurityControl[]
}

export const buildos = {
  meta: {
    name: 'BuildOS',
    wordmark: 'BUILDOS',
    category: 'Construction Technology · B2B SaaS · DeepTech',
    tagline: 'Construction Execution & Financial Operating System',
    headline: 'Engineering the operating system for construction.',
    subhead:
      'From fragmented site workflows to a connected execution and financial platform — one project-scoped system for site activity, materials, procurement, labour, documents and money.',
    owner: 'Shaikh Mohibur Rahman',
    role: 'Founder · Product & Engineering Lead',
    period: '2025 — present',
    status: 'MVP built and deployed · pilot build · field validation next',
    statusNote:
      'Deployed does not mean production-proven. No user-count, revenue or completed-pilot claims are made here.',
    platform: 'Android · Web (admin) · PostgreSQL · REST',
    links: {
      website: '#',
      email: 'shaikhmohibsm@gmail.com',
    },
    logo: 'assets/buildos/buildos-icon-512.png',
    stack: [
      'Flutter',
      'Python',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Multi-platform hosting',
    ],
  },

  summary: [
    {
      label: 'Architecture',
      value: 'Multi-platform',
      note: 'Flutter client, FastAPI backend, Next.js admin, static web surfaces.',
    },
    {
      label: 'Discovery',
      value: '8 contractor interviews',
      note: 'Workflow observation before feature definition.',
    },
    {
      label: 'Access model',
      value: 'Role-based access control',
      note: 'Server-side authorization across project roles.',
    },
    {
      label: 'Data layer',
      value: 'PostgreSQL + 48 migrations',
      note: 'Relational integrity and versioned schema evolution.',
    },
    {
      label: 'Delivery',
      value: '3 deployed surfaces',
      note: 'Independent hosting per surface.',
    },
    {
      label: 'Security posture',
      value: 'Security-conscious by design',
      note: 'Least privilege, scoped storage, audited mutations.',
    },
  ],

  chapters: [
    { id: 'problem', num: '01', title: 'The problem', kicker: 'A workflow breakdown, not a feature request' },
    { id: 'discovery', num: '02', title: 'Discovery', kicker: 'Entering the operating environment' },
    { id: 'product', num: '03', title: 'Product & MVP', kicker: 'From observation to a bounded system' },
    { id: 'architecture', num: '04', title: 'Architecture', kicker: 'Boundaries, contracts and data flow' },
    { id: 'ecosystem', num: '05', title: 'Ecosystem', kicker: 'One platform, distinct surfaces' },
    { id: 'challenges', num: '06', title: 'Challenges', kicker: 'Incidents, decisions and evidence' },
    { id: 'security', num: '07', title: 'Security by design', kicker: 'Trust boundaries, made explicit' },
    { id: 'discipline', num: '08', title: 'Discipline', kicker: 'Version control as engineering memory' },
    { id: 'deployment', num: '09', title: 'Deployment', kicker: 'Shipped, tested, still being proven' },
    { id: 'fde', num: '10', title: 'Forward deployed', kicker: 'Engineering from inside the problem' },
    { id: 'outcomes', num: '11', title: 'Outcomes', kicker: 'What exists today, stated precisely' },
    { id: 'roadmap', num: '12', title: 'What comes next', kicker: 'The next engineering bets' },
  ] satisfies Chapter[],

  problem: {
    title: 'Construction runs on coordination that was never designed.',
    body: 'A site can be physically on schedule while its operational record is already fragmented. Progress lives in a WhatsApp thread, a material receipt in a cab, a purchase decision in a phone call and an expense in someone\u2019s notebook. The system of record is memory.',
    flows: [
      { system: 'WhatsApp groups', holds: 'Daily progress, photos, approvals, disputes', failure: 'Unsearchable, unscoped, no permission boundary' },
      { system: 'Phone calls', holds: 'Procurement decisions, supplier commitments', failure: 'No durable record or audit trail' },
      { system: 'Paper registers', holds: 'Labour attendance, material movement', failure: 'Re-keyed later, easy to lose, hard to reconcile' },
      { system: 'Spreadsheets', holds: 'Budgets, expenses, running totals', failure: 'Detached from the site event that created the cost' },
      { system: 'Loose receipts', holds: 'Cash purchases, transport, damage', failure: 'Evidence exists, but not as data' },
    ],
    consequences: [
      'The project picture is reconstructed after the fact, not observed as it happens.',
      'The same fact is recorded three times, in three formats, by three people.',
      'Financial decisions depend on memory and trust rather than traceable evidence.',
      'Handovers lose context; new team members inherit a folder of screenshots.',
      'Nobody can answer \u201cwhat actually happened on this project?\u201d with confidence.',
    ],
    insight:
      'The first gap was not a missing dashboard. It was the absence of a shared, project-scoped record that every role could trust.',
  },

  discovery: {
    title: 'The workflow was observed before it was designed for.',
    body: 'The product started with structured contractor conversations and site workflow observation, not with a feature list. Eight contractor interviews shaped the first model; at least one contractor expressed interest in a pilot. The initial field direction was Nagpur and Chhatrapati Sambhaji Nagar.',
    caveat:
      'These are historical discovery facts. They are not evidence of a completed commercial deployment.',
    evidence: [
      { value: '08', label: 'Contractor interviews', note: 'Workflow, pain and adoption constraints.' },
      { value: '01+', label: 'Pilot interest', note: 'At least one contractor open to a field pilot.' },
      { value: '02', label: 'Pilot geographies', note: 'Nagpur and Chhatrapati Sambhaji Nagar.' },
    ],
    observations: [
      {
        title: 'The phone is already the site computer',
        body: 'Work happens on Android devices, often with intermittent connectivity. Any workflow that assumes a desktop or a stable connection fails adoption.',
      },
      {
        title: 'Typing is a tax, not a feature',
        body: 'Supervisors will not write paragraphs between tasks. Selection, defaults, photo evidence and quick actions beat free-text forms.',
      },
      {
        title: 'Existing habits are the competitor',
        body: 'A notebook and a WhatsApp group are fast and familiar. A new tool must be faster than the habit it replaces, not merely more correct.',
      },
      {
        title: 'Every role sees a different project',
        body: 'A contractor, architect, site supervisor and supplier need different actions and different financial visibility. A single shared screen is a permission bug and a usability bug.',
      },
      {
        title: 'Evidence creates trust',
        body: 'A number without a photo, timestamp or source is negotiable. Material receipts and site updates needed evidence attached to the event.',
      },
      {
        title: 'The field cannot absorb a training program',
        body: 'Onboarding had to be legible in minutes: a project workspace, obvious quick actions and forms that fit the physical task.',
      },
    ],
    principles: [
      'Project-scoped by default',
      'Low-typing interactions',
      'Evidence attached to events',
      'Role-aware visibility',
      'Designed for unreliable networks',
      'One source of truth per fact',
    ],
  },

  product: {
    title: 'A bounded MVP for the operational core.',
    body: 'The first release focused on the loop that creates both progress and cost: what happened on site, what material arrived, what was ordered, what was paid, who was allowed to do it, and what evidence exists.',
    evolution: [
      {
        stage: 'Observed',
        detail: 'Eight contractor conversations and site walkthroughs exposed the real workflow.',
      },
      {
        stage: 'Modelled',
        detail: 'Project-scoped records, roles, evidence and financial traceability became the domain.',
      },
      {
        stage: 'Scoped',
        detail: 'The MVP was bounded to the execution-to-payment loop; everything else was deferred.',
      },
      {
        stage: 'Built',
        detail: 'Flutter, FastAPI, PostgreSQL, admin and public surfaces shipped as one contract.',
      },
    ],
    personas: [
      { role: 'Contractor / Owner', need: 'Project health, money, approvals, team control.' },
      { role: 'Architect', need: 'Design documents, site progress, review visibility.' },
      { role: 'Civil Engineer', need: 'Execution quality, updates, material and order context.' },
      { role: 'Site Supervisor', need: 'Fast daily entry: progress, labour, photos, receipts.' },
      { role: 'Supplier / Vendor', need: 'Purchase orders, dispatch, commitments, payment status.' },
      { role: 'Labour', need: 'Attendance and wage records, with minimal friction.' },
    ],
    modules: [
      { name: 'Projects', detail: 'Project-scoped workspace, members, roles, joining codes.' },
      { name: 'Site diary', detail: 'Progress, weather, labour count, geotagged photo evidence.' },
      { name: 'Materials & inventory', detail: 'Deliveries, accepted vs damaged quantity, stock movements.' },
      { name: 'Orders & supplier flow', detail: 'Send, accept, request changes, dispatch, receive, complete.' },
      { name: 'Payables', detail: 'Invoice obligation, cumulative settlement, outstanding, overdue.' },
      { name: 'Expenses & payments', detail: 'Project costs with receipts and approval states.' },
      { name: 'Labour', detail: 'Worker roster, attendance, wage frequency, payments.' },
      { name: 'Documents', detail: 'Visibility modes, per-user grants, signed downloads.' },
      { name: 'Notifications', detail: 'In-app feed for orders, broadcasts and project events.' },
      { name: 'Administration', detail: 'Users, access, config, releases, content, audit, analytics.' },
    ],
    boundaries: [
      'Android-first MVP. iOS shares the Flutter codebase but was not the first distribution target.',
      'In-app notifications only. No push, SMS or email notification pipeline is claimed.',
      'Supplier linking is email-match based; it is an onboarding constraint, not an identity provider.',
      'The billing surface is in progress and not yet production-proven.',
      'Production APK signing and store distribution are not complete; the pilot build is a QA artifact.',
    ],
    ia: {
      title: 'One workspace, three levels',
      levels: [
        'Account — identity, consent, designation, devices.',
        'Project — the boundary for data, permission and money.',
        'Task — a quick action or module entry that creates a traceable record.',
      ],
    },
  },

  architecture: {
    intro:
      'The system separates experience, API, domain logic, data and delivery. The backend is the only place where trust is decided; every client is replaceable.',
    layers: [
      {
        id: 'clients',
        label: 'Experience',
        note: 'Independent clients, one contract',
        nodes: [
          {
            id: 'mobile',
            label: 'Flutter Android app',
            sub: 'Field workspace',
            status: 'live',
            statusLabel: 'Working MVP',
            problem: 'Site teams needed fast, low-typing workflows on Android with camera, location and file access.',
            decision: 'One Flutter codebase with Riverpod state, GoRouter navigation and a feature-first module structure.',
            tradeoff: 'A single codebase and consistent UI, at the cost of a larger binary and platform-plugin maintenance. Android led the pilot.',
          },
          {
            id: 'admin',
            label: 'Next.js admin',
            sub: 'Control plane',
            status: 'live',
            statusLabel: 'Deployed · static',
            problem: 'Operations needed a separate surface for users, access, configuration and content without exposing those powers in the field app.',
            decision: 'React/TypeScript admin with Tailwind, statically exported.',
            tradeoff: 'Cheap, robust static hosting. No server runtime, so every privileged decision still runs on the API.',
          },
          {
            id: 'website',
            label: 'Public website',
            sub: 'Product surface',
            status: 'live',
            statusLabel: 'Deployed · static',
            problem: 'The product needed an independent public surface for discovery, release information and legal documents.',
            decision: 'A separate Vite/React static site, decoupled from the operational clients.',
            tradeoff: 'Independent deploys and failure isolation, with release metadata fetched from the API when available.',
          },
          {
            id: 'studio',
            label: 'Billing Studio',
            sub: 'Commercial workspace',
            status: 'progress',
            statusLabel: 'In progress',
            problem: 'Contract, BOQ, measurement and bill workflows need a dedicated commercial interface.',
            decision: 'A Next.js studio with a server-enforced billing state machine and server-computed totals.',
            tradeoff: 'Billing is being hardened before it is called operational. Production data is empty and deployment verification is pending.',
          },
        ],
      },
      {
        id: 'api',
        label: 'Interface & domain',
        note: 'The trust boundary',
        nodes: [
          {
            id: 'fastapi',
            label: 'FastAPI REST API',
            sub: 'Contract + orchestration',
            status: 'live',
            statusLabel: 'Deployed · managed hosting',
            problem: 'Multiple clients needed one typed contract instead of duplicated business rules.',
            decision: 'Async Python API with typed schemas and service boundaries.',
            tradeoff: 'Fast iteration and automatic OpenAPI documentation, with fewer batteries than a framework like Django.',
          },
          {
            id: 'auth',
            label: 'Auth & access control',
            sub: 'Identity + permission',
            status: 'live',
            statusLabel: 'Verified',
            problem: 'A project contains different roles with different financial and operational visibility.',
            decision: 'Server-side authentication with token management and permission service resolving role defaults plus per-member overrides.',
            tradeoff: 'Explicit permission checks on every route cost verbosity, but keep the server authoritative and testable.',
          },
          {
            id: 'idempotency',
            label: 'Idempotency & audit',
            sub: 'Financial safety',
            status: 'live',
            statusLabel: 'Verified',
            problem: 'Mobile retries after a lost response could duplicate stock, payments or delivery records.',
            decision: 'Idempotent financial creates prevent double-booking on retry; append-only settlement records.',
            tradeoff: 'Extra write-path complexity, in exchange for preventing double-booking that would be expensive to unwind.',
          },
          {
            id: 'flags',
            label: 'Remote config & flags',
            sub: 'Operational control',
            status: 'live',
            statusLabel: 'Deployed',
            problem: 'A pilot needs remote control of presentation and feature availability without shipping a new build.',
            decision: 'Validated remote-config revisions with server-enforced MVP feature flags and an audited kill switch.',
            tradeoff: 'Configuration is untrusted input and must be validated; flags only restrict, never grant access.',
          },
        ],
      },
      {
        id: 'data',
        label: 'Data',
        note: 'Relational truth',
        nodes: [
          {
            id: 'orm',
            label: 'SQLAlchemy 2 (async)',
            sub: 'Model + transaction',
            status: 'live',
            statusLabel: 'Verified',
            problem: 'Financial and project data needed explicit relationships and transactions.',
            decision: 'Async SQLAlchemy models with service-level transactions, SELECT FOR UPDATE where money and state can race.',
            tradeoff: 'Async sessions demand discipline (eager loading, no lazy access after commit), repaid in predictable queries.',
          },
          {
            id: 'postgres',
            label: 'PostgreSQL',
            sub: 'Primary database',
            status: 'live',
            statusLabel: 'Production',
            problem: 'The domain is inherently relational: projects, members, orders, deliveries, payments, permissions.',
            decision: 'Managed PostgreSQL with foreign keys, unique constraints and composite indexes.',
            tradeoff: 'A managed dependency and connection constraints, in exchange for operational leverage and relational integrity.',
          },
          {
            id: 'migrations',
            label: 'Schema migrations',
            sub: 'Schema evolution',
            status: 'live',
            statusLabel: '48 migrations',
            problem: 'The schema evolves with the product and must stay reproducible across environments.',
            decision: 'Versioned, single-head migrations with online dedupe where constraints require it and a CI chain check.',
            tradeoff: 'Migrations become deploy artifacts that must be applied and verified — a process cost that prevents silent drift.',
          },
          {
            id: 'storage',
            label: 'Object storage',
            sub: 'Evidence + documents',
            status: 'live',
            statusLabel: 'Signed access',
            problem: 'Photos, receipts and documents are evidence, and evidence cannot be public by default.',
            decision: 'Project-scoped storage with server-issued temporary URLs and permission-aware media serving.',
            tradeoff: 'Extra signing round-trips, but raw storage paths never become a permission bypass.',
          },
        ],
      },
      {
        id: 'delivery',
        label: 'Delivery',
        note: 'Deployment and change',
        nodes: [
          {
            id: 'delivery',
            label: 'API hosting',
            sub: 'API hosting',
            status: 'live',
            statusLabel: 'Deployed',
            problem: 'The API needed a managed runtime without maintaining servers.',
            decision: 'Managed hosting service runs the API; configuration holds secrets and CORS origins.',
            tradeoff: 'Free-tier cold starts and resource limits shaped expectations; availability is monitored, not assumed.',
          },
          {
            id: 'pages',
            label: 'Static hosting',
            sub: 'Admin + Studio hosting',
            status: 'live',
            statusLabel: 'Admin live · Studio pending',
            problem: 'Static clients should deploy independently of the backend.',
            decision: 'Static exports deployed to a static hosting platform, scoped per app.',
            tradeoff: 'No dynamic routes at the edge without client-side handling; security headers live at the serving layer.',
          },
          {
            id: 'ci',
            label: 'CI pipeline',
            sub: 'Change control',
            status: 'live',
            statusLabel: 'Active CI',
            problem: 'A solo product still needs repeatable checks before code reaches users.',
            decision: 'CI runs backend tests, Flutter analyze/tests, a migration-chain check and a secret scan on pushes and pull requests.',
            tradeoff: 'Some lint/type steps remain advisory because of legacy debt; the blocking gates are tests, migrations and secrets.',
          },
        ],
      },
    ] satisfies ArchitectureLayer[],
    stack: [
      { layer: 'Mobile', technology: 'Flutter · Dart', reason: 'One codebase for Android and iOS with native camera, location and file access.', tradeoff: 'Larger binary and plugin maintenance; Android shipped first.' },
      { layer: 'Backend', technology: 'Python · Async API framework', reason: 'Async service layer, typed API contracts and generated documentation.', tradeoff: 'More explicit plumbing than a full-stack framework.' },
      { layer: 'Data access', technology: 'Async ORM with migration tooling', reason: 'Relational modelling, transactions and versioned schema evolution.', tradeoff: 'Async-session discipline and migration process overhead.' },
      { layer: 'Database', technology: 'Relational database', reason: 'Relational integrity for project, procurement and financial data.', tradeoff: 'Managed-service constraints and vendor dependency.' },
      { layer: 'Auth', technology: 'Token-based auth with rotation', reason: 'Stateless API auth with rotation, revocation records and multi-device sessions.', tradeoff: 'Revocation needs state and careful client handling.' },
      { layer: 'Admin', technology: 'React · TypeScript · Tailwind', reason: 'A structured internal surface with reusable components and static deployment.', tradeoff: 'No server runtime; the API remains the security boundary.' },
      { layer: 'Billing', technology: 'React · API state machine', reason: 'Commercial workflows with server-computed totals and explicit transitions.', tradeoff: 'Still being validated; not claimed production-ready.' },
      { layer: 'Communication', technology: 'REST · JSON', reason: 'A stable contract for independent clients and straightforward debugging.', tradeoff: 'Chattier screens; composite endpoints reduce round-trips.' },
      { layer: 'Distribution', technology: 'Android APK · web', reason: 'Direct pilot distribution without waiting on store review.', tradeoff: 'No production signing/store polish yet; updates are manual.' },
      { layer: 'Hosting', technology: 'Multi-platform hosting', reason: 'Independent deploys and failure isolation per surface.', tradeoff: 'Multiple hosting origins to configure correctly.' },
    ],
    note:
      'Architecture illustration based on the repository. Admin and Billing Studio are static clients; no service-side rendering is implied.',
  },

  ecosystem: {
    intro:
      'Four surfaces share one backend, one permission model and one project boundary. They are deliberately separable: a failure in the public site cannot take down field operations.',
    surfaces: [
      {
        id: 'mobile',
        label: 'Mobile app',
        status: 'live' as StatusTone,
        statusLabel: 'Working MVP · pilot build',
        summary: 'The field workspace for daily execution: evidence capture, materials, orders, payables, labour and documents.',
        capabilities: [
          'Site updates with weather, labour, geolocation and timestamped photo evidence',
          'Material receiving with accepted/damaged quantities and supplier attribution',
          'Purchase orders with supplier accept, change request, dispatch and completion states',
          'Payables with partial settlement, outstanding balance and due dates',
          'Project-scoped documents with visibility modes and per-user grants',
          'Role-aware navigation and server-enforced permissions',
        ],
        note: 'Android pilot build. Production signing and store distribution are pending.',
      },
      {
        id: 'admin',
        label: 'Admin console',
        status: 'live' as StatusTone,
        statusLabel: 'Deployed · static export',
        summary: 'The operational control plane for users, access, product configuration, releases, content, feedback and audit.',
        capabilities: [
          'User search, verification state, block/unblock and account activity',
          'Scoped administrative roles and audited mutations',
          'Remote UI configuration, release lifecycle and feature kill switches',
          'Content banners, broadcast notifications and delivery logs',
          'Feedback/reviews, analytics summaries and report export',
          'Audit trail across privileged actions',
        ],
        note: 'Static export. The API remains the security boundary.',
      },
      {
        id: 'studio',
        label: 'Billing Studio',
        status: 'progress' as StatusTone,
        statusLabel: 'In progress · not production-proven',
        summary: 'A dedicated commercial workspace for contracts, BOQ, measurements and bills — being hardened before launch.',
        capabilities: [
          'Contract and BOQ structures with reference-guarded deletes',
          'Measurement submission, approval and rejection states',
          'Bill workflow: draft, submit, approve, finalize, void',
          'Server-computed totals from BOQ snapshots; client totals ignored',
          'Immutable approved/finalized records and self-approval guard',
          'Idempotent bill and measurement creation',
        ],
        note: 'Production tables are empty and deployment verification (environment, CORS, login) is pending. Do not read this as an operating billing product yet.',
      },
      {
        id: 'website',
        label: 'Public website',
        status: 'live' as StatusTone,
        statusLabel: 'Deployed · static',
        summary: 'The public product and compliance surface: what BuildOS is, how to get it, release metadata and legal documents.',
        capabilities: [
          'Product narrative and workflow explanation',
          'Release version and Android distribution information',
          'Privacy policy and terms served through the product API',
          'Analytics for product-page discovery and download intent',
          'Independent deployment and failure isolation',
        ],
        note: 'Marketing site only; it holds no project data.',
      },
    ],
    screens: [
      { id: 'home', label: 'Project health', src: 'assets/buildos/screen-home.png', caption: 'Budget, spend, dues, stock alerts and recent site activity in one project-scoped home.' },
      { id: 'site', label: 'Site diary', src: 'assets/buildos/screen-site-diary.png', caption: 'Structured progress entries with weather, labour count and photo evidence.' },
      { id: 'receive', label: 'Receive material', src: 'assets/buildos/screen-receive-material.png', caption: 'Accepted vs damaged quantity, supplier attribution and settlement in one receipt.' },
      { id: 'order', label: 'Order detail', src: 'assets/buildos/screen-order-detail.png', caption: 'A supplier-facing order lifecycle with dispatch dates, progress and event history.' },
      { id: 'finance', label: 'Finance', src: 'assets/buildos/screen-finance.png', caption: 'Budget, committed, actual, paid and outstanding — derived from project records.' },
      { id: 'payables', label: 'Payables', src: 'assets/buildos/screen-payables.png', caption: 'Open, partial and settled supplier obligations with due dates.' },
      { id: 'team', label: 'Team & roles', src: 'assets/buildos/screen-team.png', caption: 'Project membership and role assignment; permissions are resolved on the server.' },
    ],
    note: 'Screenshots are real BuildOS application screens. Demo data is illustrative; no usage metric is implied.',
  },

  challenges: [
    {
      id: 'schema-drift',
      category: 'Database · Deployment',
      title: 'Schema alignment after deployment',
      what: 'A deployment introduced schema changes that were not fully applied to the running database, causing read failures on project data.',
      why: 'The application code expected database columns that had not been migrated in the live environment, creating a mismatch between code and data model.',
      investigation: 'Compared the application schema definition against the live database structure to identify mismatched columns and constraints.',
      decision: 'Treat database migrations as the single authority for schema changes, with verification steps after every deployment.',
      change: 'Added migration verification to the deployment pipeline, ensuring the live schema matches the application model before traffic is served.',
      validation: 'Schema diff checks pass cleanly; migration chain is at head; affected endpoints are healthy after deployment.'
    },
    {
      id: 'vendor-ownership',
      category: 'Security · Authorization',
      title: 'Tenant isolation in multi-vendor operations',
      what: 'A code path allowed operations to be attributed to the wrong project vendor, creating a cross-tenant data integrity risk.',
      why: 'Write operations did not fully enforce the vendor-project relationship that read operations already required.',
      investigation: 'Audited all write endpoints against the vendor-link model to find paths where tenant boundaries were not enforced.',
      decision: 'Apply the same vendor narrowing to mutations as to reads, failing closed when the vendor-project link cannot be verified.',
      change: 'All write operations now enforce vendor-project ownership before creating or modifying records.',
      validation: 'Regression tests cover allowed and denied cases across all write operations; existing order flows continue to pass.'
    },
    {
      id: 'idempotency',
      category: 'Financial integrity',
      title: 'Retry-safe financial operations',
      what: 'Network retries after successful server responses could create duplicate financial records.',
      why: 'Without idempotency protection, a client retrying a failed request could cause the server to process the same financial event twice.',
      investigation: 'Traced all financial create paths and built concurrency tests with overlapping request sessions.',
      decision: 'Implemented idempotency for financial operations to prevent duplicate records on retry.',
      change: 'Financial create operations are retry-safe; identical replays do not create duplicate records.',
      validation: 'Concurrent requests produce exactly one success; conflicts are properly handled.'
    },
    {
      id: 'order-state',
      category: 'Domain design · Concurrency',
      title: 'Supplier workflow as a state machine',
      what: 'Purchase orders needed explicit state transitions (acceptance, dispatch, receipt) rather than free-form status editing.',
      why: 'Invalid order state transitions could corrupt operational records and procurement decisions.',
      investigation: 'Mapped all valid order transitions and the roles authorized to trigger each one.',
      decision: 'Replace status editing with explicit action endpoints and a transition service; make terminal states immutable.',
      change: 'Supplier and buyer actions became explicit endpoints; illegal transitions return conflicts; every mutation emits an audit event.',
      validation: 'Fulfillment tests cover the complete accept-to-complete chain, rejections, partial acceptance, and invalid transitions.'
    },
    {
      id: 'client-contract',
      category: 'Cross-system integration',
      title: 'Client-server API contract alignment',
      what: 'A backend endpoint returned a data shape that the mobile client could not parse, creating a mismatch between commit and confirmation.',
      why: 'The server committed data but the client failed during response parsing, making a successful operation appear failed to the user.',
      investigation: 'Compared every backend route against mobile client call sites to find shape, method, and status mismatches.',
      decision: 'Standardize on a single documented response contract; re-query after commit instead of reading potentially stale state.',
      change: 'The endpoint now returns one documented response envelope; mismatched client routes were corrected to match the server contract.',
      validation: 'Integration tests verify both sides of the API contract; mobile parsing was aligned with the server response format.'
    },
    {
      id: 'session',
      category: 'Mobile resilience',
      title: 'Session persistence across network failures',
      what: 'Application startup cleared the user session on any backend failure, including transient network errors.',
      why: 'Construction sites have unreliable connectivity; clearing sessions on every cold start creates adoption barriers.',
      investigation: 'Separated authentication rejection from transport and server failures across startup and request interception.',
      decision: 'Only definitive authentication rejection clears sessions; transient failures enter a retryable state that preserves tokens.',
      change: 'Added a guarded startup state machine with retryable UI and refresh-aware request queuing; tokens stored in platform secure storage.',
      validation: 'Startup-resilience tests distinguish authentication denial from connectivity failure; session is preserved through transient errors.'
    },
  ] satisfies Challenge[],

  security: {
    intro:
      'Security is treated as a set of boundaries, not a badge. The server is the only security boundary; client-side hiding is a usability measure, never an authorization control.',
    posture: 'Security-conscious engineering with documented limits. No certification, external penetration test or complete assurance is claimed.',
    domains: [
      {
        id: 'identity',
        title: 'Identity & access',
        summary: 'Who the user is, and what this project allows them to do.',
        controls: [
          { name: 'Token-based authentication with rotation', state: 'verified', note: 'Standard session management with server-side validation.' },
          { name: 'Password hashing with rate limiting', state: 'verified', note: 'Industry-standard password protection with failed-attempt controls.' },
          { name: 'Project RBAC with scoped permissions', state: 'verified', note: 'Role-based access control within project boundaries.' },
          { name: 'Ownership transfer restrictions', state: 'verified', note: 'Controlled ownership changes with server-side enforcement.' },
          { name: 'Server-side authorization on every project route', state: 'verified', note: 'Client-supplied roles and permissions are ignored.' },
        ],
      },
      {
        id: 'visibility',
        title: 'Data visibility',
        summary: 'A project is a tenant boundary; a document has its own boundary inside it.',
        controls: [
          { name: 'Multiple document visibility modes', state: 'verified', note: 'Controlled access levels within project membership.' },
          { name: 'Per-document access grants', state: 'verified', note: 'Targeted sharing with verified project members.' },
          { name: 'Uploader and owner access rules', state: 'verified', note: 'Content creators and owners retain appropriate access.' },
          { name: 'Cross-project document access denied', state: 'verified', note: 'Direct access to documents outside project scope is rejected.' },
          { name: 'Storage access honours document ACLs', state: 'verified', note: 'File access follows document-level permission rules.' },
        ],
      },
      {
        id: 'api',
        title: 'API boundary',
        summary: 'Every request is untrusted until validated, authorized and scoped.',
        controls: [
          { name: 'Input validation with type checking', state: 'verified', note: 'Schema validation for all API inputs with bounds checking.' },
          { name: 'Rate limiting on sensitive endpoints', state: 'partial', note: 'Throttling on authentication and upload paths.' },
          { name: 'CORS allow-list configuration', state: 'verified', note: 'Restricted origin access for browser clients.' },
          { name: 'Idempotency for state-changing operations', state: 'verified', note: 'Retry-safe operations for financial and inventory actions.' },
          { name: 'Error hygiene and sensitive data redaction', state: 'verified', note: 'Error messages avoid exposing internal implementation details.' },
          { name: 'Security regression testing', state: 'verified', note: 'Cross-project access and privilege escalation scenarios are tested.' },
        ],
      },
      {
        id: 'database',
        title: 'Database & integrity',
        summary: 'Constraints and scoped queries keep a relational domain coherent.',
        controls: [
          { name: 'Relational constraints and indexes', state: 'verified', note: 'Foreign keys and uniqueness enforced at the database level.' },
          { name: 'Schema migration chain with CI validation', state: 'verified', note: 'Versioned migrations tested in CI before deployment.' },
          { name: 'Row locking for financial state changes', state: 'verified', note: 'Concurrency protection for money and state transitions.' },
          { name: 'Database-level row security', state: 'planned', note: 'Application-level isolation today; RLS evaluated as defense-in-depth option.' },
        ],
      },
      {
        id: 'files',
        title: 'Files & evidence',
        summary: 'Evidence is only useful if its access rules are as strict as its data.',
        controls: [
          { name: 'File type and content validation', state: 'verified', note: 'Declared type must match actual file content.' },
          { name: 'Upload size limits', state: 'verified', note: 'Maximum file size enforced to prevent abuse.' },
          { name: 'Project-scoped file storage', state: 'verified', note: 'File paths scoped to project boundaries.' },
          { name: 'Time-limited access URLs', state: 'verified', note: 'Temporary signed URLs for private file access.' },
          { name: 'Permission-aware file serving', state: 'verified', note: 'Media access checks both category and document permissions.' },
        ],
      },
      {
        id: 'operations',
        title: 'Operational security',
        summary: 'Secrets, logs and releases are part of the attack surface.',
        controls: [
          { name: 'Secrets outside version control', state: 'verified', note: 'Environment configuration; no credentials in code.' },
          { name: 'Secret scanning in CI', state: 'verified', note: 'Automated scanning for exposed credentials in commits.' },
          { name: 'Structured error logging with redaction', state: 'verified', note: 'Error logs exclude sensitive values and credentials.' },
          { name: 'Error monitoring integration', state: 'partial', note: 'Optional error tracking with configurable data collection.' },
          { name: 'Secret management', state: 'partial', note: 'Manual rotation process; not yet automated.' },
          { name: 'External security review', state: 'planned', note: 'Third-party security assessment not yet completed.' },
        ],
      },
    ] satisfies SecurityDomain[],
  },

  discipline: {
    title: 'A solo codebase still needs engineering memory.',
    body: 'The repository is organised by surface — mobile, backend, admin, studio, website — with shared documentation for architecture, API, database, security and deployment. Development happened in small, scoped commits rather than one large drop.',
    stats: [
      { value: '142', label: 'Authored commits', note: 'Plus 31 dependency updates.' },
      { value: '01', label: 'Long-lived branch', note: 'main; no merge-commit history.' },
      { value: '01', label: 'Release checkpoint', note: 'v1 tagged after production fixes.' },
      { value: '48', label: 'Schema migrations', note: 'Linear, single-head chain.' },
    ],
    cadence: [
      { month: 'Aug 2026', commits: 22 },
      { month: 'Sep 2026', commits: 78 },
      { month: 'Oct 2026', commits: 42 },
    ],
    practices: [
      'Scoped commit subjects: feat, fix, security, docs, chore, with the affected surface named.',
      'Feature work and deployment configuration kept as separate changes.',
      'Database changes always carry a migration and a deploy note.',
      'Documented decisions and known debt instead of silent assumptions.',
      'Dependency updates arrive as separate, reviewable changes.',
      'CI on push and pull request: backend tests, Flutter analyze/test, migration check, secret scan.',
    ],
    honest: [
      'No formal pull-request review process is claimed: this is currently a solo codebase.',
      'Some lint and type steps remain advisory while legacy debt is cleared.',
      'Release tagging is light; production readiness is tracked by migrations and deploy verification, not by tags alone.',
    ],
    sampleCommits: [
      'fix(security): MVP hardening — upload scope, media ACL, IP rate limit, numeric bounds',
      'feat: MVP remote feature flags (server-enforced) + admin toggles',
      'fix(mobile): Android intent queries, iOS usage strings, update-check correctness',
      'docs: record static deploy + production at migration head',
    ],
  },

  deployment: {
    title: 'Deployment is a claim with evidence attached.',
    intro:
      'The components deploy independently. That isolation is useful, but it also means “the app is live” is never a single true/false statement.',
      board: [
        { component: 'Mobile app', deployed: 'Pilot APK built', tested: 'Automated + device QA', proven: 'Not field-proven', note: 'Android-first; production signing and store distribution pending.' },
        { component: 'API', deployed: 'Managed hosting', tested: '700+ backend tests', proven: 'Limited pilot traffic', note: 'Cold starts; migrations verified at head.' },
        { component: 'Database', deployed: 'Managed PostgreSQL', tested: 'Schema diff + migration chain', proven: 'Small production dataset', note: 'Backups and operational drills are manual.' },
        { component: 'Admin console', deployed: 'Static export', tested: 'Build + manual checks', proven: 'Internal use', note: 'Static export; all privileged decisions run on the API.' },
        { component: 'Product website', deployed: 'Static hosting', tested: 'Build + link checks', proven: 'Public', note: 'Canonical-domain setup has been inconsistent.' },
        { component: 'Billing Studio', deployed: 'Config prepared', tested: 'Local build passed', proven: 'Not production-proven', note: 'Environment, CORS and real login verification pending.' },
        { component: 'Release pipeline', deployed: 'Workflow prepared', tested: 'CI artifact only', proven: 'Not a production release', note: 'Blocked on production signing identity; debug signature must not be distributed as an update.' },
      ],
    constraints: [
      'Free-tier hosting introduced cold starts; the product had to behave honestly while the API woke up.',
      'Static exports cannot serve dynamic admin routes, which shaped the admin information architecture.',
      'No push-notification service exists; notifications are in-app only and documented as such.',
      'The APK is a large, debug-signed pilot artifact, not a store-ready release.',
      'Three different hosting origins required explicit CORS and environment configuration.',
    ],
    gates: [
      'Apply and verify migrations — a code deploy without its schema is an outage waiting for traffic.',
      'Treat code and schema as one release unit; a code rollback must check the migration head before redeploy.',
      'Configure origins, secrets and environment before claiming a surface is live.',
      'Run the build and the test suites for the affected surfaces.',
      'Preserve an honest status: deployed, tested and field-proven are separate labels.',
    ],
  },

  fde: {
    quote:
      'I don’t approach engineering as writing software in isolation. I approach it as understanding an operational problem, entering its environment, translating its requirements into a working system, and continuously improving that system through real-world feedback.',
    clarification:
      'This is demonstrated working capability, not an official Forward Deployed Engineer title or a claim of completed customer deployments.',
    steps: [
      { step: 'Real-world problem', buildos: 'Fragmented site operations spread across WhatsApp, calls, paper and spreadsheets.' },
      { step: 'Stakeholder discovery', buildos: 'Eight contractor conversations before the first workflow was committed.' },
      { step: 'Workflow observation', buildos: 'Phone-first work, typing resistance, unreliable connectivity, role-specific visibility.' },
      { step: 'Technical requirements', buildos: 'Project-scoped records, evidence capture, explicit permissions and financial traceability.' },
      { step: 'System design', buildos: 'Flutter client, FastAPI boundary, relational core, separate admin and public surfaces.' },
      { step: 'Rapid implementation', buildos: 'MVP workflows built and iterated across mobile, backend, admin and deployment.' },
      { step: 'Field validation', buildos: 'Pilot direction established; a real field pilot remains the next evidence gate.' },
      { step: 'Feedback collection', buildos: 'In-app feedback, admin review, analytics and release controls are in place.' },
      { step: 'Iterative engineering', buildos: 'Security, receipt authorization, payables, supplier workflow and billing safety hardened in response.' },
      { step: 'Operational improvement', buildos: 'Remote feature controls and release management reduce the cost of correcting course.' },
    ],
    capabilities: [
      'Translate ambiguous operational language into a bounded product model.',
      'Work within the customer’s actual tools, devices and connectivity constraints.',
      'Make trade-offs under free-tier infrastructure and small-team constraints.',
      'Debug across client, API, database and deployment boundaries.',
      'Treat adoption and usability as engineering requirements, not afterthoughts.',
      'Leave behind documentation and tests so the system can be handed over.',
    ],
  },

  outcomes: {
    title: 'What exists, stated precisely.',
    groups: [
      {
        status: 'Completed' as StatusTone,
        items: [
          'A working multi-platform MVP: Flutter app, FastAPI API, Next.js admin and public website.',
          'A relational project model with RBAC, document visibility, delivery memos, orders, payables, labour and audit history.',
          'Independent deployments for API, admin and public site.',
          'Engineering documentation covering architecture, API, database, security, deployment and known debt.',
          'An automated test suite and CI pipeline across backend and mobile.',
          'Eight contractor interviews and at least one expressed pilot interest.',
        ],
      },
      {
        status: 'In progress' as StatusTone,
        items: [
          'Real field validation with a pilot contractor.',
          'Billing Studio deployment verification and production workflows.',
          'Production Android signing and store distribution.',
          'Cross-surface parity: some backend capabilities are not yet exposed in mobile.',
        ],
      },
      {
        status: 'Validated' as StatusTone,
        items: [
          'The workflow model and permission boundaries are validated by automated tests.',
          'Financial state transitions and idempotency are validated under concurrency tests.',
          'Document visibility and vendor ownership are validated against attack paths.',
          'Deployment topology is validated in production for the API, admin and website.',
        ],
      },
      {
        status: 'Planned' as StatusTone,
        items: [
          'A structured field pilot with measurable adoption criteria.',
          'External security review.',
          'Operational analytics for product decisions.',
          'Deeper ecosystem integrations and multi-project scale.',
        ],
      },
    ],
    note: 'Validated in this page means verified by tests or deployment evidence — not proof of market fit or commercial success.',
  },

  roadmap: [
    { horizon: 'Next', title: 'Field validation cohort', detail: 'Put the pilot in one contractor’s real workflow and measure recording time, completion and correction rates.' },
    { horizon: 'Next', title: 'Production release identity', detail: 'Resolve APK signing, versioning and an internal/closed testing track before claiming release readiness.' },
    { horizon: 'Next', title: 'Billing Studio hardening', detail: 'Finish deployment verification, real project data and reconciliation workflows.' },
    { horizon: 'Then', title: 'Cross-surface completeness', detail: 'Expose the backend capabilities that still live only in API or admin: approvals, timeline, vendor ledger, replacements.' },
    { horizon: 'Then', title: 'Security depth', detail: 'External review and security hardening.' },
    { horizon: 'Then', title: 'Operational analytics', detail: 'Turn project events into decision support without inventing vanity metrics.' },
    { horizon: 'Later', title: 'Financial operations', detail: 'Invoices, receivables, cash flow, retention and bank reconciliation as first-class workflows.' },
    { horizon: 'Later', title: 'Ecosystem integrations', detail: 'WhatsApp capture, e-signature, accounting exports and supplier integrations with clear boundaries.' },
  ],

  limitations: [
    'No user-count, revenue or growth metric is claimed for BuildOS.',
    'Eight interviews and pilot interest are discovery evidence, not completed deployment proof.',
    'The mobile build is a pilot/QA artifact; production signing and store distribution are incomplete.',
    'Billing Studio is in progress and not production-proven.',
    'No security certification or third-party penetration test is claimed.',
    'Source code is private; this case study describes architecture and engineering decisions without exposing credentials, private schemas or exploit details.',
  ],
}
