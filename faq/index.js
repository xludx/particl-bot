var _ = require("underscore");
var fs = require('fs');
var path = require('path');

/**
 *
 * @param config - bot config
 * @returns {{version: string, execute: execute, getHelp: getHelp}}
 */
module.exports = function (config) {

    var module = {
        version: '1.0',
        execute: execute,
        getHelp: getHelp
    };

    var topics = {
        "topic1": "topic1.txt",
        "topic2": "topic1.txt"
    };

    init();

    return module;

    //////////////////////////////////////////////////////////////////////////////////////

    /**
     * return the commands help message
     *
     * @returns {string}
     */
    function getHelp() {
        return "- list all topics\n" +
               "[topic] - show topic contents"
    }

    /**
     * run when this plugin is called
     *
     * @param commandParams, array<string> of command parameters
     * @param callback
     */
    function execute(commandParams, callback) {

        if(_.isEmpty(commandParams) ){
            callback(null, { text: 'topics: ' + _.keys(topics) });
        } else if(_.has(topics, commandParams[0])){
            var file = topics[commandParams[0]];
            fs.readFile(path.join(path.dirname(require.main.filename), 'plugins/faq/' + file), {encoding: 'utf-8'}, function (error, fileContent) {
                callback(error, { text: fileContent });
            });
        } else {
            callback('no such topic.', null);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    function init() {
        console.log('#########################################################################');
        console.log('### plugin: faq');
        console.log('#########################################################################');

    }
};


