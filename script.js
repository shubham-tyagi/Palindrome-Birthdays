const enteredDate = document.querySelector(".entered-date");
const btnSubmit = document.querySelector(".btn-submit");
const message = document.querySelector(".message");

btnSubmit.addEventListener("click", onBtnSubmit);

// var numberDateObj = {
// 	dd: null,
// 	mm: null,
// 	yy: null,
// };
var dateObj = {
	dd: null,
	mm: null,
	yy: null,
};

var numberDateObj = {
	dd: null,
	mm: null,
	yy: null,
};
function onBtnSubmit() {
	writeMessage("loading.....");
	setTimeout(onBtnSubmitHandler, 3000);
}
function onBtnSubmitHandler() {
	dateObj = setDateObj(enteredDate.value);
	dateObj.mm += 1;
	var diffDateTypes = getDateTypes(dateObj);
	var isDiffDatePalindrome = isDiffPalindrome(diffDateTypes);
	if (isDiffDatePalindrome == true)
		writeMessage("Your birthday is a palindrome");
	else {
		var [palindromeDate, diff] = findPalindrome(dateObj);
		writeMessage(
			"Your birthday is not a palindrome " +
				", nearest palindrome date = " +
				palindromeDate.dd +
				"/" +
				palindromeDate.mm +
				"/" +
				palindromeDate.yy +
				" you missed by " +
				diff +
				(diff == 1 ? " day" : " days")
		);

		// console.log()
	}
}

function isDiffPalindrome(diffDateTypes) {
	for (var i = 0; i < diffDateTypes.length; i++) {
		if (isPalindrome(diffDateTypes[i])) return true;
	}
	return false;
}
function setDateObj(enteredDateValue) {
	const date = new Date(enteredDateValue);
	let day, month, year;
	day = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	return {
		dd: day,
		mm: month,
		yy: year,
	};
}

function toStrDate(dateO) {
	// console.log(typeof dateObj.dd);
	let day, month, year;
	day = dateO.dd;
	month = dateO.mm;
	year = dateO.yy;
	if (day < 10) day = "0" + day.toString();
	else day = day.toString();
	if (month < 10) month = "0" + month.toString();
	else month = month.toString();
	year = year.toString();
	// return dateO;
	return {
		dd: day,
		mm: month,
		yy: year,
	};
	// console.log(typeof dateObj.dd);
}

function isPalindrome(str) {
	var revstr = str.split("").reverse().join("");
	// console.log(typeof str);
	// console.log(str, revstr);
	// console.log(str == revstr);
	return str === revstr;
}

function getDateTypes(dateO1) {
	var diffDates = [];
	var dateO = toStrDate(dateO1);
	diffDates.push(dateO.dd + dateO.mm + dateO.yy);
	diffDates.push(dateO.mm + dateO.dd + dateO.yy);
	diffDates.push(dateO.yy + dateO.mm + dateO.dd);
	diffDates.push(dateO.dd + dateO.mm + dateO.yy.slice(-2));
	diffDates.push(dateO.mm + dateO.dd + dateO.yy.slice(-2));
	diffDates.push(dateO.yy.slice(-2) + dateO.mm + dateO.dd);
	return diffDates;
}

function writeMessage(msg) {
	message.innerHTML = msg;
}

function findPalindrome(numberDateObj) {
	var nextDate = {
		dd: numberDateObj.dd,
		mm: numberDateObj.mm,
		yy: numberDateObj.yy,
	};
	var prevDate = {
		dd: numberDateObj.dd,
		mm: numberDateObj.mm,
		yy: numberDateObj.yy,
	};

	var nextDateTypes = getDateTypes(nextDate);
	var prevDateTypes = getDateTypes(prevDate);
	var diff = 0;
	var count = 0;

	while (
		isDiffPalindrome(nextDateTypes) == false &&
		isDiffPalindrome(prevDateTypes) == false &&
		count < 15
	) {
		nextDate = findNextDate(nextDate);
		prevDate = findPrevDate(prevDate);
		nextDateTypes = getDateTypes(nextDate);
		prevDateTypes = getDateTypes(prevDate);
		diff++;
		// console.log("0");
		// count++;
	}
	if (isDiffPalindrome(prevDateTypes)) return [prevDate, diff];
	else return [nextDate, diff];
	// return diff;
}

function findNextDate(nextDate) {
	let day = nextDate.dd;
	let month = nextDate.mm;
	let year = nextDate.yy;
	day += 1;
	const dateLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month == 2) {
		if (isLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else if (day > 28) {
			day = 1;
			month++;
		}
	} else {
		if (day > dateLimit[month - 1]) {
			day = 1;
			month++;
		}
	}

	if (month > 12) {
		month = 1;
		year++;
	}
	return {
		dd: day,
		mm: month,
		yy: year,
	};
}

function findPrevDate(prevDate) {
	let day = prevDate.dd;
	let month = prevDate.mm;
	let year = prevDate.yy;
	day -= 1;
	const dateLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month == 2) {
		if (isLeapYear(year)) {
			if (day < 0) {
				month--;
				day = 29;
			}
		} else if (day < 0) {
			month--;
			day = 28;
		}
	} else {
		if (day < 0) {
			month--;
			if (month < 0) day = 31;
			else day = dateLimit[month];
		}
	}
	if (month < 0) {
		month = 12;
		year--;
	}
	return {
		dd: day,
		mm: month,
		yy: year,
	};
}

function isLeapYear(year) {
	if (year % 400) return true;
	else if (year % 100) return false;
	else if (year % 4) return true;
	return false;
}
