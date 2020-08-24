document.getElementById('save').onclick = function() {
  var csrf = $('input[name=csrfmiddlewaretoken]').val()
  var digitImage = document.getElementById("canvas").toDataURL('image/jpeg');
  digitImage = digitImage.replace(/^data:image\/(png|jpeg);base64,/, '');

  jQuery.ajax({
    type: "POST",
    url: 'result/',
    data: {
      csrfmiddlewaretoken: csrf,
      "digitImage": digitImage
    },
    success: function(response) {
      console.log(response.classified_as)
      document.getElementById('prediction').innerHTML = "Classified as: " + response.classified_as.toString();
      probabilityBarplot.data.datasets[0].data = response.probabilities;
      probabilityBarplot.update();
    }
  });
};
