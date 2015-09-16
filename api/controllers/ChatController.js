/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	attributes: {
        msg: {
            type: 'string'
        },
        user: {
            model: 'user'
        }
    }
};

