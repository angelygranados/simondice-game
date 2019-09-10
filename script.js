const container = document.querySelector('.container');
const keys = document.querySelectorAll('.key');
const panda = document.querySelector('.panda');
const eyes = document.querySelectorAll('.eye');
const features = document.querySelectorAll('.feature');
const leftear = document.querySelector('.leftear');
const rightear = document.querySelector('.rightear');
const mouth = document.querySelector('.mouth');

const synth = new Tone.Synth();
const gain = new Tone.Gain(0.5);
gain.toMaster();
synth.connect(gain);

const calcValue = (mouse, width) => {
  return (mouse / width * limit - limit / 2).toFixed(1);
};

const setContainerSize = () => {
  let size = window.innerHeight / 100 * 90;
  if (size > window.innerWidth) {
    size = window.innerWidth / 100 * 90;
  }
  container.style.height = `${size}px`;
  container.style.width = `${size}px`;
};

setContainerSize();


let resizeTimeout;
window.addEventListener('resize', () => {
  if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
  resizeTimeout = window.requestAnimationFrame(() => {
    setContainerSize();
  });
}, false);

const limit = 15;
let timeout;
window.addEventListener('mousemove', event => {
  if (timeout) window.cancelAnimationFrame(timeout);

  panda.classList.remove('idle');

  timeout = window.requestAnimationFrame(() => {
    let xValue = calcValue(event.x, window.innerWidth);
    let yValue = calcValue(event.y, window.innerHeight);

    [...features].forEach(feature => {
      feature.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
    });

    [...eyes].forEach(eye => {
      eye.setAttribute('ry', '7.5');
      eye.style.transform = `translateX(${xValue * 2}px) translateY(${yValue * 2}px)`;
    });

    leftear.style.transform = `translateX(${-xValue * 0.7}px) translateY(${-yValue * 0.7}px)`;
    rightear.style.transform = `translateX(${-xValue * 0.7}px) translateY(${-yValue * 0.7}px)`;
  });
}, false);

