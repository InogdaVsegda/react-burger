const getURL = 'https://norma.nomoreparties.space/api/ingredients'
const orderURL = 'https://norma.nomoreparties.space/api/orders'

const fetchHandler = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
};

export const getData = () => {
    return fetch(getURL)
    .then((res) => fetchHandler(res))
}

export const postOrder = (ingredients) => {
  return fetch(orderURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ingredients })
  }).then((res) => fetchHandler(res))
}