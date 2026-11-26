const secretDialog = get('secret-dialog');
const secretCode = get('secret-code');
const secretPass = get('secret-pass');
const secretStatus = get('secret-status');
const secretTab = get('tab-secreto');
let typedCode = '';

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
});
