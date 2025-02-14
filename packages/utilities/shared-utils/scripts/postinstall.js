const path = require('path')
const fs = require('fs')

function tryRequirePkg(pkg) {
  try {
    return require(pkg);
  } catch (e) {
    return null;
  }
}

function copyDemiDir(dir) {
  const src = path.join(__dirname, '..', 'dist', 'demi', dir)
  const dest = path.join(__dirname, '..', 'dist')

  fs.cpSync(src, dest, { recursive: true })
}

function modifyDts(path) {
  const dts = fs.readFileSync(path, 'utf8')
  const modifiedDts = dts.replace(/\.\.\/\.\.\/common/g, './common')

  fs.writeFileSync(path, modifiedDts, 'utf8')
}

function postinstall() {
  const nextjs = tryRequirePkg('next/package.json')
  const react = tryRequirePkg('react/package.json')
  const nextjsVersion = Number((nextjs?.version || '').split('.')[0])
  const reactVersion = Number((react?.version || '').split('.')[0])
  
  if (reactVersion === 18 && nextjsVersion < 15) {
    copyDemiDir('react18')
  } else {
    copyDemiDir('react19')
  }

  modifyDts(path.join(__dirname, '..', 'dist', 'index.d.ts'))
}

postinstall();
