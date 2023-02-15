const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    if (!event) {
        return TRIVIAL_PARTITION_KEY;
    }

    if (!event.partitionKey) {
        const candidate = JSON.stringify(event);

        return crypto.createHash("sha3-512").update(candidate).digest("hex");
    }

    const partitionKey =
        typeof event.partitionKey !== "string"
            ? JSON.stringify(event.partitionKey)
            : event.partitionKey;

    if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
        return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    }

    return partitionKey;
};
