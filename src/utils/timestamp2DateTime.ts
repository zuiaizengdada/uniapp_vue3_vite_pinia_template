/**
 * @description: 时间戳转时间
 * @param {number} timestamp
 * @param {*} separator
 * @param {*} includeTime
 * @param {*} timeSeparator
 * @return {*}
 */
export const timestamp2DateTime = (
  timestamp: number,
  separator = '-',
  includeMonth = true,
  includeTime = true,
  timeSeparator = ':'
) => {
  const date = new Date(timestamp)

  // 获取年份
  const year = date.getFullYear()

  // 如果需要包含月份
  let month = ''
  if (includeMonth) {
    month = ('0' + (date.getMonth() + 1)).slice(-2)
  }

  // 获取日期
  const day = ('0' + date.getDate()).slice(-2)

  // 拼接日期部分
  let dateTimeStr = year + separator
  if (includeMonth) {
    dateTimeStr += month + separator
  }
  dateTimeStr += day

  // 如果需要包含时间部分
  if (includeTime) {
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const seconds = ('0' + date.getSeconds()).slice(-2)

    // 拼接时间部分
    dateTimeStr += ' ' + hours + timeSeparator + minutes + timeSeparator + seconds
  }

  return dateTimeStr
}
