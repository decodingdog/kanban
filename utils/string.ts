/**
 *
 * @param str
 * @returns 첫글자만 대문자처리
 */
export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
