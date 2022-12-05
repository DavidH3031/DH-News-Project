export function getTimeStr(str) {
  const date = str.substring(0, 10);
  const time = str.substring(11, 19);
  return [date, time];
}
