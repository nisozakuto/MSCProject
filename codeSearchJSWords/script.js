import { word1 } from './words.js'
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


function addTheCheckboxes() {
    const textForGroups = [
        ["Sequential - Letters", "Sequential - Letters"],
        ["(2-11) 1st-10th Letters of Words", "1st Letters of Words", "2nd Letters of Words", "3rd Letters of Words", "4th Letters of Words", "5th Letters of Words", "6th Letters of Words", "7th Letters of Words", "8th Letters of Words", "9th Letters of Words", "10th Letters of Words"],
        ["Miluy Letters of Words", "Miluy Letters of Words"],
        ["Middle Letters of Words", "Middle Letters of Words"],
        ["Last Letters of Words", "Last Letters of Words"],
        ["First and Last Letters of Words", "First and Last Letters of Words"],
        ["(16-269) 1st - 254th Letters of Verses", "1st Letters of Verses", "2nd Letters of Verses", "3rd Letters of Verses", "4th Letters of Verses", "5th Letters of Verses", "6th Letters of Verses", "7th Letters of Verses", "8th Letters of Verses", "9th Letters of Verses", "10th Letters of Verses", "11th Letters of Verses", "12th Letters of Verses", "13th Letters of Verses", "14th Letters of Verses", "15th Letters of Verses", "16th Letters of Verses", "17th Letters of Verses", "18th Letters of Verses", "19th Letters of Verses", "20th Letters of Verses", "21st Letters of Verses", "22nd Letters of Verses", "23rd Letters of Verses", "24th Letters of Verses", "25th Letters of Verses", "26th Letters of Verses", "27th Letters of Verses", "28th Letters of Verses", "29th Letters of Verses", "30th Letters of Verses", "31st Letters of Verses", "32nd Letters of Verses", "33rd Letters of Verses", "34th Letters of Verses", "35th Letters of Verses", "36th Letters of Verses", "37th Letters of Verses", "38th Letters of Verses", "39th Letters of Verses", "40th Letters of Verses", "41st Letters of Verses", "42nd Letters of Verses", "43rd Letters of Verses", "44th Letters of Verses", "45th Letters of Verses", "46th Letters of Verses", "47th Letters of Verses", "48th Letters of Verses", "49th Letters of Verses", "50th Letters of Verses", "51st Letters of Verses", "52nd Letters of Verses", "53rd Letters of Verses", "54th Letters of Verses", "55th Letters of Verses", "56th Letters of Verses", "57th Letters of Verses", "58th Letters of Verses", "59th Letters of Verses", "60th Letters of Verses", "61st Letters of Verses", "62nd Letters of Verses", "63rd Letters of Verses", "64th Letters of Verses", "65th Letters of Verses", "66th Letters of Verses", "67th Letters of Verses", "68th Letters of Verses", "69th Letters of Verses", "70th Letters of Verses", "71st Letters of Verses", "72nd Letters of Verses", "73rd Letters of Verses", "74th Letters of Verses", "75th Letters of Verses", "76th Letters of Verses", "77th Letters of Verses", "78th Letters of Verses", "79th Letters of Verses", "80th Letters of Verses", "81st Letters of Verses", "82nd Letters of Verses", "83rd Letters of Verses", "84th Letters of Verses", "85th Letters of Verses", "86th Letters of Verses", "87th Letters of Verses", "88th Letters of Verses", "89th Letters of Verses", "90th Letters of Verses", "91st Letters of Verses", "92nd Letters of Verses", "93rd Letters of Verses", "94th Letters of Verses", "95th Letters of Verses", "96th Letters of Verses", "97th Letters of Verses", "98th Letters of Verses", "99th Letters of Verses", "100th Letters of Verses", "101st Letters of Verses", "102nd Letters of Verses", "103rd Letters of Verses", "104th Letters of Verses", "105th Letters of Verses", "106th Letters of Verses", "107th Letters of Verses", "108th Letters of Verses", "109th Letters of Verses", "110th Letters of Verses", "111th Letters of Verses", "112th Letters of Verses", "113th Letters of Verses", "114th Letters of Verses", "115th Letters of Verses", "116th Letters of Verses", "117th Letters of Verses", "118th Letters of Verses", "119th Letters of Verses", "120th Letters of Verses", "121st Letters of Verses", "122nd Letters of Verses", "123rd Letters of Verses", "124th Letters of Verses", "125th Letters of Verses", "126th Letters of Verses", "127th Letters of Verses", "128th Letters of Verses", "129th Letters of Verses", "130th Letters of Verses", "131st Letters of Verses", "132nd Letters of Verses", "133rd Letters of Verses", "134th Letters of Verses", "135th Letters of Verses", "136th Letters of Verses", "137th Letters of Verses", "138th Letters of Verses", "139th Letters of Verses", "140th Letters of Verses", "141st Letters of Verses", "142nd Letters of Verses", "143rd Letters of Verses", "144th Letters of Verses", "145th Letters of Verses", "146th Letters of Verses", "147th Letters of Verses", "148th Letters of Verses", "149th Letters of Verses", "150th Letters of Verses", "151st Letters of Verses", "152nd Letters of Verses", "153rd Letters of Verses", "154th Letters of Verses", "155th Letters of Verses", "156th Letters of Verses", "157th Letters of Verses", "158th Letters of Verses", "159th Letters of Verses", "160th Letters of Verses", "161st Letters of Verses", "162nd Letters of Verses", "163rd Letters of Verses", "164th Letters of Verses", "165th Letters of Verses", "166th Letters of Verses", "167th Letters of Verses", "168th Letters of Verses", "169th Letters of Verses", "170th Letters of Verses", "171st Letters of Verses", "172nd Letters of Verses", "173rd Letters of Verses", "174th Letters of Verses", "175th Letters of Verses", "176th Letters of Verses", "177th Letters of Verses", "178th Letters of Verses", "179th Letters of Verses", "180th Letters of Verses", "181st Letters of Verses", "182nd Letters of Verses", "183rd Letters of Verses", "184th Letters of Verses", "185th Letters of Verses", "186th Letters of Verses", "187th Letters of Verses", "188th Letters of Verses", "189th Letters of Verses", "190th Letters of Verses", "191st Letters of Verses", "192nd Letters of Verses", "193rd Letters of Verses", "194th Letters of Verses", "195th Letters of Verses", "196th Letters of Verses", "197th Letters of Verses", "198th Letters of Verses", "199th Letters of Verses", "200th Letters of Verses", "201st Letters of Verses", "202nd Letters of Verses", "203rd Letters of Verses", "204th Letters of Verses", "205th Letters of Verses", "206th Letters of Verses", "207th Letters of Verses", "208th Letters of Verses", "209th Letters of Verses", "210th Letters of Verses", "211th Letters of Verses", "212th Letters of Verses", "213th Letters of Verses", "214th Letters of Verses", "215th Letters of Verses", "216th Letters of Verses", "217th Letters of Verses", "218th Letters of Verses", "219th Letters of Verses", "220th Letters of Verses", "221st Letters of Verses", "222nd Letters of Verses", "223rd Letters of Verses", "224th Letters of Verses", "225th Letters of Verses", "226th Letters of Verses", "227th Letters of Verses", "228th Letters of Verses", "229th Letters of Verses", "230th Letters of Verses", "231st Letters of Verses", "232nd Letters of Verses", "233rd Letters of Verses", "234th Letters of Verses", "235th Letters of Verses", "236th Letters of Verses", "237th Letters of Verses", "238th Letters of Verses", "239th Letters of Verses", "240th Letters of Verses", "241st Letters of Verses", "242nd Letters of Verses", "243rd Letters of Verses", "244th Letters of Verses", "245th Letters of Verses", "246th Letters of Verses", "247th Letters of Verses", "248th Letters of Verses", "249th Letters of Verses", "250th Letters of Verses", "251st Letters of Verses", "252nd Letters of Verses", "253rd Letters of Verses", "254th Letters of Verses"],
        ["Last Letters of Verses", "Last Letters of Verses"],
        ["First & Last Letters of Verses", "First & Last Letters of Verses"],
        ["(272-525) 1st - 254th (Odd Verses Forward -- Even Verses Reversed)", "1st Letters of Verses (Forward/Reverse)", "2nd Letters of Verses (Forward/Reverse)", "3rd Letters of Verses (Forward/Reverse)", "4th Letters of Verses (Forward/Reverse)", "5th Letters of Verses (Forward/Reverse)", "6th Letters of Verses (Forward/Reverse)", "7th Letters of Verses (Forward/Reverse)", "8th Letters of Verses (Forward/Reverse)", "9th Letters of Verses (Forward/Reverse)", "10th Letters of Verses (Forward/Reverse)", "11th Letters of Verses (Forward/Reverse)", "12th Letters of Verses (Forward/Reverse)", "13th Letters of Verses (Forward/Reverse)", "14th Letters of Verses (Forward/Reverse)", "15th Letters of Verses (Forward/Reverse)", "16th Letters of Verses (Forward/Reverse)", "17th Letters of Verses (Forward/Reverse)", "18th Letters of Verses (Forward/Reverse)", "19th Letters of Verses (Forward/Reverse)", "20th Letters of Verses (Forward/Reverse)", "21st Letters of Verses (Forward/Reverse)", "22nd Letters of Verses (Forward/Reverse)", "23rd Letters of Verses (Forward/Reverse)", "24th Letters of Verses (Forward/Reverse)", "25th Letters of Verses (Forward/Reverse)", "26th Letters of Verses (Forward/Reverse)", "27th Letters of Verses (Forward/Reverse)", "28th Letters of Verses (Forward/Reverse)", "29th Letters of Verses (Forward/Reverse)", "30th Letters of Verses (Forward/Reverse)", "31st Letters of Verses (Forward/Reverse)", "32nd Letters of Verses (Forward/Reverse)", "33rd Letters of Verses (Forward/Reverse)", "34th Letters of Verses (Forward/Reverse)", "35th Letters of Verses (Forward/Reverse)", "36th Letters of Verses (Forward/Reverse)", "37th Letters of Verses (Forward/Reverse)", "38th Letters of Verses (Forward/Reverse)", "39th Letters of Verses (Forward/Reverse)", "40th Letters of Verses (Forward/Reverse)", "41st Letters of Verses (Forward/Reverse)", "42nd Letters of Verses (Forward/Reverse)", "43rd Letters of Verses (Forward/Reverse)", "44th Letters of Verses (Forward/Reverse)", "45th Letters of Verses (Forward/Reverse)", "46th Letters of Verses (Forward/Reverse)", "47th Letters of Verses (Forward/Reverse)", "48th Letters of Verses (Forward/Reverse)", "49th Letters of Verses (Forward/Reverse)", "50th Letters of Verses (Forward/Reverse)", "51st Letters of Verses (Forward/Reverse)", "52nd Letters of Verses (Forward/Reverse)", "53rd Letters of Verses (Forward/Reverse)", "54th Letters of Verses (Forward/Reverse)", "55th Letters of Verses (Forward/Reverse)", "56th Letters of Verses (Forward/Reverse)", "57th Letters of Verses (Forward/Reverse)", "58th Letters of Verses (Forward/Reverse)", "59th Letters of Verses (Forward/Reverse)", "60th Letters of Verses (Forward/Reverse)", "61st Letters of Verses (Forward/Reverse)", "62nd Letters of Verses (Forward/Reverse)", "63rd Letters of Verses (Forward/Reverse)", "64th Letters of Verses (Forward/Reverse)", "65th Letters of Verses (Forward/Reverse)", "66th Letters of Verses (Forward/Reverse)", "67th Letters of Verses (Forward/Reverse)", "68th Letters of Verses (Forward/Reverse)", "69th Letters of Verses (Forward/Reverse)", "70th Letters of Verses (Forward/Reverse)", "71st Letters of Verses (Forward/Reverse)", "72nd Letters of Verses (Forward/Reverse)", "73rd Letters of Verses (Forward/Reverse)", "74th Letters of Verses (Forward/Reverse)", "75th Letters of Verses (Forward/Reverse)", "76th Letters of Verses (Forward/Reverse)", "77th Letters of Verses (Forward/Reverse)", "78th Letters of Verses (Forward/Reverse)", "79th Letters of Verses (Forward/Reverse)", "80th Letters of Verses (Forward/Reverse)", "81st Letters of Verses (Forward/Reverse)", "82nd Letters of Verses (Forward/Reverse)", "83rd Letters of Verses (Forward/Reverse)", "84th Letters of Verses (Forward/Reverse)", "85th Letters of Verses (Forward/Reverse)", "86th Letters of Verses (Forward/Reverse)", "87th Letters of Verses (Forward/Reverse)", "88th Letters of Verses (Forward/Reverse)", "89th Letters of Verses (Forward/Reverse)", "90th Letters of Verses (Forward/Reverse)", "91st Letters of Verses (Forward/Reverse)", "92nd Letters of Verses (Forward/Reverse)", "93rd Letters of Verses (Forward/Reverse)", "94th Letters of Verses (Forward/Reverse)", "95th Letters of Verses (Forward/Reverse)", "96th Letters of Verses (Forward/Reverse)", "97th Letters of Verses (Forward/Reverse)", "98th Letters of Verses (Forward/Reverse)", "99th Letters of Verses (Forward/Reverse)", "100th Letters of Verses (Forward/Reverse)", "101st Letters of Verses (Forward/Reverse)", "102nd Letters of Verses (Forward/Reverse)", "103rd Letters of Verses (Forward/Reverse)", "104th Letters of Verses (Forward/Reverse)", "105th Letters of Verses (Forward/Reverse)", "106th Letters of Verses (Forward/Reverse)", "107th Letters of Verses (Forward/Reverse)", "108th Letters of Verses (Forward/Reverse)", "109th Letters of Verses (Forward/Reverse)", "110th Letters of Verses (Forward/Reverse)", "111th Letters of Verses (Forward/Reverse)", "112th Letters of Verses (Forward/Reverse)", "113th Letters of Verses (Forward/Reverse)", "114th Letters of Verses (Forward/Reverse)", "115th Letters of Verses (Forward/Reverse)", "116th Letters of Verses (Forward/Reverse)", "117th Letters of Verses (Forward/Reverse)", "118th Letters of Verses (Forward/Reverse)", "119th Letters of Verses (Forward/Reverse)", "120th Letters of Verses (Forward/Reverse)", "121st Letters of Verses (Forward/Reverse)", "122nd Letters of Verses (Forward/Reverse)", "123rd Letters of Verses (Forward/Reverse)", "124th Letters of Verses (Forward/Reverse)", "125th Letters of Verses (Forward/Reverse)", "126th Letters of Verses (Forward/Reverse)", "127th Letters of Verses (Forward/Reverse)", "128th Letters of Verses (Forward/Reverse)", "129th Letters of Verses (Forward/Reverse)", "130th Letters of Verses (Forward/Reverse)", "131st Letters of Verses (Forward/Reverse)", "132nd Letters of Verses (Forward/Reverse)", "133rd Letters of Verses (Forward/Reverse)", "134th Letters of Verses (Forward/Reverse)", "135th Letters of Verses (Forward/Reverse)", "136th Letters of Verses (Forward/Reverse)", "137th Letters of Verses (Forward/Reverse)", "138th Letters of Verses (Forward/Reverse)", "139th Letters of Verses (Forward/Reverse)", "140th Letters of Verses (Forward/Reverse)", "141st Letters of Verses (Forward/Reverse)", "142nd Letters of Verses (Forward/Reverse)", "143rd Letters of Verses (Forward/Reverse)", "144th Letters of Verses (Forward/Reverse)", "145th Letters of Verses (Forward/Reverse)", "146th Letters of Verses (Forward/Reverse)", "147th Letters of Verses (Forward/Reverse)", "148th Letters of Verses (Forward/Reverse)", "149th Letters of Verses (Forward/Reverse)", "150th Letters of Verses (Forward/Reverse)", "151st Letters of Verses (Forward/Reverse)", "152nd Letters of Verses (Forward/Reverse)", "153rd Letters of Verses (Forward/Reverse)", "154th Letters of Verses (Forward/Reverse)", "155th Letters of Verses (Forward/Reverse)", "156th Letters of Verses (Forward/Reverse)", "157th Letters of Verses (Forward/Reverse)", "158th Letters of Verses (Forward/Reverse)", "159th Letters of Verses (Forward/Reverse)", "160th Letters of Verses (Forward/Reverse)", "161st Letters of Verses (Forward/Reverse)", "162nd Letters of Verses (Forward/Reverse)", "163rd Letters of Verses (Forward/Reverse)", "164th Letters of Verses (Forward/Reverse)", "165th Letters of Verses (Forward/Reverse)", "166th Letters of Verses (Forward/Reverse)", "167th Letters of Verses (Forward/Reverse)", "168th Letters of Verses (Forward/Reverse)", "169th Letters of Verses (Forward/Reverse)", "170th Letters of Verses (Forward/Reverse)", "171st Letters of Verses (Forward/Reverse)", "172nd Letters of Verses (Forward/Reverse)", "173rd Letters of Verses (Forward/Reverse)", "174th Letters of Verses (Forward/Reverse)", "175th Letters of Verses (Forward/Reverse)", "176th Letters of Verses (Forward/Reverse)", "177th Letters of Verses (Forward/Reverse)", "178th Letters of Verses (Forward/Reverse)", "179th Letters of Verses (Forward/Reverse)", "180th Letters of Verses (Forward/Reverse)", "181st Letters of Verses (Forward/Reverse)", "182nd Letters of Verses (Forward/Reverse)", "183rd Letters of Verses (Forward/Reverse)", "184th Letters of Verses (Forward/Reverse)", "185th Letters of Verses (Forward/Reverse)", "186th Letters of Verses (Forward/Reverse)", "187th Letters of Verses (Forward/Reverse)", "188th Letters of Verses (Forward/Reverse)", "189th Letters of Verses (Forward/Reverse)", "190th Letters of Verses (Forward/Reverse)", "191st Letters of Verses (Forward/Reverse)", "192nd Letters of Verses (Forward/Reverse)", "193rd Letters of Verses (Forward/Reverse)", "194th Letters of Verses (Forward/Reverse)", "195th Letters of Verses (Forward/Reverse)", "196th Letters of Verses (Forward/Reverse)", "197th Letters of Verses (Forward/Reverse)", "198th Letters of Verses (Forward/Reverse)", "199th Letters of Verses (Forward/Reverse)", "200th Letters of Verses (Forward/Reverse)", "201st Letters of Verses (Forward/Reverse)", "202nd Letters of Verses (Forward/Reverse)", "203rd Letters of Verses (Forward/Reverse)", "204th Letters of Verses (Forward/Reverse)", "205th Letters of Verses (Forward/Reverse)", "206th Letters of Verses (Forward/Reverse)", "207th Letters of Verses (Forward/Reverse)", "208th Letters of Verses (Forward/Reverse)", "209th Letters of Verses (Forward/Reverse)", "210th Letters of Verses (Forward/Reverse)", "211th Letters of Verses (Forward/Reverse)", "212th Letters of Verses (Forward/Reverse)", "213th Letters of Verses (Forward/Reverse)", "214th Letters of Verses (Forward/Reverse)", "215th Letters of Verses (Forward/Reverse)", "216th Letters of Verses (Forward/Reverse)", "217th Letters of Verses (Forward/Reverse)", "218th Letters of Verses (Forward/Reverse)", "219th Letters of Verses (Forward/Reverse)", "220th Letters of Verses (Forward/Reverse)", "221st Letters of Verses (Forward/Reverse)", "222nd Letters of Verses (Forward/Reverse)", "223rd Letters of Verses (Forward/Reverse)", "224th Letters of Verses (Forward/Reverse)", "225th Letters of Verses (Forward/Reverse)", "226th Letters of Verses (Forward/Reverse)", "227th Letters of Verses (Forward/Reverse)", "228th Letters of Verses (Forward/Reverse)", "229th Letters of Verses (Forward/Reverse)", "230th Letters of Verses (Forward/Reverse)", "231st Letters of Verses (Forward/Reverse)", "232nd Letters of Verses (Forward/Reverse)", "233rd Letters of Verses (Forward/Reverse)", "234th Letters of Verses (Forward/Reverse)", "235th Letters of Verses (Forward/Reverse)", "236th Letters of Verses (Forward/Reverse)", "237th Letters of Verses (Forward/Reverse)", "238th Letters of Verses (Forward/Reverse)", "239th Letters of Verses (Forward/Reverse)", "240th Letters of Verses (Forward/Reverse)", "241st Letters of Verses (Forward/Reverse)", "242nd Letters of Verses (Forward/Reverse)", "243rd Letters of Verses (Forward/Reverse)", "244th Letters of Verses (Forward/Reverse)", "245th Letters of Verses (Forward/Reverse)", "246th Letters of Verses (Forward/Reverse)", "247th Letters of Verses (Forward/Reverse)", "248th Letters of Verses (Forward/Reverse)", "249th Letters of Verses (Forward/Reverse)", "250th Letters of Verses (Forward/Reverse)", "251st Letters of Verses (Forward/Reverse)", "252nd Letters of Verses (Forward/Reverse)", "253rd Letters of Verses (Forward/Reverse)", "254th Letters of Verses (Forward/Reverse)"],
        ["(526-779) 1st - 254th (Odd Verses Reversed -- Even Verses Forward)", "1st Letters of Verses (Forward/Reverse)", "2nd Letters of Verses (Forward/Reverse)", "3rd Letters of Verses (Forward/Reverse)", "4th Letters of Verses (Forward/Reverse)", "5th Letters of Verses (Forward/Reverse)", "6th Letters of Verses (Forward/Reverse)", "7th Letters of Verses (Forward/Reverse)", "8th Letters of Verses (Forward/Reverse)", "9th Letters of Verses (Forward/Reverse)", "10th Letters of Verses (Forward/Reverse)", "11th Letters of Verses (Forward/Reverse)", "12th Letters of Verses (Forward/Reverse)", "13th Letters of Verses (Forward/Reverse)", "14th Letters of Verses (Forward/Reverse)", "15th Letters of Verses (Forward/Reverse)", "16th Letters of Verses (Forward/Reverse)", "17th Letters of Verses (Forward/Reverse)", "18th Letters of Verses (Forward/Reverse)", "19th Letters of Verses (Forward/Reverse)", "20th Letters of Verses (Forward/Reverse)", "21st Letters of Verses (Forward/Reverse)", "22nd Letters of Verses (Forward/Reverse)", "23rd Letters of Verses (Forward/Reverse)", "24th Letters of Verses (Forward/Reverse)", "25th Letters of Verses (Forward/Reverse)", "26th Letters of Verses (Forward/Reverse)", "27th Letters of Verses (Forward/Reverse)", "28th Letters of Verses (Forward/Reverse)", "29th Letters of Verses (Forward/Reverse)", "30th Letters of Verses (Forward/Reverse)", "31st Letters of Verses (Forward/Reverse)", "32nd Letters of Verses (Forward/Reverse)", "33rd Letters of Verses (Forward/Reverse)", "34th Letters of Verses (Forward/Reverse)", "35th Letters of Verses (Forward/Reverse)", "36th Letters of Verses (Forward/Reverse)", "37th Letters of Verses (Forward/Reverse)", "38th Letters of Verses (Forward/Reverse)", "39th Letters of Verses (Forward/Reverse)", "40th Letters of Verses (Forward/Reverse)", "41st Letters of Verses (Forward/Reverse)", "42nd Letters of Verses (Forward/Reverse)", "43rd Letters of Verses (Forward/Reverse)", "44th Letters of Verses (Forward/Reverse)", "45th Letters of Verses (Forward/Reverse)", "46th Letters of Verses (Forward/Reverse)", "47th Letters of Verses (Forward/Reverse)", "48th Letters of Verses (Forward/Reverse)", "49th Letters of Verses (Forward/Reverse)", "50th Letters of Verses (Forward/Reverse)", "51st Letters of Verses (Forward/Reverse)", "52nd Letters of Verses (Forward/Reverse)", "53rd Letters of Verses (Forward/Reverse)", "54th Letters of Verses (Forward/Reverse)", "55th Letters of Verses (Forward/Reverse)", "56th Letters of Verses (Forward/Reverse)", "57th Letters of Verses (Forward/Reverse)", "58th Letters of Verses (Forward/Reverse)", "59th Letters of Verses (Forward/Reverse)", "60th Letters of Verses (Forward/Reverse)", "61st Letters of Verses (Forward/Reverse)", "62nd Letters of Verses (Forward/Reverse)", "63rd Letters of Verses (Forward/Reverse)", "64th Letters of Verses (Forward/Reverse)", "65th Letters of Verses (Forward/Reverse)", "66th Letters of Verses (Forward/Reverse)", "67th Letters of Verses (Forward/Reverse)", "68th Letters of Verses (Forward/Reverse)", "69th Letters of Verses (Forward/Reverse)", "70th Letters of Verses (Forward/Reverse)", "71st Letters of Verses (Forward/Reverse)", "72nd Letters of Verses (Forward/Reverse)", "73rd Letters of Verses (Forward/Reverse)", "74th Letters of Verses (Forward/Reverse)", "75th Letters of Verses (Forward/Reverse)", "76th Letters of Verses (Forward/Reverse)", "77th Letters of Verses (Forward/Reverse)", "78th Letters of Verses (Forward/Reverse)", "79th Letters of Verses (Forward/Reverse)", "80th Letters of Verses (Forward/Reverse)", "81st Letters of Verses (Forward/Reverse)", "82nd Letters of Verses (Forward/Reverse)", "83rd Letters of Verses (Forward/Reverse)", "84th Letters of Verses (Forward/Reverse)", "85th Letters of Verses (Forward/Reverse)", "86th Letters of Verses (Forward/Reverse)", "87th Letters of Verses (Forward/Reverse)", "88th Letters of Verses (Forward/Reverse)", "89th Letters of Verses (Forward/Reverse)", "90th Letters of Verses (Forward/Reverse)", "91st Letters of Verses (Forward/Reverse)", "92nd Letters of Verses (Forward/Reverse)", "93rd Letters of Verses (Forward/Reverse)", "94th Letters of Verses (Forward/Reverse)", "95th Letters of Verses (Forward/Reverse)", "96th Letters of Verses (Forward/Reverse)", "97th Letters of Verses (Forward/Reverse)", "98th Letters of Verses (Forward/Reverse)", "99th Letters of Verses (Forward/Reverse)", "100th Letters of Verses (Forward/Reverse)", "101st Letters of Verses (Forward/Reverse)", "102nd Letters of Verses (Forward/Reverse)", "103rd Letters of Verses (Forward/Reverse)", "104th Letters of Verses (Forward/Reverse)", "105th Letters of Verses (Forward/Reverse)", "106th Letters of Verses (Forward/Reverse)", "107th Letters of Verses (Forward/Reverse)", "108th Letters of Verses (Forward/Reverse)", "109th Letters of Verses (Forward/Reverse)", "110th Letters of Verses (Forward/Reverse)", "111th Letters of Verses (Forward/Reverse)", "112th Letters of Verses (Forward/Reverse)", "113th Letters of Verses (Forward/Reverse)", "114th Letters of Verses (Forward/Reverse)", "115th Letters of Verses (Forward/Reverse)", "116th Letters of Verses (Forward/Reverse)", "117th Letters of Verses (Forward/Reverse)", "118th Letters of Verses (Forward/Reverse)", "119th Letters of Verses (Forward/Reverse)", "120th Letters of Verses (Forward/Reverse)", "121st Letters of Verses (Forward/Reverse)", "122nd Letters of Verses (Forward/Reverse)", "123rd Letters of Verses (Forward/Reverse)", "124th Letters of Verses (Forward/Reverse)", "125th Letters of Verses (Forward/Reverse)", "126th Letters of Verses (Forward/Reverse)", "127th Letters of Verses (Forward/Reverse)", "128th Letters of Verses (Forward/Reverse)", "129th Letters of Verses (Forward/Reverse)", "130th Letters of Verses (Forward/Reverse)", "131st Letters of Verses (Forward/Reverse)", "132nd Letters of Verses (Forward/Reverse)", "133rd Letters of Verses (Forward/Reverse)", "134th Letters of Verses (Forward/Reverse)", "135th Letters of Verses (Forward/Reverse)", "136th Letters of Verses (Forward/Reverse)", "137th Letters of Verses (Forward/Reverse)", "138th Letters of Verses (Forward/Reverse)", "139th Letters of Verses (Forward/Reverse)", "140th Letters of Verses (Forward/Reverse)", "141st Letters of Verses (Forward/Reverse)", "142nd Letters of Verses (Forward/Reverse)", "143rd Letters of Verses (Forward/Reverse)", "144th Letters of Verses (Forward/Reverse)", "145th Letters of Verses (Forward/Reverse)", "146th Letters of Verses (Forward/Reverse)", "147th Letters of Verses (Forward/Reverse)", "148th Letters of Verses (Forward/Reverse)", "149th Letters of Verses (Forward/Reverse)", "150th Letters of Verses (Forward/Reverse)", "151st Letters of Verses (Forward/Reverse)", "152nd Letters of Verses (Forward/Reverse)", "153rd Letters of Verses (Forward/Reverse)", "154th Letters of Verses (Forward/Reverse)", "155th Letters of Verses (Forward/Reverse)", "156th Letters of Verses (Forward/Reverse)", "157th Letters of Verses (Forward/Reverse)", "158th Letters of Verses (Forward/Reverse)", "159th Letters of Verses (Forward/Reverse)", "160th Letters of Verses (Forward/Reverse)", "161st Letters of Verses (Forward/Reverse)", "162nd Letters of Verses (Forward/Reverse)", "163rd Letters of Verses (Forward/Reverse)", "164th Letters of Verses (Forward/Reverse)", "165th Letters of Verses (Forward/Reverse)", "166th Letters of Verses (Forward/Reverse)", "167th Letters of Verses (Forward/Reverse)", "168th Letters of Verses (Forward/Reverse)", "169th Letters of Verses (Forward/Reverse)", "170th Letters of Verses (Forward/Reverse)", "171st Letters of Verses (Forward/Reverse)", "172nd Letters of Verses (Forward/Reverse)", "173rd Letters of Verses (Forward/Reverse)", "174th Letters of Verses (Forward/Reverse)", "175th Letters of Verses (Forward/Reverse)", "176th Letters of Verses (Forward/Reverse)", "177th Letters of Verses (Forward/Reverse)", "178th Letters of Verses (Forward/Reverse)", "179th Letters of Verses (Forward/Reverse)", "180th Letters of Verses (Forward/Reverse)", "181st Letters of Verses (Forward/Reverse)", "182nd Letters of Verses (Forward/Reverse)", "183rd Letters of Verses (Forward/Reverse)", "184th Letters of Verses (Forward/Reverse)", "185th Letters of Verses (Forward/Reverse)", "186th Letters of Verses (Forward/Reverse)", "187th Letters of Verses (Forward/Reverse)", "188th Letters of Verses (Forward/Reverse)", "189th Letters of Verses (Forward/Reverse)", "190th Letters of Verses (Forward/Reverse)", "191st Letters of Verses (Forward/Reverse)", "192nd Letters of Verses (Forward/Reverse)", "193rd Letters of Verses (Forward/Reverse)", "194th Letters of Verses (Forward/Reverse)", "195th Letters of Verses (Forward/Reverse)", "196th Letters of Verses (Forward/Reverse)", "197th Letters of Verses (Forward/Reverse)", "198th Letters of Verses (Forward/Reverse)", "199th Letters of Verses (Forward/Reverse)", "200th Letters of Verses (Forward/Reverse)", "201st Letters of Verses (Forward/Reverse)", "202nd Letters of Verses (Forward/Reverse)", "203rd Letters of Verses (Forward/Reverse)", "204th Letters of Verses (Forward/Reverse)", "205th Letters of Verses (Forward/Reverse)", "206th Letters of Verses (Forward/Reverse)", "207th Letters of Verses (Forward/Reverse)", "208th Letters of Verses (Forward/Reverse)", "209th Letters of Verses (Forward/Reverse)", "210th Letters of Verses (Forward/Reverse)", "211th Letters of Verses (Forward/Reverse)", "212th Letters of Verses (Forward/Reverse)", "213th Letters of Verses (Forward/Reverse)", "214th Letters of Verses (Forward/Reverse)", "215th Letters of Verses (Forward/Reverse)", "216th Letters of Verses (Forward/Reverse)", "217th Letters of Verses (Forward/Reverse)", "218th Letters of Verses (Forward/Reverse)", "219th Letters of Verses (Forward/Reverse)", "220th Letters of Verses (Forward/Reverse)", "221st Letters of Verses (Forward/Reverse)", "222nd Letters of Verses (Forward/Reverse)", "223rd Letters of Verses (Forward/Reverse)", "224th Letters of Verses (Forward/Reverse)", "225th Letters of Verses (Forward/Reverse)", "226th Letters of Verses (Forward/Reverse)", "227th Letters of Verses (Forward/Reverse)", "228th Letters of Verses (Forward/Reverse)", "229th Letters of Verses (Forward/Reverse)", "230th Letters of Verses (Forward/Reverse)", "231st Letters of Verses (Forward/Reverse)", "232nd Letters of Verses (Forward/Reverse)", "233rd Letters of Verses (Forward/Reverse)", "234th Letters of Verses (Forward/Reverse)", "235th Letters of Verses (Forward/Reverse)", "236th Letters of Verses (Forward/Reverse)", "237th Letters of Verses (Forward/Reverse)", "238th Letters of Verses (Forward/Reverse)", "239th Letters of Verses (Forward/Reverse)", "240th Letters of Verses (Forward/Reverse)", "241st Letters of Verses (Forward/Reverse)", "242nd Letters of Verses (Forward/Reverse)", "243rd Letters of Verses (Forward/Reverse)", "244th Letters of Verses (Forward/Reverse)", "245th Letters of Verses (Forward/Reverse)", "246th Letters of Verses (Forward/Reverse)", "247th Letters of Verses (Forward/Reverse)", "248th Letters of Verses (Forward/Reverse)", "249th Letters of Verses (Forward/Reverse)", "250th Letters of Verses (Forward/Reverse)", "251st Letters of Verses (Forward/Reverse)", "252nd Letters of Verses (Forward/Reverse)", "253rd Letters of Verses (Forward/Reverse)", "254th Letters of Verses (Forward/Reverse)"]
    ]


    for (let i = 0; i < textForGroups.length; i++) {
        console.log(textForGroups.length)
        const listbox = document.getElementById("listbox")

        const details = document.createElement('details')

        const summary = document.createElement('summary')
        summary.innerText = textForGroups[i][0]
        details.appendChild(summary)

        var label = document.createElement("label")
        label.innerText = "Choose all"

        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        label.append(checkbox)

        details.appendChild(label)
        listbox.appendChild(details)

        for (let j = 0; j < textForGroups[i].length; j++) {
            var label = document.createElement("label");
            label.id = "individualLabel"
            label.htmlFor = textForGroups[i][j];
            label.innerText = textForGroups[i][j] + 'INNER LOOP label'
            details.appendChild(label);
            const input = document.createElement('input')
            input.type = "checkbox"
            input.id = textForGroups[i][j] + "innerloopcheckbox"
            input.name = textForGroups[i][j]
            label.appendChild(input)
        }
    }
}

function init() {
    lastUpdatedFunction()
    checkCanSearch();
    addTheCheckboxes();
    let i = 0
    word1.forEach(word => {
        i++
        localStorage.setItem(i, word);
        for (let letter = 0; letter < word.length; letter++) {
            // console.log(word[letter])

        }
    })

    const checkboxes = document.querySelectorAll(' input[type=checkbox]');

    var myFunction = function () {
        // var attribute = this.getAttribute("data-myattribute");

        console.log(this.id);
    };

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', myFunction, false);
    }

}

init()