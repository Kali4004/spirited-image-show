import type { EmailAccount } from "@/components/vault/data";

/**
 * Builds a fully self-contained HTML file (styles + script + data inline)
 * that works offline in any browser and can re-export itself.
 */
export function buildVaultHtml(accounts: EmailAccount[]): string {
  const data = JSON.stringify(accounts).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Cofre do Lobo</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Rajdhani:wght@500;600&display=swap" rel="stylesheet" />
<style>
:root{
  --bg:oklch(0.09 0.03 300);--fg:oklch(0.97 0.02 320);--card:oklch(0.14 0.05 300);
  --muted:oklch(0.72 0.06 310);--border:oklch(0.35 0.12 310 / 40%);
  --pink:oklch(0.68 0.29 335);--violet:oklch(0.6 0.27 295);--cyan:oklch(0.85 0.15 200);
  --grad:linear-gradient(100deg,oklch(0.68 0.29 335),oklch(0.6 0.27 295) 55%,oklch(0.85 0.15 200));
  --glow:0 0 10px oklch(0.6 0.27 295 / 70%),0 0 40px oklch(0.6 0.27 295 / 35%);
}
*{box-sizing:border-box;border-color:var(--border)}
body{margin:0;background:var(--bg);color:var(--fg);font-family:Rajdhani,system-ui,sans-serif;padding:16px 16px 40px}
h1,h2,h3,.display{font-family:Orbitron,system-ui,sans-serif}
.neon{background-image:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px}
.btn{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--violet);background:transparent;color:var(--fg);
  border-radius:12px;padding:9px 14px;font:inherit;font-weight:600;cursor:pointer}
.btn:hover{background:oklch(0.6 0.27 295 / 15%)}
.btn.primary{border:0;background-image:var(--grad);color:oklch(0.12 0.04 300);font-weight:800}
.status{margin:20px 0;color:var(--muted)}
.acc{border:1px solid oklch(0.68 0.29 335 / 40%);background:oklch(0.14 0.05 300 / 60%);border-radius:18px;padding:18px;margin-bottom:18px;box-shadow:var(--glow)}
.acc h3{margin:0;font-size:1.1rem;font-family:Rajdhani,sans-serif;font-weight:600;word-break:break-all}
.tag{border:1px solid var(--violet);color:var(--cyan);border-radius:999px;padding:2px 10px;font-size:10px;letter-spacing:.2em}
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-top:14px}
.lbl{font-size:11px;color:var(--muted);margin:0 0 4px}
.val{margin:0;font-size:14px;word-break:break-all}
.secret{display:flex;align-items:center;gap:8px;border:1px solid oklch(0.6 0.27 295 / 45%);border-radius:10px;padding:8px 10px;background:oklch(0.09 0.03 300 / 70%)}
.secret span{flex:1;letter-spacing:.25em;font-size:14px;overflow:hidden}
.icon{background:none;border:0;color:var(--muted);cursor:pointer;font-size:13px;font-family:inherit}
.icon:hover{color:var(--cyan)}
.svc{display:flex;gap:12px;border:1px solid oklch(0.85 0.15 200 / 30%);border-radius:14px;padding:12px;background:oklch(0.09 0.03 300 / 45%)}
.badge{width:44px;height:44px;border-radius:999px;display:grid;place-items:center;font-family:Orbitron,sans-serif;font-weight:900;font-size:12px;color:#100;flex:0 0 auto}
.sub{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--muted);margin:18px 0 0}
footer{margin-top:26px;color:var(--muted);font-size:12px;border-top:1px solid var(--border);padding-top:14px}
</style>
</head>
<body>
<header>
  <div>
    <h1 class="neon" style="margin:0;font-size:1.5rem">Cofre do Lobo</h1>
    <p style="margin:2px 0 0;color:var(--muted);font-size:13px">Seu arquivo pessoal</p>
  </div>
  <div class="row">
    <button class="btn" onclick="addAccount()">+ Adicionar e-mail</button>
    <button class="btn primary" onclick="saveFile()">Baixar HTML atualizado</button>
  </div>
</header>

<p class="status" id="status"></p>
<div id="list"></div>

<footer>
  <p style="margin:0;color:var(--fg);font-weight:600">Abra no navegador. Use sem internet.</p>
  <p style="margin:2px 0 0">Depois de editar, baixe o HTML atualizado.</p>
  <p style="margin:6px 0 0">Versão 1.0 · Projeto de estudo, sem auditoria de segurança. · Criado por Kali404 — Feito no Brasil 🇧🇷</p>
</footer>

<script id="vault-data" type="application/json">${data}</script>
<script>
var accounts = JSON.parse(document.getElementById('vault-data').textContent);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function secret(v){
  return '<div class="secret"><span data-v="'+esc(v)+'">••••••••••</span>'+
    '<button class="icon" onclick="toggle(this)">mostrar</button>'+
    '<button class="icon" onclick="copyVal(this)">copiar</button></div>';
}
function toggle(b){var s=b.previousElementSibling;var open=b.textContent==='ocultar';
  s.textContent=open?'••••••••••':s.dataset.v;b.textContent=open?'mostrar':'ocultar';}
function copyVal(b){var s=b.parentNode.querySelector('span');navigator.clipboard&&navigator.clipboard.writeText(s.dataset.v);b.textContent='copiado';setTimeout(function(){b.textContent='copiar'},1200);}
function render(){
  accounts.sort(function(a,b){return a.email.localeCompare(b.email)});
  var n=accounts.reduce(function(t,a){return t+a.services.length},0);
  document.getElementById('status').textContent=accounts.length+' e-mails · '+n+' serviços vinculados · ordem alfabética';
  document.getElementById('list').innerHTML=accounts.map(function(a,i){
    return '<article class="acc"><div class="row"><h3>'+esc(a.email)+'</h3><span class="tag">'+esc(a.tag)+'</span>'+
      '<button class="icon" style="margin-left:auto" onclick="removeAccount('+i+')">excluir</button></div>'+
      '<div class="grid"><div><p class="lbl">Provedor</p><p class="val">'+esc(a.provider)+'</p></div>'+
      '<div><p class="lbl">Senha</p>'+secret(a.password||'senha1234')+'</div></div>'+
      '<p class="sub">Serviços vinculados</p><div class="grid">'+
      a.services.map(function(s){
        return '<div class="svc"><div class="badge" style="background:'+esc(s.color)+'">'+esc(s.initials)+'</div>'+
          '<div style="min-width:0"><p class="val" style="font-weight:600">'+esc(s.name)+'</p>'+
          '<p class="lbl" style="margin-top:6px">Usuário</p><p class="val">'+esc(s.user)+'</p>'+
          '<p class="lbl" style="margin-top:6px">Senha</p>'+secret(s.password||'senha1234')+
          '<p class="lbl" style="margin-top:6px">E-mail</p><p class="val">'+esc(s.email)+'</p></div></div>';
      }).join('')+'</div></article>';
  }).join('');
}
function addAccount(){
  var email=prompt('E-mail:');if(!email)return;
  var tag=prompt('Etiqueta (ex.: PESSOAL, JOGOS):','PESSOAL')||'PESSOAL';
  var provider=prompt('Provedor de e-mail:','Gmail')||'Gmail';
  var password=prompt('Senha:','')||'';
  accounts.push({email:email,tag:tag,provider:provider,password:password,services:[]});render();
}
function removeAccount(i){if(confirm('Excluir '+accounts[i].email+'?')){accounts.splice(i,1);render()}}
function saveFile(){
  var doc=document.documentElement.cloneNode(true);
  doc.querySelector('#vault-data').textContent=JSON.stringify(accounts);
  doc.querySelector('#list').innerHTML='';
  doc.querySelector('#status').textContent='';
  var html='<!doctype html>\\n'+doc.outerHTML;
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
  a.download='cofre-do-lobo.html';a.click();URL.revokeObjectURL(a.href);
}
render();
</script>
</body>
</html>`;
}

export function downloadVaultHtml(accounts: EmailAccount[]) {
  const blob = new Blob([buildVaultHtml(accounts)], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cofre-do-lobo.html";
  a.click();
  URL.revokeObjectURL(url);
}
