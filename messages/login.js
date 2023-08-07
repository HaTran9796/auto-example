const normalMessages = {
  en: {
    organizationList: 'Organization List'
  },
  ja: {
    organizationList: '組織管理'
  }
}

const errorMessages = {
  en: {
    organizationRequired: 'Organization ID is required',
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    passwordInvalid: "Password must not be shorter than 8 characters",
    loginError: "Wrong credential",
    accountInactive: "Account Inactive",
    emailInvalid: "Wrong email format",
  },
  ja: {
    organizationRequired: '組織は必須です',
    emailRequired: "メールアドレスは必須です",
    passwordRequired: "パスワードは必須です",
    passwordInvalid: "パスワードまたはメールアドレスが無効です",
    loginError: "パスワードと組織IDまたはメールアドレスが無効です。",
    accountInactive: "あなたのアカウントは一時的に無効になっています。詳細については、管理者にお問い合わせください",
    emailInvalid: "メールアドレスのフォーマットが無効です1",
  }
}

module.exports = {
  normalMessages,
  errorMessages,
};