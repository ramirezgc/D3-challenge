let svgWidth = 960;
let svgHeight = 500;

let margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
}

let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

let svg = d3.select('body')
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
d3.csv("./assets/data/data.csv").then(function(censusData){
    console.log(censusData);

    censusData.forEach(function(selectedData){
        selectedData.poverty = +selectedData.poverty;
        selectedData.healthcare = +selectedData.healthcare;
    });

    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, selectedData => selectedData.poverty),
        d3.max(censusData, selectedData.poverty)])
        .range([0, chartWidth]);

    let yLinearScale = d3.selectedData()
        .domain([0,d3.max(censusData, selectedData => selectedData.healthcare)])
        .range([chartHeight,0]);
});
