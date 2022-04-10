const $form = document.getElementById('form')
const $sendEmail = document.getElementById('emailA')

function handleSendEmail(event) {
  event.preventDefault()
  console.log(this)
  const fd = new FormData(this)

  $sendEmail.setAttribute(
    'href',
    `mailTo:jona03g97@gmail.com?subject=${fd.get('subject')}&body=${fd.get(
      'message'
    )}`
  )

  $sendEmail.click()
}

$form.addEventListener('submit', handleSendEmail)
