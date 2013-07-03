// ==UserScript==
// @name               Pocket from LDR
// @namespace          http://d.hatena.ne.jp/toshi123/
// @description        add to Pocket from LDR
// @include            http://reader.livedoor.com/reader/*
// @version            0.1
// ==/UserScript==

(function() {
    // PocketのBookmarkletをhttp://getpocket.com/welcome?b=Bookmarkletからダウンロードして
    // 該当する部分の値を以下にコピーしてください。下の値はダミーなのでこのままでは動きません。
    // 詳しくはREADMEを参考にしてください。
    var pocket_array = [1000001,1000002,1000003,1000004,1000005,1000006,1000007,1000008,1000009,1000000];
    var pocket_value = 999;
    var pocket_string = '6789abcdef';
    // ここまで

    var w = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
    var _onload = w.onload;

    var posturl = "https://getpocket.com/b/r4.js";
    //var config = { "shortcut":"", "apikey":"", "username":"", "password":"" };
    var config = { "shortcut":"q" };
    //var unread_count = 0;

    var login_flag = 0;

    var style_label = 'display:block; float:left; width:100px; margin:0px 5px; text-align:right;';
    var style_inputbox = 'display:block; float:left; width:180px; margin:0px 5px; border:1px solid #000000;';
    var style_button = 'display:block; float:left; margin:0px 5px; border:1px solid #000000;';
    var style_hr = 'width: 90%; height:1px; border-style:solid;';
    var style_ok = 'font-weight:bold; background-color: #99ff99;';

    var icon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF'+
    'wZItypwzzJ0zzp8yyp89zKE+0qM0264+yqBBz6ZGzKNMz6hMyaJR2KxA27BD2rddzKljz65q27to'+
    '07d/1rh65bhF5rtO5r5W5L9a5sNh5sNs48Vx5sly5st958196Mx1/tx8/t5+1byL38OD3MGI38WN'+
    '3cWS3cif382p38+x5cqJ6MuC6M2C48uT5s2V6dCG7dCB7NWI7dKQ7tWZ79qU8NuQ9NyT69mt7Ny2'+
    '/uGA/uCE/uCH/ueG/uCL/uWJ/+uK/+uM9uOS9+OT9OWe/uST/uSW+eef/ueY/uiV/++Q/eif//GX'+
    '//SX//Wc//ic/u+i+O2p/Oqp8eC6+O2x//Oj//Gl/PGt/POv//er//ml//ul//mr/vCy//6x//u6'+
    '//y5//66//6949bA49fB6uHR7uXU7+bV6uTc7efd8+jQ7Ojk8e3q8O/z/vzr8fD08vH18/L29PL1'+
    '9PP39fT4+Pf7///w///x///z+fj8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS5cRvwAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVU'+
    'IFYzLjUuMUlLPc8AAADOSURBVChTY8ivqDASFRUVM66oyAcBhvySIIPystJc8cwSqEBxsVRwYmyC'+
    's3ZxMURFfpGFRFxUVLykeRFMoEjLNNovMoC9ECQCVJFflMYX7usTIa9XBBQBCRQU6MqEeHqH8aYW'+
    'QATyC/LYHB3sQw2V4QLZzE42Nv5yqjCBfBVpD0s7N6YMqKH5KYxeVoru/GpQa/PyRGRdFKzNuPLy'+
    'ICpyNFhjXG29ONVzICpycnhM9FkCdQRzYALJHNwCwkIMyWA+UEVlTpJmTpZSOoSfDwC4+1Xo49ca'+
    '4gAAAABJRU5ErkJggg==';

    var onload = function() {
        load_config();
        bind_shortcut();
        add_button();
        //get_unread_count();
    };

    function load_config() {
        for ( var i in config ) {
            var x = decode_data(GM_getValue(i));
            if ( x != "undefined" ) { config[i] = x; }
        }
    }

    function set_config(key, value) {
        if ( ! key.match( /\w+/ ) ) { return; }
        config[key] = value;
        GM_setValue(key, value);
    }

    function bind_shortcut() {
        if ( String(config.shortcut).match( /\w/ ) ) {
            w.Keybind.add(config.shortcut, add_to_readitlater);
        }
    }

    function add_button() {
        var searchobj, newElement, newSpan;
        searchobj = document.getElementById('pin_button');
        if (searchobj) {
            newElement = document.createElement('li');
            newElement.setAttribute("class", "button icon");
            newElement.setAttribute("id", "ril_button");
            newElement.setAttribute("style", "background-image: url(" + icon + "); font-weight:bold; text-align:right;");
            newElement.addEventListener('click', function(){ add_to_readitlater(); }, false);
            newSpan = document.createElement('span');
            //newSpan.setAttribute("id", "unread_count");
            newSpan.setAttribute("style", "line-height:22px;");
            newElement.appendChild(newSpan);
            searchobj.parentNode.insertBefore(newElement, searchobj.nextSibling);
        }
    }

    function get_form_element(key) {
        return document.forms.namedItem("settings_form").elements.namedItem(key);
    }


    function check_login() {
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : posturl,
                onload  : function(res) {
                              if ( res.finalUrl.match(/login/) ) {
                                  w.message('Read It Later - not login...');
                              } else {
                                  login_flag = 1;
                              } },
                onerror : function(res) { w.message('Read It Later... Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }

    function add_to_readitlater() {
        if (! login_flag) {
            check_login();
            if (! login_flag) { return; }
        }

        var item = w.get_active_item(true);
        if ( item === null ) { return; }
        var item4pocket = b4pocket(item.link);
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url       : 'https://getpocket.com/b/r4.js?h='+item4pocket+'&u='+encodeURIComponent(item.link)+'&t='+encodeURIComponent(item.title),
                onload  : function(res) {
                              if (res.status == 200) {
                                  w.message('Read It Later! - ' + item.title);
                                  //add_unread_count(1);
                              } else {
                                  w.message('Read It Later... Failed - ' + res.status + ' ' + res.statusText);
                              } },
                onerror : function(res) { w.message('Read It Later... Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }

    function b4pocket(t,n,r,i,s){
        var o=pocket_array;
        i=i||0;
        u=0;
        n=n||[];
        r=r||0;
        s=s||0;
        var a={
            'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,
            'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,
            'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,
            'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,
            'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,
            '8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46
        };
        if(!s||s===0){t=o[0]+t;}

        for(var f=0;f<t.length;f++){
            var l= a[t[f]]?a[t[f]]:t.charCodeAt(f);
            if(!l*1)l=3;
            var c=l*(o[i]+l*o[u%o.length]);
            n[r]=(n[r]?n[r]+c:c)+s+u;
            var p=c%(50*1);
            if(n[p]){
                var d=n[r];
                n[r]=n[p];
                n[p]=d;
            }
            u+=c;
            r=r==50?0:r+1;
            i=i==o.length-1?0:i+1;
        }
        if(s==pocket_value){
            var v='';
            for(var f1=0;f1<n.length;f1++){
                v+=String.fromCharCode(n[f1]%(25*1)+97);
            }
            o=function(){};
            return v+pocket_string;
        }else{
            return b4pocket(u+'',n,r,i,s+1);
        }
    }

    function set_shortcut(k) {
        // check - [A-Za-z0-9_] only
        if ( ! k.match( /\w/ ) ) { return; }

        set_config("shortcut", k);
        change_style_ok(get_form_element("shortcut"));
    }

    function show_setup() {
        var settingsPanel = build_setup();
        var body = document.getElementsByTagName("body");
        body[0].appendChild(settingsPanel);
        settingsPanel.style.display = 'block';
        check_ok();
        return;
    }

    function build_setup() {
        var settingsPanel = document.createElement("div");
            settingsPanel.setAttribute("id", "readitlater");
            settingsPanel.setAttribute("style",
                "position:static; width:400px; margin:auto auto; padding:12px;" +
                "border:1px solid #666666; -moz-border-radius:8px;" +
                "color:#333333; background:#eeeeee; opacity:0.95;" +
                "font-size: 80%; display:none;" );

        var settingsTitle = document.createElement("div");
        settingsTitle.appendChild(document.createTextNode("Read It Later from LDR - Setup"));
        settingsTitle.setAttribute("style", "margin: 1em auto 2em; font-weight:bold; text-align:center;");
        settingsPanel.appendChild(settingsTitle);

        var settings_form = document.createElement("form");
            settings_form.setAttribute("method", "get");
            settings_form.setAttribute("action", "");
            settings_form.setAttribute("id", "settings_form");

        // field - shortcut key
        var label_shortcut = document.createElement("label");
            label_shortcut.appendChild(document.createTextNode("Shortcut Key"));
            label_shortcut.setAttribute("style", style_label);
            settings_form.appendChild(label_shortcut);
        var inputbox_shortcut = document.createElement("input");
            inputbox_shortcut.setAttribute("type", "text");
            inputbox_shortcut.setAttribute("size", 20);
            inputbox_shortcut.setAttribute("title", "Shortcut key");
            inputbox_shortcut.setAttribute("name", "shortcut");
            inputbox_shortcut.setAttribute("maxlength", "1");
            inputbox_shortcut.setAttribute("value", config.shortcut);
            inputbox_shortcut.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_shortcut);
        var shortcut_set = document.createElement("input");
            shortcut_set.setAttribute("value", "Set");
            shortcut_set.setAttribute("type", "button");
            shortcut_set.setAttribute("style", style_button);
            shortcut_set.addEventListener('click', function(){ set_shortcut( get_form_element("shortcut").value ); }, false);
        settings_form.appendChild(shortcut_set);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var hr = document.createElement("hr");
            hr.setAttribute("style", style_hr);
        settings_form.appendChild(hr);
        settings_form.appendChild(document.createElement("br"));

        // Close Button
        var close_button = document.createElement("input");
            close_button.setAttribute("value", "Close");
            close_button.setAttribute("type", "button");
            close_button.setAttribute("style", "width:200px; display:block; margin:0px auto; padding: 5px; border:1px solid #000000;");
            close_button.addEventListener('click', function(){ close_settings(settingsPanel); }, false);
        settings_form.appendChild(close_button);
        settings_form.appendChild(document.createElement("br"));

        // Initialize Button
        //var close_button = document.createElement("input");
            close_button.setAttribute("value", "Initialize");
            close_button.setAttribute("type", "button");
            close_button.setAttribute("style", "width:200px; display:block; margin:0px auto; padding: 5px; border:1px solid #000000;");
            close_button.addEventListener('click', function(){ init_settings(settingsPanel); }, false);
        settings_form.appendChild(close_button);
        settings_form.appendChild(document.createElement("br"));

        settingsPanel.appendChild(settings_form);
        return settingsPanel;
    }

    function close_settings(w){
        w.style.display = 'none';
    }

    function init_settings(w){
        // confirm
        var res = confirm("Initialize all settings?");
        if ( res !== true ) { return; }

        // init
        for ( var i in config ) {
            var f = get_form_element(i);
            f.value = '';
            change_style_default(f);
            set_config(i, '');
        }
    }

    function check_ok() {
        for ( var i in config ) {
            var f = get_form_element(i);
            if ( f.value.match( /\w+/) ) { change_style_ok(f); }
        }
    }

    function change_style_ok(i) {
        i.style.background = '#99ff99';
        i.style.fontWeight = 'bold';
    }
    function change_style_ng(i) {
        i.style.background = '#ff9999';
        i.style.fontWeight = 'bold';
    }
    function change_style_default(i) {
        i.style.background = '#ffffff';
        i.style.fontWeight = 'normal';
    }
    function change_style_wait(i) {
        i.style.background = '#cccccc';
        i.style.fontWeight = 'normal';
    }

    function decode_data(v){
        return v !== null ? decodeURI(v) : "";
    }

    w.onload = function() {
        _onload();
        onload();
    };

    GM_registerMenuCommand("Read It Later from LDR - setup", show_setup );

})();