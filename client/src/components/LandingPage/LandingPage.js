import React, { useState } from "react";
import { Globe, UserPlus, LogIn } from "../../icons/index"; // We'll organize icons here
import { useLanguage } from "../../context/LanguageContext";
import styles from "./LandingPage.module.css"; // CSS module we'll create

export default function LandingPage({ onContinue }) {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const { language, setLanguage, t } = useLanguage();

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleUserTypeSelect(type) {
    setSelectedUserType(type);
  }

  function handleContinue() {
    if (selectedUserType) {
      onContinue(selectedUserType);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Language Selection */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Globe className={styles.icon} />
            <h2>{t("selectLanguage")}</h2>
          </div>
          <div className={styles.cardContent}>
            <select value={language} onChange={handleLanguageChange} className={styles.select}>
              <option value="en">🇺🇸 {t("english")}</option>
              <option value="am">🇪🇹 {t("amharic")}</option>
            </select>
          </div>
        </div>

        {/* Welcome Message */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1>{t("welcome")}</h1>
            <p>
              {language === "en"
                ? "Please select your account status to continue"
                : "ለመቀጠል የመለያ ሁኔታዎን ይምረጡ"}
            </p>
          </div>
          <div className={styles.cardContent}>
            {/* New User Option */}
            <div
              className={`${styles.option} ${
                selectedUserType === "new" ? styles.selected : ""
              }`}
              onClick={() => handleUserTypeSelect("new")}
            >
              <div className={`${styles.iconWrapper} ${selectedUserType === "new" ? styles.activeIcon : ""}`}>
                <UserPlus className={styles.icon} />
              </div>
              <div className={styles.optionText}>
                <h3>{t("newUser")}</h3>
                <p>
                  {language === "en"
                    ? "Create a new account to get started"
                    : "ለመጀመር አዲስ መለያ ፍጠሩ"}
                </p>
              </div>
              {selectedUserType === "new" && <div className={styles.radioDot} />}
            </div>

            {/* Existing User Option */}
            <div
              className={`${styles.option} ${
                selectedUserType === "existing" ? styles.selected : ""
              }`}
              onClick={() => handleUserTypeSelect("existing")}
            >
              <div className={`${styles.iconWrapper} ${selectedUserType === "existing" ? styles.activeIcon : ""}`}>
                <LogIn className={styles.icon} />
              </div>
              <div className={styles.optionText}>
                <h3>{t("existingUser")}</h3>
                <p>
                  {language === "en"
                    ? "Sign in to your existing account"
                    : "ወደ ነባር መለያዎ ይግቡ"}
                </p>
              </div>
              {selectedUserType === "existing" && <div className={styles.radioDot} />}
            </div>

            <button
              disabled={!selectedUserType}
              className={styles.continueButton}
              onClick={handleContinue}
            >
              {selectedUserType === "new"
                ? t("getStarted")
                : selectedUserType === "existing"
                ? t("signIn")
                : t("getStarted")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
