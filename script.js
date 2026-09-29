const root = document.documentElement;
const languageTrigger = document.getElementById('language-trigger');
const menuTrigger = document.getElementById('menu-trigger');
const mobileNav = document.getElementById('mobile-nav');

// Preserve original Chinese markup to allow a lossless switch back.
const translations = {
  '.desktop-nav a, .mobile-nav a': ['About', 'Research', 'Publications', 'Projects', 'Experience', 'Contact', 'About', 'Research', 'Publications', 'Projects', 'Experience', 'Contact'],
  '.header-mail': 'Contact',
  '#hero-title': 'Leqian Ying<span class="name-en">应乐倩</span>',
  '.hero-role': 'Clinical Medicine Postdoctoral Researcher <span>／</span> Oncology Researcher',
  '.hero-intro': 'I study the tumor microenvironment and treatment resistance, with a focus on cancer-associated fibroblasts and translational strategies for colorectal cancer.',
  '.hero-actions .button': ['View publications <span aria-hidden="true">↗</span>', 'Email me', 'ORCID ↗'],
  '.hero-meta span': ['Southeast University · Clinical Medicine', 'FSTL3⁺ CAFs', 'Cancer immunotherapy'],
  '#about-title': 'About',
  '.lead': 'Starting from clinical questions, I investigate how tumor stroma and the immune microenvironment shape treatment response.',
  '.about-prose p': ['I earned my doctoral degree in Clinical Medicine at Southeast University, focusing on radiation oncology. I am currently conducting postdoctoral research in clinical medicine, medical imaging and interventional radiology, at Southeast University.', 'My work spans cancer-associated fibroblasts in colorectal cancer, vasculogenic mimicry, immunotherapy biomarkers, and tumor metabolism and treatment resistance. I lead a Young Scientists Fund project supported by the National Natural Science Foundation of China.'],
  '.metrics span': ['Publications listed in CV', 'Granted patents', 'Projects led'],
  '#research-title': 'Research',
  '#research .section-heading p': 'From molecular mechanisms to biomarkers and treatment strategies.',
  '.research-card h3': ['Cancer-associated fibroblasts', 'Tumor immunity and treatment response', 'Metabolism and predictive models'],
  '.research-card p': ['Investigating how FSTL3⁺ CAFs contribute to vasculogenic mimicry, extracellular matrix remodeling, and colon cancer progression.', 'Studying how chromatin regulation and the tumor microenvironment influence immune checkpoint inhibitor efficacy and patient stratification.', 'Integrating omics and clinical data to assess prognosis and treatment sensitivity in colon and liver cancers.'],
  '.research-card .tags span': ['FSTL3', 'CAFs', 'Vasculogenic mimicry', 'CHAF1A', 'TGF-β', 'Anti-PD-1', 'CAF signature', 'Glutamine metabolism'],
  '#publications-title': 'Selected publications',
  '#publications .section-heading p': 'Listed in the CV and ordered by year. Authorship roles follow the CV.',
  '.filters button': ['All <span>8</span>', 'First author <span>6</span>', 'Collaborative <span>2</span>'],
  '.paper-meta': ['NATURE COMMUNICATIONS <span>·</span> Co-author', 'CELL DEATH & DISEASE <span>·</span> First author', 'SCIENTIFIC REPORTS <span>·</span> First author', 'ADVANCED MATERIALS <span>·</span> Co-author', 'ONCOIMMUNOLOGY <span>·</span> First author', 'ZHEJIANG MEDICAL JOURNAL <span>·</span> First author', 'PATHOLOGY & ONCOLOGY RESEARCH <span>·</span> First author', 'CHINESE JOURNAL OF CELL BIOLOGY <span>·</span> First author'],
  '.paper:nth-child(6) h3': 'Development and validation of a prognostic risk model for hepatocellular carcinoma based on pyroptosis- and inflammation-related genes <small>(published in Chinese)</small>',
  '.paper:nth-child(8) h3': 'Research progress on telomeric DNA damage and cellular senescence <small>(published in Chinese)</small>',
  '.paper:nth-child(6) p, .paper:nth-child(8) p': ['<strong>Leqian Ying</strong> · 44(3): 250–257', '<strong>Leqian Ying</strong> · 40(03): 403–411'],
  '.paper-note': 'Links lead to journal sites or PubMed records. Please refer to the published versions for definitive citation details. English renderings of Chinese article titles are descriptive translations.',
  '#projects-title': 'Projects & patents',
  '.column-title': ['Principal investigator', 'Granted patents'],
  '.project-date': ['2026 — Ongoing <span>NSFC Young Scientists Fund</span>', '2017 — Completed <span>National Undergraduate Innovation and Entrepreneurship Training Program</span>', 'Invention patent', 'Utility model patent'],
  '.project-item h4': ['Lactate-induced epigenetic reprogramming of CAFs promotes vasculogenic mimicry in colorectal cancer', 'Coronary artery lesions and prognosis in patients with dilated cardiomyopathy', 'A glutamine metabolism-based prognostic model for survival in hepatocellular carcinoma', 'A culture dish designed for co-culture of tumor cells and neurons'],
  '.project-item p': ['Grant no. 82605805 · Principal investigator', 'Project no. 201710346020 · Principal investigator', 'Patent no. 202111116112.X · First inventor', 'Patent no. 202122545894.0 · First inventor'],
  '#experience-title': 'Education & academic service',
  '.timeline-when': ['Current', 'Doctoral studies', 'Academic service'],
  '.timeline h3': ['Southeast University', 'Southeast University', 'Early-career editorial board'],
  '.timeline p': ['Postdoctoral researcher in Clinical Medicine · Medical Imaging and Interventional Radiology', 'PhD in Clinical Medicine · Radiation Oncology', 'TransMed · Gastrointestinal Tumors'],
  '.timeline span': 'Mentors: Academician Gaojun Teng and Dean Yue Gao',
  '.honors span': 'Honors',
  '.honors p': 'National Scholarship · Outstanding Graduate of the University · Outstanding CPC Member of the University · “Three Good Student” Scholarship · Excellent Paper Award at the Chinese-Foreign Postgraduate Academic Forum',
  '#contact-title': 'Academic exchange & collaboration',
  '.contact-section p:not(.eyebrow)': 'For research discussions on the tumor microenvironment, colorectal cancer, and immunotherapy, please get in touch.',
  '.footer span': '© 2026 Leqian Ying',
  '.footer a': 'Back to top ↑'
};

const entries = Object.entries(translations).flatMap(([selector, english]) => {
  const elements = [...document.querySelectorAll(selector)];
  const texts = Array.isArray(english) ? english : [english];
  if (elements.length !== texts.length) throw new Error(`Translation count mismatch: ${selector}`);
  return elements.map((element, index) => ({element, zh: element.innerHTML, en: texts[index]}));
});
const paperLinkLabels = [...document.querySelectorAll('.paper-link[aria-label]')]
  .map(link => ({link, zh: link.getAttribute('aria-label')}));

function setLanguage(lang) {
  root.lang = lang === 'en' ? 'en' : 'zh-CN';
  entries.forEach(({element, zh, en}) => { element.innerHTML = lang === 'en' ? en : zh; });
  languageTrigger.textContent = lang === 'en' ? '中文' : 'EN';
  languageTrigger.lang = lang === 'en' ? 'zh-CN' : 'en';
  languageTrigger.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
  document.title = lang === 'en' ? 'Leqian Ying · Academic Homepage' : '应乐倩 · 学术主页';
  document.querySelector('meta[name="description"]').content = lang === 'en'
    ? 'Academic homepage of Leqian Ying: tumor microenvironment, cancer-associated fibroblasts, immunotherapy and translational research.'
    : '应乐倩的学术主页：肿瘤微环境、肿瘤相关成纤维细胞、免疫治疗与转化研究。';
  document.querySelector('.portrait-frame img').alt = lang === 'en' ? 'Portrait of Leqian Ying' : '应乐倩肖像';
  document.querySelector('.desktop-nav').setAttribute('aria-label', lang === 'en' ? 'Main navigation' : '主导航');
  document.querySelector('.mobile-nav').setAttribute('aria-label', lang === 'en' ? 'Mobile navigation' : '移动端导航');
  document.querySelector('.filters').setAttribute('aria-label', lang === 'en' ? 'Filter publications' : '筛选论文');
  document.querySelector('.skip').textContent = lang === 'en' ? 'Skip to main content' : '跳转到主要内容';
  document.querySelector('.brand').setAttribute('aria-label', lang === 'en' ? 'Leqian Ying, back to top' : '应乐倩，返回页首');
  paperLinkLabels.forEach(({link, zh}) => link.setAttribute('aria-label', lang === 'en'
    ? `Open publication: ${link.closest('.paper').querySelector('h3').textContent.trim()}` : zh));
  menuTrigger.setAttribute('aria-label', mobileNav.hidden
    ? (lang === 'en' ? 'Open navigation' : '打开导航')
    : (lang === 'en' ? 'Close navigation' : '关闭导航'));
  localStorage.setItem('leqian-language', lang);
}

setLanguage(localStorage.getItem('leqian-language') === 'en' ? 'en' : 'zh');
languageTrigger.addEventListener('click', () => setLanguage(root.lang === 'en' ? 'zh' : 'en'));
menuTrigger.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  menuTrigger.setAttribute('aria-expanded', String(willOpen));
  menuTrigger.setAttribute('aria-label', root.lang === 'en'
    ? (willOpen ? 'Close navigation' : 'Open navigation')
    : (willOpen ? '关闭导航' : '打开导航'));
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuTrigger.setAttribute('aria-expanded', 'false');
  menuTrigger.setAttribute('aria-label', root.lang === 'en' ? 'Open navigation' : '打开导航');
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.paper').forEach(paper => { paper.hidden = filter !== 'all' && paper.dataset.category !== filter; });
}));
