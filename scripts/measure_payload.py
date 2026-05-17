"""One-shot ops script: measure the size of each key in /api/public/site-content."""
import json
import sys
import urllib.request

URL = "http://127.0.0.1:8002/api/public/site-content"

data = json.loads(urllib.request.urlopen(URL).read())
sizes = sorted(
    [(k, len(json.dumps(v)), len(v) if isinstance(v, list) else 1) for k, v in data.items()],
    key=lambda r: -r[1],
)
total = sum(s[1] for s in sizes)
print(f"TOTAL: {total} bytes\n")
for k, b, n in sizes:
    pct = b * 100 / total
    print(f"  {k:25s} {b:>8} bytes  ({pct:5.1f}%)  {n} items")
