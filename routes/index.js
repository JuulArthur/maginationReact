'use strict';
var express = require('express');
var path = require('path');
var baucis = require('baucis');
var router = express.Router();
var auth = require('./auth')
var middleware = require('./middleware');


module.exports = function(app){
  baucis.rest('post')
  .request('collection','head post put delete', middleware.requireUser)
  .query(function(req,res,next){
    req.baucis.query.populate('author', '-password')
    next();
  });

  baucis.rest('user').request(middleware.requireUser);

  router.post('/login', auth, function(req, res) {
    res.send('Hello! '+ req.user.username);
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  });

  app.use('/api', baucis());
  return router;
};
