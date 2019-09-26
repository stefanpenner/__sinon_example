
function registerHost(xhr, hostname, console) {
  // Only register if it's a local host.
  if (hostname.includes('FOO')) {
    xhr.open("POST", 'BAR', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      debugger;
      if (xhr.readyState === 4) {
        if (xhr.status === '200') {
          var response = JSON.parse(xhr.responseText);

          if (response['allowed'] !== true) {
            console.log('warning: '+ response['error_message']);
          } else {
            console.log('info: Host registered for local-dev access by SuperGrid')
          }
        } else {
          console.log(
            'warning: \'Local-dev access to supergrid-blue may not work due an internal error during auto-registering.'
            + '  \'Please reach out to supergrid-dev@linkedin.com if you need help.');
        }
      }
    };

    var data = JSON.stringify({"hostname": hostname});
    xhr.send(data);
  }
}

const xhr = new (require('sinon').useFakeXMLHttpRequest());
debugger;
registerHost(xhr, 'FOO', console);
xhr.responsdWith({})
