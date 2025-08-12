"use client";

import React from "react";
import styles from "./Dashboard.module.css";
import { Button } from "../../icons/custom/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../icons/custom/card";
import { Badge } from "../../icons/custom/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../icons/custom/select";
import {
  Globe,
  LogOut,
  FileText,
  IdCard,
  Building,
  MoreHorizontal,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Dashboard({ onLogout, onViewRequest, userRequests }) {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const services = [
    { id: "residence-letter", key: "residenceLetter", descKey: "residenceLetterDesc", icon: FileText, color: styles.blue },
    { id: "id-confirmation", key: "idConfirmation", descKey: "idConfirmationDesc", icon: IdCard, color: styles.green },
    { id: "business-license", key: "businessLicense", descKey: "businessLicenseDesc", icon: Building, color: styles.purple },
    { id: "other-services", key: "otherServices", descKey: "otherServicesDesc", icon: MoreHorizontal, color: styles.gray },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleRequestService = (serviceId) => {
    navigate(`/service-request/${serviceId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      case "inReview":
        return styles.statusInReview;
      default:
        return styles.statusPending;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === "en"
      ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : date.toLocaleDateString("am-ET", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>{t("dashboard")}</h1>

          <div className={styles.headerActions}>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className={styles.selectTrigger}>
                <Globe className={styles.iconSmall} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 EN</SelectItem>
                <SelectItem value="am">🇪🇹 አማ</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={onLogout} className={styles.logoutButton}>
              <LogOut className={styles.iconSmall} />
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className={styles.wrapper}>
        {/* Available Services */}
        <section>
          <div className={styles.sectionHeader}>
            <h2>{t("availableServices")}</h2>
            <p>{t("requestNew")}</p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className={`${styles.card} ${styles.serviceCard}`}
                  onClick={() => handleRequestService(service.id)}
                >
                  <CardContent className={styles.cardContent}>
                    <div className={styles.serviceContent}>
                      <div className={`${styles.iconWrapper} ${service.color}`}>
                        <Icon className={styles.icon} />
                      </div>
                      <div>
                        <h3>{t(service.key)}</h3>
                        <p>{t(service.descKey)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* My Requests */}
        <section>
          <div className={styles.sectionHeader}>
            <h2>{t("myRequests")}</h2>
            <p>{t("trackRequests")}</p>
          </div>

          {userRequests.length === 0 ? (
            <Card className={styles.card}>
              <CardContent className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <FileText className={styles.iconLarge} />
                </div>
                <h3>{t("noRequests")}</h3>
                <p>{t("noRequestsDesc")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className={styles.requestsList}>
              {userRequests.map((request) => (
                <Card key={request.id} className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <div className={styles.requestRow}>
                      <div>
                        <div className={styles.requestTitleRow}>
                          <h3>{t(request.serviceType)}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {t(request.status)}
                          </Badge>
                        </div>
                        <div className={styles.requestDates}>
                          <span>
                            <Calendar className={styles.iconSmall} /> {t("requestDate")}: {formatDate(request.requestDate)}
                          </span>
                          <span>
                            <Clock className={styles.iconSmall} /> {t("lastUpdated")}: {formatDate(request.lastUpdated)}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => onViewRequest(request)}>
                        <Eye className={styles.iconSmall} /> {t("viewDetails")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
