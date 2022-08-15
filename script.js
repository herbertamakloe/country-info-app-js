const officialName = document.querySelector(".official_name");
const commonName = document.querySelector(".common_name");
const continent = document.querySelector(".continent");
const subRegion = document.querySelector(".sub_region");
const capital = document.querySelector(".capital");
const countryCode = document.querySelector(".country_code");
const population = document.querySelector(".population");
const currencyName = document.querySelector(".currency");
const currencySymbol = document.querySelector(".currency_symbol");
const commonLanguages = document.querySelector(".common_languages");
const countryImage = document.querySelector(".flag_display img");
const inputText = document.querySelector(".input_text");
const searchBtn = document.querySelector(".search_btn");
const bgBlur = document.querySelector(".bg_blur");

const fetchData = (country) => {
	fetch("https://restcountries.com/v3.1/name/" + country + "?fullText=true")
		.then((response) => response.json())
		.then((data) => displayInfo(data));

	bgBlur.style.background = `url("https://source.unsplash.com/1600x900/?${country}")`;
};

// console.log(fetchData);

const displayInfo = (data) => {
	officialName.innerHTML = data[0].name.official;
	commonName.innerHTML = data[0].name.common;
	continent.innerHTML = data[0].region;
	subRegion.innerHTML = data[0].subregion;
	capital.innerHTML = data[0].capital;
	countryCode.innerHTML = data[0].idd.root + data[0].idd.suffixes[0];
	population.innerHTML = data[0].population;

	data.forEach((element) => {
		console.log(element.currencies);

		const currencyObject = element.currencies;
		const entries = Object.entries(currencyObject);

		currencyName.innerHTML = `${entries[0][1].name} (${entries[0][1].symbol})`;
	});

	data.forEach((element) => {
		console.log(element.languages);

		const languageObject = element.languages;
		const entries = Object.entries(languageObject);

		console.log(entries);

		let languageCount = 0;
		let languages = "";

		for (const [key, value] of entries) {
			console.log(`${value}`);

			languages += value + ", ";

			commonLanguages.innerHTML = languages;
		}

		// commonLanguages.innerHTML = entries.eng;

		// currencyName.innerHTML = `${entries[0][1].name} (${entries[0][1].symbol})`;
	});

	// commonLanguages.innerHTML = data[0].languages.eng;
	countryImage.src = data[0].flags.svg;
};

searchBtn.addEventListener("click", () => {
	fetchData(inputText.value);
});

inputText.addEventListener("keyup", (e) => {
	if (e.key == "Enter") {
		fetchData(inputText.value);
	}
});

// const searchCountry = () => {
// 	inputText.value;
// };
