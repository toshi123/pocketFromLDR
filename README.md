# summary
* Read It Later from LDR ( http://userscripts.org/scripts/show/62710 )を今のPocketで使えるようにしました。
* このままでは使えません。各自公式のBookmarkletを参考に書きなおしてください。
* 動作確認環境はMac版Chrome dev channel 29.0.1541.0 dev + Tampermonkeyです。
* pocketに投げたいエントリを選択した状態でqを押すと投稿できます。 キーバインドはソース見ていじってください。

# usage
### 自分の定数を書き込む
pocketFromLDR.user.jsの13〜15行目あたりをBookmarkletを参考に書き換えてください。
公式のBookmarkletは http://getpocket.com/welcome?b=Bookmarklet で手に入ります。

```javascript:pocketFromLDR.user.js
var pocket_array = [1000001,1000002,1000003,1000004,1000005,1000006,1000007,1000008,1000009,1000000];
var pocket_value = 999;
var pocket_string = '6789abcdef';
```

の3つの変数を書き換えます。Bookmarkletにある以下の太字部分です。

> javascript:(function(){var e=function(t,n,r,i,s){var o= **[1000001,1000002,1000003,1000004,1000005,1000006,1000007,1000008,1000009,1000000]** ;  
> var i=i||0,u=0,n=n||[],r=r||0,s=s||0;var a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,
> 'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,
> 'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,
> 'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,
> 'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,
> '=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var f=0;f<t.length;f++){
> var l=function(e,t){return a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var c=l*(o[i]+l*o[u%o.length]);
> n[r]=(n[r]?n[r]+c:c)+s+u;var p=c%(50*1);if(n[p]){var d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;
> i=i==o.length-1?0:i+1}if(s== **999** ){var v='';for(var f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}
> o=function(){};return v+ ' **6789abcdef** ' }else{return e(u+'',n,r,i,s+1)}};var t=document,n=t.location.href,r=t.title;
> var i=e(n);var s=t.createElement('script');s.type='text/javascript';
> s.src=' `https://getpocket.com/b/r4.js?h='+i+'&u='+encodeURIComponent(n)+'&t='+encodeURIComponent(r)` ;
> e=i=function(){};var o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})()

### キーバインド

```javascript:pocketFromLDR.user.js
var config = { "shortcut":"q" };
```

初期設定では`q`になっているので、好きなキーに書きなおしてください

# history
0.2
* LIRのボタンを廃止。ホットキーによる投稿機能のみにした。

0.1  
* Read It Later from LDR( http://userscripts.org/scripts/show/62710 )を現在のpocketで使えるように書き換えた。
* 各自のBookmarkletに設定を書き換えてもらう仕様に変更



