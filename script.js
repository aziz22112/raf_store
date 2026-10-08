/* ===== رقم الواتساب لاستقبال الطلبات: بصيغة دولية بدون + وبدون أصفار، مثال: 966501234567 ===== */
const WHATSAPP_NUMBER="966540711530";

/* ===== هنا تعدّل الكتب: الاسم، السعر (رقم بالريال، وإذا حطيت 0 يطلع "السعر عند الاستفسار")، المؤلف، الدار، عدد المجلدات ===== */
const products=[
 {cat:"tafsir",name:"عون الرحمن في تفسير القرآن",price:950,author:"أ.د. سليمان بن إبراهيم بن عبدالله اللاحم",publisher:"دار ابن الجوزي",volumes:"24 مجلداً",img:"images/awn.jpg"},
 {cat:"hadith",name:"فتح ذي الجلال والإكرام بشرح بلوغ المرام",price:700,author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"دار الوطن للنشر",volumes:"15 مجلداً",img:"images/fath.jpg"},
 {cat:"fiqh",name:"دروس وفتاوى من الحرمين الشريفين",price:450,author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"",volumes:"18 مجلداً",img:"images/doroos.jpg"},
 {cat:"fiqh",name:"تسهيل الفقه: الجامع لمسائل الفقه القديمة والمعاصرة",price:350,author:"أ.د. عبدالله بن عبدالعزيز الجبرين",publisher:"دار ابن الجوزي",volumes:"",img:"images/tasheel.jpg"}
];

if(typeof extraProducts!=="undefined")products.push(...extraProducts);
let cur=0,toastTimer;
const fmt=n=>n.toLocaleString("en-US");
const priceText=p=>p.price?`${fmt(p.price)} ريال`:"السعر عند الاستفسار";
let cart={};
try{cart=JSON.parse(localStorage.getItem("raf_cart")||"{}")}catch(e){cart={}}
function saveCart(){try{localStorage.setItem("raf_cart",JSON.stringify(cart))}catch(e){}}

/* ===== الأقسام (المجلدات) ===== */
/* لإضافة قسم جديد: أضف سطر هنا [الأيقونة, الاسم, لون1, لون2]، وبعدين في أي كتاب اكتب cat:"المفتاح".
   أمثلة جاهزة (شيل // لتفعيلها):
   stories:["📚","قصص وروايات","#a8453a","#5a1f1a"],
   english:["🇬🇧","كتب إنجليزية","#2f5a86","#17304f"],
   egypt:["🇪🇬","كتب مصرية","#8a6a2b","#4a3514"],
   films:["🎬","أفلام وسينما","#5b3a8a","#2b1a4a"], */
const CATS={
 tafsir:["📖","قسم التفسير","#2f6f5e","#164236"],
 hadith:["📜","قسم الحديث وشروحه","#8a5a2b","#4a2d14"],
 fiqh:["⚖️","قسم الفقه والفتاوى","#2f5a86","#17304f"],
 general:["🏛️","قسم الموسوعات والتاريخ والعقيدة","#7a3d6b","#3d1c36"]
};
const countText=c=>c==1?"كتاب":c==2?"كتابان":c<=10?c+" كتب":c+" كتاباً";
const cardHTML=(p,i)=>`<div class="card" onclick="openItem(${i})"><div class="imgbox"><img class="photo" src="${p.img}" alt=""></div><h3>${p.name}</h3><p class="price">${priceText(p)}</p><button class="add" onclick="event.stopPropagation();addToCart(${i})">أضف للسلة</button></div>`;

function buildFolders(){
  foldersGrid.innerHTML=Object.keys(CATS).map(k=>{
    const c=products.filter(p=>p.cat===k).length;
    if(!c)return"";
    return `<button class="folder" style="--c1:${CATS[k][2]};--c2:${CATS[k][3]}" onclick="openCat('${k}')"><span class="fico">${CATS[k][0]}</span><span class="fname">${CATS[k][1].replace("قسم ","")}</span><span class="fcount">${countText(c)}</span><span class="fgo">تصفّح ←</span></button>`;
  }).join("");
}
function buildNav(){
  const ks=Object.keys(CATS).filter(k=>products.some(p=>p.cat===k));
  const items=[`<button class="nl" data-k="home" onclick="goHome()">🏠 الرئيسية</button>`,
    ...ks.map(k=>`<button class="nl" data-k="${k}" onclick="openCat('${k}')">${CATS[k][0]} ${CATS[k][1].replace("قسم ","")}</button>`)];
  document.querySelector("nav").innerHTML=items.join('<span class="orn">•</span>')+`<span class="orn">•</span><button class="cart-btn" onclick="openCart()" aria-label="فتح السلة">🛒 السلة <span id="cartCount" class="badge" hidden>0</span></button>`;
}

/* الصفحة الحالية: الرئيسية، أو قسم (#tafsir)، أو نتائج بحث */
function render(scrollTop){
  const qv=q.value.trim();
  const h=location.hash.slice(1);
  let list=null,title="";
  if(qv){
    list=products.map((p,i)=>[p,i]).filter(([p])=>(p.name+" "+(p.author||"")).includes(qv));
    title="🔍 نتائج البحث: "+qv;
  }else if(CATS[h]){
    list=products.map((p,i)=>[p,i]).filter(([p])=>p.cat===h);
    title=CATS[h][0]+" "+CATS[h][1];
  }
  const navKey=qv?"":(CATS[h]?h:"home");
  document.querySelectorAll("nav .nl").forEach(b=>b.classList.toggle("active",b.dataset.k===navKey));
  document.querySelectorAll(".home-only").forEach(e=>e.hidden=!!list);
  pageView.hidden=!list;
  if(list){
    vTitle.textContent=title;
    vGrid.innerHTML=list.length?list.map(([p,i])=>cardHTML(p,i)).join(""):`<div class="soon">ما لقينا كتب مطابقة</div>`;
  }
  reveal();
  if(scrollTop)window.scrollTo({top:0});
}
function openCat(k){
  q.value="";
  if(location.hash==="#"+k)render(true);else location.hash=k;
}
function goHome(){
  q.value="";
  history.pushState(null,"",location.pathname+location.search);
  render(true);
}
window.addEventListener("hashchange",()=>{q.value="";render(true)});
function reveal(){
  const cs=document.querySelectorAll(".card:not(.in)");
  if(!("IntersectionObserver" in window)){cs.forEach(c=>c.classList.add("in"));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
  cs.forEach(c=>io.observe(c));
}
function openItem(i){
  const p=products[i];cur=i;
  pImg.src=p.img;pImg.className="photo";
  pName.textContent=p.name;pPrice.textContent=priceText(p);
  let l="";
  if(p.author)l+=`<li>المؤلف: ${p.author}</li>`;
  if(p.publisher)l+=`<li>الدار: ${p.publisher}</li>`;
  if(p.volumes)l+=`<li>عدد المجلدات: ${p.volumes}</li>`;
  pList.innerHTML=l||"<li>المواصفات قريباً</li>";
  popup.style.display="flex";
}
function closeItem(){popup.style.display="none"}

/* ===== السلة ===== */
function addToCart(i){
  cart[i]=(cart[i]||0)+1;saveCart();updateCart();
  showToast(`تمت إضافة «${products[i].name}» إلى السلة`);
}
function changeQty(i,d){
  cart[i]=(cart[i]||0)+d;
  if(cart[i]<=0)delete cart[i];
  saveCart();updateCart();
}
function removeItem(i){delete cart[i];saveCart();updateCart()}
function updateCart(){
  for(const k of Object.keys(cart))if(!products[k])delete cart[k];
  const ids=Object.keys(cart);
  const total=ids.reduce((s,k)=>s+cart[k],0);
  cartCount.textContent=total;cartCount.hidden=total===0;
  cartList.innerHTML=ids.length?ids.map(k=>{const p=products[k];
    return `<div class="item"><img src="${p.img}" alt=""><div class="info"><h4>${p.name}</h4><div class="qty"><button onclick="changeQty(${k},-1)" aria-label="تقليل الكمية">−</button><span>${cart[k]}</span><button onclick="changeQty(${k},1)" aria-label="زيادة الكمية">+</button></div><div class="lp">${p.price?fmt(p.price*cart[k])+" ريال":"السعر عند الاستفسار"}</div></div><button class="rm" onclick="removeItem(${k})" aria-label="حذف من السلة">🗑</button></div>`}).join("")
    :`<div class="empty">السلة فاضية. اضغط «أضف للسلة» على أي كتاب.</div>`;
  const sum=ids.reduce((a,k)=>a+(products[k].price||0)*cart[k],0);
  const unp=ids.some(k=>!products[k].price);
  cartTotal.textContent=ids.length?`عدد الكتب: ${total} | المجموع: ${fmt(sum)} ريال${unp?" + كتب بسعر عند الاستفسار":""}`:"";
  checkoutBtn.disabled=!ids.length;
}
function openCart(){
  closeItem();updateCart();
  drawer.classList.add("open");shade.classList.add("open");
  toast.classList.remove("show");
}
function closeCart(){drawer.classList.remove("open");shade.classList.remove("open")}
function checkout(){
  const ids=Object.keys(cart);if(!ids.length)return;
  const lines=ids.map((k,n)=>{const p=products[k];return `${n+1}. ${p.name} × ${cart[k]}${p.price?` (${fmt(p.price*cart[k])} ريال)`:""}`});
  const sum=ids.reduce((a,k)=>a+(products[k].price||0)*cart[k],0);
  const msg=`السلام عليكم، أبي أطلب من متجر رف:\n${lines.join("\n")}${sum?`\nالمجموع: ${fmt(sum)} ريال`:""}`;
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url,"_blank");
}
function showToast(m){
  toastMsg.textContent=m;toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),3500);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeItem()}});
/* ===== العلماء: لو حطيت صورة باسم المفتاح داخل images/authors/ مثل ibn-taymiyyah.jpg تطلع بدل الحرف ===== */
const AUTHORS=[["ibn-taymiyyah","شيخ الإسلام ابن تيمية","ابن تيمية","ت"],["shafii","الإمام الشافعي","الشافعي","ش"],["ibn-uthaymeen","الشيخ ابن عثيمين","العثيمين","ع"],["zuhayli","د. وهبة الزحيلي","الزحيلي","ز"],["fawzan","الشيخ صالح الفوزان","الفوزان","ف"],["ibn-katheer","الحافظ ابن كثير","ابن كثير","ك"],["shawkani","الإمام الشوكاني","الشوكاني","ش"],["ibn-aljawzi","الإمام ابن الجوزي","ابن الجوزي","ج"],["alusi","الإمام الآلوسي","الآلوسي","آ"],["ibn-abidin","ابن عابدين","ابن عابدين","ع"],["nabulsi","د. راتب النابلسي","النابلسي","ن"],["aqqad","عباس العقاد","العقاد","ع"],["lahim","أ.د. سليمان اللاحم","اللاحم","ل"],["jibrin","أ.د. عبدالله الجبرين","الجبرين","ج"]];
function buildAuthors(){
  authorsGrid.innerHTML=AUTHORS.map(([k,n,m,ch])=>{
    const c=products.filter(p=>(p.author||"").includes(m)).length;
    return c?`<button class="au" onclick="pickAuthor('${m}')"><span class="av"><b>${ch}</b><img src="images/authors/${k}.jpg" alt="" onerror="this.remove()"></span><span class="an">${n}</span><span class="ac">${c==1?"كتاب":c==2?"كتابان":c+" كتب"}</span></button>`:"";
  }).join("");
}
function pickAuthor(m){q.value=m;render(true)}
track.innerHTML=[...products,...products].map(p=>`<img src="${p.img}" alt="">`).join("");
q.value="";buildNav();buildAuthors();buildFolders();render();updateCart();


/* ===== خلفية الهيدر المتحركة =====
   تتبدّل كل 6 ثواني بين: مشاهد مرسومة عن الكتب والقراءة والقصص والأفلام + أغلفة كتب المتجر.
   لو تبي تضيف صور ثانية حطها في مجلد images/hero/ واكتب اسمها هنا:
   مثال: const HERO_EXTRA=[["images/hero/library.jpg","مكتبة"],["images/hero/reading.jpg","قراءة"]]; */
const HERO_EXTRA=[];
const heroEl=document.getElementById("hero");
const BC=["#b23a48","#2f6690","#3a7d44","#d9a441","#6a4c93","#c8553d","#1d7874","#8a5230"];
function starsSVG(n,maxY){let s=7,o="";const r=()=>(s=(s*9301+49297)%233280)/233280;for(let i=0;i<n;i++)o+=`<circle cx="${(r()*1600).toFixed(0)}" cy="${(r()*maxY).toFixed(0)}" r="${(r()*1.6+.6).toFixed(1)}" fill="#fff" opacity="${(r()*.6+.3).toFixed(2)}"/>`;return o}
function sparkSVG(n,minY,maxY){let s=13,o="";const r=()=>(s=(s*9301+49297)%233280)/233280;for(let i=0;i<n;i++)o+=`<path transform="translate(${r()*1600|0} ${minY+r()*(maxY-minY)|0}) scale(${(.5+r()*1.1).toFixed(2)})" d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#ffb347" opacity="${(.4+r()*.6).toFixed(2)}"/>`;return o}
function shelfSVG(){let s=11;const r=()=>(s=(s*9301+49297)%233280)/233280;let o="";[110,230,350].forEach(by=>{let x=-10;while(x<1600){const w=18+r()*26|0,h=62+r()*40|0,c=BC[r()*BC.length|0];o+=`<rect x="${x}" y="${by-h}" width="${w-2}" height="${h}" rx="2" fill="${c}"/><rect x="${x}" y="${by-h+10}" width="${w-2}" height="3" fill="#ffb347" opacity=".7"/>`;x+=w}o+=`<rect x="0" y="${by}" width="1600" height="10" fill="#4a2a18"/>`});return o}
function floatBooksSVG(){let s=5;const r=()=>(s=(s*9301+49297)%233280)/233280;let o="";for(let i=0;i<22;i++){const x=r()*1600|0,y=(r()*300+20)|0,w=(34+r()*40)|0,h=(w*1.35)|0,a=(r()*70-35)|0,c=BC[r()*BC.length|0];o+=`<g transform="translate(${x} ${y}) rotate(${a})" opacity="${(.55+r()*.45).toFixed(2)}"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="${c}"/><rect x="${-w/2}" y="${-h/2}" width="${(w*.16).toFixed(1)}" height="${h}" rx="2" fill="#000" opacity=".25"/><rect x="${(-w/2+w*.3).toFixed(1)}" y="${(-h/2+h*.2).toFixed(1)}" width="${(w*.5).toFixed(1)}" height="3" fill="#ffb347"/><rect x="${(-w/2+w*.3).toFixed(1)}" y="${(-h/2+h*.3).toFixed(1)}" width="${(w*.35).toFixed(1)}" height="3" fill="#ffb347" opacity=".7"/></g>`}return o}
const SVGH='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice">';
const SVGM=SVGH.replace("xMidYMax","xMidYMid");
const stackBooks=(()=>{let y=326;return [[300,36,"#b23a48",0],[260,32,"#2f6690",10],[280,34,"#3a7d44",-14],[230,30,"#d9a441",6],[200,28,"#6a4c93",-8]].map(([w,h,c,dx])=>{y-=h;return `<rect x="${800+dx-w/2}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}"/><rect x="${800+dx+w/2-14}" y="${y+4}" width="10" height="${h-8}" fill="#f5e6c0"/><rect x="${800+dx-w/2+14}" y="${y+h/2-2}" width="${w-50}" height="4" fill="#ffb347" opacity=".8"/>`}).join("")})();
const filmHoles=[...Array(46)].map((_,i)=>`<rect x="${-80+i*42}" y="118" width="18" height="12" rx="2"/><rect x="${-80+i*42}" y="220" width="18" height="12" rx="2"/>`).join("");
const filmFrames=[...Array(9)].map((_,i)=>{const x=-60+i*212;return `<rect x="${x}" y="136" width="190" height="78" rx="4" fill="${BC[i%BC.length]}"/><path d="M${x+80} 160V190L${x+110} 175Z" fill="#fff" opacity=".55"/>`}).join("");
const SCENES=[
 /* 1) مكتبة ورفوف */
 SVGM+`<defs><radialGradient id="g1" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#ffb347" stop-opacity=".35"/><stop offset="1" stop-color="#080b14" stop-opacity=".8"/></radialGradient></defs><rect width="1600" height="360" fill="#10131f"/>${shelfSVG()}<rect width="1600" height="360" fill="url(#g1)"/></svg>`,
 /* 2) كتاب مفتوح وسحر القصص */
 SVGH+`<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1530"/><stop offset="1" stop-color="#10131f"/></linearGradient><radialGradient id="r2" cx=".5" cy=".72" r=".55"><stop offset="0" stop-color="#f6c15a" stop-opacity=".8"/><stop offset="1" stop-color="#10131f" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="360" fill="url(#g2)"/>${starsSVG(60,360)}<rect width="1600" height="360" fill="url(#r2)"/><g stroke="#ffb347" stroke-opacity=".16" stroke-width="3">${[...Array(13)].map((_,i)=>{const a=(-170+i*13.3)*Math.PI/180;return `<line x1="800" y1="250" x2="${800+Math.cos(a)*1000|0}" y2="${250+Math.sin(a)*1000|0}"/>`}).join("")}</g>${sparkSVG(28,30,230)}<path d="M596 322Q700 300 800 328Q900 300 1004 322V334Q900 314 800 340Q700 314 596 334Z" fill="#2c3a73"/><path d="M800 250Q700 225 600 245L600 322Q700 300 800 328Z" fill="#f5e6c0"/><path d="M800 250Q900 225 1000 245L1000 322Q900 300 800 328Z" fill="#ecd9a8"/><g fill="none" stroke="#8a5230" stroke-width="1.6" opacity=".6">${[0,1,2,3,4].map(i=>`<path d="M622 ${262+i*11}Q700 ${246+i*11} 778 ${268+i*11}"/><path d="M822 ${268+i*11}Q900 ${246+i*11} 978 ${262+i*11}"/>`).join("")}</g></svg>`,
 /* 3) كومة كتب وكوب قهوة ومصباح */
 SVGM+`<defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10131f"/><stop offset="1" stop-color="#2c3a73"/></linearGradient><radialGradient id="l3" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="360" fill="url(#g3)"/><circle cx="560" cy="120" r="170" fill="url(#l3)"/><path d="M560 150V320M520 320H600" stroke="#0b0e18" stroke-width="8" stroke-linecap="round"/><path d="M522 120L598 120L580 70H540Z" fill="#ffb347"/><rect x="0" y="326" width="1600" height="34" fill="#1a2038"/>${stackBooks}<rect x="990" y="276" width="56" height="50" rx="8" fill="#f5e6c0"/><path d="M1046 288Q1072 290 1066 310Q1062 318 1046 318" fill="none" stroke="#f5e6c0" stroke-width="7"/><g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"><path d="M1006 266Q996 250 1008 238Q1018 226 1008 212"/><path d="M1028 266Q1018 250 1030 238Q1040 226 1030 212"/></g></svg>`,
 /* 4) كتب طايرة */
 SVGM+`<defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a2038"/><stop offset="1" stop-color="#1b1030"/></linearGradient></defs><rect width="1600" height="360" fill="url(#g4)"/>${starsSVG(40,360)}${floatBooksSVG()}</svg>`,
 /* 5) قلعة وقمر (خيال وقصص) */
 SVGH+`<defs><linearGradient id="g5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1030"/><stop offset=".7" stop-color="#8a3d5c"/><stop offset="1" stop-color="#e09a45"/></linearGradient></defs><rect width="1600" height="360" fill="url(#g5)"/>${starsSVG(50,160)}<circle cx="1150" cy="110" r="52" fill="#ffe9a8"/><circle cx="1134" cy="98" r="9" fill="#e8d08a" opacity=".6"/><circle cx="1166" cy="126" r="6" fill="#e8d08a" opacity=".6"/><path d="M0 300Q300 250 600 300T1200 290T1600 300V360H0Z" fill="#0b0e18"/><g fill="#080b14"><rect x="740" y="170" width="120" height="190"/><path d="M728 170L800 80L872 170Z"/><rect x="650" y="235" width="62" height="125"/><path d="M640 235L681 172L722 235Z"/><rect x="888" y="235" width="62" height="125"/><path d="M878 235L919 172L960 235Z"/><rect x="712" y="265" width="176" height="95"/></g><path d="M800 80V48" stroke="#080b14" stroke-width="3"/><path d="M800 48L830 58L800 68Z" fill="#ffb347"/><g fill="#ffb347" opacity=".8"><rect x="790" y="200" width="20" height="34" rx="10"/><rect x="672" y="268" width="14" height="26" rx="7"/><rect x="914" y="268" width="14" height="26" rx="7"/><rect x="760" y="300" width="14" height="26" rx="7"/><rect x="826" y="300" width="14" height="26" rx="7"/></g>${sparkSVG(14,40,200)}</svg>`,
 /* 6) شريط أفلام */
 SVGM+`<defs><linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1030"/><stop offset="1" stop-color="#1a2038"/></linearGradient><linearGradient id="b6" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="1600" height="360" fill="url(#g6)"/><path d="M300 0H420L640 360H160Z" fill="url(#b6)" opacity=".5"/><path d="M1300 0H1180L960 360H1440Z" fill="url(#b6)" opacity=".5"/><g transform="rotate(-6 800 180)"><rect x="-100" y="110" width="1800" height="130" fill="#06080f"/><g fill="#e8dcc0" opacity=".85">${filmHoles}</g>${filmFrames}</g>${sparkSVG(16,20,330)}</svg>`
];
const scenes=SCENES.map(html=>{const d=document.createElement("div");d.className="hs";d.innerHTML=html;heroEl.appendChild(d);return d});
const photos=[];
function addPhoto(src,cap){
  const im=new Image();
  im.onload=()=>{
    const d=document.createElement("div");d.className="hs";
    const bg=document.createElement("div");bg.className="bg";bg.style.backgroundImage=`url("${src}")`;
    const pt=document.createElement("img");pt.className="pt"+(Math.random()<.5?" r":"");pt.src=src;pt.alt="";
    const c=document.createElement("span");c.className="cap";c.textContent=cap;
    d.append(bg,pt,c);heroEl.appendChild(d);
    photos.splice(Math.floor(Math.random()*(photos.length+1)),0,d);
  };
  im.src=src;
}
products.forEach(p=>addPhoto(p.img,p.name));
HERO_EXTRA.forEach(([src,cap])=>addPhoto(src,cap||""));
let heroCur=null,heroTurn=0,hs=0,hp=0;
function heroShow(el){if(heroCur)heroCur.classList.remove("on");el.classList.add("on");heroCur=el}
function heroNext(){
  const useScene=heroTurn%2===0||!photos.length;heroTurn++;
  heroShow(useScene?scenes[hs++%scenes.length]:photos[hp++%photos.length]);
}
heroNext();
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)setInterval(heroNext,6500);
