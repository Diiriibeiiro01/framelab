const secretDialog = get('secret-dialog');
const secretCode = get('secret-code');
const secretPass = get('secret-pass');
const secretStatus = get('secret-status');
const secretTab = get('tab-secreto');
let typedCode = '';
const terminalIntro = get('terminal-intro');
let introTimeout;

terminalIntro.addEventListener('close', () => {
  clearTimeout(introTimeout);
  if (location.hash === '#secreto') secretTab.focus();
});

function playTerminalIntro() {
  if (root.classList.contains('reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  terminalIntro.showModal();
  introTimeout = setTimeout(() => terminalIntro.close(), 1950);
}

function openSecret(code = '') {
  secretCode.value = code;
  secretPass.value = '';
  secretStatus.textContent = '';
  secretDialog.showModal();
  (code ? secretPass : secretCode).focus();
}

get('secret-trigger').addEventListener('click', () => openSecret());
document.addEventListener('keydown', event => {
  if (!secretTab.hidden || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey ||
      !/^[a-z]$/i.test(event.key) || document.querySelector('dialog[open]') ||
      (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable]'))) {
    typedCode = '';
    return;
  }
  typedCode = (typedCode + event.key.toUpperCase()).slice(-5);
  if (typedCode === 'TEUZN') {
    typedCode = '';
    openSecret('TEUZN');
  }
});

get('secret-form').addEventListener('submit', event => {
  event.preventDefault();
  if (secretCode.value.trim().toUpperCase() !== 'TEUZN' ||
      secretPass.value.trim().toUpperCase() !== 'FRAMELAB') {
    secretStatus.textContent = 'Código ou palavra-passe incorretos.';
    return;
  }
  secretPass.value = '';
  secretDialog.close();
  secretTab.hidden = false;
  activateTab(secretTab);
  playTerminalIntro();
});
