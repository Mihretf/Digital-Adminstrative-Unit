"use client"

import { createContext, useContext, useState } from "react"

const translations = {
  en: {
    // Auth translations
    welcome: "Welcome",
    selectLanguage: "Select Language",
    english: "English",
    amharic: "አማርኛ",
    newUser: "I'm New Here",
    existingUser: "I Have an Account",
    getStarted: "Get Started",
    signIn: "Sign In",
    createAccount: "Create Account",
    login: "Login",
    signup: "Sign Up",
    welcomeBack: "Welcome back",
    createAnAccount: "Create an account",
    enterCredentials: "Enter your credentials to access your account",
    enterInformation: "Enter your information to get started",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    enterFullName: "Enter your full name",
    createPassword: "Create a password",
    confirmYourPassword: "Confirm your password",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    forgotPassword: "Forgot your password?",
    resetHere: "Reset it here",
    agreeToTerms: "By creating an account, you agree to our",
    termsOfService: "Terms of Service",
    and: "and",
    privacyPolicy: "Privacy Policy",
    emailRequired: "Email is required",
    invalidEmail: "Invalid email address",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMinLengthSignup: "Password must be at least 8 characters",
    passwordPattern: "Password must contain uppercase, lowercase, and number",
    fullNameRequired: "Full name is required",
    nameMinLength: "Name must be at least 2 characters",
    confirmPasswordRequired: "Please confirm your password",
    passwordsDoNotMatch: "Passwords do not match",
    loginSuccess: "Login successful! Redirecting...",
    loginError: "Invalid email or password. Please try again.",
    signupSuccess: "Account created successfully! Please check your email.",
    signupError: "Failed to create account. Please try again.",

    // Dashboard translations
    dashboard: "Dashboard",
    availableServices: "Available Services",
    myRequests: "My Requests",
    requestNew: "Request New Service",
    trackRequests: "Track Existing Requests",
    noRequests: "No requests found",
    noRequestsDesc:
      "You haven't made any service requests yet. Start by requesting a service above.",
    logout: "Logout",

    // Services
    residenceLetter: "Residence Letter",
    idConfirmation: "ID Confirmation",
    businessLicense: "Business License Application",
    otherServices: "Other Services",
    residenceLetterDesc: "Get an official letter confirming your residence address",
    idConfirmationDesc: "Confirm your identity for official purposes",
    businessLicenseDesc: "Apply for a new business license",
    otherServicesDesc: "More services will be available soon",

    // Request status
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    inReview: "In Review",
    requestDate: "Request Date",
    status: "Status",
    serviceType: "Service Type",
    viewDetails: "View Details",

    // Forms
    submit: "Submit Request",
    submitting: "Submitting...",
    cancel: "Cancel",
    back: "Back",
    nationalId: "National ID Number",
    address: "Address",
    purpose: "Purpose of the Letter",
    contactInfo: "Contact Information",
    phone: "Phone Number",
    enterNationalId: "Enter your national ID number",
    enterAddress: "Enter your full address",
    enterPurpose: "Enter the purpose for this letter",
    enterPhone: "Enter your phone number",
    nationalIdRequired: "National ID is required",
    addressRequired: "Address is required",
    purposeRequired: "Purpose is required",
    phoneRequired: "Phone number is required",
    invalidPhone: "Please enter a valid phone number",

    // Confirmation
    requestSubmitted: "Request Submitted Successfully",
    requestSubmittedDesc:
      "Your request has been submitted and is being processed. You can track its status anytime.",
    requestId: "Request ID",
    estimatedTime: "Estimated Processing Time",
    businessDays: "3-5 business days",
    backToDashboard: "Back to Dashboard",
    trackThisRequest: "Track This Request",

    // Request details
    requestDetails: "Request Details",
    submittedOn: "Submitted On",
    lastUpdated: "Last Updated",
    comments: "Comments",
    noComments: "No comments available",
    approvedInstructions:
      "Your request has been approved. Please visit the office to collect your document.",
    pickupLocation: "Pickup Location: Main Office, 2nd Floor, Room 201",
    officeHours: "Office Hours: Monday - Friday, 8:00 AM - 5:00 PM",
    bringDocuments: "Please bring your National ID and this confirmation.",
    downloadConfirmation: "Download Confirmation",
  },
  am: {
    // Auth translations
    welcome: "እንኳን ደህና መጡ",
    selectLanguage: "ቋንቋ ይምረጡ",
    english: "English",
    amharic: "አማርኛ",
    newUser: "አዲስ ተጠቃሚ ነኝ",
    existingUser: "መለያ አለኝ",
    getStarted: "ይጀምሩ",
    signIn: "ግባ",
    createAccount: "መለያ ፍጠር",
    login: "ግባ",
    signup: "መለያ ፍጠር",
    welcomeBack: "እንኳን ደህና መጡ",
    createAnAccount: "መለያ ፍጠሩ",
    enterCredentials: "መለያዎን ለመድረስ መረጃዎችን ያስገቡ",
    enterInformation: "ለመጀመር መረጃዎችን ያስገቡ",
    email: "ኢሜይል",
    password: "የሚስጥር ቃል",
    fullName: "ሙሉ ስም",
    confirmPassword: "የሚስጥር ቃል አረጋግጥ",
    enterEmail: "ኢሜይልዎን ያስገቡ",
    enterPassword: "የሚስጥር ቃልዎን ያስገቡ",
    enterFullName: "ሙሉ ስምዎን ያስገቡ",
    createPassword: "የሚስጥር ቃል ፍጠሩ",
    confirmYourPassword: "የሚስጥር ቃልዎን አረጋግጡ",
    signingIn: "በመግባት ላይ...",
    creatingAccount: "መለያ በመፍጠር ላይ...",
    forgotPassword: "የሚስጥር ቃልዎን ረሳሉ?",
    resetHere: "እዚህ ዳግም ያዘጋጁ",
    agreeToTerms: "መለያ በመፍጠር የእኛን",
    termsOfService: "አገልግሎት ውሎች",
    and: "እና",
    privacyPolicy: "የግላዊነት ፖሊሲ",
    emailRequired: "ኢሜይል ያስፈልጋል",
    invalidEmail: "ልክ ያልሆነ ኢሜይል አድራሻ",
    passwordRequired: "የሚስጥር ቃል ያስፈልጋል",
    passwordMinLength: "የሚስጥር ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት",
    passwordMinLengthSignup: "የሚስጥር ቃል ቢያንስ 8 ቁምፊዎች መሆን አለበት",
    passwordPattern: "የሚስጥር ቃል ትልቅ፣ ትንሽ ፊደል እና ቁጥር መያዝ አለበት",
    fullNameRequired: "ሙሉ ስም ያስፈልጋል",
    nameMinLength: "ስም ቢያንስ 2 ቁምፊዎች መሆን አለበት",
    confirmPasswordRequired: "እባክዎ የሚስጥር ቃልዎን አረጋግጡ",
    passwordsDoNotMatch: "የሚስጥር ቃሎች አይመሳሰሉም",
    loginSuccess: "በተሳካ ሁኔታ ገባ! በማዛወር ላይ...",
    loginError: "ልክ ያልሆነ ኢሜይል ወይም የሚስጥር ቃል። እባክዎ እንደገና ይሞክሩ።",
    signupSuccess: "መለያ በተሳካ ሁኔታ ተፈጥሯል! እባክዎ ኢሜይልዎን ይመልከቱ።",
    signupError: "መለያ መፍጠር አልተሳካም። እባክዎ እንደገና ይሞክሩ።",

    // Dashboard translations
    dashboard: "ዳሽቦርድ",
    availableServices: "ያሉ አገልግሎቶች",
    myRequests: "የእኔ ጥያቄዎች",
    requestNew: "አዲስ አገልግሎት ጠይቅ",
    trackRequests: "ያሉ ጥያቄዎችን ተከታተል",
    noRequests: "ምንም ጥያቄ አልተገኘም",
    noRequestsDesc: "እስካሁን ምንም የአገልግሎት ጥያቄ አላቀረቡም። ከላይ አገልግሎት በመጠየቅ ይጀምሩ።",
    logout: "ውጣ",
    
    // Services
    residenceLetter: "የመኖሪያ ደብዳቤ",
    idConfirmation: "የመታወቂያ ማረጋገጫ",
    businessLicense: "የንግድ ፈቃድ ማመልከቻ",
    otherServices: "ሌሎች አገልግሎቶች",
    residenceLetterDesc: "የመኖሪያ አድራሻዎን የሚያረጋግጥ ኦፊሴላዊ ደብዳቤ ያግኙ",
    idConfirmationDesc: "ለኦፊሴላዊ ዓላማዎች ማንነትዎን ያረጋግጡ",
    businessLicenseDesc: "አዲስ የንግድ ፈቃድ ያመልክቱ",
    otherServicesDesc: "ተጨማሪ አገልግሎቶች በቅርቡ ይቀርባሉ",
    
    // Request status
    pending: "በመጠባበቅ ላይ",
    approved: "ጸድቋል",
    rejected: "ተቀባይነት አላገኘም",
    inReview: "በግምገማ ላይ",
    requestDate: "የጥያቄ ቀን",
    status: "ሁኔታ",
    serviceType: "የአገልግሎት አይነት",
    viewDetails: "ዝርዝር ይመልከቱ",
    
    // Forms
    submit: "ጥያቄ አቅርብ",
    submitting: "በማቅረብ ላይ...",
    cancel: "ሰርዝ",
    back: "ተመለስ",
    nationalId: "ብሄራዊ መታወቂያ ቁጥር",
    address: "አድራሻ",
    purpose: "የደብዳቤው ዓላማ",
    contactInfo: "የመገናኛ መረጃ",
    phone: "ስልክ ቁጥር",
    enterNationalId: "ብሄራዊ መታወቂያ ቁጥርዎን ያስገቡ",
    enterAddress: "ሙሉ አድራሻዎን ያስገቡ",
    enterPurpose: "ለዚህ ደብዳቤ ዓላማ ያስገቡ",
    enterPhone: "ስልክ ቁጥርዎን ያስገቡ",
    nationalIdRequired: "ብሄራዊ መታወቂያ ያስፈልጋል",
    addressRequired: "አድራሻ ያስፈልጋል",
    purposeRequired: "ዓላማ ያስፈልጋል",
    phoneRequired: "ስልክ ቁጥር ያስፈልጋል",
    invalidPhone: "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ",
    
    // Confirmation
    requestSubmitted: "ጥያቄ በተሳካ ሁኔታ ቀረበ",
    requestSubmittedDesc: "ጥያቄዎ ቀርቦ በሂደት ላይ ነው። ሁኔታውን በማንኛውም ጊዜ መከታተል ይችላሉ።",
    requestId: "የጥያቄ መለያ",
    estimatedTime: "የሚጠበቅ የሂደት ጊዜ",
    businessDays: "3-5 የስራ ቀናት",
    backToDashboard: "ወደ ዳሽቦርድ ተመለስ",
    trackThisRequest: "ይህንን ጥያቄ ተከታተል",
    
    // Request details
    requestDetails: "የጥያቄ ዝርዝር",
    submittedOn: "የቀረበበት ቀን",
    lastUpdated: "መጨረሻ የታደሰበት ቀን",
    comments: "አስተያየቶች",
    noComments: "ምንም አስተያየት የለም",
    approvedInstructions: "ጥያቄዎ ጸድቋል። እባክዎ ሰነድዎን ለመሰብሰብ ቢሮውን ይጎብኙ።",
    pickupLocation: "የመውሰጃ ቦታ: ዋና ቢሮ፣ 2ኛ ፎቅ፣ ክፍል 201",
    officeHours: "የቢሮ ጊዜ: ሰኞ - አርብ፣ 8:00 ጠዋት - 5:00 ከሰዓት",
    bringDocuments: "እባክዎ ብሄራዊ መታወቂያዎን እና ይህንን ማረጋገጫ ይዘው ይምጡ።",
    downloadConfirmation: "ማረጋገጫ አውርድ",
  }
}

const LanguageContext = createContext(undefined)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
