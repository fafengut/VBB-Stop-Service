#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist

# build
npm run build

GIT_URL=$(git remote get-url origin)

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b gh-pages
git add -A
git commit -m 'deployed by gh-deploy.sh'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:fafengut/vbb-stop-service.git main:gh-pages
git push -f $GIT_URL gh-pages

cd -