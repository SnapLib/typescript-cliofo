import { StringSetPrefixArgString, stringSetPrefixArgString } from "../../../../main/ts/lib/string/string-set-prefix-arg-string.mjs";
import { ArgStringPrefixError,  ArgStringValueError } from "../../../../main/ts/lib/string/arg-string.mjs";
import { assert, expect } from "chai";
import { suite, test } from "mocha";

suite(`${StringSetPrefixArgString.name} class`, function testSuiteStringSetPrefixArgStringClass()
{
    suite(`${StringSetPrefixArgString.name} constructor`, function testStringSetPrefixArgStringConstructor()
    {
        test(`undefined prefix ${StringSetPrefixArgString.name} constructor argument throws ${ArgStringPrefixError.name}`, function testStringSetPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedUndefinedPrefixArgument()
        {
            assert.throws(() => new StringSetPrefixArgString(undefined!, "Simba"), ArgStringPrefixError);
        });

        test(`null prefix ${StringSetPrefixArgString.name} constructor argument throws ${ArgStringPrefixError.name}`, function testStringSetPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedNullPrefixArgument()
        {
            assert.throws(() => new StringSetPrefixArgString(null!, "Kion"), ArgStringPrefixError);
        });

        test(`undefined value ${StringSetPrefixArgString.name} constructor argument throws ${ArgStringValueError.name}`, function testStringSetPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedUndefinedValueArgument()
        {
            const stringSet = new Set(["-"]);
            assert.throws(() => new StringSetPrefixArgString(stringSet, undefined!), ArgStringValueError);
        });

        test(`null value ${StringSetPrefixArgString.name} constructor argument throws ${ArgStringValueError.name}`, function testStringSetPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedNullValueArgument()
        {
            const stringSet = new Set(["-"]);
            assert.throws(() => new StringSetPrefixArgString(stringSet, null!), ArgStringValueError);
        });

        test(`undefined prefix and value ${StringSetPrefixArgString.name} constructor arguments throws`, function testStringSetPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndValueArguments()
        {
            assert.throws(() => new StringSetPrefixArgString(undefined!, undefined!));
        });

        test(`null prefix and value ${StringSetPrefixArgString.name} constructor arguments throws`, function testStringSetPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndValueArguments()
        {
            assert.throws(() => new StringSetPrefixArgString(null!, null!));
        });

        test(`undefined prefix and null value ${StringSetPrefixArgString.name} constructor arguments throws`, function testStringSetPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndNullValueArguments()
        {
            assert.throws(() => new StringSetPrefixArgString(undefined!, null!));
        });

        test(`null prefix and undefined value ${StringSetPrefixArgString.name} constructor arguments throws`, function testStringSetPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndUndefinedValueArguments()
        {
            assert.throws(() => new StringSetPrefixArgString(null!, undefined!));
        });
    });

    suite(`${StringSetPrefixArgString.name} getters`, function testSuiteStringSetPrefixArgStringGetters()
    {
        test(`${StringSetPrefixArgString.name} prefix getter returns a set`, function testStringSetPrefixArgStringPrefixGetter_ReturnsString_WhenCalled()
        {
            const prefixSet = new Set(["-"]);

            const value = "Simba";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            expect(stringPrefixArgString.prefix).to.be.instanceOf(Set, `${StringSetPrefixArgString.name}.prototype.prefix not a Set`);
        });

        test(`${StringSetPrefixArgString.name} frozen prefix getter returns same prefix set`, function testStringSetFrozenPrefixArgStringPrefixGetter_ReturnsSamePrefixString_WhenCalled()
        {
            const prefixSet = Object.freeze(new Set(["-"]));

            const value = "Kion";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.strictEqual(stringPrefixArgString.prefix, prefixSet, `"${stringPrefixArgString.prefix}" is not "${prefixSet}".`);
        });

        test(`${StringSetPrefixArgString.name} non-frozen prefix getter returns equal prefix set`, function testStringSetNonFrozenPrefixArgStringPrefixGetter_ReturnsEqualPrefixString_WhenCalled()
        {
            const prefixSet = new Set(["-"]);

            const value = "Nala";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.deepEqual(stringPrefixArgString.prefix, prefixSet, `"${stringPrefixArgString.prefix}" is not equal to "${prefixSet}".`);
        });

        test(`${StringSetPrefixArgString.name} value getter returns a string`, function testStringSetPrefixArgStringValueGetter_ReturnsString_WhenCalled()
        {
            const prefixSet = new Set(["-", "--"]);

            const value = "Simba";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.isString(stringPrefixArgString.value, `${stringPrefixArgString.value} is not a string.`);
        });

        test(`${StringSetPrefixArgString.name} value getter returns value string`, function testStringSetPrefixArgStringValueGetter_ReturnsValueString_WhenCalled()
        {
            const prefixSet = new Set(["-", "--"]);

            const value = "Nala";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.strictEqual(stringPrefixArgString.value, value, `"${stringPrefixArgString.value}" does not equal "${value}".`);
        });

        test(`${StringSetPrefixArgString.name} prefixed value getter returns a string`, function testStringSetPrefixArgStringPrefixedValueGetter_ReturnsString_WhenCalled()
        {
            const prefixSet = new Set(["-", "--"]);

            const value = "Simba";

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.isString(stringPrefixArgString.value, `${stringPrefixArgString.value} is not a string.`);
        });

        test(`${StringSetPrefixArgString.name} prefixed value getter returns set of prefixed values`, function testStringSetPrefixArgStringPrefixedValueGetter_ReturnsPrefixedValueSet_WhenCalled()
        {
            const prefixSet = new Set(["-", "--"]);

            const value = "Nala";

            const prefixedValues = new Set(Array.from(prefixSet).map(prefix => prefix + value));

            const stringPrefixArgString = new StringSetPrefixArgString(prefixSet, value);

            assert.deepEqual(stringPrefixArgString.prefixedValue, prefixedValues, `"${stringPrefixArgString.prefixedValue}" does not equal "${prefixedValues}".`);
        });
    });

    suite(`${StringSetPrefixArgString.name} equals`, function testSuiteStringSetPrefixArgStringEquals()
    {
        test(`${StringSetPrefixArgString.name} equals same returns true`, function testStringSetPrefixArgStringEquals_ReturnsTrue_WhenPassedSame()
        {
            const stringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");

            assert.isTrue(stringPrefixArgString.equals(stringPrefixArgString), `${StringSetPrefixArgString.name} equals same did not return true`);
        });

        test(`${StringSetPrefixArgString.name} equals equivalent returns true`, function testStringSetPrefixArgStringEquals_ReturnsTrue_WhenPassedEquivalent()
        {
            const aStringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");
            const anEqualStringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");

            assert.isTrue(aStringPrefixArgString.equals(anEqualStringPrefixArgString), `${StringSetPrefixArgString.name} equals equivalent did not return true`);
        });

        test(`${StringSetPrefixArgString.name} equals undefined returns false`, function testStringSetPrefixArgStringEquals_ReturnsFalse_WhenPassedUndefined()
        {
            const stringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");

            assert.isFalse(stringPrefixArgString.equals(undefined), `${StringSetPrefixArgString.name} equals undefined did not return false`);
        });

        test(`${StringSetPrefixArgString.name} equals null returns false`, function testStringSetPrefixArgStringEquals_ReturnsFalse_WhenPassedNull()
        {
            const stringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");

            assert.isFalse(stringPrefixArgString.equals(null), `${StringSetPrefixArgString.name} equals null did not return false`);
        });

        test(`${StringSetPrefixArgString.name} equals differing prefix returns false`, function testStringSetPrefixArgStringEquals_ReturnsFalse_WhenPassedDifferingPrefix()
        {
            const value = "Nala";

            const aStringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), value);

            const differingPrefixStringPrefixArgString = new StringSetPrefixArgString(new Set(["--"]), value);

            assert.isFalse(aStringPrefixArgString.equals(differingPrefixStringPrefixArgString), `${StringSetPrefixArgString.name} equals differing prefix did not return false`);
        });

        test(`${StringSetPrefixArgString.name} equals differing value returns false`, function testStringSetPrefixArgStringEquals_ReturnsFalse_WhenPassedDifferingValue()
        {
            const stringSet = new Set(["Nala"]);

            const aStringPrefixArgString = new StringSetPrefixArgString(stringSet, "Simba");

            const differingValueStringPrefixArgString = new StringSetPrefixArgString(stringSet, "Nala");

            assert.isFalse(aStringPrefixArgString.equals(differingValueStringPrefixArgString), `${StringSetPrefixArgString.name} equals differing value did not return false`);
        });

        test(`${StringSetPrefixArgString.name} equals unequal returns false`, function testStringSetPrefixArgStringEquals_ReturnsFalse_WhenPassedUnequal()
        {
            const aStringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");

            const differingValueStringPrefixArgString = new StringSetPrefixArgString(new Set(["--"]), "Nala");

            assert.isFalse(aStringPrefixArgString.equals(differingValueStringPrefixArgString), `${StringSetPrefixArgString.name} equals unequal did not return false`);
        });
    });
});

suite(`${StringSetPrefixArgString.name} factory method`, function testSuiteStringSetPrefixArgStringMethod()
{
    test(`undefined ${StringSetPrefixArgString.name} factory argument throws ${TypeError.name}`, function testStringSetPrefixArgStringFactory_ThrowsTypeError_WhenPassedUndefined()
    {
        assert.throws(() => stringSetPrefixArgString(undefined!), TypeError);
    });

    test(`null ${StringSetPrefixArgString.name} factory argument throws ${TypeError.name}`, function testStringSetPrefixArgStringFactory_ThrowsTypeError_WhenPassedNull()
    {
        assert.throws(() => stringSetPrefixArgString(null!), TypeError);
    });

    test(`undefined ${StringSetPrefixArgString.name} factory prefix argument throws ${ArgStringPrefixError.name}`, function testStringSetPrefixArgStringFactory_ThrowsArgStringPrefixError_WhenPassedUndefinedPrefixArg()
    {
        assert.throws(() => stringSetPrefixArgString(undefined!, "value"), ArgStringPrefixError);
    });

    test(`null ${StringSetPrefixArgString.name} factory prefix argument throws ${ArgStringPrefixError.name}`, function testStringSetPrefixArgStringFactory_ThrowsArgStringPrefixError_WhenPassedNullPrefixArg()
    {
        assert.throws(() => stringSetPrefixArgString(null!, "value"), ArgStringPrefixError);
    });

    test(`undefined ${StringSetPrefixArgString.name} factory value argument throws ${ArgStringValueError.name}`, function testStringSetPrefixArgStringFactory_ThrowsArgStringValueError_WhenPassedUndefinedValueArg()
    {
        assert.throws(() => stringSetPrefixArgString(new Set(["-"]), undefined!), ArgStringValueError);
    });

    test(`null ${StringSetPrefixArgString.name} factory value argument throws ${ArgStringValueError.name}`, function testStringSetPrefixArgStringFactory_ThrowsArgStringValueError_WhenPassedNullValueArg()
    {
        assert.throws(() => stringSetPrefixArgString(new Set(["-"]), null!), ArgStringValueError);
    });

    test(`${StringSetPrefixArgString.name} factory passed 2 string arguments does not throw`, function testStringSetPrefixArgStringFactory_DoesNotThrow_WhenPassedTwoStrings()
    {
        assert.doesNotThrow(() => stringSetPrefixArgString(new Set(["-"]), "Kion"));
    });

    test(`${StringSetPrefixArgString.name} factory passed other ${StringSetPrefixArgString.name} argument does not throw`, function testStringSetPrefixArgStringFactory_DoesNotThrow_WhenPassedOther()
    {
        const aStringPrefixArgString = new StringSetPrefixArgString(new Set(["-"]), "Simba");
        assert.doesNotThrow(() => stringSetPrefixArgString(aStringPrefixArgString));
    });
});
