/**
 * Ajax Queue Plugin
 * 
 * svn co http://jqueryjs.googlecode.com/svn/trunk/plugins/ajaxQueue
 */

/**

<script>
$(function(){
	jQuery.ajaxQueue({
		url: "test.php",
		success: function(html){ jQuery("ul").append(html); }
	});
	jQuery.ajaxQueue({
		url: "test.php",
		success: function(html){ jQuery("ul").append(html); }
	});
	jQuery.ajaxSync({
		url: "test.php",
		success: function(html){ jQuery("ul").append("<b>"+html+"</b>"); }
	});
	jQuery.ajaxSync({
		url: "test.php",
		success: function(html){ jQuery("ul").append("<b>"+html+"</b>"); }
	});
});
</script>
<ul style="position: absolute; top: 5px; right: 5px;"></ul>

 */
/**
 * Ajax Queue Plugin
 * 
 * Homepage: http://jquery.com/plugins/project/ajaxqueue
 * Documentation: http://docs.jquery.com/AjaxQueue
 */

/**

<script>
$(function(){
	jQuery.ajaxQueue({
		url: "test.php",
		success: function(html){ jQuery("ul").append(html); }
	});
	jQuery.ajaxQueue({
		url: "test.php",
		success: function(html){ jQuery("ul").append(html); }
	});
	jQuery.ajaxSync({
		url: "test.php",
		success: function(html){ jQuery("ul").append("<b>"+html+"</b>"); }
	});
	jQuery.ajaxSync({
		url: "test.php",
		success: function(html){ jQuery("ul").append("<b>"+html+"</b>"); }
	});
});
</script>
<ul style="position: absolute; top: 5px; right: 5px;"></ul>

 */
/*
 * Queued Ajax requests.
 * A new Ajax request won't be started until the previous queued 
 * request has finished.
 */

/*
 * Synced Ajax requests.
 * The Ajax request will happen as soon as you call this method, but
 * the callbacks (success/error/complete) won't fire until all previous
 * synced requests have been completed.
 */


;(function($) {
	
       // save the pointer to ajax to be able to reset the queue
       $.ajax_queue = $.ajax;

	var pendingRequests = {};
	
	var synced = [];
	var syncedData = [];
	
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = jQuery.extend(settings, jQuery.extend({}, jQuery.ajaxSettings, settings));
		
		switch(settings.mode) {
		case "queue": 
			var _error = settings.error;
			settings.error = function(){
			        var result;
                                if ( _error ) {
					result = _error.apply( this, arguments );
                                }
				if (result === undefined) {
				        jQuery([$.ajax_queue]).dequeue("ajax");
				} else {
				        $.ajax_queue( settings );
				}
			};
			var _success = settings.success;
			settings.success = function(){
                                if ( _success ) {
					_success.apply( this, arguments );
                                }
				jQuery([$.ajax_queue]).dequeue("ajax");
			};
		
			jQuery([ $.ajax_queue ]).queue("ajax", function(){
                                //
                                // Allow cross domain requests when the protocol of 
                                // an XmlHTTPRequest is not http. This must be done before each XmlHTTPRequest call,
                                // it cannot be set globaly. By adding it to the beforeSend hook of each jquery
                                // ajax request, we make sure the jquery.ajaxQueue.js or jquery.gettext.js plugins
                                // will be able to do cross domain requests.
                                // The jQuery library does not support this, probably because it is browser specific
                                // and introduces an insecurity which is unsuitable for a widely spread library.
                                // This should probably be a jquery plugin.
                                //
                                if(window.Components && window.netscape && window.netscape.security && document.location.protocol.indexOf("http") == -1) {
                                    window.netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                                }
				$.ajax_queue( settings );
			});
			return undefined;
		case "sync":
			var pos = synced.length;
	
			synced[ pos ] = {
				error: settings.error,
				success: settings.success,
				complete: settings.complete,
				done: false
			};
		
			syncedData[ pos ] = {
				error: [],
				success: [],
				complete: []
			};
		
			settings.error = function(){ syncedData[ pos ].error = arguments; };
			settings.success = function(){ syncedData[ pos ].success = arguments; };
			settings.complete = function(){
				syncedData[ pos ].complete = arguments;
				synced[ pos ].done = true;
		
				if ( pos == 0 || !synced[ pos-1 ] )
					for ( var i = pos; i < synced.length && synced[i].done; i++ ) {
						if ( synced[i].error ) synced[i].error.apply( jQuery, syncedData[i].error );
						if ( synced[i].success ) synced[i].success.apply( jQuery, syncedData[i].success );
						if ( synced[i].complete ) synced[i].complete.apply( jQuery, syncedData[i].complete );
		
						synced[i] = null;
						syncedData[i] = null;
					}
			};
		}
                if(window.Components && window.netscape && window.netscape.security && document.location.protocol.indexOf("http") == -1) {
                    window.netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                }
		return $.ajax_queue.apply(this, arguments);
	};
	
})(jQuery);