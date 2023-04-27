!function(e){function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s="./client/src/bundles/bundle.js")}({"./client/src/bundles/bundle.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),o=t.n(a),i=t("./client/src/components/MapboxField/MapboxField.js");o.a.entwine("ss",function(e){e(".cms-edit-form .mapbox").entwine({MapboxField:null,onmatch:function(){this.getMapboxField()||this.setMapboxField(new i.a(this))}}),e('.cms-edit-form [aria-hidden="false"] .mapbox').entwine({onmatch:function(){this._super(),this.getMapboxField().render()}}),e(".cms-edit-form .mapbox:not(.tabset .mapbox)").entwine({onmatch:function(){this._super(),this.getMapboxField().render()}})})},"./client/src/components/MapboxField/MapboxField.js":function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),i=function(){function e(n){a(this,e),this.$container=n,this.rendered=!1}return o(e,[{key:"_getLngLatValue",value:function(){return[this._getLngField().val()||174.7762,this._getLatField().val()||-41.2865]}},{key:"_setLngLatValue",value:function(e){this._getLngField().val(e[0]).change(),this._getLatField().val(e[1]).change()}},{key:"_getLngField",value:function(){return this.$container.find('input[data-mapbox-field="Longitude"]')}},{key:"_getLatField",value:function(){return this.$container.find('input[data-mapbox-field="Latitude"]')}},{key:"_onMarkerUpdate",value:function(e){var n=e.getLngLat();this._setLngLatValue([n.lng,n.lat])}},{key:"render",value:function(){var n=this;if(!this.rendered){mapboxgl.accessToken=e._getAccessToken();var t=new mapboxgl.Map({container:this.$container.find(".mapbox__map").get(0),center:this._getLngLatValue(),style:e._getMapStyle(),zoom:15}),a=new mapboxgl.Marker({draggable:!0}).setLngLat(this._getLngLatValue()).addTo(t);a.on("dragend",function(){n._onMarkerUpdate(a)});var o=new MapboxGeocoder({accessToken:e._getAccessToken()});t.addControl(o),o.on("result",function(e){a.setLngLat(e.result.geometry.coordinates),n._onMarkerUpdate(a)}),t.addControl(new mapboxgl.NavigationControl),this.rendered=!0}}}],[{key:"_getAccessToken",value:function(){return window.mapboxAccessToken}},{key:"_getMapStyle",value:function(){return window.mapStyle}}]),e}();n.a=i},0:function(e,n){e.exports=jQuery}});