const allData = {
  totalRegister: 2019,
  totalActiver: 2008,
  topMouthActiver: 520,
  todayLogin: 100
};

export function getAll() {
  return new Promise((resolve, reject) => {
    resolve(allData);
    allData.totalRegister += 1;
  });
}
