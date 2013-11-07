define(function() {
    return {
        int: function(from,to) {
            if (typeof to == 'undefined') {
                to = from;
                from = 0;
            }
            return Math.floor(Math.random()*(to-from)+from);
        },
        float: function(from,to) {
            if (typeof to == 'undefined') {
                to = from;
                from = 0;
            }
            return Math.random()*(to-from)+from;
        }

    }
});
