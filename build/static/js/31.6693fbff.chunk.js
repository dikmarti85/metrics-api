(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[31],{730:function(t,e,o){"use strict";o.r(e);var a=o(7),i=(o(0),o(11)),r=o(4),s=o(69),l=o(189),n=o(1),c=function(t){var e=t.height,o=t.color,a=void 0===o?[]:o,c=Object(s.a)(),h={grid:{top:"10%",bottom:"10%",left:"5%",right:"5%"},legend:{itemGap:20,icon:"circle",textStyle:{color:c.palette.text.secondary,fontSize:13,fontFamily:"roboto"}},tooltip:{},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:c.palette.text.secondary,fontSize:14,fontFamily:"roboto"}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},splitLine:{lineStyle:{color:c.palette.text.secondary,opacity:.15}},axisLabel:{color:c.palette.text.secondary,fontSize:13,fontFamily:"roboto"}},series:[{data:[30,40,20,50,40,80,90],type:"line",stack:"This month",name:"This month",smooth:!0,symbolSize:4,lineStyle:{width:4}},{data:[20,50,15,50,30,70,95],type:"line",stack:"Last month",name:"Last month",smooth:!0,symbolSize:4,lineStyle:{width:4}}]};return Object(n.jsx)(l.a,{style:{height:e},option:Object(r.a)(Object(r.a)({},h),{},{color:Object(i.a)(a)})})},h={grid:{left:0,top:0,right:0,bottom:0},legend:{},tooltip:{},xAxis:{show:!1,type:"category",showGrid:!1,boundaryGap:!1},yAxis:{show:!1,type:"value",splitLine:{show:!1}},series:[{data:[25,18,20,30,40,43],type:"line",areaStyle:{},smooth:!0}]},p=function(t){var e=t.height,o=t.color;return Object(n.jsx)(l.a,{style:{height:e},option:Object(r.a)(Object(r.a)({},h),{},{color:Object(i.a)(o)})})},b=o(45),x=o(180),m=function(t){var e=t.height,o=t.color,a=void 0===o?[]:o,c=Object(s.a)(),h={legend:{show:!0,itemGap:20,icon:"circle",bottom:0,textStyle:{color:c.palette.text.secondary,fontSize:13,fontFamily:"roboto"}},tooltip:{show:!1,trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},xAxis:[{axisLine:{show:!1},splitLine:{show:!1}}],yAxis:[{axisLine:{show:!1},splitLine:{show:!1}}],series:[{name:"Traffic Rate",type:"pie",radius:["45%","72.55%"],center:["50%","50%"],avoidLabelOverlap:!1,hoverOffset:5,stillShowZeroSum:!1,label:{normal:{show:!1,position:"center",textStyle:{color:c.palette.text.secondary,fontSize:13,fontFamily:"roboto"},formatter:"{a}"},emphasis:{show:!0,textStyle:{fontSize:"14",fontWeight:"normal"},formatter:"{b} \n{c} ({d}%)"}},labelLine:{normal:{show:!1}},data:[{value:65,name:"Google"},{value:20,name:"Facebook"},{value:15,name:"Others"}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};return Object(n.jsx)(l.a,{style:{height:e},option:Object(r.a)(Object(r.a)({},h),{},{color:Object(i.a)(a)})})},y=function(t){var e=t.height,o=(t.color,Object(s.a)()),a={grid:{top:"10%",bottom:"10%",right:"5%"},legend:{show:!1},color:["#223388","rgba(34, 51, 136, 0.8)"],barGap:0,barMaxWidth:"64px",tooltip:{},dataset:{source:[["Month","Website","App"],["Jan",2200,1200],["Feb",800,500],["Mar",700,1350],["Apr",1500,1250],["May",2450,450],["June",1700,1250]]},xAxis:{type:"category",axisLine:{show:!1},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{color:o.palette.text.secondary,fontSize:13,fontFamily:"roboto"}},yAxis:{axisLine:{show:!1},axisTick:{show:!1},splitLine:{lineStyle:{color:o.palette.text.secondary,opacity:.15}},axisLabel:{color:o.palette.text.secondary,fontSize:13,fontFamily:"roboto"}},series:[{type:"bar"},{type:"bar"}]};return Object(n.jsx)(l.a,{style:{height:e},option:Object(r.a)({},a)})},j=o(200),d=o(199),g=Object(b.a)("div")((function(t){var e,o=t.theme;return e={margin:"30px"},Object(a.a)(e,o.breakpoints.down("sm"),{margin:"16px"}),Object(a.a)(e,"& .breadcrumb",Object(a.a)({marginBottom:"30px"},o.breakpoints.down("sm"),{marginBottom:"16px"})),e}));e.default=function(){var t=Object(s.a)();return Object(n.jsxs)(g,{children:[Object(n.jsx)("div",{className:"breadcrumb",children:Object(n.jsx)(d.a,{routeSegments:[{name:"Charts",path:"/charts"},{name:"Echarts"}]})}),Object(n.jsx)(j.a,{title:"Doughnut Chart",children:Object(n.jsx)(m,{height:"350px",color:[t.palette.primary.dark,t.palette.primary.main,t.palette.primary.light]})}),Object(n.jsx)(x.a,{sx:{py:"12px"}}),Object(n.jsx)(j.a,{title:"Line Chart",children:Object(n.jsx)(c,{height:"350px",color:[t.palette.primary.main,t.palette.primary.light]})}),Object(n.jsx)(x.a,{sx:{py:"12px"}}),Object(n.jsx)(j.a,{title:"Comparison Chart",children:Object(n.jsx)(y,{height:"350px",color:[t.palette.primary.dark,t.palette.primary.light]})}),Object(n.jsx)(x.a,{sx:{py:"12px"}}),Object(n.jsx)(j.a,{title:"Area Chart",children:Object(n.jsx)(p,{height:"350px",color:[t.palette.primary.main]})})]})}}}]);