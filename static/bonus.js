// Create gauge chart
function createGaugeChart(id) {
    d3.json("samples.json").then((data) => {
        // Filter sample values by selected id

        var filteredMetadata = data.metadata.filter(sample => sample.id === id)[0];
        var wfreq = filteredMetadata.wfreq;
        console.log(wfreq);

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: parseFloat(wfreq),
              title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "azure"},
                borderwidth: 2,
                bordercolor: "silver",
                steps: [
                  { range: [0, 1], color: "firebrick" },
                  { range: [1, 2], color: "red" },
                  { range: [2, 3], color: "orange" },
                  { range: [3, 4], color: "gold" },
                  { range: [4, 5], color: "yellow" },
                  { range: [5, 6], color: "lightyellow" },
                  { range: [6, 7], color: "lightgreen" },
                  { range: [7, 8], color: "green" },
                  { range: [8, 9], color: "darkgreen" }
                ]},
            }
          ];
          var layout = {
              width: 400,
              height: 350,
              margin: { t: 50, r: 25, l: 25, b: 25 },
          };
          Plotly.newPlot("gauge", data, layout);

    })
}