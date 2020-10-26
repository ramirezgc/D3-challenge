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

    censusData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.poverty),
        d3.max(censusData, d => d.poverty)])
        .range([0, chartWidth]);

    let yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(censusData, d => d.healthcare)])
        .range([chartHeight,0]);

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    let drawLine = d3.line()
        .x(selectedData => xLinearScale(selectedData.poverty))
        .y(selectedData => yLinearScale(selectedData.healthcare));
    
    // X Axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
    
    // Y Axis
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis)

    
});
