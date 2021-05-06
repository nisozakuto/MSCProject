const incrementLower = document.getElementById('incrementLower')
const incremenetUpper = document.getElementById('incremenetUpper')
const forward = document.getElementById('forward')
const reverse = document.getElementById('reverse')
const checkbox = document.getElementById('checkbox')
const searchButton = document.getElementById('searchButton')
let source = document.getElementById('source')
let stringLength = document.getElementById('stringLength')

let sourceArray = [], targetArray = [], results = []
let didFind = false
let amountOfZeros

function calculateRows() {
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
}

source.addEventListener("paste", (event) => {
    calculateRows();
});

source.addEventListener("keydown", (event) => {
    calculateRows();
});


function search() {
    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let sourceValue = source.value
    const target = document.getElementById('target').value
    const incrementLower = document.getElementById('incrementLower').value
    const incremenetUpper = document.getElementById('incremenetUpper').value

    sourceArray = sourceValue.split(/\n/);
    targetArray = target.split(",");

    for (let j = 0; j < sourceArray.length; j++) {
        results.push([j, sourceArray[j], 0]);
    }

    for (let incrememntValue = incrementLower; incrememntValue <= incremenetUpper; incrememntValue++) {
        // console.log(`Increment ${ incrememntValue }`);
        //Going through the source indexes
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

                        //1,000,002 --> Show why it is 1,000,002 -- It was 2 and it was 9
                        //4th column - There was a skip of 2s and skip of 9. Target in this exmaple is 4 and 6
                        // console.log(results[sourceIndex + targetCounter * incrememntValue][1])
                        // console.log("UF", results[sourceIndex + targetCounter * incrememntValue][2], sourceIndex + targetCounter * incrememntValue)
                        // console.log('results[targetCounter][sourceIndex + targetCounter * incrememntValue][2]', results[targetCounter])

                        if (results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] == undefined) { results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] = `Index ${sourceIndex} skip of: ${incrememntValue} ` }
                        else {
                            results[targetCounter, sourceIndex + targetCounter * incrememntValue][3] += `/ Index ${sourceIndex} skip of: ${incrememntValue} `
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

                        // console.table(results)
                        // results[[j+(k*i)][0]] = sourceArray[j+(k*i)]
                        // console.table("Line 92",results);
                    }
                    //Change the values for the corresponding items here
                    didFind = false;
                }
            }
        }
    }
    objectExporter({
        exportable: results, // The dataset to be exported form an array of objects, it can also be the DOM name for exporting DOM to html
        type: 'csv', // The type of exportable e.g. csv, xls or pdf
        headers: [
            { name: 'Index', alias: 'Index', flex: 30 },
            { name: 'Source', alias: 'Source', flex: 30 },
            { name: 'Result', alias: 'Result', flex: 30 },
            { name: 'Note', alias: 'Note', flex: 90 }],
        fileName: `${year} ${month} ${date} - ${hours} ${minutes} ${seconds} `, // The name of the file which will be exported without the extension.
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

function init() {
    lastUpdatedFunction()
}

init()