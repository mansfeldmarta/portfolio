import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Modal from './Modal';

// Optional: dedent helper left for other markdown strings
const dedent = (str = '') => {
  if (!str) return '';
  const trimmed = str.replace(/^\n/, '').replace(/\n\s*$/, '');
  const lines = trimmed.split('\n');
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return trimmed;
  const indents = nonEmpty.map((l) => (l.match(/^(\s*)/)[1] || '').length);
  const minIndent = Math.min(...indents);
  return lines.map((l) => l.slice(minIndent)).join('\n');
};

const portfolioItems = [
  {
    id: 'site',
    title: 'Portfolio website',
    href: 'https://github.com/mansfeldmarta/portfolio',
    tech: ['React', 'TailwindCSS'],
    short: 'Personal website & portfolio showcasing projects.',
    long: 'A responsive personal portfolio built with React and TailwindCSS. Designed to highlight projects with a clean layout, and accessible components.',
    image: '/images/port.png',
    preview: [],
  },
  {
    id: 'perf',
    title: 'Performance dashboard',
    href: '',
    tech: ['JavaScript', 'React', 'Chart.js', 'Trello API'],
    short: 'Dashboard for tracking board/task performance and KPIs.',
    description:
      'A performance dashboard built to track and analyze team productivity by integrating directly with Trello boards via API. Data is pulled on a schedule, processed to calculate expected vs. actual hours, and visualized to give managers actionable insights across teams and individuals.',
    features: [
      'Trello integration: fetches board, list and card activity via the Trello API for each team’s board.',
      'Automated sync: scheduled cron job that refreshes data every 6 hours with incremental updates.',
      'Hours & effort calculations: computes expected vs. actual hours per card and aggregates to team-level KPIs.',
      'Holiday awareness: accounts for weekends, public holidays and bank holidays when projecting availability.',
      'Special projects handling: allows managers to flag and track ad-hoc or cross-team efforts separately.',
      'Rich visualizations: multi-chart dashboards using Chart.js (weekly/daily breakdowns, trend lines, and heatmaps).',
      'Granular views & filters: switch between team and individual views, filter by date-range, board, label or member.',
      'Export & reporting: CSV export of reports and PDF-ready snapshot views for stakeholder updates.',
    ],
    long: 'A performance dashboard built to track and analyze team productivity by integrating directly with Trello boards via API. Each team has its own board, with data automatically pulled every 6 hours through a scheduled cron job. The system processes card and board activity, applies calculations for expected vs. actual hours, and accounts for holidays and bank holidays to provide accurate productivity insights. Data is visualized with multiple Chart.js graphs, including weekly and daily breakdowns at both team and individual levels. The UI, built with React, delivers an intuitive and responsive experience. This tool has become a core part of measuring workload, tracking performance trends, and improving transparency across the organization.',
    image: '/images/trello.jpeg',
    preview: [],
  },
  {
    id: 'builder',
    title: 'Form Builder',
    href: '',
    tech: ['JavaScript', 'React', 'DnD'],
    short: 'Internal Form Builder for creating custom forms.',
    description:
      'The Form Builder is a graphical interface designed for building and customizing dynamic layouts through an intuitive drag-and-drop experience. Started with React and Apollo Client before switching to tRPC, it integrates with queries to fetch and manage data while providing a user-friendly canvas for arranging components. The editor supports advanced interactions — duplicating, removing, and repositioning elements — making it accessible to both technical and non-technical users.',
    features: [
      'Drag-and-drop layout building: move, position and organize components across different zones.',
      'Component lifecycle actions: remove, duplicate, or reassign items while keeping layout and component state in sync.',
      'Dynamic tab creation: create tab components and configure the number of tabs at placement time.',
      'State synchronization: all layout changes are reflected in both layout and components states for consistency and reusability.',
    ],
    image: '/images/builder.png',
    preview: [],
  },
  {
    id: 'viz',
    title: 'Data visualization',
    href: '#',
    tech: ['JavaScript', 'React', 'Nivo.js'],
    short: 'Exploratory analyses and production-ready visualisations.',
    description:
      'A set of data visualisations and reporting tools built with React and Nivo Charts. Heavy numerical work (aggregations and forecasts) is performed on the backend to keep the UI fast and responsive, while the frontend focuses on interactive exploration and exporting snapshots for stakeholders.',
    features: [
      'Nivo-powered interactive charts: rich, animated visualisations (line, bar, heatmap, pie charts) with zoom, brush and hover interactions.',
      'Backend aggregation & calculation: server-side pre-computed metrics to improve performance for large datasets.',
      'Responsive design: dashboards adapt to desktop, tablet and mobile while preserving readability and interactions.',
      'Snapshot & share: capture dashboard snapshots (PNG/PDF) for presentations and archival.',
      'Download & export: CSV and Excel exports of underlying data and chart-specific downloads for ad-hoc analysis.',
      'Caching & pagination: smart caching and paginated queries to keep load times low on big datasets.',
      'Drill-down & filters: interactive filtering, segmentation and drill-downs from aggregate KPIs to row-level details.',
      'Automated reporting: scheduled jobs that email or store PDF/CSV reports for stakeholders.',
    ],
    long: 'A collection of visualisations and dashboards built with React and Nivo Charts. Processing-heavy work is handled on the backend to ensure the UI remains snappy even with large datasets. The product supports interactive exploration, exports, scheduled snapshots and a range of report templates (Sales, Marketing, Product, Operations). Dashboards are responsive and include features for sharing and downloading data for downstream analysis.',
    image: '/images/reports.png',
    preview: [],
  },
  {
    id: 'crmtool',
    title: 'Campaigns Draft System',
    href: '#',
    tech: ['JavaScript', 'TypeScript', 'React'],
    short: 'A web tool for streamlined PPC draft reviews and approvals.',
    description:
      'Built an internal Draft Review & Approval system integrated into the Customer Portal to centralize PPC campaign feedback. The system allows teams to upload campaign drafts, assign reviewers, and collect customer approvals or revision requests—all in one clean, responsive interface. Notifications and status tracking reduce delays, improve transparency, and streamline communication between teams and clients.',
    features: [
      'Upload & manage campaign drafts with associated media assets',
      'Assign internal reviewers and track approvals before sending to clients',
      'Customer-friendly interface for reviewing drafts, requesting changes, or approving',
      'Version control to track edits, comments, and responses across multiple drafts',
      'Status tracking for both internal teams and customers (Pending, Approved, Revisions Requested)',
      'Automated email notifications and reminders for pending reviews',
      'Role-based access control for secure, permissioned access',
      'Centralized dashboard for reporting and monitoring campaign review progress',
    ],
    long: 'This feature solves fragmented communication and delays in PPC campaign approvals by centralizing draft management and feedback in the Customer Portal. Built with React, it provides a responsive, intuitive UI, real-time status tracking, version history, and notifications for internal teams and customers. Integrated Nivo Charts provide visual dashboards for tracking approvals and campaign progress, enabling faster turnarounds.',
    image: '/images/ppc.png',
    preview: [],
  },
];

const collaborationItems = [
  {
    id: 'sunday',
    title: 'CRM Tool',
    href: '#',
    tech: ['JavaScript', 'TypeScript', 'React', 'Virtuoso', 'TPS API'],
    short: 'Internal tool for managing leads and customer data efficiently.',
    description:
      'Built a custom CRM and leads management system within TurtleShell to replace external tools like Monday.com. The system replicates key project and workflow functionalities—tracking leads, custom fields, views, and statuses—while centralizing all lead information in-house. This eliminates manual data transfers, reduces operational costs, and provides sales reps with a faster, more organized workflow.',
    features: [
      'Full lead lifecycle management: create, track, and update leads within TurtleShell',
      'Custom project-like boards: configure fields, views, and workflows similar to Monday.com / GitHub ProjectsV2',
      'Dynamic field types: text, single-select, date, labels, assignees, and more',
      'Custom views & filtering: board, table, entries',
      'Comments & version history: track interactions and updates for each lead',
      'Role-based permissions: secure access for sales reps and managers',
      'Backend-optimized data handling: server-side calculations, pagination, and caching for fast performance',
      'Export & reporting: CSV / Excel exports of lead data and activity for analysis',
    ],
    long: 'This tool was developed to replace Monday.com for managing leads, eliminating external subscription costs and centralizing all customer and lead data. Inspired by GitHub ProjectsV2 and Monday.com, it allows sales teams to create projects with custom fields and workflows, configure multiple views (board, table, roadmap), and track lead progress efficiently. Comments and version history maintain full transparency, while the responsive UI and backend optimizations ensure fast, interactive experiences. The platform also supports exporting and reporting features to aid management and data-driven decision making.',
    image: '/images/crm.png',
    preview: [],
  },
  {
    id: 'portal',
    title: 'Customer Portal',
    href: '#',
    tech: ['JavaScript', 'TypeScript', 'React', 'AWS S3'],
    short: 'Customer-facing portal to track orders and upload assets.',
    description:
      'The Customer Hub was designed to empower customers to manage requests and assets directly. Using email-based authentication, customers can log in without passwords. Assets uploaded by customers are stored in AWS S3. The backend, built with Node.js and Prisma, manages asset references, lifecycle, and integration with main system. A visual product pipeline allows customers to track their orders step by step. The system improves customer experience, streamlines internal workflows, and ensures secure and organized asset management.',
    features: [
      'Email-based token authentication: Customers log in via a secure, time-limited link without managing passwords.',
      'Product delivery pipeline: Visual timeline to track order progress.',
      'Asset uploading: Customers can upload assets (images, logos, files) to AWS S3, linked to their account for designers/content teams.',
      'Asset lifecycle management: Automatic expiration/deletion of files to optimize storage costs.',
      'Integration with main system backend.',
      'Responsive frontend UI built with React and TypeScript.',
    ],
    long: 'The Customer Hub was designed to empower customers to manage requests and assets directly. Using email-based authentication, customers can log in without passwords. Assets uploaded by customers are stored in AWS S3. The backend, built with Node.js and Prisma, manages asset references, lifecycle, and integration with main system. A visual product pipeline allows customers to track their orders step by step. The system improves customer experience, streamlines internal workflows, and ensures secure and organized asset management.',
    image: '/images/ch.png',
    preview: [],
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState('me');

  const [expandedImg, setExpandedImg] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [activeYear, setActiveYear] = useState('2025');
  const [previewImg, setPreviewImg] = useState(null);
  const years = ['2025', '2024', '2023', '2022'];
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (!expandedImg) return;
      if (e.key === 'Escape') setExpandedImg(null);
      if (e.key === 'ArrowRight') {
        setExpandedIdx((i) =>
          selected && selected.preview ? (i + 1) % selected.preview.length : i
        );
      }
      if (e.key === 'ArrowLeft') {
        setExpandedIdx((i) =>
          selected && selected.preview
            ? (i - 1 + selected.preview.length) % selected.preview.length
            : i
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedImg, selected]);

  useEffect(() => {
    setExpandedImg(null);
    setExpandedIdx(0);
  }, [selected]);

  useEffect(() => {
    const onScroll = () => {
      const sections = ['me', 'about', 'portfolio', 'contact'];
      let current = 'me';
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = (item) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelected(null), 200);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  };

  return (
    <div className='font-sans text-gray-800'>
      <header className='fixed w-full z-30 bg-white/40 backdrop-blur-md shadow-sm'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center gap-4' />

            <nav className='hidden md:flex items-center space-x-6'>
              {['me', 'about', 'portfolio', 'contact'].map((section) => {
                const label =
                  section === 'me'
                    ? 'Home'
                    : section.charAt(0).toUpperCase() + section.slice(1);
                return (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className={`cursor-pointer ${
                      active === section
                        ? 'text-indigo-600 font-semibold'
                        : 'hover:text-indigo-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className='md:hidden'>
              <button
                onClick={() => setNavOpen(!navOpen)}
                aria-label='Toggle navigation'
                className='p-2 rounded-md focus:outline-none focus:ring'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={
                      navOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {navOpen && (
          <div className='md:hidden bg-white/95 backdrop-blur-sm shadow-md w-full absolute top-16 left-0 z-20'>
            <nav className='flex flex-col px-4 py-4 space-y-3'>
              {['me', 'about', 'portfolio', 'contact'].map((section) => {
                const label =
                  section === 'me'
                    ? 'Home'
                    : section.charAt(0).toUpperCase() + section.slice(1);
                return (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className={`text-left ${
                      active === section
                        ? 'text-indigo-600 font-semibold'
                        : 'hover:text-indigo-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <section
        id='me'
        className='min-h-[70vh] md:min-h-screen relative scroll-mt-16'
      >
        <div className='w-full h-[60vh] md:h-screen'>
          <img
            src='/images/back.png'
            alt='background'
            className='w-full h-full object-cover'
          />
        </div>

        <div className='absolute inset-0 pointer-events-none'>
          <div className='container mx-auto h-full px-6 flex items-center'>
            <div className='w-full flex justify-center md:justify-end'>
              <div className='pointer-events-auto bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-md max-w-xs md:max-w-sm transform md:translate-x-0'>
                <h1 className='text-2xl md:text-3xl font-bold'>
                  Cześć! Hello!
                </h1>
                <p className='mt-3 text-sm md:text-base text-gray-700 leading-relaxed'>
                  My name is Marta. I’m a self-taught Software Engineer
                  specialising in JavaScript, React and Next.js, with experience
                  building internal tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section id='about' className='py-20 bg-gray-50'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
              <div>
                <h3 className='text-xl font-semibold'>
                  Born in Poland, now based in the UK.
                </h3>
                <p className='mt-4 text-gray-700'>
                  Software Engineer with 4 years of experience building internal
                  systems and web application using JavaScript, React, Next.js,
                  and TypeScript.
                </p>
                <p className='mt-4 text-gray-700'>
                  My journey into software development started with online
                  courses in Web Design, Web Development, and Data Analysis. I’m
                  passionate about creating scalable, user-focused applications
                  and solving meaningful problems through code.
                </p>

                <div className='mt-6'>
                  <h4 className='font-medium'>A few facts about me:</h4>
                  <ul className='list-disc list-inside mt-3 space-y-3 text-gray-700'>
                    <li>
                      Former store manager with strong leadership and
                      problem-solving abilities
                    </li>
                    <li>Volleyball player for over a decade</li>
                    <li>
                      Passionate lifelong learner – "Once you stop learning, you
                      start dying"
                    </li>
                    <li>
                      DIY enthusiast with a love for crafting and home
                      improvement projects
                    </li>
                    <li>Amateur artist with a focus on drawing and painting</li>
                  </ul>
                </div>
              </div>

              <div className='flex justify-center '>
                <img
                  src='/images/port.png'
                  alt='Marta'
                  className='rounded-lg max-w-sm'
                />
              </div>
            </div>
          </div>
        </section>

        <section id='portfolio' className='py-10'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold'>Portfolio</h2>
              <p className='mt-2 text-gray-700'>
                Most of my professional contributions are on private company
                projects, but I’ve described some of the projects I’ve worked on
                below.
              </p>
            </div>
            {/* <div>
              Frontend: React TailwindCSS Figma DnD (Drag and Drop) Backend /
              API: Node.js tRPC Apollo Client TPS API Trello API Languages:
              JavaScript TypeScript Data Visualization / Charts: Chart.js
              Nivo.js / Nivo Charts UI / Performance Tools: Virtuoso
            </div> */}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
              {portfolioItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => openModal(it)}
                  className='block text-left rounded-xl p-6 shadow hover:shadow-md transition'
                >
                  <div className='rounded-lg p-4'>
                    <h4 className='text-lg font-semibold mb-2'>{it.title}</h4>
                    <p className='text-sm text-gray-700'>{it.short}</p>
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {it.tech.map((tech) => (
                        <span
                          key={tech}
                          className='bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className='max-w-6xl mx-auto px-6 mt-10'>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold'>Collaboration</h2>
              <p className='mt-2 text-gray-700'>
                Some projects I worked on in collaboration with other team
                members.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
              {collaborationItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => openModal(it)}
                  className='block text-left rounded-xl p-6 shadow hover:shadow-md transition'
                >
                  <div className='rounded-lg p-4'>
                    <h4 className='text-lg font-semibold mb-2'>{it.title}</h4>
                    <p className='text-sm text-gray-700'>{it.short}</p>
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {it.tech.map((tech) => (
                        <span
                          key={tech}
                          className='bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id='contact' className='py-16 bg-gray-50'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
              {/* Email */}
              <div className='w-full p-5 bg-white rounded-xl shadow text-center'>
                <h3 className='font-semibold'>Email</h3>
                <p className='mt-2 text-gray-700'>mansfeldmarta@gmail.com</p>
              </div>

              <div className='p-6 bg-white rounded-xl shadow flex flex-row items-center justify-center gap-8 overflow-x-auto'>
                <div className='flex gap-8 flex-shrink-0'>
                  {/* GitHub */}
                  <a
                    href='https://github.com/mansfeldmarta'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='GitHub'
                    className='transform hover:scale-110 transition'
                  >
                    <img
                      src='/images/gh.png'
                      alt='github'
                      className='h-12 w-12 object-contain'
                    />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href='https://www.linkedin.com/in/marta-mansfeld-a13a2817a/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='LinkedIn'
                    className='transform hover:scale-110 transition'
                  >
                    <img
                      src='/images/in.png'
                      alt='linkedin'
                      className='h-12 w-12 object-contain'
                    />
                  </a>
                </div>

                {/* Stats */}
                <button
                  onClick={() => setStatsModalOpen(true)}
                  className='transform hover:scale-110 transition flex-shrink-0'
                >
                  <img
                    src='/images/stats.png'
                    alt='GitHub stats'
                    className='h-12 w-12 object-contain'
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Modal */}
          <Modal
            isShowing={statsModalOpen}
            hide={() => setStatsModalOpen(false)}
            width={900}
          >
            <div className='p-4'>
              <h3 className='text-xl font-semibold mb-4'>GitHub Stats</h3>

              {/* Year Tabs */}
              <div className='flex flex-wrap gap-2 mb-6 border-b overflow-x-auto'>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-2 font-medium border-b-2 flex-shrink-0 ${
                      activeYear === year
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Contributions & Commits */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {['con', 'com'].map((type) => (
                  <div
                    key={type}
                    className='bg-gray-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition'
                    onClick={() =>
                      setPreviewImg(`/images/${type}${activeYear}.png`)
                    }
                  >
                    <h4 className='text-white font-medium mb-2'>
                      {type === 'con' ? 'Contributions' : 'Commits'}
                    </h4>
                    <img
                      src={`/images/${type}${activeYear}.png`}
                      alt={`/images/${type} ${activeYear}`}
                      className='max-h-96 object-contain'
                    />
                    <p className='mt-2 text-gray-300 text-sm'>
                      Click to preview
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Modal>

          {/* Fullscreen Preview Modal */}
          <Modal
            isShowing={!!previewImg}
            hide={() => setPreviewImg(null)}
            width={'90%'} // optional, can be 'max-w-xl' etc.
          >
            {previewImg && (
              <div className='flex justify-center items-center p-4'>
                <img
                  src={previewImg}
                  alt='Preview'
                  className='max-w-full max-h-[80vh] object-contain rounded-md shadow-lg'
                />
              </div>
            )}
          </Modal>
        </section>

        <footer className='py-8 text-center text-sm text-gray-600'>
          <p>Marta Mansfeld</p>
        </footer>
      </main>

      <Modal isShowing={isModalOpen} hide={closeModal} width={760}>
        {selected ? (
          <div className='space-y-4'>
            <div className='flex items-start gap-4'>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className='w-28 h-20 object-cover rounded-md flex-shrink-0'
                />
              ) : (
                <div className='w-28 h-20 rounded-md bg-gray-100' />
              )}

              <div>
                <h3 className='text-xl font-semibold'>{selected.title}</h3>
              </div>
            </div>

            {/* If the selected item supplies a features array, render as a real list */}
            {selected.features ? (
              <div className='text-gray-700'>
                {selected.description && (
                  <p className='mb-3'>{selected.description}</p>
                )}
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <h4 className='font-medium mb-2'>Key features:</h4>
                  {selected.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : (
              // Fallback: render markdown (dedented)
              <div className='text-gray-700'>
                <ReactMarkdown>{dedent(selected.long || '')}</ReactMarkdown>
              </div>
            )}

            {/* <div>
              {selected && selected.preview && selected.preview.length > 0 && (
                <>
                  <h4 className='font-medium mb-2'>Project previews:</h4>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {selected.preview.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setExpandedImg(src);
                          setExpandedIdx(idx);
                        }}
                        className='block w-full h-40 overflow-hidden rounded-md focus:outline-none'
                        aria-label={`${selected.title} preview ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt={`${selected.title} preview ${idx + 1}`}
                          className='w-full h-40 object-cover rounded-md transform hover:scale-105 transition'
                        />
                      </button>
                    ))}
                  </div>

                   {expandedImg && (
                    <div
                      className='fixed inset-0 z-60 flex items-center justify-center bg-black/80'
                      onClick={() => setExpandedImg(null)}
                      role='dialog'
                      aria-modal='true'
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selected || !selected.preview) return;
                          const prev =
                            (expandedIdx - 1 + selected.preview.length) %
                            selected.preview.length;
                          setExpandedIdx(prev);
                          setExpandedImg(selected.preview[prev]);
                        }}
                        className='absolute left-4 hidden md:inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white'
                        aria-label='Previous image'
                      >
                        ‹
                      </button>

                      <div
                        className='max-w-[95vw] max-h-[90vh] p-2'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={expandedImg}
                          alt={`${selected.title} enlarged`}
                          className='max-w-full max-h-[90vh] rounded-md shadow-lg object-contain'
                        />
                        <div className='mt-3 flex items-center justify-between text-sm text-white/90'>
                          <div>{`${expandedIdx + 1} / ${
                            selected.preview.length
                          }`}</div>

                          <div className='flex gap-2'>
                            <a
                              href={expandedImg}
                              target='_blank'
                              rel='noreferrer'
                              className='px-3 py-1 border rounded bg-white/10 hover:bg-white/20'
                            >
                              Open in new tab
                            </a>
                            <button
                              onClick={() => setExpandedImg(null)}
                              className='px-3 py-1 border rounded bg-white/10 hover:bg-white/20'
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selected || !selected.preview) return;
                          const next =
                            (expandedIdx + 1) % selected.preview.length;
                          setExpandedIdx(next);
                          setExpandedImg(selected.preview[next]);
                        }}
                        className='absolute right-4 hidden md:inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white'
                        aria-label='Next image'
                      >
                        ›
                      </button>
                    </div>
                  )}
                </>
              )}
            </div> */}

            <div className='flex items-center gap-3'>
              {selected.href && selected.href !== '#' && (
                <a
                  href={selected.href}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                >
                  View project
                </a>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
