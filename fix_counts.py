#!/usr/bin/env python3
import re
from collections import Counter, defaultdict
from datetime import datetime
FILE="WhatsApp Chat with Divs ❤️.txt"
LINE_RE=re.compile(r'^(\d{2})/(\d{2})/(\d{2}), (\d{2}):(\d{2}) - (.*)$')
SENDER_RE=re.compile(r'^([^:]{1,40}?): (.*)$', re.DOTALL)
def parse():
    msgs,cur=[],None
    for raw in open(FILE,encoding="utf-8"):
        line=raw.rstrip("\n"); m=LINE_RE.match(line)
        if m:
            dd,mm,yy,hh,mi,body=m.groups(); sm=SENDER_RE.match(body)
            sender,text=(sm.group(1),sm.group(2)) if sm else (None,body)
            cur={"dt":datetime(2000+int(yy),int(mm),int(dd),int(hh),int(mi)),"sender":sender,"text":text}; msgs.append(cur)
        elif cur: cur["text"]+="\n"+line
    return [m for m in msgs if m["sender"]]
chat=parse()
people=[s for s,_ in Counter(m["sender"] for m in chat).most_common()]; P0,P1=people

# CLEAN "I love you": strict, no bare ilu
ILY=re.compile(r'(\bi\s*love\s*(you|u|yu+|youu+)\b|\bily\b|\bi\s*luv\s*(you|u)\b)',re.IGNORECASE)
# CLEAN "Love you": love you/u, luv u  (excl preceding 'i ')
LY=re.compile(r'((?<!i )\blove\s*(you|u|youu+)\b|\bluv\s*(you|u)\b)',re.IGNORECASE)
def tally(rx,label):
    tot=Counter(); mo=Counter(); first=last=None
    for m in chat:
        n=len(rx.findall(m["text"]))
        if n:
            tot[m["sender"]]+=n; mo[m["dt"].strftime("%Y-%m")]+=n
            if not first: first=(m["dt"],m["sender"],m["text"][:70])
            last=(m["dt"],m["sender"],m["text"][:70])
    print(f"{label}: total={sum(tot.values())} {P0}={tot[P0]} {P1}={tot[P1]} peak={max(mo.items(),key=lambda x:x[1])} first={first[0]:%Y-%m-%d}")
    return mo
ily_mo=tally(ILY,"I love you (clean)")
ly_mo=tally(LY,"Love you (clean)")
print("ILY monthly:", {k:ily_mo[k] for k in sorted(ily_mo)})
print("LY  monthly:", {k:ly_mo[k] for k in sorted(ly_mo)})

# combined romantic love (ily OR love you) unique messages
COMBO=re.compile(r'(\bi\s*love\s*(you|u)\b|\bily\b|(?<!i )\blove\s*(you|u)\b|\bluv\s*(you|u)\b)',re.IGNORECASE)
combo_msgs=[m for m in chat if COMBO.search(m["text"])]
cp=Counter(m["sender"] for m in combo_msgs)
print(f"\nLove-message count (msgs containing any love-you form): {len(combo_msgs)} {P0}={cp[P0]} {P1}={cp[P1]}")

# MOTTA investigation
print("\n--- MOTTA / KUNJU investigation ---")
motta_re=re.compile(r'\bmotta\b',re.IGNORECASE)
# top messages by motta repetition
scored=[(len(motta_re.findall(m["text"])),m) for m in chat]
scored=[s for s in scored if s[0]>0]
scored.sort(reverse=True,key=lambda x:x[0])
print("Top motta-token messages:")
for n,m in scored[:8]:
    print(f"  x{n} {m['dt']:%Y-%m-%d} {m['sender']}: {m['text'][:90]!r}")
print(f"total motta tokens={sum(s[0] for s in scored)} across {len(scored)} msgs")
# food context: motta curry / motta roast etc
food=[m for n,m in scored if re.search(r'motta\s*(curry|roast|porichath|thoran|ada|bhaji|fry|egg)',m["text"],re.I)]
print(f"motta+food-word msgs ~= {len(food)}")
# nickname adjacency motta kunj
mk=[m for m in chat if re.search(r'motta\s*kunj',m["text"],re.I)]
print(f"'motta kunj' adjacency msgs = {len(mk)}")
# kunju/kunje/kunjikili as nickname
kun=re.compile(r'\bkunj(u|e|ikili|ikkili|i)\b',re.IGNORECASE)
kc=Counter(); kmo=Counter()
for m in chat:
    n=len(kun.findall(m["text"]))
    if n: kc[m["sender"]]+=n; kmo[m["dt"].strftime("%Y-%m")]+=n
print(f"kunju/kunje/kunjikili total={sum(kc.values())} {P0}={kc[P0]} {P1}={kc[P1]} peak={max(kmo.items(),key=lambda x:x[1]) if kmo else '-'}")

# May motta spike detail
may=[m for m in chat if m["dt"].strftime("%Y-%m")=="2026-05" and motta_re.search(m["text"])]
print(f"\nMay-2026 motta msgs={len(may)}, tokens={sum(len(motta_re.findall(m['text'])) for m in may)}")
maytop=sorted(may,key=lambda m:len(motta_re.findall(m['text'])),reverse=True)[:5]
for m in maytop:
    print(f"  x{len(motta_re.findall(m['text']))} {m['dt']:%Y-%m-%d %H:%M} {m['sender']}: {m['text'][:80]!r}")
