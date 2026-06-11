/**
 * 响应码定义模块
 *
 * 该模块定义了系统中使用的所有响应码，采用5位数字编码：
 * - 第1位：1 成功  2 客户端错  3 服务端错  4 业务错
 * - 后4位：从 0001 开始顺序排，留 0000 做「通用」占位
 *
 * 此设计避免了与HTTP状态码的冲突，同时提供了良好的扩展性和可读性。
 */

// 成功 1xxxx
export const SUCCESS = 10000; // 通用成功
export const CREATED = 10001; // 创建成功
export const UPDATED = 10002; // 更新成功
export const DELETED = 10003; // 删除成功
export const NO_CONTENT = 10004; // 无内容

// 客户端错误 2xxxx
export const BAD_REQUEST = 20000; // 请求参数错误
export const UNAUTHORIZED = 20001; // 未授权
export const FORBIDDEN = 20002; // 禁止访问
export const NOT_FOUND = 20003; // 资源不存在
export const METHOD_NOT_ALLOW = 20004; // 方法不允许
export const REQ_TIMEOUT = 20005; // 请求超时（避开408）
export const VALIDATION_ERROR = 20006; // 数据验证错误（避开422）

// 服务端错误 3xxxx
export const INTERNAL_ERROR = 30000; // 服务器内部错误
export const SERVICE_UNAVAILABLE = 30001; // 服务不可用
export const GATEWAY_TIMEOUT = 30002; // 网关超时（避开504）

// 业务错误 4xxxx
export const BUSINESS_ERROR = 40000; // 通用业务错误
export const USER_NOT_EXIST = 40001; // 用户不存在
export const USER_ALREADY_EXIST = 40002; // 用户已存在
export const PASSWORD_ERROR = 40003; // 密码错误
export const INSUFFICIENT_BALANCE = 40004; // 余额不足
export const PERMISSION_DENIED = 40005; // 权限不足

/**
 * 响应码描述映射表
 * 用于根据响应码快速获取对应的描述信息
 */
export const responseCodeMap: Record<number, string> = {
  // 成功 1xxxx
  10000: "通用成功",
  10001: "创建成功",
  10002: "更新成功",
  10003: "删除成功",
  10004: "无内容",

  // 客户端错误 2xxxx
  20000: "请求参数错误",
  20001: "未授权",
  20002: "禁止访问",
  20003: "资源不存在",
  20004: "方法不允许",
  20005: "请求超时",
  20006: "数据验证错误",

  // 服务端错误 3xxxx
  30000: "服务器内部错误",
  30001: "服务不可用",
  30002: "网关超时",

  // 业务错误 4xxxx
  40000: "通用业务错误",
  40001: "用户不存在",
  40002: "用户已存在",
  40003: "密码错误",
  40004: "余额不足",
  40005: "权限不足",
};

/**
 * 判断响应码是否表示成功
 * @param code 响应码
 * @returns 是否成功
 */
export const isSuccessCode = (code: number): boolean => {
  return String(code).startsWith("1");
};

/**
 * 获取响应码的描述信息
 * @param code 响应码
 * @returns 响应码描述
 */
export const getCodeMessage = (
  code: number
): string => {
  return responseCodeMap[code];
};
