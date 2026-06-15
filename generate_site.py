#!/usr/bin/env python3
"""Generate a self-contained birthday analytics dashboard from viz_data.json."""
import json

viz = json.load(open("analysis_out/viz_data.json", encoding="utf-8"))

# Curated qualitative content (from report)
SCORES = {"Communication":93,"Emotional Connection":91,"Relationship Stability":82,"Mutual Effort":86,"Overall Health":88}
NICKS = [["muthe (pearl)",328,109,219],["kunju / kunje",232,209,23],["da (affection)",129,23,106],
         ["motta kunju",109,107,2],["baby",70,29,41],["mone (dear)",51,7,44],["mole (dear)",49,45,4],
         ["babe",32,18,14],["cutie",21,18,3]]
PHRASES = viz["phrase_frequency"]
TIMELINE = [
 ["07 Oct 2025","First “Hi”","Two strangers swapping event photos."],
 ["27 Oct 2025","First emotional intimacy","“if you have the heart to love so much, wouldn’t God prepare someone who can love you equally.”"],
 ["07 Nov 2025","First compliment","“you have silky hair, I really like it ❤️.”"],
 ["14 Dec 2025","First “ily”","“maari maari ily mathrol parayan.”"],
 ["04 Jan 2026","The 3 a.m. DTR","“I’ll love you for as long as life has us — that’s for sure.”"],
 ["17 Jan 2026","“I love you” made official","“love you and I love you have a big difference — from now say ‘I love you’ to me.”"],
 ["14 Feb 2026","First Valentine’s","“happy valentine’s to my forever valentine 😚💗.”"],
 ["Feb–Apr 2026","He builds for her","Crafted-with-love apps + a 17k-word audiology exam study guide."],
 ["05 May 2026","Family trees exchanged","“Gladwin, wife MOTTA KUNJU” / “gladwin santosh & me.”"],
 ["16 May 2026","DREAM COMES TRUE","“YOU HELD MY HANDS AND GAVE A KISS AND LEANED TO MY SHOULDER.”"],
]
QUOTES_HIM = ["I found the one I love. 💕","I’m so lucky to have you — it means the world to me.",
  "I never been loved like this before.","More than you, I’m gonna miss you badly.",
  "I want to feel loved by you with the same depth even as time passes."]
QUOTES_HER = ["I will love you for as long as life has us.","I want to continue loving you forever.",
  "You’re one of the best things that happened to me.","No one can ever be more perfect in my eyes than you already are.",
  "I’ll be the cool aunt for your kids. 🤭"]
JOKES = ["🥚 “Motta Kunju” — the egg-baby name (a.k.a. “hybrid motta”, “motta shaming”)",
  "👩 The “BAD MOMMY” running gag","💬 “Motta Kunju se mera pyar hogaya” ×300 — the great love-flood of 28 May",
  "🗣️ “da” vs “muthe” — their verbal fingerprints"]

D = json.dumps  # shorthand

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Motta Kunju &amp; Her Muthe ❤️ — Our Story in Numbers</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
  :root{{--pink:#ff5d8f;--rose:#ff8fab;--deep:#c9184a;--cream:#fff0f3;--ink:#3d1322;--soft:#ffd6e0;}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{font-family:'Segoe UI',system-ui,sans-serif;background:linear-gradient(160deg,#fff0f3,#ffe3ec 40%,#ffd6e0);color:var(--ink);line-height:1.6}}
  .wrap{{max-width:1100px;margin:0 auto;padding:24px}}
  header{{text-align:center;padding:60px 20px 30px}}
  header h1{{font-size:clamp(2rem,6vw,3.6rem);color:var(--deep);letter-spacing:.5px}}
  header p{{font-size:1.15rem;color:var(--pink);margin-top:8px;font-weight:600}}
  .hearts{{font-size:2rem;margin:12px 0;animation:pulse 2s infinite}}
  @keyframes pulse{{0%,100%{{transform:scale(1)}}50%{{transform:scale(1.15)}}}}
  .stats{{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin:30px 0}}
  .stat{{background:#fff;border-radius:18px;padding:22px;text-align:center;box-shadow:0 8px 24px rgba(201,24,74,.10)}}
  .stat .num{{font-size:2.1rem;font-weight:800;color:var(--deep)}}
  .stat .lbl{{font-size:.82rem;color:#a05; text-transform:uppercase;letter-spacing:.5px;margin-top:4px}}
  section{{background:#fff;border-radius:22px;padding:26px;margin:22px 0;box-shadow:0 8px 28px rgba(201,24,74,.08)}}
  section h2{{color:var(--deep);font-size:1.5rem;margin-bottom:6px}}
  section .sub{{color:#b0667f;font-size:.92rem;margin-bottom:18px}}
  .chart-box{{position:relative;height:340px}}
  .grid2{{display:grid;grid-template-columns:1fr 1fr;gap:24px}}
  @media(max-width:760px){{.grid2{{grid-template-columns:1fr}}}}
  .score{{margin:14px 0}}
  .score .top{{display:flex;justify-content:space-between;font-weight:700;margin-bottom:5px}}
  .bar{{height:14px;background:var(--soft);border-radius:10px;overflow:hidden}}
  .bar>i{{display:block;height:100%;background:linear-gradient(90deg,var(--rose),var(--deep));border-radius:10px}}
  .tl{{position:relative;padding-left:28px}}
  .tl::before{{content:'';position:absolute;left:8px;top:4px;bottom:4px;width:3px;background:var(--soft)}}
  .tl .item{{position:relative;margin-bottom:20px}}
  .tl .item::before{{content:'❤';position:absolute;left:-28px;top:-2px;color:var(--pink);font-size:1.1rem}}
  .tl .date{{font-weight:800;color:var(--deep)}}
  .tl .ttl{{font-weight:700}}
  .tl .desc{{color:#7a4257;font-style:italic;font-size:.95rem}}
  .cards{{display:grid;grid-template-columns:1fr 1fr;gap:18px}}
  @media(max-width:760px){{.cards{{grid-template-columns:1fr}}}}
  .qcol h3{{color:var(--deep);margin-bottom:10px}}
  .quote{{background:var(--cream);border-left:4px solid var(--pink);border-radius:10px;padding:12px 14px;margin-bottom:10px;font-style:italic}}
  .joke{{background:var(--cream);border-radius:12px;padding:12px 14px;margin-bottom:10px;font-weight:600}}
  .nick{{display:flex;align-items:center;gap:10px;margin-bottom:8px}}
  .nick .rank{{width:26px;height:26px;border-radius:50%;background:var(--deep);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;flex-shrink:0}}
  .nick .name{{width:150px;font-weight:700}}
  .nick .nbar{{flex:1;height:18px;background:var(--soft);border-radius:9px;overflow:hidden;display:flex}}
  .nick .nbar i{{display:block;height:100%}}
  .nick .g{{background:#5b8def}} .nick .d{{background:var(--pink)}}
  .nick .val{{width:46px;text-align:right;font-weight:700;color:var(--deep)}}
  .legend{{font-size:.85rem;color:#7a4257;margin:6px 0 16px}}
  .legend b.g{{color:#5b8def}} .legend b.d{{color:var(--pink)}}
  footer{{text-align:center;color:#b0667f;font-size:.82rem;padding:30px 20px 50px}}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="hearts">🥚❤️💍</div>
    <h1>Motta Kunju &amp; Her Muthe</h1>
    <p>From “Hi” to forever — our story in numbers</p>
    <p style="color:#b0667f;font-weight:400;font-size:.95rem">07 Oct 2025 → 15 Jun 2026 · 252 days</p>
  </header>

  <div class="stats">
    <div class="stat"><div class="num">{viz['totals']['messages']:,}</div><div class="lbl">Total Messages</div></div>
    <div class="stat"><div class="num">{viz['totals']['active_days']}</div><div class="lbl">Active Days (94%)</div></div>
    <div class="stat"><div class="num">{viz['totals']['longest_streak']}</div><div class="lbl">Day Streak</div></div>
    <div class="stat"><div class="num">114</div><div class="lbl">“I love you” msgs</div></div>
    <div class="stat"><div class="num">349</div><div class="lbl">Msgs / Day</div></div>
  </div>

  <section>
    <h2>💑 Who Sent What</h2>
    <div class="sub">A near-perfect 51 / 49 split across 82,675 messages.</div>
    <div class="grid2">
      <div class="chart-box"><canvas id="split"></canvas></div>
      <div class="chart-box"><canvas id="perPerson"></canvas></div>
    </div>
  </section>

  <section>
    <h2>📈 Messages Over Time</h2>
    <div class="sub">December was the falling-in-love crescendo — 16,242 messages.</div>
    <div class="chart-box"><canvas id="monthly"></canvas></div>
  </section>

  <section>
    <h2>❤️ Love Said Out Loud</h2>
    <div class="sub">“I love you” messages per month — peak January 2026.</div>
    <div class="chart-box"><canvas id="love"></canvas></div>
  </section>

  <div class="grid2">
    <section><h2>🌙 Night People</h2><div class="sub">37% of messages fall 22:00–01:00.</div><div class="chart-box"><canvas id="hour"></canvas></div></section>
    <section><h2>📅 By Weekday</h2><div class="sub">Sundays win.</div><div class="chart-box"><canvas id="dow"></canvas></div></section>
  </div>

  <div class="grid2">
    <section><h2>💗 Pet Name Leaderboard</h2><div class="sub">Top endearments (distinct messages).</div><div class="legend"><b class="g">■ Gladwin</b> &nbsp; <b class="d">■ Divs</b></div>
      <div id="nicks"></div></section>
    <section><h2>🗣️ Love Phrases</h2><div class="sub">Total occurrences across the chat.</div><div class="chart-box"><canvas id="phrases"></canvas></div></section>
  </div>

  <section>
    <h2>🎭 Emotional Spectrum</h2>
    <div class="sub">Keyword-tagged emotional tone of the conversation.</div>
    <div class="chart-box"><canvas id="emotion"></canvas></div>
  </section>

  <section>
    <h2>📊 Relationship Health</h2>
    <div class="sub">Scored from consistency, responsiveness, balance &amp; emotional depth.</div>
    {''.join(f'<div class="score"><div class="top"><span>{k}</span><span>{v}/100</span></div><div class="bar"><i style="width:{v}%"></i></div></div>' for k,v in SCORES.items())}
  </section>

  <section>
    <h2>🗟️ Our Timeline</h2>
    <div class="sub">The moments that made us.</div>
    <div class="tl">
    {''.join(f'<div class="item"><div class="date">{d}</div><div class="ttl">{t}</div><div class="desc">{x}</div></div>' for d,t,x in TIMELINE)}
    </div>
  </section>

  <section>
    <h2>💌 Words We Said</h2>
    <div class="cards">
      <div class="qcol"><h3>He said</h3>{''.join(f'<div class="quote">“{q}”</div>' for q in QUOTES_HIM)}</div>
      <div class="qcol"><h3>She said</h3>{''.join(f'<div class="quote">“{q}”</div>' for q in QUOTES_HER)}</div>
    </div>
  </section>

  <section>
    <h2>😂 Our Inside Jokes</h2>
    {''.join(f'<div class="joke">{j}</div>' for j in JOKES)}
  </section>

  <footer>
    Made with ❤️ from 82,675 real messages · numbers are script-derived · emotion tags are keyword-based &amp; directional.<br>
    Happy Birthday, Motta Kunju. 🥚🎂
  </footer>
</div>

<script>
const VIZ = {D(viz)};
const PINK='#ff5d8f', DEEP='#c9184a', ROSE='#ff8fab', BLUE='#5b8def', SOFT='#ffd6e0';
Chart.defaults.font.family="'Segoe UI',system-ui,sans-serif";
Chart.defaults.color='#7a4257';
const months=Object.keys(VIZ.messages_per_month);
const mlabels=months.map(m=>({{'2025-10':'Oct','2025-11':'Nov','2025-12':'Dec','2026-01':'Jan','2026-02':'Feb','2026-03':'Mar','2026-04':'Apr','2026-05':'May','2026-06':'Jun'}})[m]||m);

new Chart(split,{{type:'doughnut',data:{{labels:['Gladwin','Divs ❤️'],datasets:[{{data:[VIZ.per_person['gladwin'].messages,VIZ.per_person['Divs ❤️'].messages],backgroundColor:[BLUE,PINK],borderWidth:0}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{position:'bottom'}},title:{{display:true,text:'Messages sent'}}}}}}}});

new Chart(perPerson,{{type:'bar',data:{{labels:['Words','Media','Questions','Initiations'],datasets:[
 {{label:'Gladwin',data:[VIZ.per_person['gladwin'].words,VIZ.per_person['gladwin'].media,VIZ.per_person['gladwin'].questions,VIZ.per_person['gladwin'].initiations],backgroundColor:BLUE}},
 {{label:'Divs ❤️',data:[VIZ.per_person['Divs ❤️'].words,VIZ.per_person['Divs ❤️'].media,VIZ.per_person['Divs ❤️'].questions,VIZ.per_person['Divs ❤️'].initiations],backgroundColor:PINK}}]}},
 options:{{responsive:true,maintainAspectRatio:false,scales:{{y:{{type:'logarithmic'}}}},plugins:{{title:{{display:true,text:'Effort breakdown (log scale)'}}}}}}}});

new Chart(monthly,{{type:'line',data:{{labels:mlabels,datasets:[{{label:'Messages',data:months.map(m=>VIZ.messages_per_month[m]),borderColor:DEEP,backgroundColor:'rgba(255,93,143,.18)',fill:true,tension:.35,pointRadius:5,pointBackgroundColor:DEEP}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}}}}}});

const lovePerMonth=[1,3,8,41,15,21,13,6,5];
new Chart(love,{{type:'line',data:{{labels:mlabels,datasets:[{{label:'“I love you” msgs',data:lovePerMonth,borderColor:PINK,backgroundColor:'rgba(201,24,74,.15)',fill:true,tension:.35,pointRadius:5,pointBackgroundColor:PINK}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}}}}}});

const hrs=Object.keys(VIZ.by_hour);
new Chart(hour,{{type:'bar',data:{{labels:hrs.map(h=>h+':00'),datasets:[{{data:hrs.map(h=>VIZ.by_hour[h]),backgroundColor:hrs.map(h=>(h>=22||h<=1)?DEEP:ROSE)}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}}}}}});

new Chart(dow,{{type:'bar',data:{{labels:Object.keys(VIZ.by_dow),datasets:[{{data:Object.values(VIZ.by_dow),backgroundColor:ROSE,borderRadius:6}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}}}}}});

const ph=VIZ.phrase_frequency;
new Chart(phrases,{{type:'bar',data:{{labels:Object.keys(ph),datasets:[{{data:Object.values(ph),backgroundColor:PINK,borderRadius:6}}]}},options:{{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}}}}}});

const em=VIZ.emotion_distribution;
new Chart(emotion,{{type:'polarArea',data:{{labels:Object.keys(em),datasets:[{{data:Object.values(em),backgroundColor:['#c9184a','#ff5d8f','#ff8fab','#ffb3c6','#ffd6e0','#ff7096','#e05780','#b9375e','#d4628a','#ffa5ba','#f78fb3','#cc6699','#aa4466']}}]}},options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{position:'right'}}}}}}}});

// nickname bars
const NICKS={D(NICKS)};
const maxN=Math.max(...NICKS.map(n=>n[1]));
document.getElementById('nicks').innerHTML=NICKS.map((n,i)=>{{
 const[name,tot,g,d]=n;
 return `<div class="nick"><div class="rank">${{i+1}}</div><div class="name">${{name}}</div>`+
 `<div class="nbar"><i class="g" style="width:${{g/maxN*100}}%"></i><i class="d" style="width:${{d/maxN*100}}%"></i></div>`+
 `<div class="val">${{tot}}</div></div>`;
}}).join('');
</script>
</body>
</html>"""

open("birthday_dashboard.html","w",encoding="utf-8").write(html)
print("Wrote birthday_dashboard.html (", len(html), "bytes )")
