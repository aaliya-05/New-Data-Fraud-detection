"""Regenerate src/data/addonNames.json from src/data/addons.csv.

Usage (from frontend/): python scripts/build-addon-names.py [path/to/new.csv]
If a CSV path is given it replaces src/data/addons.csv first.
"""
import csv
import json
import shutil
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src" / "data"
csv_path = root / "addons.csv"
if len(sys.argv) > 1:
    shutil.copyfile(sys.argv[1], csv_path)

out = {}
with open(csv_path, encoding="utf-8-sig", newline="") as f:
    for r in csv.DictReader(f):
        out[r["vas_subscription_id"].strip()] = {
            "name": r["addon_name"].strip(),
            "description": r["addon_description"].strip(),
            "validityDays": int(r["validity_days"]),
        }
(root / "addonNames.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"{len(out)} add-ons written")
