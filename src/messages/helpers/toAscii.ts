/* import emojiRegex from 'emoji-regex'; */
const emojiRegex = require('emoji-regex');


export const emojiToAsciiAsync = (message): Promise<string> => {
    return new Promise((res, rej) => {
        if (typeof message != 'string') {
            return rej("El contenido debe de ser una cadena.");
        }

        const REGEX = emojiRegex();

        var newMessage = message.match(REGEX);
        for (var emoji in newMessage) {
            var emoji_message = newMessage[emoji];
            var index = message.indexOf(emoji_message);
            if (index === -1)
                continue;
            emoji_message = "\\u" + emoji_message.charCodeAt(0).toString(16) + "\\u" + emoji_message.charCodeAt(1).toString(16);
            message = message.substr(0, index) + emoji_message + message.substr(index + 2);
        }

        return res(message);
    });
}