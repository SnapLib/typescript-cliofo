import { StringPrefixArgString } from "../../../../main/ts/lib/string/string-prefix-arg-string.js";
import { ArgStringPrefixError,  ArgStringValueError } from "../../../../main/ts/lib/string/arg-string.js";
import { assert } from "chai";
import { suite, test } from "mocha";

suite(`${StringPrefixArgString.name} class`, function testSuiteStringPrefixArgStringClass()
{
    suite(`${StringPrefixArgString.name} constructor`, function testStringPrefixArgStringConstructor()
    {
        test(`undefined prefix constructor argument throws ${ArgStringPrefixError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedUndefinedPrefixArgument()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, "Simba"), ArgStringPrefixError);
        });

        test(`null prefix constructor argument throws ${ArgStringPrefixError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringPrefixError_WhenPassedNullPrefixArgument()
        {
            assert.throws(() => new StringPrefixArgString(null!, "Kion"), ArgStringPrefixError);
        });

        test(`undefined value constructor argument throws ${ArgStringValueError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedUndefinedValueArgument()
        {
            assert.throws(() => new StringPrefixArgString("-", undefined!), ArgStringValueError);
        });

        test(`null value constructor argument throws ${ArgStringValueError.name}`, function testStringPrefixArgStringConstructor_ThrowsArgStringValueError_WhenPassedNullValueArgument()
        {
            assert.throws(() => new StringPrefixArgString("-", null!), ArgStringValueError);
        });

        test("undefined prefix and value constructor arguments throws", function testStringPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, undefined!));
        });

        test("null prefix and value constructor arguments throws", function testStringPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(null!, null!));
        });

        test("undefined prefix and null value constructor arguments throws", function testStringPrefixArgStringConstructor_Throws_WhenPassedUndefinedPrefixAndNullValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(undefined!, null!));
        });

        test("null prefix and undefined value constructor arguments throws", function testStringPrefixArgStringConstructor_Throws_WhenPassedNullPrefixAndUndefinedValueArguments()
        {
            assert.throws(() => new StringPrefixArgString(null!, undefined!));
        });
    });

    suite(`${StringPrefixArgString.name} getters`, function testSuiteStringPrefixArgStringGetters()
    {
        test(`${StringPrefixArgString.name} prefix getter returns a string.`, function testStringPrefixArgStringPrefixGetter_ReturnsString_WhenCalled()
        {
            const prefix: string = "-";

            const value: string = "Simba";

            const stringPrefixArgString: StringPrefixArgString = new StringPrefixArgString(prefix, value);

            assert.isString(stringPrefixArgString.prefix, `${stringPrefixArgString.prefix} is not a string.`);
        });
    });
});
