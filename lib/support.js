function isUnicodeSupported () {
  if (process.platform !== 'win32') {
    return process.env.TERM !== 'linux' // Linux console (kernel)
  }

  return Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    process.env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty'
}

function isInteractive ({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY &&
    process.env.TERM !== 'dumb' &&
    !('CI' in process.env)
  )
}

module.exports = {
  isUnicodeSupported: isUnicodeSupported(),
  isInteractive: isInteractive()
}
