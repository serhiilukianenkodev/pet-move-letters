const refs = {
  formEl: document.querySelector('.form'),
  outputField: document.querySelector('.area'),
  box: document.querySelector('.box'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
// refs.outputField.addEventListener('click', onLetterClick);
// refs.outputField.addEventListener('drag', onLetterDrag);
refs.box.addEventListener('mousedown', onMouseDown);
// refs.box.addEventListener('dragstart ', () => false);

function onFormSubmit(e) {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;
  console.log('🚀 ~ onFormSubmit ~ text:', text);
  createLetters(text);
  e.target.reset();
}

function createLetters(text) {
  const markup = text
    .split('')
    .map(letter => `<span class="letter">${letter}</span>`)
    .join('');

  refs.outputField.innerHTML = markup;
}

function onLetterClick(e) {
  const currentEl = e.target;
  if (e.target === e.currentTarget) return;

  toggleSelection(currentEl);
  console.log(currentEl);
}

function toggleSelection(el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
  } else {
    el.classList.add('selected');
  }

  console.dir(el);
}

// function onLetterDrag(e) {
//   const currentEl = e.target;
//   console.log(currentEl);

//   if (e.target === e.currentTarget) return;

//   if (!currentEl.classList.contains('selected')) return;

//   const x = e.x;
//   const y = e.y;
//   console.dir(e);
//   console.log('🚀 ~ onLetterDrag ~ x:', x);
//   console.log('🚀 ~ onLetterDrag ~ y:', y);
//   console.dir(currentEl);
//   if (!e.y || !e.x) return;

//   console.log(currentEl.offsetTop);
//   console.log(currentEl.offsetLeft);

//   currentEl.style.position = 'absolute';
//   currentEl.style.top = `${y - 70 - 24}px`;
//   currentEl.style.left = `${x - 24}px`;
//   console.log(currentEl.style.position);
// }

function onMouseDown(e) {
  const currentEl = e.target;
  console.log(currentEl);

  //   if (e.target === e.currentTarget) return;

  //   if (!currentEl.classList.contains('selected')) return;
  let shiftX = e.clientX - currentEl.getBoundingClientRect().left;
  let shiftY = e.clientY - currentEl.getBoundingClientRect().top;

  currentEl.style.position = 'absolute';
  currentEl.style.zIndex = 1000;
  document.body.append(currentEl);

  moveAt(e.pageX, e.pageY);

  // переносимо м’яч на координати (pageX, pageY)
  // додатково враховуючи початковий зсув відносно курсору миші
  function moveAt(pageX, pageY) {
    currentEl.style.left = pageX - shiftX + 'px';
    currentEl.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // пересуваємо м’яч при mousemove
  document.addEventListener('mousemove', onMouseMove);

  // відпускаємо м’яч, видаляємо непотрібні обробники подій
  currentEl.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    currentEl.onmouseup = null;
  };
}
