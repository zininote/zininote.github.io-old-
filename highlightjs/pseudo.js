/*
Language: Pseudo
Description: My custom for pseudo code
Website: None
Category: common
*/

hljs.registerLanguage("pseudo", function(hljs) {
    return {
        aliases: ['ps'],
        contains: [
            {
                className: 'strong',
                begin: /\b[A-Z][A-Z0-9]*\b/,
            },
            {
                className: 'number',
                begin: /\b[0-9]+\b/,
            },
            {
                className: 'leadline',
                begin: /[-+*\/><=!^ṿ|?\\]+/,
            },
            {
                className: 'comment',
                begin: /#/,
                end: /\s\s|\n|$/,
            },
        ],
    };
});