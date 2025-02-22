const refs = {
  formEl: document.querySelector('.form'),
  outputField: document.querySelector('.area'),
  //   box: document.querySelector('.box'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
// refs.outputField.addEventListener('click', onLetterClick);
refs.outputField.addEventListener('mousedown', onMouseDown);
// refs.box.addEventListener('mousedown', onMouseDown);
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
    .map(letter => `<div class="letter">${letter}</div>`)
    .join('');

  refs.outputField.innerHTML = markup;
}

// function onLetterClick(e) {
//   const currentEl = e.target;
//   if (e.target === e.currentTarget) return;

//   toggleSelection(currentEl);
//   console.log(currentEl);
// }

// function toggleSelection(el) {
//   if (el.classList.contains('selected')) {
//     el.classList.remove('selected');
//   } else {
//     el.classList.add('selected');
//   }
// }

function onMouseDown(e) {
  const currentEl = e.target;
  // console.log(currentEl);

  if (e.target === e.currentTarget) return;

  const boxLeftPos = currentEl.getBoundingClientRect().left;
  const boxTopPos = currentEl.getBoundingClientRect().top;
  // const boxRightPos = currentEl.getBoundingClientRect().right;
  // const boxBottomPos = currentEl.getBoundingClientRect().bottom;
  const boxWidth = currentEl.getBoundingClientRect().width;
  const boxHeigth = currentEl.getBoundingClientRect().height;
  const bodyWidth = refs.outputField.getBoundingClientRect().width;
  const bodyHeight = refs.outputField.getBoundingClientRect().bottom;
  // console.log(boxHeigth, boxWidth);

  //   if (!currentEl.classList.contains('selected')) return;
  let shiftX = e.clientX - boxLeftPos;
  let shiftY = e.clientY - boxTopPos;

  currentEl.style.position = 'absolute';
  //   currentEl.style.zIndex = 1000;
  //   refs.outputField.append(currentEl);

  //   moveAt(e.pageX, e.pageY);

  // переносимо м’яч на координати (pageX, pageY)
  // додатково враховуючи початковий зсув відносно курсору миші
  function moveAt(pageX, pageY) {
    const leftPos = pageX - shiftX - 8;
    const topPos = pageY - shiftY - 80;
    const rightPos = leftPos + boxWidth;
    const bottomPos = topPos + boxHeigth;
    // console.log(leftPos, topPos, rightPos, bottomPos);

    // console.log(bodyWidth, bodyHeight);

    if (
      leftPos < 0 ||
      topPos < 0 ||
      rightPos > bodyWidth ||
      bottomPos > bodyHeight - 80
    )
      return;

    currentEl.style.left = leftPos + 'px';
    currentEl.style.top = topPos + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // пересуваємо м’яч при mousemove
  document.addEventListener('mousemove', onMouseMove);

  // відпускаємо м’яч, видаляємо непотрібні обробники подій
  window.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    currentEl.onmouseup = null;
  };
}
