//
//     Copyright (C) 2008 Loic Dachary <loic@dachary.org>
//     Copyright (C) 2008 Johan Euphrosine <proppy@aminche.com>
//     Copyright (C) 2008 Saq Imtiaz <lewcid@gmail.com>
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

(function($) {

    if(!String.prototype.supplant) {
        //
        // Douglas Crockford douglas@crockford.com snippet
        //
        String.prototype.supplant = function (o) {
            return this.replace(/{([^{}]*)}/g,
                                function (a, b) {
                                    var r = o[b];
                                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                                }
                                );
        };
    }

    $.fn.jpoker = function() {
        var args = Array.prototype.slice.call(arguments);
        var name = args.shift();
        $.jpoker.plugins[name].apply(this, args);
    };

    $.jpoker = {

        VERSION: '1.0.14',

        sound: 'embed width=\'1\' height=\'1\' pluginspage=\'http://getgnash.org/\' type=\'application/x-shockwave-flash\' ',

        packetName2Type: { NONE: 0, STRING: 1, INT: 2, ERROR: 3, ACK: 4, PING: 5, SERIAL: 6, QUIT: 7, AUTH_OK: 8, AUTH_REFUSED: 9, LOGIN: 10, AUTH_REQUEST: 11, LIST: 12, LOGOUT: 13, BOOTSTRAP: 14, PROTOCOL_ERROR: 15, MESSAGE: 16, POKER_SEATS: 50, POKER_ID: 51, POKER_MESSAGE: 52, ERROR: 53, POKER_POSITION: 54, POKER_INT: 55, POKER_BET: 56, POKER_FOLD: 57, POKER_STATE: 58, POKER_WIN: 59, POKER_CARDS: 60, POKER_PLAYER_CARDS: 61, POKER_BOARD_CARDS: 62, POKER_CHIPS: 63, POKER_PLAYER_CHIPS: 64, POKER_CHECK: 65, POKER_START: 66, POKER_IN_GAME: 67, POKER_CALL: 68, POKER_RAISE: 69, POKER_DEALER: 70, POKER_TABLE_JOIN: 71, POKER_TABLE_SELECT: 72, POKER_TABLE: 73, POKER_TABLE_LIST: 74, POKER_SIT: 75, POKER_TABLE_DESTROY: 76, POKER_TIMEOUT_WARNING: 77, POKER_TIMEOUT_NOTICE: 78, POKER_SEAT: 79, POKER_TABLE_MOVE: 80, POKER_PLAYER_LEAVE: 81, POKER_SIT_OUT: 82, POKER_TABLE_QUIT: 83, POKER_BUY_IN: 84, POKER_REBUY: 85, POKER_CHAT: 86, POKER_PLAYER_INFO: 87, POKER_PLAYER_ARRIVE: 88, POKER_HAND_SELECT: 89, POKER_HAND_LIST: 90, POKER_HAND_SELECT_ALL: 91, POKER_USER_INFO: 92, POKER_GET_USER_INFO: 93, POKER_ANTE: 94, POKER_BLIND: 95, POKER_WAIT_BIG_BLIND: 96, POKER_AUTO_BLIND_ANTE: 97, POKER_NOAUTO_BLIND_ANTE: 98, POKER_CANCELED: 99, POKER_BLIND_REQUEST: 100, POKER_ANTE_REQUEST: 101, POKER_AUTO_FOLD: 102, POKER_WAIT_FOR: 103, POKER_STREAM_MODE: 104, POKER_BATCH_MODE: 105, POKER_LOOK_CARDS: 106, POKER_TABLE_REQUEST_PLAYERS_LIST: 107, POKER_PLAYERS_LIST: 108, POKER_PERSONAL_INFO: 109, POKER_GET_PERSONAL_INFO: 110, POKER_TOURNEY_SELECT: 111, POKER_TOURNEY: 112, POKER_TOURNEY_INFO: 113, POKER_TOURNEY_LIST: 114, POKER_TOURNEY_REQUEST_PLAYERS_LIST: 115, POKER_TOURNEY_REGISTER: 116, POKER_TOURNEY_UNREGISTER: 117, POKER_TOURNEY_PLAYERS_LIST: 118, POKER_HAND_HISTORY: 119, POKER_SET_ACCOUNT: 120, POKER_CREATE_ACCOUNT: 121, POKER_PLAYER_SELF: 122, POKER_GET_PLAYER_INFO: 123, POKER_ROLES: 124, POKER_SET_ROLE: 125, POKER_READY_TO_PLAY: 126, POKER_PROCESSING_HAND: 127, POKER_MUCK_REQUEST: 128, POKER_AUTO_MUCK: 129, POKER_MUCK_ACCEPT: 130, POKER_MUCK_DENY: 131, POKER_CASH_IN: 132, POKER_CASH_OUT: 133, POKER_CASH_OUT_COMMIT: 134, POKER_CASH_QUERY: 135, POKER_RAKE: 136, POKER_TOURNEY_RANK: 137, POKER_PLAYER_IMAGE: 138, POKER_GET_PLAYER_IMAGE: 139, POKER_HAND_REPLAY: 140, POKER_GAME_MESSAGE: 141, POKER_EXPLAIN: 142, POKER_STATS_QUERY: 143, POKER_STATS: 144, PACKET_POKER_BEST_CARDS: 170, PACKET_POKER_POT_CHIPS: 171, PACKET_POKER_CLIENT_ACTION: 172, PACKET_POKER_BET_LIMIT: 173, POKER_SIT_REQUEST: 174, POKER_PLAYER_NO_CARDS: 175, PACKET_POKER_CHIPS_PLAYER2BET: 176, PACKET_POKER_CHIPS_BET2POT: 177, PACKET_POKER_CHIPS_POT2PLAYER: 178, PACKET_POKER_CHIPS_POT_MERGE: 179, POKER_CHIPS_POT_RESET: 180, POKER_CHIPS_BET2PLAYER: 181, POKER_END_ROUND: 182, PACKET_POKER_DISPLAY_NODE: 183, PACKET_POKER_DEAL_CARDS: 184, POKER_CHAT_HISTORY: 185, POKER_DISPLAY_CARD: 186, POKER_SELF_IN_POSITION: 187, POKER_SELF_LOST_POSITION: 188, POKER_HIGHEST_BET_INCREASE: 189, POKER_PLAYER_WIN: 190, POKER_ANIMATION_PLAYER_NOISE: 191, POKER_ANIMATION_PLAYER_FOLD: 192, POKER_ANIMATION_PLAYER_BET: 193, POKER_ANIMATION_PLAYER_CHIPS: 194, POKER_ANIMATION_DEALER_CHANGE: 195, POKER_ANIMATION_DEALER_BUTTON: 196, POKER_BEGIN_ROUND: 197, POKER_CURRENT_GAMES: 198, POKER_END_ROUND_LAST: 199, POKER_PYTHON_ANIMATION: 200, POKER_SIT_OUT_NEXT_TURN: 201, POKER_RENDERER_STATE: 202, POKER_CHAT_WORD: 203, POKER_SHOWDOWN: 204, POKER_CLIENT_PLAYER_CHIPS: 205, POKER_INTERFACE_COMMAND: 206, POKER_PLAYER_ME_LOOK_CARDS: 207, POKER_PLAYER_ME_IN_FIRST_PERSON: 208, POKER_ALLIN_SHOWDOWN: 209 },

        verbose: 0,

        copyrightTimeout: 5000,

        copyright: function() {
            var options = { width: 'none', height: 'none' };
	    if($.browser.msie) {
		/* 
                 *  On IE, the widget container width and height needs to be set explicitly
                 *  if the widget width/height is being set as 'none'
                 */
		options.containerWidth = '400px';
		options.containerHeight = '300px';
	    }

            /*
             * On IE7, css('margin') returns 'auto' instead of the actual margin value unless
	     * the  margin is set explicitly. This causes ui.dialog to throw exceptions.
             */
            var copyright = $('<div style=\'margin:0px\'><div id=\'jpoker_copyright\'><div class=\'jpoker_copyright_image\'></div><div class=\'jpoker_software\'>jpoker-' + this.VERSION + '</div><div class=\'jpoker_authors\'><div><span>Copyright 2008 </span><a href=\'mailto:loic@dachary.org\'>Loic Dachary</a></div><div><span class=\'jpoker_click\'>Copyright 2008 </span><a href=\'mailto:proppy@aminche.com\'>Johan Euphrosine</a></div></div><div class=\'jpoker_explain\'>jpoker runs on this web browser and is Free Software. You may use jpoker to run a business without asking the authors permissions. You may give a copy to your friends. However, the authors do not want jpoker to be used with proprietary software.</div><div class=\'jpoker_license\'>This program is free software: you can redistribute it and/or modify it under the terms of the <a href=\'http://www.fsf.org/licensing/licenses/gpl.txt\'>GNU General Public License</a> as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.</div> <div class=\'jpoker_full_copyright\'>Read the full <a href=\'http://jspoker.pokersource.info/jpoker/#Copyright\'>copyright information page.</a></div><div class=\'jpoker_download\'>Download <a href=\'http://upstream.jspoker.pokersource.info/file/tip/jpoker/js/jquery.jpoker.js\'>jpoker sources.</a></div><div class=\'jpoker_dismiss\'><a href=\'javascript://\'>Dismiss</a></div></div></div>').dialog(options); 
            $('.jpoker_download', copyright).frame('box1');
            $('.ui-dialog-titlebar', copyright.parents('.ui-dialog-container')).hide();
            var close = function() { copyright.dialog('destroy'); };
            window.setTimeout(close, this.copyrightTimeout);
            copyright.click(close);
            return copyright;
        },

        serial: (new Date()).getTime(),

        servers: {},

        url2hashCache: {},

        uninit: function() {
            $.each(this.servers,
                   function(key, value) {
                       value.uninit();
                   });
            this.servers = {};
        },

        now: function() { return (new Date()).getTime(); },

        uid: function() { return 'jpoker' + $.jpoker.serial++ ; },

        message: function(str) {
            if(window.console) { window.console.log(str); }
        },

        dialog: function(content) {
            var message = $('#jpokerDialog');
            if(message.size() != 1) {
                $('body').append('<div id=\'jpokerDialog\' class=\'jpoker_jquery_ui\' title=\'jpoker message\' />');
                message = $('#jpokerDialog');
                message.dialog({
                        autoOpen: false,
                            dialog: true
                            });
            }
            message.html(content).dialog('open');
        },

        error: function(reason) {
            this.errorHandler(reason);
            this.uninit();
            throw reason;
        },

        errorHandler: function(reason) {
            this.message(reason);
        },

        serverCreate: function(options) {
            this.servers[options.url] = new jpoker.server(options);
            return this.servers[options.url];
        },

        serverDestroy: function(url) {
            this.servers[url].uninit();
            delete this.servers[url];
        },

        url2server: function(options) {
	    if(!(options.url in this.servers)) {
		this.serverCreate(options);
	    }
	    return this.servers[options.url];
	},

        getServer: function(url) {
            return this.servers[url];
        },

        getTable: function(url, game_id) {
            var server = jpoker.servers[url];
            if(!server) {
                return undefined;
            } else {
                return server.tables[game_id];
            }
        },

        getPlayer: function(url, game_id, serial) {
            var server = jpoker.servers[url];
            if(!server) {
                return undefined;
            }
            var table = server.tables[game_id];
            if(!table) {
                return undefined;
            }
            return table.serial2player[serial];
        },

        getServerTablePlayer: function(url, game_id, serial) {
            var server = jpoker.servers[url];
            if(!server) {
                return undefined;
            }
            var table = server.tables[game_id];
            if(!table) {
                return undefined;
            }
            if(!table.serial2player[serial]) {
                return undefined;
            }
            return { server: server,
                     table: table,
                     player: table.serial2player[serial]
                    };
        },

        url2hash: function(url) {
            if(!(url in this.url2hashCache)) {
                this.url2hashCache[url] = jpoker.Crypto.hexSha1Str(url);
            }
            return this.url2hashCache[url];
        }
        
    };

    var jpoker = $.jpoker;

    //--
    //-- Crypto functions and associated conversion routines
    //--

    //
    // Copyright (c) UnaMesa Association 2004-2007
    // 
    // Licensed under Modified BSD
    //

    // Crypto namespace
    jpoker.Crypto = function() {};

    // Convert a string to an array of big-endian 32-bit words
    jpoker.Crypto.strToBe32s = function(str)
        {
            var be = Array();
            var len = Math.floor(str.length/4);
            var i, j;
            for(i=0, j=0; i<len; i++, j+=4) {
		be[i] = ((str.charCodeAt(j)&0xff) << 24)|((str.charCodeAt(j+1)&0xff) << 16)|((str.charCodeAt(j+2)&0xff) << 8)|(str.charCodeAt(j+3)&0xff);
            }
            while (j<str.length) {
		be[j>>2] |= (str.charCodeAt(j)&0xff)<<(24-(j*8)%32);
		j++;
            }
            return be;
        };

    // Convert an array of big-endian 32-bit words to a string
    jpoker.Crypto.be32sToStr = function(be)
        {
            var str = '';
            for(var i=0;i<be.length*32;i+=8) {
		str += String.fromCharCode((be[i>>5]>>>(24-i%32)) & 0xff);
            }
            return str;
        };

    // Convert an array of big-endian 32-bit words to a hex string
    jpoker.Crypto.be32sToHex = function(be)
        {
            var hex = '0123456789ABCDEF';
            var str = '';
            for(var i=0;i<be.length*4;i++) {
		str += hex.charAt((be[i>>2]>>((3-i%4)*8+4))&0xF) + hex.charAt((be[i>>2]>>((3-i%4)*8))&0xF);
            }
            return str;
        };

    // Return, in hex, the SHA-1 hash of a string
    jpoker.Crypto.hexSha1Str = function(str)
        {
            return jpoker.Crypto.be32sToHex(jpoker.Crypto.sha1Str(str));
        };

    // Return the SHA-1 hash of a string
    jpoker.Crypto.sha1Str = function(str)
        {
            return jpoker.Crypto.sha1(jpoker.Crypto.strToBe32s(str),str.length);
        };

    // Calculate the SHA-1 hash of an array of blen bytes of big-endian 32-bit words
    jpoker.Crypto.sha1 = function(x,blen)
        {
            // Add 32-bit integers, wrapping at 32 bits
            add32 = function(a,b)
            {
		var lsw = (a&0xFFFF)+(b&0xFFFF);
		var msw = (a>>16)+(b>>16)+(lsw>>16);
		return (msw<<16)|(lsw&0xFFFF);
            };
            // Add five 32-bit integers, wrapping at 32 bits
            add32x5 = function(a,b,c,d,e)
            {
		var lsw = (a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF);
		var msw = (a>>16)+(b>>16)+(c>>16)+(d>>16)+(e>>16)+(lsw>>16);
		return (msw<<16)|(lsw&0xFFFF);
            };
            // Bitwise rotate left a 32-bit integer by 1 bit
            rol32 = function(n)
            {
		return (n>>>31)|(n<<1);
            };

            var len = blen*8;
            // Append padding so length in bits is 448 mod 512
            x[len>>5] |= 0x80 << (24-len%32);
            // Append length
            x[((len+64>>9)<<4)+15] = len;
            var w = Array(80);

            var k1 = 0x5A827999;
            var k2 = 0x6ED9EBA1;
            var k3 = 0x8F1BBCDC;
            var k4 = 0xCA62C1D6;

            var h0 = 0x67452301;
            var h1 = 0xEFCDAB89;
            var h2 = 0x98BADCFE;
            var h3 = 0x10325476;
            var h4 = 0xC3D2E1F0;

            for(var i=0;i<x.length;i+=16) {
		var j,t;
		var a = h0;
		var b = h1;
		var c = h2;
		var d = h3;
		var e = h4;
		for(j = 0;j<16;j++) {
                    w[j] = x[i+j];
                    t = add32x5(e,(a>>>27)|(a<<5),d^(b&(c^d)),w[j],k1);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=16;j<20;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),d^(b&(c^d)),w[j],k1);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=20;j<40;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),b^c^d,w[j],k2);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=40;j<60;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),(b&c)|(d&(b|c)),w[j],k3);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=60;j<80;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),b^c^d,w[j],k4);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}

		h0 = add32(h0,a);
		h1 = add32(h1,b);
		h2 = add32(h2,c);
		h3 = add32(h3,d);
		h4 = add32(h4,e);
            }
            return Array(h0,h1,h2,h3,h4);
        };

    //
    // chips helpers
    //
    jpoker.chips = {
        epsilon: 0.001,

        chips2value: function(chips) {
            var value = 0;
            for(var i = 0; i < chips.length; i += 2) {
                value += ( chips[i] / 100 ) * chips[i + 1];
            }
            return value;
        },

        SHORT: function(chips) {
            if(chips < 10) {
                return this.LONG(chips);
            } 
            var unit = [ 'G', 'M', 'K', '' ];
            for(var magnitude = 1000000000; magnitude > 0; magnitude /= 1000) {
                if(chips >= magnitude) {
                    if(chips / magnitude < 10) {
                        chips = chips / ( magnitude / 10 );
                        return parseInt(chips / 10, 10) + '.' + parseInt(chips % 10, 10) + unit[0];
                    } else {
                        return parseInt(chips / magnitude, 10) + unit[0];
                    }
                }
                unit.shift();
            }
        },

        LONG: function(chips) {
            var chips_int = parseInt(chips, 10);
            var chips_fraction = parseInt(chips * 100, 10) % 100;
            if(chips_fraction === 0) {
                return chips_int;
            } else if(chips_fraction % 10) {
                if(chips_fraction < 10) {
                    return chips_int + '.0' + chips_fraction;
                } else {
                    return chips_int + '.' + chips_fraction;
                }
            } else {
                return chips_int + '.' + parseInt(chips_fraction / 10, 10);
            }
        }

    };

    //
    // cards helpers
    //
    jpoker.cards = {
        // Ad replaced with Ax to escape adblock 
        card2string: [ '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ax', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As' ]
    };

    //
    // Abstract prototype for all objects that
    // call destroy and update callbacks
    //
    jpoker.watchable = function(options) {
        $.extend(this, jpoker.watchable.defaults, options);
        if(jpoker.verbose > 0) {
            this.uid = jpoker.uid(); // helps track the packets
        }
        this.init();
    };

    jpoker.watchable.defaults = {
    };

    jpoker.watchable.prototype = {

        init: function() {
            this.setCallbacks();
        },

        uninit: function() {
            this.notifyDestroy();
            this.setCallbacks();
        },

        setCallbacks: function() {
            this.callbacks = { };
            this.protect = { };
        },

        notify: function(what, data) {
            if(what in this.callbacks) {
                if(what in this.protect) {
                    throw 'notify recursion for ' + what;
                }
                this.protect[what] = [];
                var result = [];
                var l = this.callbacks[what];
                for(var i = 0; i < l.length; i++) {
                    if(l[i](this, what, data)) {
                        result.push(l[i]);
                    }
                }
                this.callbacks[what] = result;
                var backlog = this.protect[what];
                delete this.protect[what];
                for(var j = 0; j < backlog.length; j++) {
                    backlog[j]();
                }
            }
        },

        notifyUpdate: function(data) { this.notify('update', data); },
        notifyDestroy: function(data) { this.notify('destroy', data); },
        notifyReinit: function(data) { this.notify('reinit', data); },

        register: function(what, callback, callback_data, signature) {
            if(what in this.protect) {
                var self = this;
                this.protect[what].push(function() {
                        self.register(what, callback, callback_data, signature);
                    });
            } else {
                this.unregister(what, signature || callback);
                if(!(what in this.callbacks)) {
                    this.callbacks[what] = [];
                }
                var wrapper = function($this, what, data) {
                    return callback($this, what, data, callback_data);
                };
                wrapper.signature = signature || callback;
                this.callbacks[what].push(wrapper);
            }
        },

        registerUpdate: function(callback, callback_data, signature) { this.register('update', callback, callback_data, signature); },
        registerDestroy: function(callback, callback_data, signature) { this.register('destroy', callback, callback_data, signature); },
        registerReinit: function(callback, callback_data, signature) { this.register('reinit', callback, callback_data, signature); },

        unregister: function(what, signature) {
            if(what in this.callbacks) {
                this.callbacks[what] = $.grep(this.callbacks[what],
                                              function(e, i) { return e.signature != signature; });
                if(this.callbacks[what].length <= 0) {
                    delete this.callbacks[what];
                }
            }
        },

        unregisterUpdate: function(callback) { this.unregister('update', callback); },
        unregisterDestroy: function(callback) { this.unregister('destroy', callback); },
        unregisterReinit: function(callback) { this.unregister('reinit', callback); }

    };

    //
    // Abstract prototype to manage the communication with a single poker server
    //
    jpoker.connection = function(options) {
        $.extend(this, jpoker.connection.defaults, options);
        this.init();
    };

    jpoker.connection.defaults = $.extend({
            mode: 'queue',
            url: '',
            async: true,
            lagmax: 60,
            pollFrequency:  100,
            pingFrequency: 5000,
            timeout: 30000,
            clearTimeout: function(id) { return window.clearTimeout(id); },
            setTimeout: function(cb, delay) { return window.setTimeout(cb, delay); },
            ajax: function(o) { return jQuery.ajax(o); },
            cookie: function() { return document.cookie; }
        }, jpoker.watchable.defaults);

    jpoker.connection.prototype = $.extend({}, jpoker.watchable.prototype, {

            ROLE: 'role',
            LOGIN: 'loging',
            RUNNING: 'running',
            USER_INFO: 'retrieving user info',
            RECONNECT: 'trying to reconnect',
            MY: 'searching my tables',
            TABLE_LIST: 'searching tables',
            TOURNEY_LIST: 'searching tourneys',
            TOURNEY_DETAILS: 'retrieving tourney details',
            TABLE_JOIN: 'joining table',
	    TOURNEY_REGISTER: 'updating tourney registration',
	    PERSONAL_INFO: 'getting personal info',

            blocked: false,

            session: 'session=clear',

            lag: 0,

            high: ['PacketPokerChat', 'PacketPokerMessage', 'PacketPokerGameMessage'],

            incomingTimer: -1,

            pingTimer: -1,

            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.queues = {};
                this.delays = {};
                this.reset();
            },

            uninit: function() {
                this.blocked = true;
                jpoker.watchable.prototype.uninit.call(this);
                this.reset();
            },

            sessionName: function() {
                return 'TWISTED_SESSION_' + jpoker.url2hash(this.url);
            },

            sessionExists: function() {
                return this.cookie().indexOf(this.sessionName()) >= 0;
            },

            clearSession: function() {
                this.session = 'session=clear&name=' + jpoker.url2hash(this.url);
            },

            setSession: function() {
                this.session = 'session=yes&name=' + jpoker.url2hash(this.url);
            },

            ensureSession: function() {
                if(this.session.indexOf('session=clear') === 0) {
                    this.setSession();
                    this.sendPacket({ 'type': 'PacketPokerExplain',
                                      'value': 0xFF });
                }
            },

            reset: function() {
                this.clearTimeout(this.pingTimer);
                this.pingTimer = -1;
                this.clearTimeout(this.incomingTimer);
                this.incomingTimer = -1;
                // empty the outgoing queue
                jQuery([$.ajax_queue]).queue('ajax', []);
                // empty the incoming queue
                this.queues = {};
                this.delays = {};
                this.connectionState = 'disconnected';
                this.clearSession();
            },

            error: function(reason) {
                this.reset();
                this.setConnectionState('disconnected');
                jpoker.error(reason);
            },

            setConnectionState: function(state) {
                if(this.connectionState != state) {
                    this.connectionState = state;
                    this.notifyUpdate({type: 'PacketConnectionState', state: state});
                }
            },

            getConnectionState: function() {
                return this.connectionState;
            },

            connected: function() {
                return this.getConnectionState() == 'connected';
            },

            //
            // Call 'handler' for each packet sent to the poker game 'id'
            // If id == 0, 'handler' is called for each packet not associated with
            // a poker game.
            //
            // Prototype: handler(server, id, packet) returns a boolean
            //
            // server: the $.jpoker.server instance connected to the server from
            //        which the packet was received
            // id: is 0 if the packet is not associated to a poker game or the serial
            //     number of the poker game
            // packet: is the packet received from the server
            // 
            // If the return value is false, the handler is discarded and will not
            // be called again. If the return value is true, the handler is retained
            // and will be called when the next packet matching the 'id' paramater
            // arrives.
            //
            // If the handler throws an exception, the server will be killed and
            // all communications interrupted. The handler must *not* call server.error.
            //
            registerHandler: function(id, handler, handler_data, signature) {
                this.register(id, handler, handler_data, signature);
            },

            unregisterHandler: function(id, handler) {
                this.unregister(id, handler);
            },

            handle: function(id, packet) {
                if(jpoker.verbose > 1) {
                    jpoker.message('connection handle ' + id + ': ' + JSON.stringify(packet));
                }
                if(id in this.callbacks) {
                    delete packet.time__;
                    packet.uid__ = jpoker.uid();
                    try { 
                        this.notify(id, packet);
                    } catch(e) {
                        this.error(e);
                        return false; // error will throw and this statement will never be reached
                    }
                    return true;
                } else {
                    return false;
                }
            },

            delayQueue: function(id, time) {
                this.delays[id] = time;
            },

            noDelayQueue: function(id) {
                if(id in this.delays) {
                    delete this.delays[id];
                }
            },

            // null => no delay
            handleDelay: function(id) {
                if(id in this.delays) {
                    return this.delays[id];
                } else {
                    return null;
                }
            },

            sendPacket: function(packet) {
                var $this = this;
                var json_data = JSON.stringify(packet);
                if(jpoker.verbose > 0) {
                    jpoker.message('sendPacket ' + json_data);
                }
                var args = {
                    async: this.async,
                    data: json_data,
                    mode: this.mode,
                    timeout: this.timeout,
                    url: this.url + '?' + this.session,
                    type: 'POST',
                    dataType: 'json',
                    global: false, // do not fire global events
                    success: function(data, status) {
                        if($this.getConnectionState() != 'connected') {
                            $this.setConnectionState('connected');
                        }
                        $this.queueIncoming(data);
                    },
                    error: function(xhr, status, error) {
                        if(status == 'timeout') {
                            $this.setConnectionState('disconnected');
                            $this.reset();
                        } else {
                            $this.error({ xhr: xhr,
                                          status: status,
                                          error: error
                                });
                        }
                    }
                };
                this.ajax(args);
            },

            ping: function() {
                if(jQuery([$.ajax_queue]).queue('ajax').length <= 0) {
                    this.sendPacket({ type: 'PacketPing' });
                }
                this.clearTimeout(this.pingTimer);
                var $this = this;
                this.pingTimer = this.setTimeout(function() {
                        $this.ping();
                    }, this.pingFrequency);
            },

            pinging: function() { return this.pingTimer >= 0; },

            queueIncoming: function(packets) {
                if(!this.blocked) {
                    for(var i = 0; i < packets.length; i++) {
                        packet = packets[i];
                        if('session' in packet) {
                            delete packet.session;
                        }
                        packet.time__ = jpoker.now();
                        var id;
                        if('game_id' in packet) {
                            id = packet.game_id;
                        } else {
                            id = 0;
                        }
                        if(!(id in this.queues)) {
                            this.queues[id] = { 'high': {'packets': [],
                                                         'delay': 0 },
                                                'low': {'packets': [],
                                                        'delay': 0 } };
                        }
			var queue;
                        if(jQuery.inArray(packet.type, this.high) >= 0) {
                            queue = this.queues[id].high;
                        } else {
                            queue = this.queues[id].low;
                        }
                        queue.packets.push(packet);
                        if(jpoker.verbose > 1) {
                            jpoker.message('queueIncoming ' + JSON.stringify(packet));
                        }
                    }
                    this.clearTimeout(this.incomingTimer);
                    var $this = this;
                    this.incomingTimer = this.setTimeout(function() {
                            $this.dequeueIncoming(); },
                        this.pollFrequency);
                }
            },

            dequeueIncoming: function() {
                if(!this.blocked) {
                    now = jpoker.now();
                    this.lag = 0;
                    
                    for(var id in this.queues) {
                        for(var priority in this.queues[id]) {
                            var queue = this.queues[id][priority];
                            if(queue.packets.length <= 0) {
                                continue;
                            }
                            lag = now - queue.packets[0].time__;
                            this.lag = this.lag > lag ? this.lag : lag;
                            if(queue.delay > now && lag > this.lagmax) {
                                queue.delay = 0;
                            }
                            if(queue.delay <= now) {
                                delay = this.handleDelay(id);
                                if(lag > this.lagmax || delay === null || delay <= now) {
                                    if(this.handle(id, queue.packets[0])) {
                                        queue.packets.shift();
                                    }
                                } else {
                                    queue.delay = delay;
                                }
                            } else if(jpoker.verbose > 0) {
                                jpoker.message(_("wait for {delay}s for queue {id}").supplant({ 'delay': queue.delay / 1000.0, 'id': id}));
                            }
                        }
                        //
                        // get rid of queues with no associated delay AND no pending packets.
                        // this.queues may be undefined if a handler destroyed the object
                        //
                        if(id in this.queues) {
                            queue = this.queues[id];
                            if(queue.high.packets.length <= 0 && queue.low.packets.length <= 0) {
                                if(queue.high.delay <= now && queue.low.delay <= now) {
                                    delete this.queues[id];
                                }
                            }
                        }
                    }
                }
                var empty = true;
                for(var j in this.queues) {
                    empty = false;
                    break;
                }
                this.clearTimeout(this.incomingTimer);
                if(!empty) {
                    var $this = this;
                    this.incomingTimer = this.setTimeout(function() {
                            $this.dequeueIncoming(); },
                        this.pollFrequency);
                }
            }

        });

    //
    // server
    //
    jpoker.server = function(options) {
        $.extend(this, jpoker.server.defaults, options);
        this.init();
    };

    jpoker.server.defaults = $.extend({
	    playersCount: null,
	    tablesCount: null,
	    playersTourneysCount: null,
	    tourneysCount: null,
            spawnTable: function(server, packet) {},
            tourneyRowClick: function(server, packet) {},
            setInterval: function(cb, delay) { return window.setInterval(cb, delay); },
            clearInterval: function(id) { return window.clearInterval(id); }
        }, jpoker.connection.defaults);

    jpoker.server.prototype = $.extend({}, jpoker.connection.prototype, {
            init: function() {
                jpoker.connection.prototype.init.call(this);
                this.tables = {};
                this.tableLists = {};
                this.timers = {};
                this.serial = 0;
                this.userInfo = {};
                this.registerHandler(0, this.handler);
                if(this.sessionExists()) {
                    this.reconnect();
                }
            },

            uninit: function() {
                this.clearTimers();
                this.unregisterHandler(0, this.handler);
                jpoker.connection.prototype.uninit.call(this);
            },

            reset: function() {
                jpoker.connection.prototype.reset.call(this);
                this.stateQueue = [];
                this.setState(this.RUNNING, 'reset');
            },

            queueRunning: function(callback) {
                this.stateQueue.push(callback);
                this.dequeueRunning();
            },

            dequeueRunning: function() {
                while(this.stateQueue.length > 0 && this.state == this.RUNNING) {
                    var callback = this.stateQueue.shift();
                    callback(this);
                }
            },

            setState: function(state, comment) {
                if(this.state != state) {
                    this.state = state;
                    if(!state) {
                        jpoker.error('undefined state');
                    }
                    if(jpoker.verbose > 0) {
                        jpoker.message('setState ' + state + ' ' + comment);
                    }
                    this.notifyUpdate({type: 'PacketState', state: state});
                    this.dequeueRunning();
                }
            },

            getState: function() {
                return this.state;
            },

            clearTimers: function() {
                var $this = this;
                $.each(this.timers, function(key, value) {
                        $this.clearInterval(value.timer);
                    });
                this.timers = {};
            },

            handler: function(server, game_id, packet) {
                if(jpoker.verbose > 0) {
                    jpoker.message('server.handler ' + JSON.stringify(packet));
                }

                switch(packet.type) {

                case 'PacketPokerTable':
                if(packet.id in server.tables) {
                    server.tables[packet.id].reinit(packet);
                } else {
                    server.tables[packet.id] = new jpoker.table(server, packet);
                    server.notifyUpdate(packet);
                }
		packet.game_id = packet.id;
		server.spawnTable(server, packet);
                break;

                case 'PacketPokerMessage':
                case 'PacketPokerGameMessage':
                jpoker.dialog(packet.string);
                break;

                case 'PacketSerial':
                server.setSerial(packet);
                break;

                case 'PacketPokerUserInfo':
                server.userInfo = packet;
                for(id in server.tables) {
                    packet.game_id = id;
                    server.tables[id].handler(server, game_id, packet);
                    server.tables[id].notifyUpdate(packet);
                }
                delete packet.game_id;
                server.setState(server.RUNNING, 'PacketPokerUserInfo');
                break;

                }

                return true;
            },

            setSerial: function(packet) {
                this.serial = packet.serial;
                var id;
                for(id in this.tables) {
                    this.tables[id].notifyUpdate(packet);
                }
            },

            reconnect: function() {
                this.setState(this.RECONNECT);
                this.setSession();
                //
                // the answer to PacketPokerGetPlayerInfo gives back the serial, if and
                // only if the session is still valid. Otherwise it returns an error 
                // packet and the session must be re-initialized.
                //
                var handler = function(server, game_id, packet) {
                    if(packet.type == 'PacketPokerPlayerInfo') {
                        server.setSerial({ type: 'PacketSerial', serial: packet.serial });
                        server.ping();
                        server.rejoin();
                        return false;
                    } else if(packet.type == 'PacketError') {
                        server.clearSession();
                        if(packet.other_type != jpoker.packetName2Type.POKER_GET_PLAYER_INFO) {
                            jpoker.error('unexpected error while reconnecting ' + JSON.stringify(packet));
                        }
                        server.setState(server.RUNNING, 'PacketError reconnect');
                        return false;
                    }
                    return true;
                };
                this.registerHandler(0, handler);
                this.sendPacket({ type: 'PacketPokerGetPlayerInfo' });
            },

            refresh: function(tag, request, handler, state, options) {
                var timerRequest = jpoker.refresh(this, request, handler, state, options);
                if(timerRequest.timer) {
                    if(tag in this.timers) {
                        this.clearInterval(this.timers[tag].timer);
                    } 
		    this.timers[tag] = timerRequest;
                }
                return timerRequest;
            },

            //
            // tables lists
            //
            refreshTables: function(string, options) {

                if(!(string in this.tables)) {
                    this.tableLists[string] = {};
                }

                var request = function(server) {
                    server.sendPacket({
                            type: 'PacketPokerTableSelect',
                            string: string
                        });
                };

                var handler = function(server, packet) {
                    var info = server.tableLists && server.tableLists[string];
                    if(packet.type == 'PacketPokerTableList') {
                        info.packet = packet;
                        // although the tables/players count is sent with each
                        // table list, it is global to the server
                        server.playersCount = packet.players;
                        server.tablesCount = packet.tables;
                        server.notifyUpdate(packet);
                        return false;
                    }
                    return true;
                };

                return this.refresh('tableList', request, handler, this.TABLE_LIST, options);
            },

            //
            // tourneys lists
            //
            refreshTourneys: function(string, options) {

                var request = function(server) {
                    server.sendPacket({
                            type: 'PacketPokerTourneySelect',
                            string: string
                        });
                };

                var handler = function(server, packet) {
                    if(packet.type == 'PacketPokerTourneyList') {
                        // although the tourneys/players count is sent with each
                        // tourney list, it is global to the server
                        server.playersTourneysCount = packet.players;
                        server.tourneysCount = packet.tourneys;
                        server.notifyUpdate(packet);
                        return false;
                    }
                    return true;
                };

                return this.refresh('tourneyList', request, handler, this.TOURNEY_LIST, options);
            },

            //
            // tourney details
            //
            refreshTourneyDetails: function(game_id, options) {

                var request = function(server) {
                    server.sendPacket({
                            type: 'PacketPokerGetTourneyManager',
                            tourney_serial: game_id
                        });
                };

                var handler = function(server, packet) {
                    if(packet.type == 'PacketPokerTourneyManager') {
                        // although the tourneys/players count is sent with each
                        // tourney list, it is global to the server
			server.notifyUpdate(packet);
                        return false;
                    }
                    return true;
                };

                return this.refresh('tourneyDetails', request, handler, this.TOURNEY_DETAILS, options);
            },

            //
            // login / logout
            //
            loggedIn: function() {
                return this.serial !== 0;
            },

            login: function(name, password) {
                if(this.serial !== 0) {
                    throw _("{url} attempt to login {name} although serial is {serial} instead of 0").supplant({ 'url': this.url, 'name': name, 'serial': this.serial});
                }
                this.setState(this.LOGIN);
                this.ensureSession();
                this.userInfo.name = name;
                this.sendPacket({
                        type: 'PacketPokerSetRole',
                        roles: 'PLAY'
                            });
                this.sendPacket({
                        type: 'PacketLogin',
                        name: name,
                        password: password
                    });
                this.ping();
                this.getUserInfo(); // will fire when login is complete
                var role_is_set = false;
                var answer = function(server, game_id, packet) {
                    switch(packet.type) {
                    case 'PacketPokerRoles':
                    role_is_set = true;
                    return true;

                    case 'PacketAuthOk':
                    return true;

                    case 'PacketAuthRefused':
                    jpoker.dialog(_(packet.message) + _(" (login name is {name} )").supplant({ 'name': name }));
                    server.notifyUpdate(packet);
                    server.setState(server.RUNNING, 'PacketAuthRefused');
                    return false;

                    case 'PacketError':
                    if(packet.other_type == jpoker.packetName2Type.POKER_SET_ROLE) {
                        jpoker.dialog(packet.message);
                    } else if(packet.other_type == jpoker.packetName2Type.LOGIN) {
                        jpoker.dialog(_("user {name} is already logged in".supplant({ 'name': name })));
                        server.notifyUpdate(packet);
                    }
                    server.setState(server.RUNNING, 'login PacketError');
                    return false;

                    case 'PacketSerial':
                    if(role_is_set === false) {
                        jpoker.error('expected PacketPokerRoles before ' + JSON.stringify(packet));
                        return false;
                    }
                    server.notifyUpdate(packet);
                    server.setState(server.RUNNING, 'login serial received');
                    return false;
                    }

                    return true;
                };
                this.registerHandler(0, answer);
            },

            logout: function() {
                if(this.serial !== 0) {
                    //
                    // redundant with PacketLogout handler in server to ensure all
                    // notify functions will see serial == 0 regardless of the 
                    // order in which they are called.
                    //
                    this.serial = 0;
                    this.userInfo = {};
                    var packet = { type: 'PacketLogout' };
                    this.sendPacket(packet);
                    this.clearSession();
                    //
                    // LOGOUT IMPLIES ALL TABLES ARE DESTROYED INSTEAD
                    //
                    for(var game_id in this.tables) {
                        this.tables[game_id].notifyUpdate(packet);
                    }
                    this.notifyUpdate(packet);
                }
            },

            getUserInfo: function() {
                this.queueRunning(function(server) {
                        server.setState(server.USER_INFO);
                        server.sendPacket({
                                type: 'PacketPokerGetUserInfo',
                                    serial: server.serial });
                    });
            },

            rejoin: function() {
                this.setState(this.MY);
                var handler = function(server, game_id, packet) {
                    if(packet.type == 'PacketPokerTableList') {
                        for(var i = 0; i < packet.packets.length; i++) {
                            var subpacket = packet.packets[i];
                            server.tableJoin(subpacket.id);
                        }
                        server.getUserInfo();
                        server.setState(server.RUNNING, 'rejoin');
                        return false;
                    }
                    return true;
                };
                this.registerHandler(0, handler);
                this.sendPacket({ type: 'PacketPokerTableSelect', string: 'my' });
            },
            
            tableJoin: function(game_id) {
                this.queueRunning(function(server) {
                        server.setState(server.TABLE_JOIN);
                        server.ensureSession();
                        server.sendPacket({ 'type': 'PacketPokerTableJoin',
                                    'game_id': game_id });
                        server.ping();
                    });
            },

            bankroll: function(currency_serial) {
                var key = 'X' + currency_serial;
                if(this.loggedIn() && 'money' in this.userInfo && key in this.userInfo.money) {
                    return this.userInfo.money[key][0] / 100; // PacketPokerUserInfo for documentation
                }
                return 0;
            },

	    tourneyRegister: function(game_id) {
		this.queueRunning(function(server) {
			server.setState(server.TOURNEY_REGISTER);
			server.sendPacket({'type': 'PacketPokerTourneyRegister', 'serial': server.serial, 'game_id' : game_id});
			server.registerHandler(game_id, function(server, game_id, packet) {
				if (packet.type == 'PacketPokerTourneyRegister') {
				    server.notifyUpdate(packet);
				    server.queueRunning(function() {
					    if (server.timers.tourneyDetails !== undefined) {
						server.timers.tourneyDetails.request();
                                            }
					});
				    server.setState(server.RUNNING, 'PacketPokerTourneyRegister');
				    return false;
				}
				return true;
			    });
			server.registerHandler(0, function(server, unused_game_id, packet) {
				if ((packet.type == 'PacketError') && (packet.subpacket == jpoker.packetName2Type.PACKET_POKER_TOURNEY_REGISTER)) {
				    var code2message = {
					1:_("Tournament {game_id} does not exist"),
					2:_("Player {serial} already registered in tournament {game_id}"),
					3:_("Registration refused in tournament {game_id}"),
					4:_("Not enough money to enter the tournament {game_id}")};
				    if (code2message[packet.code] !== undefined) {
					packet.message = code2message[packet.code].supplant({game_id: game_id, serial: server.serial});
                                    }
				    jpoker.dialog(packet.message);
				    server.notifyUpdate(packet);
				    server.setState(server.RUNNING, 'PacketError');
				    return false;
				}
				return true;
			    });
		    });
	    },

	    tourneyUnregister: function(game_id) {
		this.queueRunning(function(server) {
			server.setState(server.TOURNEY_REGISTER);
			server.sendPacket({'type': 'PacketPokerTourneyUnregister', 'serial': server.serial, 'game_id' : game_id});
			server.registerHandler(game_id, function(server, game_id, packet) {
				if (packet.type == 'PacketPokerTourneyUnregister') {
				    server.notifyUpdate(packet);
				    server.queueRunning(function() {
					    if (server.timers.tourneyDetails !== undefined) {
						server.timers.tourneyDetails.request();
                                            }
					});
				    server.setState(server.RUNNING, 'PacketPokerTourneyUnregister');
				    return false;
				}
				return true;
			    });
			server.registerHandler(0, function(server, unused_game_id, packet) {
				if ((packet.type == 'PacketError') && (packet.subpacket == jpoker.packetName2Type.PACKET_POKER_TOURNEY_UNREGISTER)) {
				    var code2message = {
					1: _("Tournament {game_id} does not exist"),
					2: _("Player {serial} is not registered in tournament {game_id}"),
					3: _("It is too late to unregister player {serial} from tournament {game_id}")};
				    if (code2message[packet.code] !== undefined) {
					packet.message = code2message[packet.code].supplant({game_id: game_id, serial: server.serial});
                                    }
				    jpoker.dialog(_(packet.message));
				    server.notifyUpdate(packet);
				    server.setState(server.RUNNING, 'PacketError');
				    return false;
				}
				return true;
			    });
		    });
	    },
	    
	    getPersonalInfo : function() {
		if (this.loggedIn())  {
		    this.queueRunning(function(server) {
			    server.setState(server.PERSONAL_INFO);
			    server.sendPacket({'type': 'PacketPokerGetPersonalInfo', 'serial': server.serial});
			    server.registerHandler(0, function(server, unused_game_id, packet) {
				    if (packet.type == 'PacketPokerPersonalInfo') {
					server.notifyUpdate(packet);
					server.setState(server.RUNNING, 'PacketPokerPersonalInfo');
					return false;
				    }
				    return true;
				});
			});
		} else {
		    jpoker.dialog(_("User must be logged in"));
		}
	    },

	    setPersonalInfo : function(info) {
		this.queueRunning(function(server) {
			server.setState(server.PERSONAL_INFO);
			var personalInfoDefaults = {
			  'type' : 'PacketPokerSetAccount',
			  'serial': server.serial,
			  'name': server.userInfo.name,
			  'password': ''
			};
			server.sendPacket($.extend(info, personalInfoDefaults));
			server.registerHandler(0, function(server, unused_game_id, packet) {
				if (packet.type == 'PacketPokerPersonalInfo') {
				    packet.set_account = true;
				    server.notifyUpdate(packet);
				    server.setState(server.RUNNING, 'PacketPokerPersonalInfo');
				    return false;
				}
				else if (packet.type == 'PacketError') {
				    jpoker.dialog(packet.message);
				    server.notifyUpdate(packet);
				    server.setState(server.RUNNING, 'PacketError');
				}
				return true;
			    });
		    });
	    },

	    selectTables : function(string) {
		this.queueRunning(function(server) {
			server.setState(server.TABLE_LIST);
			server.sendPacket({'type': 'PacketPokerTableSelect', 'string': string});
			server.registerHandler(0, function(server, unused_game_id, packet) {
				if (packet.type == 'PacketPokerTableList') {
				    server.notifyUpdate(packet);
				    server.setState(server.RUNNING, 'PacketPokerTableList');
				    return false;
				}
				return true;
			    });
		    });		
	    }
        });

    //
    // table
    //
    jpoker.table = function(server, packet) {
        $.extend(this, jpoker.table.defaults, packet);
	if (packet.betting_structure) {
	    this.is_tourney = packet.betting_structure.search(/^level-/) === 0;
	} else {
	    this.is_tourney = false;
	}
        this.url = server.url;
        this.init();
        server.registerHandler(packet.id, this.handler);
    };

    jpoker.table.defaults = {
    };

    jpoker.table.prototype = $.extend({}, jpoker.watchable.prototype, {
            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.reset();
            },

            uninit: function() {
                jpoker.watchable.prototype.uninit.call(this);
                for(var serial in this.serial2player) {
                    this.serial2player[serial].uninit();
                }
                this.reset();
            },

            reinit: function(table) {
                if(table) {
                    $.extend(this, jpoker.table.defaults, table);
                }
                for(var serial in this.serial2player) {
                    this.serial2player[serial].uninit();
                }
                this.reset();
                this.notifyReinit(table);
            },

            reset: function() {
                this.serial2player = {};
                this.seats = [ null, null, null, null, null, 
                               null, null, null, null, null ];
                this.board = [ null, null, null, null, null ];
                this.pots = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
                this.buyIn = { min: 1000000000, max: 1000000000, best: 1000000000, bankroll: 0 };
                this.dealer = -1;
                this.position = -1;
                this.state = 'end';
            },

            buyInLimits: function() {
                var max = Math.min(this.buyIn.max, this.buyIn.bankroll);
                var min = Math.min(this.buyIn.min, this.buyIn.bankroll);
                var best = Math.min(this.buyIn.best, this.buyIn.bankroll);
                return [ min, best, max ];
            },

            handler: function(server, game_id, packet) {
                if(jpoker.verbose > 0) {
                    jpoker.message('table.handler ' + JSON.stringify(packet));
                }
                
                table = server.tables[packet.game_id];
                if(!table) {
                    jpoker.message('unknown table ' + packet.game_id);
                    return true;
                }
                var url = server.url;
                var serial = packet.serial;

                switch(packet.type) {

                case 'PacketPokerBatchMode':
                    break;

                case 'PacketPokerStreamMode':
                    server.setState(server.RUNNING, 'PacketPokerStreamMode');
                    break;

                case 'PacketPokerTableDestroy':
                    table.uninit();
                    delete server.tables[game_id];
                    break;

                case 'PacketPokerPlayerArrive':
                    if(server.loggedIn() && packet.serial == server.serial) {
                        table.serial2player[serial] = new jpoker.playerSelf(server, packet);
                    } else {
                        table.serial2player[serial] = new jpoker.player(server, packet);
                    }
                    table.seats[packet.seat] = serial;
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerPlayerLeave':
                    table.notifyUpdate(packet);
                    table.seats[packet.seat] = null;
                    table.serial2player[serial].uninit();
                    delete table.serial2player[serial];
                    break;

                case 'PacketPokerBoardCards':
                    for(var i = 0; i < packet.cards.length; i++) {
                        table.board[i] = packet.cards[i];
                    }
                    for(var j = packet.cards.length; j < table.board.length; j++) {
                        table.board[j] = null;
                    }
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerPotChips':
                    table.pots[packet.index] = jpoker.chips.chips2value(packet.bet);
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerChipsPotReset':
                    table.pots = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerState':
                    table.state = packet.string;
                    break;

                case 'PacketPokerDealer':
                    table.dealer = packet.dealer;
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerPosition':
                    table.serial_in_position = packet.serial;
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerBetLimit':
                    table.betLimit = {
                        min: packet.min / 100,
                        max: packet.max / 100,
                        step: packet.step / 100,
                        call: packet.call / 100,
                        allin: packet.allin / 100,
                        pot: packet.pot / 100
                    };
                    break;

                case 'PacketPokerSelfLostPosition': 
                    // use serial for dispatching because the serial of the 
                    // player in position is not used
                    serial = server.serial;
                    packet.serial = serial;
                    break;

                case 'PacketPokerBuyInLimits':
                    table.buyIn = {
                        min: packet.min / 100,
                        max: packet.max / 100,
                        best: packet.best / 100,
                        rebuy_min: packet.rebuy_min / 100
                    };
                    table.buyIn.bankroll = server.bankroll(table.currency_serial);
                    break;

                case 'PacketPokerUserInfo':
                    table.buyIn.bankroll = server.bankroll(table.currency_serial);
                    break;

                case 'PacketPokerChat':
                    table.notifyUpdate(packet);
                    break;

		case 'PacketPokerTimeoutWarning':
		    table.notifyUpdate(packet);
		    break;

		case 'PacketPokerTimeoutNotice':
		    table.notifyUpdate(packet);
		    break;
                }

                if(serial in table.serial2player) {
                    table.serial2player[serial].handler(server, game_id, packet);
                }

                return true;
            }
        });

    //
    // player
    //

    jpoker.player = function(server, packet) {
        $.extend(this, jpoker.player.defaults, packet);
        this.url = server.url;
        this.init();
    };

    jpoker.player.defaults = {
    };

    jpoker.player.prototype = $.extend({}, jpoker.watchable.prototype, {
            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.reset();
            },

            uninit: function() {
                jpoker.watchable.prototype.uninit.call(this);
                this.reset();
            },
            
            reinit: function(player) {
                if(player) {
                    $.extend(this, jpoker.player.defaults, player);
                }
                this.reset();
                this.notifyReinit(player);
            },
            
            reset: function() {
                this.cards = [ null, null, null, null, null, null, null ];
                this.money = 0;
                this.bet = 0;
                this.sit = false;
            },

            handler: function(server, game_id, packet) {
                if(jpoker.verbose > 0) {
                    jpoker.message('player.handler ' + JSON.stringify(packet));
                }

                switch(packet.type) {

                case 'PacketPokerPlayerCards':
                for(var i = 0; i < packet.cards.length; i++) {
                    this.cards[i] = packet.cards[i];
                }
                for(var j = packet.cards.length; j < this.cards.length; j++) {
                    this.cards[j] = null;
                }
                this.notifyUpdate(packet);
                break;

                case 'PacketPokerPlayerChips':
                this.money = packet.money / 100;
                this.bet = packet.bet / 100;
                this.notifyUpdate(packet);
                break;

                case 'PacketPokerSit':
                this.sit = true;
                this.notifyUpdate(packet);
                break;

                case 'PacketPokerSitOut':
                this.sit = false;
                this.notifyUpdate(packet);
                break;

                case 'PacketPokerAutoFold':
                this.sit = false;
                this.notifyUpdate(packet);
                break;

                }
            }    

        });

    //
    // player that is logged in
    //

    jpoker.playerSelf = function(server, packet) {
        $.extend(this, jpoker.playerSelf.defaults, packet);
        this.url = server.url;
        this.init();
    };

    jpoker.playerSelf.defaults = {
    };

    jpoker.playerSelf.prototype = $.extend({}, jpoker.player.prototype, {
            init: function() {
                jpoker.player.prototype.init.call(this);
                this.state = 'buyin';
            },

            uninit: function() {
                jpoker.player.prototype.uninit.call(this);
            },
            
            handler: function(server, game_id, packet) {
                jpoker.player.prototype.handler.call(this, server, game_id, packet);

                if(jpoker.verbose > 0) {
                    jpoker.message('playerSelf.handler ' + JSON.stringify(packet));
                }

                switch(packet.type) {
                case 'PacketPokerPlayerChips':
                if(packet.money > 0 && this.state == 'buyin') {
                    this.state = 'playing';
                }
                break;

                case 'PacketPokerSelfLostPosition':
                case 'PacketPokerSelfInPosition':
                this.notifyUpdate(packet);
                break;

                }
            }    

        });
    //
    // Refresh data with the 'handler' function after sending
    // a packet to the 'url' poker server with the 'request' function.
    //
    jpoker.refresh = function(server, request, handler, state, options) {

        var opts = $.extend({}, this.refresh.defaults, options);

        var waiting = false; // is there a refresh being served

        var timer = 0;

        var url = server.url;

        var callHandler = function(server, game_id, packet) {
            var status = handler(server, packet);
            if(status === false) {
                waiting = false;
                server.setState(server.RUNNING, 'refresh ' + state);
            }
            return status;
        };

        var sendRequest = function() {
            var server = jpoker.getServer(url);
            if(server && opts.requireSession === false || server.connected()) {
                if(!waiting) {
                    waiting = true;
                    server.queueRunning(function(server) {
                            server.setState(state, 'refresh');
                            request(server);
                            server.registerHandler(opts.game_id, callHandler, opts);
                        });
                } else if(jpoker.verbose > 0) {
                    jpoker.message('refresh waiting');
                } 
                return true;
            } else {
                opts.clearInterval(timer);
                timer = 0; // relevant for the first call (see below)
                return false;
            }
        };

        if(sendRequest() && opts.delay > 0) {
            timer = opts.setInterval(sendRequest, opts.delay);
        }

        return { timer: timer, request: sendRequest };
    };

    jpoker.refresh.defaults = {
        delay: 120000,
        game_id: 0,
        requireSession: false,

        setInterval: function(cb, delay) { return window.setInterval(cb, delay); },
        clearInterval: function(id) { return window.clearInterval(id); }
    };

    //
    // jQuery plugin container (must only contain jQuery plugins)
    //
    jpoker.plugins = {};

    //
    // tableList
    //
    jpoker.plugins.tableList = function(url, options) {

        var tableList = jpoker.plugins.tableList;
        var opts = $.extend({}, tableList.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<table class=\'jpoker_table_list\' id=\'' + id + '\'></table>');

                var updated = function(server, what, packet) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(packet && packet.type == 'PacketPokerTableList') {
                            $(element).html(tableList.getHTML(id, packet));
                            for(var i = 0; i < packet.packets.length; i++) {
                                (function(){
                                    var subpacket = packet.packets[i];
                                    $('#' + subpacket.id).click(function() {
                                            var server = jpoker.getServer(url);
                                            if(server) {
						server.tableJoin(subpacket.game_id);
                                            }
                                        }).hover(function(){
                                                $(this).addClass('hover');
                                            },function(){
                                                $(this).removeClass('hover');
                                            });
                                })();
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated, null, 'tableList' + id);

                server.refreshTables(opts.string, options);
                return this;
            });
    };

    jpoker.plugins.tableList.defaults = $.extend({
        string: ''
        }, jpoker.refresh.defaults, jpoker.defaults);

    jpoker.plugins.tableList.getHTML = function(id, packet) {
        var t = this.templates;
        var html = [];
        html.push(t.header.supplant({
                        'seats': _("Seats"),
                        'average_pot': _("Average Pot"),
                        'hands_per_hour': _("Hands/Hour"),
                        'percent_flop': _("%Flop"),
                        'players': _("Players"),
                        'observers': _("Observers"),
                        'waiting': _("Waiting"),
                        'player_timeout': _("Timeout"),
                        'currency_serial': _("Currency"),
                        'name': _("Name"),
                        'variant': _("Variant"),
                        'betting_structure': _("Betting Structure"),
                        'skin': _("Skin")
                        }));
        for(var i = 0; i < packet.packets.length; i++) {
            var subpacket = packet.packets[i];
            if(!('game_id' in subpacket)) {
                subpacket.game_id = subpacket.id;
                subpacket.id = subpacket.game_id + id;
                subpacket.average_pot /= 100;
            }
            subpacket['class'] = i%2 ? 'evenRow' : 'oddRow';
            html.push(t.rows.supplant(subpacket));
        }
        html.push(t.footer);
        return html.join('\n');
    };

    jpoker.plugins.tableList.templates = {
        header : '<thead><tr><td>{name}</td><td>{players}</td><td>{seats}</td><td>{betting_structure}</td><td>{average_pot}</td><td>{hands_per_hour}</td><td>{percent_flop}</td></tr></thead><tbody>',
        rows : '<tr class=\'{class}\' id=\'{id}\' title=\'' + _("Click to join the table") + '\'><td>{name}</td><td>{players}</td><td>{seats}</td><td>{betting_structure}</td><td>{average_pot}</td><td>{hands_per_hour}</td><td>{percent_flop}</td></tr>',
        footer : '</tbody>'
    };

    //
    // regularTourneyList
    //
    jpoker.plugins.regularTourneyList = function(url, options) {

        var regularTourneyList = jpoker.plugins.regularTourneyList;
        var opts = $.extend({}, regularTourneyList.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();
		
                $this.append('<table class=\'jpoker_regular_tourney_list\' id=\'' + id + '\'></table>');

                var updated = function(server, what, packet) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(packet && packet.type == 'PacketPokerTourneyList') {
                            $(element).html(regularTourneyList.getHTML(id, packet));
			    $(element).tablesorter({widgets: ['zebra'], sortList: [[4, 0]]});
                            for(var i = 0; i < packet.packets.length; i++) {
                                (function(){
                                    var subpacket = packet.packets[i];
                                    $('#' + subpacket.id).click(function() {
                                            var server = jpoker.getServer(url);
                                            if(server) {
                                                server.tourneyRowClick(server, subpacket);
                                            }
                                        }).hover(function(){
                                                $(this).addClass('hover');
                                            },function(){
                                                $(this).removeClass('hover');
                                            });
                                })();
			    }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated, null, 'regularTourneyList' + id);

                server.refreshTourneys(opts.string, opts);
                return this;
            });
    };

    jpoker.plugins.regularTourneyList.defaults = $.extend({
        string: ''
        }, jpoker.refresh.defaults, jpoker.defaults);

    jpoker.plugins.regularTourneyList.getHTML = function(id, packet) {
        var t = this.templates;
        var html = [];
        html.push(t.header.supplant({
                        'players_quota': _("Players Quota"),
                        'breaks_first': _("Breaks First"),
                        'name': _("Name"),
                        'description_short': _("Description"),
                        'start_time': _("Start Time"),
                        'breaks_interval': _("Breaks Interval"),
                        'variant': _("Holdem"),
                        'currency_serial': _("Currency"),
                        'state': _("State"),
                        'buy_in': _("Buy In"),
                        'breaks_duration': _("Breaks Duration"),
                        'sit_n_go': _("Sit'n'Go"),
                        'registered': _("Registered")
                        }));
	var regularPackets = $.grep(packet.packets, function(p, i) {return p.sit_n_go == "n";});
        for(var i = 0; i < regularPackets.length; i++) {
            var subpacket = regularPackets[i];
            if(!('game_id' in subpacket)) {
                subpacket.game_id = subpacket.serial;
                subpacket.id = subpacket.game_id + id;
	    }
            html.push(t.rows.supplant(subpacket));
        }
        html.push(t.footer);
        return html.join('\n');
    };

    jpoker.plugins.regularTourneyList.templates = {
        header : '<thead><tr><th>{description_short}</th><th>{registered}</th><th>{players_quota}</th><th>{buy_in}</th><th>{start_time}</th></tr></thead><tbody>',
        rows : '<tr id=\'{id}\' title=\'' + _("Click to show tourney details") + '\'><td>{description_short}</td><td>{registered}</td><td>{players_quota}</td><td>{buy_in}</td><td>{start_time}</td></tr>',
        footer : '</tbody>'
    };

    //
    // sitngoTourneyList
    //
    jpoker.plugins.sitngoTourneyList = function(url, options) {

        var sitngoTourneyList = jpoker.plugins.sitngoTourneyList;
        var opts = $.extend({}, sitngoTourneyList.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<table class=\'jpoker_sitngo_tourney_list\' id=\'' + id + '\'></table>');

                var updated = function(server, what, packet) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(packet && packet.type == 'PacketPokerTourneyList') {
                            $(element).html(sitngoTourneyList.getHTML(id, packet));
			    $(element).tablesorter({widgets: ['zebra'], sortList: [[3, 0]]});
                            for(var i = 0; i < packet.packets.length; i++) {
                                (function(){
                                    var subpacket = packet.packets[i];
                                    $('#' + subpacket.id).click(function() {
                                            var server = jpoker.getServer(url);
                                            if(server) {
                                                server.tourneyRowClick(server, subpacket);
                                            }
                                        }).hover(function(){
                                                $(this).addClass('hover');
                                            },function(){
                                                $(this).removeClass('hover');
                                            });
                                })();
			    }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated, null, 'sitngoTourneyList' + id);

                server.refreshTourneys(opts.string, opts);
                return this;
            });
    };

    jpoker.plugins.sitngoTourneyList.defaults = $.extend({
        string: ''
        }, jpoker.refresh.defaults, jpoker.defaults);

    jpoker.plugins.sitngoTourneyList.getHTML = function(id, packet) {
        var t = this.templates;
        var html = [];
        html.push(t.header.supplant({
                        'players_quota': _("Players Quota"),
                        'breaks_first': _("Breaks First"),
                        'name': _("Name"),
                        'description_short': _("Description"),
                        'start_time': _("Start Time"),
                        'breaks_interval': _("Breaks Interval"),
                        'variant': _("Holdem"),
                        'currency_serial': _("Currency"),
                        'state': _("State"),
                        'buy_in': _("Buy In"),
                        'breaks_duration': _("Breaks Duration"),
                        'sit_n_go': _("Sit'n'Go"),
                        'registered': _("Registered")
                        }));
	var sitngoPackets = $.grep(packet.packets, function(p, i) {return p.sit_n_go == "y";});
        for(var i = 0; i < sitngoPackets.length; i++) {
            var subpacket = sitngoPackets[i];
            if(!('game_id' in subpacket)) {
                subpacket.game_id = subpacket.serial;
                subpacket.id = subpacket.game_id + id;
                subpacket.buy_in /= 100;
	    }
            html.push(t.rows.supplant(subpacket));
        }
        html.push(t.footer);
        return html.join('\n');
    };

    jpoker.plugins.sitngoTourneyList.templates = {
        header : '<thead><tr><th>{description_short}</th><th>{registered}</th><th>{players_quota}</th><th>{buy_in}</th></tr></thead><tbody>',
        rows : '<tr id=\'{id}\' title=\'' + _("Click to show tourney details") + '\'><td>{description_short}</td><td>{registered}</td><td>{players_quota}</td><td>{buy_in}</td></tr>',
        footer : '</tbody>'
    };

    //
    // tourneyDetails
    //
    jpoker.plugins.tourneyDetails = function(url, game_id, name, options) {

	game_id = parseInt(game_id, 10);
	
        var tourneyDetails = jpoker.plugins.tourneyDetails;
        var opts = $.extend({}, tourneyDetails.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<div class=\'jpoker_tourney_details\' id=\'' + id + '\'></div>');

                var updated = function(server, what, packet) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(packet && packet.type == 'PacketPokerTourneyManager') {
			    var logged = server.loggedIn();
			    var registered = packet.user2properties['X'+server.serial.toString()] !== undefined;
			    $.each(packet.user2properties, function(serial, player) {
				    if (player.money != -1) {
					player.money /= 100;
				    }
				});
			    if (packet.tourney.rank2prize) {
				$.each(packet.tourney.rank2prize, function(i, prize) {
					packet.tourney.rank2prize[i] /= 100;
				    });
			    }
                            $(element).html(tourneyDetails.getHTML(id, packet, logged, registered));
			    $(".jpoker_tourney_details_table", element).click(function() {
				    $(".jpoker_tourney_details_table_details", element).html(tourneyDetails.getHTMLTableDetails(id, packet, $(this).attr("id")));
				}).hover(function(){
					$(this).addClass('hover');
				    },function(){
					$(this).removeClass('hover');
				    });
			    if(logged) {
				var input = $('.jpoker_tourney_details_register input', element);
				if (registered) {
				    input.click(function() {
					    server.tourneyUnregister(game_id);
					});
				} else {
				    input.click(function() {
					    server.tourneyRegister(game_id);
					});
				}
			    }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated, null, 'tourneyDetails' + id);
                server.refreshTourneyDetails(game_id, opts);
                return this;
            });
    };

    jpoker.plugins.tourneyDetails.defaults = $.extend({
	}, jpoker.refresh.defaults, jpoker.defaults);

    jpoker.plugins.tourneyDetails.getHTML = function(id, packet, logged, registered) {
        var t = this.templates;
        var html = [];

	html.push(t.info.supplant({
		        'registered' : _("{registered} players registered."),
			'players_quota' : _("{players_quota} players max.")
			    }).supplant(packet.tourney));

        html.push(t.players.header.supplant({
		        'name': _("Name"),
			'money': _("Money"),
			'rank' : _("Rank")    
                        }));
        for(var serial in packet.user2properties) {
	    var player = packet.user2properties[serial];
	    if (player.rank == -1) {
		player.rank = "";
	    }
	    if (player.money == -1) {
		player.money = "";
	    }
            html.push(t.players.rows.supplant(player));
        }
        html.push(t.players.footer);

	if (logged) {
	    if (registered) {
		html.push(t.register.supplant({'register': _("Unregister")}));
	    } else {
		html.push(t.register.supplant({'register': _("Register")}));
	    }
	}

	if (packet.tourney.state == "running" || packet.tourney.state == "complete") {
	    html.push(t.prizes.header.supplant({
			'rank': _("Rank"),
			'prize': _("Prize")
		    }));
	    if (packet.tourney.rank2prize) {
		$.each(packet.tourney.rank2prize, function(rank, prize) {
			html.push(t.prizes.rows.supplant({
				    'rank': rank+1,
				    'prize': prize
					}));
		    });
	    }			    
	    html.push(t.prizes.footer);
	}
	if (packet.tourney.state == "running") {
	    html.push(t.tables.header.supplant({
			'table': _("Table"),
			'players': _("Players"),
			'max_money': _("Max money"),
			'min_money': _("Min money")
		    }));
	    $.each(packet.table2serials, function(table, players) {
		    var row = {
			id: table,
			table: table.substr(1),
			players: players.length,
			min_money: "",
			max_money: ""};
		    var moneys = $.map(players, function(player) {
			    return packet.user2properties['X'+player.toString()].money;
			}).sort();
		    if (moneys.length >= 2) {
			row.min_money = moneys[0];
			row.max_money = moneys[moneys.length - 1];
		    }
		    html.push(t.tables.rows.supplant(row));
		});
	    html.push(t.tables.footer);
	}	

	html.push(t.table_details);
        return html.join('\n');
    };

    jpoker.plugins.tourneyDetails.getHTMLTableDetails = function(id, packet, table) {
        var t = this.templates;
        var html = [];
	html.push(t.table_players.header.supplant({
		        player: _("Player"),
			money: _("Money")
			}));
	var players = packet.table2serials[table];
	$.each(players, function(i, serial) {
		var player = packet.user2properties['X'+serial];
		html.push(t.table_players.rows.supplant(player));
	    });
	html.push(t.table_players.footer);
	return html.join('\n');
    };

    jpoker.plugins.tourneyDetails.templates = {
	info: '<div class=\'jpoker_tourney_details_info\'><div class=\'jpoker_tourney_details_info_description\'>{description_long}</div><div class=\'jpoker_tourney_details_info_registered\'>{registered}</div><div class=\'jpoker_tourney_details_info_players_quota\'>{players_quota}</div></div>',
	players : {
	    header : '<div class=\'jpoker_tourney_details_players\'><table><thead><tr><th>{name}</th><th>{money}</th><th>{rank}</th></tr></thead><tbody>',
	    rows : '<tr><td>{name}</td><td>{money}</td><td>{rank}</td></tr>',
	    footer : '</tbody></table></div>'
	},
	tables : {
	    header : '<div class=\'jpoker_tourney_details_tables\'><table><thead><tr><th>{table}</th><th>{players}</th><th>{max_money}</th><th>{min_money}</th></tr></thead><tbody>',
	    rows : '<tr id=\'{id}\' class=\'jpoker_tourney_details_table\' title=\'' + _("Click to show table details") + '\'><td>{table}</td><td>{players}</td><td>{max_money}</td><td>{min_money}</td></tr>',
	    footer : '</tbody></table></div>'
	},
	table_players : {
	    header : '<div class=\'jpoker_tourney_details_table_players\'><table><thead><tr><th>{player}</th><th>{money}</th></tr></thead><tbody>',
	    rows : '<tr><td>{name}</td><td>{money}</td></tr>',
	    footer : '</tbody></table></div>'
	},
	prizes : {
	    header : '<div class=\'jpoker_tourney_details_prizes\'><table><thead><tr><th>{rank}</th><th>{prize}</th></tr></thead><tbody>',
	    rows : '<tr><td>{rank}</td><td>{prize}</td></tr>',
	    footer : '</tbody></table></div>'
	},
	register : '<div class=\'jpoker_tourney_details_register\'><input type=\'submit\' value=\'{register}\'></div>',
	table_details : '<div class=\'jpoker_tourney_details_table_details\'>'
    };

    //
    // serverStatus
    //
    jpoker.plugins.serverStatus = function(url, options) {

        var serverStatus = jpoker.plugins.serverStatus;
        var opts = $.extend({}, serverStatus.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<div class=\'jpoker_server_status\' id=\'' + id + '\'></div>');

                var updated = function(server) {
                    var element = document.getElementById(id);
                    if(element) {
                        $(element).html(serverStatus.getHTML(server));
                        return true;
                    } else {
                        return false;
                    }
                };

                if(updated(server)) {
                    server.registerUpdate(updated, null, 'serverStatus ' + id);
                }

                return this;
            });
    };

    jpoker.plugins.serverStatus.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.serverStatus.getHTML = function(server) {
        var t = this.templates;
	var html = [];
	
	if(server.connected()) {
	    html.push(t.connected);
	} else {
	    html.push(t.disconnected.supplant({ 'label': _("disconnected") }));
	}
	if(server.playersCount) {
	    html.push(t.players.supplant({ 'count': server.playersCount, 'players': _("players") }));
	}
	if(server.tablesCount) {
	    html.push(t.tables.supplant({ 'count': server.tablesCount, 'tables': _("tables") }));
	}
	if(server.playersTourneysCount) {
	    html.push(t.players_tourneys.supplant({ 'count': server.playersTourneysCount, 'players_tourneys': _("tournaments players") }));
	}
	if(server.tourneysCount) {
	    html.push(t.tourneys.supplant({ 'count': server.tourneysCount, 'tourneys': _("tourneys") }));
	}
        return html.join(' ');
    };

    jpoker.plugins.serverStatus.templates = {
	disconnected: '<div class=\'jpoker_server_status_disconnected\'> {label} </div>',
	connected: '<div class=\'jpoker_server_status_connected\'></div>',
        players: '<div class=\'jpoker_server_status_players\'> <div class=\'jpoker_server_status_players_count\'>{count}</div> <div class=\'jpoker_server_status_players_label\'>{players}</div> </div>',
        tables: '<div class=\'jpoker_server_status_tables\'> <div class=\'jpoker_server_status_tables_count\'>{count}</div> <div class=\'jpoker_server_status_tables_label\'>{tables}</div> </div>',

        players_tourneys: '<div class=\'jpoker_server_status_players_tourneys\'> <div class=\'jpoker_server_status_players_tourneys_count\'>{count}</div> <div class=\'jpoker_server_status_players_tourneys_label\'>{players_tourneys}</div> </div>',

        tourneys: '<div class=\'jpoker_server_status_tourneys\'> <div class=\'jpoker_server_status_tourneys_count\'>{count}</div> <div class=\'jpoker_server_status_tourneys_label\'>{tourneys}</div> </div>'
    };

    //
    // login
    //
    jpoker.plugins.login = function(url, options) {
 
        var login = jpoker.plugins.login;
        var opts = $.extend({}, jpoker.plugins.login.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<div class=\'jpoker_login\' id=\'' + id + '\'></div>');

                var updated = function(server) {
                    var element = document.getElementById(id);
                    if(element) {
                        var e = $(element);
                        e.html(login.getHTML(server));
                        if(server.loggedIn()) {
                            e.click(function() {
                                    var server = jpoker.getServer(url);
                                    if(server && server.loggedIn()) {
                                        server.logout();
                                    }
                                });
                        } else {
                            var action = function() {
                                var name = $('.jpoker_login_name', e).attr('value');
                                var password = $('.jpoker_login_password', e).attr('value');
                                if(!name) {
                                    jpoker.dialog(_("the user name must not be empty"));
                                } else if(!password) {
                                    jpoker.dialog(_("the password must not be empty"));
                                } else {
                                    var server = jpoker.getServer(url);
                                    if(server) {
                                        server.login(name, password);
                                        $('#' + id).html('<div class=\'jpoker_login_progress\'>' + _("login in progress") + '</a>');
                                    }
                                }
                            };
                            $('.jpoker_login_submit, .jpoker_login_signup', e).click(action);
                            e.unbind('keypress'); // prevent accumulation of handlers 
                            e.keypress(function(event) {
                                    if(event.which == 13) {
                                        action.call(this);
                                    }
                                });
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                if(updated(server)) {
                    server.registerUpdate(updated, null, 'login ' + id);
                }

                return this;
            });
    };

    jpoker.plugins.login.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.login.getHTML = function(server) {
        var t = this.templates;
	var html = [];
	if(server.loggedIn()) {
	    html.push(t.logout.supplant({ 'logout': _("{logname} logout").supplant({ 'logname': server.userInfo.name }) }));
	} else {
	    html.push(t.login.supplant({ 'login': _("user: "),
                                         'password': _("password: "),
                                         'signup': _("Sign Up"),
                                         'go': _("Login")
                    }));
	}
        return html.join('\n');
    };

    jpoker.plugins.login.templates = {
	login: '<table>\n<tbody><tr>\n<td class=\'jpoker_login_name_label\'><b>{login}</b></td>\n<td><input type=\'text\' class=\'jpoker_login_name\' size=\'10\'/></td>\n<td><input type=\'submit\' class=\'jpoker_login_submit\' value=\'{go}\' /></td>\n</tr>\n<tr>\n<td class=\'jpoker_login_name_label\'><b>{password}</b></td>\n<td><input type=\'password\' class=\'jpoker_login_password\' size=\'10\'/></td>\n<td><input type=\'submit\' class=\'jpoker_login_signup\' value=\'{signup}\' /></td>\n</tr>\n</tbody></table>',
	logout: '<div class=\'jpoker_logout\'>{logout}<div>'
    };

    //
    // featured table
    //
    jpoker.plugins.featuredTable = function(url, options) {

        var opts = $.extend({}, jpoker.plugins.featuredTable.defaults, options);
        var server = jpoker.url2server({ url: url });

	server.registerUpdate(function(server, what, packet) {
		if (packet && packet.type == 'PacketPokerTableList') {
		    if (packet.packets.length === 0) {
			var updated = function(server, what, packet) {
			    if(packet && packet.type == 'PacketPokerTableList') {
				var found = null;
				for(var i = packet.packets.length - 1; i >= 0 ; i--) {
				    var subpacket = packet.packets[i];
				    if(opts.compare(found, subpacket) >= 0) {
					found = subpacket;
				    }
				}
				if(found) {
				    found.game_id = found.id;
				    server.setTimeout(function() { server.tableJoin(found.game_id); }, 1);
				}
				return false;
			    } else {
				return true;
			    }
			};
			server.registerUpdate(updated, null, 'featuredTable ' + url);
			server.selectTables(opts.string);
		    }
		    return false;
		} else {
		    return true;
		}		
	    }, null, 'featuredTable ' + url);
        server.selectTables('my');
        return this;
    };

    jpoker.plugins.featuredTable.defaults = {
        string: '',
        compare: function(a, b) { return a && b && b.players - a.players; }
    };

    //
    // decoration divs to help CSS skining
    //
    $.fn.extend({
            frame: function(css) {
                var box = '';
                var positions = [ 'n', 's', 'w', 'e', 'se', 'sw', 'nw', 'ne' ];
                for(var i = 0; i < positions.length; i++) {
                    box += '<div style=\'position: absolute\' class=\'' + css + ' ' + css + '-' + positions[i] + '\'></div>';
                }
                var toggle = function() { $(this).toggleClass(css + '-hover'); };

                return this.each(function() {
                        var $this = $(this);
                        $this.wrap('<div style=\'position: relative\' class=\'' + css + ' ' + css + '-container\'></div>');
                        $this.before(box);
                        $this.parent().hover(toggle, toggle);
                        return this;
                    });
            }
        });

    //
    // table
    //
    jpoker.plugins.table = function(url, game_id, name, options) {

        var opts = $.extend({}, jpoker.plugins.table.defaults, options);
        var server = jpoker.url2server({ url: url });

        game_id = parseInt(game_id, 10);

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<span class=\'jpoker_table\' id=\'' + id + '\'><div class=\'jpoker_connecting\'><div class=\'jpoker_connecting_message\'>' + _("connecting to table {name}").supplant({ 'name': name }) + '</div><div class=\'jpoker_connecting_image\'></div></div></span>');
                	       
		if(game_id in server.tables) {
		    var element = document.getElementById(id);
		    jpoker.plugins.table.create($(element), id, server, game_id);
		}

                return this;
            });
    };

    jpoker.plugins.table.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.table.create = function(element, id, server, game_id) {
        if(jpoker.verbose > 0) {
            jpoker.message('plugins.table.create ' + id + ' game: ' + game_id);
        }
        if(game_id in server.tables) {
            var url = server.url;
            var table = server.tables[game_id];
            element.html(this.templates.room.supplant({ id: id }));
            jpoker.plugins.table.seats(id, server, table);
            jpoker.plugins.table.dealer(id, table, table.dealer);
            jpoker.plugins.cards.update(table.board, 'board', id);
            for(var pot = 0; pot < table.pots.length; pot++) {
                $('#pot' + pot + id).addClass('jpoker_pot');
                jpoker.plugins.chips.update(table.pots[pot], '#pot' + pot + id);
            }
            for(var winner = 0; winner < 2; winner++) {
                $('#winner' + winner + id).hide();
            }
            $('#switch' + id).hide();
            $('#rebuy' + id).hide();
            $('#sitout' + id).hide();
            $('#muck' + id).hide();
            $('#quit' + id).click(function() {
                    var server = jpoker.getServer(url);
                    var table = jpoker.getTable(url, game_id);
                    if(server) {
                        server.sendPacket({ type: 'PacketPokerTableQuit', game_id: game_id });
                        server.setTimeout(function() {
                                table.handler(server, game_id, { type: 'PacketPokerTableDestroy',
                                            game_id: game_id });
                            }, 1);
                    }
                });
            $('#chat' + id).html('<input value=\'chat here\' type=\'text\' width=\'100%\' />').hide();
            jpoker.plugins.playerSelf.hide(id);
            for(var serial in table.serial2player) {
                jpoker.plugins.player.create(table, table.serial2player[serial], id);
            }
            jpoker.plugins.table.position(id, table, table.serial_in_position);
	    jpoker.plugins.table.timeout(id, table, table.serial_in_position);
            if($('#jpokerSound').size() === 0) {
                $('body').prepend('<div id=\'jpokerSound\' />');
            }
            // it does not matter to register twice as long as the same key is used
            // because the second registration will override the first
            table.registerUpdate(this.update, id, 'table update' + id);
            table.registerDestroy(this.destroy, id, 'table destroy' + id);
            table.registerReinit(this.reinit, id, 'table reinit' + id);
        }
    };

    jpoker.plugins.table.seats = function(id, server, table) {
        for(var seat = 0; seat < table.seats.length; seat++) {
            jpoker.plugins.player.seat(seat, id, server, table);
        }
    };

    jpoker.plugins.table.dealer = function(id, table, dealer) {
        for(var seat = 0; seat < table.seats.length; seat++) {
            if(seat == dealer) {
                $('#dealer' + seat + id).show();
            } else {
                $('#dealer' + seat + id).hide();
            }
        }
    };

    jpoker.plugins.table.position = function(id, table, serial_in_position) {
        var in_position = table.serial2player[serial_in_position];
        for(var seat = 0; seat < table.seats.length; seat++) {
            var seat_element = $('#player_seat' + seat + id);
            if(in_position && in_position.sit === true && in_position.seat == seat) {
                if(!seat_element.hasClass('jpoker_position')) {
                    seat_element.addClass('jpoker_position');
                }
            } else {
                if(seat_element.hasClass('jpoker_position')) {
                    seat_element.removeClass('jpoker_position');
                }
            }
        }
    };

    jpoker.plugins.table.timeout = function(id, table, serial_in_position, ratio) {
        var in_position = table.serial2player[serial_in_position];
        for(var seat = 0; seat < table.seats.length; seat++) {
            var seat_element = $('#player_seat' + seat + id);
            if(in_position && in_position.sit === true && in_position.seat == seat) {
		$('#player_seat' + seat + '_timeout' + id).progression({Current: 100*ratio, Animate: false});
		$('#player_seat' + seat + '_timeout' + id).show();
		$('#player_seat' + seat + '_timeout' + id).progression({Current: 0, AnimateTimeOut: table.player_timeout*1000, Animate: true});
            } else {
		$('#player_seat' + seat + '_timeout' + id).hide();
            }
        }
    };

    jpoker.plugins.table.serial = function(id, server, table, serial) {
        if(serial in table.serial2player) {
            //
            // if the player who logs in is already sit at the table, recreate all
            //
            this.destroy(table, null, id);
            var element = document.getElementById(id);
            if(element) {
                this.create($(element), id, server, table.id);
            }
        } else {
            this.seats(id, server, table);
        }
    };

    jpoker.plugins.table.update = function(table, what, packet, id) {
        var element = document.getElementById(id);
        var server = jpoker.getServer(table.url);
        var url = table.url;
        var game_id = packet.game_id;
        var serial = packet.serial;
        if(element && server) {
            switch(packet.type) {

            case 'PacketSerial':
                jpoker.plugins.table.serial(id, server, table, packet.serial);
                break;

            case 'PacketLogout':
                jpoker.plugins.table.seats(id, server, table);
                break;

            case 'PacketPokerPlayerArrive':
                jpoker.plugins.player.create(table, packet, id);
                break;

            case 'PacketPokerPlayerLeave':
                jpoker.plugins.player.leave(table, packet, id);
                break;

            case 'PacketPokerUserInfo':
                jpoker.plugins.playerSelf.rebuy(url, game_id, serial);		
                break;

            case 'PacketPokerBoardCards':
                jpoker.plugins.cards.update(table.board, 'board', id);
                break;

            case 'PacketPokerPotChips':
                jpoker.plugins.chips.update(table.pots[packet.index], '#pot' + packet.index + id);
                break;

            case 'PacketPokerChipsPotReset':
                for(var pot = 0; pot < table.pots.length; pot++) {
                    $('#pot' + pot + id).hide();
                }
                break;

            case 'PacketPokerDealer':
                jpoker.plugins.table.dealer(id, table, packet.dealer);
                break;

            case 'PacketPokerPosition':
                jpoker.plugins.table.position(id, table, packet.serial);
                jpoker.plugins.table.timeout(id, table, packet.serial, 1.0);
                break;	      

	    case 'PacketPokerTimeoutWarning':
                jpoker.plugins.table.timeout(id, table, packet.serial, 0.5);
		break;

	    case 'PacketPokerTimeoutNotice':
                jpoker.plugins.table.timeout(id, table, packet.serial, 0.0);
		break;

            case 'PacketPokerChat':
                var prefix = '';
                if(packet.serial in table.serial2player) {
                    prefix = table.serial2player[packet.serial].name + ' :';
                }
                var lines = packet.message.replace(/\n$/, '').split('\n');
                var chat = $('#chat_history' + id);
                for(var line = 0; line < lines.length; line++) {
                    chat.prepend('<div class=\'jpoker_chat_line\'><span class=\'jpoker_chat_prefix\'>' + prefix + '</span><span class=\'jpoker_chat_message\'>' + lines[line] + '</span></div>');
                }
                break;
            }

            return true;
        } else {
            return false;
        }
    };

    jpoker.plugins.table.destroy = function(table, what, dummy, id) {
        // it is enough to destroy the DOM elements, even for players
        jpoker.message('plugins.table.destroy ' + id + ' game: ' + table.game_id);
        $('#game_window' + id).remove();
        return false;
    };

    jpoker.plugins.table.reinit = function(table, what, packet, id) {
        jpoker.plugins.table.destroy(table, 'destroy', null, id);
        var element = document.getElementById(id);
        var server = jpoker.getServer(table.url);
        if(element && server) {
            jpoker.plugins.table.create($(element), id, server, table.id);
            return true;
        } else {
            return false;
        }
    };

    jpoker.plugins.table.templates = {
        room: 'expected to be overriden by mockup.js but was not'
    };

    //
    // player (table plugin helper)
    //
    jpoker.plugins.player = {
        create: function(table, packet, id) {
            var url = table.url;
            var game_id = table.id;
            var serial = packet.serial;
            var player = table.serial2player[serial];
            var seat = player.seat;
            var server = jpoker.getServer(url);
            jpoker.plugins.player.seat(seat, id, server, table);
            jpoker.plugins.cards.update(player.cards, 'card_seat' + player.seat, id);
            $('#player_seat' + seat + '_bet' + id).addClass('jpoker_bet');
            $('#player_seat' + seat  + '_money' + id).addClass('jpoker_money');
            var avatar_element = $('#player_seat' + seat  + '_avatar' + id);
	    if ((packet.url !== undefined) && (packet.url != 'random')) {
                avatar_element.removeClass().addClass('jpoker_avatar jpoker_ptable_player_seat' + seat + '_avatar ');
		avatar_element.css({
                            'background-image': 'url("' + packet.url + '")',
			    'display': 'block'
			    });
	    } else {
                var avatar = (seat + 1) + (10 * game_id % 2);
                avatar_element.removeClass().addClass('jpoker_avatar jpoker_ptable_player_seat' + seat + '_avatar jpoker_avatar_default_' + avatar);
		avatar_element.show();
	    }
	    var timeout_element = $('#player_seat' + seat  + '_timeout' + id);
	    timeout_element.removeClass().addClass('jpoker_timeout jpoker_ptable_player_seat' + seat + '_timeout');

            jpoker.plugins.player.chips(player, id);
            var name = $('#player_seat' + seat + '_name' + id);
            name.addClass('jpoker_name');
            name.html(player.name);
            if(server.serial == serial) {
                jpoker.plugins.playerSelf.create(table, packet, id);
            }
            if(player.sit) {
                jpoker.plugins.player.sit(player, id);
            } else {
                jpoker.plugins.player.sitOut(player, id);
            }
            $('#jpokerSound').html('<' + jpoker.sound + ' src=\'player_arrive.swf\' />');
            player.registerUpdate(this.update, id, 'update' + id);
            player.registerDestroy(this.destroy, id, 'destroy' + id);
        },

        leave: function(player, packet, id) {
            var server = jpoker.getServer(player.url);
            if(server.serial == packet.serial) {
                jpoker.plugins.playerSelf.leave(player, packet, id);
            }
        },

        update: function(player, what, packet, id) {
            switch(packet.type) {

            case 'PacketPokerSit':
            jpoker.plugins.player.sit(player, id);
            break;

            case 'PacketPokerSitOut':
            jpoker.plugins.player.sitOut(player, id);
            break;

            case 'PacketPokerAutoFold':
            jpoker.plugins.player.sitOut(player, id);
            break;

            case 'PacketPokerPlayerCards':
            jpoker.plugins.cards.update(player.cards, 'card_seat' + player.seat, id);
            break;

            case 'PacketPokerPlayerChips':
            jpoker.plugins.player.chips(player, id);
            break;

            case 'PacketPokerSelfInPosition':
            jpoker.plugins.playerSelf.inPosition(player, id);
            break;

            case 'PacketPokerSelfLostPosition':
            jpoker.plugins.playerSelf.lostPosition(player, packet, id);
            break;

            }
            return true;
        },
        
        sit: function(player, id) {
            var name = $('#player_seat' + player.seat + id);
            if(name.hasClass('jpoker_sit_out')) {
                name.removeClass('jpoker_sit_out');
            }
            if(jpoker.getServer(player.url).serial == player.serial) {
                jpoker.plugins.playerSelf.sit(player, id);
            }
        },

        sitOut: function(player, id) {
            var name = $('#player_seat' + player.seat + id);
            if(!name.hasClass('jpoker_sit_out')) {
                name.addClass('jpoker_sit_out');
            }
            if(jpoker.getServer(player.url).serial == player.serial) {
                jpoker.plugins.playerSelf.sitOut(player, id);
            }
        },

        chips: function(player, id) {
            jpoker.plugins.chips.update(player.money, '#player_seat' + player.seat + '_money' + id);
            jpoker.plugins.chips.update(player.bet, '#player_seat' + player.seat + '_bet' + id);
            if(jpoker.getServer(player.url).serial == player.serial) {
                jpoker.plugins.playerSelf.chips(player, id);
            }
        },

        seat: function(seat, id, server, table) {
            if(table.seats[seat] !== null) {
                $('#seat' + seat + id).show();
                $('#sit_seat' + seat + id).hide();
            } else {            
                $('#seat' + seat + id).hide();
                if(server.loggedIn()) {
                    var sit = $('#sit_seat' + seat + id);
                    sit.show();
                    sit.click(function() {
                            var server = jpoker.getServer(table.url);
                            if(server && server.loggedIn()) {
                                server.sendPacket({ 'type': 'PacketPokerSeat',
                                            'serial': server.serial,
                                            'game_id': table.id,
                                            'seat': seat
                                            });
                            }
                        });
                } else {
                    $('#sit_seat' + seat + id).hide();
                }
            }
        },

        destroy: function(player, what, dummy, id) {
            var server = jpoker.servers[player.url];
            var table = server.tables[player.game_id];
            jpoker.plugins.player.seat(player.seat, id, server, table);
            if(player.serial == server.serial) {
                jpoker.plugins.playerSelf.destroy(player, dummy, id);
            }
        }
    };

    //
    // player self (table plugin helper)
    //
    jpoker.plugins.playerSelf = {
        create: function(table, packet, id) {
            table.registerUpdate(this.updateTable, id, 'self update' + id);

            var url = table.url;
            var game_id = packet.game_id;
            var serial = packet.serial;
            var player = table.serial2player[serial];
            var names = [ 'check', 'call', 'raise', 'fold' ];
            var labels = [ _("check"), _("call"), _("raise"), _("fold") ];
            for(var i = 0; i < names.length; i++) {
                $('#' + names[i] + id).html('<div class=\'jpoker_button\'><a href=\'javascript://\'>' + labels[i] + '</a></div>');
            }
            //
            // rebuy
            //
            var rebuy = $('#rebuy' + id);
            rebuy.click(function() {
                    var server = jpoker.getServer(url);
                    if(server && server.loggedIn()) {
                        var element = jpoker.plugins.playerSelf.rebuy(url, game_id, serial);
                        if(element) {
                            element.dialog('open');
                            server.getUserInfo();
                        }
                    }
                });
            rebuy.show();

            //
            // sitout
            //
            $('#sitout' + id).html('<div class=\'jpoker_sitout\'><a href=\'javascript://\'>' + _("sit out") + '</a></div>');
            $('#sitout' + id).click(function() {
                    var server = jpoker.getServer(url);
                    if(server && server.loggedIn()) {
                        server.sendPacket({ 'type': 'PacketPokerSitOut',
                                    'game_id': table.id,
                                    'serial': serial });
                        $(this).hide();
                    }
                    return false;
                });
            //
            // chat
            //

            var chat = function() {
                var server = jpoker.getServer(url);
                if(server) {
                    var input = $('#chat' + id + ' input');
                    var message = input.attr('value').replace(/[\'\"]/g, '');
                    server.sendPacket({ 'type': 'PacketPokerChat',
                                'serial': server.serial,
                                'game_id': table.id,
                                'message': message
                                });
                    input.attr('value', ' ');
                }
            };
            $('#chat' + id).unbind('keypress').keypress(function(e) {
                    if(e.which == 13) {
                        chat();
                    }
                }).show();
            if(serial == table.serial_in_position) {
                jpoker.plugins.playerSelf.inPosition(player, id);
            }
        },

        leave: function(player, packet, id) {
            $('#sitout' + id).hide();
            $('#rebuy' + id).hide();
            $('#chat' + id).hide();
        },

        updateTable: function(table, what, packet, id) {
            switch(packet.type) {

            }
            return true;
        },
        
        rebuy: function(url, game_id, serial) {
            var player = jpoker.getPlayer(url, game_id, serial);
            if(!player) {
                return false;
            }
            var table = jpoker.getTable(url, game_id);
            var limits = table.buyInLimits();
            var rebuy = $('#jpokerRebuy');
            if(rebuy.size() === 0) {
                $('body').append('<div id=\'jpokerRebuy\' class=\'jpoker_jquery_ui\' title=\'' + _("Add chips") + '\' />');
                rebuy = $('#jpokerRebuy');
                rebuy.dialog({ autoOpen: false, resizable: false });
            }
            rebuy.empty();
            rebuy.append('<div class=\'jpoker_rebuy_bound jpoker_rebuy_min\'>' + limits[0] + '</div>');
            rebuy.append('<div class=\'ui-slider-1\' style=\'margin:10px;\'><div class=\'ui-slider-handle\'></div></div>');
            rebuy.append('<div class=\'jpoker_rebuy_current\'>' + limits[1] + '</div>');
            rebuy.append('<div class=\'jpoker_rebuy_bound jpoker_rebuy_max\'>' + limits[2] + '</div>');
            var packet_type;
            var label;
            if(player.state == 'buyin') {
                packet_type = 'PacketPokerBuyIn';
                label = _("Buy In");
            } else {
                packet_type = 'PacketPokerRebuy';
                label = _("Rebuy");
            }
            var button = $('<div class=\'ui-dialog-buttonpane\'/>').appendTo(rebuy);
            $(document.createElement('button')).
            text(label).
            click(function() {
                    var server = jpoker.getServer(url);
                    if(server) {
                        server.sendPacket({ 'type': packet_type,
                                    'serial': server.serial,
                                    'game_id': table.id,
                                    'amount': parseInt($('.jpoker_rebuy_current', rebuy).html(), 10) * 100
                                    });
                    }
                    rebuy.dialog('close');
                }).
            appendTo(button);
            $('.ui-slider-1', rebuy).slider({
                    min: limits[0],
                        startValue: limits[1],
                        max: limits[2],
                        stepping: 1,
                        change: function(event, ui) {
                        $('.jpoker_rebuy_current').html(ui.value);
                    }
                });
            return rebuy;
        },

        sit: function(player, id) {
            var name = $('#player_seat' + player.seat + '_name' + id);
            var url = player.url;
            var server = jpoker.servers[url];
            var serial = player.serial;
            var game_id = player.game_id;
            name.unbind('click');
            name.html(player.name);
            name.click(function() {
                    var server = jpoker.servers[url];
                    if(server) {
                        server.sendPacket({ 'type': 'PacketPokerSitOut',
                                    'serial': serial,
                                    'game_id': game_id
                                    });
                    }
                });
            $('#sitout' + id).show();
        },

        sitOut: function(player, id) {
            var name = $('#player_seat' + player.seat + '_name' + id);
            var url = player.url;
            var server = jpoker.servers[url];
            var serial = player.serial;
            var game_id = player.game_id;
            name.unbind('click');
            name.html(_("click to sit"));
            name.click(function() {
                    var server = jpoker.servers[url];
                    if(server) {
                        var player = server.tables[game_id].serial2player[serial];
                        if(player.money > jpoker.chips.epsilon) {
                            server.sendPacket({ 'type': 'PacketPokerAutoBlindAnte',
                                        'serial': serial,
                                        'game_id': game_id
                                        });
                            server.sendPacket({ 'type': 'PacketPokerSit',
                                        'serial': serial,
                                        'game_id': game_id
                                        });
                        } else {
                            jpoker.dialog(_("not enough money"));
                        }
                    }
                });
            $('#sitout' + id).hide();
        },

        chips: function(player, id) {
            var table = jpoker.getTable(player.url, player.game_id);
            if(table.state == 'end') {
                var limits = table.buyInLimits();
                if(player.money < limits[2]) {
                    $('#rebuy' + id).show();
                } else {
                    $('#rebuy' + id).hide();
                }
            }

	    if (table.is_tourney) {
		$('#rebuy' + id).hide();
	    } else if ((player.state == 'buyin') &&
		       (player.money === 0)) {
		$('#rebuy' + id).click();
	    }
        },

        inPosition: function(player, id) {
            var game_id = player.game_id;
            var serial = player.serial;
            var url = player.url;
            var table = jpoker.getTable(url, game_id);
            var betLimit = table.betLimit;
            var send = function(what) {
                var server = jpoker.getServer(url);
                if(server) {
                    server.sendPacket({ 'type': 'PacketPoker' + what,
                                'serial': serial,
                                'game_id': game_id
                                });
                }
                return false; // prevent default action on <a href>
            };
            $('#fold' + id).unbind('click').click(function() { return send('Fold'); }).show();
            if(betLimit.call > 0) {
                $('#call' + id).unbind('click').click(function() { return send('Call'); }).show();
            } else {
                $('#check' + id).unbind('click').click(function() { return send('Check'); }).show();
            }
            if(betLimit.allin > betLimit.call) {
                var click;
                if(betLimit.max > betLimit.min) {
                    var raise = $('#raise_range' + id);
                    raise.empty();
                    raise.append('<span class=\'jpoker_raise_bound jpoker_raise_min\'>' + jpoker.chips.SHORT(betLimit.min) + '</span> ');
                    raise.append('<span class=\'jpoker_raise_current\' title=\'' + betLimit.min + '\'>' + jpoker.chips.SHORT(betLimit.min) + '</span> ');
                    raise.append('<span class=\'jpoker_raise_bound jpoker_raise_max\'>' + jpoker.chips.SHORT(betLimit.max) + '</span> ');
                    raise.append('<div class=\'ui-slider-1\' style=\'margin:10px; width:70px; \'><div class=\'ui-slider-handle\'></div></div>');
                    raise.show(); // must be visible otherwise outerWeight/outerWidth returns 0
                    $('.ui-slider-1', raise).slider({
                            min: betLimit.min,
                                startValue: betLimit.min,
                                max: betLimit.max,
                                axis: 'horizontal',
                                stepping: betLimit.step,
                                change: function(event, ui) {
                                var current = $('.jpoker_raise_current', ui.element);
                                current.html(jpoker.chips.SHORT(ui.value));
                                current.attr('title', ui.value);
                            }
                        });
                    click = function() {
                        var server = jpoker.getServer(url);
                        if(server) {
                            server.sendPacket({ 'type': 'PacketPokerRaise',
                                        'serial': serial,
                                        'game_id': game_id,
                                        'amount': parseInt($('.jpoker_raise_current', raise).attr('title'), 10) * 100
                                        });
                        }
                    };
                } else {
                    click = function() {
                        var server = jpoker.getServer(url);
                        if(server) {
                            server.sendPacket({ 'type': 'PacketPokerRaise',
                                        'serial': serial,
                                        'game_id': game_id,
                                        'amount': 0
                                        });
                        }
                    };
                }
                $('#raise' + id).unbind('click').click(click).show();
                $('#jpokerSound').html('<' + jpoker.sound + ' src=\'player_hand.swf\' />');
            }
        },

        lostPosition: function(player, packet, id) {
            jpoker.plugins.playerSelf.hide(id);
        },

        names: [ 'fold', 'call', 'check', 'raise', 'raise_range', 'rebuy' ],

        hide: function(id) {
            for(var i = 0; i < this.names.length; i++) {
                $('#' + this.names[i] + id).hide();
            }
        },

        destroy: function(player, dummy, id) {
            jpoker.plugins.playerSelf.hide(id);
        }
    };

    //
    // cards (table plugin helper)
    //
    jpoker.plugins.cards = {
        update: function(cards, prefix, id) {
            for(var i = 0; i < cards.length; i++) {
                var card = cards[i];
                var element = $('#' + prefix + i + id);
                if(card !== null) {
                    var card_image = 'back';
                    if(card != 255) {
                        card_image = jpoker.cards.card2string[card & 0x3F];
                    }
                    element.removeClass().addClass('jpoker_card jpoker_ptable_' + prefix + i + ' jpoker_card_' + card_image);
                    element.show();
                } else {
                    element.hide();
                }
            }
        }
    };
    //
    // chips (table plugin helper)
    //
    jpoker.plugins.chips = {
        update: function(chips, id) {
            var element = $(id);
            if(chips > 0) {
                element.show();
                element.html(jpoker.chips.SHORT(chips));
                element.attr('title', jpoker.chips.LONG(chips));
            } else {
                element.hide();
            }
        }

    };

    //
    // userInfo
    //
    jpoker.plugins.userInfo = function(url, options) {

        var userInfo = jpoker.plugins.userInfo;
        var opts = $.extend({}, userInfo.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();
		
                $this.append('<div class=\'jpoker_user_info\' id=\'' + id + '\'></div>');

                var updated = function(server, what, packet) {
                    var element = document.getElementById(id);
                    if(element) {
			if(packet && packet.type == 'PacketPokerPersonalInfo') {
			    $(element).html(userInfo.getHTML(packet));
			    $('input[type=submit]').click(function() {
				    $('.feedback').text(_("Updating..."));
				    var info = {};
				    $("input[type=text]", element).each(function() {
					    info[$(this).attr("name")] = $(this).attr("value");
					});
				    server.setPersonalInfo(info);
				});
			    if (packet.set_account) {
				$('.feedback').text(_("Updated"));
			    }
			}
                        return true;
                    } else {
                        return false;
                    }
                };

		server.registerUpdate(updated, null, 'userInfo ' + id);
		server.getPersonalInfo();

                return this;
            });
    };

    jpoker.plugins.userInfo.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.userInfo.getHTML = function(packet) {
        var t = this.templates;
	var html = [];
	var userInfo = t.info.supplant($.extend({
		    'firstname_title': _("First name"),
		    'lastname_title': _("Last name"),
		    'email_title': _("Email"),
		    'submit_title': _("Update personal info")
		}, packet));
	return userInfo;
    };

    jpoker.plugins.userInfo.templates = {
      info: '<table><tr><td>{firstname_title}</td><td><input type=\'text\' name=\'firstname\' value=\'{firstname}\'></input></td></tr><tr><td>{lastname_title}</td><td><input type=\'text\' name=\'lastname\' value=\'{lastname}\'></input></td></tr><tr><td>{email_title}</td><td><input type=\'text\' name=\'email\' value=\'{email}\'</td></tr><tr><td><input type=\'submit\' value=\'{submit_title}\'></td><td><div class=\'feedback\'></div></td></tr></table>'
    };

})(jQuery);
