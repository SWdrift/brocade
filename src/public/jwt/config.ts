export const CONFIG = {
    PRIVATE_KEY: (() => {
        const key = process.env.JWT_PRIVATE_KEY;
        if (typeof key === "undefined") {
            throw new Error("JWT_PRIVATE_KEY is not defined in.env file");
        }
        return key;
    })(),
    PUBLIC_KEY: (() => {
        const key = process.env.JWT_PUBLIC_KEY;
        if (typeof key === "undefined") {
            throw new Error("JWT_PUBLIC_KEY is not defined in.env file");
        }
        return key;
    })(),
    EXPIRATION_TIME: "1h",
    ALGORITHM: "HS256" as const
};
