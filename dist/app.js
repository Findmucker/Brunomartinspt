'use strict';

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const phone = '351913127319';
const form = $('#contact-form');
const goal = $('#goal');
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
const focusOptions = $$('.focus-option');
const focusDescriptions = {
  'Ganhar força e massa muscular': 'Vamos construir uma base sólida, trabalhar a técnica e dar espaço à progressão.',
  'Melhorar a condição física': 'Vamos encontrar um ritmo de treino que te ajude a mexer mais e a sentir mais energia.',
  'Criar uma rotina e voltar a treinar': 'Vamos começar pelo que consegues manter e transformar pequenos passos numa rotina.'
};

function setMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuToggle.addEventListener('click', () => setMenu(mobileNav.hidden));
$$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});
window.matchMedia('(min-width:961px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

function selectGoal(value) {
  goal.value = value;
  focusOptions.forEach(button => {
    const selected = button.dataset.goal === value;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  $('#focus-feedback-text').textContent = focusDescriptions[value] || 'Conta-me o que procuras e percebemos juntos qual o próximo passo.';
  invalidateMessage();
}
focusOptions.forEach(button => button.addEventListener('click', () => selectGoal(button.dataset.goal)));
goal.addEventListener('change', () => selectGoal(goal.value));
$$('[data-mode]').forEach(link => link.addEventListener('click', () => {
  $$('input[name="mode"]').forEach(input => { input.checked = input.value === link.dataset.mode; });
  invalidateMessage();
}));

function prepareMessage() {
  const name = $('#name').value.trim();
  const mode = $('input[name="mode"]:checked', form).value;
  const notes = $('#message').value.trim();
  return [
    'Olá, Bruno!' + (name ? ` O meu nome é ${name}.` : ''),
    'Gostava de saber mais sobre o teu acompanhamento.',
    `O meu objetivo: ${goal.value}.`,
    `Formato que procuro: ${mode}.`,
    ...(notes ? ['', notes] : []),
    '',
    'Podemos falar sobre as opções, os valores e a disponibilidade?'
  ].join('\n');
}

function invalidateMessage() {
  $('#message-preview').hidden = true;
  $('#whatsapp-submit').hidden = true;
  $('.form-submit').hidden = false;
  $('#form-status').textContent = '';
}
form.addEventListener('input', invalidateMessage);
form.addEventListener('change', invalidateMessage);
form.addEventListener('submit', event => {
  event.preventDefault();
  const message = prepareMessage();
  $('#prepared-message').textContent = message;
  $('#whatsapp-submit').href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  $('#message-preview').hidden = false;
  $('#whatsapp-submit').hidden = false;
  $('.form-submit').hidden = true;
  $('#form-status').textContent = 'Mensagem preparada. Podes rever o texto e abrir o WhatsApp para enviar.';
  $('#whatsapp-submit').focus({ preventScroll: true });
});

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 3500);
}
$('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#prepared-message').textContent);
    toast('Mensagem copiada.');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('#prepared-message'));
    selection.removeAllRanges();
    selection.addRange(range);
    toast('Selecionámos o texto para poderes copiar.');
  }
});

const privacyDialog = $('#privacy-dialog');
$('#privacy-open').addEventListener('click', () => privacyDialog.showModal());
$$('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => privacyDialog.close()));
privacyDialog.addEventListener('click', event => {
  const bounds = privacyDialog.getBoundingClientRect();
  if (event.target === privacyDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) privacyDialog.close();
});
$('#year').textContent = new Date().getFullYear();
