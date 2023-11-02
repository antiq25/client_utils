import * as apiCalls from '../apiHandler'

export const handleSignup = async (): Promise<void> => {
  const email: string = (
    document.getElementById('signupEmail') as HTMLInputElement
  ).value
  const password: string = (
    document.getElementById('signupPassword') as HTMLInputElement
  ).value
  const firstName: string = (
    document.getElementById('signupFirstName') as HTMLInputElement
  ).value
  const lastName: string = (
    document.getElementById('signupLastName') as HTMLInputElement
  ).value
  await apiCalls.signup(email, password, firstName, lastName)
}

export const handleLogin = async (): Promise<void> => {
  const email: string = (
    document.getElementById('loginEmail') as HTMLInputElement
  ).value
  const password: string = (
    document.getElementById('loginPassword') as HTMLInputElement
  ).value
  await apiCalls.handleLogin(email, password)
}

export const handleVerifyEmail = async (): Promise<void> => {
  const code: string = (
    document.getElementById('verifyEmailCode') as HTMLInputElement
  ).value
  await apiCalls.handleVerifyEmail(code)
}

export const handleResendEmailVerification = async (): Promise<void> => {
  const email: string = (
    document.getElementById('resendVerificationEmail') as HTMLInputElement
  ).value
  await apiCalls.handleResendEmailVerification(email)
}

export const handleGetProfile = async (): Promise<void> => {
  const id: number = Number(
    (document.getElementById('getProfileId') as HTMLInputElement).value
  )
  await apiCalls.handleGetProfile(id)
}

export const handleUpdateProfile = async (): Promise<void> => {
  const id: number = Number(
    (document.getElementById('updateProfileId') as HTMLInputElement).value
  )
  const profileData: any = (
    document.getElementById('updateProfileData') as HTMLInputElement
  ).value
  await apiCalls.handleUpdateProfile(id, profileData)
}

export const handleForgotPassword = async (): Promise<void> => {
  const email: string = (
    document.getElementById('forgotPasswordEmail') as HTMLInputElement
  ).value
  await apiCalls.handleForgotPassword(email)
}

export const handleResetPassword = async (): Promise<void> => {
  const token: string = (
    document.getElementById('resetPasswordToken') as HTMLInputElement
  ).value
  const password: string = (
    document.getElementById('resetPassword') as HTMLInputElement
  ).value
  await apiCalls.handleResetPassword(token, password)
}
