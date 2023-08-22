import { Prefix, prefix, PrefixFlagCharError } from "../../../main/ts/lib/prefix.js";
import { assert } from "chai";
import { suite, test } from "mocha";

suite(`${Prefix.name} class`, function testSuitePrefixClass()
{
    suite(`${Prefix.name} constructor`, function testSuitePrefixConstructor()
    {
        test(`undefined Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testUndefinedPrefixConstructorArgumentThrows()
        {
            assert.throws(() => new Prefix(undefined!), PrefixFlagCharError);
        });

        test(`null Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testNullPrefixConstructorArgumentThrows()
        {
            assert.throws(() => new Prefix(null!), PrefixFlagCharError);
        });

        test(`Empty string Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testEmptyStringPrefixConstructorArgumentThrows()
        {
            assert.throws(() => new Prefix(""), PrefixFlagCharError);
        });

        suite(`${Prefix.name} constructor whitespace arguments`, function testSuitePrefixConstructorWhitespaceArguments()
        {
            const whitespaceChars: readonly string[] = Object.freeze(["\u0020", "\t", "\n", "\r", "\v"]);

            whitespaceChars.forEach(whiteSpaceChar =>
            {
                const whitespaceCharName: string =   whiteSpaceChar === "\t" ? "Horizontal tab"
                                                   : whiteSpaceChar === "\n" ? "Line feed"
                                                   : whiteSpaceChar === "\r" ? "Carriage return"
                                                   : whiteSpaceChar === "\v" ? "Vertical tab"
                                                   : "Space";
                test(`${whitespaceCharName} character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testWhitespacePrefixConstructorArgumentThrows()
                {
                    assert.throws(() => new Prefix(whiteSpaceChar), PrefixFlagCharError);
                });
            });
        });

        test(`String greater than 1 character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testSingleCharacterPrefixConstructorArgumentThrows()
        {
            const aString: string = "***";
            assert.throws(() => new Prefix(aString), PrefixFlagCharError);
        });

        test("Single non-whitespace character Prefix constructor argument does not throw.", function testSingleNonWhitespacePrefixConstructorArgumentDoesNotThrow()
        {
            assert.doesNotThrow(() => new Prefix("-"));
        });
    });

    suite(`${Prefix.name} getters`, function testSuitePrefixGetters()
    {
        test(`${Prefix.name} flag char getter returns a string.`, function testPrefixFlagCharGetterIsString()
        {
            const flagChar: string = "-";

            const prefix: Prefix = new Prefix(flagChar);

            assert.isString(prefix.flagChar, `${prefix.flagChar} is not a string.`);
        });

        test(`${Prefix.name} option string getter returns a string.`, function testPrefixOptionStringGetterIsString()
        {
            const flagChar: string = "-";

            const prefix: Prefix = new Prefix(flagChar);

            assert.isString(prefix.optionString, `${prefix.optionString} is not a string.`);
        });

        test(`${Prefix.name} flag char getter returns flag char.`, function testPrefixFlagCharGetterReturnsFlagChar()
        {
            const flagChar: string = "-";

            const prefix: Prefix = new Prefix(flagChar);

            assert.strictEqual(prefix.flagChar, flagChar, `'${prefix.flagChar}' does not equal '${flagChar}'.`);
        });

        test(`${Prefix.name} option string getter returns flag char repeated twice.`, function testPrefixFlagCharGetterReturnsFlagCharRepeatedTwice()
        {
            const flagChar: string = "-";

            const prefix: Prefix = new Prefix(flagChar);

            const expectedOptionString: string = flagChar.repeat(2);

            assert.strictEqual(prefix.optionString, expectedOptionString, `"${prefix.optionString}" does not equal "${expectedOptionString}".`);
        });
    });

    suite(`${Prefix.name} equals method`, function testSuitePrefixEqualsMethod()
    {
        test(`${Prefix.name} equals same returns true.`, function testPrefixEqualsSameReturnsTrue()
        {
            const prefix: Prefix = new Prefix("-");
            assert.isTrue(prefix.equals(prefix), "Prefix equals same did not return true");
        });

        test(`${Prefix.name} equals equivalent returns true.`, function testPrefixEqualsEquivalentReturnsTrue()
        {
            const aPrefixObject: Prefix = new Prefix("-");
            const anEqualPrefixObject: Prefix = new Prefix("-");
            assert.isTrue(aPrefixObject.equals(anEqualPrefixObject), "Prefix equals equivalent did not return true");
        });

        test(`${Prefix.name} equals undefined returns false.`, function testPrefixEqualsUndefinedReturnsFalse()
        {
            const prefix: Prefix = new Prefix("-");
            assert.isFalse(prefix.equals(undefined), "Prefix equals undefined did not return false");
        });

        test(`${Prefix.name} equals null returns false.`, function testPrefixEqualsNullReturnsFalse()
        {
            const prefix: Prefix = new Prefix("-");
            assert.isFalse(prefix.equals(null), "Prefix equals null did not return false");
        });

        test(`${Prefix.name} equals unequal returns false.`, function testPrefixEqualsUnequalReturnsFalse()
        {
            const aPrefixObject: Prefix = new Prefix("-");
            const anUnequalPrefixObject: Prefix = new Prefix("+");
            assert.isFalse(aPrefixObject.equals(anUnequalPrefixObject), "Prefix equals unequal did not return false");
        });
    });
});

suite(`${Prefix.name} factory method`, function testSuitePrefixFactoryMethod()
{
    test(`undefined ${Prefix.name} factory argument throws.`, function testUndefinedPrefixFactoryArgumentThrows()
    {
        assert.throws(() => prefix(undefined!));
    });

    test(`null ${Prefix.name} factory argument throws.`, function testNullPrefixFactoryArgumentThrows()
    {
        assert.throws(() => prefix(null!));
    });

    test(`Empty string ${Prefix.name} factory argument throws "${PrefixFlagCharError.name}".`, function testEmptyStringPrefixFactoryArgumentThrows()
    {
        assert.throws(() => prefix(""), PrefixFlagCharError);
    });

    suite(`${Prefix.name} factory whitespace arguments`, function testSuitePrefixFactoryWhitespaceArguments()
        {
            const whitespaceChars: readonly string[] = Object.freeze(["\u0020", "\t", "\n", "\r", "\v"]);

            whitespaceChars.forEach(whiteSpaceChar =>
            {
                const whitespaceCharName: string =   whiteSpaceChar === "\t" ? "Horizontal tab"
                                                   : whiteSpaceChar === "\n" ? "Line feed"
                                                   : whiteSpaceChar === "\r" ? "Carriage return"
                                                   : whiteSpaceChar === "\v" ? "Vertical tab"
                                                   : "Space";
                test(`${whitespaceCharName} character Prefix constructor argument throws "${PrefixFlagCharError.name}".`, function testWhitespacePrefixFactoryArgumentThrows()
                {
                    assert.throws(() => prefix(whiteSpaceChar), PrefixFlagCharError);
                });
            });
        });

        test(`String greater than 1 character ${Prefix.name} factory argument throws "${PrefixFlagCharError.name}".`, function testSingleCharacterPrefixFactoryArgumentThrows()
        {
            const aString: string = "***";
            assert.throws(() => new Prefix(aString), PrefixFlagCharError);
        });

        test(`Single non-whitespace character ${Prefix.name} factory argument does not throw.`, function testSingleNonWhitespacePrefixFactoryArgumentDoesNotThrow()
        {
            assert.doesNotThrow(() => new Prefix("-"));
        });

        test(`Copy factory method returns equal ${Prefix.name} object.`, function testCopyPrefixFactoryReturnsEqual()
        {
            const original: Prefix = new Prefix("-");

            const copy: Prefix = prefix(original);

            assert.isTrue(copy.equals(original));
        });
});
