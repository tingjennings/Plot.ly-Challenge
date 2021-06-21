// Create plots: bar chart and bubble chart
function createChart(id) {
    d3.json("samples.json").then((data) => {
        console.log(data)

        // Filter sample values by selected id
        var filteredSample = data.samples.filter(sample => sample.id === id)[0];
        console.log(filteredSample);
        // Get the top 10 OTUs
        var values = filteredSample.sample_values.slice(0, 10).reverse();
        var otuids = filteredSample.otu_ids.map(otuid => `OTU ${otuid}`).slice(0, 10).reverse();
        var otulabels = filteredSample.otu_labels.slice(0, 10).reverse();

        var trace1 = {
            x: values,
            y: otuids,
            hovertext: otulabels,
            type: "bar",
            orientation: "h",
        };

        var data1 = [trace1];
        var layout1 = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        var trace2 = {
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            mode: "markers",
            marker: {
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids
            },
            text: filteredSample.otu_labels
        };
        var layout2 = {
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 1000
        };
        var data2 = [trace2];
        Plotly.newPlot("bubble", data2, layout2);
    })
};

// Display the metadata
function displayMetadata(id) {
    d3.json("samples.json").then((data) => {
        var filteredMetadata = data.metadata.filter(sample => sample.id === id)[0];
        console.log(filteredMetadata);
        var sampleMetadata = d3.select("#sample-metadata");
        sampleMetadata.html("");
        Object.entries(filteredMetadata).forEach(function ([key, value]) {
            var row = sampleMetadata.append("tbody");
            row.text(`${key}: ${value}`);
        })

    })
}


// Create the function for changing event
function optionChanged(id) {
    createChart(id);
    displayMetadata(parseInt(id));
    createGaugeChart(parseInt(id));
}

// Create the default page
function init() {
    var dropdown = d3.select("#selDataset");
    // Generate the sample list to populate the select options
    d3.json("samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        createChart(data.names[0]);
        displayMetadata(parseInt(data.names[0]));
        createGaugeChart(parseInt(data.names[0]))
    });
}

// Initialize the dashboard
init();