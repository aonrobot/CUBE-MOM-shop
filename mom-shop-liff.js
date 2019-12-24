window.onload = function() {

    let liffId = "1653700382-njRd4e6k";
    initializeLiffOrDie(liffId);

};

function initializeLiffOrDie(liffId) {
    if (!liffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(liffId);
    }
}

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            console.log(err)
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffErrorMessage").classList.remove('hidden');
        });
}

function initializeApp() {
    displayLiffData();
    // displayIsInClientInfo();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

function displayLiffData() {
    document.getElementById('deviceOS').textContent = liff.getOS();
}

function registerButtonHandlers() {

    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
            liff.login();
        }
    });

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}