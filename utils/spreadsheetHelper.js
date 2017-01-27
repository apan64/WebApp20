var auth = require('./../auth.js');
var coffee = require('coffee-script/register');
var gapi = require('gapi');


function addToSpreadsheet(purchase) {
	var CLIENT_ID = auth.googleSheetsClientID;
	var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

	function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
          // });
      }

    function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

	function loadSheetsAPI(){
		var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
		gapi.client.load(discoveryUrl);
		spreadsheets.values.append(spreadsheetID = auth.spreadsheetID, range = 'Sheet1', includeValuesInResponse = true, insertDataOption = 'INSERT_ROWS', responseDateTimeRenderOption = 'FORMATTED_STRING', 
			responseValueRenderOption = 'FORMATTED_VALUE', valueInputOption = 'USER_ENTERED', fields = 'spreadsheetID', 
			body = {'values': [purchase.name, purchase.item_name, purchase.link, purchase.price, purchase.count, purchase.urgency, purchase.info, purchase.date]});

	}

	checkAuth();

}

module.exports = {
	addToSpreadsheet: addToSpreadsheet
};
