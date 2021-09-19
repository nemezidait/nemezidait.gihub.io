/* Wandbox commenucation see: https://github.com/melpon/wandbox/blob/master/kennel2/API.rst*/

async function compileGccCpp(code, stdin){
  const data = {
                code: code,
                options: "warning,gnu++1y",
                stdin: stdin,
                compiler: "gcc-head",
                compiler_option_raw: "-Dx=hogefuga\n-O3",
            };
  
  return postData(data);
}

async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
