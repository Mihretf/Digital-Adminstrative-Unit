"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../../icons/custom/button"
import { Input } from "../../icons/custom/input"
import { Label } from "../../icons/custom/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../icons/custom/card"
import { Alert, AlertDescription } from "../../icons/custom/alert"
import { Eye, EyeOff, Mail, Lock, User, Globe } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../icons/custom/select"
import styles from "./CreateAccountForm.module.css"

export function CreateAccountForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const { language, setLanguage, t } = useLanguage()
  const signupForm = useForm()
  const navigate = useNavigate()

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  const onSignup = async (data) => {
    setIsLoading(true)
    setMessage(null)

    if (data.password !== data.confirmPassword) {
      setMessage({ type: "error", text: t("passwordsDoNotMatch") })
      setIsLoading(false)
      return
    }

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Signup attempt:", data)

      setMessage({ type: "success", text: t("signupSuccess") })

      // Navigate to dashboard after success
      navigate("/dashboard")
    } catch (error) {
      setMessage({ type: "error", text: t("signupError") })
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Button variant="ghost" onClick={goBack} type="button" className={styles.backButton}>
            ←
          </Button>

          <Select value={language} onValueChange={handleLanguageChange} className={styles.languageSelector}>
            <SelectTrigger>
              <Globe />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 EN</SelectItem>
              <SelectItem value="am">🇪🇹 አማ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle>{t("createAnAccount")}</CardTitle>
            <CardDescription>{t("enterInformation")}</CardDescription>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <form onSubmit={signupForm.handleSubmit(onSignup)}>
              {/* Full Name */}
              <div className={styles.formGroup}>
                <Label htmlFor="signup-name">{t("fullName")}</Label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t("enterFullName")}
                    className={styles.inputField}
                    {...signupForm.register("fullName", {
                      required: t("fullNameRequired"),
                      minLength: { value: 2, message: t("nameMinLength") }
                    })}
                  />
                </div>
                {signupForm.formState.errors?.fullName && (
                  <p className={styles.errorMessage}>
                    {signupForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <Label htmlFor="signup-email">{t("email")}</Label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t("enterEmail")}
                    className={styles.inputField}
                    {...signupForm.register("email", {
                      required: t("emailRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("invalidEmail")
                      }
                    })}
                  />
                </div>
                {signupForm.formState.errors?.email && (
                  <p className={styles.errorMessage}>
                    {signupForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <Label htmlFor="signup-password">{t("password")}</Label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("createPassword")}
                    className={styles.inputField}
                    {...signupForm.register("password", {
                      required: t("passwordRequired"),
                      minLength: { value: 8, message: t("passwordMinLengthSignup") },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: t("passwordPattern")
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.togglePasswordButton}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {signupForm.formState.errors?.password && (
                  <p className={styles.errorMessage}>
                    {signupForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <Label htmlFor="signup-confirm-password">{t("confirmPassword")}</Label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirmYourPassword")}
                    className={styles.inputField}
                    {...signupForm.register("confirmPassword", {
                      required: t("confirmPasswordRequired")
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.togglePasswordButton}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {signupForm.formState.errors?.confirmPassword && (
                  <p className={styles.errorMessage}>
                    {signupForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Message alert */}
              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"} className={styles.alert}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={isLoading} className={styles.continueButton}>
                {isLoading ? t("creatingAccount") : t("createAccount")}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className={styles.termsText}>
              {t("agreeToTerms")}{" "}
              <button className={styles.linkButton}>{t("termsOfService")}</button>{" "}
              {t("and")}{" "}
              <button className={styles.linkButton}>{t("privacyPolicy")}</button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CreateAccountForm
