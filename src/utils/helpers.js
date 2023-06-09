export function converSecondToTime(seconds) {
  const h = Math.floor(seconds / 360);
  let s = seconds % 360;
  const m = Math.floor(s / 60);
  s = seconds % 60;

  return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
}

export function getAge(age) {

  if (age <= 1) return `امروز`;

  if (age <= 7) return `${age} روز پیش`;

  if (age <= 30) return `${Math.floor(age / 7)} هفته پیش`;

  if (age <= 365) return `${Math.floor(age / 12)} ماه پیش`;

  return `${Math.floor(age / 365)} سال پیش`;
}
