(function(){
var C=window.SITE_CONFIG||{},d=document;
function wa(t){return 'https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(t)}
function track(n,p){try{if(window.gtag&&C.ga4Id&&localStorage.getItem('ck')==='1')gtag('event',n,p||{})}catch(e){}}
/* menu mobile */
var mb=d.querySelector('.menu-btn'),nav=d.querySelector('nav.links');
if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}})}
/* agenda online (opcional) */
if(C.agendaUrl){d.querySelectorAll('[data-agendar]').forEach(function(a){a.href=C.agendaUrl;a.target='_blank';a.rel='noopener'});d.querySelectorAll('[data-online]').forEach(function(a){a.hidden=false;a.href=C.agendaUrl})}
d.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa(a.getAttribute('data-wa'));a.target='_blank';a.rel='noopener'});
/* comparador antes/depois */
d.querySelectorAll('.ba').forEach(function(b){var r=b.querySelector('input');function s(){b.style.setProperty('--pos',r.value+'%');r.setAttribute('aria-valuetext',r.value+'% do depois visível')}r.addEventListener('input',s);s()});
/* formulário */
var f=d.getElementById('lead');
if(f){
var q=new URLSearchParams(location.search).get('procedimento');
if(q){var sel=f.querySelector('select');if(sel)for(var i=0;i<sel.options.length;i++)if(sel.options[i].getAttribute('data-slug')===q)sel.selectedIndex=i}
f.addEventListener('submit',function(e){
e.preventDefault();var m=d.getElementById('lmsg'),v=function(n){return (f.elements[n].value||'').trim()};
if(v('site')){return}
if(!v('nome')||!v('tel')){m.textContent='Preencha nome e telefone para continuar.';return}
if(!f.elements.consent.checked){m.textContent='Confirme o consentimento para continuar.';return}
var data={nome:v('nome'),telefone:v('tel'),interesse:v('interesse'),mensagem:v('mensagem'),origem:location.href,consentimento:true};
track('agendamento_formulario',{interesse:data.interesse});
if(C.formEndpoint){
m.textContent='Enviando...';
fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)}).then(function(r){if(!r.ok)throw 0;m.textContent='Recebemos seu pedido. Entraremos em contato em breve.';f.reset()}).catch(function(){m.textContent='Não foi possível enviar agora. Tente pelo WhatsApp ou pelo telefone.'})
}else{
var t='Olá! Vim pelo site e desejo agendar minha avaliação.\nNome: '+data.nome+'\nTelefone: '+data.telefone+(data.interesse?'\nInteresse: '+data.interesse:'')+(data.mensagem?'\nMensagem: '+data.mensagem:'');
m.textContent='Abrindo o WhatsApp com seus dados...';window.open(wa(t),'_blank','noopener')}
})}
/* compartilhar */
d.querySelectorAll('[data-share]').forEach(function(b){b.addEventListener('click',function(){var u=location.href.split('#')[0],t=d.title;if(navigator.share){navigator.share({title:t,url:u}).catch(function(){})}else{window.open('https://wa.me/?text='+encodeURIComponent(t+' '+u),'_blank','noopener')}track('compartilhar')})});
/* medição de cliques (só com GA4 ativo e consentimento) */
d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-track]');if(a)track('agendamento_click',{local:a.getAttribute('data-track')})});
/* GA4 + aviso de cookies */
if(C.ga4Id){
function load(){if(window.gtag)return;var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+C.ga4Id;d.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',C.ga4Id,{anonymize_ip:true})}
var st=localStorage.getItem('ck');
if(st==='1')load();
else if(st===null){var k=d.getElementById('ck');if(k){k.style.display='flex';k.querySelector('[data-ok]').onclick=function(){localStorage.setItem('ck','1');k.remove();load()};k.querySelector('[data-no]').onclick=function(){localStorage.setItem('ck','0');k.remove()}}}
}
})();
