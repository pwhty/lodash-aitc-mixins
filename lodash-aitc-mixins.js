/**
 * @license
 * Copyright 2014 Patricius Albu
 */

/**
 * Creates an array by running each element in the collection through the callback. If an element is a collection
 * itself, then this function is called recursively on that collection. The recursivity ends when an element is not a
 * collection. The callback is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of
 * the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that
 * have the properties of the given object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array} Returns a new array of the results of each `callback` execution.
 * @example
 *
 * _.deepMap([1, 2, [3]], function(num) { return num * 3; });
 * // => [3, 6, [9]]
 *
 * _.map({ 'one': 1, 'two': 2, 'three': [3] }, function(num) { return num * 3; });
 * // => [3, 6, [9]] (property order is not guaranteed across environments)
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   [{ 'name': 'fred',   'age': 40 }]
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.map(characters, 'name');
 * // => ['barney', ['fred']]
 */
_.mixin({'deepMap' : function(collection, callback, thisArg){
    callback = _.createCallback(callback, thisArg, 3);
    return _.map(collection, function (value, index) {
        // if it's an array, map recursively inside it
        if(_.isArray(value))
            return _.deepMap(value, callback);
        // if it's a number, map it to the requested object {x: index, y: value}
        else
            return callback(value, index);
    });
}});

