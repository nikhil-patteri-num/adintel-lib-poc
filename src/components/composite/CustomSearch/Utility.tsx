export const createQueryArray = (queryArrayBySpace: []) => {
    const keyword1 = ['=', '!=', 'IN', 'NOT IN'];
    const keyword2 = ['AND', 'OR', 'ORDER', 'BY'];
    const finalQueryArray: any = [];
    const resultArrayWithStringFormat: any = [];
    const finalQueryJSONArray: any = [];
    let tmpArray: any = [];
    let testArray: any = [];
    let flag = 'HEADING';
    let num = 0;
    let startWithDoubleQuotes = false;
    let startWithSingleQuotes = false;
    let endWithDoubleQuotes = false;
    let endWithSingleQuotes = false;
    let lastChar = queryArrayBySpace[queryArrayBySpace.length - 1];
    let lastSpace = false;
    queryArrayBySpace.forEach((element: any, currentIndex: any) => {
        let currentW = '';
        let currentNew = element;     // if(element === " " && startWithDoubleQuotes && endWithDoubleQuotes){

        // }
        for (const char of element) {
            // currentW += char;
            //  currentNew += char;
            if (char === '$') {
                currentW += char;
            } else if (flag === 'VALUE' && (char === '"' || char === "'")) {
                if (char === '"') {
                    if (!startWithSingleQuotes && !startWithDoubleQuotes) {
                        startWithDoubleQuotes = true;
                    } else if (startWithDoubleQuotes) {
                        endWithDoubleQuotes = true;
                    }
                    // else if (startWithSingleQuotes) {
                    //   opr = "''";
                    // }
                    currentW += char;
                } else if (char === "'") {
                    if (!startWithSingleQuotes && !startWithDoubleQuotes) {
                        startWithSingleQuotes = true;
                    } else if (startWithSingleQuotes) {
                        endWithSingleQuotes = true;
                    }
                    // else if (startWithDoubleQuotes) {
                    //   opr = "''";
                    // }
                    currentW += char;
                }
            } else {
                currentW += char;
            }
        }

        if (currentIndex === 0) {
            finalQueryArray.push(currentW);
            resultArrayWithStringFormat.push(currentNew);
        } else {
            if (keyword1.includes(currentW)) {
                finalQueryArray.push(currentW);
                resultArrayWithStringFormat.push(currentNew);
                flag = 'VALUE'
            } else if (keyword2.includes(currentW)) {
                if (testArray.length !== 0) {
                    var str = testArray.join(' ');
                    testArray.map((item: any, index: any) => {
                        var eleIndex = finalQueryArray.indexOf(item);
                        var eleIndex1 = resultArrayWithStringFormat.indexOf(item);
                        finalQueryArray.splice(eleIndex, 1);
                        resultArrayWithStringFormat.splice(eleIndex1, 1);
                        if (index === 0) {
                            finalQueryArray.splice(eleIndex, 0, str);
                            resultArrayWithStringFormat.splice(eleIndex1, 0, str);
                        }
                    });
                    testArray = [];
                }
                finalQueryArray.push(currentW);
                resultArrayWithStringFormat.push(currentNew);
                flag = 'HEADING';
                num++;
            } else {
                if (flag === 'HEADING') {
                    finalQueryArray.push(currentW);
                    resultArrayWithStringFormat.push(currentNew);
                } else {
                    finalQueryArray.push(currentW);
                    resultArrayWithStringFormat.push(currentNew);
                    // if (currentW != "" && currentW !== " ") {
                    testArray.push(currentW);
                    tmpArray.push({ num: num, index: currentIndex, value: currentW });
                    //  }
                    if (queryArrayBySpace.length - 1 === currentIndex) {
                        var str = testArray.join(' ');
                        testArray.map((item: any, index: any) => {
                            var eleIndex = finalQueryArray.indexOf(item);
                            var eleIndex1 = resultArrayWithStringFormat.indexOf(item);
                            finalQueryArray.splice(eleIndex, 1);
                            resultArrayWithStringFormat.splice(eleIndex1, 1);
                            if (index === 0) {
                                finalQueryArray.splice(eleIndex, 0, str);
                                resultArrayWithStringFormat.splice(eleIndex1, 0, str);
                            }
                        });
                        testArray = [];
                        lastSpace = str.substr(str.length - 1) === " ";
                    }
                }
            }
        }
    });
    lastSpace = queryArrayBySpace[queryArrayBySpace.length - 1] === "";
    // If Last Element is space then push blank object

    if (lastSpace) {
        var str: string = finalQueryArray[finalQueryArray.length - 1];
        if (str.slice(-1) === " ") {
            var eleIndex2 = resultArrayWithStringFormat.indexOf(str);
            finalQueryArray.splice(eleIndex2, 1);
            finalQueryArray.splice(eleIndex2, 0, str.trim());
            finalQueryArray.push("")
        }
        // if (((startWithDoubleQuotes && endWithDoubleQuotes) || (startWithSingleQuotes && endWithSingleQuotes))) {
        //   finalQueryArray.push("")
        // }
    }
    let lastString = finalQueryArray[finalQueryArray.length - 2];
    const result = {
        originalArray: queryArrayBySpace,
        resultArrayWithStringFormat,
        resultQueryArray: finalQueryArray,
        resultQueryJSONArray: finalQueryJSONArray,
        startWithDoubleQuotes,
        endWithDoubleQuotes,
        startWithSingleQuotes,
        endWithSingleQuotes,
        lastChar,
        lastString,
        lastSpace,
        resultQueryString: finalQueryArray.join(" "),
        flag
    }
    // console.log('Result:', result);
    return result;
};


export const getQueryArrayByQuery = (query: string) => {
    const finalQueryArray: any = [];
    const wordsWithQuotesAndSpace: any = query.match(/'.*?'/g);
    const queryArrayBySpace = query.replace(/'.*?'/g, '$').split(' ');
    let spaceWordIndex = 0;
    queryArrayBySpace.forEach((element: any) => {
        let currentW = '';
        for (const char of element) {
            if (char === '$') {
                currentW += wordsWithQuotesAndSpace[spaceWordIndex];
                spaceWordIndex++;
            } else currentW += char;
        }
        finalQueryArray.push(currentW);
    });
    const res = createQueryArray(finalQueryArray);
    // console.log('Utility', res);
    return res.resultQueryArray;
};

export const countGivenChar = (str = '', ch = ' ') => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        const el = str[i];
        if (el !== ch) {
            continue;
        }
        count++;
    }
    return count;
};