/*
 * A simple lightweight DOM query function
 * Author: Igor J. Santos <igor@getidigital.com.br>
 */
'use strict';

var $el = (function (document, window, $el) {
    var forEach = 'forEach',
        node = Node.prototype,
        nodeList = NodeList.prototype,
        dummy = document.createElement('i');

    // Node Events
    node.on = function (event, fn) {
        this.addEventListener(event, fn, false);
        return this;
    };

    // NodeList Events
    nodeList[forEach] = Array.prototype[forEach];
    nodeList.on = function (event, fn) {
        this[forEach](function (el) {
            el.on(event, fn);
        });
        return this;
    };

    $el = function (selector) {
        var result = document.querySelectorAll(selector || ' '),
            length = result.length;
        return result.length == 1 ? result[0] : result;
    };

    $el.on = node.on.bind(Element);

    return $el;
})(document, this);
