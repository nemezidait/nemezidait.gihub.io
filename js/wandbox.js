/* Wandbox commenucation see: https://github.com/melpon/wandbox/blob/master/kennel2/API.rst*/

async function compileGccCpp(mainCode, codes, fileNames, stdin){
  const data = {
                code: mainCode,
                codes: codes,
                options: "warning,gnu++1y",
                stdin: stdin,
                compiler: "gcc-head",
                compiler_option_raw: "" + fileNames,
            };
  
  return postData(data);
}

async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data).replace('compiler_option_raw', 'compiler-option-raw') // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
