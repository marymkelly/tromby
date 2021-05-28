//menu animation related
const $logo = document.getElementById('logo');
const $namelogo = document.getElementById('namelogo');

$logo.addEventListener('mouseover', () => {
	$logo.classList.add('open');
	$namelogo.classList.add('open');
})

$logo.addEventListener('mouseout', () => {
		$logo.classList.remove('open');
		$namelogo.classList.remove('open');
})

const navEls = [document.getElementById('navIndexLink'), document.getElementById('navAboutLink')];
const found = navEls.find(el => el.pathname === window.location.pathname);
found.firstElementChild.setAttribute('active', "");


//logo direct back to home from about page
const navLogo = document.getElementById('navLogoLink');
let path = window.location.pathname;

if(path !== '/') {
	navLogo.target = "_self";
	navLogo.href = "/";
}