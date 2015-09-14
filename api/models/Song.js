/**
* Song.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
        type:'string',
        required: true,
        minLength: 5,
        maxLength: 40
    },
    description: {
        type:'string',
        required:true
    },
    project: {
        model: 'project',
        // required: true
        },
    version: {type:'string',required:true},
    branch: {type:'string'},
    user: {
        model: 'user'
        }
    }
};