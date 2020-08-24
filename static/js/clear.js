document.getElementById('clear').onclick = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var rect = canvas.getBoundingClientRect();
  ctx.clearRect(rect.x, rect.y, canvas.width, canvas.height);

  document.getElementById('prediction').innerHTML = "&nbsp;";
  probabilityBarplot.data.datasets[0].data = [0,0,0,0,0,0,0,0,0,0];
  probabilityBarplot.update();
};
