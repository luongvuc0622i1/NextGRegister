export const errorDescriptions: { [key: string]: string } = {
  // Màn hình đăng nhập:
  // Lỗi trả về status
  '401': 'Sai mật khẩu',
  // Lỗi trả về errorCode
  '801': 'Tài khoản bị khóa',
  '822': 'Không tìm thấy email',
  '823': 'Không tìm thấy số điện thoại',
  '806': 'OTP không hợp lệ',
  
  // Màn hình đăng nhập:
  // Lỗi trả về errorCode
  '803': 'Email đã được đăng ký',
  '805': 'Số điện thoại đã được đăng ký',
  '807': 'Số điện thoại chưa được kiểm tra',
  '811': 'Không tìm thấy role',

  // Màn hình đổi mật khẩu:
  // Lỗi trả về errorCode
  '802': 'Email chưa được kiểm tra',

  // Màn hình settings:
  // Lỗi trả về errorCode
  '814': 'Mật khẩu cũ không đúng',

  // Màn hình payment:
  // Lỗi trả về errorCode
  '817': 'Discount Code không hợp lệ hoặc hết hạn',
  '824': 'Không tìm được Discount Code',
};