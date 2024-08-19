(() => {

  function createCopyButton(codeNode) {
    const copyBtn = document.createElement('button')
    copyBtn.className = 'code-copy-btn'
    copyBtn.type = 'button'
    copyBtn.innerText = 'copy'

    let resetTimer
    copyBtn.addEventListener('click', () => {
      // markdown rendering doubles up newline characters
      // until it is fixed upstream, I'll remove the duplicates
      let code = codeNode.innerText.replace(/\n\n/g, '\n');
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerText = 'copied!'
      }).then(() => {
        clearTimeout(resetTimer)
        resetTimer = setTimeout(() => {
          copyBtn.innerText = 'copy'
        }, 1000)
      })
    })

    return copyBtn
  }

  document.querySelectorAll('pre > code')
    .forEach((codeNode) => {
      const copyBtn = createCopyButton(codeNode);
      const preNode = codeNode.parentNode
      codeNode.parentNode.insertBefore(copyBtn, codeNode)
    })

  document.querySelectorAll('.highlight table > tbody > tr > td:first-child .code-copy-btn')
    .forEach((btn) => {
      btn.remove()
    })

})()
