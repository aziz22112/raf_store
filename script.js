/* ===== رقم الواتساب لاستقبال الطلبات: بصيغة دولية بدون + وبدون أصفار، مثال: 966501234567 ===== */
const WHATSAPP_NUMBER="966540711530";

/* ===== هنا تعدّل الكتب: الاسم، السعر (رقم بالريال، وإذا حطيت 0 يطلع "السعر عند الاستفسار")، المؤلف، الدار، عدد المجلدات ===== */
const products=[
 {cat:"tafsir",name:"عون الرحمن في تفسير القرآن",price:950,author:"أ.د. سليمان بن إبراهيم بن عبدالله اللاحم",publisher:"دار ابن الجوزي",volumes:"24 مجلداً",img:"images/awn.jpg"},
 {cat:"hadith",name:"فتح ذي الجلال والإكرام بشرح بلوغ المرام",price:700,author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"دار الوطن للنشر",volumes:"15 مجلداً",img:"images/fath.jpg"},
 {cat:"fiqh",name:"دروس وفتاوى من الحرمين الشريفين",price:450,author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"",volumes:"18 مجلداً",img:"images/doroos.jpg"},
 {cat:"fiqh",name:"تسهيل الفقه: الجامع لمسائل الفقه القديمة والمعاصرة",price:350,author:"أ.د. عبدالله بن عبدالعزيز الجبرين",publisher:"دار ابن الجوزي",volumes:"",img:"images/tasheel.jpg"}
];

let cur=0,toastTimer;
const fmt=n=>n.toLocaleString("en-US");
const priceText=p=>p.price?`${fmt(p.price)} ريال`:"السعر عند الاستفسار";
let cart={};
try{cart=JSON.parse(localStorage.getItem("raf_cart")||"{}")}catch(e){cart={}}
function saveCart(){try{localStorage.setItem("raf_cart",JSON.stringify(cart))}catch(e){}}

function render(){
  const q=document.getElementById("q").value.trim();
  for(const c of ["tafsir","hadith","fiqh"]){
    const el=document.getElementById("g-"+c);el.innerHTML="";
    products.forEach((p,i)=>{
      if(p.cat!==c||(q&&!p.name.includes(q)))return;
      el.insertAdjacentHTML("beforeend",
       `<div class="card" onclick="openItem(${i})"><div class="imgbox"><img class="photo" src="${p.img}" alt=""></div><h3>${p.name}</h3><p class="price">${priceText(p)}</p><button class="add" onclick="event.stopPropagation();addToCart(${i})">أضف للسلة</button></div>`);
    });
  }
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
render();updateCart();
