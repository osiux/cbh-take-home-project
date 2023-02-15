const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });
    
    it("Returns hash of input if it doesn't contain a 'partitionKey' element.", () => {
        const trivialKey = deterministicPartitionKey({
            a: "b",
            c: "d",
        });
        expect(trivialKey).toBe(
            "b5a7fc04662509b3dcdf3ac4657483e0e6893fe634d537dcb1fdc88a6b9bd604501e6bc90ed422ce33a432ae3ea847140ccafdd5b535a3d5add1d5965b2670e2",
        );
    });

    describe("When input is an object that contains a 'partitionKey' element", () => {
        it("Returns given 'partitionKey'", () => {
            const trivialKey = deterministicPartitionKey({
                partitionKey: "partition-key",
            });
            expect(trivialKey).toBe("partition-key");
        });

        it("Returns hash of 'partitionKey' if it's longer than max partition key length", () => {
            const trivialKey = deterministicPartitionKey({
                partitionKey: "a".repeat(260),
            });
            expect(trivialKey).toBe(
                "c11a86529d6e515bab6cdd967c373d38299fb30cb916b77b1da55d4312f2de6ba0e03d2032dd48b1f17345516ed49f9e1204389f650b7f66565339ee2632733a",
            );
        });

        it("Returns string representation of 'partitionKey' if it's an object", () => {
            const trivialKey = deterministicPartitionKey({
                partitionKey: {
                    a: "b",
                },
            });
            expect(trivialKey).toBe('{"a":"b"}');
        });

        it("Returns hash of 'partitionKey' string representation if it's longer than partition key max length", () => {
            const trivialKey = deterministicPartitionKey({
                partitionKey: {
                    a: "b".repeat(260),
                },
            });
            expect(trivialKey).toBe(
                "ede59a7f294d9c32b5077959457c114a63a5703a0f7f06a7e9fa850e1ef63cce8d2b5f35d51a4ad7e00e31e27640718fd0f783af3317a163f6b6c7cc6174d038",
            );
        });
    });
});
