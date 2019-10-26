#!/bin/bash
set -o xtrace

git diff --exit-code \
    && git diff --cached --exit-code \
    && npm run build \
    && git checkout gh-pages \
    && cp -rf _book/* . 
    && git pull \
    && git commit -a -m "publish: ${date}" \
    && git push \
    && git checkout master