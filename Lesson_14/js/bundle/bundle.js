(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener("DOMContentLoaded", () => {
	let tab = require("../parts/tab.js");
	let modal = require("../parts/modal.js");
	let ajax = require("../parts/ajax.js");
	let slider = require("../parts/slider.js");
	let calc = require("../parts/calc.js");
	let timer = require("../parts/timer.js");

	tab();
	modal();
	ajax();
	slider();
	calc();
	timer();
});
},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/slider.js":5,"../parts/tab.js":6,"../parts/timer.js":7}],2:[function(require,module,exports){
function ajax() {
	let form = document.getElementsByClassName("main-form")[0],
			input = form.getElementsByTagName("input"),
			statusMessage = document.createElement("div");

	let formFooter = document.getElementById("form"),
			iputFooter = formFooter.getElementsByTagName("input"),
			submitFooter =formFooter.getElementsByTagName("button");


	let message = new Object();
	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с вами свяжимся";
	message.failure = "Что-то пошло не так...";

	statusMessage.classList.add("status");

	function formCreate() {

		// AJAX
		let request = new XMLHttpRequest();
		request.open("POST", "server.php");

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = () => {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
					// Добавляем контент на страницу
				} else {
					statusMessage.innerHTML = message.failure;
				};
			};
		};
		for (let i = 0; i < input.length; i++) {
			input[i].value = "";
			// Очищаем поля ввода
		};
	};

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		form.appendChild(statusMessage);
		formCreate();
	});

	formFooter.addEventListener("submit", (event) => {
		event.preventDefault();
		formFooter.appendChild(statusMessage);
		formCreate();
	});
};

module.exports = ajax;
},{}],3:[function(require,module,exports){
function calc() {
let persons = document.getElementsByClassName("counter-block-input")[0],
			restDays = document.getElementsByClassName("counter-block-input")[1],
			place = document.getElementById("select"),
			totalValue = document.getElementById("total"),
			personsSum = 0,
			daysSum = 0,
			total = 0;

			totalValue.innerHTML = 0;

			persons.addEventListener("change", function () {
				personsSum = +this.value;
				total = (daysSum + personsSum) * 4000 * place.options[place.selectedIndex].value;;
				if (restDays.value == "" || restDays.value == "0" || persons.value == "" || persons.value == "0") {
					totalValue.innerHTML = 0;
				} else {
						totalValue.innerHTML = total;
				}
			});
			restDays.addEventListener("change", function () {
				daysSum = +this.value;
				total = (daysSum + personsSum) * 4000 * place.options[place.selectedIndex].value;
				if (persons.value == "" || persons.value == "0" || restDays.value == "" || restDays.value == "0") {
					totalValue.innerHTML = 0;
				} else {
						totalValue.innerHTML = total;
				}
			});

			place.addEventListener("change", function () {
				if (restDays.value == "" || persons.value == "" || restDays.value == "0" || persons.value == "0") {
					totalValue.innerHTML = 0;
				} else {
						let a = (daysSum + personsSum) * 4000;
						totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});

			persons.onkeypress = (event) => {
				if (event.key === "." || event.key === "," || event.key === "+" || event.key === '-' || event.key === 'e')
					return false;
				};

			restDays.onkeypress = (event) => {
				if (event.key === "." || event.key === "," || event.key === "+" || event.key === '-' || event.key === 'e')
					return false;
				};

};

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	let more = document.querySelector(".more"),
			overlay = document.querySelector(".overlay"),
			close = document.querySelector(".popup-close"),

			des_btn = document.querySelector(".description-btn"),
			infoDiv = document.querySelector(".info");

	more.addEventListener("click", function() {
		this.classList.add("more-splash");
		overlay.style.display = "block";
		document.body.style.overflow = "hidden";
	});

	infoDiv.addEventListener("click", (event) => {
		if (event.target && event.target.className == "description-btn") {
			des_btn.classList.add("more-splash");
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";
		};
	});

	close.addEventListener("click", () => {
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	});
};

module.exports = modal;
},{}],5:[function(require,module,exports){
function slider() {
	let slideIndex = 1,
			slides = document.getElementsByClassName("slider-item"),
			prev = document.querySelector(".prev"),
			next = document.querySelector(".next"),
			dotsWrap = document.querySelector('.slider-dots'),
			dot = document.getElementsByClassName('dot');

			showSlides(slideIndex);

			function showSlides(n) {
				if (n > slides.length) {
					slideIndex = 1;
				};
				if (n < 1) {
					slideIndex = slides.length;
				};
				for (let i =0; i < slides.length; i++) {
					slides[i].style.display = "none";
				};
				for (let i = 0; i < dot.length; i++) {
					dot[i].classList.remove("dot-active");
				};

				slides[slideIndex - 1].style.display = "block";
				dot[slideIndex - 1].classList.add("dot-active");
			};

			function plusSlides (n) {
				showSlides(slideIndex += n);
			};

			function currentSlide(n) {
				showSlides(slideIndex = n);
			};

			prev.addEventListener("click", () => {
				plusSlides(-1);
			});
			next.addEventListener("click", () => {
				plusSlides(1);
			});

			dotsWrap.addEventListener("click", (event) => {
				for (let i = 0; i < dot.length + 1; i++) {
					if (event.target.classList.contains("dot") && event.target == dot[i-1]) {
						currentSlide(i);
					};
				};
			});
};

module.exports = slider;
},{}],6:[function(require,module,exports){
function tab() {
	let tab = document.getElementsByClassName("info-header-tab"),
			tabContent = document.getElementsByClassName("info-tabcontent"),
			info = document.getElementsByClassName("info-header")[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		};
	};
	hideTabContent(1)

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			hideTabContent(0);
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		};
	};

	info.addEventListener("click", (event) => {
		let target = event.target;
		if(target.className == "info-header-tab") {
			for (let i = 0; i < tab.length; i++) {
				if(target == tab[i]) {
					showTabContent(i);
					break;
				};
			};
		};
	});
};

module.exports = tab;
},{}],7:[function(require,module,exports){
function timer() {
	let deadline = "2018-06-20";

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor( (t/1000) % 60 ),
				minutes = Math.floor( (t/1000/60) % 60 ),
				hours = Math.floor( (t/(1000*60*60)) );

				if (hours < 10) {
						hours = `0${hours}`;
				};
				if (minutes < 10) {
						minutes = `0${minutes}`;
				};
				if (seconds < 10) {
						seconds = `0${seconds}`;
				};


				return {
					"total": t,
					"hours": hours,
					"minutes": minutes,
					"seconds": seconds
				};
	};

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector(".hours"),
				minutes = timer.querySelector(".minutes"),
				seconds = timer.querySelector(".seconds"),
				timeInterval = setInterval(updateClock, 1000);

				function updateClock() {
					let t = getTimeRemaining(endtime);
					hours.innerHTML = t.hours;
					minutes.innerHTML = t.minutes;
					seconds.innerHTML = t.seconds;

					if (t.total < 0 || t.total == 0) {
						clearInterval(timeInterval);
						hours.innerHTML = "00";
						minutes.innerHTML = "00";
						seconds.innerHTML = "00";
					};
				};
				updateClock();

	};
	setClock("timer", deadline);
};

module.exports = timer;
},{}]},{},[1]);
