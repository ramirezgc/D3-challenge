let svgWidth = 1200;
let svgHeight = 600;

let margin = {
    top: 20,
    right: 60,
    bottom: 20,
    left: 120
}

let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

let svg = d3.select('#scatter')
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
        .domain([d3.min(censusData, d => d.poverty)*0.9, d3.max(censusData, d => d.poverty)*1.10])
        .range([0, chartWidth]);

    let yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(censusData, d => d.healthcare)])
        .range([chartHeight,0]);

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    let drawLine = d3.line()
        .x(selectedData => xLinearScale(selectedData.poverty))
        .y(selectedData => yLinearScale(selectedData.healthcare));
    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);   

    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 12)
        .attr("fill", "blue")
        .attr("opacity", ".6");

    chartGroup.selectAll("text.text-circles")
        .data(censusData)
        .enter()
        .append("text")
        .classed("text-circles",true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("font-size","10px")
        .attr("fill", "white");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("y", chartHeight + margin.bottom / 2)
        .attr("x", chartWidth / 2)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("In Poverty (%)");

});
