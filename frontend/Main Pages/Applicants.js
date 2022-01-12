// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import {getApplicants} from 'backend/Modules/applications/getApplicants'
import {getResume} from 'backend/Modules/applications/getResume'
import wixWindow from 'wix-window';
import {getJobs} from 'backend/Modules/Jobs/getJobs';



$w.onReady(function () {
	// Write your JavaScript here

	// To select an element by ID use: $w('#elementID')

	// Click 'Preview' to run your code
	getApplicants().then(applicantInfo => {
		$w("#applicantsRepeater").data = applicantInfo
	})

	$w("#applicantsRepeater").onItemReady( ($item, itemData, index) => {
			$item("#user").text = itemData.user;
    		$item("#applicantName").text = itemData.firstName + " " + itemData.lastName;
    		$item("#applicantJob").text = itemData.jobTitle;
			$item("#applicantEmail").text = itemData.email;
			$item("#applicantPhone").text = itemData.phone;
			$item("#applicantStatus").text = itemData.status;
  	});

	getJobs().then(jobInfo => {
    let jobsInfo = jobInfo.value
    let jobsDropdownOptions = []
    for(let i in jobsInfo) {
      let option = {"label": jobsInfo[i].title, "value": jobsInfo[i]._id}
      jobsDropdownOptions.push(option);
    }
    $w("#jobsDropdown").options = jobsDropdownOptions
	})
});

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function searchApplicantButton_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
	getApplicants($w("#filterApplicantInput").value, $w("#sortApplicantInput").value, $w("#jobsDropdown").value).then(applicantInfo => {
    	$w("#applicantsRepeater").data = []
		$w("#applicantsRepeater").data = applicantInfo;
	})
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function viewCVButton_click(event, $w) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
	getResume($w("#user").text).then(response => {
		$w("#viewCVButton").label = response.message;
		}
	);
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function copyEmailsButton_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
	let emailString = ""
	$w("#applicantsRepeater").forEachItem( ($item, itemData, index) => {
		if ($item("#applicantCheckbox").checked){
			emailString += $item("#applicantEmail").text + ','
		}
	} );
	emailString = emailString.substring(0, emailString.length - 1); //remove last comma
	wixWindow.copyToClipboard(emailString)
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
export function masterCheckbox_change(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
	$w("#applicantsRepeater").forEachItem( ($item, itemData, index) => {
		$item("#applicantCheckbox").checked = $w("#masterCheckbox").checked
	} );
}