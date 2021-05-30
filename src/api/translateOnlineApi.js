const URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const key =
  'trnsl.1.1.20210530T093824Z.4a4f6eb96b11a98e.ed8233236b100d0f0a7556847029f3d4e48a7498'

const translate = async (text, from, to) => {
  const lang = from + '-' + to

  try {
    const res = await fetch(
      URL + '?key=' + key + '&text=' + text + '&lang=' + lang + '&format=plain'
    )
    const data = await res.json()
    switch (data.code) {
      case 200:
        return data.text[0]
      case 422:
        return 'Không thể dịch văn bản, vui lòng thử lại'
      case 412:
        return 'Độ dài văn bản quá lớn'
      default:
        return 'Không thể dịch lúc này, vui lòng thử lại sau'
    }
  } catch (err) {
    console.error(err)
  }
}

export { translate }
