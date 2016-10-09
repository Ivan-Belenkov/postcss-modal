// Convert a js obj to a postcss rule, extending clonedRule if it is passed in.
var objToRule = function(obj, clonedRule) {
    var rule = clonedRule || postcss.rule();
    var skipKeys = ['selector', 'selectors', 'source'];

    if(obj.selector)
        rule.selector = obj.selector;
    else if(obj.selectors)
        rule.selectors = obj.selectors;

    if(obj.source)
        rule.source = obj.source;

    for(var k in obj) {
        if(obj.hasOwnProperty(k) && !(skipKeys.indexOf(k) + 1)) {
            var v = obj[k];
            var found = false;

            // If clonedRule was passed in, check for an existing property.
            if(clonedRule) {
                rule.each(function(decl) {
                    if(decl.prop == k) {
                        decl.value = v;
                        found = true;
                        return false;
                    }
                });
            }

            // If no clonedRule or there was no existing prop.
            if(!clonedRule || !found)
                rule.append({prop: k, value: v});
        }
    }

    return rule;
};

module.exports = objToRule;