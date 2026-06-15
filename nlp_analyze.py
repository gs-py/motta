#!/usr/bin/env python3
"""Full NLP pass over the chat: sentiment, topics, language mix, lexical fingerprints."""
import re, json
from collections import Counter, defaultdict
from datetime import datetime

FILE = "WhatsApp Chat with Divs ❤️.txt"
LINE_RE = re.compile(r'^(\d{2})/(\d{2})/(\d{2}), (\d{2}):(\d{2}) - (.*)$')
SENDER_RE = re.compile(r'^([^:]{1,40}?): (.*)$', re.DOTALL)

def parse():
    msgs, cur = [], None
    for raw in open(FILE, encoding="utf-8"):
        line = raw.rstrip("\n"); m = LINE_RE.match(line)
        if m:
            dd, mm, yy, hh, mi, body = m.groups(); sm = SENDER_RE.match(body)
            s, t = (sm.group(1), sm.group(2)) if sm else (None, body)
            cur = {"dt": datetime(2000+int(yy), int(mm), int(dd), int(hh), int(mi)), "s": s, "t": t}
            msgs.append(cur)
        elif cur: cur["t"] += " " + line
    return [m for m in msgs if m["s"]]

chat = parse()
people = [s for s, _ in Counter(m["s"] for m in chat).most_common()]
P0, P1 = people  # P0=gladwin (me), P1=Divs (you)
months = sorted({m["dt"].strftime("%Y-%m") for m in chat})
SPAM = ("para para", "hycross hycross", "mptta kunju se mera", "motta kunju se mera")
def is_spam(t): tl=t.lower(); return any(s in tl for s in SPAM)
def is_media(t): return "<media omitted>" in t.lower()

# ---------------- 1. SENTIMENT (multilingual lexicon) ----------------
POS = ["love","ily","ilu you","happy","thank","thanks","nalla","super","adipoli","ishta","ishtaa",
 "santhosh","khush","pyar","best","cute","sweet","proud","blush","muah","muahh","yay","grateful",
 "lucky","perfect","beautiful","gorgeous","nice","wow","amazing","forever","kollam","rasa","rasam",
 "😂","🤣","🥰","😍","😘","😊","🤭","💗","💕","❤","💖","🫶","😚","🥹","🙂","😌","🐥"]
NEG = ["sad","sorry","hurt","cry","cried","karanj","vishamam","deshyam","dhesham","dhesyam","angry",
 "scared","pedi","bayam","worried","worry","tension","bad","hate","fight","preshnam","problem",
 "alone","depressed","mood off","irritate","annoyed","budhimutt","kashtam","vayya","vayyaa","💀",
 "😭","😢","🥲","😔","😤","🙁","☹","🫠","🥺"]
def count_hits(tl, words):
    n = 0
    for w in words:
        if w.isalpha() if False else False: pass
        if w.startswith(tuple("abcdefghijklmnopqrstuvwxyz")):
            n += len(re.findall(r'\b'+re.escape(w)+r'\b', tl))
        else:
            n += tl.count(w)  # emoji / multiword
    return n
sent_month = {mo: {"pos":0,"neg":0,"n":0} for mo in months}
sent_month_p = {mo: {P0:{"pos":0,"neg":0,"n":0}, P1:{"pos":0,"neg":0,"n":0}} for mo in months}
pos_msgs=[]; neg_msgs=[]
for m in chat:
    if is_media(m["t"]) or is_spam(m["t"]): continue
    tl = m["t"].lower(); mo = m["dt"].strftime("%Y-%m")
    p = count_hits(tl, POS); ng = count_hits(tl, NEG)
    if p==0 and ng==0: continue
    sent_month[mo]["pos"]+=p; sent_month[mo]["neg"]+=ng; sent_month[mo]["n"]+=1
    sent_month_p[mo][m["s"]]["pos"]+=p; sent_month_p[mo][m["s"]]["neg"]+=ng; sent_month_p[mo][m["s"]]["n"]+=1
def polarity(d):
    tot=d["pos"]+d["neg"]; return round((d["pos"]-d["neg"])/tot,3) if tot else 0.0
sentiment = {
 "by_month": {mo: {"polarity":polarity(sent_month[mo]),"pos":sent_month[mo]["pos"],"neg":sent_month[mo]["neg"],"msgs":sent_month[mo]["n"]} for mo in months},
 "by_month_person": {mo: {p: polarity(sent_month_p[mo][p]) for p in people} for mo in months},
 "overall_polarity": polarity({"pos":sum(sent_month[mo]["pos"] for mo in months),"neg":sum(sent_month[mo]["neg"] for mo in months)}),
}

# ---------------- 2. TOPICS / THEMES ----------------
TOPICS = {
 "Family": ["mummy","mommy","papa","pappa","aunty","uncle","chettan","chechi","family","mom","dad","sister","daffy","brother","cousin","kids","piller","ammachi","veetil","veedu","glady","gladis"],
 "Food": ["food","eat","kazhich","kazhicho","biriyani","motta curry","chicken","rice","breakfast","dinner","lunch","chappathi","snack","coffee","cafe","treat","curry","fish","fry","sweet","chocolate","cake"],
 "Faith & God": ["god","jesus","church","pray","prayer","bible","faith","blessing","camp","sunday school","verse","grace","yoked","christ"],
 "Our future": ["future","marriage","kalyanam","wife","husband","wedding","settle","forever","life","together","dream","goal","50kg"],
 "Distance & meeting": ["metro","cubbon","bangalore","kerala","train","bus","travel","meet","distance"," km","station","drop","trip","thrissur"],
 "Calls": ["call","phone","video","voice","ring","vilich","vilikam","vili"],
 "Studies & work": ["exam","study","college","course","aiish","audiology","job","office","work","career","sumit","placement","class","internship"],
 "Looks & photos": ["pic","photo","saree","dress","hair","smile","selfie","look","beautiful","gorgeous","cute","outfit","insta"],
}
topic_count = Counter(); topic_month = {t: Counter() for t in TOPICS}
topic_person = {t: Counter() for t in TOPICS}
for m in chat:
    if is_media(m["t"]) or is_spam(m["t"]): continue
    tl = m["t"].lower(); mo = m["dt"].strftime("%Y-%m")
    for t, kws in TOPICS.items():
        if any(k in tl for k in kws):
            topic_count[t]+=1; topic_month[t][mo]+=1; topic_person[t][m["s"]]+=1
topics = {
 "totals": dict(topic_count.most_common()),
 "by_person": {t: {P0:topic_person[t][P0], P1:topic_person[t][P1]} for t in TOPICS},
 "by_month": {t: {mo: topic_month[t].get(mo,0) for mo in months} for t in TOPICS},
}

# ---------------- 3. LANGUAGE MIX / CODE-SWITCHING ----------------
HINDI = set("mera tera teri meri pyar hogaya kya hai nahi nahin tu tum main hum bahut acha accha theek matlab kaise kyun yaar dil ishq bana raha rahi karo kar diya".split())
MANGLISH = set("njn njan enik enikk nee nte ninne ninak ahnu ahn ahno ahnel illa ind indo undo undaa okke alle adh adhu ith ithu ipo ippo eppo entha enthu vannu poyi venam veno ariyilla ariyam kazhich kazhicho vilich nalla kollam rasa muthe mone mole kunju motta vishamam deshyam pinne avale aval avar njngal ende ente onnu vere etha kitti sheri shariyalla paranj paranju thonunnu".split())
ENGLISH = set("the a an and or but you i me my we he she they it is are was were be been have has had do does did will would can could love like miss good night morning happy sorry thank thanks know think want need feel see come go say tell yes no okay ok now then today tomorrow time day life one more too so much very really also just only what why how when where who which that this here there for with from your our her his them about because if before after".split())
lang_tok = {P0:Counter(), P1:Counter()}
codeswitch = {P0:0, P1:0, "total":0}; cs_den=0
for m in chat:
    if is_media(m["t"]) or is_spam(m["t"]): continue
    toks = re.findall(r"[a-zA-Z']+", m["t"].lower())
    if not toks: continue
    langs=set()
    for w in toks:
        if w in HINDI: lang_tok[m["s"]]["Hindi"]+=1; langs.add("H")
        elif w in MANGLISH: lang_tok[m["s"]]["Manglish"]+=1; langs.add("M")
        elif w in ENGLISH: lang_tok[m["s"]]["English"]+=1; langs.add("E")
        else: lang_tok[m["s"]]["Other"]+=1
    cs_den+=1
    if len({l for l in langs if l in ("H","M","E")})>=2:
        codeswitch[m["s"]]+=1; codeswitch["total"]+=1
def lang_pct(c):
    base = c["Hindi"]+c["Manglish"]+c["English"]
    return {k: round(c[k]*100/base,1) for k in ("Manglish","English","Hindi")} if base else {}
language = {
 "by_person": {P0: lang_pct(lang_tok[P0]), P1: lang_pct(lang_tok[P1])},
 "combined": lang_pct(Counter({k:lang_tok[P0][k]+lang_tok[P1][k] for k in ("Hindi","Manglish","English","Other")})),
 "codeswitch_rate": round(codeswitch["total"]*100/cs_den,1) if cs_den else 0,
}

# ---------------- 4. LEXICAL FINGERPRINT (distinctive words) ----------------
STOP = set("the a an and or but you i me my we to of in is it ok okay yes no so do did".split()) | MANGLISH | ENGLISH | HINDI
wf = {P0:Counter(), P1:Counter()}
for m in chat:
    if is_media(m["t"]) or is_spam(m["t"]): continue
    for w in re.findall(r"[a-zA-Z]{3,}", m["t"].lower()):
        if w not in STOP and "para"!=w and "hycross"!=w:
            wf[m["s"]][w]+=1
def distinctive(a, b, n=12):
    out=[]
    for w,c in a.most_common(300):
        if c<8: continue
        ratio = c/(b.get(w,0)+1)
        if ratio>=2.2: out.append((w,c,round(ratio,1)))
    return out[:n]
fingerprint = {
 P0: [{"word":w,"count":c} for w,c,_ in distinctive(wf[P0], wf[P1])],
 P1: [{"word":w,"count":c} for w,c,_ in distinctive(wf[P1], wf[P0])],
}

# ---------------- 5. EMOTIONAL-LABOR DYNAMICS over months ----------------
def cnt_re(rx):
    r=re.compile(rx, re.I); d=defaultdict(lambda:{P0:0,P1:0})
    for m in chat:
        if is_spam(m["t"]): continue
        if r.search(m["t"]): d[m["dt"].strftime("%Y-%m")][m["s"]]+=1
    return {mo:dict(d[mo]) for mo in months}
dynamics = {
 "sorry": cnt_re(r"\b(sorry|ksham|my fault|forgive)\b"),
 "thanks": cnt_re(r"\b(thank|thanks|thankyou|thanku|grateful)\b"),
 "miss": cnt_re(r"\b(miss\s*(you|u|uu+)|missu+)\b"),
 "promise": cnt_re(r"\bpromise"),
}

# ---------------- 6. INTENSITY ----------------
def caps_msgs(p): return sum(1 for m in chat if m["s"]==p and not is_spam(m["t"]) and len(m["t"])>4 and sum(c.isupper() for c in m["t"])/max(sum(c.isalpha() for c in m["t"]),1)>0.7)
intensity = {p: {
 "all_caps_msgs": caps_msgs(p),
 "exclaims": sum(m["t"].count("!") for m in chat if m["s"]==p),
 "elongations": sum(1 for m in chat if m["s"]==p and re.search(r"(.)\1\1\1", m["t"])),  # "soooo", repeated letters
} for p in people}

out = {"people":{"me":P0,"you":P1}, "months":months,
       "sentiment":sentiment, "topics":topics, "language":language,
       "fingerprint":fingerprint, "dynamics":dynamics, "intensity":intensity}
json.dump(out, open("nlp_out.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# console summary
print("OVERALL polarity:", sentiment["overall_polarity"])
print("\nSENTIMENT by month (polarity, -1..+1):")
for mo in months: print(f"  {mo}: {sentiment['by_month'][mo]['polarity']:+.3f}  (pos {sentiment['by_month'][mo]['pos']}, neg {sentiment['by_month'][mo]['neg']})")
print("\nTOPICS (msgs):")
for t,c in topics["totals"].items(): print(f"  {t}: {c}  (me {topics['by_person'][t][P0]} / you {topics['by_person'][t][P1]})")
print("\nLANGUAGE combined:", language["combined"], "codeswitch%:", language["codeswitch_rate"])
print("  me:", language["by_person"][P0], " you:", language["by_person"][P1])
print("\nFINGERPRINT me:", [w["word"] for w in fingerprint[P0]])
print("FINGERPRINT you:", [w["word"] for w in fingerprint[P1]])
print("\nINTENSITY:", intensity)
print("\nDYNAMICS sorry/month:", {mo:dynamics["sorry"][mo] for mo in months})
print("wrote nlp_out.json")
