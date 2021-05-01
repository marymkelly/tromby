//menu animation related
let $logo = document.getElementById('logo');
let $namelogo = document.getElementById('namelogo');

$logo.addEventListener('mouseover', () => {
	$logo.classList.add('open');
	$namelogo.classList.add('open');
})

$logo.addEventListener('mouseout', () => {
		$logo.classList.remove('open');
		$namelogo.classList.remove('open');
})

let navEls = [document.getElementById('navIndexLink'), document.getElementById('navAboutLink')];
let found = navEls.find(el => el.pathname === window.location.pathname);
found.firstElementChild.setAttribute('active', "");
