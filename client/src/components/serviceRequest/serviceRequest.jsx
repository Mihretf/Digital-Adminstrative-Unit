"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../icons/custom/button";
import { Input } from "../../icons/custom/input";
import { Label } from "../../icons/custom/label";
import { Textarea } from "../../icons/custom/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../icons/custom/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../icons/custom/select";
import { ArrowLeft, FileText, Globe, User, CreditCard, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

import styles from "./serviceRequest.module.css";

export function ServiceRequestForm({ serviceType, onSubmit, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const form = useForm();

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case "residence-letter":
        return t("residenceLetter");
      case "id-confirmation":
        return t("idConfirmation");
      case "business-license":
        return t("businessLicense");
      default:
        return t("otherServices");
    }
  };

  const getServiceDescription = () => {
    switch (serviceType) {
      case "residence-letter":
        return t("residenceLetterDesc");
      case "id-confirmation":
        return t("idConfirmationDesc");
      case "business-license":
        return t("businessLicenseDesc");
      default:
        return t("otherServicesDesc");
    }
  };

  if (serviceType !== "residence-letter") {
    return (
      <div className={`${styles.minScreen} ${styles.flexCenter} ${styles.bgGradient}`}>
        <Card className={styles.cardMaxWidth}>
          <CardHeader className={styles.textCenter}>
            <CardTitle>{getServiceTitle()}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "This service is not yet available. Please check back later."
                : "ይህ አገልግሎት ገና አይገኝም። እባክዎ በኋላ ይመልከቱ።"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack} className={styles.fullWidth}>
              <ArrowLeft className={styles.iconMargin} />
              {t("back")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.bgGradient}>
      {/* Header */}
      <header className={`${styles.bgWhite} ${styles.borderBottom} ${styles.padding}`}>
        <div className={styles.headerContainer}>
          <div className={styles.flexGap}>
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className={styles.iconSize} />
            </Button>
            <div>
              <h1 className={styles.title}>{getServiceTitle()}</h1>
              <p className={styles.subtitle}>{getServiceDescription()}</p>
            </div>
          </div>

          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className={styles.selectTrigger}>
              <Globe className={styles.iconMargin} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 EN</SelectItem>
              <SelectItem value="am">🇪🇹 አማ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className={styles.containerPadding}>
        <Card>
          <CardHeader>
            <div className={styles.flexGap}>
              <div className={styles.iconBg}>
                <FileText className={styles.iconSize} />
              </div>
              <div>
                <CardTitle>{t("residenceLetter")}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Please fill out the form below to request your residence letter"
                    : "የመኖሪያ ደብዳቤዎን ለመጠየቅ ከዚህ በታች ያለውን ቅጽ ይሙሉ"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
              <div className={styles.formContainer}>

            <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.formSpace}>
              {/* Full Name */}
              <div className={styles.fieldSpace}>
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <div className={styles.relative}>
                  <User className={styles.iconAbsolute} />
                  <Input
                    id="fullName"
                    placeholder={t("enterFullName")}
                    className={styles.inputPadding}
                    {...form.register("fullName", {
                      required: t("fullNameRequired"),
                      minLength: {
                        value: 2,
                        message: t("nameMinLength"),
                      },
                    })}
                  />
                </div>
                {form.formState.errors.fullName && (
                  <p className={styles.errorText}>{form.formState.errors.fullName.message}</p>
                )}
              </div>

              {/* National ID */}
              <div className={styles.fieldSpace}>
                <Label htmlFor="nationalId">{t("nationalId")}</Label>
                <div className={styles.relative}>
                  <CreditCard className={styles.iconAbsolute} />
                  <Input
                    id="nationalId"
                    placeholder={t("enterNationalId")}
                    className={styles.inputPadding}
                    {...form.register("nationalId", {
                      required: t("nationalIdRequired"),
                    })}
                  />
                </div>
                {form.formState.errors.nationalId && (
                  <p className={styles.errorText}>{form.formState.errors.nationalId.message}</p>
                )}
              </div>

              {/* Address */}
              <div className={styles.fieldSpace}>
                <Label htmlFor="address">{t("address")}</Label>
                <div className={styles.relativeTop}>
                  <MapPin className={styles.iconAbsoluteTop} />
                  <Textarea
                    id="address"
                    placeholder={t("enterAddress")}
                    className={`${styles.inputPadding} ${styles.textareaMinHeight}`}
                    {...form.register("address", {
                      required: t("addressRequired"),
                    })}
                  />
                </div>
                {form.formState.errors.address && (
                  <p className={styles.errorText}>{form.formState.errors.address.message}</p>
                )}
              </div>

              {/* Purpose */}
              <div className={styles.fieldSpace}>
                <Label htmlFor="purpose">{t("purpose")}</Label>
                <div className={styles.relativeTop}>
                  <FileText className={styles.iconAbsoluteTop} />
                  <Textarea
                    id="purpose"
                    placeholder={t("enterPurpose")}
                    className={`${styles.inputPadding} ${styles.textareaMinHeight}`}
                    {...form.register("purpose", {
                      required: t("purposeRequired"),
                    })}
                  />
                </div>
                {form.formState.errors.purpose && (
                  <p className={styles.errorText}>{form.formState.errors.purpose.message}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className={styles.contactInfo}>
                <h3 className={styles.fontMedium}>{t("contactInfo")}</h3>

                {/* Phone */}
                <div className={styles.fieldSpace}>
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <div className={styles.relative}>
                    <Phone className={styles.iconAbsolute} />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("enterPhone")}
                      className={styles.inputPadding}
                      {...form.register("phone", {
                        required: t("phoneRequired"),
                        pattern: {
                          value: /^[\+]?[\d\s\-\(\)]{10,}$/,
                          message: t("invalidPhone"),
                        },
                      })}
                    />
                  </div>
                  {form.formState.errors.phone && (
                    <p className={styles.errorText}>{form.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className={styles.fieldSpace}>
                  <Label htmlFor="email">{t("email")}</Label>
                  <div className={styles.relative}>
                    <Mail className={styles.iconAbsolute} />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("enterEmail")}
                      className={styles.inputPadding}
                      {...form.register("email", {
                        required: t("emailRequired"),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("invalidEmail"),
                        },
                      })}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className={styles.errorText}>{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.flexGapSubmit}>
  <Button
    type="button"
    variant="outline"
    onClick={onBack}
    className={`${styles.flexOne} ${styles.cancelButton}`}
  >
    {t("cancel")}
  </Button>
  <Button
    type="submit"
    disabled={isLoading}
    className={`${styles.flexOne} ${styles.submitButton}`}
  >
    {isLoading ? t("submitting") : t("submit")}
  </Button>
</div>
            </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
