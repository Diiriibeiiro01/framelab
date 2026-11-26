const root = document.documentElement;
const tabs = [...document.querySelectorAll('[role="tab"]')];

function showTab(id) {
  for (const tab of tabs) {
    const panelId = tab.getAttribute('aria-controls');
    const active = panelId === id;
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
  showTab(tabs.some(tab => tab.getAttribute('aria-controls') === id) ? id : 'fps');
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    const destinations = {
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      ArrowRight: (index + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1
    };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    activateTab(tabs[destinations[event.key]]);
  });
});
window.addEventListener('hashchange', syncTab);
document.querySelectorAll('.hero-actions a').forEach(link => {
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
accessibility.addEventListener('click', () => {
  const panel = get('a11y-panel');
  panel.hidden = !panel.hidden;
  accessibility.setAttribute('aria-expanded', String(!panel.hidden));
  if (!panel.hidden) get('larger-text').focus();
});
get('a11y-panel').addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    accessibility.click();
    accessibility.focus();
  }
});
for (const key of ['larger-text', 'high-contrast', 'reduce-motion']) {
  const input = get(key);
  input.checked = loadPreference(key) === 'true';
  root.classList.toggle(key, input.checked);
  input.addEventListener('change', () => {
    root.classList.toggle(key, input.checked);
    savePreference(key, input.checked);
  });
}

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
