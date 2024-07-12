// let pyodideReadyPromise = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });

// document.getElementById('language').addEventListener('change', (event) => {
//     const language = event.target.value;
//     if (language === 'javascript') {
//         alert("Sorry! FireFly Compiler not support Javascript yet.");
//         document.getElementById('language').value = 'python';
//     }
// });

// document.getElementById('run-btn').addEventListener('click', async () => {
//     const language = document.getElementById('language').value;
//     const code = document.getElementById('code').value;
//     const outputElement = document.getElementById('output');
    
//     outputElement.value = '';  // Clear previous output

//     if (language === 'python') {
//         try {
//             const pyodide = await pyodideReadyPromise;
            
//             // Redirect stdout
//             pyodide.runPython(`
//                 import sys
//                 from io import StringIO

//                 sys.stdout = StringIO()
//             `);
            
//             await pyodide.runPythonAsync(code);
            
//             // Capture output
//             let result = pyodide.runPython(`
//                 sys.stdout.getvalue()
//             `);

//             outputElement.value = result;
//         } catch (error) {
//             outputElement.value = error.toString();
//         }
//     }
// });



// // JavaScript for handling Tab key press
// function handleTabKey(event) {
//     if (event.key === 'Tab') {
//         event.preventDefault();
//         const textarea = event.target;
//         const start = textarea.selectionStart;
//         const end = textarea.selectionEnd;

//         // Insert 4 spaces at the current caret position
//         textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);

//         // Move caret position forward
//         textarea.selectionStart = textarea.selectionEnd = start + 4;
//     }
// }







// const codeTextarea = document.getElementById('code');

// codeTextarea.addEventListener('keydown', function(event) {
//     const { selectionStart, selectionEnd, value } = codeTextarea;
//     const key = event.key;

//     if (key === '(') {
//         event.preventDefault();
//         codeTextarea.value = value.substring(0, selectionStart) + '()' + value.substring(selectionEnd);
//         codeTextarea.selectionStart = selectionEnd + 1;
//         codeTextarea.selectionEnd = selectionEnd + 1;
//     } else if (key === '\'') {
//         event.preventDefault();
//         codeTextarea.value = value.substring(0, selectionStart) + '\'\'\'' + value.substring(selectionEnd);
//         codeTextarea.selectionStart = selectionEnd + 1;
//         codeTextarea.selectionEnd = selectionEnd + 1;
//     } else if (key === '"') {
//         event.preventDefault();
//         codeTextarea.value = value.substring(0, selectionStart) + '""' + value.substring(selectionEnd);
//         codeTextarea.selectionStart = selectionEnd + 1;
//         codeTextarea.selectionEnd = selectionEnd + 1;
//     }
//     else if (key === '{') {
//         event.preventDefault();
//         codeTextarea.value = value.substring(0, selectionStart) + '{}' + value.substring(selectionEnd);
//         codeTextarea.selectionStart = selectionEnd + 1;
//         codeTextarea.selectionEnd = selectionEnd + 1;
//     }
//     else if (key === '<') {
//         event.preventDefault();
//         codeTextarea.value = value.substring(0, selectionStart) + '<>' + value.substring(selectionEnd);
//         codeTextarea.selectionStart = selectionEnd + 1;
//         codeTextarea.selectionEnd = selectionEnd + 1;
//     }
// });












let pyodideReadyPromise = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
alert("Welcome to FireFly!")

// Event listener for language change
document.getElementById('language').addEventListener('change', (event) => {
    const language = event.target.value;
    if (language === 'javascript') {
        alert("Sorry! FireFly Compiler does not support JavaScript yet.");
        document.getElementById('language').value = 'python';
    }
});

// Event listener for run button
document.getElementById('run-btn').addEventListener('click', async () => {
    const language = document.getElementById('language').value;
    const code-editor = document.getElementById('code-editor').value;
    const outputElement = document.getElementById('output');
    
    outputElement.value = '';  // Clear previous output

    if (language === 'python') {
        try {
            const pyodide = await pyodideReadyPromise;
            
            // Redirect stdout
            pyodide.runPython(`
                import sys
                from io import StringIO

                sys.stdout = StringIO()
            `);
            
            await pyodide.runPythonAsync(code-editor);
            
            // Capture output
            let result = pyodide.runPython(`
                sys.stdout.getvalue()
            `);

            outputElement.value = result;
        } catch (error) {
            outputElement.value = error.toString();
        }
    }
});

// Event listener for Tab key to insert 4 spaces
function handleTabKey(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert 4 spaces at the current caret position
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);

        // Move caret position forward
        textarea.selectionStart = textarea.selectionEnd = start + 4;
    }
}

// Event listener for Ctrl + / to comment/uncomment lines
const codeTextarea = document.getElementById('code-editor');

codeTextarea.addEventListener('keydown', function(event) {
    // Check if Ctrl key is pressed and '/' key is pressed
    if (event.ctrlKey && event.key === '/') {
        event.preventDefault();

        const { selectionStart, selectionEnd, value } = codeTextarea;

        // Split the text into lines
        const lines = value.split('\n');

        // Determine selected lines based on selection start and end
        let startLine = value.substr(0, selectionStart).split('\n').length;
        let endLine = value.substr(0, selectionEnd).split('\n').length;

        // Ensure startLine is before endLine
        if (startLine > endLine) {
            [startLine, endLine] = [endLine, startLine];
        }

        // Toggle commenting for the selected lines
        for (let i = startLine; i < endLine; i++) {
            let line = lines[i];

            // Check if line is already commented
            if (line.trim().startsWith('#')) {
                // Uncomment the line
                lines[i] = line.replace(/^#\s*/, '');
            } else {
                // Comment the line
                lines[i] = `# ${line}`;
            }
        }

        // Join lines back into a single string
        const commentedCode = lines.join('\n');

        // Update textarea value with commented/uncommented code
        codeTextarea.value = commentedCode;

        // Set cursor position to the end of the original selection
        codeTextarea.selectionStart = selectionStart;
        codeTextarea.selectionEnd = selectionEnd;
    }
});

// Event listener for auto-closing brackets and quotes
codeTextarea.addEventListener('keydown', function(event) {
    const { selectionStart, selectionEnd, value } = codeTextarea;
    const key = event.key;

    if (key === '(') {
        event.preventDefault();
        codeTextarea.value = value.substring(0, selectionStart) + '()' + value.substring(selectionEnd);
        codeTextarea.selectionStart = selectionEnd + 1;
        codeTextarea.selectionEnd = selectionEnd + 1;
    } else if (key === '\'') {
        event.preventDefault();
        codeTextarea.value = value.substring(0, selectionStart) + '\'\'\'' + value.substring(selectionEnd);
        codeTextarea.selectionStart = selectionEnd + 1;
        codeTextarea.selectionEnd = selectionEnd + 1;
    } else if (key === '"') {
        event.preventDefault();
        codeTextarea.value = value.substring(0, selectionStart) + '""' + value.substring(selectionEnd);
        codeTextarea.selectionStart = selectionEnd + 1;
        codeTextarea.selectionEnd = selectionEnd + 1;
    }
    else if (key === '{') {
        event.preventDefault();
        codeTextarea.value = value.substring(0, selectionStart) + '{}' + value.substring(selectionEnd);
        codeTextarea.selectionStart = selectionEnd + 1;
        codeTextarea.selectionEnd = selectionEnd + 1;
    }
    else if (key === '<') {
        event.preventDefault();
        codeTextarea.value = value.substring(0, selectionStart) + '<>' + value.substring(selectionEnd);
        codeTextarea.selectionStart = selectionEnd + 1;
        codeTextarea.selectionEnd = selectionEnd + 1;
    }
});
