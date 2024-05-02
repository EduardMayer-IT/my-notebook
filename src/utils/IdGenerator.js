function generateRandomCharacter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const characters = alphabet + numbers;
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export function generateRandomString(length) {
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += generateRandomCharacter();
    }
    return randomString;
}