import { StringSetPrefixArgString } from "../../../../main/ts/lib/string/string-set-prefix-arg-string.js";
import { ArgStringPrefixError,  ArgStringValueError } from "../../../../main/ts/lib/string/arg-string.js";
import { assert } from "chai";
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

            assert.isTrue(stringPrefixArgString.prefix instanceof Set, `${stringPrefixArgString.prefix} is not instanceof a set.`);
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
});
