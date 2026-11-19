const money = new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL',maximumFractionDigits:0});
const byId = id => document.getElementById(id);
function readBounded(id) { const input=byId(id); const value=Number(input.value); return Number.isFinite(value)?Math.min(Number(input.max),Math.max(Number(input.min),value)):0; }
function calculate(){const hours=readBounded('hours'),cost=readBounded('hourCost'),reduction=readBounded('reduction'); const total=hours*cost,saving=total*reduction/100; byId('reductionLabel').textContent=reduction+'%';byId('total').textContent=money.format(total);byId('saving').textContent=money.format(saving);byId('annual').textContent=money.format(saving*12);}
['hours','hourCost','reduction'].forEach(id=>{byId(id).addEventListener('input',calculate);byId(id).addEventListener('change',()=>{if(byId(id).value!=='')byId(id).value=readBounded(id);calculate();});});calculate();
(function(){
const form=byId('leadForm'),card=byId('quizCard'),status=byId('formStatus'),phone=byId('phone');
const panels=[...form.querySelectorAll('[data-step]')];
let step=0,sending=false,submitted=false;
const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','ttclid'];
let attribution={};
try{attribution=JSON.parse(sessionStorage.getItem('agx_attribution')||'{}');}catch{}
const params=new URLSearchParams(location.search);
attributionKeys.forEach(key=>{if(params.get(key))attribution[key]=params.get(key);});
try{sessionStorage.setItem('agx_attribution',JSON.stringify(attribution));}catch{}
function show(n){step=n;panels.forEach((p,i)=>p.hidden=i!==n);byId('quizCount').textContent='ETAPA '+(n+1)+' DE 5';byId('quizProgress').value=n+1;panels[n].querySelector('legend').focus({preventScroll:true});}
function valid(){for(const el of panels[step].querySelectorAll('input')){if(el.type!=='radio')el.value=el.value.trim();if(!el.reportValidity())return false;}return true;}
card.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{if(valid())show(step+1);}));
card.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{if(!sending)show(step-1);}));
function digits(v){let d=v.replace(/\D/g,'');if(d.length===13&&d.startsWith('55'))d=d.slice(2);return d.slice(0,11);}
function mask(d){if(!d)return '';if(d.length<=2)return '('+d;let s='('+d.slice(0,2)+') '+d.slice(2,3);if(d.length>3)s+=' '+d.slice(3,7);if(d.length>7)s+='-'+d.slice(7);return s;}
phone.addEventListener('input',()=>{phone.value=mask(digits(phone.value));phone.setCustomValidity('');});
form.addEventListener('submit',async event=>{
 event.preventDefault();if(sending||submitted)return;
 if(step<3){if(valid())show(step+1);return;}
 const number=digits(phone.value);phone.setCustomValidity(/^[1-9]{2}9\d{8}$/.test(number)?'':'Informe um celular com DDD: (11) 9 9999-9999.');
 if(!valid())return;
 for(let i=0;i<3;i++){if(!form.querySelector('input[name="'+['role','assets','challenge'][i]+'"]:checked')){show(i);return;}}
 const data=new FormData(form),get=k=>String(data.get(k)||'').trim();
 let visitor='';try{visitor=localStorage.getItem('zf_visitor_id')||'';}catch{}
 const payload={name:get('name'),company:get('company'),email:get('email'),phone:'55'+number,whatsapp:'55'+number,role:get('role'),assets:get('assets'),challenge:get('challenge'),source:'Landing page AGX',page_url:location.href,referrer:document.referrer,visitor_id:visitor,...attribution,
 notes:'Empresa: '+get('company')+'\nFunção: '+get('role')+'\nEquipamentos: '+get('assets')+'\nDesafio: '+get('challenge')+'\nEtapa: cadastro recebido; agendamento ainda não confirmado.',
 custom_fields:{role:get('role'),assets:get('assets'),challenge:get('challenge'),booking_status:'not_confirmed'}};
 sending=true;const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent='Enviando…';status.textContent='Enviando seu cadastro…';
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://app.usetalkify.com.br/webhooks/api-leads?workspace_id=2a117238-99f5-4b49-879f-e3926f1d4d5c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const text=await response.text();const result=text?JSON.parse(text):null;
  if(result&&(result.success===false||result.error))throw new Error('Cadastro recusado');
  submitted=true;form.hidden=true;byId('bookingPanel').hidden=false;card.classList.add('booking-open');byId('quizCount').textContent='ETAPA 5 DE 5';byId('quizProgress').value=5;byId('bookingFrame').src=byId('bookingFrame').dataset.src;byId('bookingPanel').querySelector('h3').focus({preventScroll:true});
  // Nome histórico preservado. Representa cadastro aceito, NÃO reserva confirmada.
  window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'whatsapp_lead',lead_channel:'form',booking_status:'not_confirmed'});
 }catch(error){status.textContent=error.name==='AbortError'?'O envio demorou e não foi possível confirmar o recebimento. Aguarde um momento antes de tentar novamente.':'Não foi possível confirmar seu cadastro. Tente novamente. Seus dados continuam preenchidos.';}
 finally{clearTimeout(timeout);sending=false;button.disabled=false;button.textContent='Ver horários disponíveis →';}
});
})();
