$(document).ready(function () {
    test("1000 - 一千", function () {
        strictEqual(chineseNumerals.convert("1000", 'trad'), "一千");
    });
    test("0 - 零 (trad)", function () {
        strictEqual(chineseNumerals.convert("0", 'trad'), "零");
    });
    test("0 - 零 (simp)", function () {
        strictEqual(chineseNumerals.convert("0", 'simp'), "零");
    });
    test("0 - ling2", function () {
        strictEqual(chineseNumerals.convert("0", 'pinyin'), "ling2");
    });
    test("123 - 一百二十三", function () {
        strictEqual(chineseNumerals.convert("123", 'trad'), "一百二十三");
    });
    test("0123 - 一百二十三", function () {
        strictEqual(chineseNumerals.convert("0123", 'trad'), "一百二十三");
    });
    test("-648 - 負六百四十八", function () {
        strictEqual(chineseNumerals.convert("-648", 'trad'), "負六百四十八");
    });
    test("-13335.358 - 負一萬三千三百三十五點三五八", function () {
        strictEqual(chineseNumerals.convert("-13335.358", 'trad'), "負一萬三千三百三十五點三五八");
    });
    test("123,456,789 - 一亿二千三百四十五万六千七百八十九", function () {
        strictEqual(chineseNumerals.convert("123,456,789", 'simp'), "一亿二千三百四十五万六千七百八十九");
    });
    test("1,234,567,890,123 - 一兆二千三百四十五億六千七百八十九萬零一百二十三", function () {
        strictEqual(chineseNumerals.convert("1,234,567,890,123", 'trad'), "一兆二千三百四十五億六千七百八十九萬零一百二十三");
    });
    test("6.-6.4 - NaN", function () {
        strictEqual(chineseNumerals.convert("6.-6.4", 'trad'), "Not a Number");
    });
    test(".0456 - 点零四五六", function () {
        strictEqual(chineseNumerals.convert(".0456 ", 'simp'), "点零四五六");
    });
    test("0.0456 - 点零四五六", function () {
        strictEqual(chineseNumerals.convert("0.0456 ", 'simp'), "点零四五六");
    });
    test("-0.0456 - 负点零四五六", function () {
        strictEqual(chineseNumerals.convert("-0.0456 ", 'simp'), "负点零四五六");
    });
    test("32d3 - 三百二十三", function () {
        strictEqual(chineseNumerals.convert("32d3", 'trad'), "三百二十三");
    });
	test("320000032 - 三億二千萬零三十二", function () {
        strictEqual(chineseNumerals.convert("320000032", 'trad'), "三億二千萬零三十二");
    });
    test("-13335.358 - fu4 yi1 wan4 san1 qian1 san1 bai3 san1 shi2 wu3 dian3 san1 wu3 ba1", function () {
        strictEqual(chineseNumerals.convert("-13335.358", 'pinyin'), "fu4 yi1 wan4 san1 qian1 san1 bai3 san1 shi2 wu3 dian3 san1 wu3 ba1");
    });
});