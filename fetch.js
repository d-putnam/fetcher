// Sleep function from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update text to add new character
function update(text, target) {
    document.querySelector(target).innerHTML = text;
    if (document.querySelector(target).style.visibility === 'hidden')
    {
        document.querySelector(target).style.visibility = 'visible';
    }
}

// Function to reveal input line
function show(target) {
    document.getElementById(target).style.display="block";
    document.getElementById("inpt").focus();
}

// "typing" style character iteration with callback
async function iter0(target, count, _callback) {
    // Get original text from HTML body
    let text = document.querySelector(target).innerHTML;
    let str = "";
    // Iterate over each character
    for (let i = 0, n = text.length; i < n; i++)
    {
        // Sleep between each character
        let int = Math.random() * 300;
        await sleep(int);
        // Store first character
        let char = text[i];
        // Add to string
        let res = str.concat(char);
        // Store updated string
        str = res;
        update(res, target);
        // At end of line, sleep 1.5 second times argv[1]
        if (i === n - 1)
        {
            await sleep(count * 1500);
        }
    }
    _callback();
}

// "iter0" typing function without callback
async function iter1(inp, target) 
    {
        stopped = true;
        // Get original text from HTML body
        let text = inp;
        let str = "";
        // Iterate over each character
        for (let i = 0, n = text.length; i < n; i++)
        {
            // Sleep between each character
            let int = Math.random() * 100;
            await sleep(int);
            // Store first character
            let char = text[i];
            // Add to strings
            let res = str.concat(char);
            // Store updated string
            str = res;
            update(res, target);
        }
    }

let stopped = false; 
async function dots(){
    let str = "";
    // Repeat the following until we get DeepAI results
    do{
        // Sleep between each character
        for (let i = 0; i < 83; i++)
        {   
            // If we get results mid-line, braek
            if (stopped === true)
            {
                break;
            }
            let int = Math.random() * 300;
            await sleep(int);
            // Store first character
            let char = '.';
            // Add to strings
            let res = str.concat(char);
            // Store updated string
            str = res;
            update(res, '#dots');
            if (i === 82)
            {
                let char = '\n';
                // Add to strings
                let res = str.concat(char);
                // Store updated string
                str = res;
                update(res, '#dots');
            }
        }
    }
    while (stopped === false);
}

deepai.setApiKey('e60381a0-fb60-4bf8-94cf-d5cbe9364e81');
// Following submission of form
async function fsubmit() {
    // Print the "just a moment" then "loading bar"
    iter0('#fourth', '0', async function() {
        dots();
        // Get contents of what they typed
        let text = document.querySelector('#inpt').innerHTML;
            // Send it to DeepAI API, which breaks dots() on callback
            (async function() {
            var result = await deepai.callStandardApi("text-generator", {
                    text: text,
            });
            // Send result to iter1 (no-callback version)
            iter1(result["output"], '#result');
        })()
    })()
}
