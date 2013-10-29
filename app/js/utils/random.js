define(function() {
    return {
        get: function(from,to) {
            if (typeof to == 'undefined') {
                to = from;
                from = 0;
            }
            return Math.floor(Math.random()*(to-from+1)+from);
        }
    }
});
