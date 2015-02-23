/**
 * Created by mbrune on 2/23/15.
 */
define(['views/index'], function(indexView) {
   var initialize = function() {
       indexView.render();
   }

   return {
       initialize: initialize
   };
});
