const getURL = 'https://norma.nomoreparties.space/api/ingredients'
const orderURL = 'https://norma.nomoreparties.space/api/orders'

export const getData = () => {
    return fetch(getURL).then((res) => {
      if (!res.ok) {
        throw Error()
      }
      return res.json()
    })
}

export const postOrder = (ingredients) => {
  return fetch(orderURL, {
    method: "POST",
    body: JSON.stringify({ ingredients })
  }).then((res) => {
    if (!res.ok) {
      throw Error()
    }
    return res.json()
  })
}