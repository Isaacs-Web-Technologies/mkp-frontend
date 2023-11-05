var word = [
    'Try chocolate chip cookies...',
    'Search vegan pasta recipes...',
    'Looking for quick breakfast ideas?',
    'Discover summer BBQ dishes',
    'How about low-carb dinner options?',
    'Find kid-friendly snacks',
    'Craving spicy Thai dishes?',
    'Explore Mediterranean salads',
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
