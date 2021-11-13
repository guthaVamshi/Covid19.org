



// api url
var Names, CasesJson, DateToday, PreYesterday, DayBackYesterday,PartiallyVaccinatedPercentage, population,StatesData, StateName, StateAbb; var NewCases = 0; var sum = 0; var CasesTotal = 0;
var val = new Array();
const api_url =
	"https://data.incovid19.org/v4/min/timeseries.min.json";
const State_api = "States.json"
// Defining async function
async function getapi(url) {

	// Storing response
	const response = await fetch(url);

	// Storing CasesJson in form of JSON
	CasesJson = await response.json();

	Names = Object.keys(CasesJson);


	
	getRes(State_api);


}
async function getRes(url) {
	res = await fetch(url);
	StatesData = await res.json();

	StateName = Object.values(StatesData);
	StateAbb = Object.keys(StatesData);

	
	getPop();
	
	
};
async function getPop(){
	var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "country": "india"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const res = await fetch("https://countriesnow.space/api/v0.1/countries/population", requestOptions);
result = await res.json();
 
	Lastpop = Object.values(result['data']['populationCounts'])[Object.values(result['data']['populationCounts']).length - 1];
	population = Lastpop['value'];
  show(CasesJson);
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
			<th>Total Vaccinated</th>
			</tr>`;

	// Loop to access all rows
	for (let i = 0; i < 38; i++) {
		DateToday = new Date();
		PreYesterday = Object.keys(CasesJson[Names[i]]['dates'])[Object.keys(CasesJson[Names[i]]['dates']).length - 2];
		DayBackYesterday = Object.keys(CasesJson[Names[i]]['dates'])[Object.keys(CasesJson[Names[i]]['dates']).length - 1];

		if (CasesJson[Names[i]]['dates'][DayBackYesterday]) {
			if (i == 34 || i ==33) {
				continue;

			}
			CasesTotal = CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['confirmed'];
			Deceased = CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['deceased'];
			Recovered = CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['recovered'];
			Vaccinated =  CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['vaccinated1']+(CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['vaccinated2']);
			active = CasesTotal - (Deceased + Recovered);
			
			NewCases = ((CasesJson[Names[i]]['dates'][DayBackYesterday]['total']['confirmed']) - (CasesJson[Names[i]]['dates'][PreYesterday]['total']['confirmed']));
		
		
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
		<td class="text-warning"><i class="fas fa-arrow-up"></i>${Vaccinated.toLocaleString('en-In')}</td>
	
	  		
	</tr > `;
		NewCases = 0;

	}

	// Setting innerHTML as tab variable
	document.getElementById("DataTable").innerHTML = tab;
	
DomUpdate();
	
}

function DomUpdate(){
	LastDayOfTotalCases = Object.keys(CasesJson[Names[33]]['dates'])[Object.keys(CasesJson[Names[33]]['dates']).length - 1];
	DayBeforeOfTotalCases = Object.keys(CasesJson[Names[33]]['dates'])[Object.keys(CasesJson[Names[33]]['dates']).length - 2];
	TotalCases = CasesJson[Names[33]]['dates'][LastDayOfTotalCases]['total']['confirmed'];
	DeceasedCases = CasesJson[Names[33]]['dates'][LastDayOfTotalCases]['total']['deceased'];
	RecoveredCases = CasesJson[Names[33]]['dates'][LastDayOfTotalCases]['total']['recovered'];
	ActiveCases = TotalCases - (DeceasedCases + RecoveredCases);
	vaccinated1 = CasesJson[Names[33]]['dates'][DayBackYesterday]['total']['vaccinated1'];
	PartiallyVaccinatedPercentage = (vaccinated1/population)*100;
	
	
	vaccinated2 = CasesJson[Names[33]]['dates'][DayBackYesterday]['total']['vaccinated2'];
	FullyVaccinatedPercentage = (vaccinated2/population)*100;
	TotalVaccines = vaccinated1 + vaccinated2;
	document.getElementById('Confirmed').innerHTML = TotalCases.toLocaleString('en-IN');
	document.getElementById('Active').innerHTML = ActiveCases.toLocaleString('en-IN');
	document.getElementById('Recovered').innerHTML = RecoveredCases.toLocaleString('en-IN');
	document.getElementById('Deceased').innerHTML = DeceasedCases.toLocaleString('en-IN');
	document.getElementById('DateId').innerHTML = DateToday.toLocaleString('en-IN');
	document.getElementById('Vaccines').innerHTML += TotalVaccines.toLocaleString('en-IN');
	document.getElementById('NewCases').innerHTML += ((TotalCases) - (CasesJson[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['confirmed'])).toLocaleString('en-IN');
	document.getElementById('NewRecovered').innerHTML += ((RecoveredCases) - (CasesJson[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['recovered'])).toLocaleString('en-IN');
	document.getElementById('NewDeceased').innerHTML += ((DeceasedCases) - (CasesJson[Names[33]]['dates'][DayBeforeOfTotalCases]['total']['deceased'])).toLocaleString('en-IN');
	document.getElementById('VaccinatedDose1').innerHTML += vaccinated1.toLocaleString('en-IN');
	document.getElementById('VaccinatedDose2').innerHTML += vaccinated2.toLocaleString('en-IN');
	document.getElementById('PercentageOfPartiallyVaccinated').innerHTML += PartiallyVaccinatedPercentage.toFixed(2)+'%';
	document.getElementById('PercentageOfFullyVaccinated').innerHTML += FullyVaccinatedPercentage.toFixed(2)+'%';
hideloader();
};
function hideloader() {
	document.getElementById('loading').style.display = 'none';
	
}




$(".change").on("click", function () {

	if ($("body").hasClass("dark")) {
		$("body").removeClass("dark");


	} else {
		$("body").addClass("dark");


	}
});






