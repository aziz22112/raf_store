/* ===== هنا تعدّل المنتجات: الاسم، السعر، الشركة، الحجم ===== */
const products=[
 {cat:"chips",name:"تسالي جبنة كريمية حارة",price:"3 ريال",company:"تسالي",size:"",img:"images/tasali.png"},
 {cat:"chips",name:"شيتوس أصابع كاتشب وجبنة",price:"3 ريال",company:"شيتوس",size:"",img:"images/cheetos.png"},
 {cat:"chips",name:"ليز كاتشب الطماطم",price:"3 ريال",company:"ليز",size:"",img:"images/lays.png"},
 {cat:"chips",name:"برينجلز باربيكيو",price:"7 ريال",company:"برينجلز",size:"40 جرام",img:"images/pringles.png"},
 {cat:"chips",name:"البطل تيكيتا فلفل وليمون",price:"3 ريال",company:"البطل",size:"",img:"images/tikita.png"},
 {cat:"juice",name:"عصير الربيع برتقال",price:"2 ريال",company:"الربيع",size:"",emoji:"🍊"},
 {cat:"juice",name:"عصير تفاح",price:"2 ريال",company:"",size:"",emoji:"🍎"},
 {cat:"juice",name:"عصير مانجو",price:"2 ريال",company:"",size:"",emoji:"🥭"},
 {cat:"choco",name:"رينجو ويفر بكريمة الشوكولاتة",price:"15 ريال",company:"رينجو",size:"علبة 12 قطعة",img:"images/ringo.png"},
 {cat:"choco",name:"جالاكسي سموث ميلك",price:"2 ريال",company:"جالاكسي",size:"30 جرام",img:"images/galaxy.png"},
 {cat:"choco",name:"فيريرو روشيه",price:"35 ريال",company:"فيريرو",size:"علبة 16 حبة",img:"images/ferrero.png"},
 {cat:"choco",name:"علبة شوكولاتة فاخرة",price:"60 ريال",company:"",size:"تشكيلة",img:"images/box.jpg",photo:true},
 {cat:"choco",name:"بريك ويفر بالشوكولاتة",price:"10 ريال",company:"تيفاني",size:"علبة",img:"images/brk.png"}
];
function render(){
  const q=document.getElementById("q").value.trim();
  for(const c of ["chips","juice","choco"]){
    const el=document.getElementById("g-"+c);el.innerHTML="";
    products.forEach((p,i)=>{
      if(p.cat!==c||(q&&!p.name.includes(q)))return;
      el.insertAdjacentHTML("beforeend",
       `<div class="card" onclick="openItem(${i})"><div class="imgbox">${p.emoji?`<div class="emoji">${p.emoji}</div>`:`<img class="${p.photo?'photo':''}" src="${p.img}" alt="">`}</div><h3>${p.name}</h3><p class="price">${p.price}</p></div>`);
    });
  }
}
function openItem(i){
  const p=products[i];
  if(p.emoji){pImg.style.display="none";pEmoji.style.display="block";pEmoji.textContent=p.emoji}else{pEmoji.style.display="none";pImg.style.display="block";pImg.src=p.img;pImg.className=p.photo?"photo":""}pName.textContent=p.name;pPrice.textContent=p.price;
  let l="";if(p.company)l+=`<li>الشركة: ${p.company}</li>`;if(p.size)l+=`<li>الحجم: ${p.size}</li>`;
  pList.innerHTML=l||"<li>المواصفات قريباً</li>";
  popup.style.display="flex";
}
function closeItem(){popup.style.display="none"}
render();
