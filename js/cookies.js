if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookie-banner').style.display = 'none';
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');

    document.getElementById('cookie-banner').style.display = 'none';
}