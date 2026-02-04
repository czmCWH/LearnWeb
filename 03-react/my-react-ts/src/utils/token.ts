/**
 * 封装使用 token 本地持久化的方法
 */

const TOKEN_KEY = 'token_key'

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export {
  setToken, 
  getToken,
  removeToken,
}