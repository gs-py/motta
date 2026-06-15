#!/usr/bin/env python3
"""Deep relationship analytics for WhatsApp export. Outputs stats + excerpt files + JSON."""
import re, json, statistics
from collections import Counter, defaultdict
from datetime import datetime, timedelta

FILE = "WhatsApp Chat with Divs ❤️.txt"
OUT = "analysis_out"
import os; os.makedirs(OUT, exist_ok=True)

LINE_RE = re.compile(r'^(\d{2})/(\d{2})/(\d{2}), (\d{2}):(\d{2}) - (.*)$')
SENDER_RE = re.compile(r'^([^:]{1,40}?): (.*)$', re.DOTALL)

def parse():
    msgs, cur = [], None
    with open(FILE, encoding="utf-8") as f:
        for raw in f:
            line = raw.rstrip("\n")
            m = LINE_RE.match(line)
            if m:
                dd, mm, yy, hh, mi, body = m.groups()
                sm = SENDER_RE.match(body)
                sender, text = (sm.group(1), sm.group(2)) if sm else (None, body)
                cur = {"dt": datetime(2000+int(yy), int(mm), int(dd), int(hh), int(mi)),
                       "sender": sender, "text": text}
                msgs.append(cur)
            elif cur is not None:
                cur["text"] += "\n" + line
    return msgs

msgs = parse()
chat = [m for m in msgs if m["sender"] is not None]
people = [s for s, _ in Counter(m["sender"] for m in chat).most_common()]
P0, P1 = people[0], people[1]

def is_media(t): return t.strip().lower() == "<media omitted>"

# ---------- SECTION 1: OVERVIEW ----------
total = len(chat)
cnt = Counter(m["sender"] for m in chat)
by_date = Counter(m["dt"].date() for m in chat)
dates = sorted(by_date)
span_start, span_end = chat[0]["dt"], chat[-1]["dt"]
days_span = (span_end.date()-span_start.date()).days + 1

# streak + gaps
streak = best = 1; best_streak_end = dates[0]
for i in range(1, len(dates)):
    if (dates[i]-dates[i-1]).days == 1:
        streak += 1
        if streak > best: best, best_streak_end = streak, dates[i]
    else: streak = 1
gaps = []
for i in range(1, len(dates)):
    g = (dates[i]-dates[i-1]).days
    if g > 1: gaps.append((g-1, dates[i-1], dates[i]))
gaps.sort(reverse=True)

by_month = Counter(m["dt"].strftime("%Y-%m") for m in chat)
by_week = Counter(m["dt"].strftime("%G-W%V") for m in chat)
by_year = Counter(m["dt"].strftime("%Y") for m in chat)
by_dow = Counter(m["dt"].weekday() for m in chat)
by_hour = Counter(m["dt"].hour for m in chat)

print("##SECTION1")
print(f"total={total}")
for p in people: print(f"sent[{p}]={cnt[p]} ({cnt[p]*100/total:.1f}%)")
print(f"first={span_start}  last={span_end}  span_days={days_span}")
print(f"active_days={len(by_date)} ({len(by_date)*100//days_span}%)")
print(f"avg_per_span_day={total/days_span:.1f}  avg_per_active_day={total/len(by_date):.1f}")
print(f"longest_streak={best} (ending {best_streak_end})")
print(f"top_gaps={gaps[:5]}")
print(f"most_active_month={by_month.most_common(1)}  least={min(by_month.items(), key=lambda x:x[1])}")

# ---------- SECTION 2: TIME TABLES ----------
print("\n##SECTION2_MONTH")
for k in sorted(by_month): print(f"{k}\t{by_month[k]}")
print("\n##SECTION2_YEAR")
for k in sorted(by_year): print(f"{k}\t{by_year[k]}")
print("\n##SECTION2_TOP20_DAYS")
for d, c in by_date.most_common(20): print(f"{d}\t{c}")
print("\n##SECTION2_BOTTOM20_DAYS")
for d, c in sorted(by_date.items(), key=lambda x: x[1])[:20]: print(f"{d}\t{c}")
print("\n##SECTION2_DOW")
DOW=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
for i in range(7): print(f"{DOW[i]}\t{by_dow[i]}")
print("\n##SECTION2_HOUR")
for h in range(24): print(f"{h}\t{by_hour.get(h,0)}")
print("\n##SECTION2_WEEK_RANGE")
wk = sorted(by_week.items())
print(f"weeks={len(wk)} max={max(by_week.items(),key=lambda x:x[1])} min={min(by_week.items(),key=lambda x:x[1])}")

# ---------- SECTION 3: PHRASES ----------
PHRASES = {
 "I love you": [r'\bi\s*love\s*(you|u|yu+|youu+)\b', r'\bilu\b', r'\bily\b', r'\bi\s*luv\s*(you|u)\b'],
 "Love you":   [r'(?<!i )\blove\s*(you|u|youu+)\b', r'\bluv\s*(you|u)\b', r'\blyu\b'],
 "Miss you":   [r'\bmiss\s*(you|u|uu+)\b', r'\bmissu+\b', r'\bmiss\s*ya\b'],
 "Good morning":[r'\bgood\s*morning\b', r'\bgud\s*morning\b', r'\bgoodmorning\b', r'\bg\s*m\b', r'\bgm\b', r'\bgud\s*mrng\b', r'\bmorning\b'],
 "Good night": [r'\bgood\s*night\b', r'\bgud\s*night\b', r'\bgoodnight\b', r'\bgn\b', r'\bgnite\b', r'\bgud\s*ni(gh)?t\b', r'\bgood\s*nyt\b'],
 "Baby":       [r'\bbab(y|yy+|ie)\b'],
 "Babe":       [r'\bbab(e|ee+)\b'],
 "Amoor":      [r'\bamoor+\b', r'\bamore\b', r'\bamour\b'],
 "Divs":       [r'\bdivs?\b', r'\bdivya\b'],
 "Motta Kunje":[r'\bmotta\s*kunj[eu]\b', r'\bmotta\b', r'\bkunj[eu]\b', r'\bkunchu\b'],
}
phrase_re = {k: re.compile("|".join(v), re.IGNORECASE) for k, v in PHRASES.items()}
ph_total = Counter(); ph_person = defaultdict(Counter); ph_month = defaultdict(Counter)
ph_first = {}; ph_last = {}
for m in chat:
    t = m["text"]; mo = m["dt"].strftime("%Y-%m")
    for k, rx in phrase_re.items():
        n = len(rx.findall(t))
        if n:
            ph_total[k] += n; ph_person[k][m["sender"]] += n; ph_month[k][mo] += n
            if k not in ph_first: ph_first[k] = (m["dt"], m["sender"], t[:80])
            ph_last[k] = (m["dt"], m["sender"], t[:80])
print("\n##SECTION3")
for k in PHRASES:
    pk = ph_month[k]
    peak = max(pk.items(), key=lambda x: x[1]) if pk else ("-",0)
    print(f"{k}\ttotal={ph_total[k]}\t{P0}={ph_person[k][P0]}\t{P1}={ph_person[k][P1]}\tpeak={peak}\tfirst={ph_first.get(k,['-'])[0]}")
print("\n##SECTION3_TIMELINE")
allmonths = sorted(by_month)
print("month\t"+"\t".join(PHRASES))
for mo in allmonths:
    print(mo+"\t"+"\t".join(str(ph_month[k].get(mo,0)) for k in PHRASES))

# ---------- SECTION 4: EMOTION LEXICON ----------
LEX = {
 "Love":["i love you","love you","love u","ily","ilu","pyar","ishq","premam","love nin","ente","❤","🥰","😍","💕","💖","💗","💓","love aanu"],
 "Care":["did you eat","food kazhich","kazhicho","khana","eat","sleep","sleep well","rest","take care","medicine","doctor","health","careful","drive safe","reach"],
 "Affection":["hug","kiss","muah","cuddle","😘","😚","🤗","kettipidi","umma","baby","babe","amoor","kunju","sweetheart","jaan","cutie"],
 "Missing":["miss you","miss u","missu","kaanan","kaanaan","kaണാ","wish you were","want to see you","need you","miss aanu","miss cheyy"],
 "Appreciation":["thank you","thanks","thank u","proud","grateful","best","you're the best","nyc","super","talented","clever","smart","adipoli"],
 "Support":["don't worry","dont worry","im here","i'm here","all the best","best of luck","you can do","i got you","kuzhappam illa","tension venda","support","with you"],
 "Happiness":["happy","😊","🙂","😄","😁","khush","santhosh","glad","yay","love this","best day"],
 "Excitement":["excited","cant wait","can't wait","omg","🤩","finally","yayy","woohoo","cannot wait","waiting for"],
 "Anxiety":["worried","worry","tension","scared","nervous","what if","afraid","bayam","pedi","anxious","stress"],
 "Sadness":["sad","😢","😭","🥲","😔","crying","cried","hurt","upset","feeling low","vishamam","karanj","depressed","alone"],
 "Frustration":["angry","irritate","irritating","annoyed","😤","ugh","fed up","mood off","deshyam","arpainj","frustrat","seriously?"],
 "Conflict":["why did you","stop it","leave me","block","fight","ignore","ignoring","minda" ,"sariyalla","ariyilla mood","dont talk","why are you"],
 "Reconciliation":["sorry","im sorry","i'm sorry","my fault","forgive","didnt mean","didn't mean","patch","lets not fight","please","ksham","manass","ille sorry"],
}
emo_count = Counter(); emo_month = defaultdict(Counter); emo_person = defaultdict(Counter)
for m in chat:
    tl = m["text"].lower(); mo = m["dt"].strftime("%Y-%m")
    for emo, kws in LEX.items():
        if any(k in tl for k in kws):
            emo_count[emo]+=1; emo_month[emo][mo]+=1; emo_person[emo][m["sender"]]+=1
print("\n##SECTION4")
tot_emo = sum(emo_count.values())
for emo in LEX:
    c = emo_count[emo]
    print(f"{emo}\t{c}\t{c*100/tot_emo:.1f}%\t{P0}={emo_person[emo][P0]}\t{P1}={emo_person[emo][P1]}")
print("\n##SECTION4_TIMELINE")
print("month\t"+"\t".join(LEX))
for mo in allmonths:
    print(mo+"\t"+"\t".join(str(emo_month[e].get(mo,0)) for e in LEX))

# ---------- SECTION 5: RESPONSE TIMES / BALANCE ----------
resp = defaultdict(list)  # responder -> latencies(sec) when sender switches
initiations = Counter()   # first msg of day
prev = None
for m in chat:
    if prev and prev["sender"] != m["sender"]:
        dt = (m["dt"]-prev["dt"]).total_seconds()
        if 0 <= dt <= 6*3600:
            resp[m["sender"]].append(dt)
    prev = m
first_of_day = {}
for m in chat:
    dk = m["dt"].date()
    if dk not in first_of_day:
        first_of_day[dk]=m["sender"]; initiations[m["sender"]]+=1
# double texts (consecutive same sender)
double = Counter(); prev=None
for m in chat:
    if prev and prev["sender"]==m["sender"]: double[m["sender"]]+=1
    prev=m
words_p = Counter(); chars_p = Counter(); media_p=Counter(); q_p=Counter()
for m in chat:
    if is_media(m["text"]): media_p[m["sender"]]+=1; continue
    w = re.findall(r"\w+", m["text"]); words_p[m["sender"]]+=len(w); chars_p[m["sender"]]+=len(m["text"])
    if "?" in m["text"]: q_p[m["sender"]]+=1
print("\n##SECTION5")
for p in people:
    r = resp[p]
    med = statistics.median(r)/60 if r else 0
    mean = statistics.mean(r)/60 if r else 0
    print(f"{p}\tmsgs={cnt[p]}\twords={words_p[p]}\tmedia={media_p[p]}\tQ={q_p[p]}\tinit={initiations[p]}\tdouble={double[p]}\tresp_n={len(r)}\tresp_median_min={med:.1f}\tresp_mean_min={mean:.1f}")
# consistency: active days per person, monthly variance
pdays = defaultdict(set)
for m in chat: pdays[m["sender"]].add(m["dt"].date())
for p in people: print(f"active_days[{p}]={len(pdays[p])}")
# message gap stddev for consistency score
monthly_counts = [by_month[k] for k in sorted(by_month)]
print(f"monthly_mean={statistics.mean(monthly_counts):.0f} monthly_stdev={statistics.pstdev(monthly_counts):.0f}")

# ---------- EXCERPT EXTRACTION (Sections 6,10,13) ----------
def writef(name, lines):
    with open(f"{OUT}/{name}","w",encoding="utf-8") as f: f.write("\n".join(lines))

# love declarations
LOVE_STRONG = re.compile(r'\b(i\s*love\s*(you|u)|love\s*you|love\s*u|ily|ilu|i\s*luv\s*u)\b', re.IGNORECASE)
love_lines = [f'{m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:200]}' for m in chat if LOVE_STRONG.search(m["text"]) and not is_media(m["text"])]
writef("love_declarations.txt", love_lines)

# long heartfelt (top 120 longest non-media, sorted by date)
nonmedia = [m for m in chat if not is_media(m["text"]) and "<media" not in m["text"].lower()]
longest = sorted(nonmedia, key=lambda m: len(m["text"]), reverse=True)[:120]
longest.sort(key=lambda m: m["dt"])
writef("long_heartfelt.txt", [f'[{len(m["text"])}] {m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:600]}' for m in longest])

# funny: >=3 laugh emojis or lol/lmao
LAUGH = re.compile(r'(😂|🤣|😹|lmao|lmfao|\blol\b)', re.IGNORECASE)
funny = [m for m in chat if len(LAUGH.findall(m["text"]))>=2 and not is_media(m["text"]) and len(m["text"])>15]
funny_s = sorted(funny, key=lambda m: len(LAUGH.findall(m["text"])), reverse=True)[:120]
funny_s.sort(key=lambda m:m["dt"])
writef("funny.txt", [f'{m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:200]}' for m in funny_s])

# romantic: hearts/kiss + length
ROM = re.compile(r'(❤|🥰|😍|😘|💕|💖|💗|💓|💞|love|jaan|amoor|cutie|sweet)', re.IGNORECASE)
romantic = [m for m in chat if ROM.search(m["text"]) and not is_media(m["text"]) and len(m["text"])>25]
romantic_s = sorted(romantic, key=lambda m: len(m["text"]), reverse=True)[:150]
romantic_s.sort(key=lambda m:m["dt"])
writef("romantic.txt", [f'{m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:300]}' for m in romantic_s])

# emotional: sadness/sorry/miss + length
EMO = re.compile(r'(😭|😢|🥺|🥹|sorry|miss you|miss u|cried|crying|hurt|vishamam|please dont|i need you|scared|promise)', re.IGNORECASE)
emo = [m for m in chat if EMO.search(m["text"]) and not is_media(m["text"]) and len(m["text"])>25]
emo_s = sorted(emo, key=lambda m: len(m["text"]), reverse=True)[:150]
emo_s.sort(key=lambda m:m["dt"])
writef("emotional.txt", [f'{m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:350]}' for m in emo_s])

# first occurrences for timeline (sample early msgs + first phrase hits)
writef("first_50_messages.txt", [f'{m["dt"]:%Y-%m-%d %H:%M} {m["sender"]}: {m["text"][:150]}' for m in chat[:60]])
firsts_lines=[]
for k in PHRASES:
    if k in ph_first:
        d,s,tx = ph_first[k]; firsts_lines.append(f'{k}: {d:%Y-%m-%d %H:%M} {s}: {tx}')
writef("phrase_firsts.txt", firsts_lines)

# nickname scan (terms of endearment frequency by person)
NICKS = ["baby","babe","amoor","kunju","kunje","motta","jaan","cutie","love","da","mone","mole","ammu","sweetheart","pottan","kutty","chక","chakkara","appu"]
nick_person = defaultdict(Counter); nick_first={}; nick_last={}
for m in chat:
    tl = m["text"].lower()
    for nk in NICKS:
        if re.search(r'\b'+re.escape(nk)+r'\b', tl):
            nick_person[nk][m["sender"]]+=1
            if nk not in nick_first: nick_first[nk]=m["dt"]
            nick_last[nk]=m["dt"]
print("\n##SECTION7_NICKS")
for nk in sorted(NICKS, key=lambda n: -sum(nick_person[n].values())):
    tot=sum(nick_person[nk].values())
    if tot: print(f"{nk}\t{tot}\t{P0}={nick_person[nk][P0]}\t{P1}={nick_person[nk][P1]}\tfirst={nick_first[nk]:%Y-%m-%d}\tlast={nick_last[nk]:%Y-%m-%d}")

# ---------- SECTION 8: STYLE ----------
print("\n##SECTION8")
for p in people:
    pm = [m for m in chat if m["sender"]==p and not is_media(m["text"])]
    lens = [len(m["text"]) for m in pm]
    wlen = [len(re.findall(r"\w+",m["text"])) for m in pm]
    emoji_re = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000027BF❤♥]")
    emoji_n = sum(len(emoji_re.findall(m["text"])) for m in pm)
    caps = sum(1 for m in pm if m["text"].isupper() and len(m["text"])>3)
    print(f"{p}\tavg_chars={statistics.mean(lens):.1f}\tavg_words={statistics.mean(wlen):.1f}\tmax_chars={max(lens)}\temoji_total={emoji_n}\temoji_per_msg={emoji_n/len(pm):.2f}\tallcaps_msgs={caps}")

# ---------- SECTION 12: VIZ JSON ----------
viz = {
 "messages_per_day": {str(d): by_date[d] for d in dates},
 "messages_per_month": {k: by_month[k] for k in sorted(by_month)},
 "phrase_frequency": {k: ph_total[k] for k in PHRASES},
 "phrase_monthly": {k: {mo: ph_month[k].get(mo,0) for mo in allmonths} for k in PHRASES},
 "emotion_distribution": dict(emo_count),
 "emotion_monthly": {e: {mo: emo_month[e].get(mo,0) for mo in allmonths} for e in LEX},
 "by_hour": {h: by_hour.get(h,0) for h in range(24)},
 "by_dow": {DOW[i]: by_dow[i] for i in range(7)},
 "response_median_min": {p: (statistics.median(resp[p])/60 if resp[p] else None) for p in people},
 "per_person": {p: {"messages":cnt[p],"words":words_p[p],"media":media_p[p],
                    "questions":q_p[p],"initiations":initiations[p],"double_texts":double[p]} for p in people},
 "totals": {"messages":total,"active_days":len(by_date),"span_days":days_span,
            "longest_streak":best,"people":people},
}
with open(f"{OUT}/viz_data.json","w",encoding="utf-8") as f: json.dump(viz, f, ensure_ascii=False, indent=1)
print("\n##DONE excerpt files + viz_data.json written to", OUT)
print("people:", people)
