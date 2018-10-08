document.querySelector('.page-loaded').innerText = (new Date()).toLocaleTimeString();

document.querySelector('.load-html-ajax').addEventListener('click', loadHtmlAjax);

function loadHtmlAjax() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-placeholder').innerHTML = xhr.responseText;
        }
    }
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.load-html-fetch').addEventListener('click', loadHtmlFetch);

function loadHtmlFetch() {
    fetch('client-data.html')
        .then(response => response.text() )
        .then( html => document.querySelector('.html-placeholder').innerHTML = html )
}


document.querySelector('.load-json-ajax').addEventListener('click', loadJsonAjax);

function loadJsonAjax() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.account;
        }
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.load-json-fetch').addEventListener('click', loadJsonFetch);

function loadJsonFetch() {
    fetch('client-data.json')
        .then( response => response.json() )
        .then( clientData => {
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.account;    
        })
}

document.querySelector('.login-form input[type=submit]').addEventListener('click', submitForm);

function submitForm(e) {
    const form = document.querySelector('.login-form');
    if (form.checkValidity()) {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.querySelector('.message-box').innerHTML = 
                '<h3>Welcome!</h3>' + xhr.responseText;
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                document.querySelector('.message-box').innerHTML = 'Error!';
            }
        }
        xhr.open('POST', 'login.php', true);
        const data = new FormData(form);
        xhr.send(data);
    }
}


document.querySelector('.run-query').addEventListener('click', function() {
   fetch(document.querySelector('.url').value)
      .then( response => response.json() )
      .then( result => {
          document.querySelector('.public-api-result').innerText = JSON.stringify(result);
  }); 
});
