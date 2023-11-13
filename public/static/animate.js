var word = [
    'How do I make chocolate chip cookies?',
    'Give me a vegan pasta recipe',
    'Can I cook fried rice with these ingriedients?...',
    'What kind of recipe can I prepare with these ingriedients...',
    'How about low-carb dinner options?',
    'Give me kid-friendly snacks',
    'Craving spicy Thai dishes?',
    'How do I cook banga soup?',
    'Need a gluten-free dessert?',
    'Dive into holiday appetizers'
];
var i = 0,
    offset = 0,
    len = word.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 2,
    speed = 80;

function wordflick() {
    setInterval(function() {
        var part = word[i].slice(0, offset);
        
        if (forwards) {
            if (offset >= word[i].length) {
                if (++skip_count >= skip_delay) {
                    forwards = !forwards;
                    skip_count = 0;
                }
            }
        } else {
            if (offset === 0) {
                forwards = !forwards;
                if (++i >= len) {
                    i = 0;  // Reset to the beginning of the word array
                }
            }
        }

        if (skip_count === 0) {
            forwards ? offset++ : offset--;
        }

        $('.word').text(part);
    }, speed);
}

$(document).ready(wordflick);
