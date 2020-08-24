window.addEventListener("load", () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d')
  var rect = canvas.getBoundingClientRect();
  ctx.translate(-rect.x, -rect.y)
  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "white";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    console.log(rect)
    console.log(rect.y);
  }

  function translateCanvasResize(e) {
    var rect2 = canvas.getBoundingClientRect();
    ctx.translate(rect.x-rect2.x, rect.y-rect2.y)
    rect = rect2
  }

  function translateCanvasScroll(e) {
    var rect2 = canvas.getBoundingClientRect();
    ctx.translate(rect.x-rect2.x, rect.y-rect2.y)
    rect = rect2
  }
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mouseout', finishedPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', finishedPosition);
  canvas.addEventListener('touchmove', draw);
  window.addEventListener('resize', translateCanvasResize);
  window.addEventListener('scroll', translateCanvasScroll);
});
