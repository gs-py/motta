#!/usr/bin/env python3
"""WhatsApp chat analytics for 'Divs ❤️' export."""
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime

FILE = "WhatsApp Chat with Divs ❤️.txt"

# Line start: 07/10/25, 22:16 - sender: message
LINE_RE = re.compile(r'^(\d{2})/(\d{2})/(\d{2}), (\d{2}):(\d{2}) - (.*)$')
# sender: message  (sender has no colon issues normally)
SENDER_RE = re.compile(r'^([^:]{1,40}?): (.*)$', re.DOTALL)

# Love phrase patterns (case-insensitive)
LOVE_PATTERNS = [
    r'\bi\s*love\s*(you|u|you+)\b',
    r'\blove\s*(you|u)\b',
    r'\bily\b',
    r'\bluv\s*(you|u)\b',
    r'\bi\s*luv\s*(you|u)\b',
    r'\bmiss\s*(you|u)\b',
]
LOVE_RE = re.compile('|'.join(LOVE_PATTERNS), re.IGNORECASE)
ILY_STRICT = re.compile(r'\bi\s*love\s*(you|u|yu+)\b', re.IGNORECASE)

# Emoji range
EMOJI_RE = re.compile(
    "[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF❤♥]",
    flags=re.UNICODE,
)
HEART_RE = re.compile("[❤♥\U0001F90D\U0001F90E\U0001F493-\U0001F49F\U0001F5A4\U0001F90C]")

def parse():
    msgs = []
    cur = None
    with open(FILE, encoding="utf-8") as f:
        for raw in f:
            line = raw.rstrip("\n")
            m = LINE_RE.match(line)
            if m:
                dd, mm, yy, hh, mi, body = m.groups()
                sm = SENDER_RE.match(body)
                if sm:
                    sender, text = sm.group(1), sm.group(2)
                else:
                    # system line (encryption notice, etc.)
                    sender, text = None, body
                dt = datetime(2000 + int(yy), int(mm), int(dd), int(hh), int(mi))
                cur = {"dt": dt, "sender": sender, "text": text}
                msgs.append(cur)
            else:
                # continuation of previous multiline message
                if cur is not None:
                    cur["text"] += "\n" + line
    return msgs

def main():
    msgs = parse()
    # drop system lines (no sender)
    chat = [m for m in msgs if m["sender"] is not None]
    senders = [m["sender"] for m in chat]
    people = [s for s, _ in Counter(senders).most_common()]

    per = defaultdict(lambda: {
        "count": 0, "words": 0, "chars": 0, "media": 0,
        "love": 0, "ily": 0, "hearts": 0, "emojis": 0,
        "deleted": 0, "edited": 0, "longest": "", "questions": 0,
    })

    by_hour = Counter()
    by_dow = Counter()
    by_month = Counter()
    by_date = Counter()
    word_freq = Counter()
    emoji_freq = Counter()

    for m in chat:
        s = m["sender"]; t = m["text"]
        d = per[s]
        d["count"] += 1
        tl = t.lower()
        if "<media omitted>" in tl:
            d["media"] += 1
        else:
            words = re.findall(r"\w+", t)
            d["words"] += len(words)
            d["chars"] += len(t)
            for w in words:
                if len(w) > 2:
                    word_freq[w.lower()] += 1
            if len(t) > len(d["longest"]):
                d["longest"] = t
        if "this message was deleted" in tl or "you deleted this message" in tl:
            d["deleted"] += 1
        if t.rstrip().endswith("<This message was edited>"):
            d["edited"] += 1
        if "?" in t:
            d["questions"] += 1
        d["love"] += len(LOVE_RE.findall(t))
        d["ily"] += len(ILY_STRICT.findall(t))
        hearts = HEART_RE.findall(t)
        d["hearts"] += len(hearts)
        ems = EMOJI_RE.findall(t)
        d["emojis"] += len(ems)
        for e in ems:
            emoji_freq[e] += 1

        by_hour[m["dt"].hour] += 1
        by_dow[m["dt"].weekday()] += 1
        by_month[m["dt"].strftime("%Y-%m")] += 1
        by_date[m["dt"].date()] += 1

    total = len(chat)
    span_start = chat[0]["dt"]
    span_end = chat[-1]["dt"]
    days_span = (span_end.date() - span_start.date()).days + 1

    # who texts first each day
    first_of_day = {}
    for m in chat:
        dk = m["dt"].date()
        if dk not in first_of_day:
            first_of_day[dk] = m["sender"]
    first_counter = Counter(first_of_day.values())

    # longest streak of consecutive days with at least 1 msg
    dates = sorted(by_date.keys())
    streak = best = 1
    for i in range(1, len(dates)):
        if (dates[i] - dates[i-1]).days == 1:
            streak += 1
            best = max(best, streak)
        else:
            streak = 1

    DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    bar = lambda n, mx, w=30: "█" * int(w * n / mx) if mx else ""

    print("=" * 56)
    print(f"  CHAT ANALYTICS — {span_start.date()} → {span_end.date()}")
    print(f"  {days_span} days span")
    print("=" * 56)
    print(f"\nTotal messages : {total:,}")
    print(f"Active days    : {len(by_date)}  ({len(by_date)*100//days_span}% of span)")
    print(f"Longest streak : {best} consecutive days")
    print(f"Avg / active day: {total/len(by_date):.1f}")

    print("\n— PER PERSON —")
    hdr = f"{'metric':<16}" + "".join(f"{p[:14]:>16}" for p in people)
    print(hdr)
    def row(label, key, fmt="{:,}"):
        print(f"{label:<16}" + "".join(f"{fmt.format(per[p][key]):>16}" for p in people))
    row("messages", "count")
    row("words", "words")
    row("media sent", "media")
    row("questions", "questions")
    row("deleted", "deleted")
    row("emojis", "emojis")
    row("hearts ❤", "hearts")
    print(f"{'I love you':<16}" + "".join(f"{per[p]['ily']:>16,}" for p in people))
    print(f"{'love/miss u*':<16}" + "".join(f"{per[p]['love']:>16,}" for p in people))
    print(f"{'avg words/msg':<16}" + "".join(
        f"{per[p]['words']/max(per[p]['count']-per[p]['media'],1):>16.1f}" for p in people))
    print(f"{'texts first**':<16}" + "".join(f"{first_counter.get(p,0):>16,}" for p in people))
    print("\n  * love/miss u = i love you + love u + ily + miss u variants")
    print("  ** days where this person sent the first message")

    print("\n— I LOVE YOU TOTALS —")
    print(f"  Strict 'i love you/u' : {sum(per[p]['ily'] for p in people):,}")
    print(f"  All love/miss phrases : {sum(per[p]['love'] for p in people):,}")
    print(f"  Heart emojis ❤        : {sum(per[p]['hearts'] for p in people):,}")

    print("\n— TOP EMOJIS —")
    for e, c in emoji_freq.most_common(12):
        print(f"  {e}  {c:,}")

    print("\n— ACTIVITY BY HOUR —")
    mxh = max(by_hour.values())
    for h in range(24):
        c = by_hour.get(h, 0)
        print(f"  {h:02d}:00 {bar(c, mxh):<30} {c:,}")

    print("\n— ACTIVITY BY WEEKDAY —")
    mxd = max(by_dow.values())
    for i in range(7):
        c = by_dow.get(i, 0)
        print(f"  {DOW[i]} {bar(c, mxd):<30} {c:,}")

    print("\n— BY MONTH —")
    mxm = max(by_month.values())
    for mo in sorted(by_month):
        c = by_month[mo]
        print(f"  {mo} {bar(c, mxm):<30} {c:,}")

    print("\n— TOP WORDS (len>2) —")
    for w, c in word_freq.most_common(20):
        print(f"  {w:<14} {c:,}")

    # busiest single day
    bd, bc = by_date.most_common(1)[0]
    print(f"\nBusiest day: {bd}  ({bc:,} messages)")

if __name__ == "__main__":
    main()
