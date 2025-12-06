import{a as u,S as d,i}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="53497690-592ac66f2c7c0c491717e710e",m=o=>{const s=`https://pixabay.com/api/?key=${f}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`;return u.get(s).then(t=>t.data)},p=new d(".gallery a"),y=o=>{const s=document.querySelector(".gallery"),t=o.map(n=>`
        <li>
            <a href="${n.largeImageURL}">
                <img src="${n.webformatURL}" alt="${n.tags}" />
            </a>
            <ul class="description">
                <li><span>Likes:</span> ${n.likes}</li>
                <li><span>Views:</span> ${n.views}</li>
                <li><span>Comments:</span> ${n.comments}</li>
                <li><span>Downloads:</span> ${n.downloads}</li>
            </ul>
        </li>
    `).join("");s.insertAdjacentHTML("beforeend",t),p.refresh()},h=()=>{const o=document.querySelector(".gallery");o.innerHTML=""},g=()=>{document.querySelector(".loader").classList.remove("hidden")},c=()=>{document.querySelector(".loader").classList.add("hidden")},l=document.querySelector(".form"),L=l.querySelector('input[name="search-text"]');c();l.addEventListener("submit",async o=>{o.preventDefault();const s=L.value.trim();if(!s){i.warning({message:"Please enter a search term!"});return}h(),g();try{const t=await m(s);if(!t.hits||t.hits.length===0){i.info({message:"Sorry, no images found. Try another search!"});return}y(t.hits)}catch(t){console.error(t),i.error({message:"Something went wrong, please try again later!"})}finally{c()}});
//# sourceMappingURL=index.js.map
