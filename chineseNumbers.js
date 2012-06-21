/*jslint regexp: true */

var chineseNumerals = (function () {
    "use strict";
    var tradSimpDigits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
        pinyinDigits = ["ling2 ", "yi1 ", "er2 ", "san1 ", "si4 ", "wu3 ", "liu4 ", "qi1 ", "ba1 ", "jiu9 "],
        formalTradDigits = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖"],
        formalSimpDigits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
        tradSimpBeforeWan = ["十", "百", "千"],
        pinyinBeforeWan = ["shi2 ", "bai3 ", "qian1 "],
        formalBeforeWan = ["拾", "佰", "仟"],
        tradAfterWan = ["", "萬", "億", "兆", "京"],
        pinyinAfterWan = ["", "wan4 ", "yi4 ", "zhao4 ", "jing1 "],
        simpAfterWan = ["", "万", "亿", "兆", "京"];

    return {
        convert: function (number, outputType) {
            /// <summary>Takes a given English numerical input and converts that input to Chinese</summary>
            /// <param name="number">The English number, e.g. 1234 or 1,234 or one thousand two hundred and thirty four</param>
            /// <param name="outputType">The way to display the output</param>

            var brokenUpNumber,
                wholeNumber,
                decimal,
                i,
                power = 0,
                powers = [],
                minusSign,
                decimalPoint,
                isNegative = false,   // is the given number negative
                hasDigitsAfterDecimal = false,
                inZero = false,       // are we in a stretch or 1 or more zeros (only add one zero for the stretch)
                canAddZero = false,   // only add a zero if there's something non-zero on both sides of the number
                outputDigits,         // how the final output will be displayed
                afterWan,             // how the characters for large numbers will be displayed
                beforeWan,            // how the characters for smaller numbers will be displayed (十, 百, 千)
                chineseNumber = "";   // the final result

            // remove everything except for numbers, decimal and negative sign
            number = number.toString().replace(/[^0-9\.-]/g, "");
            if (isNaN(number) || number.length === 0) {
                return "Not a Number";
            }

            switch (outputType.toLowerCase()) {
            case "trad":
                outputDigits = tradSimpDigits;
                afterWan = tradAfterWan;
                beforeWan = tradSimpBeforeWan;
                minusSign = "負";
                decimalPoint = "點";
                break;
            case "simp":
                outputDigits = tradSimpDigits;
                afterWan = simpAfterWan;
                beforeWan = tradSimpBeforeWan;
                minusSign = "负";
                decimalPoint = "点";
                break;
            case "pinyin":
                outputDigits = pinyinDigits;
                afterWan = pinyinAfterWan;
                beforeWan = pinyinBeforeWan;
                minusSign = "fu4 ";
                decimalPoint = "dian3 ";
                break;
            case "formaltrad":
                outputDigits = formalTradDigits;
                afterWan = tradAfterWan;
                beforeWan = formalBeforeWan;
                minusSign = "負";
                decimalPoint = "點";
                break;
            case "formalsimp":
                outputDigits = formalSimpDigits;
                afterWan = simpAfterWan;
                beforeWan = formalBeforeWan;
                minusSign = "负";
                decimalPoint = "点";
                break;
            default:
                outputDigits = tradSimpDigits;
                afterWan = tradAfterWan;
                beforeWan = tradSimpBeforeWan;
                minusSign = "負";
                decimalPoint = "點";
                break;
            }

            if (parseFloat(number, 10) === 0) {
                // remove space for pinyin
                return outputDigits[0].replace(/^\s+|\s+$/g, "");
            }

            if (number < 0) {
                isNegative = true;
                number = -number;
            }

            brokenUpNumber = String(number).split(".", 2);
            if (brokenUpNumber[0] !== "") {
                // remove leading 0's
                wholeNumber = String(parseInt(brokenUpNumber[0], 10));
            } else {
                wholeNumber = "0";
            }

            if (brokenUpNumber.length === 2) {
                hasDigitsAfterDecimal = true;
                decimal = brokenUpNumber[1];
            }

            for (i = wholeNumber.length - 1; i >= 0; i = i - 1) {
                powers[power] = parseInt(wholeNumber[i], 10);
                power = power + 1;
            }

            // Take the decomposition of the number for above and generate the Chinese equivalent
            for (i = 0; i < power; i = i + 1) {
                if (i % 4 === 0) {  // Reached the next four powers up level
                    if (powers[i] !== 0) {
                        inZero = false;
                        canAddZero = true;
                        chineseNumber = outputDigits[powers[i]] + afterWan[i / 4] + chineseNumber;
                    } else {
                        // Check that something in the next three powers is non-zero before adding 
                        if (((i + 3 < power) && powers[i + 3] !== 0) || ((i + 2 < power) && powers[i + 2] !== 0) || ((i + 1 < power) && powers[i + 1] !== 0)) {
                            chineseNumber = afterWan[i / 4] + chineseNumber;
                            canAddZero = false; // added
                        }
                    }
                } else {  // Add one, tens, hundreds, or thousands place for each level
                    if (powers[i] !== 0) {
                        inZero = false;
                        canAddZero = true;
                        if (power === 2 && i === 1 && powers[i] === 1) {  // No 一 with 10 through 19
                            chineseNumber = beforeWan[(i % 4) - 1] + chineseNumber;
                        } else {
                            chineseNumber = outputDigits[powers[i]] + beforeWan[(i % 4) - 1] + chineseNumber;
                        }
                    } else {
                        if (canAddZero === true && inZero === false) { // Only insert one 零 for all consecutive zeroes
                            inZero = true;
                            chineseNumber = outputDigits[powers[i]] + chineseNumber;
                        }
                    }
                }
            }

            if (isNegative === true) {
                chineseNumber = minusSign + chineseNumber;
            }

            if (hasDigitsAfterDecimal === true) {
                chineseNumber += decimalPoint;
                for (i = 0; i < decimal.length; i = i + 1) {
                    chineseNumber += outputDigits[decimal[i]];
                }
            }

            return chineseNumber.replace(/^\s+|\s+$/g, ""); // remove space for pinyin
        }
    };
}());