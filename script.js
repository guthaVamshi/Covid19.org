



// api url
var Names, data,DateToday,Yesterday,PreYesterday,DayBackYesterday; var NewCases=0; var sum = 0;var CasesTotal=0;
var val = new Array();
const api_url =
	"https://data.covid19india.org/v4/min/timeseries.min.json";
const State_api = "States.json"
// Defining async function
async function getapi(url) {

	// Storing response
	const response = await fetch(url);

	// Storing data in form of JSON
	data = await response.json();
	
	Names = Object.keys(data);


	if (response) {
		hideloader();
	}
	show(data);


}
async function getRes(url){
	res= await fetch(url);
StatesData = await res.json();
	
		StateName = Object.values(StatesData);
		StateAbb = Object.keys(StatesData);
	
};


function show() {


	let tab =
		`<tr class="table-dark DataTable">
			<th >State / UT</th>
			<th >New Cases</th>
			<th>Confirmed Cases</th>
			<th>Active Cases</th>
			<th>Recovered</th>
			<th>Deceased</th>
			</tr>`;

	// Loop to access all rows
	for (let i = 0; i < 38; i++) {
		 DateToday = new Date();
		 Yesterday = DateToday.getFullYear() + '-' + 0 + (DateToday.getMonth() + 1) + '-' + (DateToday.getDate() - 1);
		 PreYesterday = DateToday.getFullYear() + '-' + 0 + (DateToday.getMonth() + 1) + '-' + (DateToday.getDate() - 2);
		 DayBackYesterday = Object.keys(data[Names[i]]['dates'])[Object.keys(data[Names[i]]['dates']).length - 1];
		
		if (data[Names[i]]['dates'][Yesterday]) {
			CasesTotal = data[Names[i]]['dates'][Yesterday]['total']['confirmed'];
			Deceased = data[Names[i]]['dates'][Yesterday]['total']['deceased'];
			Recovered = data[Names[i]]['dates'][Yesterday]['total']['recovered'];

			active = CasesTotal - (Deceased + Recovered);
			NewCases = (data[Names[i]]['dates'][Yesterday]['total']['confirmed'])-(data[Names[i]]['dates'][PreYesterday]['total']['confirmed']);
			
			sum = sum + CasesTotal;
		} else {
			if (i == 34 ) {
				continue;
				
			}
			else {

			CasesTotal = data[Names[i]]['dates'][DayBackYesterday]['total']['confirmed'];
			Deceased = data[Names[i]]['dates'][DayBackYesterday]['total']['deceased'];
			Recovered = data[Names[i]]['dates'][DayBackYesterday]['total']['recovered'];
			active = CasesTotal - (Deceased + Recovered);
			sum = sum + CasesTotal;
			}
		}
		for (var j = 0; j < 38; j++) {

			for (var f = 0; f < 38; f++) {

				if (Names[j] == StateAbb[f]) {

					val[j] = StateName[f];

				}

			}
		}


		tab += `<tr ">
		<td>${val[i]} </td>
		<td class="text-danger">${NewCases}</tf>
		<td>${CasesTotal}</td >
		<td class="text-primary">${active}</td>
		<td class="text-success">${Recovered}</td>
		<td class="text-secondary">${Deceased}</td>

	
	  		
	</tr > `;

	}

	// Setting innerHTML as tab variable
	document.getElementById("DataTable").innerHTML = tab;

	TotalCases = data[Names[33]]['dates'][Yesterday]['total']['confirmed'];
	DeceasedCases=data[Names[33]]['dates'][Yesterday]['total']['deceased'];
	RecoveredCases = data[Names[33]]['dates'][Yesterday]['total']['recovered'];
	ActiveCases = TotalCases - (DeceasedCases + RecoveredCases);
	document.getElementById('Confirmed').innerHTML=TotalCases;
	document.getElementById('Active').innerHTML=ActiveCases;
	document.getElementById('Recovered').innerHTML=RecoveredCases;
	document.getElementById('Deceased').innerHTML=DeceasedCases;
	document.getElementById('DateId').innerHTML = DateToday.toLocaleString();
}

// Calling that async function
getapi(api_url);
getRes(State_api);
// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table




function F() {
	fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
		.then(response => response.json())
		.then(result => {

			// var date = document.getElementById('Date').value;
			// console.log(date);
			// var pre  = d.setDate(d.getDate());
			//console.log(pre.toLocaleString('fr'));
			var d = new Date(document.getElementById('Date').value);
			var date = document.getElementById('Date').value;

			var PreDate = new Date(d.setDate(d.getDate() - 1));

			var P = PreDate.getFullYear() + '-' + 0 + (PreDate.getMonth() + 1) + '-' + PreDate.getDate();

			var day2 = result['AP']['dates'][date]['total']['confirmed'];

			var day1 = result['AP']['dates'][P]['total']['confirmed'];
			console.log(day2 - day1);
		})
		.catch(error => console.log('error', error));

}

