window.onload = function() {

    var liffId = "1653700382-njRd4e6k";
    initializeLiffOrDie(liffId);

};

function initializeLiffOrDie(liffId) {
    if (!liffId) {
        document.getElementById("liffErrorMessage").innerHTML = 'error initializeLiffOrDie'
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffErrorMessage").classList.remove('hidden');
    } else {
        document.getElementById("stepLIFF").innerHTML = 'initializeLiffOrDie'
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
            document.getElementById("liffErrorMessage").innerHTML = err
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffErrorMessage").classList.remove('hidden');
        });
    //initializeApp();
}

function initializeApp() {
    
    displayLiffData();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    document.getElementById("isLoggedIn").innerHTML = liff.isLoggedIn()
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

    // get profile call
    document.getElementById('getProfileButton').addEventListener('click', function() {
        document.getElementById("isLoggedIn").innerHTML = 'getProfileButton click'
        liff.getProfile().then(function(profile) {
            document.getElementById('userIdProfileField').textContent = profile.userId;
            document.getElementById('displayNameField').textContent = profile.displayName;

            const profilePictureDiv = document.getElementById('profilePictureDiv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = 'Profile Picture';
            profilePictureDiv.appendChild(img);

            document.getElementById('statusMessageField').textContent = profile.statusMessage;

            const context = liff.getContext();
            if (context) {
                document.getElementById('contextTypeProfileField').textContent = context.type;
                if (context.type == "group") {
                    document.getElementById('groupIdProfileField').textContent = 'Group ' + context.groupId;
                } 

                else if (context.type == "room") {
                    document.getElementById('groupIdProfileField').textContent = 'Room ' + context.roomId;
                }

                else if (context.type == "utou") {
                    document.getElementById('groupIdProfileField').textContent = 'Offi ' + context.utouId;
                }
            }

            toggleProfileData();
        }).catch(function(error) {
            document.getElementById("liffErrorMessage").innerHTML = error
            window.alert('Error getting profile: ' + error);
        });
        
    });

    document.getElementById('liffSendMessageButton').addEventListener('click', function() {
        liff.sendMessages([
            {
              type:'text',
              text:'Thank for order and trust us - MOM Shop'
            }
          ])
          .then(() => {
            console.log('message sent');
          })
          .catch((err) => {
            document.getElementById("liffErrorMessage").innerHTML = err
            console.log('error', err);
          });
    })

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

function toggleProfileData() {
    toggleElement('profileInfo');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}