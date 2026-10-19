(() => {
 const grid=document.getElementById('ornamentGrid'),search=document.getElementById('searchInput'),category=document.getElementById('categoryFilter'),visible=document.getElementById('visibleCount'),summary=document.getElementById('resultSummary'),empty=document.getElementById('emptyState'),clear=document.getElementById('clearSearch');
 const categories=[...new Set(ORNAMENTS.map(x=>x.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
 categories.forEach(cat=>{const count=ORNAMENTS.filter(o=>o.category===cat).length;const opt=document.createElement('option');opt.value=cat;opt.textContent=`${cat} (${count})`;category.appendChild(opt)});
 document.getElementById('totalCount').textContent=ORNAMENTS.length;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(){
  const q=search.value.trim().toLocaleLowerCase(),cat=category.value;
  const results=ORNAMENTS.filter(o=>(cat==='All'||o.category===cat)&&(!q||[o.en,o.te,o.category,o.desc,o.id].some(v=>String(v||'').toLocaleLowerCase().includes(q))));
  grid.innerHTML=results.map(o=>`<article class="ornament-card"><div class="image-wrap"><span class="image-number">${esc(o.id)}</span><img src="${esc(o.image)}" alt="${esc(o.en)}" loading="lazy" onerror="this.onerror=null;this.src='images/ornaments/ornament_001.png'"></div><div class="card-body"><span class="badge">${esc(o.category)}</span><h3>${esc(o.en)}</h3><div class="telugu">${esc(o.te)}</div><p>${esc(o.desc)}</p></div></article>`).join('');
  visible.textContent=`${results.length} ${results.length===1?'item':'items'}`;
  summary.textContent=(q||cat!=='All')?'Filtered catalogue':'Showing all ornaments';
  empty.hidden=results.length!==0;grid.hidden=results.length===0;clear.hidden=!search.value;
 }
 function reset(){search.value='';category.value='All';render();search.focus()}
 search.addEventListener('input',render);category.addEventListener('change',render);clear.addEventListener('click',()=>{search.value='';render();search.focus()});document.getElementById('resetFilters').addEventListener('click',reset);document.getElementById('emptyReset').addEventListener('click',reset);
 render();
})();