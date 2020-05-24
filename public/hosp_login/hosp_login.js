const $loginButton = document.getElementById('login');
const $welcome = document.getElementById('welcome');
const $afterLogin = document.getElementById('afterLogin');
const $welcomeNameId = document.getElementById('welcomeNameID');
const $tokenContent = document.getElementById('tokenContent');
const $userContent = document.getElementById('userContent');
const $error = document.getElementById('error');
const $userIdField = document.getElementById('userIdField');
const $form = document.getElementById('updateventi');
const $hospital = document.getElementById('hospital');

const appID = new AppID();

async function onLoginButtonClick() {
	try {
		hideElement($loginButton);

		const tokens = await appID.signin();
		let userInfo = await appID.getUserInfo(tokens.accessToken);

		hideElement($welcome);
		showElement($afterLogin);

		let decodeIDToken = tokens.idTokenPayload;

		$welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
		$tokenContent.textContent = JSON.stringify(decodeIDToken);
        $userContent.textContent = JSON.stringify(userInfo);
        $userIdField.setAttribute('value',userInfo.identities[0].id.toString());
        $form.setAttribute('action','/createVentilator');
        let hospId = userInfo.sub.slice(0,4).toString() + userInfo.name.slice(0,4).toLowerCase().toString() + userInfo.identities[0].id.slice(-4).toString();
        $hospital.setAttribute('value', hospId);
        

	} catch (e) {
		$error.textContent = e;
		showElement($loginButton);
	}
}

(async () => {
	try {
		await appID.init({
            clientId: "cfd0de00-b47a-47c0-9fa4-c5638875926e",
            discoveryEndpoint: "https://eu-gb.appid.cloud.ibm.com/oauth/v4/649e78bc-aeb9-49c8-a799-6e9a73109041/.well-known/openid-configuration"
        });
		showElement($loginButton);
		$loginButton.addEventListener('click', onLoginButtonClick);
	} catch (e) {
		$error.textContent = e;
	}
})();

function hideElement($element) {
	$element.classList.add('hidden');
}

function showElement($element) {
	$element.classList.remove('hidden');
}

const collaps = document.getElementsByClassName("collapsible");
for (let collapsible of collaps) {
	const btn = collapsible.getElementsByTagName("button")[0];
	btn.addEventListener("click", () => {
		collapsible.classList.toggle("active");
	});
}