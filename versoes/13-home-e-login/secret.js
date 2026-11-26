const secretDialog = get('secret-dialog');
const secretCode = get('secret-code');
const secretStatus = get('secret-status');
const secretTab = get('tab-secreto');
const unlockCode = 'CRACK';
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
  introTimeout = setTimeout(() => terminalIntro.close(), 4300);
}

function unlockSecret() {
  if (secretDialog.open) secretDialog.close();
  secretTab.hidden = false;
  activateTab(secretTab);
  playTerminalIntro();
}

get('secret-trigger').addEventListener('click', () => {
  if (!secretTab.hidden) {
    activateTab(secretTab);
    return;
  }
  secretCode.value = '';
  secretStatus.textContent = '';
  secretDialog.showModal();
});
document.addEventListener('keydown', event => {
  if (!secretTab.hidden || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey ||
      !/^[a-z]$/i.test(event.key) || document.querySelector('dialog[open]') ||
      (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable]'))) {
    typedCode = '';
    return;
  }
  typedCode = (typedCode + event.key.toUpperCase()).slice(-unlockCode.length);
  if (typedCode === unlockCode) {
    typedCode = '';
    unlockSecret();
  }
});

get('secret-form').addEventListener('submit', event => {
  event.preventDefault();
  if (secretCode.value.trim().toUpperCase() !== unlockCode) {
    secretStatus.textContent = 'Código incorreto.';
    return;
  }
  unlockSecret();
});
