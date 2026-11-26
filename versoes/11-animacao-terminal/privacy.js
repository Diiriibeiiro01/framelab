const privacyToggle = get('privacy-toggle');
const privacyPanel = get('privacy-panel');

privacyToggle.addEventListener('click', () => privacyPanel.showModal());
privacyPanel.addEventListener('close', () => privacyToggle.focus());

get('privacy-clear').addEventListener('click', () => {
  try {
    const keys = ['theme', 'page-color', 'program-links', ...accessibilityKeys];
    for (const key of keys) localStorage.removeItem('framelab-' + key);
  } catch {
    get('privacy-status').textContent = 'O navegador bloqueou o acesso ao armazenamento local.';
    return;
  }
  location.reload();
});
