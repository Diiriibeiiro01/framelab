const processors = {
  'Ryzen 5 3400G': 0.62, 'Core i5-10400F': 0.83, 'Ryzen 5 3600': 0.85,
  'Ryzen 5 5600': 0.98, 'Core i5-12400F': 1, 'Ryzen 7 5700X': 1.02,
  'Ryzen 7 5700X3D': 1.21, 'Ryzen 5 7600': 1.27, 'Ryzen 7 7800X3D': 1.58
};
const graphics = {
  'GTX 1650': 0.27, 'GTX 1660 Super': 0.39, 'RTX 2060': 0.48,
  'RX 6600': 0.57, 'RTX 3060': 0.61, 'RX 7600': 0.69, 'RTX 4060': 0.71,
  'RTX 5060': 0.88, 'RTX 3080': 1, 'RTX 3080 Ti': 1.12, 'RTX 4070 Super': 1.18,
  'RX 7800 XT': 1.19, 'RTX 5070': 1.23, 'RTX 5080': 1.78
};
// Approximate CPU and GPU limits at 1080p on the medium preset.
const games = {
  'Valorant': [235, 480], 'Counter-Strike 2': [220, 315], 'Fortnite': [185, 225],
  'GTA V Legacy': [155, 195], 'Forza Horizon 5': [175, 155],
  'Cyberpunk 2077': [125, 112], 'Warzone': [140, 145]
};
const services = [
  ['Limpeza interna + pasta térmica', 90, 160], ['Montagem de PC', 300, null],
  ['Formatação e instalação do sistema', 95, 150], ['Diagnóstico técnico', 80, 120],
  ['Instalação de peça ou upgrade', 100, 200]
];
const get = id => document.getElementById(id);
const money = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL', maximumFractionDigits:0});
function fill(id, data, selected) {
  for (const name of Object.keys(data)) get(id).add(new Option(name, name, false, name === selected));
}
function estimate(event) {
  event?.preventDefault();
  const game = get('game').value;
  const resolution = get('resolution').value;
  const quality = get('quality').value;
  const [cpuLimit, gpuLimit] = games[game];
  const resolutionFactor = {'1080p':1,'1440p':0.77,'2160p':0.49}[resolution];
  const qualityFactor = {'Baixa':1.23,'Média':1,'Alta':0.83,'Ultra':0.67}[quality];
  const ramFactor = get('ram').value === '8 GB' ? 0.82 : 1;
  const fps = Math.min(cpuLimit * processors[get('cpu').value], gpuLimit * graphics[get('gpu').value] * resolutionFactor * qualityFactor) * ramFactor;
  get('fps-range').textContent = `${Math.round(fps * 0.88)}–${Math.round(fps * 1.12)}`;
  get('fps-context').textContent = `${game} · ${resolution} · Qualidade ${quality.toLowerCase()}`;
  get('fps-meter').style.width = `${Math.min(fps / 240, 1) * 100}%`;
}
function formatRange(min, max) {
  return max === null ? `A partir de ${money.format(min)}` : `${money.format(min)} – ${money.format(max)}`;
}
function quote() {
  const picked = [...get('services').querySelectorAll('input:checked')].map(input => services[Number(input.value)]);
  const min = picked.reduce((sum, item) => sum + item[1], 0);
  const max = picked.some(item => item[2] === null) ? null : picked.reduce((sum, item) => sum + item[2], 0);
  get('quote-total').textContent = picked.length ? formatRange(min, max) : money.format(0);
  get('quote-count').textContent = picked.length ? `${picked.length} ${picked.length === 1 ? 'serviço selecionado' : 'serviços selecionados'}` : 'Selecione um serviço para começar.';
}
fill('cpu', processors, 'Core i5-12400F');
fill('gpu', graphics, 'RTX 3080');
fill('game', games, 'Valorant');
get('fps-form').addEventListener('submit', estimate);
get('fps-form').addEventListener('change', estimate);
services.forEach(([name, min, max], index) => {
  const label = document.createElement('label');
  label.className = 'service';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = index;
  const title = document.createElement('span');
  title.textContent = name;
  const price = document.createElement('small');
  price.textContent = formatRange(min, max);
  label.append(input, title, price);
  get('services').append(label);
});
get('services').addEventListener('change', quote);
estimate();
