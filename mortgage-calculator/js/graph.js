google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
	var d_data = [['Year','Mortgage','Savings']];
	/*Mortgage Info */
	var year = 2016;
	var years = parseInt(document.getElementById('term-input').value);
	var mortgage = parseInt(document.getElementById('home-cost-input').value);
	var percentDown = parseInt(document.getElementById('percent-down-input').value) / 100;
	var rate = parseFloat(document.getElementById('apr-input').value) / 100 / 12; //montly rate = APR/12
	/*Savings*/
	var saved = 0;
	var monthlySavings = parseInt(document.getElementById('savings-input').value);
	var monthlySavingsGrowth = parseFloat(document.getElementById('savings-growth-input').value) / 100 / 12;
	/*Spending*/
	var monthlySpending = parseInt(document.getElementById('spending-input').value);
	var timePeriod = parseInt(document.getElementById('time-period-input').value);
	//Subtract down payment
	mortgage -= percentDown * mortgage;
	// m = P * r * { (1+r)^n } / { (r-1)^n }
	var monthlyPayment = mortgage * rate * Math.pow(1+rate,years*12) / (Math.pow(1+rate,years*12) - 1);

	//Summary
	document.getElementById("monthly-mortgage").innerHTML = monthlyPayment.toFixed(2);
	var monthlyCost = monthlyPayment + monthlySavings + monthlySpending;
	document.getElementById("monthly-cost").innerHTML = monthlyCost.toFixed(2);
	document.getElementById("yearly-cost").innerHTML = (12*monthlyCost).toFixed(2);


	var yearStr = '';
	var months = ['Jan','Feb','May','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	for (i=0;i<timePeriod*12;i++) {
	        mortgage -= monthlyPayment;
	        mortgage *= 1 + rate;
	        saved *= monthlySavingsGrowth + 1
	        saved += monthlySavings;
	        //Check that mortgage is paid
	        if(mortgage < 0) {mortgage = 0}
	        //change year string

	        // if(i % 12 === 0) { yearStr = ''+ (year + i/12);} 
	        // else { yearStr = (i%12)+'-'+ (year+ Math.floor(i/12)); }
	        yearStr = months[i%12]+' '+ (year+ Math.floor(i/12));
	        // console.log(mortgage.toFixed(2),typeof(mortgage.toFixed(2)));
	        d_data.push( [(yearStr),Math.floor(mortgage),Math.floor(saved)] );
	    };
	    var data = google.visualization.arrayToDataTable(d_data);

	var options = {
	 isStacked: true,
	  title: 'Cost Breakdown',
	  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
	  vAxis: {minValue: 0}
	};

	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}