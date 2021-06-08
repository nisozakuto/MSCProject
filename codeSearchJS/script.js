const incrementLower = document.getElementById('incrementLower')
const incremenetUpper = document.getElementById('incremenetUpper')
const forward = document.getElementById('forward')
const reverse = document.getElementById('reverse')
const allVariations = document.getElementById('all-variations')
const searchButton = document.getElementById('searchButton')
let source = document.getElementById('source')
let stringLength = document.getElementById('stringLength')

let sourceArray = [], targetArray = [], results
let didFind = false, isForward, isReverse, isAllVariations
let amountOfZeros, tempSourceIndex

function checkCanSearch() {
    if (
        forward.checked ||
        reverse.checked ||
        allVariations.checked
    ) {
        searchButton.disabled = false;
    } else searchButton.disabled = true;
}

function setVariable() {
    isForward = isReverse = isAllVariations = false
    if (forward.checked) isForward = true
    if (reverse.checked) isReverse = true
    if (allVariations.checked) isAllVariations = true
}

forward.addEventListener("change", () => {
    checkCanSearch();
    if (forward.checked && allVariations.checked) {
        allVariations.checked = false;
    }
    setVariable()
});

reverse.addEventListener("change", () => {
    checkCanSearch();
    if (reverse.checked && allVariations.checked) {
        allVariations.checked = false;
    }
    setVariable()
});

allVariations.addEventListener("change", () => {
    checkCanSearch();
    if (allVariations.checked) {
        if (forward.checked || reverse.checked) {
            forward.checked = false;
            reverse.checked = false;
        }
    }
    setVariable()

})

function calculateRows() {
    setTimeout(() => {
        amountOfZeros = 0;
        let sourceValue = source.value
        sourceArray = sourceValue.split(/\n/);
        for (let i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i] === "0") {
                amountOfZeros++;
            }
        }
        stringLength.innerText = `String's length: ${sourceArray.length}`;
        document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
            amountOfZeros
        )}`;
    }, 300);
}

source.addEventListener("paste", (event) => {
    calculateRows();
});

source.addEventListener("keydown", (event) => {
    calculateRows();
});

const infoText = document.getElementById("progressInfo")

function info(info, number, upperLimit) {
    infoText.innerText = `${info} at ${number}/${upperLimit}`
}

function search() {
    results = []
    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let sourceValue = source.value
    const target = document.getElementById('target').value
    const incrementLower = parseInt(document.getElementById('incrementLower').value)
    const incremenetUpper = parseInt(document.getElementById('incremenetUpper').value)

    sourceArray = sourceValue.split(/\n/);
    targetArray = target.split(",");

    for (let j = 0; j < sourceArray.length; j++) {
        results.push([j, sourceArray[j], 0]);
    }

    if (isForward) {
        for (let incrememntValue = incrementLower; incrememntValue <= incremenetUpper; incrememntValue++) {
            //Going through the source indexes
            info("Skip Number", incrememntValue, incremenetUpper)
            for (let sourceIndex = 0; sourceIndex < sourceArray.length; sourceIndex++) {
                if (sourceArray[sourceIndex] == targetArray[0]) {
                    for (let targetCounter = 0; targetCounter < targetArray.length; targetCounter++) {
                        if (sourceArray[sourceIndex + targetCounter * incrememntValue] == targetArray[targetCounter]) {
                            didFind = true;
                            //TO DO Adding the values to temp array
                        }
                        else {
                            didFind = false;
                            break;
                        }
                    }
                    if (didFind) {
                        for (let targetCounter = 0; targetCounter < targetArray.length; targetCounter++) {
                            // console.log(`target Array length`, targetArray.length)
                            //1,000,002 --> Show why it is 1,000,002 -- It was 2 and it was 9
                            //4th column - There was a skip of 2s and skip of 9. Target in this exmaple is 4 and 6
                            // console.log(results[sourceIndex + targetCounter * incrememntValue][1])
                            // console.log("UF", results[sourceIndex + targetCounter * incrememntValue][2], sourceIndex + targetCounter * incrememntValue)
                            // console.log('results[targetCounter][sourceIndex + targetCounter * incrememntValue][2]', results[targetCounter])
                            tempSourceIndex = sourceIndex + 1
                            if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] == undefined) { results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] = `Row ${tempSourceIndex} skip of: ${incrememntValue} ` }
                            else {
                                results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] += `/ Row ${tempSourceIndex} skip of: ${incrememntValue} `
                            }

                            if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] != 0) {
                                // notes.push(`Index ${ sourceIndex } had: ${ incrememntValue }`);
                                if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] < 1000000) {
                                    results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] = 1000001;
                                }

                                if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] > 1000000) {
                                    results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] += 1;
                                }
                            }
                            else {
                                // console.log(`Incr: ${ incrememntValue } - Settting value to results[${ sourceIndex + targetCounter * incrememntValue}]`);
                                results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] = incrememntValue;
                            }
                            // results[[j+(k*i)][0]] = sourceArray[j+(k*i)]
                        }
                        //Change the values for the corresponding items here
                        didFind = false;
                    }
                }
            }
        }
    }

    if (isReverse) {
        for (let incrememntValue = incrementLower; incrememntValue <= incremenetUpper; incrememntValue++) {
            info("Skip Number", incrememntValue, incremenetUpper)
            for (let sourceIndex = sourceArray.length; sourceIndex > 0; sourceIndex--) {
                if (sourceArray[sourceIndex] == targetArray[0]) {
                    for (let targetCounter = 0; targetCounter < targetArray.length; targetCounter++) {
                        if (sourceArray[sourceIndex - targetCounter * incrememntValue] == targetArray[targetCounter]) {
                            didFind = true;
                            //TO DO Adding the values to temp array
                        }
                        else {
                            didFind = false;
                            break;
                        }
                    }
                    if (didFind) {
                        for (let targetCounter = 0; targetCounter < targetArray.length; targetCounter++) {
                            //1,000,002 --> Show why it is 1,000,002 -- It was 2 and it was 9
                            //4th column - There was a skip of 2s and skip of 9. Target in this exmaple is 4 and 6
                            tempSourceIndex = sourceIndex + 1
                            if (results[targetCounter, sourceIndex - targetCounter * incrememntValue][3] == undefined) { results[targetCounter, sourceIndex - targetCounter * incrememntValue][3] = `Row ${tempSourceIndex} skip of: -${incrememntValue} ` }
                            else {
                                results[targetCounter, sourceIndex - targetCounter * incrememntValue][3] += `/ Row ${tempSourceIndex} skip of: -${incrememntValue} `
                            }

                            if (results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] != 0) {
                                // notes.push(`Index ${ sourceIndex } had: ${ incrememntValue }`);
                                if (results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] < 1000000) {
                                    results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] = 1000001;
                                }

                                if (results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] > 1000000) {
                                    results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] += 1;
                                }
                            }
                            else {
                                // console.log(`Incr: ${ incrememntValue } - Settting value to results[${ sourceIndex + targetCounter * incrememntValue}]`);
                                results[targetCounter, sourceIndex - targetCounter * incrememntValue][2] = -incrememntValue;
                            }
                        }
                        //Change the values for the corresponding items here
                        didFind = false;
                    }
                }
            }

        }
    }

    if (isAllVariations) {
        let foundPermutations = findpermutate(targetArray)
        foundPermutations.forEach(element => {
            for (let incrememntValue = incrementLower; incrememntValue <= incremenetUpper; incrememntValue++) {
                info("Skip Number", incrememntValue, incremenetUpper)
                //Going through the source indexes
                for (let sourceIndex = 0; sourceIndex < sourceArray.length; sourceIndex++) {

                    if (sourceArray[sourceIndex] == element[0]) {
                        for (let targetCounter = 0; targetCounter < element.length; targetCounter++) {
                            if (sourceArray[sourceIndex + targetCounter * incrememntValue] == element[targetCounter]) {
                                didFind = true;
                                //TO DO Adding the values to temp array
                            }
                            else {
                                didFind = false;
                                break;
                            }
                        }
                        if (didFind) {
                            for (let targetCounter = 0; targetCounter < element.length; targetCounter++) {

                                //1,000,002 --> Show why it is 1,000,002 -- It was 2 and it was 9
                                //4th column - There was a skip of 2s and skip of 9. Target in this exmaple is 4 and 6
                                // console.log(results[sourceIndex + targetCounter * incrememntValue][1])
                                // console.log("UF", results[sourceIndex + targetCounter * incrememntValue][2], sourceIndex + targetCounter * incrememntValue)
                                // console.log('results[targetCounter][sourceIndex + targetCounter * incrememntValue][2]', results[targetCounter])
                                tempSourceIndex = sourceIndex + 1
                                if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] == undefined) { results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] = `Row ${tempSourceIndex} skip of: ${incrememntValue} ` }
                                else {
                                    results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] += `/ Row ${tempSourceIndex} skip of: ${incrememntValue} `
                                }

                                if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] != 0) {
                                    // notes.push(`Index ${ sourceIndex } had: ${ incrememntValue }`);
                                    if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] < 1000000) {
                                        results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] = 1000001;
                                    }

                                    if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] > 1000000) {
                                        results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] += 1;
                                    }
                                }
                                else {
                                    // console.log(`Incr: ${ incrememntValue } - Settting value to results[${ sourceIndex + targetCounter * incrememntValue}]`);
                                    results[targetCounter, sourceIndex + targetCounter * incrememntValue][2] = incrememntValue;
                                }
                                // results[[j+(k*i)][0]] = sourceArray[j+(k*i)]
                            }
                            //Change the values for the corresponding items here
                            didFind = false;
                        }
                    }
                }
            }
        });



    }

    for (let j = 0; j < results.length; j++) {
        results[j][0] += 1
    }


    objectExporter({
        exportable: results, // The dataset to be exported form an array of objects, it can also be the DOM name for exporting DOM to html
        type: 'csv', // The type of exportable e.g. csv, xls or pdf
        headers: [
            { name: 'Rows', alias: 'Rows', flex: 30 },
            { name: 'Source', alias: 'Source', flex: 30 },
            { name: 'Results', alias: 'Results', flex: 30 },
            { name: 'Notes', alias: 'Notes', flex: 90 }],
        fileName: `Code Search Report ${year} ${month} ${date} - ${hours} ${minutes} ${seconds} `, // The name of the file which will be exported without the extension.
        // headerStyle: , // The style which needs to be applied to the column headers
        // cellStyle: <cssStyle>, // The style which needs to be applied to each of the cells excluding the headers
        sheetName: 'SheetName', // The sheet name containing the exported exportables
        documentTitle: 'Title', // The document title which should be added to the printable
        // documentTitleStyle: <cssStyle>, // The style which can be applied to the document header
        // repeatHeader: <boolean>, // The table header repeat parameter
        // columnSeparator: <char|string> // The expected column column separator in csv export
    })
}

function lastUpdatedFunction() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let repos = JSON.parse(this.responseText);
            repos.forEach((repo) => {
                if (repo.name == "MSCProject") {
                    document.querySelector(
                        "footer"
                    ).innerText = `An MSC Webpage - Last updated ${new Date(
                        repo.updated_at
                    )}`;
                }
            });
        }
    };
    xhttp.open("GET", "https://api.github.com/users/nisozakuto/repos", true);
    xhttp.send();
}

const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);


function findpermutate(targetArray) {

    let permutationResults = []
    let dupeChecker = false
    if (targetArray.length === 0) return [];
    if (targetArray.length === 1) return [targetArray];

    for (let i = 0; i < targetArray.length; i++) {
        const currentNum = targetArray[i];
        const remainingNums = targetArray.slice(0, i).concat(targetArray.slice(i + 1));
        const remainingNumsPermuted = findpermutate(remainingNums);
        for (let j = 0; j < remainingNumsPermuted.length; j++) {
            const permutedArray = [currentNum].concat(remainingNumsPermuted[j])

            permutationResults.forEach(element => {
                if (equals(element, permutedArray))
                    dupeChecker = true
            });
            if (!dupeChecker)
                permutationResults.push(permutedArray);
        }
    }

    return permutationResults
}

function init() {
    lastUpdatedFunction()
    checkCanSearch();
}

init()