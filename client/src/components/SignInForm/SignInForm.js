import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../../icons/custom/button"
import { Input } from "../../icons/custom/input"
import { Label } from "../../icons/custom/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../icons/custom/card"
import { Alert, AlertDescription } from "../../icons/custom/alert"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Globe } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../icons/custom/select"
import styles from "./SignInForm.module.css"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const { language, setLanguage, t } = useLanguage()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  const onLogin = async (data) => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Login attempt:", data)
      setMessage({ type: "success", text: t("loginSuccess") })

      // Navigate after login success
      navigate("/dashboard")
    } catch (error) {
      setMessage({ type: "error", text: t("loginError") })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className={styles.backButton}
        >
          <ArrowLeft className={styles.icon} />
        </Button>

        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className={styles.selectTrigger}>
            <Globe className={styles.icon} />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸 EN</SelectItem>
            <SelectItem value="am">🇪🇹 አማ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{t("Welcome back")}</CardTitle>
          <CardDescription className={styles.cardDescription}>
            {t("Enter your credentials to access your account")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
            <div className={styles.formGroup}>
              <Label htmlFor="email">{t("Email")}</Label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("Enter your email")}
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("invalidEmail")
                    }
                  })}
                  className={styles.input}
                />
              </div>
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="password">{t("Password")}</Label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("Enter your password")}
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength")
                    }
                  })}
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.toggleButton}
                >
                  {showPassword ? (
                    <EyeOff className={styles.eyeIcon} />
                  ) : (
                    <Eye className={styles.eyeIcon} />
                  )}
                </button>
              </div>
              {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
            </div>

            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? t("signingIn") : t("signIn")}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className={styles.footerText}>
            {t("Forgot your password?")}{" "}
            <button className={styles.linkButton}>{t("Reset it here")}</button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
