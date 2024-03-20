/**
 * @description: 计算当前年龄
 * @param {string} birthDate
 * @return {number} age 当前年龄
 */
export const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birthDateTime = new Date(birthDate)

  let age = today.getFullYear() - birthDateTime.getFullYear()

  // 检查生日是否已经过了今年
  if (
    today.getMonth() < birthDateTime.getMonth() ||
    (today.getMonth() === birthDateTime.getMonth() &&
      today.getDate() < birthDateTime.getDate())
  ) {
    // 如果生日还没到，年龄减去 1
    age--
  }

  // 如果年龄小于 0，则设置为 0
  if (age < 0) {
    age = 0
  }

  return age
}
