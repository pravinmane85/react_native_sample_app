#!/usr/bin/env python3
"""Make a throwaway copy of the repo for a workshop attendee agent.

Usage: python3 scripts/prepare-attendee-copy.py <name> [<name> ...]

Each name gets its own folder at .workshop-attendee/<name>-<timestamp>/ so
several attendee agents can run at the same time without editing the same files.
The copy skips node_modules, .git and earlier copies, and links the real
node_modules into it. The folders are git-ignored.
"""
import os
import shutil
import sys
import time

repo = os.getcwd()
if not os.path.exists(os.path.join(repo, "WORKSHOP.md")):
    sys.exit("Run this from the repo root (the folder with WORKSHOP.md).")

names = sys.argv[1:]
if not names:
    sys.exit("Give at least one attendee name, for example: iphone pixel web")

stamp = time.strftime("%Y%m%d-%H%M%S")
ignore = shutil.ignore_patterns("node_modules", ".git", ".workshop-attendee", "workshop-reports")
os.makedirs(os.path.join(repo, ".workshop-attendee"), exist_ok=True)

for name in names:
    work = os.path.join(repo, ".workshop-attendee", f"{name}-{stamp}")
    shutil.copytree(repo, work, ignore=ignore)
    os.symlink(os.path.join(repo, "node_modules"), os.path.join(work, "node_modules"))
    print(f"{name}: {work}")
