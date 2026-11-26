const root = document.documentElement;
const tabs = [...document.querySelectorAll('[role="tab"]')];

function showTab(id) {
  root.classList.toggle('terminal-mode', id === 'secreto' && !get('tab-secreto').hidden);
  if (get('read-tab')?.getAttribute('aria-pressed') === 'true') {
    window.speechSynthesis.cancel();
    resetReading();
  }
  for (const tab of tabs) {
    const panelId = tab.getAttribute('aria-controls');
    const active = !tab.hidden && panelId === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    get(panelId).hidden = !active;
  }
}

function activateTab(tab) {
  const id = tab.getAttribute('aria-controls');
  history.replaceState(null, '', '#' + id);
  showTab(id);
  tab.focus();
}

function syncTab() {
  const id = location.hash.slice(1);
  showTab(tabs.some(tab => !tab.hidden && tab.getAttribute('aria-controls') === id) ? id : 'inicio');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    const visibleTabs = tabs.filter(item => !item.hidden);
    const index = visibleTabs.indexOf(tab);
    const destinations = {
      ArrowLeft: (index + visibleTabs.length - 1) % visibleTabs.length,
      ArrowRight: (index + 1) % visibleTabs.length,
      Home: 0,
      End: visibleTabs.length - 1
    };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    activateTab(visibleTabs[destinations[event.key]]);
  });
});
window.addEventListener('hashchange', syncTab);
document.querySelectorAll('.hero-actions a, .home-tools a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const id = link.hash.slice(1);
    history.pushState(null, '', link.hash);
    showTab(id);
    get(id).focus();
  });
});
syncTab();

function loadPreference(key) {
  try { return localStorage.getItem('framelab-' + key); }
  catch { return null; }
}

function savePreference(key, value) {
  try { localStorage.setItem('framelab-' + key, value); }
  catch { /* Preferences still apply for the current page. */ }
}

const themeToggle = get('theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.textContent = theme === 'light' ? 'Tema escuro' : 'Tema claro';
}
const preferredTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
setTheme(loadPreference('theme') ?? preferredTheme);
themeToggle.addEventListener('click', () => {
  const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  savePreference('theme', theme);
});

const accessibility = get('a11y-toggle');
const accessibilityPanel = get('a11y-panel');
const accessibilityStatus = get('a11y-status');
accessibility.addEventListener('click', () => {
  accessibilityPanel.showModal();
  accessibility.setAttribute('aria-expanded', 'true');
});
accessibilityPanel.addEventListener('close', () => {
  accessibility.setAttribute('aria-expanded', 'false');
  accessibility.focus();
});

const accessibilityKeys = [
  'larger-text', 'high-contrast', 'reduce-motion',
  'more-spacing', 'underline-links', 'mark-focus'
];
for (const key of accessibilityKeys) {
  const input = get(key);
  input.checked = loadPreference(key) === 'true';
  function applyPreference() {
    root.classList.toggle(key, input.checked);
    savePreference(key, input.checked);
  }
  input.addEventListener('change', applyPreference);
  applyPreference();
}

const pageColor = get('page-color');
function applyPageColor() {
  document.body.dataset.pageColor = pageColor.value;
  savePreference('page-color', pageColor.value);
}
pageColor.value = loadPreference('page-color') || 'normal';
pageColor.addEventListener('change', applyPageColor);
applyPageColor();

const readTab = get('read-tab');
const speech = window.speechSynthesis;
const canRead = Boolean(speech && window.SpeechSynthesisUtterance);
readTab.disabled = !canRead;
if (!canRead) accessibilityStatus.textContent = 'A leitura em voz alta depende do navegador.';

function resetReading() {
  readTab.textContent = 'Ouvir aba atual';
  readTab.setAttribute('aria-pressed', 'false');
}
resetReading();
readTab.addEventListener('click', () => {
  if (readTab.getAttribute('aria-pressed') === 'true') {
    speech.cancel();
    resetReading();
    return;
  }
  const activePanel = document.querySelector('[role="tabpanel"]:not([hidden])');
  const content = [...activePanel.querySelectorAll('.section-title, .result, .guide-slide:not([hidden]) > div, .program-links')]
    .map(node => node.innerText)
    .join('. ');
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = 'pt-BR';
  utterance.onend = resetReading;
  utterance.onerror = resetReading;
  readTab.textContent = 'Parar leitura';
  readTab.setAttribute('aria-pressed', 'true');
  speech.speak(utterance);
});

get('a11y-reset').addEventListener('click', () => {
  for (const key of accessibilityKeys) {
    const input = get(key);
    input.checked = false;
    input.dispatchEvent(new Event('change'));
  }
  pageColor.value = 'normal';
  applyPageColor();
  speech?.cancel();
  resetReading();
  accessibilityStatus.textContent = 'Ajustes restaurados.';
});

const application = get('application');
const appResult = get('app-result');
const appForm = get('app-form');
const decimal = new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 2});
function resetAppResult() {
  get('app-task').textContent = application.value;
  appResult.textContent = 'Preencha os dois tempos para calcular a diferença.';
}
application.addEventListener('change', resetAppResult);
appForm.addEventListener('input', resetAppResult);
appForm.addEventListener('submit', event => {
  event.preventDefault();
  const before = get('app-before').valueAsNumber;
  const after = get('app-after').valueAsNumber;
  const difference = before - after;
  const percentage = Math.abs(difference) / before * 100;
  if (!Number.isFinite(percentage)) {
    appResult.textContent = 'Informe dois tempos válidos para comparar.';
    return;
  }
  if (difference === 0) {
    appResult.textContent = 'As duas configurações levaram o mesmo tempo.';
    return;
  }
  const direction = difference > 0 ? 'a menos' : 'a mais';
  appResult.textContent = `A outra configuração levou ${decimal.format(Math.abs(difference))} s ${direction} (${decimal.format(percentage)}% ${direction}).`;
});
resetAppResult();
