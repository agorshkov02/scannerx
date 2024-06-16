import settings from 'electron-settings'

const DIR = 'do_not_touch'
const FILE_NAME = 'scannerx.settings.json'

settings.configure({
  atomicSave: true,
  dir: DIR,
  fileName: FILE_NAME
})
