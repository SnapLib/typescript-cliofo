import { stringPrefixArgString, StringPrefixArgString } from "../../../../main/ts/lib/string/string-prefix-arg-string.js";
import { ArgStringPrefixError,  ArgStringValueError } from "../../../../main/ts/lib/string/arg-string.js";
import { assert } from "chai";
import { suite, test } from "mocha";

suite(`${StringPrefixArgString.name} class`, function testSuiteStringPrefixArgStringClass()
{
    suite(`${StringPrefixArgString.name} constructor`, function testStringPrefixArgStringConstructor()
    {
        test(`undefined prefix ${StringPrefixArgString.name} constructor argument throws ${ArgStringPrefixError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedUndefinedPrefixArgument()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, "Simba"), ArgStringPrefixError);
        });

        test(`null prefix ${StringPrefixArgString.name} constructor argument throws ${ArgStringPrefixError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedNullPrefixArgument()
        {
            assert.throws(() => new StringPrefixArgString(null!, "Kion"), ArgStringPrefixError);
        });

        test(`undefined value ${StringPrefixArgString.name} constructor argument throws ${ArgStringValueError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedUndefinedValueArgument()
        {
            assert.throws(() => new StringPrefixArgString("-", undefined!), ArgStringValueError);
        });

        test(`null value ${StringPrefixArgString.name} constructor argument throws ${ArgStringValueError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedNullValueArgument()
        {
            assert.throws(() => new StringPrefixArgString("-", null!), ArgStringValueError);
        });

        test("undefined prefix and value ${StringPrefixArgString.name} constructor arguments throws", function testStringPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, undefined!));
        });

        test(`null prefix and value ${StringPrefixArgString.name} constructor arguments throws`, function testStringPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(null!, null!));
        });

        test(`undefined prefix and null value ${StringPrefixArgString.name} constructor arguments throws`, function testStringPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndNullValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, null!));
        });

        test(`null prefix and undefined value ${StringPrefixArgString.name} constructor arguments throws`, function testStringPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndUndefinedValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(null!, undefined!));
        });
    });

    suite(`${StringPrefixArgString.name} getters`, function testSuiteStringPrefixArgStringGetters()
    {
        test(`${StringPrefixArgString.name} prefix getter returns a string.`, function testStringPrefixArgStringPrefixGetter_ReturnsString_WhenCalled()
        {
            const prefix = "-";

            const value = "Simba";

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.isString(stringPrefixArgString.prefix, `${stringPrefixArgString.prefix} is not a string.`);
        });

        test(`${StringPrefixArgString.name} prefix getter returns a prefix string.`, function testStringPrefixArgStringPrefixGetter_ReturnsPrefixString_WhenCalled()
        {
            const prefix = "-";

            const value = "Nala";

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.strictEqual(stringPrefixArgString.prefix, prefix, `"${stringPrefixArgString.prefix}" does not equal "${prefix}".`);
        });

        test(`${StringPrefixArgString.name} value getter returns a string.`, function testStringPrefixArgStringValueGetter_ReturnsString_WhenCalled()
        {
            const prefix = "-";

            const value = "Simba";

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.isString(stringPrefixArgString.value, `${stringPrefixArgString.value} is not a string.`);
        });

        test(`${StringPrefixArgString.name} value getter returns a value string.`, function testStringPrefixArgStringValueGetter_ReturnsValueString_WhenCalled()
        {
            const prefix = "-";

            const value = "Nala";

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.strictEqual(stringPrefixArgString.value, value, `"${stringPrefixArgString.value}" does not equal "${value}".`);
        });

        test(`${StringPrefixArgString.name} prefixed value getter returns a string.`, function testStringPrefixArgStringPrefixedValueGetter_ReturnsString_WhenCalled()
        {
            const prefix = "-";

            const value = "Simba";

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.isString(stringPrefixArgString.value, `${stringPrefixArgString.value} is not a string.`);
        });

        test(`${StringPrefixArgString.name} prefixed value getter returns a prefixed value string.`, function testStringPrefixArgStringPrefixedValueGetter_ReturnsPrefixedValueString_WhenCalled()
        {
            const prefix = "-";

            const value = "Nala";

            const prefixedValue = prefix + value;

            const stringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.strictEqual(stringPrefixArgString.prefixedValue, prefixedValue, `"${stringPrefixArgString.prefixedValue}" does not equal "${prefixedValue}".`);
        });
    });

    suite(`${StringPrefixArgString.name} equals`, function testSuiteStringPrefixArgStringEquals()
    {
        test(`${StringPrefixArgString.name} equals same returns true.`, function testStringPrefixArgStringEquals_ReturnsTrue_WhenPassedSame()
        {
            const stringPrefixArgString = new StringPrefixArgString("-", "Simba");

            assert.isTrue(stringPrefixArgString.equals(stringPrefixArgString), "StringPrefixArgString equals same did not return true");
        });

        test(`${StringPrefixArgString.name} equals equivalent returns true.`, function testStringPrefixArgStringEquals_ReturnsTrue_WhenPassedEquivalent()
        {
            const aStringPrefixArgString = new StringPrefixArgString("-", "Simba");
            const anEqualStringPrefixArgString = new StringPrefixArgString("-", "Simba");

            assert.isTrue(aStringPrefixArgString.equals(anEqualStringPrefixArgString), "StringPrefixArgString equals equivalent did not return true");
        });

        test(`${StringPrefixArgString.name} equals undefined returns false.`, function testStringPrefixArgStringEquals_ReturnsFalse_WhenPassedUndefined()
        {
            const stringPrefixArgString = new StringPrefixArgString("-", "Simba");

            assert.isFalse(stringPrefixArgString.equals(undefined), "StringPrefixArgString equals undefined did not return false");
        });

        test(`${StringPrefixArgString.name} equals null returns false.`, function testStringPrefixArgStringEquals_ReturnsFalse_WhenPassedNull()
        {
            const stringPrefixArgString = new StringPrefixArgString("-", "Simba");

            assert.isFalse(stringPrefixArgString.equals(null), "StringPrefixArgString equals null did not return false");
        });

        test(`${StringPrefixArgString.name} equals differing prefix returns false.`, function testStringPrefixArgStringEquals_ReturnsFalse_WhenPassedDifferingPrefix()
        {
            const value = "Nala";

            const aStringPrefixArgString = new StringPrefixArgString("-", value);

            const differingPrefixStringPrefixArgString = new StringPrefixArgString("--", value);

            assert.isFalse(aStringPrefixArgString.equals(differingPrefixStringPrefixArgString), "StringPrefixArgString equals differing prefix did not return false");
        });

        test(`${StringPrefixArgString.name} equals differing value returns false.`, function testStringPrefixArgStringEquals_ReturnsFalse_WhenPassedDifferingValue()
        {
            const prefix = "Nala";

            const aStringPrefixArgString = new StringPrefixArgString(prefix, "Simba");

            const differingValueStringPrefixArgString = new StringPrefixArgString(prefix, "Nala");

            assert.isFalse(aStringPrefixArgString.equals(differingValueStringPrefixArgString), "StringPrefixArgString equals differing value did not return false");
        });

        test(`${StringPrefixArgString.name} equals unequal returns false.`, function testStringPrefixArgStringEquals_ReturnsFalse_WhenPassedUnequal()
        {
            const aStringPrefixArgString = new StringPrefixArgString("-", "Simba");

            const differingValueStringPrefixArgString = new StringPrefixArgString("--", "Nala");

            assert.isFalse(aStringPrefixArgString.equals(differingValueStringPrefixArgString), "StringPrefixArgString equals unequal did not return false");
        });
    });
});

suite(`${StringPrefixArgString.name} factory method`, function testSuiteStringPrefixArgStringMethod()
{
    test(`undefined ${StringPrefixArgString.name} factory argument throws ${TypeError.name}.`, function testStringPrefixArgStringFactory_ThrowsTypeError_WhenPassedUndefined()
    {
        assert.throws(() => stringPrefixArgString(undefined!), TypeError);
    });

    test(`null ${StringPrefixArgString.name} factory argument throws ${TypeError.name}.`, function testStringPrefixArgStringFactory_ThrowsTypeError_WhenPassedNull()
    {
        assert.throws(() => stringPrefixArgString(null!), TypeError);
    });

    test(`undefined ${StringPrefixArgString.name} factory prefix argument throws ${ArgStringPrefixError.name}.`, function testStringPrefixArgStringFactory_ThrowsArgStringPrefixError_WhenPassedUndefinedPrefixArg()
    {
        assert.throws(() => stringPrefixArgString(undefined!, "value"), ArgStringPrefixError);
    });

    test(`null ${StringPrefixArgString.name} factory prefix argument throws ${ArgStringPrefixError.name}.`, function testStringPrefixArgStringFactory_ThrowsArgStringPrefixError_WhenPassedNullPrefixArg()
    {
        assert.throws(() => stringPrefixArgString(null!, "value"), ArgStringPrefixError);
    });

    test(`undefined ${StringPrefixArgString.name} factory value argument throws ${ArgStringValueError.name}.`, function testStringPrefixArgStringFactory_ThrowsArgStringValueError_WhenPassedUndefinedValueArg()
    {
        assert.throws(() => stringPrefixArgString("prefix", undefined!), ArgStringValueError);
    });

    test(`null ${StringPrefixArgString.name} factory value argument throws ${ArgStringValueError.name}.`, function testStringPrefixArgStringFactory_ThrowsArgStringValueError_WhenPassedNullValueArg()
    {
        assert.throws(() => stringPrefixArgString("prefix", null!), ArgStringValueError);
    });

    test(`${StringPrefixArgString.name} factory passed 2 string arguments does not throw.`, function testStringPrefixArgStringFactory_DoesNotThrow_WhenPassedTwoStrings()
    {
        assert.doesNotThrow(() => stringPrefixArgString("-", "Kion"));
    });

    test(`${StringPrefixArgString.name} factory passed other ${StringPrefixArgString.name} argument does not throw.`, function testStringPrefixArgStringFactory_DoesNotThrow_WhenPassedOther()
    {
        const aStringPrefixArgString = new StringPrefixArgString("-", "Simba");
        assert.doesNotThrow(() => stringPrefixArgString(aStringPrefixArgString));
    });
});
