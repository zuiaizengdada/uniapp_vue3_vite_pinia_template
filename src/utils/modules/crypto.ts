import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js'
import CryptoJS from 'crypto-js'

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpAPiHBGnFj2+9lPQ76fEhuQDUel8Jev2o0+Oc4hhIOEWzAyFACvpLWZyfrQi0x+0Q0ADmA391djK2kzNMgu1Ukx3jb+GT9Wqu/bl+QzgE02j1D8GOH9hjZ33QlGZmloKRxJE7LS6Psr9Jt5Zu0wS9ERU1qdfT58TJmdxcoZlzGQIDAQAB'

// 对请求体进行动态对称加密，并返回加密后的请求体和加密后的对称密钥
export function generatRandomKey() {
  const randomKey = CryptoJS.lib.WordArray.random(16)
  const symmetricKey = randomKey.toString(CryptoJS.enc.Hex)
  // 生成随机的对称密钥
  return {
    randomKey,
    symmetricKey
  }
}

// 对请求体进行动态对称加密，并返回加密后的请求体和加密后的对称密钥
export function encryptRequestBody(requestBody: CryptoJS.lib.WordArray | string, randomKey: CryptoJS.lib.WordArray | string) {
  // 对请求体进行AES加密  目前采用ECB模式性能更高，如需更高安全级别后续可以调整为CBC模式
  const encryptedRequestBody = CryptoJS.AES.encrypt(requestBody, randomKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return encryptedRequestBody
}

// 使用非对称加密算法对对称密钥进行加密，并返回加密后的密钥
export function encryptSymmetricKey(symmetricKey: string) {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(publicKey)
  return jsEncrypt.encrypt(symmetricKey)
}

// 解密响应体中的数据，使用给定的对称密钥进行解密，并返回解密后的数据
export function decryptResponseBody(responseBody: any, symmetricKey: string) {
  // 对响应体进行AES解密
  const encryptedBytes = CryptoJS.enc.Base64.parse(responseBody)
  // 需要将16进制转byte数组
  const keyBytes = CryptoJS.enc.Hex.parse(symmetricKey)
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes } as CryptoJS.lib.CipherParams | string, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedResponseBody = decrypted.toString(CryptoJS.enc.Utf8)
  // 返回解密后的数据
  return JSON.parse(decryptedResponseBody)
}
// 解密
export function decryptAES(encrypted: CryptoJS.lib.CipherParams | string, key: string) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

const { randomKey, symmetricKey } = generatRandomKey()
const { id: userId = 1 } = { id: '1828638307847184385' }
const handshakeCode = encryptRequestBody(`1,${userId}`, randomKey)
const secretKey = encryptSymmetricKey(symmetricKey)

export default {
  encryptRequestBody,
  encryptSymmetricKey,
  decryptResponseBody,
  generatRandomKey,
  decryptAES,
  handshakeCode,
  secretKey
}
