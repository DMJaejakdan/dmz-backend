(self.webpackChunkdmzlib=self.webpackChunkdmzlib||[]).push([[761,626,831,916,299,562,276],{5769:function(t,e,a){"use strict";a.d(e,{FY:function(){return r},HJ:function(){return o},SL:function(){return l},Tq:function(){return c},eg:function(){return n},g9:function(){return s},mw:function(){return h},tx:function(){return i}}),a(813),a(1224);var s={pc:"lhxjkf1 lhxjkf0",mobile:"lhxjkf2 lhxjkf0"},l="lhxjkf9",n="lhxjkf7",c="lhxjkf4",r="lhxjkf6",o="lhxjkf3",i="lhxjkf5",h="lhxjkf8"},5761:function(t,e,a){"use strict";a.r(e);var s=a(2807),l=a(3626),n=a(7938),c=a.n(n),r=a(5562),o=a(5831),i=a(3276),h=a(8299),x=a(5769);e.default=function(t){let{screen:e="pc",dramaCardData:a,...n}=t,{thumbnail:u,title:d,genres:v,makers:f,releaseYear:q,episodesNum:g}=a,w=null,b=null;switch(e){case"pc":w=x.FY,b=x.HJ;break;case"mobile":w=x.eg,b=x.Tq}return(0,s.jsxs)("div",{className:x.g9[e],...n,children:[(0,s.jsx)("div",{className:w,children:u?(0,s.jsx)(c(),{src:u,alt:d+"사진",layout:"fill",objectFit:"cover",objectPosition:"center",className:x.mw}):(0,s.jsx)("div",{className:x.SL})}),"pc"===e?(0,s.jsx)(h.default,{type:"vertical"}):null,(0,s.jsxs)("div",{className:b,children:[(0,s.jsx)(r.default,{content:d,hn:"h3"}),(0,s.jsx)(h.default,{unit:.25}),(0,s.jsx)("div",{className:x.tx,children:v.map((t,e)=>(0,s.jsxs)("div",{className:x.tx,children:[(0,s.jsx)(o.default,{label:t,type:"suggestion",shape:"square"}),(0,s.jsx)(h.default,{type:"vertical",unit:.25})]},e))}),(0,s.jsx)(h.default,{unit:.25}),(0,s.jsxs)("div",{className:x.tx,children:[(0,s.jsx)(i.default,{content:l.default.drama.label.maker,color:"disabled"}),(0,s.jsx)(h.default,{type:"vertical",unit:.5}),f.map((t,e)=>(0,s.jsxs)("div",{className:x.tx,children:[(0,s.jsx)(i.default,{content:t}),e<f.length-1?(0,s.jsx)(i.default,{content:",\xa0"}):null]},e))]}),(0,s.jsx)(h.default,{unit:.25}),(0,s.jsxs)("div",{className:x.tx,children:[(0,s.jsx)(i.default,{content:l.default.drama.label.releaseYear,color:"disabled"}),(0,s.jsx)(h.default,{type:"vertical",unit:.5}),(0,s.jsx)(i.default,{content:q.toString()})]}),(0,s.jsx)(h.default,{unit:.25}),(0,s.jsxs)("div",{className:x.tx,children:[(0,s.jsx)(i.default,{content:l.default.drama.label.episodeNum,color:"disabled"}),(0,s.jsx)(h.default,{type:"vertical",unit:.5}),(0,s.jsx)(i.default,{content:g.toString()})]})]})]})}},5831:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return r}});var s=a(2807),l=a(916);a(813),a(5149);var n={round:"koxsgt5",square:"koxsgt6"},c={filter:"koxsgt1 koxsgt0",filterselected:"koxsgt2 koxsgt0",keyword:"koxsgt3 koxsgt0",suggestion:"koxsgt4 koxsgt0"},r=function(t){let{type:e,label:a,shape:r="round",onSelect:o,onDelete:i}=t,h="".concat(c[e]," ").concat(n[r]);switch(e){case"filter":return(0,s.jsx)("div",{className:h,onSelect:()=>console.log(a),onClick:()=>o&&o(a),children:(0,s.jsx)("span",{children:a})});case"keyword":return(0,s.jsxs)("div",{className:h,children:[(0,s.jsx)("span",{children:a}),(0,s.jsx)("span",{children:(0,s.jsx)(l.default,{type:"close",color:"white",onClick:()=>i&&i(a)})})]});case"suggestion":return(0,s.jsx)("div",{className:h,children:(0,s.jsx)("span",{children:a})})}}},916:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return c}});var s=a(2807);a(813),a(6301);var l={black:"hoboib1",white:"hoboib2",lightgrey:"hoboib3",darkgrey:"hoboib4"};let n={search:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M384.035-336Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.035q0 40.381-12.5 76.173T577-434l214 214q11 11 11 25t-11 25q-11 11-25.5 11T740-170L526-383q-30 22-65.792 34.5T384.035-336ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/></svg>',close:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -940 900 960" width="20"><path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z"/></svg>',archive:'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M270-80q-45 0-77.5-29.637T160-183v-564q0-36.566 22.118-65.434Q204.235-841.302 240-849l308-64q28-6 50 12.14 22 18.139 22 46.86v497q0 21.162-13 37.581Q594-303 573-298l-313 67q-17.143 3.692-28.571 17.538Q220-199.615 220-183q0 19 15 31t35 12h470v-630q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T800-770v630q0 24.75-17.625 42.375T740-80H270Zm70-228 220-47v-499l-220 45v501Zm-60 12.809V-796l-20 4q-17 4-28.5 15.827T220-747v471q9.062-5.2 19.031-9.1Q249-289 260-291l20-4.191ZM220-792v516-516Z"/></svg>',map:'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"/></svg>',chevronLeft:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"/></svg>',chevronRight:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>',chevronUp:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-529 324-373q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-529Z"/></svg>',chevronDown:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-362q-8 0-15-2.5t-13-8.5L268-557q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-373q-6 6-13 8.5t-15 2.5Z"/></svg>',moreHoriz:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>'};var c=function(t){let{type:e,color:a,...c}=t;return(0,s.jsx)("span",{...c,className:l[a],children:(0,s.jsx)("span",{dangerouslySetInnerHTML:{__html:n[e]}})})}},8299:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return o}});var s=a(2807),l=a(3027);a(2576);var n={1:"ayx3ts1 ayx3ts0",2:"ayx3ts2 ayx3ts0",3:"ayx3ts3 ayx3ts0","0.25":"ayx3ts4 ayx3ts0","0.5":"ayx3ts5 ayx3ts0","0.75":"ayx3ts6 ayx3ts0","1.5":"ayx3ts7 ayx3ts0","2.5":"ayx3ts8 ayx3ts0"},c={1:"ayx3ts9 ayx3ts0",2:"ayx3tsa ayx3ts0",3:"ayx3tsb ayx3ts0","0.25":"ayx3tsc ayx3ts0","0.5":"ayx3tsd ayx3ts0","0.75":"ayx3tse ayx3ts0","1.5":"ayx3tsf ayx3ts0","2.5":"ayx3tsg ayx3ts0"};let r=(0,l.memo)(function(t){let{type:e="horizontal",unit:a=1}=t;return(0,s.jsx)("div",{className:"horizontal"===e?"".concat(n[a]):"".concat(c[a])})});var o=r},5562:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return o}});var s=a(2807);a(813),a(8924);var l={start:"_1uhtzyeb",center:"_1uhtzyec",end:"_1uhtzyed",left:"_1uhtzyee",right:"_1uhtzyef"},n={black:"_1uhtzyeg",white:"_1uhtzyeh"},c={h1:"_1uhtzye6 _1uhtzye0",h2:"_1uhtzye7 _1uhtzye0",h3:"_1uhtzye8 _1uhtzye0",h4:"_1uhtzye9 _1uhtzye0",h5:"_1uhtzyea _1uhtzye0"},r={h1:"_1uhtzye1",h2:"_1uhtzye2",h3:"_1uhtzye3",h4:"_1uhtzye4",h5:"_1uhtzye5"},o=function(t){let{content:e,hn:a,align:o="start",color:i="white",...h}=t,x="".concat(c[a]," ").concat(r[a]," ").concat(l[o]," ").concat(n[i]);switch(a){case"h1":return(0,s.jsx)("h1",{className:x,...h,children:e});case"h2":return(0,s.jsx)("h2",{className:x,...h,children:e});case"h3":return(0,s.jsx)("h3",{className:x,...h,children:e});case"h4":return(0,s.jsx)("h4",{className:x,...h,children:e});case"h5":return(0,s.jsx)("h5",{className:x,...h,children:e});default:return(0,s.jsx)(s.Fragment,{})}}},3276:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return o}});var s=a(2807);a(813),a(4757);var l={start:"loxbcae",center:"loxbcaf",end:"loxbcag",left:"loxbcah",right:"loxbcai"},n={black:"loxbcaj",disabled:"loxbcak",white:"loxbcal"},c={8:"loxbca1 loxbca0",10:"loxbca2 loxbca0",12:"loxbca3 loxbca0",13:"loxbca4 loxbca0",14:"loxbca5 loxbca0",16:"loxbca6 loxbca0",18:"loxbca7 loxbca0",20:"loxbca8 loxbca0",24:"loxbca9 loxbca0",28:"loxbcaa loxbca0",32:"loxbcab loxbca0"},r={regular:"loxbcac",bold:"loxbcad"},o=function(t){let{content:e,type:a="span",size:o=16,weight:i="regular",align:h="start",color:x="white",...u}=t,d="".concat(c[o]," ").concat(r[i]," ").concat(l[h]," ").concat(n[x]);switch(a){case"span":return(0,s.jsx)("span",{className:d,...u,children:e});case"p":return(0,s.jsx)("p",{className:d,...u,children:e});default:return(0,s.jsx)(s.Fragment,{})}}},3626:function(t,e,a){"use strict";a.r(e),e.default={drama:{label:{maker:"제작",releaseYear:"연도",episodeNum:"회차"}},movie:{label:{director:"감독",releaseYaer:"연도"}},person:{label:{}}}},1224:function(){},5149:function(){},6301:function(){},2576:function(){},8924:function(){},4757:function(){},813:function(){}}]);