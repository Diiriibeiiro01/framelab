const demoLogin = get('login-dialog');
const demoForm = get('login-form');
const demoPassword = get('login-password');
const loginOpen = get('login-open');
const loginOut = get('login-out');
const loginStatus = get('login-status');
const loginVisibility = get('login-visibility');

function setPasswordVisibility(visible) {
  demoPassword.type = visible ? 'text' : 'password';
  loginVisibility.textContent = visible ? 'Ocultar senha' : 'Mostrar senha';
  loginVisibility.setAttribute('aria-pressed', String(visible));
}

loginOpen.addEventListener('click', () => demoLogin.showModal());
loginVisibility.addEventListener('click', () => setPasswordVisibility(demoPassword.type === 'password'));
demoLogin.addEventListener('close', () => {
  demoForm.reset();
  setPasswordVisibility(false);
  (loginOpen.hidden ? loginOut : loginOpen).focus();
});
demoForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!demoForm.reportValidity()) return;
  loginOpen.hidden = true;
  loginOut.hidden = false;
  activateTab(get('tab-inicio'));
  loginStatus.hidden = false;
  loginStatus.textContent = 'Você entrou no modo de demonstração.';
  demoLogin.close();
});
loginOut.addEventListener('click', () => {
  loginOut.hidden = true;
  loginOpen.hidden = false;
  loginStatus.hidden = true;
  loginOpen.focus();
});
