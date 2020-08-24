window.probabilityBarplot = new Chart(myChart, {
    type: 'bar',
    data: {
      labels:['0','1','2','3','4','5','6','7','8','9'],
      datasets:[{
        label: 'Probability',
        data: [0,0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(245, 171, 53, 0.7)',
      }]
    },
    options: {
      responsive: false,
      title:{
        display:true,
        text:'Prediction Probabilities'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Probability (out of 100)'
          },
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 10,
            max: 100
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Classification Label'
          }
        }]
      },
      legend:{
        display:false,
        position:'right',
        labels:{
          fontColor:'#000'
        }
      }
    }
  });
