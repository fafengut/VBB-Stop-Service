import{u as y,r as k,o as s,c as t,b as a,w as f,v as x,e as b,f as w,t as u,F as v,g as C,h as r,i as d}from"./index.fcfb519e.js";import{a as B,u as F,_ as L,b as S,c as $,d as Q,e as T,f as I,g as N,h as O,i as R}from"./favorite.353f34c3.js";const V="locations",D={findByQuery:async _=>await B.get(V,_)},K={class:"pt-10 space-x-5 place-content-center"},A={key:0,class:"flex justify-center items-center mt-10"},U=a("div",{class:"animate-spin rounded-full h-64 w-64 border-b-8 border-white-900"},null,-1),j=[U],q={key:1,class:"mt-10"},E={class:"block"},M={key:2,class:"mt-10"},z={class:"flex"},G=["onClick"],H=["onClick"],J=["onClick"],P=["onClick"],W={key:0,src:$,alt:"S-Bahn-Logo",class:"w-6"},X={key:1,src:Q,alt:"U-Bahn-Logo",class:"w-6"},Y={key:2,src:T,alt:"Tram-Logo",class:"w-6"},Z={key:3,src:I,alt:"Bus-Logo",class:"w-6"},ee={key:4,src:N,alt:"Faehre-Logo",class:"w-6"},se={key:5,src:O,alt:"Fernverkehr-Logo",class:"w-6"},te={key:6,src:R,alt:"Regionalverkehr-Logo",class:"w-6"},ae={__name:"StopSuche",setup(_){const g=y(),o=k({searchQuery:"",loading:!1,error:null,stops:[]}),m=async()=>{try{o.value.loading=!0;const n=await D.findByQuery({query:o.value.searchQuery,poi:!1,addresses:!1});o.value.stops=n.data}catch(n){o.value.error=n}finally{o.value.loading=!1}},p=n=>{g.push({path:`/stops/${n}`})},l=F(),h=l.getFavoriteById;return(n,i)=>(s(),t(v,null,[a("div",K,[f(a("input",{type:"text",placeholder:"Search...",class:"rounded-lg m-1 font-medium text-gray-800 px-3 py-1","onUpdate:modelValue":i[0]||(i[0]=e=>o.value.searchQuery=e),onKeyup:i[1]||(i[1]=b(e=>m(),["enter"]))},null,544),[[x,o.value.searchQuery]]),a("button",{class:"bg-green-400 rounded-lg m-1 font-medium text-gray-800 px-3 py-1",onClick:i[2]||(i[2]=e=>m())}," Suchen ")]),o.value.loading?(s(),t("div",A,j)):o.value.error?(s(),t("div",q,[w(u(o.value.error.message)+" ",1),a("span",E,"Reason: "+u(o.value.error.response.data.msg),1)])):o.value.stops?(s(),t("div",M,[(s(!0),t(v,null,C(o.value.stops,e=>(s(),t("div",{key:e.id,class:"text-left py-1 cursor-pointer hover:text-green-400 relative"},[a("div",z,[a("div",{onClick:c=>p(e.id)},u(e.name),9,G),d(h)(e.id)?(s(),t("img",{key:0,src:L,alt:"Favorite-Icon",class:"absolute right-0",onClick:c=>d(l).remove(e.id)},null,8,H)):(s(),t("img",{key:1,src:S,alt:"Kein-Favorite-Icon",class:"absolute right-0",onClick:c=>d(l).add(e.id)},null,8,J))]),a("div",{class:"flex space-x-2 mb-3 mt-1",onClick:c=>p(e.id)},[e.products.suburban?(s(),t("img",W)):r("",!0),e.products.subway?(s(),t("img",X)):r("",!0),e.products.tram?(s(),t("img",Y)):r("",!0),e.products.bus?(s(),t("img",Z)):r("",!0),e.products.ferry?(s(),t("img",ee)):r("",!0),e.products.express?(s(),t("img",se)):r("",!0),e.products.regional?(s(),t("img",te)):r("",!0)],8,P)]))),128))])):r("",!0)],64))}};export{ae as default};
