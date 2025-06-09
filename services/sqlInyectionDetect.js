export function hasForbiddenCharacters(input) {
    if (typeof input !== "string") return true;

    const forbiddenPattern = /['";\\\-‐‒–—―]+|--/g;
    return forbiddenPattern.test(input);
}