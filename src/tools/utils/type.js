/**
 * 延时函数
 * @param {number} time 延时时间(毫秒)
 * @param {any} info 延时后的返回值
 * @returns {Promise} 延时后的返回值
 */
export const sleep = (time = 0, info = null) =>
  new Promise(res => setTimeout(() => res(info), time));

/* 空白函数 */
export const emptyHandler = () => {};

/**
 * 判断类型
 * @param {string} type 类型值
 * @param {any } value 值
 */
export function isDefType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
export const isStr = str => isDefType("String", str);
export const isNum = number =>
  isDefType("Number", number) && !Number.isNaN(number);
export const isArr = arr => isDefType("Array", arr);
export const isDate = isDefType.bind(null, "Date");
export const isBool = isDefType.bind(null, "Boolean");
export const isObj = isDefType.bind(null, "Object");
export const isFunc = isDefType.bind(null, "Function");
export const isRegExp = isDefType.bind(null, "RegExp");
export const isDef = val => val !== null && val !== undefined;
export const isUndef = val => val === null || val === undefined;

export const emptyObject = Object.freeze({});

/**
 * 检测是否是简单值
 */
export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}
export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}
