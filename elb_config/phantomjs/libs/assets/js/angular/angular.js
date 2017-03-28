/*
 AngularJS v1.5.0
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(D,r,Va){'use strict';function ya(a,b,c){if(!a)throw Ka("areq",b||"?",c||"required");return a}function za(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;ba(a)&&(a=a.join(" "));ba(b)&&(b=b.join(" "));return a+" "+b}function La(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function X(a,b,c){var d="";a=ba(a)?a:a&&R(a)&&a.length?a.split(/\s+/):[];s(a,function(a,g){a&&0<a.length&&(d+=0<g?" ":"",d+=c?b+a:a+b)});return d}function Ma(a){if(a instanceof I)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return I(oa(a))}if(1===a.nodeType)return I(a)}function oa(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Na(a,b,c){s(b,function(b){a.addClass(b,c)})}function Oa(a,b,c){s(b,function(b){a.removeClass(b,c)})}function U(a){return function(b,c){c.addClass&&(Na(a,b,c.addClass),c.addClass=null);c.removeClass&&(Oa(a,b,c.removeClass),c.removeClass=null)}}function ka(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
Q;a.domOperation=function(){a.$$domOperationFired=!0;b();b=Q};a.$$prepared=!0}return a}function fa(a,b){Aa(a,b);Ba(a,b)}function Aa(a,b){b.from&&(a.css(b.from),b.from=null)}function Ba(a,b){b.to&&(a.css(b.to),b.to=null)}function V(a,b,c){var d=b.options||{};c=c.options||{};var e=(d.addClass||"")+" "+(c.addClass||""),g=(d.removeClass||"")+" "+(c.removeClass||"");a=Pa(a.attr("class"),e,g);c.preparationClasses&&(d.preparationClasses=ca(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
e=d.domOperation!==Q?d.domOperation:null;Ca(d,c);e&&(d.domOperation=e);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Pa(a,b,c){function d(a){R(a)&&(a=a.split(" "));var b={};s(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);s(b,function(a,b){e[b]=1});c=d(c);s(c,function(a,b){e[b]=1===e[b]?null:-1});var g={addClass:"",removeClass:""};s(e,function(b,c){var d,e;1===b?(d="addClass",
e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(g[d].length&&(g[d]+=" "),g[d]+=c)});return g}function G(a){return a instanceof r.element?a[0]:a}function Qa(a,b,c){var d="";b&&(d=X(b,"ng-",!0));c.addClass&&(d=ca(d,X(c.addClass,"-add")));c.removeClass&&(d=ca(d,X(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function la(a,b){var c=b?"-"+b+"s":"";ha(a,[ia,c]);return[ia,c]}function pa(a,b){var c=b?"paused":"",d=Y+"PlayState";ha(a,[d,c]);return[d,c]}function ha(a,b){a.style[b[0]]=
b[1]}function ca(a,b){return a?b?a+" "+b:a:b}function Da(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};s(c,function(a,b){var c=e[a];if(c){var C=c.charAt(0);if("-"===C||"+"===C||0<=C)c=Ra(c);0===c&&(c=null);d[b]=c}});return d}function Ra(a){var b=0;a=a.split(/\s*,\s*/);s(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function qa(a){return 0===a||null!=a}function Ea(a,b){var c=S,d=a+"s";b?c+="Duration":d+=" linear all";
return[c,d]}function Fa(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ga(a,b,c){s(c,function(c){a[c]=Z(a[c])?a[c]:b.style.getPropertyValue(c)})}var Q=r.noop,Ha=r.copy,Ca=r.extend,I=r.element,s=r.forEach,ba=r.isArray,R=r.isString,ra=r.isObject,P=r.isUndefined,Z=r.isDefined,Ia=r.isFunction,sa=r.isElement,S,ta,Y,ua;P(D.ontransitionend)&&
Z(D.onwebkittransitionend)?(S="WebkitTransition",ta="webkitTransitionEnd transitionend"):(S="transition",ta="transitionend");P(D.onanimationend)&&Z(D.onwebkitanimationend)?(Y="WebkitAnimation",ua="webkitAnimationEnd animationend"):(Y="animation",ua="animationend");var ma=Y+"Delay",va=Y+"Duration",ia=S+"Delay";D=S+"Duration";var Ka=r.$$minErr("ng"),Sa={transitionDuration:D,transitionDelay:ia,transitionProperty:S+"Property",animationDuration:va,animationDelay:ma,animationIterationCount:Y+"IterationCount"},
Ta={transitionDuration:D,transitionDelay:ia,animationDuration:va,animationDelay:ma};r.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,g,H){var A,C;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){A&&a.leave(A);C&&(C.$destroy(),C=null);if(e||0===e)C=b.$new(),H(C,function(b){A=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,
c,d){function e(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var g=d.ngAnimateChildren;r.isString(g)&&0===g.length?c.data("$$ngAnimateChildren",!0):(e(a(g)(b)),d.$observe("ngAnimateChildren",e))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),H=0;H<b.length;H++)b[H]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",
["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);s(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return g[a].some(function(a){return a(b,c,d)})}function e(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var g=this.rules={skip:[],cancel:[],join:[]};g.join.push(function(a,b,c){return!b.structural&&e(b)});g.skip.push(function(a,
b,c){return!b.structural&&!e(b)});g.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});g.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});g.cancel.push(function(a,b,c){return c.structural&&b.structural});g.cancel.push(function(a,b,c){return 2===c.state&&b.structural});g.cancel.push(function(a,b,d){a=b.addClass;b=b.removeClass;var e=d.addClass;d=d.removeClass;return P(a)&&P(b)||P(e)&&P(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope","$rootElement","$document",
"$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(b,c,g,m,M,r,u,na,v,z){function K(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function J(a,b,c){var f=G(b),d=G(a),h=[];(a=x[c])&&s(a,function(a){y.call(a.node,f)?h.push(a.callback):"leave"===c&&y.call(a.node,d)&&h.push(a.callback)});return h}function h(a,f,h){function l(c,f,d,h){g(function(){var c=J(y,a,f);c.length&&b(function(){s(c,function(b){b(a,d,h)})})});c.progress(f,
d,h)}function x(b){var c=a,f=n;f.preparationClasses&&(c.removeClass(f.preparationClasses),f.preparationClasses=null);f.activeClasses&&(c.removeClass(f.activeClasses),f.activeClasses=null);Ja(a,n);fa(a,n);n.domOperation();k.complete(!b)}var n=Ha(h),z,y;if(a=Ma(a))z=G(a),y=a.parent();var n=ka(n),k=new u,g=K();ba(n.addClass)&&(n.addClass=n.addClass.join(" "));n.addClass&&!R(n.addClass)&&(n.addClass=null);ba(n.removeClass)&&(n.removeClass=n.removeClass.join(" "));n.removeClass&&!R(n.removeClass)&&(n.removeClass=
null);n.from&&!ra(n.from)&&(n.from=null);n.to&&!ra(n.to)&&(n.to=null);if(!z)return x(),k;h=[z.className,n.addClass,n.removeClass].join(" ");if(!Ua(h))return x(),k;var C=0<=["enter","move","leave"].indexOf(f),w=!L||m[0].hidden||E.get(z);h=!w&&B.get(z)||{};var v=!!h.state;w||v&&1==h.state||(w=!q(a,y,f));if(w)return x(),k;C&&xa(a);w={structural:C,element:a,event:f,addClass:n.addClass,removeClass:n.removeClass,close:x,options:n,runner:k};if(v){if(d("skip",a,w,h)){if(2===h.state)return x(),k;V(a,h,w);
return h.runner}if(d("cancel",a,w,h))if(2===h.state)h.runner.end();else if(h.structural)h.close();else return V(a,h,w),h.runner;else if(d("join",a,w,h))if(2===h.state)V(a,w,{});else return Qa(a,C?f:null,n),f=w.event=h.event,n=V(a,h,w),h.runner}else V(a,w,{});(v=w.structural)||(v="animate"===w.event&&0<Object.keys(w.options.to||{}).length||e(w));if(!v)return x(),N(a),k;var M=(h.counter||0)+1;w.counter=M;t(a,1,w);c.$$postDigest(function(){var b=B.get(z),c=!b,b=b||{},d=0<(a.parent()||[]).length&&("animate"===
b.event||b.structural||e(b));if(c||b.counter!==M||!d){c&&(Ja(a,n),fa(a,n));if(c||C&&b.event!==f)n.domOperation(),k.end();d||N(a)}else f=!b.structural&&e(b,!0)?"setClass":b.event,t(a,2),b=r(a,f,b.options),b.done(function(b){x(!b);(b=B.get(z))&&b.counter===M&&N(G(a));l(k,f,"close",{})}),k.setHost(b),l(k,f,"start",{})});return k}function xa(a){a=G(a).querySelectorAll("[data-ng-animate]");s(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=B.get(a);if(c)switch(b){case 2:c.runner.end();
case 1:B.remove(a)}})}function N(a){a=G(a);a.removeAttribute("data-ng-animate");B.remove(a)}function k(a,b){return G(a)===G(b)}function q(a,b,c){c=I(m[0].body);var f=k(a,c)||"HTML"===a[0].nodeName,d=k(a,g),h=!1,l,e=E.get(G(a));for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){d||(d=k(b,g));var x=b[0];if(1!==x.nodeType)break;a=B.get(x)||{};if(!h){x=E.get(x);if(!0===x&&!1!==e){e=!0;break}else!1===x&&(e=!1);h=a.structural}if(P(l)||!0===l)a=b.data("$$ngAnimateChildren"),Z(a)&&(l=a);if(h&&!1===l)break;
f||(f=k(b,c));if(f&&d)break;if(!d&&(a=b.data("$ngAnimatePin"))){b=a;continue}b=b.parent()}return(!h||l)&&!0!==e&&d&&f}function t(a,b,c){c=c||{};c.state=b;a=G(a);a.setAttribute("data-ng-animate",b);c=(b=B.get(a))?Ca(b,c):c;B.put(a,c)}var B=new M,E=new M,L=null,f=c.$watch(function(){return 0===na.totalPendingRequests},function(a){a&&(f(),c.$$postDigest(function(){c.$$postDigest(function(){null===L&&(L=!0)})}))}),x={},l=a.classNameFilter(),Ua=l?function(a){return l.test(a)}:function(){return!0},Ja=U(v),
y=Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&16)};return{on:function(a,b,c){b=oa(b);x[a]=x[a]||[];x[a].push({node:b,callback:c})},off:function(a,b,c){function f(a,b,c){var d=oa(b);return a.filter(function(a){return!(a.node===d&&(!c||a.callback===c))})}var d=x[a];d&&(x[a]=1===arguments.length?null:f(d,b,c))},pin:function(a,b){ya(sa(a),"element","not an element");ya(sa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=
c||{};c.domOperation=f;return h(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!L;else if(sa(a)){var f=G(a),d=E.get(f);1===c?b=!d:E.put(f,!b)}else b=L=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,e,g,H,A,C){function m(a){function b(a){if(a.processed)return a;a.processed=!0;var d=
a.domNode,N=d.parentNode;e.put(d,a);for(var k;N;){if(k=e.get(N)){k.processed||(k=b(k));break}N=N.parentNode}(k||c).children.push(a);return a}var c={children:[]},d,e=new A;for(d=0;d<a.length;d++){var g=a[d];e.put(g.domNode,a[d]={domNode:g.domNode,fn:g.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,t=[];for(d=0;d<c.length;d++){var g=c[d];0>=a&&(a=e,e=0,b.push(t),t=[]);t.push(g.fn);g.children.forEach(function(a){e++;
c.push(a)});a--}t.length&&b.push(t);return b}(c)}var M=[],r=U(a);return function(u,A,v){function z(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];s(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function K(a){var b=[],c={};s(a,function(a,f){var d=G(a.element),h=0<=["enter","move"].indexOf(a.event),d=a.structural?z(d):[];if(d.length){var e=h?"to":"from";s(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||
{};c[b][e]={animationID:f,element:I(a)}})}else b.push(a)});var d={},h={};s(c,function(c,e){var l=c.from,t=c.to;if(l&&t){var g=a[l.animationID],E=a[t.animationID],k=l.animationID.toString();if(!h[k]){var z=h[k]={structural:!0,beforeStart:function(){g.beforeStart();E.beforeStart()},close:function(){g.close();E.close()},classes:J(g.classes,E.classes),from:g,to:E,anchors:[]};z.classes.length?b.push(z):(b.push(g),b.push(E))}h[k].anchors.push({out:l.element,"in":t.element})}else l=l?l.animationID:t.animationID,
t=l.toString(),d[t]||(d[t]=!0,b.push(a[l]))});return b}function J(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var h=a[d];if("ng-"!==h.substring(0,3))for(var e=0;e<b.length;e++)if(h===b[e]){c.push(h);break}}return c.join(" ")}function h(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(g.has(d)&&(d=g.get(d)(a)))return d}}function xa(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function N(){var a=b(u);!a||"leave"===A&&v.$$domOperationFired||
a.end()}function k(b){u.off("$destroy",N);u.removeData("$$animationRunner");r(u,v);fa(u,v);v.domOperation();E&&a.removeClass(u,E);u.removeClass("ng-animate");t.complete(!b)}v=ka(v);var q=0<=["enter","move","leave"].indexOf(A),t=new H({end:function(){k()},cancel:function(){k(!0)}});if(!c.length)return k(),t;u.data("$$animationRunner",t);var B=za(u.attr("class"),za(v.addClass,v.removeClass)),E=v.tempClasses;E&&(B+=" "+E,v.tempClasses=null);var L;q&&(L="ng-"+A+"-prepare",a.addClass(u,L));M.push({element:u,
classes:B,event:A,structural:q,options:v,beforeStart:function(){u.addClass("ng-animate");E&&a.addClass(u,E);L&&(a.removeClass(u,L),L=null)},close:k});u.on("$destroy",N);if(1<M.length)return t;e.$$postDigest(function(){var a=[];s(M,function(c){b(c.element)?a.push(c):c.close()});M.length=0;var c=K(a),d=[];s(c,function(a){d.push({domNode:G(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var f=h(a);f&&(c=f.start)}c?
(c=c(),c.done(function(a){d(!a)}),xa(a,c)):d()}})});C(m(d))});return t}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Fa(),c=Fa();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,g,H,A,C,m,M){function r(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++K))+"-"+a.getAttribute("class")+"-"+b}function u(h,g,z,k){var q;0<b.count(z)&&(q=c.get(z),q||(g=X(g,"-stagger"),
e.addClass(h,g),q=Da(a,h,k),q.animationDuration=Math.max(q.animationDuration,0),q.transitionDuration=Math.max(q.transitionDuration,0),e.removeClass(h,g),c.put(z,q)));return q||{}}function na(a){J.push(a);m.waitUntilQuiet(function(){b.flush();c.flush();for(var a=A(),d=0;d<J.length;d++)J[d](a);J.length=0})}function v(c,e,g){e=b.get(g);e||(e=Da(a,c,Sa),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(g,e);c=e;g=c.animationDelay;e=c.transitionDelay;c.maxDelay=g&&e?Math.max(g,
e):g||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var z=U(e),K=0,J=[];return function(a,c){function d(){q()}function k(){q(!0)}function q(b){if(!(A||wa&&K)){A=!0;K=!1;f.$$skipPreparationClasses||e.removeClass(a,da);e.removeClass(a,ca);pa(l,!1);la(l,!1);s(m,function(a){l.style[a[0]]=""});z(a,f);fa(a,f);Object.keys(x).length&&s(x,function(a,b){a?l.style.setProperty(b,a):l.style.removeProperty(b)});if(f.onDone)f.onDone();ea&&ea.length&&a.off(ea.join(" "),
E);var c=a.data("$$animateCss");c&&(H.cancel(c[0].timer),a.removeData("$$animateCss"));D&&D.complete(!b)}}function t(a){p.blockTransition&&la(l,a);p.blockKeyframeAnimation&&pa(l,!!a)}function B(){D=new g({end:d,cancel:k});na(Q);q();return{$$willAnimate:!1,start:function(){return D},end:d}}function E(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-U,0)>=P&&b>=O&&(wa=!0,q())}function L(){function b(){if(!A){t(!1);s(m,
function(a){l.style[a[0]]=a[1]});z(a,f);e.addClass(a,ca);if(p.recalculateTimingStyles){ja=l.className+" "+da;ga=r(l,ja);F=v(l,ja,ga);$=F.maxDelay;n=Math.max($,0);O=F.maxDuration;if(0===O){q();return}p.hasTransitions=0<F.transitionDuration;p.hasAnimations=0<F.animationDuration}p.applyAnimationDelay&&($="boolean"!==typeof f.delay&&qa(f.delay)?parseFloat(f.delay):$,n=Math.max($,0),F.animationDelay=$,aa=[ma,$+"s"],m.push(aa),l.style[aa[0]]=aa[1]);P=1E3*n;R=1E3*O;if(f.easing){var d,g=f.easing;p.hasTransitions&&
(d=S+"TimingFunction",m.push([d,g]),l.style[d]=g);p.hasAnimations&&(d=Y+"TimingFunction",m.push([d,g]),l.style[d]=g)}F.transitionDuration&&ea.push(ta);F.animationDuration&&ea.push(ua);U=Date.now();var k=P+1.5*R;d=U+k;var g=a.data("$$animateCss")||[],L=!0;if(g.length){var B=g[0];(L=d>B.expectedEndTime)?H.cancel(B.timer):g.push(q)}L&&(k=H(c,k,!1),g[0]={timer:k,expectedEndTime:d},g.push(q),a.data("$$animateCss",g));if(ea.length)a.on(ea.join(" "),E);f.to&&(f.cleanupStyles&&Ga(x,l,Object.keys(f.to)),Ba(a,
f))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!A)if(l.parentNode){var d=function(a){if(wa)K&&a&&(K=!1,q());else if(K=!a,F.animationDuration)if(a=pa(l,K),K)m.push(a);else{var b=m,c=b.indexOf(a);0<=a&&b.splice(c,1)}},g=0<Z&&(F.transitionDuration&&0===W.transitionDuration||F.animationDuration&&0===W.animationDuration)&&Math.max(W.animationDelay,W.transitionDelay);g?H(b,Math.floor(g*Z*1E3),!1):b();I.resume=function(){d(!0)};I.pause=
function(){d(!1)}}else q()}var f=c||{};f.$$prepared||(f=ka(Ha(f)));var x={},l=G(a);if(!l||!l.parentNode||!M.enabled())return B();var m=[],J=a.attr("class"),y=La(f),A,K,wa,D,I,n,P,O,R,U,ea=[];if(0===f.duration||!C.animations&&!C.transitions)return B();var w=f.event&&ba(f.event)?f.event.join(" "):f.event,V="",T="";w&&f.structural?V=X(w,"ng-",!0):w&&(V=w);f.addClass&&(T+=X(f.addClass,"-add"));f.removeClass&&(T.length&&(T+=" "),T+=X(f.removeClass,"-remove"));f.applyClassesEarly&&T.length&&z(a,f);var da=
[V,T].join(" ").trim(),ja=J+" "+da,ca=X(da,"-active"),J=y.to&&0<Object.keys(y.to).length;if(!(0<(f.keyframeStyle||"").length||J||da))return B();var ga,W;0<f.stagger?(y=parseFloat(f.stagger),W={transitionDelay:y,animationDelay:y,transitionDuration:0,animationDuration:0}):(ga=r(l,ja),W=u(l,da,ga,Ta));f.$$skipPreparationClasses||e.addClass(a,da);f.transitionStyle&&(y=[S,f.transitionStyle],ha(l,y),m.push(y));0<=f.duration&&(y=0<l.style[S].length,y=Ea(f.duration,y),ha(l,y),m.push(y));f.keyframeStyle&&
(y=[Y,f.keyframeStyle],ha(l,y),m.push(y));var Z=W?0<=f.staggerIndex?f.staggerIndex:b.count(ga):0;(w=0===Z)&&!f.skipBlocking&&la(l,9999);var F=v(l,ja,ga),$=F.maxDelay;n=Math.max($,0);O=F.maxDuration;var p={};p.hasTransitions=0<F.transitionDuration;p.hasAnimations=0<F.animationDuration;p.hasTransitionAll=p.hasTransitions&&"all"==F.transitionProperty;p.applyTransitionDuration=J&&(p.hasTransitions&&!p.hasTransitionAll||p.hasAnimations&&!p.hasTransitions);p.applyAnimationDuration=f.duration&&p.hasAnimations;
p.applyTransitionDelay=qa(f.delay)&&(p.applyTransitionDuration||p.hasTransitions);p.applyAnimationDelay=qa(f.delay)&&p.hasAnimations;p.recalculateTimingStyles=0<T.length;if(p.applyTransitionDuration||p.applyAnimationDuration)O=f.duration?parseFloat(f.duration):O,p.applyTransitionDuration&&(p.hasTransitions=!0,F.transitionDuration=O,y=0<l.style[S+"Property"].length,m.push(Ea(O,y))),p.applyAnimationDuration&&(p.hasAnimations=!0,F.animationDuration=O,m.push([va,O+"s"]));if(0===O&&!p.recalculateTimingStyles)return B();
if(null!=f.delay){var aa;"boolean"!==typeof f.delay&&(aa=parseFloat(f.delay),n=Math.max(aa,0));p.applyTransitionDelay&&m.push([ia,aa+"s"]);p.applyAnimationDelay&&m.push([ma,aa+"s"])}null==f.duration&&0<F.transitionDuration&&(p.recalculateTimingStyles=p.recalculateTimingStyles||w);P=1E3*n;R=1E3*O;f.skipBlocking||(p.blockTransition=0<F.transitionDuration,p.blockKeyframeAnimation=0<F.animationDuration&&0<W.animationDelay&&0===W.animationDuration);f.from&&(f.cleanupStyles&&Ga(x,l,Object.keys(f.from)),
Aa(a,f));p.blockTransition||p.blockKeyframeAnimation?t(O):f.skipBlocking||la(l,!1);return{$$willAnimate:!0,end:d,start:function(){if(!A)return I={end:d,cancel:k,resume:null,pause:null},D=new g(I),na(L),D}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,g,H,A){function C(a){return a.replace(/\bng-\S+\b/g,"")}function m(a,
b){R(a)&&(a=a.split(" "));R(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function M(c,e,g){function h(a){var b={},c=G(a).getBoundingClientRect();s(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=D.scrollTop;break;case "left":d+=D.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function A(){var c=C(g.attr("class")||""),d=m(c,q),c=m(q,c),d=a(k,{to:h(g),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?
d:null}function H(){k.remove();e.removeClass("ng-animate-shim");g.removeClass("ng-animate-shim")}var k=I(G(e).cloneNode(!0)),q=C(k.attr("class")||"");e.addClass("ng-animate-shim");g.addClass("ng-animate-shim");k.addClass("ng-anchor");v.append(k);var t;c=function(){var c=a(k,{addClass:"ng-anchor-out",delay:!0,from:h(e)});return c.$$willAnimate?c:null}();if(!c&&(t=A(),!t))return H();var B=c||t;return{start:function(){function a(){c&&c.end()}var b,c=B.start();c.done(function(){c=null;if(!t&&(t=A()))return c=
t.start(),c.done(function(){c=null;H();b.complete()}),c;H();b.complete()});return b=new d({end:a,cancel:a})}}}function r(a,b,c,e){var g=u(a,Q),m=u(b,Q),k=[];s(e,function(a){(a=M(c,a.out,a["in"]))&&k.push(a)});if(g||m||0!==k.length)return{start:function(){function a(){s(b,function(a){a.end()})}var b=[];g&&b.push(g.start());m&&b.push(m.start());s(k,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function u(c){var d=c.element,e=c.options||
{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=ca(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!g.animations&&!g.transitions)return Q;var D=A[0].body;c=G(e);var v=I(c.parentNode&&11===c.parentNode.nodeType||D.contains(c)?c:D);U(H);return function(a){return a.from&&a.to?r(a.from,a.to,a.classes,a.anchors):u(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=
["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=ba(c)?c:c.split(" ");for(var d=[],e={},g=0;g<c.length;g++){var s=c[g],r=a.$$registeredAnimations[s];r&&!e[s]&&(d.push(b.get(r)),e[s]=!0)}return d}var g=U(d);return function(a,b,d,m){function r(){m.domOperation();g(a,m)}function D(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,z,K,f];break;case "addClass":b=[b,z,f];break;case "removeClass":b=[b,K,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,
b))if(Ia(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ia(a))return a;return Q}function u(a,b,d,e,f){var g=[];s(e,function(e){var h=e[f];h&&g.push(function(){var e,f,g=!1,k=function(a){g||(g=!0,(f||Q)(a),e.complete(!a))};e=new c({end:function(){k()},cancel:function(){k(!0)}});f=D(h,a,b,d,function(a){k(!1===a)});return e})});return g}function G(a,b,d,e,f){var g=u(a,b,d,e,f);if(0===g.length){var h,k;"beforeSetClass"===f?(h=u(a,"removeClass",d,e,"beforeRemoveClass"),k=u(a,"addClass",d,e,"beforeAddClass")):
"setClass"===f&&(h=u(a,"removeClass",d,e,"removeClass"),k=u(a,"addClass",d,e,"addClass"));h&&(g=g.concat(h));k&&(g=g.concat(k))}if(0!==g.length)return function(a){var b=[];g.length&&s(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){s(b,function(b){a?b.cancel():b.end()})}}}var v=!1;3===arguments.length&&ra(d)&&(m=d,d=null);m=ka(m);d||(d=a.attr("class")||"",m.addClass&&(d+=" "+m.addClass),m.removeClass&&(d+=" "+m.removeClass));var z=m.addClass,K=m.removeClass,J=e(d),h,I;if(J.length){var N,
k;"leave"==b?(k="leave",N="afterLeave"):(k="before"+b.charAt(0).toUpperCase()+b.substr(1),N=b);"enter"!==b&&"move"!==b&&(h=G(a,b,m,J,k));I=G(a,b,m,J,N)}if(h||I){var q;return{$$willAnimate:!0,end:function(){q?q.end():(v=!0,r(),fa(a,m),q=new c,q.complete(!0));return q},start:function(){function b(c){v=!0;r();fa(a,m);q.complete(c)}if(q)return q;q=new c;var d,e=[];h&&e.push(function(a){d=h(a)});e.length?e.push(function(a){r();a(!0)}):r();I&&e.push(function(a){d=I(a)});q.setHost({end:function(){v||((d||
Q)(void 0),b(void 0))},cancel:function(){v||((d||Q)(!0),b(!0))}});c.chain(e,b);return q}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),r=d(a.to);if(b||r)return{start:function(){function a(){return function(){s(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());r&&
d.push(r.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/**
 * angular-chosen-localytics - Angular Chosen directive is an AngularJS Directive that brings the Chosen jQuery in a Angular way
 * @version v1.4.0
 * @link http://github.com/leocaseiro/angular-chosen
 * @license MIT
 */
(function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};angular.module("localytics.directives",[]),angular.module("localytics.directives").directive("chosen",["$timeout",function(t){var n,r,i,s;return r=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,n=["persistentCreateOption","createOptionText","createOption","skipNoResults","noResultsText","allowSingleDeselect","disableSearchThreshold","disableSearch","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","placeholderTextMultiple","placeholderTextSingle","searchContains","singleBackstrokeDelete","displayDisabledOptions","displaySelectedOptions","width","includeGroupLabelInSelected","maxShownResults"],s=function(e){return e.replace(/[A-Z]/g,function(e){return"_"+e.toLowerCase()})},i=function(e){var t;if(angular.isArray(e))return 0===e.length;if(angular.isObject(e))for(t in e)if(e.hasOwnProperty(t))return!1;return!0},{restrict:"A",require:"?ngModel",priority:1,link:function(a,l,o,d){var u,c,f,h,p,g,b,v,S,y,w;return a.disabledValuesHistory=a.disabledValuesHistory?a.disabledValuesHistory:[],l=$(l),l.addClass("localytics-chosen"),p=a.$eval(o.chosen)||{},angular.forEach(o,function(t,r){return e.call(n,r)>=0?o.$observe(r,function(e){return p[s(r)]="{{"===String(l.attr(o.$attr[r])).slice(0,2)?e:a.$eval(e),S()}):void 0}),b=function(){return l.addClass("loading").attr("disabled",!0).trigger("chosen:updated")},v=function(){return l.removeClass("loading"),angular.isDefined(o.disabled)?l.attr("disabled",o.disabled):l.attr("disabled",!1),l.trigger("chosen:updated")},u=null,c=!1,f=function(){var e;return u?l.trigger("chosen:updated"):(t(function(){u=l.chosen(p).data("chosen")}),angular.isObject(u)?e=u.default_text:void 0)},S=function(){return c?l.attr("data-placeholder",u.results_none_found).attr("disabled",!0):l.removeAttr("data-placeholder"),l.trigger("chosen:updated")},d?(g=d.$render,d.$render=function(){return g(),f()},l.on("chosen:hiding_dropdown",function(){return a.$apply(function(){return d.$setTouched()})}),o.multiple&&(w=function(){return d.$viewValue},a.$watch(w,d.$render,!0))):f(),o.$observe("disabled",function(){return l.trigger("chosen:updated")}),o.ngOptions&&d?(h=o.ngOptions.match(r),y=h[7],a.$watchCollection(y,function(e,n){var r;return r=t(function(){return angular.isUndefined(e)?b():(c=i(e),v(),S())})}),a.$on("$destroy",function(e){return"undefined"!=typeof timer&&null!==timer?t.cancel(timer):void 0})):void 0}}}])}).call(this);
/*
 AngularJS v1.5.1-build.4664+sha.a4e60cb
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,c,n){'use strict';function l(b,a,g){var d=g.baseHref(),k=b[0];return function(b,e,f){var g,h;f=f||{};h=f.expires;g=c.isDefined(f.path)?f.path:d;c.isUndefined(e)&&(h="Thu, 01 Jan 1970 00:00:00 GMT",e="");c.isString(h)&&(h=new Date(h));e=encodeURIComponent(b)+"="+encodeURIComponent(e);e=e+(g?";path="+g:"")+(f.domain?";domain="+f.domain:"");e+=h?";expires="+h.toUTCString():"";e+=f.secure?";secure":"";f=e.length+1;4096<f&&a.warn("Cookie '"+b+"' possibly not set or overflowed because it was too large ("+
f+" > 4096 bytes)!");k.cookie=e}}c.module("ngCookies",["ng"]).provider("$cookies",[function(){var b=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(a,g){return{get:function(d){return a()[d]},getObject:function(d){return(d=this.get(d))?c.fromJson(d):d},getAll:function(){return a()},put:function(d,a,m){g(d,a,m?c.extend({},b,m):b)},putObject:function(d,b,a){this.put(d,c.toJson(b),a)},remove:function(a,k){g(a,n,k?c.extend({},b,k):b)}}}]}]);c.module("ngCookies").factory("$cookieStore",
["$cookies",function(b){return{get:function(a){return b.getObject(a)},put:function(a,c){b.putObject(a,c)},remove:function(a){b.remove(a)}}}]);l.$inject=["$document","$log","$browser"];c.module("ngCookies").provider("$$cookieWriter",function(){this.$get=l})})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map
/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.bootstrap"),function(a,b,c,d){"use strict";function e(a,b){function d(d,e){if(!f){var g=a.overrideProperties(b.getOptions().ColVis,e?e.ColVis:null);c.fn.DataTable.ColVis&&d(function(){c(".ColVis_MasterButton").attr("class","ColVis_MasterButton "+g.classes.masterButton),c(".ColVis_Button").removeClass("ColVis_Button")}),f=!0}}function e(){f&&c.fn.DataTable.ColVis&&(f=!1)}var f=!1;return{integrate:d,deIntegrate:e}}function f(a){function b(a){function b(a,b){function c(){return f.hasBootstrap=!0,d.isObject(f.oClasses)?f.oClasses.sPageButtonActive="active":f.oClasses={sPageButtonActive:"active"},f}function e(a){return f.bootstrap=a,f}var f=a(b);return f.withBootstrap=c,f.withBootstrapOptions=e,f}var c=a.newOptions,e=a.fromSource,f=a.fromFnPromise;return a.newOptions=function(){return b(c)},a.fromSource=function(a){return b(e,a)},a.fromFnPromise=function(a){return b(f,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}function g(a,b){function c(a){a&&a.hasBootstrap?b.integrate(a):b.deIntegrate()}var d={preRender:c};a.registerPlugin(d)}function h(a,e,f,g,h){function i(){u.oStdClasses=d.copy(c.fn.dataTableExt.oStdClasses),u.fnPagingInfo=c.fn.dataTableExt.oApi.fnPagingInfo,u.renderer=d.copy(c.fn.DataTable.ext.renderer),c.fn.DataTable.TableTools&&(u.TableTools={classes:d.copy(c.fn.DataTable.TableTools.classes),oTags:d.copy(c.fn.DataTable.TableTools.DEFAULTS.oTags)})}function j(){c.extend(c.fn.dataTableExt.oStdClasses,u.oStdClasses),c.fn.dataTableExt.oApi.fnPagingInfo=u.fnPagingInfo,c.extend(!0,c.fn.DataTable.ext.renderer,u.renderer)}function k(){c.extend(c.fn.dataTableExt.oStdClasses,{sWrapper:"dataTables_wrapper form-inline",sFilterInput:"form-control input-sm",sLengthSelect:"form-control input-sm",sFilter:"dataTables_filter",sLength:"dataTables_length"})}function l(){c.fn.dataTableExt.oApi.fnPagingInfo=function(a){return{iStart:a._iDisplayStart,iEnd:a.fnDisplayEnd(),iLength:a._iDisplayLength,iTotal:a.fnRecordsTotal(),iFilteredTotal:a.fnRecordsDisplay(),iPage:-1===a._iDisplayLength?0:Math.ceil(a._iDisplayStart/a._iDisplayLength),iTotalPages:-1===a._iDisplayLength?0:Math.ceil(a.fnRecordsDisplay()/a._iDisplayLength)}}}function m(a){c.extend(!0,c.fn.DataTable.ext.renderer,{pageButton:{_:function(d,e,h,i,j,k){var l,m,n=d.oClasses,o=d.language?d.language.oPaginate:d.oLanguage.oPaginate,p=0,q=g.overrideProperties(f.getOptions().pagination,a?a.pagination:null),r=c("<ul></ul>",{"class":q.classes.ul}),s=function(a,b){var e,f,g,i,q=function(a){a.preventDefault(),c.fn.DataTable.ext.internal._fnPageChange(d,a.data.action,!0)};for(e=0,f=b.length;f>e;e++)if(i=b[e],c.isArray(i)){i.DT_el="li";var t=c("<"+(i.DT_el||"div")+"/>").appendTo(r);s(t,i)}else{l="",m="";var u,v=c("<li></li>");switch(i){case"ellipsis":r.append('<li class="disabled"><a href="#" onClick="event.preventDefault()">&hellip;</a></li>');break;case"first":l=o.sFirst,m=i,0>=j&&(v.addClass(n.sPageButtonDisabled),u=!0);break;case"previous":l=o.sPrevious,m=i,0>=j&&(v.addClass(n.sPageButtonDisabled),u=!0);break;case"next":l=o.sNext,m=i,j>=k-1&&(v.addClass(n.sPageButtonDisabled),u=!0);break;case"last":l=o.sLast,m=i,j>=k-1&&(v.addClass(n.sPageButtonDisabled),u=!0);break;default:l=i+1,m="",j===i&&v.addClass(n.sPageButtonActive)}l&&(v.appendTo(r),g=c("<a>",{href:"#","class":m,"aria-controls":d.sTableId,"data-dt-idx":p,tabindex:d.iTabIndex,id:0===h&&"string"==typeof i?d.sTableId+"_"+i:null}).html(l).appendTo(v),c.fn.DataTable.ext.internal._fnBindAction(g,{action:i},q),p++)}};try{var t=c(b.activeElement).data("dt-idx"),u=c(e).empty();r.appendTo(u),s(u,i),null!==t&&c(e).find("[data-dt-idx="+t+"]").focus()}catch(v){}}}})}function n(a){d.isFunction(a)&&t.push(a)}function o(a){s||(i(),k(),l(),m(a),n(function(){c("div.dataTables_filter").find("input").addClass("form-control"),c("div.dataTables_length").find("select").addClass("form-control")}),s=!0)}function p(a){return a.dom&&a.dom!==h.dom?a.dom:f.getOptions().dom}function q(b){o(b.bootstrap),a.integrate(b.bootstrap),e.integrate(n,b.bootstrap),b.dom=p(b),d.isUndefined(b.fnDrawCallback)&&(b.fnDrawCallback=function(){for(var a=0;a<t.length;a++)t[a]()})}function r(){s&&(j(),a.deIntegrate(),e.deIntegrate(),s=!1)}var s=!1,t=[],u={};return{integrate:q,deIntegrate:r}}function i(a,b,c){function d(){return b.overrideProperties(c,a.bootstrapOptions)}return{getOptions:d}}function j(a,b){function e(d){if(!h){if(g(),c.fn.DataTable.TableTools){var e=a.overrideProperties(b.getOptions().TableTools,d?d.TableTools:null);c.extend(!0,c.fn.DataTable.TableTools.classes,e.classes),c.extend(!0,c.fn.DataTable.TableTools.DEFAULTS.oTags,e.DEFAULTS.oTags)}h=!0}}function f(){h&&c.fn.DataTable.TableTools&&i.TableTools&&(c.extend(!0,c.fn.DataTable.TableTools.classes,i.TableTools.classes),c.extend(!0,c.fn.DataTable.TableTools.DEFAULTS.oTags,i.TableTools.oTags),h=!1)}function g(){c.fn.DataTable.TableTools&&(i.TableTools={classes:d.copy(c.fn.DataTable.TableTools.classes),oTags:d.copy(c.fn.DataTable.TableTools.DEFAULTS.oTags)})}var h=!1,i={};return{integrate:e,deIntegrate:f}}d.module("datatables.bootstrap.colvis",["datatables.bootstrap.options","datatables.util"]).service("DTBootstrapColVis",e),e.$inject=["DTPropertyUtil","DTBootstrapDefaultOptions"],d.module("datatables.bootstrap",["datatables.bootstrap.options","datatables.bootstrap.tabletools","datatables.bootstrap.colvis"]).config(f).run(g).service("DTBootstrap",h),f.$inject=["$provide"],g.$inject=["DTRendererService","DTBootstrap"],h.$inject=["DTBootstrapTableTools","DTBootstrapColVis","DTBootstrapDefaultOptions","DTPropertyUtil","DT_DEFAULT_OPTIONS"],d.module("datatables.bootstrap.options",["datatables.options","datatables.util"]).constant("DT_BOOTSTRAP_DEFAULT_OPTIONS",{TableTools:{classes:{container:"DTTT btn-group",buttons:{normal:"btn btn-default",disabled:"disabled"},collection:{container:"DTTT_dropdown dropdown-menu",buttons:{normal:"",disabled:"disabled"}},print:{info:"DTTT_print_info modal"},select:{row:"active"}},DEFAULTS:{oTags:{collection:{container:"ul",button:"li",liner:"a"}}}},ColVis:{classes:{masterButton:"btn btn-default"}},pagination:{classes:{ul:"pagination"}},dom:"<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>"}).factory("DTBootstrapDefaultOptions",i),i.$inject=["DTDefaultOptions","DTPropertyUtil","DT_BOOTSTRAP_DEFAULT_OPTIONS"],d.module("datatables.bootstrap.tabletools",["datatables.bootstrap.options","datatables.util"]).service("DTBootstrapTableTools",j),j.$inject=["DTPropertyUtil","DTBootstrapDefaultOptions"]}(window,document,jQuery,angular);
/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.buttons"),function(a,b,c,d){"use strict";function e(a,b){function c(a){function c(a,c){function e(a){var c="B";if(f.dom=f.dom?f.dom:b.dom,-1===f.dom.indexOf(c)&&(f.dom=c+f.dom),d.isUndefined(a))throw new Error("You must define the options for the button extension. See https://datatables.net/reference/option/buttons#Examples for some example");return f.buttons=a,f}var f=a(c);return f.withButtons=e,f}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return c(e)},a.fromSource=function(a){return c(f,a)},a.fromFnPromise=function(a){return c(g,a)},a}a.decorator("DTOptionsBuilder",c),c.$inject=["$delegate"]}function f(a){function b(a){d.isArray(a.buttons)&&(a.buttonsTmp=a.buttons.slice())}function c(a){d.isDefined(a.buttonsTmp)&&(a.buttons=a.buttonsTmp,delete a.buttonsTmp)}var e={preRender:b,postRender:c};a.registerPlugin(e)}d.module("datatables.buttons",["datatables"]).config(e).run(f),e.$inject=["$provide","DT_DEFAULT_OPTIONS"],f.$inject=["DTRendererService"]}(window,document,jQuery,angular);
/*!
 * angular-datatables - v0.5.7
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables"),function(a,b,c,d){"use strict";function e(a,b,c,e,f,g){function h(a){var b=a[0].innerHTML;return function(a,c,e,g){function h(a,d){a!==d&&g.render(c,g.buildOptionsPromise(),b)}var i=e.dtDisableDeepWatchers?"$watchCollection":"$watch";d.forEach(["dtColumns","dtColumnDefs","dtOptions"],function(b){a[i].call(a,b,h,!0)}),f.showLoading(c,a),g.render(c,g.buildOptionsPromise(),b)}}function i(h){function i(){var e=a.defer();return a.all([a.when(h.dtOptions),a.when(h.dtColumns),a.when(h.dtColumnDefs)]).then(function(e){var f=e[0],h=e[1],i=e[2];g.deleteProperty(f,"$promise"),g.deleteProperty(h,"$promise"),g.deleteProperty(i,"$promise");var j;if(d.isDefined(f)&&(j={},d.extend(j,f),d.isArray(h)&&(j.aoColumns=h),d.isArray(i)&&(j.aoColumnDefs=i),j.language&&j.language.url)){var k=a.defer(),l=j.language.url;b.get(j.language.url).then(function(a){k.resolve(a)},function(){c.error("Could not fetch the content of the language from "+l)}),j.language=k.promise}return g.resolveObjectPromises(j,["data","aaData","fnPromise"])}).then(function(a){e.resolve(a)}),e.promise}function j(a,b,c){b.then(function(b){f.preRender(b);var d=h.datatable&&"ng"===h.datatable;l&&l._renderer?l._renderer.withOptions(b).render(a,h,c).then(function(a){l=a,k(a)}):e.fromOptions(b,d).render(a,h,c).then(function(a){l=a,k(a)})})}function k(a){d.isFunction(h.dtInstance)?h.dtInstance(a):d.isDefined(h.dtInstance)&&(h.dtInstance=a)}var l,m=this;m.buildOptionsPromise=i,m.render=j}return h.$inject=["tElm"],i.$inject=["$scope"],{restrict:"A",scope:{dtOptions:"=",dtColumns:"=",dtColumnDefs:"=",datatable:"@",dtInstance:"="},compile:h,controller:i}}function f(){var a={withOption:function(a,b){return d.isString(a)&&(this[a]=b),this},withSource:function(a){return this.ajax=a,this},withDataProp:function(a){return this.sAjaxDataProp=a,this},withFnServerData:function(a){if(!d.isFunction(a))throw new Error("The parameter must be a function");return this.fnServerData=a,this},withPaginationType:function(a){if(!d.isString(a))throw new Error("The pagination type must be provided");return this.sPaginationType=a,this},withLanguage:function(a){return this.language=a,this},withLanguageSource:function(a){return this.withLanguage({url:a})},withDisplayLength:function(a){return this.iDisplayLength=a,this},withFnPromise:function(a){return this.fnPromise=a,this},withDOM:function(a){return this.dom=a,this}};return{newOptions:function(){return Object.create(a)},fromSource:function(b){var c=Object.create(a);return c.ajax=b,c},fromFnPromise:function(b){var c=Object.create(a);return c.fnPromise=b,c}}}function g(){var a={withOption:function(a,b){return d.isString(a)&&(this[a]=b),this},withTitle:function(a){return this.sTitle=a,this},withClass:function(a){return this.sClass=a,this},notVisible:function(){return this.bVisible=!1,this},notSortable:function(){return this.bSortable=!1,this},renderWith:function(a){return this.mRender=a,this}};return{newColumn:function(b,c){if(d.isUndefined(b))throw new Error('The parameter "mData" is not defined!');var e=Object.create(a);return e.mData=b,d.isDefined(c)&&(e.sTitle=c),e},DTColumn:a}}function h(a){return{newColumnDef:function(b){if(d.isUndefined(b))throw new Error('The parameter "targets" must be defined! See https://datatables.net/reference/option/columnDefs.targets');var c=Object.create(a.DTColumn);return d.isArray(b)?c.aTargets=b:c.aTargets=[b],c}}}function i(a,b,c){return{compileHtml:function(e){return a(d.element('<div class="'+c+'">'+b.loadingTemplate+"</div>"))(e)},isLoading:function(a){return a.hasClass(c)}}}function j(){function a(a){var b=Object.create(f);return b._renderer=a,b}function b(a,b){b.id=a.id,b.DataTable=a.DataTable,b.dataTable=a.dataTable}function c(a,b){this._renderer.reloadData(a,b)}function d(a){this._renderer.changeData(a)}function e(){this._renderer.rerender()}var f={reloadData:c,changeData:d,rerender:e};return{newDTInstance:a,copyDTProperties:b}}function k(){c.fn.DataTable.Api&&c.fn.DataTable.Api.register("ngDestroy()",function(b){return b=b||!1,this.iterator("table",function(d){var e,f=d.nTableWrapper.parentNode,g=d.oClasses,h=d.nTable,i=d.nTBody,j=d.nTHead,k=d.nTFoot,l=c(h),m=c(i),n=c(d.nTableWrapper),o=c.map(d.aoData,function(a){return a.nTr});d.bDestroying=!0,c.fn.DataTable.ext.internal._fnCallbackFire(d,"aoDestroyCallback","destroy",[d]),b||new c.fn.DataTable.Api(d).columns().visible(!0),n.unbind(".DT").find(":not(tbody *)").unbind(".DT"),c(a).unbind(".DT-"+d.sInstance),h!==j.parentNode&&(l.children("thead").detach(),l.append(j)),k&&h!==k.parentNode&&(l.children("tfoot").detach(),l.append(k)),l.detach(),n.detach(),d.aaSorting=[],d.aaSortingFixed=[],c.fn.DataTable.ext.internal._fnSortingClasses(d),c(o).removeClass(d.asStripeClasses.join(" ")),c("th, td",j).removeClass(g.sSortable+" "+g.sSortableAsc+" "+g.sSortableDesc+" "+g.sSortableNone),d.bJUI&&(c("th span."+g.sSortIcon+", td span."+g.sSortIcon,j).detach(),c("th, td",j).each(function(){var a=c("div."+g.sSortJUIWrapper,this);c(this).append(a.contents()),a.detach()})),!b&&f&&(f.contains(d.nTableReinsertBefore)?f.insertBefore(h,d.nTableReinsertBefore):f.appendChild(h)),l.css("width",d.sDestroyWidth).removeClass(g.sTable),e=d.asDestroyStripes.length,e&&m.children().each(function(a){c(this).addClass(d.asDestroyStripes[a%e])});var p=c.inArray(d,c.fn.DataTable.settings);-1!==p&&c.fn.DataTable.settings.splice(p,1)})})}function l(){function a(a){return j.loadingTemplate=a,j}function b(a){return c.ajax({dataType:"json",url:a,success:function(a){c.extend(!0,c.fn.DataTable.defaults,{language:a})}}),j}function e(a){return c.extend(!0,c.fn.DataTable.defaults,{language:a}),j}function f(a){return c.extend(c.fn.DataTable.defaults,{displayLength:a}),j}function g(a){return j.bootstrapOptions=a,j}function h(a){return c.extend(c.fn.DataTable.defaults,{dom:a}),j}function i(a,b){if(d.isString(a)){var e={};e[a]=b,c.extend(c.fn.DataTable.defaults,e)}}var j={loadingTemplate:"<h3>Loading...</h3>",bootstrapOptions:{},setLoadingTemplate:a,setLanguageSource:b,setLanguage:e,setDisplayLength:f,setBootstrapOptions:g,setDOM:h,setOption:i};return j}function m(a){function b(b,c){var e=d.element(a.compileHtml(c));b.after(e),b.hide(),e.show()}function e(b){b.show();var c=b.next();a.isLoading(c)&&c.remove()}function f(a,b){var e="#"+a.attr("id");c.fn.dataTable.isDataTable(e)&&d.isObject(b)&&(b.destroy=!0);var f=a.DataTable(b),g=a.dataTable(),h={id:a.attr("id"),DataTable:f,dataTable:g};return i(b,h),h}function g(a,b){return l.hideLoading(a),l.renderDataTable(a,b)}function h(a){k.push(a)}function i(a,b){d.forEach(k,function(c){d.isFunction(c.postRender)&&c.postRender(a,b)})}function j(a){d.forEach(k,function(b){d.isFunction(b.preRender)&&b.preRender(a)})}var k=[],l={showLoading:b,hideLoading:e,renderDataTable:f,hideLoadingAndRenderDataTable:g,registerPlugin:h,postRender:i,preRender:j};return l}function n(){return{withOptions:function(a){return this.options=a,this}}}function o(a,b,c,d){function e(e){function f(b,e){k=b,l=e;var f=d.newDTInstance(m),g=c.hideLoadingAndRenderDataTable(b,m.options);return j=g.DataTable,d.copyDTProperties(g,f),a.when(f)}function g(){}function h(){}function i(){j.destroy(),c.showLoading(k,l),f(k,l)}var j,k,l,m=Object.create(b);return m.name="DTDefaultRenderer",m.options=e,m.render=f,m.reloadData=g,m.changeData=h,m.rerender=i,m}return{create:e}}function p(a,b,c,d,e,f,g){function h(h){function i(a,c,e){n=e,p=a,q=c.$parent,s=g.newDTInstance(t);var h=b.defer(),i=n.match(/<tbody([\s\S]*)<\/tbody>/i),j=i[1],k=j.match(/^\s*.+?\s+in\s+([a-zA-Z0-9\.-_$]*)\s*/m);if(!k)throw new Error('Expected expression in form of "_item_ in _collection_[ track by _id_]" but got "{0}".',j);var l=k[1],r=!1;return q.$watchCollection(l,function(){o&&r&&m(),d(function(){r=!0,f.preRender(t.options);var a=f.hideLoadingAndRenderDataTable(p,t.options);o=a.DataTable,g.copyDTProperties(a,s),h.resolve(s)},0,!1)},!0),h.promise}function j(){a.warn("The Angular Renderer does not support reloading data. You need to do it directly on your model")}function k(){a.warn("The Angular Renderer does not support changing the data. You need to change your model directly.")}function l(){m(),f.showLoading(p,q),f.preRender(h),d(function(){var a=f.hideLoadingAndRenderDataTable(p,t.options);o=a.DataTable,g.copyDTProperties(a,s)},0,!1)}function m(){r&&r.$destroy(),o.ngDestroy(),p.html(n),r=q.$new(),c(p.contents())(r)}var n,o,p,q,r,s,t=Object.create(e);return t.name="DTNGRenderer",t.options=h,t.render=i,t.reloadData=j,t.changeData=k,t.rerender=l,t}return{create:h}}function q(a,b,c,e,f,g){function h(h){function i(b,c){var d=a.defer();return t=g.newDTInstance(v),r=b,s=c,m(v.options.fnPromise,f.renderDataTable).then(function(a){q=a.DataTable,g.copyDTProperties(a,t),d.resolve(t)}),d.promise}function j(a,b){var e=q&&q.page()?q.page():0;d.isFunction(v.options.fnPromise)?m(v.options.fnPromise,p).then(function(c){d.isFunction(a)&&a(c.DataTable.data()),b===!1&&c.DataTable.page(e).draw(!1)}):c.warn("In order to use the reloadData functionality with a Promise renderer, you need to provide a function that returns a promise.")}function k(a){v.options.fnPromise=a,s.dtOptions.fnPromise=a,m(v.options.fnPromise,p)}function l(){q.destroy(),f.showLoading(r,s),f.preRender(h),i(r,s)}function m(b,c){var e=a.defer();if(d.isUndefined(b))throw new Error("You must provide a promise or a function that returns a promise!");return u?u.then(function(){e.resolve(n(b,c))}):e.resolve(n(b,c)),e.promise}function n(b,c){var e=a.defer();return u=d.isFunction(b)?b():b,u.then(function(a){var b=a;if(v.options.sAjaxDataProp)for(var d=v.options.sAjaxDataProp.split(".");d.length;){var f=d.shift();f in b&&(b=b[f])}u=null,e.resolve(o(v.options,r,b,c))}),e.promise}function o(c,d,e,g){var h=a.defer();return delete e.$promise,c.aaData=e,b(function(){f.hideLoading(d),c.bDestroy=!0,h.resolve(g(d,c))},0,!1),h.promise}function p(a,b){return q.clear(),q.rows.add(b.aaData).draw(b.redraw),{id:t.id,DataTable:t.DataTable,dataTable:t.dataTable}}var q,r,s,t,u=null,v=Object.create(e);return v.name="DTPromiseRenderer",v.options=h,v.render=i,v.reloadData=j,v.changeData=k,v.rerender=l,v}return{create:h}}function r(a,b,c,e,f,g){function h(h){function i(b,c){p=b,q=c;var e=a.defer(),h=g.newDTInstance(r);return d.isUndefined(r.options.sAjaxDataProp)&&(r.options.sAjaxDataProp=f.sAjaxDataProp),d.isUndefined(r.options.aoColumns)&&(r.options.aoColumns=f.aoColumns),m(r.options,b).then(function(a){o=a.DataTable,g.copyDTProperties(a,h),e.resolve(h)}),e.promise}function j(a,b){o&&o.ajax.reload(a,b)}function k(a){r.options.ajax=a,q.dtOptions.ajax=a}function l(){e.preRender(h),i(p,q)}function m(c,d){var f=a.defer();return c.bDestroy=!0,o&&(o.destroy(),e.showLoading(p,q),d.empty()),e.hideLoading(d),n(c)?b(function(){f.resolve(e.renderDataTable(d,c))},0,!1):f.resolve(e.renderDataTable(d,c)),f.promise}function n(a){return d.isDefined(a)&&d.isDefined(a.dom)?a.dom.indexOf("S")>=0:!1}var o,p,q,r=Object.create(c);return r.name="DTAjaxRenderer",r.options=h,r.render=i,r.reloadData=j,r.changeData=k,r.rerender=l,r}return{create:h}}function s(a,b,c,e){function f(f,g){if(g){if(f&&f.serverSide)throw new Error("You cannot use server side processing along with the Angular renderer!");return b.create(f)}if(d.isDefined(f)){if(d.isDefined(f.fnPromise)&&null!==f.fnPromise){if(f.serverSide)throw new Error("You cannot use server side processing along with the Promise renderer!");return c.create(f)}return d.isDefined(f.ajax)&&null!==f.ajax||d.isDefined(f.ajax)&&null!==f.ajax?e.create(f):a.create(f)}return a.create()}return{fromOptions:f}}function t(a){function b(a,c){var e=d.copy(a);if((d.isUndefined(e)||null===e)&&(e={}),d.isUndefined(c)||null===c)return e;if(d.isObject(c))for(var f in c)c.hasOwnProperty(f)&&(e[f]=b(e[f],c[f]));else e=d.copy(c);return e}function e(a,b){d.isObject(a)&&delete a[b]}function f(b,e){var f=a.defer(),h=[],i={},j=e||[];if(!d.isObject(b)||d.isArray(b))f.resolve(b);else{i=d.extend(i,b);for(var k in i)i.hasOwnProperty(k)&&-1===c.inArray(k,j)&&(d.isArray(i[k])?h.push(g(i[k])):h.push(a.when(i[k])));a.all(h).then(function(a){var b=0;for(var d in i)i.hasOwnProperty(d)&&-1===c.inArray(d,j)&&(i[d]=a[b++]);f.resolve(i)})}return f.promise}function g(b){var c=a.defer(),e=[],g=[];return d.isArray(b)?(d.forEach(b,function(b){d.isObject(b)?e.push(f(b)):e.push(a.when(b))}),a.all(e).then(function(a){d.forEach(a,function(a){g.push(a)}),c.resolve(g)})):c.resolve(b),c.promise}return{overrideProperties:b,deleteProperty:e,resolveObjectPromises:f,resolveArrayPromises:g}}d.module("datatables.directive",["datatables.instances","datatables.renderer","datatables.options","datatables.util"]).directive("datatable",e),e.$inject=["$q","$http","$log","DTRendererFactory","DTRendererService","DTPropertyUtil"],d.module("datatables.factory",[]).factory("DTOptionsBuilder",f).factory("DTColumnBuilder",g).factory("DTColumnDefBuilder",h).factory("DTLoadingTemplate",i),h.$inject=["DTColumnBuilder"],i.$inject=["$compile","DTDefaultOptions","DT_LOADING_CLASS"],d.module("datatables.instances",["datatables.util"]).factory("DTInstanceFactory",j),d.module("datatables",["datatables.directive","datatables.factory"]).run(k),d.module("datatables.options",[]).constant("DT_DEFAULT_OPTIONS",{sAjaxDataProp:"",aoColumns:[]}).constant("DT_LOADING_CLASS","dt-loading").service("DTDefaultOptions",l),d.module("datatables.renderer",["datatables.instances","datatables.factory","datatables.options","datatables.instances"]).factory("DTRendererService",m).factory("DTRenderer",n).factory("DTDefaultRenderer",o).factory("DTNGRenderer",p).factory("DTPromiseRenderer",q).factory("DTAjaxRenderer",r).factory("DTRendererFactory",s),m.$inject=["DTLoadingTemplate"],o.$inject=["$q","DTRenderer","DTRendererService","DTInstanceFactory"],p.$inject=["$log","$q","$compile","$timeout","DTRenderer","DTRendererService","DTInstanceFactory"],q.$inject=["$q","$timeout","$log","DTRenderer","DTRendererService","DTInstanceFactory"],r.$inject=["$q","$timeout","DTRenderer","DTRendererService","DT_DEFAULT_OPTIONS","DTInstanceFactory"],s.$inject=["DTDefaultRenderer","DTNGRenderer","DTPromiseRenderer","DTAjaxRenderer"],d.module("datatables.util",[]).factory("DTPropertyUtil",t),t.$inject=["$q"]}(window,document,jQuery,angular);
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.angularFootable=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    'use strict';

    angular
        .module('ui.footable', [])
        .directive('footable', function() {
            var events = {
                beforeFiltering: 'footable_filtering'
            };
            var extractSpecOpts = function(opts, attrs) {
                var extracted = {},
                    k;
                for (k in opts) {
                    if (k !== 'filter' && (!angular.isUndefined(events[k]))) {
                        if(!angular.isFunction(scope.$eval(attrs[k]))) {
                            extracted[k] = attrs[k];
                        }
                    }
                }
                return extracted;
            };

            var bindEventHandler = function(tableObj, scope, attrs) {
                var k;
                for (k in attrs) {
                    if (k !== 'filter' && (!angular.isUndefined(events[k]))) {
                        var targetEventName = events[k];
                        if(angular.isFunction(scope.$eval(attrs[k]))) {
                            tableObj.bind(targetEventName, scope.$eval(attrs[k]));
                        }
                    }
                }
            };

            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                    var tableOpts = {
                        'event-filtering': null
                    };

                    angular.extend(
                        tableOpts,
                        footable.options
                    );

                    angular.extend(
                        tableOpts,
                        extractSpecOpts(tableOpts, attrs)
                    );

                    var tableObj = element.footable(tableOpts);

                    bindEventHandler(tableObj, scope, attrs);

                }
            };
        });

},{}]},{},[1])

(1)
});


/**
 * highcharts-ng
 * @version v0.0.12 - 2016-08-07
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="highcharts-ng"),function(){"use strict";function a(a,b,c){void 0===c&&(c=0),c<0&&(c+=a.length),c<0&&(c=0);for(var d=a.length;c<d;c++)if(c in a&&a[c]===b)return c;return-1}function b(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);return c.apply(this,a),d?d.apply(this,a):void 0}}function c(a,b){if(angular.isArray(b)){a=angular.isArray(a)?a:[];for(var d=0;d<b.length;d++)a[d]=c(a[d]||{},b[d])}else if(angular.isObject(b)){a=angular.isObject(a)?a:{};for(var e in b)a[e]=c(a[e]||{},b[e])}else a=b;return a}function d(a,b){function c(){return d}var d=a.when(b.Highcharts);return{getHighcharts:c,ready:function(a,b){c().then(function(){a.call(b)})}}}function e(d,e){function f(b,c,d,f){var g={},h=!1,k=function(b,d){var e,f=[];if(b){var j=i(b);if(j&&!c.disableDataWatch)return!1;if(angular.forEach(b,function(a,b){f.push(a.id);var c=h.get(a.id);if(c)if(angular.equals(g[a.id],o(a)))if(void 0!==a.visible&&c.visible!==a.visible&&c.setVisible(a.visible,!1),b<d.length){var e=d[b],i=angular.copy(e),j=a.data[a.data.length-1];i.data.push(j),angular.equals(i,a)?c.addPoint(j,!1):(i.data.shift(),angular.equals(i,a)?c.addPoint(j,!1,!0):c.setData(angular.copy(a.data),!1))}else c.setData(angular.copy(a.data),!1);else c.update(angular.copy(a),!1);else h.addSeries(angular.copy(a),!1);g[a.id]=o(a)}),c.config.noData){var k=!1;for(e=0;e<b.length;e++)if(b[e].data&&b[e].data.length>0){k=!0;break}k?h.hideLoading():h.showLoading(c.config.noData)}}for(e=h.series.length-1;e>=0;e--){var l=h.series[e];"highcharts-navigator-series"!==l.options.id&&a(f,l.options.id)<0&&l.remove(!1)}return!0},q=function(){h&&h.destroy(),g={};var a=c.config||{},e=l(c,d,a),f=a.func||void 0,i=p(c);h=new b[i](e,f);for(var k=0;k<j.length;k++)a[j[k]]&&n(h,a[j[k]],j[k]);a.loading&&h.showLoading(),a.getHighcharts=function(){return h}};q(),c.disableDataWatch?c.$watchCollection("config.series",function(a,b){k(a),h.redraw()}):c.$watch("config.series",function(a,b){var c=k(a,b);c&&h.redraw()},!0),c.$watch("config.title",function(a){h.setTitle(a,!0)},!0),c.$watch("config.subtitle",function(a){h.setTitle(!0,a)},!0),c.$watch("config.loading",function(a){a?h.showLoading(a===!0?null:a):h.hideLoading()}),c.$watch("config.noData",function(a){c.config&&c.config.loading&&h.showLoading(a)},!0),c.$watch("config.credits.enabled",function(a){a?h.credits.show():h.credits&&h.credits.hide()}),c.$watch(p,function(a,b){a!==b&&q()}),angular.forEach(j,function(a){c.$watch("config."+a,function(b){if(b){if(angular.isArray(b))for(var c=0;c<b.length;c++){var d=b[c];c<h[a].length&&(h[a][c].update(d,!1),m(h[a][c],angular.copy(d)))}else h[a][0].update(b,!1),m(h[a][0],angular.copy(b));h.redraw()}},!0)}),c.$watch("config.options",function(a,b,c){a!==b&&(q(),k(c.config.series),h.redraw())},!0),c.$watch("config.size",function(a,b){a!==b&&a&&h.setSize(a.width||h.chartWidth,a.height||h.chartHeight)},!0),c.$on("highchartsng.reflow",function(){h.reflow()}),c.$on("$destroy",function(){if(h){try{h.destroy()}catch(a){}e(function(){d.remove()},0)}})}function g(a,b,c){function e(d){f(Highcharts,a,b,c)}d.getHighcharts().then(e)}var h=0,i=function(a){var b=!1;return angular.forEach(a,function(a){angular.isDefined(a.id)||(a.id="series-"+h++,b=!0)}),b},j=["xAxis","yAxis"],k={stock:"StockChart",map:"Map",chart:"Chart"},l=function(a,d,f){var g={},h={chart:{events:{}},title:{},subtitle:{},series:[],credits:{},plotOptions:{},navigator:{enabled:!1},xAxis:{events:{}},yAxis:{events:{}}};return g=f.options?c(h,f.options):h,g.chart.renderTo=d[0],angular.forEach(j,function(d){angular.isDefined(f[d])&&(g[d]=c(g[d]||{},f[d]),(angular.isDefined(f[d].currentMin)||angular.isDefined(f[d].currentMax))&&(b(g.chart.events,"selection",function(b){var c=this;b[d]?a.$apply(function(){a.config[d].currentMin=b[d][0].min,a.config[d].currentMax=b[d][0].max}):a.$apply(function(){a.config[d].currentMin=c[d][0].dataMin,a.config[d].currentMax=c[d][0].dataMax})}),b(g.chart.events,"addSeries",function(b){a.config[d].currentMin=this[d][0].min||a.config[d].currentMin,a.config[d].currentMax=this[d][0].max||a.config[d].currentMax}),b(g[d].events,"setExtremes",function(b){b.trigger&&"zoom"!==b.trigger&&e(function(){a.config[d].currentMin=b.min,a.config[d].currentMax=b.max,a.config[d].min=b.min,a.config[d].max=b.max},0)})))}),f.title&&(g.title=f.title),f.subtitle&&(g.subtitle=f.subtitle),f.credits&&(g.credits=f.credits),f.size&&(f.size.width&&(g.chart.width=f.size.width),f.size.height&&(g.chart.height=f.size.height)),g},m=function(a,b){var c=a.getExtremes();b.currentMin===c.dataMin&&b.currentMax===c.dataMax||(a.setExtremes?a.setExtremes(b.currentMin,b.currentMax,!1):a.detachedsetExtremes(b.currentMin,b.currentMax,!1))},n=function(a,b,c){(b.currentMin||b.currentMax)&&a[c][0].setExtremes(b.currentMin,b.currentMax,!0)},o=function(a){return angular.extend(c({},a),{data:null,visible:null})},p=function(a){return void 0===a.config?"Chart":k[(""+a.config.chartType).toLowerCase()]||(a.config.useHighStocks?"StockChart":"Chart")};return{restrict:"EAC",replace:!0,template:"<div></div>",scope:{config:"=",disableDataWatch:"="},link:g}}angular.module("highcharts-ng",[]).factory("highchartsNG",["$q","$window",d]).directive("highchart",["highchartsNG","$timeout",e])}();
/*
 AngularJS v1.5.0
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(Q,d,G){'use strict';function H(t,g){g=g||{};d.forEach(g,function(d,q){delete g[q]});for(var q in t)!t.hasOwnProperty(q)||"$"===q.charAt(0)&&"$"===q.charAt(1)||(g[q]=t[q]);return g}var z=d.$$minErr("$resource"),N=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var t=/^https?:\/\/[^\/]*/,g=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$log","$q","$timeout",function(q,M,I,J){function A(d,h){return encodeURIComponent(d).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,h?"%20":"+")}function B(d,h){this.template=d;this.defaults=v({},g.defaults,h);this.urlParams={}}function K(e,h,n,k){function c(a,b){var c={};b=v({},h,b);u(b,function(b,h){x(b)&&(b=b());var f;if(b&&b.charAt&&"@"==b.charAt(0)){f=a;var l=b.substr(1);if(null==l||""===l||"hasOwnProperty"===l||!N.test("."+
l))throw z("badmember",l);for(var l=l.split("."),m=0,k=l.length;m<k&&d.isDefined(f);m++){var r=l[m];f=null!==f?f[r]:G}}else f=b;c[h]=f});return c}function O(a){return a.resource}function m(a){H(a||{},this)}var t=new B(e,k);n=v({},g.defaults.actions,n);m.prototype.toJSON=function(){var a=v({},this);delete a.$promise;delete a.$resolved;return a};u(n,function(a,b){var h=/^(POST|PUT|PATCH)$/i.test(a.method),e=a.timeout,E=d.isDefined(a.cancellable)?a.cancellable:k&&d.isDefined(k.cancellable)?k.cancellable:
g.defaults.cancellable;e&&!d.isNumber(e)&&(M.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete a.timeout,e=null);m[b]=function(f,l,k,g){var r={},n,w,C;switch(arguments.length){case 4:C=g,w=k;case 3:case 2:if(x(l)){if(x(f)){w=f;C=l;break}w=l;C=k}else{r=f;n=l;w=k;break}case 1:x(f)?
w=f:h?n=f:r=f;break;case 0:break;default:throw z("badargs",arguments.length);}var D=this instanceof m,p=D?n:a.isArray?[]:new m(n),s={},A=a.interceptor&&a.interceptor.response||O,B=a.interceptor&&a.interceptor.responseError||G,y,F;u(a,function(a,b){switch(b){default:s[b]=P(a);case "params":case "isArray":case "interceptor":case "cancellable":}});!D&&E&&(y=I.defer(),s.timeout=y.promise,e&&(F=J(y.resolve,e)));h&&(s.data=n);t.setUrlParams(s,v({},c(n,a.params||{}),r),a.url);r=q(s).then(function(f){var c=
f.data;if(c){if(d.isArray(c)!==!!a.isArray)throw z("badcfg",b,a.isArray?"array":"object",d.isArray(c)?"array":"object",s.method,s.url);if(a.isArray)p.length=0,u(c,function(b){"object"===typeof b?p.push(new m(b)):p.push(b)});else{var l=p.$promise;H(c,p);p.$promise=l}}f.resource=p;return f},function(b){(C||L)(b);return I.reject(b)});r.finally(function(){p.$resolved=!0;!D&&E&&(p.$cancelRequest=d.noop,J.cancel(F),y=F=s.timeout=null)});r=r.then(function(b){var a=A(b);(w||L)(a,b.headers);return a},B);return D?
r:(p.$promise=r,p.$resolved=!1,E&&(p.$cancelRequest=y.resolve),p)};m.prototype["$"+b]=function(a,c,d){x(a)&&(d=c,c=a,a={});a=m[b].call(this,a,this,c,d);return a.$promise||a}});m.bind=function(a){return K(e,v({},h,a),n)};return m}var L=d.noop,u=d.forEach,v=d.extend,P=d.copy,x=d.isFunction;B.prototype={setUrlParams:function(e,h,n){var k=this,c=n||k.template,g,m,q="",a=k.urlParams={};u(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw z("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+
b+"(\\W|$)")).test(c)&&(a[b]={isQueryParamValue:(new RegExp("\\?.*=:"+b+"(?:\\W|$)")).test(c)})});c=c.replace(/\\:/g,":");c=c.replace(t,function(a){q=a;return""});h=h||{};u(k.urlParams,function(a,e){g=h.hasOwnProperty(e)?h[e]:k.defaults[e];d.isDefined(g)&&null!==g?(m=a.isQueryParamValue?A(g,!0):A(g,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+e+"(\\W|$)","g"),function(a,b){return m+b})):c=c.replace(new RegExp("(/?):"+e+"(\\W|$)","g"),function(a,b,c){return"/"==
c.charAt(0)?c:b+c})});k.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");e.url=q+c.replace(/\/\\\./,"/.");u(h,function(a,c){k.urlParams[c]||(e.params=e.params||{},e.params[c]=a)})}};return K}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/*
 AngularJS v1.5.0
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(r,d,C){'use strict';function x(s,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function k(){n&&(g.cancel(n),n=null);l&&(l.$destroy(),l=null);m&&(n=g.leave(m),n.then(function(){n=null}),m=null)}function z(){var b=s.current&&s.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=s.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(u)||u&&!a.$eval(u)||h()});k()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(v)}else k()}var l,m,n,u=b.autoscroll,v=b.onload||"";a.$on("$routeChangeSuccess",z);z()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());if(b.controller){f.$scope=a;var k=h(b.controller,f);b.controllerAs&&(a[b.controllerAs]=k);c.data("$ngControllerController",k);c.children().data("$ngControllerController",k)}a[b.resolveAs||"$resolve"]=f;y(a)}}}r=d.module("ngRoute",["ng"]).provider("$route",function(){function s(a,
c){return d.extend(Object.create(a),c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&
(b.reloadOnSearch=!0);d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,k,r){function l(b){var e=
t.current;(x=(p=n())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!v)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function m(){var w=t.current,e=p;if(x)w.params=e.params,d.copy(w.params,b),a.$broadcast("$routeUpdate",w);else if(e||w)v=!1,(t.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(u(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),d.isDefined(c)&&(e.loadedTemplateUrl=r.valueOf(c),b=k(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==t.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,w))},function(b){e==t.current&&a.$broadcast("$routeChangeError",
e,w,b)})}function n(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,n=h.length;k<n;++k){var m=q[k-1],p=h[k];m&&p&&(l[m.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=s(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&s(g[null],{params:{},pathParams:{}})}function u(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var v=!1,p,x,t={routes:g,reload:function(){v=!0;var b={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=!0;v=!1}};a.$evalAsync(function(){l(b);b.defaultPrevented||m()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),c.path(u(this.current.$$route.originalPath,a)),c.search(a);else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",
m);return t}]});var B=d.$$minErr("ngRoute");r.provider("$routeParams",function(){this.$get=function(){return{}}});r.directive("ngView",x);r.directive("ngView",A);x.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*
 AngularJS v1.5.8
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(s,g){'use strict';function H(g){var l=[];t(l,A).chars(g);return l.join("")}var B=g.$$minErr("$sanitize"),C,l,D,E,q,A,F,t;g.module("ngSanitize",[]).provider("$sanitize",function(){function k(a,e){var b={},c=a.split(","),h;for(h=0;h<c.length;h++)b[e?q(c[h]):c[h]]=!0;return b}function I(a){for(var e={},b=0,c=a.length;b<c;b++){var h=a[b];e[h.name]=h.value}return e}function G(a){return a.replace(/&/g,"&amp;").replace(J,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(K,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function u(a){if(a.nodeType===s.Node.ELEMENT_NODE)for(var e=a.attributes,b=0,c=e.length;b<c;b++){var h=e[b],d=h.name.toLowerCase();if("xmlns:ns1"===d||0===d.lastIndexOf("ns1:",0))a.removeAttributeNode(h),b--,c--}(e=a.firstChild)&&u(e);(e=a.nextSibling)&&u(e)}var v=!1;this.$get=["$$sanitizeUri",function(a){v&&l(w,x);return function(e){var b=[];F(e,t(b,function(b,h){return!/^unsafe:/.test(a(b,
h))}));return b.join("")}}];this.enableSvg=function(a){return E(a)?(v=a,this):v};C=g.bind;l=g.extend;D=g.forEach;E=g.isDefined;q=g.lowercase;A=g.noop;F=function(a,e){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);f.innerHTML=a;var b=5;do{if(0===b)throw B("uinput");b--;s.document.documentMode&&u(f);a=f.innerHTML;f.innerHTML=a}while(a!==f.innerHTML);for(b=f.firstChild;b;){switch(b.nodeType){case 1:e.start(b.nodeName.toLowerCase(),I(b.attributes));break;case 3:e.chars(b.textContent)}var c;if(!(c=
b.firstChild)&&(1==b.nodeType&&e.end(b.nodeName.toLowerCase()),c=b.nextSibling,!c))for(;null==c;){b=b.parentNode;if(b===f)break;c=b.nextSibling;1==b.nodeType&&e.end(b.nodeName.toLowerCase())}b=c}for(;b=f.firstChild;)f.removeChild(b)};t=function(a,e){var b=!1,c=C(a,a.push);return{start:function(a,d){a=q(a);!b&&z[a]&&(b=a);b||!0!==w[a]||(c("<"),c(a),D(d,function(b,d){var f=q(d),g="img"===a&&"src"===f||"background"===f;!0!==m[f]||!0===n[f]&&!e(b,g)||(c(" "),c(d),c('="'),c(G(b)),c('"'))}),c(">"))},end:function(a){a=
q(a);b||!0!==w[a]||!0===y[a]||(c("</"),c(a),c(">"));a==b&&(b=!1)},chars:function(a){b||c(G(a))}}};var J=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,K=/([^\#-~ |!])/g,y=k("area,br,col,hr,img,wbr"),d=k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r=k("rp,rt"),p=l({},r,d),d=l({},d,k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),r=l({},r,k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
x=k("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),z=k("script,style"),w=l({},y,d,r,p),n=k("background,cite,href,longdesc,src,xlink:href"),p=k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
r=k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),m=l({},n,r,p),f;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw B("noinert");var e=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===e.length?f=e[0]:(e=a.createElement("html"),f=a.createElement("body"),e.appendChild(f),a.appendChild(e))})(s)});g.module("ngSanitize").filter("linky",["$sanitize",function(k){var l=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
q=/^mailto:/i,u=g.$$minErr("linky"),v=g.isDefined,s=g.isFunction,t=g.isObject,y=g.isString;return function(d,g,p){function x(a){a&&m.push(H(a))}function z(a,b){var c,d=w(a);m.push("<a ");for(c in d)m.push(c+'="'+d[c]+'" ');!v(g)||"target"in d||m.push('target="',g,'" ');m.push('href="',a.replace(/"/g,"&quot;"),'">');x(b);m.push("</a>")}if(null==d||""===d)return d;if(!y(d))throw u("notstring",d);for(var w=s(p)?p:t(p)?function(){return p}:function(){return{}},n=d,m=[],f,a;d=n.match(l);)f=d[0],d[2]||
d[4]||(f=(d[3]?"http://":"mailto:")+f),a=d.index,x(n.substr(0,a)),z(f,d[0].replace(q,"")),n=n.substring(a+d[0].length);x(n);return k(m.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('ui.sortable', [])
    .value('uiSortableConfig',{})
    .directive('uiSortable', [
        'uiSortableConfig', '$timeout', '$log',
        function(uiSortableConfig, $timeout, $log) {
            return {
                require: '?ngModel',
                scope: {
                    ngModel: '=',
                    uiSortable: '='
                },
                link: function(scope, element, attrs, ngModel) {
                    var savedNodes;

                    function combineCallbacks(first,second){
                        if(second && (typeof second === 'function')) {
                            return function() {
                                first.apply(this, arguments);
                                second.apply(this, arguments);
                            };
                        }
                        return first;
                    }

                    function getSortableWidgetInstance(element) {
                        // this is a fix to support jquery-ui prior to v1.11.x
                        // otherwise we should be using `element.sortable('instance')`
                        var data = element.data('ui-sortable');
                        if (data && typeof data === 'object' && data.widgetFullName === 'ui-sortable') {
                            return data;
                        }
                        return null;
                    }

                    function hasSortingHelper (element, ui) {
                        var helperOption = element.sortable('option','helper');
                        return helperOption === 'clone' || (typeof helperOption === 'function' && ui.item.sortable.isCustomHelperUsed());
                    }

                    // thanks jquery-ui
                    function isFloating (item) {
                        return (/left|right/).test(item.css('float')) || (/inline|table-cell/).test(item.css('display'));
                    }

                    function getElementScope(elementScopes, element) {
                        var result = null;
                        for (var i = 0; i < elementScopes.length; i++) {
                            var x = elementScopes[i];
                            if (x.element[0] === element[0]) {
                                result = x.scope;
                                break;
                            }
                        }
                        return result;
                    }

                    function afterStop(e, ui) {
                        ui.item.sortable._destroy();
                    }

                    var opts = {};

                    // directive specific options
                    var directiveOpts = {
                        'ui-floating': undefined
                    };

                    var callbacks = {
                        receive: null,
                        remove:null,
                        start:null,
                        stop:null,
                        update:null
                    };

                    var wrappers = {
                        helper: null
                    };

                    angular.extend(opts, directiveOpts, uiSortableConfig, scope.uiSortable);

                    if (!angular.element.fn || !angular.element.fn.jquery) {
                        $log.error('ui.sortable: jQuery should be included before AngularJS!');
                        return;
                    }

                    if (ngModel) {

                        // When we add or remove elements, we need the sortable to 'refresh'
                        // so it can find the new/removed elements.
                        scope.$watch('ngModel.length', function() {
                            // Timeout to let ng-repeat modify the DOM
                            $timeout(function() {
                                // ensure that the jquery-ui-sortable widget instance
                                // is still bound to the directive's element
                                if (!!getSortableWidgetInstance(element)) {
                                    element.sortable('refresh');
                                }
                            }, 0, false);
                        });

                        callbacks.start = function(e, ui) {
                            if (opts['ui-floating'] === 'auto') {
                                // since the drag has started, the element will be
                                // absolutely positioned, so we check its siblings
                                var siblings = ui.item.siblings();
                                var sortableWidgetInstance = getSortableWidgetInstance(angular.element(e.target));
                                sortableWidgetInstance.floating = isFloating(siblings);
                            }

                            // Save the starting position of dragged item
                            ui.item.sortable = {
                                model: ngModel.$modelValue[ui.item.index()],
                                index: ui.item.index(),
                                source: ui.item.parent(),
                                sourceModel: ngModel.$modelValue,
                                cancel: function () {
                                    ui.item.sortable._isCanceled = true;
                                },
                                isCanceled: function () {
                                    return ui.item.sortable._isCanceled;
                                },
                                isCustomHelperUsed: function () {
                                    return !!ui.item.sortable._isCustomHelperUsed;
                                },
                                _isCanceled: false,
                                _isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
                                _destroy: function () {
                                    angular.forEach(ui.item.sortable, function(value, key) {
                                        ui.item.sortable[key] = undefined;
                                    });
                                }
                            };
                        };

                        callbacks.activate = function(e, ui) {
                            // We need to make a copy of the current element's contents so
                            // we can restore it after sortable has messed it up.
                            // This is inside activate (instead of start) in order to save
                            // both lists when dragging between connected lists.
                            savedNodes = element.contents();

                            // If this list has a placeholder (the connected lists won't),
                            // don't inlcude it in saved nodes.
                            var placeholder = element.sortable('option','placeholder');

                            // placeholder.element will be a function if the placeholder, has
                            // been created (placeholder will be an object).  If it hasn't
                            // been created, either placeholder will be false if no
                            // placeholder class was given or placeholder.element will be
                            // undefined if a class was given (placeholder will be a string)
                            if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
                                var phElement = placeholder.element();
                                // workaround for jquery ui 1.9.x,
                                // not returning jquery collection
                                phElement = angular.element(phElement);

                                // exact match with the placeholder's class attribute to handle
                                // the case that multiple connected sortables exist and
                                // the placehoilder option equals the class of sortable items
                                var excludes = element.find('[class="' + phElement.attr('class') + '"]:not([ng-repeat], [data-ng-repeat])');

                                savedNodes = savedNodes.not(excludes);
                            }

                            // save the directive's scope so that it is accessible from ui.item.sortable
                            var connectedSortables = ui.item.sortable._connectedSortables || [];

                            connectedSortables.push({
                                element: element,
                                scope: scope
                            });

                            ui.item.sortable._connectedSortables = connectedSortables;
                        };

                        callbacks.update = function(e, ui) {
                            // Save current drop position but only if this is not a second
                            // update that happens when moving between lists because then
                            // the value will be overwritten with the old value
                            if(!ui.item.sortable.received) {
                                ui.item.sortable.dropindex = ui.item.index();
                                var droptarget = ui.item.parent();
                                ui.item.sortable.droptarget = droptarget;

                                var droptargetScope = getElementScope(ui.item.sortable._connectedSortables, droptarget);
                                ui.item.sortable.droptargetModel = droptargetScope.ngModel;

                                // Cancel the sort (let ng-repeat do the sort for us)
                                // Don't cancel if this is the received list because it has
                                // already been canceled in the other list, and trying to cancel
                                // here will mess up the DOM.
                                element.sortable('cancel');
                            }

                            // Put the nodes back exactly the way they started (this is very
                            // important because ng-repeat uses comment elements to delineate
                            // the start and stop of repeat sections and sortable doesn't
                            // respect their order (even if we cancel, the order of the
                            // comments are still messed up).
                            if (hasSortingHelper(element, ui) && !ui.item.sortable.received &&
                                element.sortable( 'option', 'appendTo' ) === 'parent') {
                                // restore all the savedNodes except .ui-sortable-helper element
                                // (which is placed last). That way it will be garbage collected.
                                savedNodes = savedNodes.not(savedNodes.last());
                            }
                            savedNodes.appendTo(element);

                            // If this is the target connected list then
                            // it's safe to clear the restored nodes since:
                            // update is currently running and
                            // stop is not called for the target list.
                            if(ui.item.sortable.received) {
                                savedNodes = null;
                            }

                            // If received is true (an item was dropped in from another list)
                            // then we add the new item to this list otherwise wait until the
                            // stop event where we will know if it was a sort or item was
                            // moved here from another list
                            if(ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                                scope.$apply(function () {
                                    ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
                                        ui.item.sortable.moved);
                                });
                            }
                        };

                        callbacks.stop = function(e, ui) {
                            // If the received flag hasn't be set on the item, this is a
                            // normal sort, if dropindex is set, the item was moved, so move
                            // the items in the list.
                            if(!ui.item.sortable.received &&
                                ('dropindex' in ui.item.sortable) &&
                                !ui.item.sortable.isCanceled()) {

                                scope.$apply(function () {
                                    ngModel.$modelValue.splice(
                                        ui.item.sortable.dropindex, 0,
                                        ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
                                });
                            } else {
                                // if the item was not moved, then restore the elements
                                // so that the ngRepeat's comment are correct.
                                if ((!('dropindex' in ui.item.sortable) || ui.item.sortable.isCanceled()) &&
                                    !hasSortingHelper(element, ui)) {
                                    savedNodes.appendTo(element);
                                }
                            }

                            // It's now safe to clear the savedNodes
                            // since stop is the last callback.
                            savedNodes = null;
                        };

                        callbacks.receive = function(e, ui) {
                            // An item was dropped here from another list, set a flag on the
                            // item.
                            ui.item.sortable.received = true;
                        };

                        callbacks.remove = function(e, ui) {
                            // Workaround for a problem observed in nested connected lists.
                            // There should be an 'update' event before 'remove' when moving
                            // elements. If the event did not fire, cancel sorting.
                            if (!('dropindex' in ui.item.sortable)) {
                                element.sortable('cancel');
                                ui.item.sortable.cancel();
                            }

                            // Remove the item from this list's model and copy data into item,
                            // so the next list can retrive it
                            if (!ui.item.sortable.isCanceled()) {
                                scope.$apply(function () {
                                    ui.item.sortable.moved = ngModel.$modelValue.splice(
                                        ui.item.sortable.index, 1)[0];
                                });
                            }
                        };

                        wrappers.helper = function (inner) {
                            if (inner && typeof inner === 'function') {
                                return function (e, item) {
                                    var innerResult = inner.apply(this, arguments);
                                    item.sortable._isCustomHelperUsed = item !== innerResult;
                                    return innerResult;
                                };
                            }
                            return inner;
                        };

                        scope.$watch('uiSortable', function(newVal /*, oldVal*/) {
                            // ensure that the jquery-ui-sortable widget instance
                            // is still bound to the directive's element
                            var sortableWidgetInstance = getSortableWidgetInstance(element);
                            if (!!sortableWidgetInstance) {
                                angular.forEach(newVal, function(value, key) {
                                    // if it's a custom option of the directive,
                                    // handle it approprietly
                                    if (key in directiveOpts) {
                                        if (key === 'ui-floating' && (value === false || value === true)) {
                                            sortableWidgetInstance.floating = value;
                                        }

                                        opts[key] = value;
                                        return;
                                    }

                                    if (callbacks[key]) {
                                        if( key === 'stop' ){
                                            // call apply after stop
                                            value = combineCallbacks(
                                                value, function() { scope.$apply(); });

                                            value = combineCallbacks(value, afterStop);
                                        }
                                        // wrap the callback
                                        value = combineCallbacks(callbacks[key], value);
                                    } else if (wrappers[key]) {
                                        value = wrappers[key](value);
                                    }

                                    opts[key] = value;
                                    element.sortable('option', key, value);
                                });
                            }
                        }, true);

                        angular.forEach(callbacks, function(value, key) {
                            opts[key] = combineCallbacks(value, opts[key]);
                            if( key === 'stop' ){
                                opts[key] = combineCallbacks(opts[key], afterStop);
                            }
                        });

                    } else {
                        $log.info('ui.sortable: ngModel not provided!', element);
                    }

                    // Create sortable
                    element.sortable(opts);
                }
            };
        }
    ]);
/*  angular-summernote v0.8.1 | (c) 2016 JeongHoon Byun | MIT license */
angular.module("summernote",[]).controller("SummernoteController",["$scope","$attrs","$timeout",function($scope,$attrs,$timeout){"use strict";var currentElement,summernoteConfig=angular.copy($scope.summernoteConfig)||{};if(angular.isDefined($attrs.height)&&(summernoteConfig.height=+$attrs.height),angular.isDefined($attrs.minHeight)&&(summernoteConfig.minHeight=+$attrs.minHeight),angular.isDefined($attrs.maxHeight)&&(summernoteConfig.maxHeight=+$attrs.maxHeight),angular.isDefined($attrs.placeholder)&&(summernoteConfig.placeholder=$attrs.placeholder),angular.isDefined($attrs.focus)&&(summernoteConfig.focus=!0),angular.isDefined($attrs.airmode)&&(summernoteConfig.airMode=!0),angular.isDefined($attrs.dialogsinbody)&&(summernoteConfig.dialogsInBody=!0),angular.isDefined($attrs.lang)){if(!angular.isDefined($.summernote.lang[$attrs.lang]))throw new Error('"'+$attrs.lang+'" lang file must be exist.');summernoteConfig.lang=$attrs.lang}summernoteConfig.callbacks=summernoteConfig.callbacks||{},angular.isDefined($attrs.onInit)&&(summernoteConfig.callbacks.onInit=function(evt){$scope.init({evt:evt})}),angular.isDefined($attrs.onEnter)&&(summernoteConfig.callbacks.onEnter=function(evt){$scope.enter({evt:evt})}),angular.isDefined($attrs.onFocus)&&(summernoteConfig.callbacks.onFocus=function(evt){$scope.focus({evt:evt})}),angular.isDefined($attrs.onPaste)&&(summernoteConfig.callbacks.onPaste=function(evt){$scope.paste({evt:evt})}),angular.isDefined($attrs.onKeyup)&&(summernoteConfig.callbacks.onKeyup=function(evt){$scope.keyup({evt:evt})}),angular.isDefined($attrs.onKeydown)&&(summernoteConfig.callbacks.onKeydown=function(evt){$scope.keydown({evt:evt})}),angular.isDefined($attrs.onImageUpload)&&(summernoteConfig.callbacks.onImageUpload=function(files){$scope.imageUpload({files:files,editable:$scope.editable})}),angular.isDefined($attrs.onMediaDelete)&&(summernoteConfig.callbacks.onMediaDelete=function(target){var removedMedia={attrs:{}};removedMedia.tagName=target[0].tagName,angular.forEach(target[0].attributes,function(attr){removedMedia.attrs[attr.name]=attr.value}),$scope.mediaDelete({target:removedMedia})}),this.activate=function(scope,element,ngModel){var updateNgModel=function(){var newValue=element.summernote("code");element.summernote("isEmpty")&&(newValue=""),ngModel&&ngModel.$viewValue!==newValue&&$timeout(function(){ngModel.$setViewValue(newValue)},0)},originalOnChange=summernoteConfig.callbacks.onChange;summernoteConfig.callbacks.onChange=function(contents){$timeout(function(){element.summernote("isEmpty")&&(contents=""),updateNgModel()},0),angular.isDefined($attrs.onChange)?$scope.change({contents:contents,editable:$scope.editable}):angular.isFunction(originalOnChange)&&originalOnChange.apply(this,arguments)},angular.isDefined($attrs.onBlur)&&(summernoteConfig.callbacks.onBlur=function(evt){!summernoteConfig.airMode&&element.blur(),$scope.blur({evt:evt})}),element.summernote(summernoteConfig);var unwatchNgModel,editor$=element.next(".note-editor");editor$.find(".note-toolbar").click(function(){updateNgModel(),editor$.hasClass("codeview")?(editor$.on("keyup",updateNgModel),ngModel&&(unwatchNgModel=scope.$watch(function(){return ngModel.$modelValue},function(newValue){editor$.find(".note-codable").val(newValue)}))):(editor$.off("keyup",updateNgModel),angular.isFunction(unwatchNgModel)&&unwatchNgModel())}),ngModel&&(ngModel.$render=function(){ngModel.$viewValue?element.summernote("code",ngModel.$viewValue):element.summernote("empty")}),angular.isDefined($attrs.editable)&&($scope.editable=editor$.find(".note-editable")),angular.isDefined($attrs.editor)&&($scope.editor=element),currentElement=element,element.on("$destroy",function(){element.summernote("destroy"),$scope.summernoteDestroyed=!0})},$scope.$on("$destroy",function(){$scope.summernoteDestroyed||currentElement.summernote("destroy")})}]).directive("summernote",[function(){"use strict";return{restrict:"EA",transclude:"element",replace:!0,require:["summernote","?ngModel"],controller:"SummernoteController",scope:{summernoteConfig:"=config",editable:"=",editor:"=",init:"&onInit",enter:"&onEnter",focus:"&onFocus",blur:"&onBlur",paste:"&onPaste",keyup:"&onKeyup",keydown:"&onKeydown",change:"&onChange",imageUpload:"&onImageUpload",mediaDelete:"&onMediaDelete"},template:'<div class="summernote"></div>',link:function(scope,element,attrs,ctrls,transclude){var summernoteController=ctrls[0],ngModel=ctrls[1];if(ngModel)var clearWatch=scope.$watch(function(){return ngModel.$viewValue},function(value){clearWatch(),element.append(value),summernoteController.activate(scope,element,ngModel)},!0);else transclude(scope,function(clone,scope){element.append(clone.html())}),summernoteController.activate(scope,element,ngModel)}}}]);
"use strict";angular.module("oitozero.ngSweetAlert",[]).factory("SweetAlert",["$rootScope",function($rootScope){var swal=window.swal,self={swal:function(arg1,arg2,arg3){$rootScope.$evalAsync(function(){"function"==typeof arg2?swal(arg1,function(isConfirm){$rootScope.$evalAsync(function(){arg2(isConfirm)})},arg3):swal(arg1,arg2,arg3)})},success:function(title,message){$rootScope.$evalAsync(function(){swal(title,message,"success")})},error:function(title,message){$rootScope.$evalAsync(function(){swal(title,message,"error")})},warning:function(title,message){$rootScope.$evalAsync(function(){swal(title,message,"warning")})},info:function(title,message){$rootScope.$evalAsync(function(){swal(title,message,"info")})},showInputError:function(message){$rootScope.$evalAsync(function(){swal.showInputError(message)})},close:function(){$rootScope.$evalAsync(function(){swal.close()})}};return self}]);

/*!
 * angular-translate - v2.5.2 - 2014-12-10
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate",["ng"]).run(["$translate",function(a){var b=a.storageKey(),c=a.storage(),d=function(){var d=a.preferredLanguage();angular.isString(d)?a.use(d):c.put(b,a.use())};c?c.get(b)?a.use(c.get(b))["catch"](d):d():angular.isString(a.preferredLanguage())&&a.use(a.preferredLanguage())}]),angular.module("pascalprecht.translate").provider("$translate",["$STORAGE_KEY",function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q={},r=[],s=a,t=[],u=!1,v="translate-cloak",w=!1,x=".",y="2.5.2",z=function(){var a,b,c=window.navigator,d=["language","browserLanguage","systemLanguage","userLanguage"];if(angular.isArray(c.languages))for(a=0;a<c.languages.length;a++)if(b=c.languages[a],b&&b.length)return b;for(a=0;a<d.length;a++)if(b=c[d[a]],b&&b.length)return b;return null};z.displayName="angular-translate/service: getFirstBrowserLanguage";var A=function(){return(z()||"").split("-").join("_")};A.displayName="angular-translate/service: getLocale";var B=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},C=function(){return this.replace(/^\s+|\s+$/g,"")},D=function(a){for(var b=[],d=angular.lowercase(a),e=0,f=r.length;f>e;e++)b.push(angular.lowercase(r[e]));if(B(b,d)>-1)return a;if(c){var g;for(var h in c){var i=!1,j=Object.prototype.hasOwnProperty.call(c,h)&&angular.lowercase(h)===angular.lowercase(a);if("*"===h.slice(-1)&&(i=h.slice(0,-1)===a.slice(0,h.length-1)),(j||i)&&(g=c[h],B(b,angular.lowercase(g))>-1))return g}}var k=a.split("_");return k.length>1&&B(b,angular.lowercase(k[0]))>-1?k[0]:a},E=function(a,b){if(!a&&!b)return q;if(a&&!b){if(angular.isString(a))return q[a]}else angular.isObject(q[a])||(q[a]={}),angular.extend(q[a],F(b));return this};this.translations=E,this.cloakClassName=function(a){return a?(v=a,this):v};var F=function(a,b,c,d){var e,f,g,h;b||(b=[]),c||(c={});for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(h=a[e],angular.isObject(h)?F(h,b.concat(e),c,e):(f=b.length?""+b.join(x)+x+e:e,b.length&&e===d&&(g=""+b.join(x),c[g]="@:"+f),c[f]=h));return c};this.addInterpolation=function(a){return t.push(a),this},this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")},this.useInterpolation=function(a){return k=a,this},this.useSanitizeValueStrategy=function(a){return u=a,this},this.preferredLanguage=function(a){return G(a),this};var G=function(a){return a&&(b=a),b};this.translationNotFoundIndicator=function(a){return this.translationNotFoundIndicatorLeft(a),this.translationNotFoundIndicatorRight(a),this},this.translationNotFoundIndicatorLeft=function(a){return a?(n=a,this):n},this.translationNotFoundIndicatorRight=function(a){return a?(o=a,this):o},this.fallbackLanguage=function(a){return H(a),this};var H=function(a){return a?(angular.isString(a)?(e=!0,d=[a]):angular.isArray(a)&&(e=!1,d=a),angular.isString(b)&&B(d,b)<0&&d.push(b),this):e?d[0]:d};this.use=function(a){if(a){if(!q[a]&&!l)throw new Error("$translateProvider couldn't find translationTable for langKey: '"+a+"'");return f=a,this}return f};var I=function(a){return a?void(s=a):i?i+s:s};this.storageKey=I,this.useUrlLoader=function(a,b){return this.useLoader("$translateUrlLoader",angular.extend({url:a},b))},this.useStaticFilesLoader=function(a){return this.useLoader("$translateStaticFilesLoader",a)},this.useLoader=function(a,b){return l=a,m=b||{},this},this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")},this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")},this.useStorage=function(a){return h=a,this},this.storagePrefix=function(a){return a?(i=a,this):a},this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")},this.useMissingTranslationHandler=function(a){return j=a,this},this.usePostCompiling=function(a){return w=!!a,this},this.determinePreferredLanguage=function(a){var c=a&&angular.isFunction(a)?a():A();return b=r.length?D(c):c,this},this.registerAvailableLanguageKeys=function(a,b){return a?(r=a,b&&(c=b),this):r},this.useLoaderCache=function(a){return a===!1?p=void 0:a===!0?p=!0:"undefined"==typeof a?p="$translationCache":a&&(p=a),this},this.$get=["$log","$injector","$rootScope","$q",function(a,c,i,r){var x,z,A,J=c.get(k||"$translateDefaultInterpolation"),K=!1,L={},M={},N=function(a,c,e){if(angular.isArray(a)){var g=function(a){for(var b={},d=[],f=function(a){var d=r.defer(),f=function(c){b[a]=c,d.resolve([a,c])};return N(a,c,e).then(f,f),d.promise},g=0,h=a.length;h>g;g++)d.push(f(a[g]));return r.all(d).then(function(){return b})};return g(a)}var i=r.defer();a&&(a=C.apply(a));var j=function(){var a=b?M[b]:M[f];if(z=0,h&&!a){var c=x.get(s);if(a=M[c],d&&d.length){var e=B(d,c);z=0===e?1:0,B(d,b)<0&&d.push(b)}}return a}();return j?j.then(function(){Z(a,c,e).then(i.resolve,i.reject)},i.reject):Z(a,c,e).then(i.resolve,i.reject),i.promise},O=function(a){return n&&(a=[n,a].join(" ")),o&&(a=[a,o].join(" ")),a},P=function(a){f=a,i.$emit("$translateChangeSuccess",{language:a}),h&&x.put(N.storageKey(),f),J.setLocale(f),angular.forEach(L,function(a,b){L[b].setLocale(f)}),i.$emit("$translateChangeEnd",{language:a})},Q=function(a){if(!a)throw"No language key specified for loading.";var b=r.defer();i.$emit("$translateLoadingStart",{language:a}),K=!0;var d=p;"string"==typeof d&&(d=c.get(d));var e=angular.extend({},m,{key:a,$http:angular.extend({},{cache:d},m.$http)});return c.get(l)(e).then(function(c){var d={};i.$emit("$translateLoadingSuccess",{language:a}),angular.isArray(c)?angular.forEach(c,function(a){angular.extend(d,F(a))}):angular.extend(d,F(c)),K=!1,b.resolve({key:a,table:d}),i.$emit("$translateLoadingEnd",{language:a})},function(a){i.$emit("$translateLoadingError",{language:a}),b.reject(a),i.$emit("$translateLoadingEnd",{language:a})}),b.promise};if(h&&(x=c.get(h),!x.get||!x.put))throw new Error("Couldn't use storage '"+h+"', missing get() or put() method!");angular.isFunction(J.useSanitizeValueStrategy)&&J.useSanitizeValueStrategy(u),t.length&&angular.forEach(t,function(a){var d=c.get(a);d.setLocale(b||f),angular.isFunction(d.useSanitizeValueStrategy)&&d.useSanitizeValueStrategy(u),L[d.getInterpolationIdentifier()]=d});var R=function(a){var b=r.defer();return Object.prototype.hasOwnProperty.call(q,a)?b.resolve(q[a]):M[a]?M[a].then(function(a){E(a.key,a.table),b.resolve(a.table)},b.reject):b.reject(),b.promise},S=function(a,b,c,d){var e=r.defer();return R(a).then(function(g){Object.prototype.hasOwnProperty.call(g,b)?(d.setLocale(a),e.resolve(d.interpolate(g[b],c)),d.setLocale(f)):e.reject()},e.reject),e.promise},T=function(a,b,c,d){var e,g=q[a];return g&&Object.prototype.hasOwnProperty.call(g,b)&&(d.setLocale(a),e=d.interpolate(g[b],c),d.setLocale(f)),e},U=function(a){if(j){var b=c.get(j)(a,f);return void 0!==b?b:a}return a},V=function(a,b,c,e){var f=r.defer();if(a<d.length){var g=d[a];S(g,b,c,e).then(f.resolve,function(){V(a+1,b,c,e).then(f.resolve)})}else f.resolve(U(b));return f.promise},W=function(a,b,c,e){var f;if(a<d.length){var g=d[a];f=T(g,b,c,e),f||(f=W(a+1,b,c,e))}return f},X=function(a,b,c){return V(A>0?A:z,a,b,c)},Y=function(a,b,c){return W(A>0?A:z,a,b,c)},Z=function(a,b,c){var e=r.defer(),g=f?q[f]:q,h=c?L[c]:J;if(g&&Object.prototype.hasOwnProperty.call(g,a)){var i=g[a];"@:"===i.substr(0,2)?N(i.substr(2),b,c).then(e.resolve,e.reject):e.resolve(h.interpolate(i,b))}else{var k;j&&!K&&(k=U(a)),f&&d&&d.length?X(a,b,h).then(function(a){e.resolve(a)},function(a){e.reject(O(a))}):j&&!K&&k?e.resolve(k):e.reject(O(a))}return e.promise},$=function(a,b,c){var e,g=f?q[f]:q,h=c?L[c]:J;if(g&&Object.prototype.hasOwnProperty.call(g,a)){var i=g[a];e="@:"===i.substr(0,2)?$(i.substr(2),b,c):h.interpolate(i,b)}else{var k;j&&!K&&(k=U(a)),f&&d&&d.length?(z=0,e=Y(a,b,h)):e=j&&!K&&k?k:O(a)}return e};if(N.preferredLanguage=function(a){return a&&G(a),b},N.cloakClassName=function(){return v},N.fallbackLanguage=function(a){if(void 0!==a&&null!==a){if(H(a),l&&d&&d.length)for(var b=0,c=d.length;c>b;b++)M[d[b]]||(M[d[b]]=Q(d[b]));N.use(N.use())}return e?d[0]:d},N.useFallbackLanguage=function(a){if(void 0!==a&&null!==a)if(a){var b=B(d,a);b>-1&&(A=b)}else A=0},N.proposedLanguage=function(){return g},N.storage=function(){return x},N.use=function(a){if(!a)return f;var b=r.defer();i.$emit("$translateChangeStart",{language:a});var c=D(a);return c&&(a=c),q[a]||!l||M[a]?(b.resolve(a),P(a)):(g=a,M[a]=Q(a).then(function(c){return E(c.key,c.table),b.resolve(c.key),P(c.key),g===a&&(g=void 0),c},function(a){g===a&&(g=void 0),i.$emit("$translateChangeError",{language:a}),b.reject(a),i.$emit("$translateChangeEnd",{language:a})})),b.promise},N.storageKey=function(){return I()},N.isPostCompilingEnabled=function(){return w},N.refresh=function(a){function b(){e.resolve(),i.$emit("$translateRefreshEnd",{language:a})}function c(){e.reject(),i.$emit("$translateRefreshEnd",{language:a})}if(!l)throw new Error("Couldn't refresh translation table, no loader registered!");var e=r.defer();if(i.$emit("$translateRefreshStart",{language:a}),a)q[a]?Q(a).then(function(c){E(c.key,c.table),a===f&&P(f),b()},c):c();else{var g=[],h={};if(d&&d.length)for(var j=0,k=d.length;k>j;j++)g.push(Q(d[j])),h[d[j]]=!0;f&&!h[f]&&g.push(Q(f)),r.all(g).then(function(a){angular.forEach(a,function(a){q[a.key]&&delete q[a.key],E(a.key,a.table)}),f&&P(f),b()})}return e.promise},N.instant=function(a,c,e){if(null===a||angular.isUndefined(a))return a;if(angular.isArray(a)){for(var g={},h=0,i=a.length;i>h;h++)g[a[h]]=N.instant(a[h],c,e);return g}if(angular.isString(a)&&a.length<1)return a;a&&(a=C.apply(a));var k,l=[];b&&l.push(b),f&&l.push(f),d&&d.length&&(l=l.concat(d));for(var m=0,n=l.length;n>m;m++){var o=l[m];if(q[o]&&"undefined"!=typeof q[o][a]&&(k=$(a,c,e)),"undefined"!=typeof k)break}return k||""===k||(k=J.interpolate(a,c),j&&!K&&(k=U(a))),k},N.versionInfo=function(){return y},N.loaderCache=function(){return p},l&&(angular.equals(q,{})&&N.use(N.use()),d&&d.length))for(var _=function(a){return E(a.key,a.table),i.$emit("$translateChangeEnd",{language:a.key}),a},ab=0,bb=d.length;bb>ab;ab++)M[d[ab]]=Q(d[ab]).then(_);return N}]}]),angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",["$interpolate",function(a){var b,c={},d="default",e=null,f={escaped:function(a){var b={};for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=angular.element("<div></div>").text(a[c]).html());return b}},g=function(a){var b;return b=angular.isFunction(f[e])?f[e](a):a};return c.setLocale=function(a){b=a},c.getInterpolationIdentifier=function(){return d},c.useSanitizeValueStrategy=function(a){return e=a,this},c.interpolate=function(b,c){return e&&(c=g(c)),a(b)(c||{})},c}]),angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate",["$translate","$q","$interpolate","$compile","$parse","$rootScope",function(a,b,c,d,e,f){return{restrict:"AE",scope:!0,compile:function(b,g){var h=g.translateValues?g.translateValues:void 0,i=g.translateInterpolation?g.translateInterpolation:void 0,j=b[0].outerHTML.match(/translate-value-+/i),k="^(.*)("+c.startSymbol()+".*"+c.endSymbol()+")(.*)",l="^(.*)"+c.startSymbol()+"(.*)"+c.endSymbol()+"(.*)";return function(b,m,n){b.interpolateParams={},b.preText="",b.postText="";var o={},p=function(a){if(angular.equals(a,"")||!angular.isDefined(a)){var d=m.text().match(k);angular.isArray(d)?(b.preText=d[1],b.postText=d[3],o.translate=c(d[2])(b.$parent),watcherMatches=m.text().match(l),angular.isArray(watcherMatches)&&watcherMatches[2]&&watcherMatches[2].length&&b.$watch(watcherMatches[2],function(a){o.translate=a,u()})):o.translate=m.text().replace(/^\s+|\s+$/g,"")}else o.translate=a;u()},q=function(a){n.$observe(a,function(b){o[a]=b,u()})};n.$observe("translate",function(a){p(a)});for(var r in n)n.hasOwnProperty(r)&&"translateAttr"===r.substr(0,13)&&q(r);if(n.$observe("translateDefault",function(a){b.defaultText=a}),h&&n.$observe("translateValues",function(a){a&&b.$parent.$watch(function(){angular.extend(b.interpolateParams,e(a)(b.$parent))})}),j){var s=function(a){n.$observe(a,function(c){var d=angular.lowercase(a.substr(14,1))+a.substr(15);b.interpolateParams[d]=c})};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&"translateValue"===t.substr(0,14)&&"translateValues"!==t&&s(t)}var u=function(){for(var a in o)o.hasOwnProperty(a)&&o[a]&&v(a,o[a],b,b.interpolateParams)},v=function(b,c,d,e){a(c,e,i).then(function(a){w(a,d,!0,b)},function(a){w(a,d,!1,b)})},w=function(b,c,e,f){if("translate"===f){e||"undefined"==typeof c.defaultText||(b=c.defaultText),m.html(c.preText+b+c.postText);var h=a.isPostCompilingEnabled(),i="undefined"!=typeof g.translateCompile,j=i&&"false"!==g.translateCompile;(h&&!i||j)&&d(m.contents())(c)}else{e||"undefined"==typeof c.defaultText||(b=c.defaultText);var k=n.$attr[f].substr(15);m.attr(k,b)}};b.$watch("interpolateParams",u,!0);var x=f.$on("$translateChangeSuccess",u);m.text().length&&p(""),u(),b.$on("$destroy",x)}}}}]),angular.module("pascalprecht.translate").directive("translateCloak",["$rootScope","$translate",function(a,b){return{compile:function(c){var d=function(){c.addClass(b.cloakClassName())},e=function(){c.removeClass(b.cloakClassName())},f=a.$on("$translateChangeEnd",function(){e(),f(),f=null});return d(),function(a,c,f){f.translateCloak&&f.translateCloak.length&&f.$observe("translateCloak",function(a){b(a).then(e,d)})}}}}]),angular.module("pascalprecht.translate").filter("translate",["$parse","$translate",function(a,b){var c=function(c,d,e){return angular.isObject(d)||(d=a(d)(this)),b.instant(c,d,e)};return c.$stateful=!0,c}]);
/**!
 * AngularJS file upload directives and services. Supoorts: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * FileAPI Flash shim for old browsers not supporting FormData
 * @author  Danial  <danial.farid@gmail.com>
 * @version 12.0.4
 */

(function () {
  /** @namespace FileAPI.noContentTimeout */

  function patchXHR(fnName, newFn) {
    window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
  }

  function redefineProp(xhr, prop, fn) {
    try {
      Object.defineProperty(xhr, prop, {get: fn});
    } catch (e) {/*ignore*/
    }
  }

  if (!window.FileAPI) {
    window.FileAPI = {};
  }

  if (!window.XMLHttpRequest) {
    throw 'AJAX is not supported. XMLHttpRequest is not defined.';
  }

  FileAPI.shouldLoad = !window.FormData || FileAPI.forceLoad;
  if (FileAPI.shouldLoad) {
    var initializeUploadListener = function (xhr) {
      if (!xhr.__listeners) {
        if (!xhr.upload) xhr.upload = {};
        xhr.__listeners = [];
        var origAddEventListener = xhr.upload.addEventListener;
        xhr.upload.addEventListener = function (t, fn) {
          xhr.__listeners[t] = fn;
          if (origAddEventListener) origAddEventListener.apply(this, arguments);
        };
      }
    };

    patchXHR('open', function (orig) {
      return function (m, url, b) {
        initializeUploadListener(this);
        this.__url = url;
        try {
          orig.apply(this, [m, url, b]);
        } catch (e) {
          if (e.message.indexOf('Access is denied') > -1) {
            this.__origError = e;
            orig.apply(this, [m, '_fix_for_ie_crossdomain__', b]);
          }
        }
      };
    });

    patchXHR('getResponseHeader', function (orig) {
      return function (h) {
        return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(h) : (orig == null ? null : orig.apply(this, [h]));
      };
    });

    patchXHR('getAllResponseHeaders', function (orig) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : (orig == null ? null : orig.apply(this));
      };
    });

    patchXHR('abort', function (orig) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : (orig == null ? null : orig.apply(this));
      };
    });

    patchXHR('setRequestHeader', function (orig) {
      return function (header, value) {
        if (header === '__setXHR_') {
          initializeUploadListener(this);
          var val = value(this);
          // fix for angular < 1.2.0
          if (val instanceof Function) {
            val(this);
          }
        } else {
          this.__requestHeaders = this.__requestHeaders || {};
          this.__requestHeaders[header] = value;
          orig.apply(this, arguments);
        }
      };
    });

    patchXHR('send', function (orig) {
      return function () {
        var xhr = this;
        if (arguments[0] && arguments[0].__isFileAPIShim) {
          var formData = arguments[0];
          var config = {
            url: xhr.__url,
            jsonp: false, //removes the callback form param
            cache: true, //removes the ?fileapiXXX in the url
            complete: function (err, fileApiXHR) {
              if (err && angular.isString(err) && err.indexOf('#2174') !== -1) {
                // this error seems to be fine the file is being uploaded properly.
                err = null;
              }
              xhr.__completed = true;
              if (!err && xhr.__listeners.load)
                xhr.__listeners.load({
                  type: 'load',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (!err && xhr.__listeners.loadend)
                xhr.__listeners.loadend({
                  type: 'loadend',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (err === 'abort' && xhr.__listeners.abort)
                xhr.__listeners.abort({
                  type: 'abort',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (fileApiXHR.status !== undefined) redefineProp(xhr, 'status', function () {
                return (fileApiXHR.status === 0 && err && err !== 'abort') ? 500 : fileApiXHR.status;
              });
              if (fileApiXHR.statusText !== undefined) redefineProp(xhr, 'statusText', function () {
                return fileApiXHR.statusText;
              });
              redefineProp(xhr, 'readyState', function () {
                return 4;
              });
              if (fileApiXHR.response !== undefined) redefineProp(xhr, 'response', function () {
                return fileApiXHR.response;
              });
              var resp = fileApiXHR.responseText || (err && fileApiXHR.status === 0 && err !== 'abort' ? err : undefined);
              redefineProp(xhr, 'responseText', function () {
                return resp;
              });
              redefineProp(xhr, 'response', function () {
                return resp;
              });
              if (err) redefineProp(xhr, 'err', function () {
                return err;
              });
              xhr.__fileApiXHR = fileApiXHR;
              if (xhr.onreadystatechange) xhr.onreadystatechange();
              if (xhr.onload) xhr.onload();
            },
            progress: function (e) {
              e.target = xhr;
              if (xhr.__listeners.progress) xhr.__listeners.progress(e);
              xhr.__total = e.total;
              xhr.__loaded = e.loaded;
              if (e.total === e.loaded) {
                // fix flash issue that doesn't call complete if there is no response text from the server
                var _this = this;
                setTimeout(function () {
                  if (!xhr.__completed) {
                    xhr.getAllResponseHeaders = function () {
                    };
                    _this.complete(null, {status: 204, statusText: 'No Content'});
                  }
                }, FileAPI.noContentTimeout || 10000);
              }
            },
            headers: xhr.__requestHeaders
          };
          config.data = {};
          config.files = {};
          for (var i = 0; i < formData.data.length; i++) {
            var item = formData.data[i];
            if (item.val != null && item.val.name != null && item.val.size != null && item.val.type != null) {
              config.files[item.key] = item.val;
            } else {
              config.data[item.key] = item.val;
            }
          }

          setTimeout(function () {
            if (!FileAPI.hasFlash) {
              throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
            }
            xhr.__fileApiXHR = FileAPI.upload(config);
          }, 1);
        } else {
          if (this.__origError) {
            throw this.__origError;
          }
          orig.apply(xhr, arguments);
        }
      };
    });
    window.XMLHttpRequest.__isFileAPIShim = true;
    window.FormData = FormData = function () {
      return {
        append: function (key, val, name) {
          if (val.__isFileAPIBlobShim) {
            val = val.data[0];
          }
          this.data.push({
            key: key,
            val: val,
            name: name
          });
        },
        data: [],
        __isFileAPIShim: true
      };
    };

    window.Blob = Blob = function (b) {
      return {
        data: b,
        __isFileAPIBlobShim: true
      };
    };
  }

})();

(function () {
  /** @namespace FileAPI.forceLoad */
  /** @namespace window.FileAPI.jsUrl */
  /** @namespace window.FileAPI.jsPath */

  function isInputTypeFile(elem) {
    return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
  }

  function hasFlash() {
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) return true;
    } catch (e) {
      if (navigator.mimeTypes['application/x-shockwave-flash'] !== undefined) return true;
    }
    return false;
  }

  function getOffset(obj) {
    var left = 0, top = 0;

    if (window.jQuery) {
      return jQuery(obj).offset();
    }

    if (obj.offsetParent) {
      do {
        left += (obj.offsetLeft - obj.scrollLeft);
        top += (obj.offsetTop - obj.scrollTop);
        obj = obj.offsetParent;
      } while (obj);
    }
    return {
      left: left,
      top: top
    };
  }

  if (FileAPI.shouldLoad) {
    FileAPI.hasFlash = hasFlash();

    //load FileAPI
    if (FileAPI.forceLoad) {
      FileAPI.html5 = false;
    }

    if (!FileAPI.upload) {
      var jsUrl, basePath, script = document.createElement('script'), allScripts = document.getElementsByTagName('script'), i, index, src;
      if (window.FileAPI.jsUrl) {
        jsUrl = window.FileAPI.jsUrl;
      } else if (window.FileAPI.jsPath) {
        basePath = window.FileAPI.jsPath;
      } else {
        for (i = 0; i < allScripts.length; i++) {
          src = allScripts[i].src;
          index = src.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/);
          if (index > -1) {
            basePath = src.substring(0, index + 1);
            break;
          }
        }
      }

      if (FileAPI.staticPath == null) FileAPI.staticPath = basePath;
      script.setAttribute('src', jsUrl || basePath + 'FileAPI.min.js');
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    FileAPI.ngfFixIE = function (elem, fileElem, changeFn) {
      if (!hasFlash()) {
        throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
      }
      var fixInputStyle = function () {
        var label = fileElem.parent();
        if (elem.attr('disabled')) {
          if (label) label.removeClass('js-fileapi-wrapper');
        } else {
          if (!fileElem.attr('__ngf_flash_')) {
            fileElem.unbind('change');
            fileElem.unbind('click');
            fileElem.bind('change', function (evt) {
              fileApiChangeFn.apply(this, [evt]);
              changeFn.apply(this, [evt]);
            });
            fileElem.attr('__ngf_flash_', 'true');
          }
          label.addClass('js-fileapi-wrapper');
          if (!isInputTypeFile(elem)) {
            label.css('position', 'absolute')
              .css('top', getOffset(elem[0]).top + 'px').css('left', getOffset(elem[0]).left + 'px')
              .css('width', elem[0].offsetWidth + 'px').css('height', elem[0].offsetHeight + 'px')
              .css('filter', 'alpha(opacity=0)').css('display', elem.css('display'))
              .css('overflow', 'hidden').css('z-index', '900000')
              .css('visibility', 'visible');
            fileElem.css('width', elem[0].offsetWidth + 'px').css('height', elem[0].offsetHeight + 'px')
              .css('position', 'absolute').css('top', '0px').css('left', '0px');
          }
        }
      };

      elem.bind('mouseenter', fixInputStyle);

      var fileApiChangeFn = function (evt) {
        var files = FileAPI.getFiles(evt);
        //just a double check for #233
        for (var i = 0; i < files.length; i++) {
          if (files[i].size === undefined) files[i].size = 0;
          if (files[i].name === undefined) files[i].name = 'file';
          if (files[i].type === undefined) files[i].type = 'undefined';
        }
        if (!evt.target) {
          evt.target = {};
        }
        evt.target.files = files;
        // if evt.target.files is not writable use helper field
        if (evt.target.files !== files) {
          evt.__files_ = files;
        }
        (evt.__files_ || evt.target.files).item = function (i) {
          return (evt.__files_ || evt.target.files)[i] || null;
        };
      };
    };

    FileAPI.disableFileInput = function (elem, disable) {
      if (disable) {
        elem.removeClass('js-fileapi-wrapper');
      } else {
        elem.addClass('js-fileapi-wrapper');
      }
    };
  }
})();

if (!window.FileReader) {
  window.FileReader = function () {
    var _this = this, loadStarted = false;
    this.listeners = {};
    this.addEventListener = function (type, fn) {
      _this.listeners[type] = _this.listeners[type] || [];
      _this.listeners[type].push(fn);
    };
    this.removeEventListener = function (type, fn) {
      if (_this.listeners[type]) _this.listeners[type].splice(_this.listeners[type].indexOf(fn), 1);
    };
    this.dispatchEvent = function (evt) {
      var list = _this.listeners[evt.type];
      if (list) {
        for (var i = 0; i < list.length; i++) {
          list[i].call(_this, evt);
        }
      }
    };
    this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;

    var constructEvent = function (type, evt) {
      var e = {type: type, target: _this, loaded: evt.loaded, total: evt.total, error: evt.error};
      if (evt.result != null) e.target.result = evt.result;
      return e;
    };
    var listener = function (evt) {
      if (!loadStarted) {
        loadStarted = true;
        if (_this.onloadstart) _this.onloadstart(constructEvent('loadstart', evt));
      }
      var e;
      if (evt.type === 'load') {
        if (_this.onloadend) _this.onloadend(constructEvent('loadend', evt));
        e = constructEvent('load', evt);
        if (_this.onload) _this.onload(e);
        _this.dispatchEvent(e);
      } else if (evt.type === 'progress') {
        e = constructEvent('progress', evt);
        if (_this.onprogress) _this.onprogress(e);
        _this.dispatchEvent(e);
      } else {
        e = constructEvent('error', evt);
        if (_this.onerror) _this.onerror(e);
        _this.dispatchEvent(e);
      }
    };
    this.readAsDataURL = function (file) {
      FileAPI.readAsDataURL(file, listener);
    };
    this.readAsText = function (file) {
      FileAPI.readAsText(file, listener);
    };
  };
}
/*! ngImgCrop v0.3.2 License: MIT */!function(){"use strict";var e=angular.module("ngImgCrop",[]);e.factory("cropAreaCircle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype._calcCirclePerimeterCoords=function(e){var t=this._size/2,i=e*(Math.PI/180),r=this._x+t*Math.cos(i),s=this._y+t*Math.sin(i);return[r,s]},t.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},t.prototype._isCoordWithinArea=function(e){return Math.sqrt((e[0]-this._x)*(e[0]-this._x)+(e[1]-this._y)*(e[1]-this._y))<this._size/2},t.prototype._isCoordWithinBoxResize=function(e){var t=this._calcResizeIconCenterCoords(),i=this._boxResizeHoverSize/2;return e[0]>t[0]-i&&e[0]<t[0]+i&&e[1]>t[1]-i&&e[1]<t[1]+i},t.prototype._drawArea=function(e,t,i){e.arc(t[0],t[1],i/2,0,2*Math.PI)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){i="nesw-resize";var s,o,a;o=e-this._posResizeStartX,a=this._posResizeStartY-t,s=o>a?this._posResizeStartSize+2*a:this._posResizeStartSize+2*o,this._size=Math.max(this._minSize,s),this._boxResizeIsHover=!0,r=!0,this._events.trigger("area-resize")}else this._isCoordWithinBoxResize([e,t])?(i="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,r=!0):this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0);return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){this._isCoordWithinBoxResize([e,t])?(this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaSquare",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype._calcSquareCorners=function(){var e=this._size/2;return[[this._x-e,this._y-e],[this._x+e,this._y-e],[this._x-e,this._y+e],[this._x+e,this._y+e]]},t.prototype._calcSquareDimensions=function(){var e=this._size/2;return{left:this._x-e,top:this._y-e,right:this._x+e,bottom:this._y+e}},t.prototype._isCoordWithinArea=function(e){var t=this._calcSquareDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcSquareCorners(),i=-1,r=0,s=t.length;s>r;r++){var o=t[r];if(e[0]>o[0]-this._resizeCtrlHoverRadius&&e[0]<o[0]+this._resizeCtrlHoverRadius&&e[1]>o[1]-this._resizeCtrlHoverRadius&&e[1]<o[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i){var r=i/2;e.rect(t[0]-r,t[1]-r,i,i)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var t=this._calcSquareCorners(),i=0,r=t.length;r>i;i++){var s=t[i];this._cropCanvas.drawIconResizeCircle(s,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var s,o;switch(this._resizeCtrlIsDragging){case 0:s=-1,o=-1,i="nwse-resize";break;case 1:s=1,o=-1,i="nesw-resize";break;case 2:s=-1,o=1,i="nesw-resize";break;case 3:s=1,o=1,i="nwse-resize"}var a,n=(e-this._posResizeStartX)*s,h=(t-this._posResizeStartY)*o;a=n>h?this._posResizeStartSize+h:this._posResizeStartSize+n;var c=this._size;this._size=Math.max(this._minSize,a);var l=(this._size-c)/2;this._x+=l*s,this._y+=l*o,this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}else{var u=this._isCoordWithinResizeCtrl([e,t]);if(u>-1){switch(u){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=u,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);i>-1?(this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropArea",["cropCanvas",function(e){var t=function(t,i){this._ctx=t,this._events=i,this._minSize=80,this._cropCanvas=new e(t),this._image=new Image,this._x=0,this._y=0,this._size=200};return t.prototype.getImage=function(){return this._image},t.prototype.setImage=function(e){this._image=e},t.prototype.getX=function(){return this._x},t.prototype.setX=function(e){this._x=e,this._dontDragOutside()},t.prototype.getY=function(){return this._y},t.prototype.setY=function(e){this._y=e,this._dontDragOutside()},t.prototype.getSize=function(){return this._size},t.prototype.setSize=function(e){this._size=Math.max(this._minSize,e),this._dontDragOutside()},t.prototype.getMinSize=function(){return this._minSize},t.prototype.setMinSize=function(e){this._minSize=e,this._size=Math.max(this._minSize,this._size),this._dontDragOutside()},t.prototype._dontDragOutside=function(){var e=this._ctx.canvas.height,t=this._ctx.canvas.width;this._size>t&&(this._size=t),this._size>e&&(this._size=e),this._x<this._size/2&&(this._x=this._size/2),this._x>t-this._size/2&&(this._x=t-this._size/2),this._y<this._size/2&&(this._y=this._size/2),this._y>e-this._size/2&&(this._y=e-this._size/2)},t.prototype._drawArea=function(){},t.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._size,this._drawArea)},t.prototype.processMouseMove=function(){},t.prototype.processMouseDown=function(){},t.prototype.processMouseUp=function(){},t}]),e.factory("cropCanvas",[function(){var e=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],t=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],i=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],r=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],s=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],o=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],a=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],n=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],h={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(c){var l=function(e,t,i){return[i*e[0]+t[0],i*e[1]+t[1]]},u=function(e,t,i,r){c.save(),c.fillStyle=t,c.beginPath();var s,o=l(e[0],i,r);c.moveTo(o[0],o[1]);for(var a in e)a>0&&(s=l(e[a],i,r),c.lineTo(s[0],s[1]));c.lineTo(o[0],o[1]),c.fill(),c.closePath(),c.restore()};this.drawIconMove=function(e,t){u(s,h.moveIconFill,e,t),u(o,h.moveIconFill,e,t),u(a,h.moveIconFill,e,t),u(n,h.moveIconFill,e,t)},this.drawIconResizeCircle=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeCircleStroke,c.lineWidth=2,c.fillStyle=h.resizeCircleFill,c.beginPath(),c.arc(e[0],e[1],r,0,2*Math.PI),c.fill(),c.stroke(),c.closePath(),c.restore()},this.drawIconResizeBoxBase=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeBoxStroke,c.lineWidth=2,c.fillStyle=h.resizeBoxFill,c.fillRect(e[0]-r/2,e[1]-r/2,r,r),c.strokeRect(e[0]-r/2,e[1]-r/2,r,r),c.restore()},this.drawIconResizeBoxNESW=function(e,r,s){this.drawIconResizeBoxBase(e,r,s),u(t,h.resizeBoxArrowFill,e,s),u(i,h.resizeBoxArrowFill,e,s)},this.drawIconResizeBoxNWSE=function(t,i,s){this.drawIconResizeBoxBase(t,i,s),u(e,h.resizeBoxArrowFill,t,s),u(r,h.resizeBoxArrowFill,t,s)},this.drawCropArea=function(e,t,i,r){var s=e.width/c.canvas.width,o=e.height/c.canvas.height,a=t[0]-i/2,n=t[1]-i/2;c.save(),c.strokeStyle=h.areaOutline,c.lineWidth=2,c.beginPath(),r(c,t,i),c.stroke(),c.clip(),i>0&&c.drawImage(e,a*s,n*o,i*s,i*o,a,n,i,i),c.beginPath(),r(c,t,i),c.stroke(),c.clip(),c.restore()}}}]),e.service("cropEXIF",[function(){function e(e){return!!e.exifdata}function t(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var i=atob(e),r=i.length,s=new ArrayBuffer(r),o=new Uint8Array(s),a=0;r>a;a++)o[a]=i.charCodeAt(a);return s}function i(e,t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onload=function(){(200==this.status||0===this.status)&&t(this.response)},i.send()}function r(e,r){function a(t){var i=s(t),a=o(t);e.exifdata=i||{},e.iptcdata=a||{},r&&r.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var n=t(e.src);a(n)}else if(/^blob\:/i.test(e.src)){var h=new FileReader;h.onload=function(e){a(e.target.result)},i(e.src,function(e){h.readAsArrayBuffer(e)})}else{var c=new XMLHttpRequest;c.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";a(c.response),c=null},c.open("GET",e.src,!0),c.responseType="arraybuffer",c.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var h=new FileReader;h.onload=function(e){u&&console.log("Got file of length "+e.target.result.byteLength),a(e.target.result)},h.readAsArrayBuffer(e)}}function s(e){var t=new DataView(e);if(u&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return u&&console.log("Not a valid JPEG"),!1;for(var i,r=2,s=e.byteLength;s>r;){if(255!=t.getUint8(r))return u&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(i=t.getUint8(r+1),u&&console.log(i),225==i)return u&&console.log("Found 0xFFE1 marker"),l(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function o(e){var t=new DataView(e);if(u&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return u&&console.log("Not a valid JPEG"),!1;for(var i=2,r=e.byteLength,s=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>i;){if(s(t,i)){var o=t.getUint8(i+7);o%2!==0&&(o+=1),0===o&&(o=4);var n=i+8+o,h=t.getUint16(i+6+o);return a(e,n,h)}i++}}function a(e,t,i){for(var r,s,o,a,n,h=new DataView(e),l={},u=t;t+i>u;)28===h.getUint8(u)&&2===h.getUint8(u+1)&&(a=h.getUint8(u+2),a in _&&(o=h.getInt16(u+3),n=o+5,s=_[a],r=c(h,u+5,o),l.hasOwnProperty(s)?l[s]instanceof Array?l[s].push(r):l[s]=[l[s],r]:l[s]=r)),u++;return l}function n(e,t,i,r,s){var o,a,n,c=e.getUint16(i,!s),l={};for(n=0;c>n;n++)o=i+12*n+2,a=r[e.getUint16(o,!s)],!a&&u&&console.log("Unknown tag: "+e.getUint16(o,!s)),l[a]=h(e,o,t,i,s);return l}function h(e,t,i,r,s){var o,a,n,h,l,u,g=e.getUint16(t+2,!s),d=e.getUint32(t+4,!s),f=e.getUint32(t+8,!s)+i;switch(g){case 1:case 7:if(1==d)return e.getUint8(t+8,!s);for(o=d>4?f:t+8,a=[],h=0;d>h;h++)a[h]=e.getUint8(o+h);return a;case 2:return o=d>4?f:t+8,c(e,o,d-1);case 3:if(1==d)return e.getUint16(t+8,!s);for(o=d>2?f:t+8,a=[],h=0;d>h;h++)a[h]=e.getUint16(o+2*h,!s);return a;case 4:if(1==d)return e.getUint32(t+8,!s);for(a=[],h=0;d>h;h++)a[h]=e.getUint32(f+4*h,!s);return a;case 5:if(1==d)return l=e.getUint32(f,!s),u=e.getUint32(f+4,!s),n=new Number(l/u),n.numerator=l,n.denominator=u,n;for(a=[],h=0;d>h;h++)l=e.getUint32(f+8*h,!s),u=e.getUint32(f+4+8*h,!s),a[h]=new Number(l/u),a[h].numerator=l,a[h].denominator=u;return a;case 9:if(1==d)return e.getInt32(t+8,!s);for(a=[],h=0;d>h;h++)a[h]=e.getInt32(f+4*h,!s);return a;case 10:if(1==d)return e.getInt32(f,!s)/e.getInt32(f+4,!s);for(a=[],h=0;d>h;h++)a[h]=e.getInt32(f+8*h,!s)/e.getInt32(f+4+8*h,!s);return a}}function c(e,t,i){for(var r="",s=t;t+i>s;s++)r+=String.fromCharCode(e.getUint8(s));return r}function l(e,t){if("Exif"!=c(e,t,4))return u&&console.log("Not valid EXIF data! "+c(e,t,4)),!1;var i,r,s,o,a,h=t+6;if(18761==e.getUint16(h))i=!1;else{if(19789!=e.getUint16(h))return u&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;i=!0}if(42!=e.getUint16(h+2,!i))return u&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var l=e.getUint32(h+4,!i);if(8>l)return u&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(h+4,!i)),!1;if(r=n(e,h,h+l,d,i),r.ExifIFDPointer){o=n(e,h,h+r.ExifIFDPointer,g,i);for(s in o){switch(s){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[s]=p[s][o[s]];break;case"ExifVersion":case"FlashpixVersion":o[s]=String.fromCharCode(o[s][0],o[s][1],o[s][2],o[s][3]);break;case"ComponentsConfiguration":o[s]=p.Components[o[s][0]]+p.Components[o[s][1]]+p.Components[o[s][2]]+p.Components[o[s][3]]}r[s]=o[s]}}if(r.GPSInfoIFDPointer){a=n(e,h,h+r.GPSInfoIFDPointer,f,i);for(s in a){switch(s){case"GPSVersionID":a[s]=a[s][0]+"."+a[s][1]+"."+a[s][2]+"."+a[s][3]}r[s]=a[s]}}return r}var u=!1,g=this.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},d=this.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},f=this.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},p=this.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},_={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};this.getData=function(t,i){return(t instanceof Image||t instanceof HTMLImageElement)&&!t.complete?!1:(e(t)?i&&i.call(t):r(t,i),!0)},this.getTag=function(t,i){return e(t)?t.exifdata[i]:void 0},this.getAllTags=function(t){if(!e(t))return{};var i,r=t.exifdata,s={};for(i in r)r.hasOwnProperty(i)&&(s[i]=r[i]);return s},this.pretty=function(t){if(!e(t))return"";var i,r=t.exifdata,s="";for(i in r)r.hasOwnProperty(i)&&(s+="object"==typeof r[i]?r[i]instanceof Number?i+" : "+r[i]+" ["+r[i].numerator+"/"+r[i].denominator+"]\r\n":i+" : ["+r[i].length+" values]\r\n":i+" : "+r[i]+"\r\n");return s},this.readFromBinaryFile=function(e){return s(e)}}]),e.factory("cropHost",["$document","cropAreaCircle","cropAreaSquare","cropEXIF",function(e,t,i,r){var s=function(e){var t=e.getBoundingClientRect(),i=document.body,r=document.documentElement,s=window.pageYOffset||r.scrollTop||i.scrollTop,o=window.pageXOffset||r.scrollLeft||i.scrollLeft,a=r.clientTop||i.clientTop||0,n=r.clientLeft||i.clientLeft||0,h=t.top+s-a,c=t.left+o-n;return{top:Math.round(h),left:Math.round(c)}};return function(o,a,n){function h(){c.clearRect(0,0,c.canvas.width,c.canvas.height),null!==l&&(c.drawImage(l,0,0,c.canvas.width,c.canvas.height),c.save(),c.fillStyle="rgba(0, 0, 0, 0.65)",c.fillRect(0,0,c.canvas.width,c.canvas.height),c.restore(),u.draw())}var c=null,l=null,u=null,g=[100,100],d=[300,300],f=200,p="image/png",_=null,m=function(){if(null!==l){u.setImage(l);var e=[l.width,l.height],t=l.width/l.height,i=e;i[0]>d[0]?(i[0]=d[0],i[1]=i[0]/t):i[0]<g[0]&&(i[0]=g[0],i[1]=i[0]/t),i[1]>d[1]?(i[1]=d[1],i[0]=i[1]*t):i[1]<g[1]&&(i[1]=g[1],i[0]=i[1]*t),o.prop("width",i[0]).prop("height",i[1]).css({"margin-left":-i[0]/2+"px","margin-top":-i[1]/2+"px"}),u.setX(c.canvas.width/2),u.setY(c.canvas.height/2),u.setSize(Math.min(200,c.canvas.width/2,c.canvas.height/2))}else o.prop("width",0).prop("height",0).css({"margin-top":0});h()},v=function(e){return angular.isDefined(e.changedTouches)?e.changedTouches:e.originalEvent.changedTouches},S=function(e){if(null!==l){var t,i,r=s(c.canvas);"touchmove"===e.type?(t=v(e)[0].pageX,i=v(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseMove(t-r.left,i-r.top),h()}},z=function(e){if(e.preventDefault(),e.stopPropagation(),null!==l){var t,i,r=s(c.canvas);"touchstart"===e.type?(t=v(e)[0].pageX,i=v(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseDown(t-r.left,i-r.top),h()}},I=function(e){if(null!==l){var t,i,r=s(c.canvas);"touchend"===e.type?(t=v(e)[0].pageX,i=v(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseUp(t-r.left,i-r.top),h()}};this.getResultImageDataURI=function(){var e,t;return t=angular.element("<canvas></canvas>")[0],e=t.getContext("2d"),t.width=f,t.height=f,null!==l&&e.drawImage(l,(u.getX()-u.getSize()/2)*(l.width/c.canvas.width),(u.getY()-u.getSize()/2)*(l.height/c.canvas.height),u.getSize()*(l.width/c.canvas.width),u.getSize()*(l.height/c.canvas.height),0,0,f,f),null!==_?t.toDataURL(p,_):t.toDataURL(p)},this.setNewImageSource=function(e){if(l=null,m(),n.trigger("image-updated"),e){var t=new Image;"http"===e.substring(0,4).toLowerCase()&&(t.crossOrigin="anonymous"),t.onload=function(){n.trigger("load-done"),r.getData(t,function(){var e=r.getTag(t,"Orientation");if([3,6,8].indexOf(e)>-1){var i=document.createElement("canvas"),s=i.getContext("2d"),o=t.width,a=t.height,h=0,c=0,u=0;switch(e){case 3:h=-t.width,c=-t.height,u=180;break;case 6:o=t.height,a=t.width,c=-t.height,u=90;break;case 8:o=t.height,a=t.width,h=-t.width,u=270}i.width=o,i.height=a,s.rotate(u*Math.PI/180),s.drawImage(t,h,c),l=new Image,l.src=i.toDataURL("image/png")}else l=t;m(),n.trigger("image-updated")})},t.onerror=function(){n.trigger("load-error")},n.trigger("load-start"),t.src=e}},this.setMaxDimensions=function(e,t){if(d=[e,t],null!==l){var i=c.canvas.width,r=c.canvas.height,s=[l.width,l.height],a=l.width/l.height,n=s;n[0]>d[0]?(n[0]=d[0],n[1]=n[0]/a):n[0]<g[0]&&(n[0]=g[0],n[1]=n[0]/a),n[1]>d[1]?(n[1]=d[1],n[0]=n[1]*a):n[1]<g[1]&&(n[1]=g[1],n[0]=n[1]*a),o.prop("width",n[0]).prop("height",n[1]).css({"margin-left":-n[0]/2+"px","margin-top":-n[1]/2+"px"});var f=c.canvas.width/i,p=c.canvas.height/r,_=Math.min(f,p);u.setX(u.getX()*f),u.setY(u.getY()*p),u.setSize(u.getSize()*_)}else o.prop("width",0).prop("height",0).css({"margin-top":0});h()},this.setAreaMinSize=function(e){e=parseInt(e,10),isNaN(e)||(u.setMinSize(e),h())},this.setResultImageSize=function(e){e=parseInt(e,10),isNaN(e)||(f=e)},this.setResultImageFormat=function(e){p=e},this.setResultImageQuality=function(e){e=parseFloat(e),!isNaN(e)&&e>=0&&1>=e&&(_=e)},this.setAreaType=function(e){var r=u.getSize(),s=u.getMinSize(),o=u.getX(),a=u.getY(),g=t;"square"===e&&(g=i),u=new g(c,n),u.setMinSize(s),u.setSize(r),u.setX(o),u.setY(a),null!==l&&u.setImage(l),h()},c=o[0].getContext("2d"),u=new t(c,n),e.on("mousemove",S),o.on("mousedown",z),e.on("mouseup",I),e.on("touchmove",S),o.on("touchstart",z),e.on("touchend",I),this.destroy=function(){e.off("mousemove",S),o.off("mousedown",z),e.off("mouseup",S),e.off("touchmove",S),o.off("touchstart",z),e.off("touchend",S),o.remove()}}}]),e.factory("cropPubSub",[function(){return function(){var e={};this.on=function(t,i){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(i)}),this},this.trigger=function(t,i){return angular.forEach(e[t],function(e){e.call(null,i)}),this}}}]),e.directive("imgCrop",["$timeout","cropHost","cropPubSub",function(e,t,i){return{restrict:"E",scope:{image:"=",resultImage:"=",changeOnFly:"=",areaType:"@",areaMinSize:"=",resultImageSize:"=",resultImageFormat:"@",resultImageQuality:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function(e){e.events=new i}],link:function(i,r){var s,o=i.events,a=new t(r.find("canvas"),{},o),n=function(e){var t=a.getResultImageDataURI();s!==t&&(s=t,angular.isDefined(e.resultImage)&&(e.resultImage=t),e.onChange({$dataURI:e.resultImage}))},h=function(t){return function(){e(function(){i.$apply(function(e){t(e)})})}};o.on("load-start",h(function(e){e.onLoadBegin({})})).on("load-done",h(function(e){e.onLoadDone({})})).on("load-error",h(function(e){e.onLoadError({})})).on("area-move area-resize",h(function(e){e.changeOnFly&&n(e)})).on("area-move-end area-resize-end image-updated",h(function(e){n(e)})),i.$watch("image",function(){a.setNewImageSource(i.image)}),i.$watch("areaType",function(){a.setAreaType(i.areaType),n(i)}),i.$watch("areaMinSize",function(){a.setAreaMinSize(i.areaMinSize),n(i)}),i.$watch("resultImageSize",function(){a.setResultImageSize(i.resultImageSize),n(i)}),i.$watch("resultImageFormat",function(){a.setResultImageFormat(i.resultImageFormat),n(i)}),i.$watch("resultImageQuality",function(){a.setResultImageQuality(i.resultImageQuality),n(i)}),i.$watch(function(){return[r[0].clientWidth,r[0].clientHeight]},function(e){a.setMaxDimensions(e[0],e[1]),n(i)},!0),i.$on("$destroy",function(){a.destroy()})}}}])}();
'use strict';

/**
 * Module to use Switchery as a directive for angular.
 * @TODO implement Switchery as a service, https://github.com/abpetkov/switchery/pull/11
 */
angular.module('NgSwitchery', [])
    .directive('uiSwitch', ['$window', '$timeout','$log', '$parse', function($window, $timeout, $log, $parse) {

        /**
         * Initializes the HTML element as a Switchery switch.
         *
         * $timeout is in place as a workaround to work within angular-ui tabs.
         *
         * @param scope
         * @param elem
         * @param attrs
         * @param ngModel
         */
        function linkSwitchery(scope, elem, attrs, ngModel) {
            if(!ngModel) return false;
            var options = {};
            try {
                options = $parse(attrs.uiSwitch)(scope);
            }
            catch (e) {}

            var switcher;

            attrs.$observe('disabled', function(value) {
                if (!switcher) {
                    return;
                }

                if (value) {
                    switcher.disable();
                }
                else {
                    switcher.enable();
                }
            });

            function initializeSwitch() {
                $timeout(function() {
                    // Remove any old switcher
                    if (switcher) {
                        angular.element(switcher.switcher).remove();
                    }
                    // (re)create switcher to reflect latest state of the checkbox element
                    switcher = new $window.Switchery(elem[0], options);
                    var element = switcher.element;
                    element.checked = scope.initValue;
                    if (attrs.disabled) {
                        switcher.disable();
                    }

                    switcher.setPosition(false);
                    element.addEventListener('change',function(evt) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(element.checked);
                        })
                    })
                }, 0);
            }
            initializeSwitch();
        }

        return {
            require: 'ngModel',
            restrict: 'AE',
            scope : {
                initValue : '=ngModel'
            },
            link: linkSwitchery
        }
    }]);
/*
 * AngularJS Toaster
 * Version: 1.2.1
 *
 * Copyright 2013-2016 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
 */
!function(t,e){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"close-html":'<button class="toast-close-button" type="button">&times;</button>',"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).service("toaster",["$rootScope","toasterConfig",function(t,e){function o(t){return function(e,o,s,i,a,n,r,c,l){angular.isString(e)?this.pop(t,e,o,s,i,a,n,r,c,l):this.pop(angular.extend(e,{type:t}))}}this.pop=function(e,o,s,i,a,n,r,c,l,u){if(angular.isObject(e)){var d=e;this.toast={type:d.type,title:d.title,body:d.body,timeout:d.timeout,bodyOutputType:d.bodyOutputType,clickHandler:d.clickHandler,showCloseButton:d.showCloseButton,closeHtml:d.closeHtml,uid:d.toastId,onShowCallback:d.onShowCallback,onHideCallback:d.onHideCallback,directiveData:d.directiveData},l=d.toastId,r=d.toasterId}else this.toast={type:e,title:o,body:s,timeout:i,bodyOutputType:a,clickHandler:n,showCloseButton:c,uid:l,onHideCallback:u};t.$emit("toaster-newToast",r,l)},this.clear=function(e,o){t.$emit("toaster-clearToasts",e,o)};for(var s in e["icon-classes"])this[s]=o(s)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,i=[],a=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,a=i.length;a>s;s++)i[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,i=a.length;i>s;s++)a[s](t,e,o)}))},subscribeToNewToastEvent:function(t){i.push(t)},subscribeToClearToastsEvent:function(t){a.push(t)},unsubscribeToNewToastEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=a.indexOf(t);e>=0&&a.splice(e,1),0===a.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(t,e){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"@directiveData"},replace:!0,link:function(o,s,i){o.$watch("directiveName",function(a){if(angular.isUndefined(a)||a.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var n;try{n=e.get(i.$normalize(a)+"Directive")}catch(r){throw new Error(a+" could not be found. The name should appear as it exists in the markup, not camelCased as it would appear in the directive declaration, e.g. directive-name not directiveName.")}var c=n[0];if(c.scope!==!0&&c.scope)throw new Error("Cannot use a directive with an isolated scope. The scope must be either true or falsy (e.g. false/null/undefined). Occurred for directive "+a+".");if(c.restrict.indexOf("A")<0)throw new Error('Directives must be usable as attributes. Add "A" to the restrict option (or remove the option entirely). Occurred for directive '+a+".");o.directiveData&&(o.directiveData=angular.fromJson(o.directiveData));var l=t("<div "+a+"></div>")(o);s.append(l)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,i,a,n){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,c){function l(t,s){t.timeoutPromise=o(function(){e.removeToast(t.id)},s,1)}function u(o,i){if(o.type=v["icon-classes"][o.type],o.type||(o.type=v["icon-class"]),v["prevent-duplicates"]===!0)if(p(i)){if(e.toasters.length>0&&e.toasters[e.toasters.length-1].body===o.body)return}else{var a,n;for(a=0,n=e.toasters.length;n>a;a++)e.toasters[a].uid===i&&(d(a),a--,n=e.toasters.length)}o.id=++f,p(i)||(o.uid=i);var r=v["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof r)o.showCloseButton=r;else if("object"==typeof r){var c=r[o.type];"undefined"!=typeof c&&null!==c&&(o.showCloseButton=c)}else o.showCloseButton=!1;switch(o.showCloseButton&&(o.closeHtml=s.trustAsHtml(o.closeHtml||e.config.closeHtml)),o.bodyOutputType=o.bodyOutputType||v["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||v["body-template"];break;case"templateWithData":var l=t(o.body||v["body-template"]),u=l(e);o.bodyTemplate=u.template,o.data=u.data;break;case"directive":o.html=o.body}e.configureTimer(o),v["newest-on-top"]===!0?(e.toasters.unshift(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.pop()):(e.toasters.push(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.shift()),angular.isFunction(o.onShowCallback)&&o.onShowCallback()}function d(t){var s=e.toasters[t];s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1),angular.isFunction(s.onHideCallback)&&s.onHideCallback()}function m(t){for(var o=e.toasters.length-1;o>=0;o--)p(t)?d(o):e.toasters[o].uid==t&&d(o)}function p(t){return angular.isUndefined(t)||null===t}var v,f=0;v=angular.extend({},i,e.$eval(c.toasterOptions)),e.config={toasterId:v["toaster-id"],position:v["position-class"],title:v["title-class"],message:v["message-class"],tap:v["tap-to-dismiss"],closeButton:v["close-button"],closeHtml:v["close-html"],animation:v["animation-class"],mouseoverTimer:v["mouseover-timer-stop"]},e.$on("$destroy",function(){n.unsubscribeToNewToastEvent(e._onNewToast),n.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:v["time-out"];"object"==typeof e&&(e=e[t.type]),e>0&&l(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;s>o;o++)if(e.toasters[o].id===t){d(o);break}},e.toasters=[],e._onNewToast=function(t,o,s){(p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&u(a.toast,s)},e._onClearToasts=function(t,o,s){("*"==o||p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&m(s)},n.setup(),n.subscribeToNewToastEvent(e._onNewToast),n.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t,e,s){t.stopTimer=function(e){t.config.mouseoverTimer===!0&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){t.config.mouseoverTimer===!0?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.id)},t.click=function(e,o){if(t.config.tap===!0||e.showCloseButton===!0&&o===!0){var s=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?s=e.clickHandler(e,o):angular.isFunction(t.$parent.$eval(e.clickHandler))?s=t.$parent.$eval(e.clickHandler)(e,o):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),s&&t.removeToast(e.id)}}}],template:'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><div ng-if="toaster.showCloseButton" ng-click="click(toaster, true)" ng-bind-html="toaster.closeHtml"></div><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}])}(window,document);