/* IceT coach mode
   - Coaches unlock with the shared code (home page "Coach login", or a link ending in ?coach=CODE).
   - Coach mode shows [data-coach-only] content, a Feedback button on every page, and draft pages.
   - Pages marked <meta name="icet-draft" content="1"> are covered for everyone else.
   Note: this hides content from casual viewers; it is not real security (the site is public). */
(function(){
  'use strict';
  var KEY='icet-coach', CODE_HASH='1769rrpbte3';          // hash of the shared coach code
  var TO=['jayalalj','gmail.com'].join('@');               // where feedback goes
  function h(str){ // cyrb53, returned in base36 — obscures the code, not encryption
    var h1=0xdeadbeef, h2=0x41c6ce57;
    for(var i=0,ch;i<str.length;i++){ ch=str.charCodeAt(i); h1=Math.imul(h1^ch,2654435761); h2=Math.imul(h2^ch,1597334677); }
    h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
    h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
    return (4294967296*(2097151&h2)+(h1>>>0)).toString(36);
  }
  function norm(c){ return String(c||'').trim().toLowerCase(); }
  function ok(c){ return h(norm(c))===CODE_HASH; }
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ v==null?localStorage.removeItem(k):localStorage.setItem(k,v); }catch(e){} }
  var root=document.documentElement;
  function isCoach(){ return root.classList.contains('coach'); }
  function apply(on){ root.classList.toggle('coach',!!on); set(KEY,on?'1':null); render(); }

  // unlock from link: ?coach=CODE
  try{
    var u=new URL(location.href), q=u.searchParams.get('coach');
    if(q!==null){ if(ok(q)) set(KEY,'1'); u.searchParams.delete('coach'); history.replaceState(null,'',u.pathname+(u.search||'')+u.hash); }
  }catch(e){}
  if(get(KEY)==='1') root.classList.add('coach');

  // ---------- styles ----------
  var css=''+
  'html:not(.coach) [data-coach-only]{display:none!important}'+
  '.icet-c{font-family:Barlow,"Segoe UI",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.35;color:#15202b}'+
  '.icet-c *{box-sizing:border-box}'+
  '.icet-pill{position:fixed;left:12px;bottom:12px;z-index:9998;display:flex;gap:6px;align-items:center}'+
  '.icet-pill button{font-family:"Barlow Condensed",sans-serif;font-weight:800;font-size:14px;letter-spacing:.5px;text-transform:uppercase;border:0;border-radius:999px;padding:7px 13px;cursor:pointer;box-shadow:0 3px 10px rgba(13,42,87,.25)}'+
  '.icet-fb{background:#d7263d;color:#fff}.icet-out{background:#fff;color:#0d2a57;border:1px solid #d5dde6!important}'+
  '.icet-modal{position:fixed;inset:0;z-index:9999;background:rgba(10,15,20,.55);display:flex;align-items:center;justify-content:center;padding:14px}'+
  '.icet-box{background:#fff;border-radius:14px;width:min(460px,100%);padding:16px 16px 14px;box-shadow:0 12px 40px rgba(0,0,0,.3)}'+
  '.icet-box h3{margin:0 0 4px;font-family:"Barlow Condensed",sans-serif;font-weight:800;font-size:22px;text-transform:uppercase;letter-spacing:.4px;color:#0d2a57}'+
  '.icet-box p{margin:0 0 10px;color:#5b6673;font-size:14px}'+
  '.icet-box textarea,.icet-box input{width:100%;font:inherit;border:1px solid #c9d3df;border-radius:8px;padding:9px 10px;background:#fff;color:#15202b}'+
  '.icet-box textarea{min-height:130px;resize:vertical}'+
  '.icet-box .ctx{font-size:12.5px;color:#5b6673;margin:6px 0 10px}'+
  '.icet-row{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:10px}'+
  '.icet-row button{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:16px;text-transform:uppercase;border:1px solid #d5dde6;background:#fff;color:#15202b;border-radius:8px;padding:7px 14px;cursor:pointer}'+
  '.icet-row .pri{background:#d7263d;border-color:#d7263d;color:#fff}'+
  '.icet-err{color:#d7263d;font-size:13px;min-height:18px;margin-top:4px}'+
  '.icet-note{font-size:12.5px;color:#1a9e5c;min-height:16px;margin-top:6px}'+
  '.icet-draft{position:fixed;inset:0;z-index:9997;background:#eef3f8;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center}'+
  '.icet-draft h2{font-family:"Barlow Condensed",sans-serif;font-weight:800;font-size:30px;text-transform:uppercase;margin:0 0 6px;color:#0d2a57}'+
  '.icet-draft p{color:#5b6673;margin:0 0 14px}'+
  '.icet-draft a,.icet-draft button{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:16px;text-transform:uppercase;border:1px solid #d5dde6;background:#fff;color:#0d2a57;border-radius:8px;padding:8px 14px;margin:0 4px;cursor:pointer;text-decoration:none}'+
  '.icet-c button:focus-visible,.icet-c textarea:focus-visible,.icet-c input:focus-visible,.icet-c a:focus-visible{outline:3px solid #1f6fd0;outline-offset:2px}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // ---------- UI ----------
  function el(tag,attrs,html){ var e=document.createElement(tag); for(var k in (attrs||{})) e.setAttribute(k,attrs[k]); if(html!=null) e.innerHTML=html; return e; }
  function closeModal(){ var m=document.querySelector('.icet-modal'); if(m) m.remove(); }
  function modal(inner){ closeModal(); var m=el('div',{'class':'icet-modal icet-c',role:'dialog','aria-modal':'true'}); var b=el('div',{'class':'icet-box'},inner); m.appendChild(b);
    m.addEventListener('click',function(e){ if(e.target===m) closeModal(); }); document.addEventListener('keydown',function esc(e){ if(e.key==='Escape'){ closeModal(); document.removeEventListener('keydown',esc); } });
    document.body.appendChild(m); return b; }

  function login(){
    var b=modal('<h3>Coach login</h3><p>Enter the coach code to see drafts and leave feedback.</p><input type="password" id="icet-code" autocomplete="off" placeholder="Coach code"><div class="icet-err" id="icet-err"></div><div class="icet-row"><button type="button" id="icet-cancel">Cancel</button><button type="button" class="pri" id="icet-go">Unlock</button></div>');
    var inp=b.querySelector('#icet-code'); inp.focus();
    function go(){ if(ok(inp.value)){ closeModal(); apply(true); } else { b.querySelector('#icet-err').textContent='That code isn\'t right. Check with the coach who shared it.'; inp.select(); } }
    b.querySelector('#icet-go').onclick=go; inp.addEventListener('keydown',function(e){ if(e.key==='Enter') go(); });
    b.querySelector('#icet-cancel').onclick=closeModal;
  }
  window.IceTCoachLogin=login;

  function context(){
    var bits=[]; document.querySelectorAll('.chip[aria-pressed="true"]').forEach(function(c){ bits.push(c.textContent.trim()); });
    var step=document.getElementById('step'); if(step && step.textContent.trim()) bits.push(step.textContent.trim());
    return bits.join(' · ');
  }
  function feedback(){
    var page=document.title||'IceT page', k='icet-fb:'+location.pathname, ctx=context();
    var b=modal('<h3>Feedback for Janaka</h3><p>What should change on this page? Be as specific as you like: which play, which player, which step.</p>'+
      '<div class="ctx"><b>Page:</b> '+page.replace(/</g,'&lt;')+(ctx?'<br><b>On screen now:</b> '+ctx.replace(/</g,'&lt;'):'')+'</div>'+
      '<textarea id="icet-text" placeholder="e.g. On Strong-side exit, step 3: LD should be closer to the boards."></textarea>'+
      '<div class="icet-note" id="icet-note"></div>'+
      '<div class="icet-row"><button type="button" id="icet-copy">Copy text</button><button type="button" id="icet-cancel">Close</button><button type="button" class="pri" id="icet-send">Send by email</button></div>');
    var ta=b.querySelector('#icet-text'); ta.value=get(k)||''; ta.focus();
    ta.addEventListener('input',function(){ set(k,ta.value||null); });
    function body(){ return ta.value.trim()+'\n\n---\nPage: '+page+'\nLink: '+location.href.split('?')[0]+(ctx?'\nOn screen: '+ctx:''); }
    b.querySelector('#icet-send').onclick=function(){
      if(!ta.value.trim()){ b.querySelector('#icet-note').textContent='Type your feedback first.'; return; }
      location.href='mailto:'+TO+'?subject='+encodeURIComponent('IceT feedback: '+page)+'&body='+encodeURIComponent(body());
      b.querySelector('#icet-note').textContent='Your email app should open with this filled in. Press Send there. If nothing opened, use Copy text and email it to '+TO+'.';
      set(k,null);
    };
    b.querySelector('#icet-copy').onclick=function(){
      var t=body(); (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){ b.querySelector('#icet-note').textContent='Copied. Paste it into an email or text to Janaka ('+TO+').'; },function(){ ta.select(); b.querySelector('#icet-note').textContent='Select the text and copy it manually.'; });
    };
    b.querySelector('#icet-cancel').onclick=closeModal;
  }

  var pill=null, cover=null;
  function render(){
    if(!document.body) return;
    // floating coach controls
    if(isCoach()){
      if(!pill){ pill=el('div',{'class':'icet-pill icet-c'},'<button type="button" class="icet-fb">✎ Feedback</button><button type="button" class="icet-out" title="Leave coach mode">Coach ✕</button>');
        pill.querySelector('.icet-fb').onclick=feedback; pill.querySelector('.icet-out').onclick=function(){ apply(false); }; document.body.appendChild(pill); }
    } else if(pill){ pill.remove(); pill=null; }
    // draft pages
    var draft=document.querySelector('meta[name="icet-draft"]');
    if(draft && !isCoach()){
      if(!cover){ cover=el('div',{'class':'icet-draft icet-c'},'<div><h2>Coming soon</h2><p>This page is still being reviewed by the coaches.</p><a href="../">IceT home</a><button type="button" id="icet-cl">Coach login</button></div>');
        cover.querySelector('#icet-cl').onclick=login; document.body.appendChild(cover); }
    } else if(cover){ cover.remove(); cover=null; }
    document.querySelectorAll('[data-coach-login]').forEach(function(a){ a.textContent=isCoach()?'Coach mode on · sign out':'Coach login'; a.onclick=function(e){ e.preventDefault(); isCoach()?apply(false):login(); }; });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();
