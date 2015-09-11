/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with app work for additional information
 * regarding copyright ownership.  The ASF licenses app file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use app file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var menuOpen = false;
 var menuDiv = "";
 var checkOnl = false;
 var username = "";
 var password = "";
 var push = "";
 var app = {
    // Application Constructor
    initialize: function() {
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        //push = PushNotification.init({ "android": {"senderID": "12345679"}, "ios": {"senderID": "12345679"}, "windows": {"senderID": "12345679"} } );
        menuDiv = document.getElementById("options");
        document.addEventListener("menubutton", app.doMenu, false);

        //document.addEventListener('touchstart', app.screenTouchStart, false);
        //document.addEventListener('touchend', app.screenTouchEnd, false);
        document.addEventListener('online', app.onOnline, false);
        document.addEventListener('offline', app.onOffline, false); 
    },

    // deviceready Event Handler
    //
    // The scope of 'app' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // Check browser support
        if (typeof(localStorage) == "undefined") {
         app.showAlert("Sorry, your browser does not support Web Storage...", "Error", 0);
     }
        //app.receivedEvent('deviceready');
        //app.showAlert("Ready", "Ready", 50);
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    doMenu: function () {
        if(menuOpen) {
            menuDiv.style.display="none";
            menuOpen = false;
        } else {
            menuDiv.style.display="block";
            menuOpen = true;
        }
    },

    screenTouchStart: function () {
        alert("screenTouchStart");
        if(menuOpen) {
            menuDiv.style.display="none";
            menuOpen = false;
        }
    },

    screenTouchEnd: function () {
        alert("screenTouchEnd");
        if(menuOpen) {
            menuDiv.style.display="none";
            menuOpen = false;
        }
    },

    //check online status
    onOnline: function() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        checkOnl = true;
    },

    onOffline: function() {
        app.showAlert("You are offline. Please turn on network for getting notification", "Offline", 'OK');
        checkOnl = false;
    },

    checkConnection: function () {
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        if (networkState=="No network connection") {
            app.showAlert("You are offline. Please turn on network for getting notification", "Offline", 'OK');
        };
    },

    //show alert
    showAlert: function (message, title, duration) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
            if (duration > 0){
                navigator.notification.vibrate(duration);
            }
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    saveInfo: function (username, password) {
        //if (localStorage.length > 0){
            // for (var i = localStorage.length - 1; i >= 1; i--) {
            //     var keyname = localStorage.key(i);
            //     localStorage.removeItem(keyname);
            // };
            //localStorage.clear();
        //}
        // for (var i = localStorage.length - 1; i >= 0; i--) {
        //     var key = localStorage.key(i);
        //     if (localStorage.getItem(key)!=""){

        //     }
        // };

        var found = false;
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            alert(localStorage.key(i));
            alert(username);
            alert(localStorage.key(i) == username);
            if (localStorage.key(i) == username){
                localStorage.removeItem(username);
                localStorage.setItem(username, password);
                found = true;
            }
        }
        
        if (found=false){
            localStorage.setItem(username, password);
        }
        app.showAlert("Login information was saved", "Save", 0);
        //var keyname = localStorage.key(i);
        //keyname is now equal to "key"
        //var value = localStorage.getItem("key");
        //value is now equal to "value"
        //localStorage.removeItem("key");
        //localStorage.setItem("key2", "value2");
        //localStorage.clear();
        //localStorage is now empty
    },

    getInfo: function () {
        if (localStorage.getItem("debug")!=""){
            localStorage.removeItem("debug");
        }
        //app.showAlert("Length after removed: " + localStorage.length, "Data stored", 0);
        if (localStorage.length > 0){
            username = document.getElementById("username");
            password = document.getElementById("password");
            var key = localStorage.key(localStorage.length - 1);
            var value = localStorage.getItem(key);
            if (value != ""){
                username.value = key;
                password.value = value;
            }
        }
    },

    clearData: function(){
        localStorage.clear();
        app.showAlert("All saved data was cleared", "Clear data", 0);
    },

    exitFromApp: function ()
    {
        if (navigator.app) {
            navigator.app.exitApp();
        }else {
            if (navigator.device) {
                navigator.device.exitApp();
            }
        }
    }
};
