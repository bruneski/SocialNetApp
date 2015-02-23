/**
 * Created by mbrune on 2/23/15.
 */
require.config({
   paths: {
       jQuery: '/js/libs/jquery-2.1.3.min.js',
       Underscore: '/js/libs/underscore-min.js',
       Backbone: '/js/libs/backbone-min.js',
       text: '/js/libs/text',
       templates: '../templates'
   },
   shim: {
       'Backbone' : ['Underscore', 'jQuery'],
       'SocialNet' : ['Backbone']
   }
});

require(['SocialNet'], function(SocialNet) {
    SocialNet.initialize();
});