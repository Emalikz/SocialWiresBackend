/* import emojiRegex from 'emoji-regex'; */
const emojiRegex = require('emoji-regex');

/**
 * Convert emojis in text to ascii code
 * @param message 
 * @returns 
 */
export const emojiToAsciiAsync = (message): Promise<string> => {
    return new Promise((res, rej) => {
        if (typeof message != 'string') {
            return rej("El contenido debe de ser una cadena.");
        }

        const REGEX = emojiRegex();

        let newMessage = message.match(REGEX);
        for (let emoji in newMessage) {
            let emoji_message = newMessage[emoji];
            let index = message.indexOf(emoji_message);
            if (index === -1)
                continue;
            emoji_message = `U+${emoji_message.codePointAt(0)}`;
            message = message.substr(0, index) + emoji_message + message.substr(index + 2);
        }

        return res(message);
    });
}