const programSearch = document.getElementById('app-search');
const programQuery = document.getElementById('app-query');
const programCards = [...document.querySelectorAll('#app-catalog article')];
const normalizeSearch = text => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

function filterPrograms() {
  const terms = normalizeSearch(programQuery.value).trim().split(/\s+/);
  let matches = 0;
  for (const card of programCards) {
    const description = normalizeSearch(card.textContent);
    card.hidden = !terms.every(term => description.includes(term));
    if (!card.hidden) matches++;
  }
  document.getElementById('app-search-count').textContent =
    matches ? `${matches} ${matches === 1 ? 'categoria encontrada' : 'categorias encontradas'}` : 'Nenhuma categoria encontrada.';
}
programSearch.addEventListener('submit', event => event.preventDefault());
programQuery.addEventListener('input', filterPrograms);
filterPrograms();

const contactForm = document.getElementById('contact-form');
const contactPreview = document.getElementById('contact-preview');
const contactDownload = document.getElementById('contact-download');
const contactStatus = document.getElementById('contact-status');
contactForm.addEventListener('input', () => {
  contactPreview.hidden = true;
  contactDownload.hidden = true;
  contactStatus.textContent = '';
});
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = fields.get('name').trim();
  const subject = fields.get('subject').trim();
  const message = fields.get('message').trim();
  if (!name || !subject || !message) {
    contactStatus.textContent = 'Preencha nome, assunto e mensagem.';
    return;
  }
  contactPreview.textContent = [`Nome: ${name}`, `E-mail: ${fields.get('email')}`, `Assunto: ${subject}`, '', message].join('\n');
  contactPreview.hidden = false;
  contactDownload.hidden = false;
  contactStatus.textContent = 'Mensagem pronta para baixar.';
});
contactDownload.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([contactPreview.textContent], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mensagem-framelab.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
