const guideSlides = [...document.querySelectorAll('.guide-slide')];
let slideIndex = 0;
function changeSlide(offset) {
  slideIndex = (slideIndex + offset + guideSlides.length) % guideSlides.length;
  guideSlides.forEach((slide, index) => { slide.hidden = index !== slideIndex; });
  get('guide-counter').textContent = `${slideIndex + 1} de ${guideSlides.length}`;
}
get('guide-prev').addEventListener('click', () => changeSlide(-1));
get('guide-next').addEventListener('click', () => changeSlide(1));

const linkForm = get('link-form');
const linkStatus = get('link-status');
const savedList = get('saved-links');

function safeAddress(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

function readLinks() {
  try {
    const links = JSON.parse(localStorage.getItem('framelab-program-links') ?? '[]');
    return Array.isArray(links) ? links.filter(link => typeof link?.title === 'string' && safeAddress(link.url)) : [];
  } catch { return []; }
}

let savedLinks = readLinks();
function updateLinks(next, message) {
  savedLinks = next;
  try {
    localStorage.setItem('framelab-program-links', JSON.stringify(next));
    linkStatus.textContent = message;
  } catch {
    linkStatus.textContent = 'Alteração aplicada nesta página. O navegador bloqueou o armazenamento.';
  }
  renderLinks();
}

function renderLinks() {
  savedList.replaceChildren(...savedLinks.map((link, index) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.textContent = link.title;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remover';
    remove.setAttribute('aria-label', 'Remover ' + link.title);
    remove.addEventListener('click', () => {
      updateLinks(savedLinks.filter((_, position) => position !== index), 'Link removido.');
      (savedList.querySelectorAll('button')[index] ?? linkForm.elements.title).focus();
    });
    item.append(anchor, remove);
    return item;
  }));
}

linkForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = linkForm.elements.title.value.trim();
  const url = safeAddress(linkForm.elements.url.value.trim());
  if (!title || !url) {
    linkStatus.textContent = 'Informe um nome e um endereço válido que comece com https://.';
    return;
  }
  updateLinks([...savedLinks, {title, url}], 'Link adicionado.');
  linkForm.reset();
});
renderLinks();
