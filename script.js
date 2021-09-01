



// api url
var Names, data, DateToday, PreYesterday, DayBackYesterday, StatesData, StateName, StateAbb; var NewCases = 0; var sum = 0; var CasesTotal = 0;
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
	getRes(State_api);


}
async function getRes(url) {
	res = await fetch(url);
	StatesData = await res.json();

	StateName = Object.values(StatesData);
	StateAbb = Object.keys(StatesData);

	show(data);
	LogData();
};

getapi(api_url);

function show() {


	let tab =
		`<tr class="DataTable">
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
		PreYesterday = Object.keys(data[Names[i]]['dates'])[Object.keys(data[Names[i]]['dates']).length - 2];
		DayBackYesterday = Object.keys(data[Names[i]]['dates'])[Object.keys(data[Names[i]]['dates']).length - 1];

		if (data[Names[i]]['dates'][DayBackYesterday]) {
			if (i == 34 || i ==33) {
				continue;

			}
			CasesTotal = data[Names[i]]['dates'][DayBackYesterday]['total']['confirmed'];
			Deceased = data[Names[i]]['dates'][DayBackYesterday]['total']['deceased'];
			Recovered = data[Names[i]]['dates'][DayBackYesterday]['total']['recovered'];
			
			active = CasesTotal - (Deceased + Recovered);
			
			NewCases = ((data[Names[i]]['dates'][DayBackYesterday]['total']['confirmed']) - (data[Names[i]]['dates'][PreYesterday]['total']['confirmed']));
		
		
		} 


		for (var j = 0; j < 38; j++) {

			for (var f = 0; f < 38; f++) {

				if (Names[j] == StateAbb[f]) {

					val[j] = StateName[f];

				}

			}
		}


		tab += `<tr>
		
		<td >${val[i]} </td>
		<td class="text-danger"><i class="fas fa-arrow-up"></i> ${NewCases.toLocaleString('en-IN')}</tf>
		<td>${CasesTotal.toLocaleString('en-IN')}</td >
		<td class="text-primary">${active.toLocaleString('en-IN')}</td>
		<td class="text-success"><i class="fas fa-arrow-up"></i> ${Recovered.toLocaleString('en-IN')}</td>
		<td class="text-secondary"><i class="fas fa-arrow-up"></i> ${Deceased.toLocaleString('en-IN')}</td>

	
	  		
	</tr > `;
		NewCases = 0;

	}

	// Setting innerHTML as tab variable
	document.getElementById("DataTable").innerHTML = tab;
DomUpdate();
	
}

function DomUpdate(){
	LastDayOfTotalCases = Object.keys(data[Names[33]]['dates'])[Object.keys(data[Names[33]]['dates']).length - 1];
	DayBeforeOfTotalCases = Object.keys(data[Names[33]]['dates'])[Object.keys(data[Names[33]]['dates']).length - 2];
	TotalCases = data[Names[33]]['dates'][LastDayOfTotalCases]['total']['confirmed'];
	DeceasedCases = data[Names[33]]['dates'][LastDayOfTotalCases]['total']['deceased'];
	RecoveredCases = data[Names[33]]['dates'][LastDayOfTotalCases]['total']['recovered'];
	ActiveCases = TotalCases - (DeceasedCases + RecoveredCases);
	vaccinated1 = data[Names[33]]['dates'][DayBackYesterday]['total']['vaccinated1'];

	vaccinated2 = data[Names[33]]['dates'][DayBackYesterday]['total']['vaccinated2'];
	
	TotalVaccines = vaccinated1 + vaccinated2;
	document.getElementById('Confirmed').innerHTML = TotalCases.toLocaleString('en-IN');
	document.getElementById('Active').innerHTML = ActiveCases.toLocaleString('en-IN');
	document.getElementById('Recovered').innerHTML = RecoveredCases.toLocaleString('en-IN');
	document.getElementById('Deceased').innerHTML = DeceasedCases.toLocaleString('en-IN');
	document.getElementById('DateId').innerHTML = DateToday.toLocaleString('en-IN');
	document.getElementById('Vaccines').innerHTML += TotalVaccines.toLocaleString('en-IN');
	document.getElementById('NewCases').innerHTML += ((TotalCases) - (data[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['confirmed'])).toLocaleString('en-IN');
	document.getElementById('NewRecovered').innerHTML += ((RecoveredCases) - (data[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['recovered'])).toLocaleString('en-IN');
	document.getElementById('NewDeceased').innerHTML += ((DeceasedCases) - (data[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['deceased'])).toLocaleString('en-IN');
	document.getElementById('VaccinatedDose1').innerHTML += vaccinated1.toLocaleString('en-IN');
	document.getElementById('VaccinatedDose2').innerHTML += vaccinated2.toLocaleString('en-IN');
};
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}

function LogData() {

}

$(".change").on("click", function () {

	if ($("body").hasClass("dark")) {
		$("body").removeClass("dark");


	} else {
		$("body").addClass("dark");


	}
});






