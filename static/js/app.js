function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metaUrl = `/metadata/${sample}`
  d3.json(metaUrl).then(function (metaData) {
    console.log(metaData);
    
    //     // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select('#sample-metadata');
    //     // Use `.html("") to clear any existing metadata
    panel.html(" ");

    panel.append('p').html(`AGE: ${metaData.AGE}`);
    panel.append('p').html(`BBTYPE: ${metaData.BBTYPE}`);
    panel.append('p').html(`ETHNICITY: ${metaData.ETHNICITY}`);
    panel.append('p').html(`GENDER: ${metaData.Gender}`);
    panel.append('p').html(`LOCATION: ${metaData.LOCATION}`);
    panel.append('p').html(`WFREQ: ${metaData.WFREQ}`);
    panel.append('p').html(`sample: ${sample}`);


  });

}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`
  d3.json(url).then(function (data) {
    // console.log(data);
    var values = data.sample_values.slice(0, 10);
    var colors = (data.otu_ids).map(c=>c/200)
    var labels = data.otu_labels.slice(0, 10);
    // console.log(labels);
    console.log(colors)

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      hovertext: labels,
      marker: {
        size: data.sample_values,
        color: colors 
      }
    };

    // Use otu_ids for the marker colors???
    // Use otu_labels for the text values????
    var bubbleData = [trace1];

    var layout = {
      // title: 'bubble chart',
      showlegend: false,
      xaxis:{title:"OTU ID"}
      // height: 600,
      // width: 600
    };

    Plotly.newPlot('bubble', bubbleData, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var values = data.sample_values.slice(0, 10);
    var labels = data.otu_ids.slice(0,10)
    var hover = data.otu_labels.slice(0, 10);
    var trace2 = {
      labels: labels,
      values: values,
      hovertext: hover,
      hovermode:'closest',
      hole: .4,
      type: 'pie'
    };
    var pieData = [trace2];
    var layout = {
    };
    Plotly.newPlot("pie", pieData, layout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
// Initialize the dashboard
init();
;
