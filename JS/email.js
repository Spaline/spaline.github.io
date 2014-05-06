Parse.initialize("o6UHd0P7UT2nyRw8Djmz8YwxG6copYOr2DjhGpoA", "1WDfNgPeu4d8Qc9bHyeNMVOPkvBVQ7mmYLnu53pD");

function sendConfirmationEmail(frm){

	var frm = document.getElementById('reservation-form');
	var rName = frm.firstname.value + " " + frm.lastname.value;
	var rDate = GetURLParams('date');
	var rTime = GetURLParams('time');
	var rSalon = GetURLParams('salon');
	var jsonOb = { name: rName,
				   email: String(frm.email.value),
				   phone: String(frm.phone.value),
				   date: String(rDate),
				   time: String(rTime),
				   salon: String(rSalon) };

	Parse.Cloud.run('sendConfirmationEmail', jsonOb, {
		success: function(confirm){
			console.log("email sent");
			alert("You have made your reservation! Check your email for confirmation.");
			return;
		},
		error: function(confirm){
			console.log("email didn't send");
			alert("There was an error reserving your time slot.");
			return;
		}
	});
}

function GetURLParams(sParam){
	var pageURL = window.location.search.substr(1);
	var URLvars = pageURL.split('&');
	for(var i=0; i < URLvars.length; i++)
	{
		var name = URLvars[i].split('=');
		if(name[0] == sParam)
		{
			var ret = name[1].replace(/%20/g, " ");
			ret = ret.replace(/%2D/g, "-");
			ret = ret.replace(/%3A/g, ":");
			ret = ret.replace(/%2C/g, ",");
			return ret;
		}
	}
}