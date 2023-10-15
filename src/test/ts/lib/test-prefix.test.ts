import { Prefix, prefix, PrefixFlagCharError } from "../../../main/ts/lib/prefix.mjs";
import { assert } from "chai";
import { suite, test } from "mocha";

suite(`${Prefix.name} class`, function testSuitePrefixClass()
{
    suite(`${Prefix.name} constructor`, function testSuitePrefixConstructor()
    {
        test(`undefined Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixConstructor_ThrowsPrefixFlagCharError_WhenPassedUndefined()
        {
            assert.throws(() => new Prefix(undefined!), PrefixFlagCharError);
        });

        test(`null Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixConstructor_ThrowsPrefixFlagCharError_WhenPassedNull()
        {
            assert.throws(() => new Prefix(null!), PrefixFlagCharError);
        });

        test(`Empty string Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixConstructor_ThrowsPrefixFlagCharError_WhenPassedEmptyString()
        {
            assert.throws(() => new Prefix(""), PrefixFlagCharError);
        });

        suite(`${Prefix.name} constructor whitespace arguments`, function testSuitePrefixConstructorWhitespaceArguments()
        {
            const whitespaceChars = Object.freeze(["\u0020", "\t", "\n", "\r", "\v"]);

            whitespaceChars.forEach(whiteSpaceChar =>
            {
                const whitespaceCharName =   whiteSpaceChar === "\t" ? "Horizontal tab"
                                                   : whiteSpaceChar === "\n" ? "Line feed"
                                                   : whiteSpaceChar === "\r" ? "Carriage return"
                                                   : whiteSpaceChar === "\v" ? "Vertical tab"
                                                   : "Space";
                test(`${whitespaceCharName} character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixConstructor_ThrowsPrefixFlagCharError_WhenPassedWhitespaceString()
                {
                    assert.throws(() => new Prefix(whiteSpaceChar), PrefixFlagCharError);
                });
            });
        });

        test(`String greater than 1 character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixConstructor_ThrowsPrefixFlagCharError_WhenPassedStringGreaterThanSingleCharacter()
        {
            const aString = "***";
            assert.throws(() => new Prefix(aString), PrefixFlagCharError);
        });

        test("Single non-whitespace character Prefix constructor argument does not throw.", function testPrefixConstructor_DoesNotThrow_WhenPassedSingleNonWhitespaceCharacterString()
        {
            assert.doesNotThrow(() => new Prefix("-"));
        });
    });

    suite(`${Prefix.name} getters`, function testSuitePrefixGetters()
    {
        test(`${Prefix.name} flag char getter returns a string.`, function testPrefixFlagCharGetter_ReturnsString_WhenCalled()
        {
            const flagChar = "-";

            const prefix = new Prefix(flagChar);

            assert.isString(prefix.flagChar, `${prefix.flagChar} is not a string.`);
        });

        test(`${Prefix.name} option string getter returns a string.`, function testPrefixOptionStringCharGetter_ReturnsString_WhenCalled()
        {
            const flagChar = "-";

            const prefix = new Prefix(flagChar);

            assert.isString(prefix.optionString, `${prefix.optionString} is not a string.`);
        });

        test(`${Prefix.name} flag char getter returns flag char.`, function testPrefixFlagCharGetter_ReturnsFlagChar_WhenCalled()
        {
            const flagChar = "-";

            const prefix = new Prefix(flagChar);

            assert.strictEqual(prefix.flagChar, flagChar, `'${prefix.flagChar}' does not equal '${flagChar}'.`);
        });

        test(`${Prefix.name} option string getter returns flag char repeated twice.`, function testPrefixOptionStringGetter_ReturnsFlagCharRepeatedTwice_WhenCalled()
        {
            const flagChar = "-";

            const prefix = new Prefix(flagChar);

            const expectedOptionString = flagChar.repeat(2);

            assert.strictEqual(prefix.optionString, expectedOptionString, `"${prefix.optionString}" does not equal "${expectedOptionString}".`);
        });
    });

    suite(`${Prefix.name} equals method`, function testSuitePrefixEqualsMethod()
    {
        test(`${Prefix.name} equals same returns true.`, function testPrefixEquals_ReturnsTrue_WhenPassedSame()
        {
            const prefix = new Prefix("-");
            assert.isTrue(prefix.equals(prefix), "Prefix equals same did not return true");
        });

        test(`${Prefix.name} equals equivalent returns true.`, function testPrefixEquals_ReturnsTrue_WhenPassedEqual()
        {
            const aPrefixObject = new Prefix("-");
            const anEqualPrefixObject = new Prefix("-");
            assert.isTrue(aPrefixObject.equals(anEqualPrefixObject), "Prefix equals equivalent did not return true");
        });

        test(`${Prefix.name} equals undefined returns false.`, function testPrefixEquals_ReturnsFalse_WhenPassedUndefined()
        {
            const prefix = new Prefix("-");
            assert.isFalse(prefix.equals(undefined), "Prefix equals undefined did not return false");
        });

        test(`${Prefix.name} equals null returns false.`, function testPrefixEquals_ReturnsFalse_WhenPassedNull()
        {
            const prefix = new Prefix("-");
            assert.isFalse(prefix.equals(null), "Prefix equals null did not return false");
        });

        test(`${Prefix.name} equals unequal returns false.`, function testPrefixEquals_ReturnsFalse_WhenPassedUnequal()
        {
            const aPrefixObject = new Prefix("-");
            const anUnequalPrefixObject = new Prefix("+");
            assert.isFalse(aPrefixObject.equals(anUnequalPrefixObject), "Prefix equals unequal did not return false");
        });
    });
});

suite(`${Prefix.name} factory method`, function testSuitePrefixFactoryMethod()
{
    test(`undefined ${Prefix.name} factory argument throws ${TypeError.name}.`, function testPrefixFactory_ThrowsTypeError_WhenPassedUndefined()
    {
        assert.throws(() => prefix(undefined!), TypeError);
    });

    test(`null ${Prefix.name} factory argument throws ${TypeError.name}.`, function testPrefixFactory_ThrowsTypeError_WhenPassedNull()
    {
        assert.throws(() => prefix(null!), TypeError);
    });

    test(`Empty string ${Prefix.name} factory argument throws "${PrefixFlagCharError.name}".`, function testPrefixFactory_ThrowsPrefixFlagCharError_WhenPassedEmptyString()
    {
        assert.throws(() => prefix(""), PrefixFlagCharError);
    });

    suite(`${Prefix.name} factory whitespace arguments`, function testSuitePrefixFactoryWhitespaceArguments()
    {
        const whitespaceChars: readonly string[] = Object.freeze(["\u0020", "\t", "\n", "\r", "\v"]);

        whitespaceChars.forEach(whiteSpaceChar =>
        {
            const whitespaceCharName =   whiteSpaceChar === "\t" ? "Horizontal tab"
                                        : whiteSpaceChar === "\n" ? "Line feed"
                                        : whiteSpaceChar === "\r" ? "Carriage return"
                                        : whiteSpaceChar === "\v" ? "Vertical tab"
                                        : "Space";
            test(`${whitespaceCharName} character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testPrefixFactory_ThrowsPrefixFlagCharError_WhenPassedWhitespaceString()
            {
                assert.throws(() => prefix(whiteSpaceChar), PrefixFlagCharError);
            });
        });
    });

    test(`String greater than 1 character ${Prefix.name} factory argument throws "${PrefixFlagCharError.name}".`, function testPrefixFactory_ThrowsPrefixFlagCharError_WhenPassedStringGreaterThanSingleCharacter()
    {
        const aString = "***";
        assert.throws(() => new Prefix(aString), PrefixFlagCharError);
    });

    test(`Single non-whitespace character ${Prefix.name} factory argument does not throw.`, function testPrefixFactory_DoesNotThrow_WhenPassedSingleNonWhitespaceString()
    {
        assert.doesNotThrow(() => new Prefix("-"));
    });

    test(`Copy factory method returns equal ${Prefix.name} object.`, function testPrefixFactory_ReturnsEqual_WhenCopying()
    {
        const original = new Prefix("-");

        const copy = prefix(original);

        assert.isTrue(copy.equals(original));
    });
});
