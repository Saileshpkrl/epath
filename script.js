// Global Variables
let currentUser = null
let isLoggedIn = false
const chatMessages = []
let currentChatAgent = "AI Assistant"
let reviewsData = []
let applicationsData = []
let dashboardData = {
  appliedUniversities: 0,
  pendingApplications: 0,
  acceptedApplications: 0,
  profileCompletion: 0,
}

// Sample data for reviews
const sampleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    destination: "Canada",
    rating: 5,
    title: "Excellent Service and Support",
    text: "E Path made my Canadian dream come true! Their guidance was exceptional from university selection to visa approval. The team was always available to answer my questions and provided step-by-step support throughout the entire process.",
    date: new Date("2024-01-15"),
    verified: true,
    avatar: "S",
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    email: "rajesh.s@email.com",
    destination: "USA",
    rating: 5,
    title: "Professional and Reliable",
    text: "The team at E Path is incredibly professional. They helped me get into Stanford with their expert guidance. The visa process was smooth and stress-free thanks to their detailed preparation and support.",
    date: new Date("2024-01-10"),
    verified: true,
    avatar: "R",
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya.p@email.com",
    destination: "Australia",
    rating: 5,
    title: "Amazing Support Throughout",
    text: "Amazing support throughout my journey! From IELTS preparation to university admission, E Path was with me every step. Now I'm living my Australian dream and couldn't be happier with their service.",
    date: new Date("2024-01-05"),
    verified: true,
    avatar: "P",
  },
  {
    id: 4,
    name: "Michael Chen",
    email: "michael.c@email.com",
    destination: "UK",
    rating: 4,
    title: "Great Experience Overall",
    text: "Had a great experience with E Path. The counselors were knowledgeable and helped me choose the right university in the UK. The application process was well-managed and I got my visa approved on the first try.",
    date: new Date("2023-12-28"),
    verified: true,
    avatar: "M",
  },
  {
    id: 5,
    name: "Anita Gurung",
    email: "anita.g@email.com",
    destination: "Canada",
    rating: 5,
    title: "Highly Recommended",
    text: "I highly recommend E Path to anyone looking to study abroad. Their personalized approach and attention to detail made all the difference. Got admission to my dream university with scholarship!",
    date: new Date("2023-12-20"),
    verified: true,
    avatar: "A",
  },
]

// Sample applications data
const sampleApplications = [
  {
    id: 1,
    university: "University of Toronto",
    country: "Canada",
    program: "Computer Science",
    status: "accepted",
    appliedDate: new Date("2024-01-01"),
    lastUpdate: new Date("2024-01-15"),
  },
  {
    id: 2,
    university: "Stanford University",
    country: "USA",
    program: "MBA",
    status: "pending",
    appliedDate: new Date("2024-01-10"),
    lastUpdate: new Date("2024-01-20"),
  },
]

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Show loading screen
  showLoadingScreen()

  // Initialize components
  setTimeout(() => {
    hideLoadingScreen()
    initializeNavigation()
    initializeModals()
    initializeChat()
    initializeReviews()
    initializeCounters()
    initializeScrollEffects()
    initializeFormValidation()

    // Check for saved user session
    checkUserSession()

    // Show periodic review popups
    startReviewPopups()

    console.log("E Path Online Consultancy initialized successfully!")
  }, 3000)
}

// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.style.display = "flex"

    // Animate progress bar
    const progressFill = document.querySelector(".progress-fill")
    if (progressFill) {
      setTimeout(() => {
        progressFill.style.width = "100%"
      }, 500)
    }
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }
}

// Navigation Functions
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navbar = document.getElementById("navbar")

  // Hamburger menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Modal Functions
function initializeModals() {
  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target.id)
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal.show")
      if (openModal) {
        closeModal(openModal.id)
      }
    }
  })
}

function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"

    // Focus management
    const firstFocusable = modal.querySelector("input, button, select, textarea")
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100)
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.style.display = "none"
    }, 300)
    document.body.style.overflow = "auto"
  }
}

function switchModal(fromModalId, toModalId) {
  closeModal(fromModalId)
  setTimeout(() => {
    openModal(toModalId)
  }, 300)
}

// Authentication Functions
function openLogin() {
  openModal("loginModal")
}

function openRegister() {
  openModal("registerModal")
}

function handleLogin(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const email = formData.get("email")
  const password = formData.get("password")

  // Simple validation
  if (!email || !password) {
    showNotification("Please fill in all fields", "error")
    return
  }

  // Simulate login process
  showNotification("Logging in...", "info")

  setTimeout(() => {
    // Simulate successful login
    currentUser = {
      name: email.split("@")[0],
      email: email,
      loginTime: new Date(),
    }

    isLoggedIn = true
    updateAuthUI()
    closeModal("loginModal")
    showNotification("Welcome back! Login successful.", "success")

    // Update dashboard data
    updateDashboardData()
  }, 1500)
}

function handleRegister(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const fullName = formData.get("fullName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const country = formData.get("country")
  const password = formData.get("password")
  const agreeTerms = formData.get("agreeTerms")

  // Validation
  if (!fullName || !email || !phone || !country || !password) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  if (!agreeTerms) {
    showNotification("Please agree to the terms and conditions", "error")
    return
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters long", "error")
    return
  }

  // Simulate registration process
  showNotification("Creating your account...", "info")

  setTimeout(() => {
    // Simulate successful registration
    currentUser = {
      name: fullName,
      email: email,
      phone: phone,
      country: country,
      registrationTime: new Date(),
    }

    isLoggedIn = true
    updateAuthUI()
    closeModal("registerModal")
    showNotification("Account created successfully! Welcome to E Path!", "success")

    // Initialize dashboard data for new user
    initializeDashboardData()

    // Show welcome message in chat
    setTimeout(() => {
      addChatMessage(
        "bot",
        `Welcome to E Path, ${fullName}! I'm here to help you with your study abroad journey. How can I assist you today?`,
      )
    }, 2000)
  }, 2000)
}

function logout() {
  currentUser = null
  isLoggedIn = false
  updateAuthUI()
  showNotification("You have been logged out successfully", "info")

  // Clear dashboard data
  dashboardData = {
    appliedUniversities: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    profileCompletion: 0,
  }
  applicationsData = []
}

function updateAuthUI() {
  const loginBtn = document.getElementById("loginBtn")
  const dashboardBtn = document.getElementById("dashboardBtn")
  const logoutBtn = document.getElementById("logoutBtn")
  const welcomeMessage = document.getElementById("welcomeMessage")

  if (isLoggedIn && currentUser) {
    if (loginBtn) loginBtn.style.display = "none"
    if (dashboardBtn) dashboardBtn.style.display = "inline-flex"
    if (logoutBtn) logoutBtn.style.display = "inline-flex"
    if (welcomeMessage) welcomeMessage.textContent = `Welcome back, ${currentUser.name}!`
  } else {
    if (loginBtn) loginBtn.style.display = "inline-flex"
    if (dashboardBtn) dashboardBtn.style.display = "none"
    if (logoutBtn) logoutBtn.style.display = "none"
    if (welcomeMessage) welcomeMessage.textContent = "Welcome back!"
  }
}

function checkUserSession() {
  // Check if user session exists in localStorage
  const savedUser = localStorage.getItem("epathUser")
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser)
      isLoggedIn = true
      updateAuthUI()
      updateDashboardData()
    } catch (e) {
      localStorage.removeItem("epathUser")
    }
  }
}

// Dashboard Functions
function openDashboard() {
  if (!isLoggedIn) {
    showNotification("Please login to access your dashboard", "warning")
    openLogin()
    return
  }

  updateDashboardContent()
  openModal("dashboardModal")
}

function showDashboardTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".dashboard-tab-content")
  tabContents.forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".dashboard-tab")
  tabs.forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected tab content
  const selectedContent = document.getElementById(tabName + "Tab")
  if (selectedContent) {
    selectedContent.classList.add("active")
  }

  // Add active class to selected tab
  const selectedTab = document.querySelector(`[onclick="showDashboardTab('${tabName}')"]`)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Load tab-specific content
  switch (tabName) {
    case "overview":
      loadOverviewData()
      break
    case "progress":
      loadProgressData()
      break
    case "applications":
      loadApplicationsData()
      break
    case "documents":
      loadDocumentsData()
      break
  }
}

function updateDashboardContent() {
  // Update stats
  document.getElementById("appliedUniversities").textContent = dashboardData.appliedUniversities
  document.getElementById("pendingApplications").textContent = dashboardData.pendingApplications
  document.getElementById("acceptedApplications").textContent = dashboardData.acceptedApplications
  document.getElementById("profileCompletion").textContent = dashboardData.profileCompletion + "%"

  // Load default tab
  showDashboardTab("overview")
}

function loadOverviewData() {
  const activitiesList = document.getElementById("recentActivitiesList")
  if (!activitiesList) return

  const activities = [
    {
      icon: "fas fa-user-plus",
      title: "Account Created",
      description: "Welcome to E Path Online Consultancy",
      time: "2 hours ago",
    },
    {
      icon: "fas fa-file-alt",
      title: "Profile Updated",
      description: "Academic information added",
      time: "1 day ago",
    },
    {
      icon: "fas fa-university",
      title: "University Shortlisted",
      description: "Added 3 universities to wishlist",
      time: "2 days ago",
    },
  ]

  activitiesList.innerHTML = activities
    .map(
      (activity) => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `,
    )
    .join("")
}

function loadProgressData() {
  // Update progress steps based on user data
  const steps = document.querySelectorAll(".progress-step")
  steps.forEach((step, index) => {
    if (index === 0) {
      step.classList.add("completed")
    }
  })
}

function loadApplicationsData() {
  const applicationsList = document.getElementById("applicationsList")
  if (!applicationsList) return

  if (applicationsData.length === 0) {
    applicationsList.innerHTML = `
            <div class="applications-empty">
                <div class="empty-icon">
                    <i class="fas fa-university"></i>
                </div>
                <h3>No Applications Yet</h3>
                <p>Start your journey by applying to universities that match your goals and preferences.</p>
                <button onclick="addNewApplication()" class="btn-primary">
                    <i class="fas fa-plus"></i>
                    Add Your First Application
                </button>
            </div>
        `
  } else {
    applicationsList.innerHTML = applicationsData
      .map(
        (app) => `
            <div class="application-item">
                <div class="application-info">
                    <div class="application-icon">
                        <i class="fas fa-university"></i>
                    </div>
                    <div class="application-details">
                        <h4>${app.university}</h4>
                        <p>${app.program} • ${app.country}</p>
                        <small>Applied: ${app.appliedDate.toLocaleDateString()}</small>
                    </div>
                </div>
                <div class="application-status ${app.status}">
                    ${app.status}
                </div>
            </div>
        `,
      )
      .join("")
  }
}

function loadDocumentsData() {
  // Document checklist is already in HTML, just update based on user progress
  const checkboxes = document.querySelectorAll('#documentsTab input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateProfileCompletion()
    })
  })
}

function addNewApplication() {
  // Show application form or redirect to application process
  showNotification("Application form will be available soon!", "info")

  // For demo purposes, add a sample application
  const newApp = {
    id: applicationsData.length + 1,
    university: "Sample University",
    country: "Canada",
    program: "Computer Science",
    status: "pending",
    appliedDate: new Date(),
    lastUpdate: new Date(),
  }

  applicationsData.push(newApp)
  dashboardData.appliedUniversities++
  dashboardData.pendingApplications++

  updateDashboardContent()
  loadApplicationsData()
  showNotification("New application added successfully!", "success")
}

function updateDashboardData() {
  if (isLoggedIn) {
    // Simulate user data
    dashboardData = {
      appliedUniversities: 2,
      pendingApplications: 1,
      acceptedApplications: 1,
      profileCompletion: 75,
    }
    applicationsData = [...sampleApplications]
  }
}

function initializeDashboardData() {
  dashboardData = {
    appliedUniversities: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    profileCompletion: 25,
  }
  applicationsData = []
}

function updateProfileCompletion() {
  const checkboxes = document.querySelectorAll('#documentsTab input[type="checkbox"]')
  const checkedBoxes = document.querySelectorAll('#documentsTab input[type="checkbox"]:checked')
  const completion = Math.round((checkedBoxes.length / checkboxes.length) * 100)

  dashboardData.profileCompletion = Math.max(25, completion)
  document.getElementById("profileCompletion").textContent = dashboardData.profileCompletion + "%"
}

// Chat Functions
function initializeChat() {
  const chatInput = document.getElementById("chatInput")
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    })

    chatInput.addEventListener("input", function () {
      const charCount = this.value.length
      const charCountElement = document.querySelector(".character-count")
      if (charCountElement) {
        charCountElement.textContent = `${charCount}/500`
      }
    })
  }
}

function openLiveChat() {
  const chatWidget = document.getElementById("chatWidget")
  const chatToggle = document.querySelector(".chat-toggle")

  if (chatWidget && chatToggle) {
    chatWidget.classList.add("show")
    chatToggle.style.display = "none"

    // Focus on input
    const chatInput = document.getElementById("chatInput")
    if (chatInput) {
      setTimeout(() => chatInput.focus(), 300)
    }

    // Hide notification if present
    const notification = document.getElementById("chatNotification")
    if (notification) {
      notification.style.display = "none"
    }
  }
}

function closeLiveChat() {
  const chatWidget = document.getElementById("chatWidget")
  const chatToggle = document.querySelector(".chat-toggle")

  if (chatWidget && chatToggle) {
    chatWidget.classList.remove("show")
    chatToggle.style.display = "flex"
  }
}

function sendMessage() {
  const chatInput = document.getElementById("chatInput")
  if (!chatInput || !chatInput.value.trim()) return

  const message = chatInput.value.trim()
  chatInput.value = ""

  // Update character count
  const charCountElement = document.querySelector(".character-count")
  if (charCountElement) {
    charCountElement.textContent = "0/500"
  }

  // Add user message
  addChatMessage("user", message)

  // Simulate bot response
  setTimeout(
    () => {
      const response = generateBotResponse(message)
      addChatMessage("bot", response)
    },
    1000 + Math.random() * 2000,
  )
}

function addChatMessage(sender, message) {
  const chatMessages = document.getElementById("chatMessages")
  if (!chatMessages) return

  const messageElement = document.createElement("div")
  messageElement.className = `message ${sender}`

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.innerHTML =
    sender === "user" ? (currentUser ? currentUser.name.charAt(0).toUpperCase() : "U") : '<i class="fas fa-robot"></i>'

  const content = document.createElement("div")
  content.className = "message-content"

  const text = document.createElement("div")
  text.className = "message-text"
  text.textContent = message

  const time = document.createElement("div")
  time.className = "message-time"
  time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  content.appendChild(text)
  content.appendChild(time)
  messageElement.appendChild(avatar)
  messageElement.appendChild(content)

  chatMessages.appendChild(messageElement)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight

  // Store message
  chatMessages.push({
    sender: sender,
    message: message,
    timestamp: new Date(),
  })
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Simple keyword-based responses
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return `Hello! Welcome to E Path Online Consultancy. I'm here to help you with your study abroad journey. How can I assist you today?`
  }

  if (message.includes("university") || message.includes("college")) {
    return `We work with over 500 partner universities across 25+ countries. I can help you find the perfect university based on your preferences, budget, and academic goals. Which country are you interested in studying?`
  }

  if (message.includes("visa") || message.includes("immigration")) {
    return `Our visa consultation service has a 97% success rate! We provide complete support including document preparation, interview coaching, and application tracking. Which country's visa are you applying for?`
  }

  if (message.includes("ielts") || message.includes("pte") || message.includes("test")) {
    return `We offer comprehensive test preparation for IELTS and PTE with expert trainers. Our students achieve an average score of 8.2 in IELTS. Would you like to know more about our test preparation programs?`
  }

  if (message.includes("cost") || message.includes("fee") || message.includes("price")) {
    return `Our consultation fees vary based on the services you need. We offer free initial consultation to understand your requirements. Would you like to schedule a free consultation call?`
  }

  if (message.includes("canada")) {
    return `Canada is an excellent choice! We have a 98% visa success rate for Canada with clear pathways to permanent residency. Popular programs include Computer Science, Business, and Engineering. Would you like specific university recommendations?`
  }

  if (message.includes("usa") || message.includes("america")) {
    return `The USA offers world-class education with excellent career prospects. We work with 150+ universities including Ivy League institutions. Average starting salary for graduates is $80K+. What field are you interested in?`
  }

  if (message.includes("australia")) {
    return `Australia offers great lifestyle with work rights during studies. You can work 20 hours per week and there are excellent post-study work opportunities. Which city interests you - Sydney, Melbourne, or Brisbane?`
  }

  if (message.includes("uk") || message.includes("britain")) {
    return `The UK offers shorter course durations and historic universities. Most master's programs are just 1 year. We have partnerships with 70+ UK universities. Are you looking for undergraduate or postgraduate programs?`
  }

  if (message.includes("scholarship") || message.includes("funding")) {
    return `We help students secure scholarships worth up to 100% tuition coverage. Many of our partner universities offer merit-based scholarships. I can help you identify scholarship opportunities based on your profile.`
  }

  if (message.includes("document") || message.includes("paperwork")) {
    return `We provide complete document preparation support including SOP writing, LOR guidance, and transcript evaluation. Our team ensures all documents meet university and visa requirements. What documents do you need help with?`
  }

  if (message.includes("thank")) {
    return `You're welcome! I'm always here to help. Feel free to ask any questions about studying abroad, university applications, or visa processes. Is there anything specific you'd like to know more about?`
  }

  // Default responses
  const defaultResponses = [
    `That's a great question! Let me connect you with one of our expert counselors who can provide detailed information. Would you like to schedule a free consultation?`,
    `I'd be happy to help you with that. Our experienced team has helped over 800 students achieve their study abroad dreams. Can you tell me more about your specific requirements?`,
    `Thank you for your interest in studying abroad! We offer comprehensive support for university selection, applications, visa processing, and test preparation. What aspect would you like to explore first?`,
    `That's an excellent point to consider. Our counselors have extensive experience in international education and can provide personalized guidance. Would you like to speak with a human counselor?`,
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

function requestHumanChat(counselorName) {
  // Update chat agent
  currentChatAgent = counselorName || "Human Counselor"

  const agentName = document.getElementById("currentAgentName")
  const agentAvatar = document.getElementById("currentAgentAvatar")
  const agentStatus = document.getElementById("currentAgentStatus")

  if (agentName) agentName.textContent = currentChatAgent
  if (agentAvatar) agentAvatar.innerHTML = '<i class="fas fa-user-tie"></i>'
  if (agentStatus) agentStatus.innerHTML = '<span class="status-indicator online"></span>Connecting...'

  // Open chat
  openLiveChat()

  // Simulate connection
  setTimeout(() => {
    if (agentStatus) agentStatus.innerHTML = '<span class="status-indicator online"></span>Online & Ready to Help'
    addChatMessage(
      "bot",
      `Hi! This is ${currentChatAgent}. I'm here to provide personalized guidance for your study abroad journey. How can I help you today?`,
    )
  }, 2000)

  showNotification(`Connecting you with ${currentChatAgent}...`, "info")
}

// Review Functions
function initializeReviews() {
  reviewsData = [...sampleReviews]
  updateReviewStats()
}

function openReviewCenter(type = "general", target = null) {
  loadReviewsData()
  openModal("reviewCenterModal")
  showReviewTab("all")
}

function showReviewTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".review-tab-content")
  tabContents.forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".review-tab")
  tabs.forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected tab content
  const selectedContent = document.getElementById(tabName + "ReviewsTab")
  if (selectedContent) {
    selectedContent.classList.add("active")
  }

  // Add active class to selected tab
  const selectedTab = document.querySelector(`[onclick="showReviewTab('${tabName}')"]`)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  if (tabName === "all") {
    loadReviewsData()
  } else if (tabName === "add") {
    initializeRatingInput()
  }
}

function loadReviewsData() {
  const reviewsList = document.getElementById("reviewsList")
  if (!reviewsList) return

  if (reviewsData.length === 0) {
    reviewsList.innerHTML = `
            <div class="empty-reviews">
                <div class="empty-icon">
                    <i class="fas fa-star"></i>
                </div>
                <h3>No Reviews Yet</h3>
                <p>Be the first to share your experience with E Path Online Consultancy!</p>
            </div>
        `
    return
  }

  reviewsList.innerHTML = reviewsData
    .map(
      (review) => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div class="reviewer-details">
                        <h4>${review.name} ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ""}</h4>
                        <p>Studied in ${review.destination}</p>
                        <div class="review-date">
                            <i class="fas fa-calendar"></i>
                            ${review.date.toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStarRating(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <h4>${review.title}</h4>
                <p>${review.text}</p>
            </div>
            <div class="review-tags">
                ${review.verified ? '<span class="review-tag verified">Verified Student</span>' : ""}
                <span class="review-tag">${review.destination}</span>
                <span class="review-tag">${review.rating} Stars</span>
            </div>
        </div>
    `,
    )
    .join("")
}

function generateStarRating(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star ${i <= rating ? "active" : ""}"></i>`
  }
  return stars
}

function initializeRatingInput() {
  const ratingStars = document.querySelectorAll("#ratingInput i")
  const selectedRatingInput = document.getElementById("selectedRating")

  ratingStars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1
      selectedRatingInput.value = rating

      // Update visual feedback
      ratingStars.forEach((s, i) => {
        if (i < rating) {
          s.classList.add("active")
        } else {
          s.classList.remove("active")
        }
      })

      // Add visual feedback to container
      const ratingInput = document.getElementById("ratingInput")
      ratingInput.classList.add("has-rating")
    })

    star.addEventListener("mouseover", () => {
      const rating = index + 1
      ratingStars.forEach((s, i) => {
        if (i < rating) {
          s.style.color = "#fbbf24"
        } else {
          s.style.color = "#d1d5db"
        }
      })
    })
  })

  // Reset on mouse leave
  const ratingInput = document.getElementById("ratingInput")
  ratingInput.addEventListener("mouseleave", () => {
    const currentRating = Number.parseInt(selectedRatingInput.value) || 0
    ratingStars.forEach((s, i) => {
      if (i < currentRating) {
        s.style.color = "#fbbf24"
      } else {
        s.style.color = "#d1d5db"
      }
    })
  })
}

function submitReview(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const reviewData = {
    id: reviewsData.length + 1,
    name: formData.get("reviewerName"),
    email: formData.get("reviewerEmail"),
    destination: formData.get("studyDestination") || "General",
    rating: Number.parseInt(formData.get("rating")),
    title: formData.get("reviewTitle"),
    text: formData.get("reviewText"),
    date: new Date(),
    verified: false,
    avatar: formData.get("reviewerName").charAt(0).toUpperCase(),
  }

  // Validation
  if (!reviewData.name || !reviewData.email || !reviewData.rating || !reviewData.title || !reviewData.text) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  if (reviewData.rating < 1 || reviewData.rating > 5) {
    showNotification("Please select a rating", "error")
    return
  }

  // Add review
  reviewsData.unshift(reviewData)
  updateReviewStats()

  // Reset form
  event.target.reset()
  document.getElementById("selectedRating").value = ""
  document.querySelectorAll("#ratingInput i").forEach((star) => {
    star.classList.remove("active")
  })
  document.getElementById("ratingInput").classList.remove("has-rating")

  // Show success message and switch to reviews tab
  showNotification("Thank you for your review! It has been submitted successfully.", "success")
  setTimeout(() => {
    showReviewTab("all")
  }, 1500)
}

function updateReviewStats() {
  const totalReviews = reviewsData.length
  const averageRating =
    totalReviews > 0 ? (reviewsData.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 0

  // Count ratings by star
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviewsData.forEach((review) => {
    ratingCounts[review.rating]++
  })

  // Update UI
  const totalReviewsElement = document.getElementById("totalReviews")
  const ratingNumberElement = document.querySelector(".rating-number")

  if (totalReviewsElement) totalReviewsElement.textContent = totalReviews
  if (ratingNumberElement) ratingNumberElement.textContent = averageRating

  // Update rating breakdown
  Object.keys(ratingCounts).forEach((rating) => {
    const countElement = document.getElementById(`${["one", "two", "three", "four", "five"][rating - 1]}StarCount`)
    if (countElement) countElement.textContent = ratingCounts[rating]

    const percentage = totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0
    const fillElement = document.querySelector(`.rating-bar:nth-child(${6 - rating}) .fill`)
    if (fillElement) fillElement.style.width = percentage + "%"
  })
}

function startReviewPopups() {
  // Show random review popups every 30 seconds
  setInterval(() => {
    if (reviewsData.length > 0 && Math.random() > 0.7) {
      showReviewPopup()
    }
  }, 30000)
}

function showReviewPopup() {
  if (reviewsData.length === 0) return

  const randomReview = reviewsData[Math.floor(Math.random() * reviewsData.length)]
  const popup = document.getElementById("reviewPopup")

  if (popup) {
    // Update popup content
    const popupStars = popup.querySelector(".popup-stars")
    const popupText = popup.querySelector(".popup-review-text")
    const popupReviewer = popup.querySelector(".popup-reviewer")

    if (popupStars) popupStars.innerHTML = generateStarRating(randomReview.rating)
    if (popupText) popupText.textContent = randomReview.text.substring(0, 100) + "..."
    if (popupReviewer) popupReviewer.textContent = `- ${randomReview.name}`

    // Show popup
    popup.classList.add("show")

    // Auto hide after 8 seconds
    setTimeout(() => {
      closeReviewPopup()
    }, 8000)
  }
}

function closeReviewPopup() {
  const popup = document.getElementById("reviewPopup")
  if (popup) {
    popup.classList.remove("show")
  }
}

// University and Country Modal Functions
function openUniversityModal(universityId) {
  const modal = document.getElementById("universityModal")
  const title = document.getElementById("universityModalTitle")
  const location = document.getElementById("universityModalLocation")
  const content = document.getElementById("universityModalContent")

  // Sample university data
  const universities = {
    harvard: {
      name: "Harvard University",
      location: "Cambridge, Massachusetts, USA",
      description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts.",
      programs: ["Business", "Medicine", "Law", "Engineering", "Liberal Arts"],
      tuition: "$54,002 per year",
      acceptance: "3.4%",
      students: "23,000",
      founded: "1636",
    },
    stanford: {
      name: "Stanford University",
      location: "Stanford, California, USA",
      description: "Stanford University is a private research university in Stanford, California.",
      programs: ["Computer Science", "Engineering", "Business", "Medicine"],
      tuition: "$56,169 per year",
      acceptance: "3.9%",
      students: "17,000",
      founded: "1885",
    },
    // Add more universities as needed
  }

  const university = universities[universityId] || universities.harvard

  if (title) title.textContent = university.name
  if (location) location.textContent = university.location
  if (content) {
    content.innerHTML = `
            <div class="university-details">
                <p>${university.description}</p>
                <div class="university-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <h4>Annual Tuition</h4>
                            <p>${university.tuition}</p>
                        </div>
                        <div class="info-item">
                            <h4>Acceptance Rate</h4>
                            <p>${university.acceptance}</p>
                        </div>
                        <div class="info-item">
                            <h4>Total Students</h4>
                            <p>${university.students}</p>
                        </div>
                        <div class="info-item">
                            <h4>Founded</h4>
                            <p>${university.founded}</p>
                        </div>
                    </div>
                    <div class="programs-section">
                        <h4>Popular Programs</h4>
                        <div class="programs-list">
                            ${university.programs.map((program) => `<span class="program-tag">${program}</span>`).join("")}
                        </div>
                    </div>
                </div>
                <div class="university-actions">
                    <button onclick="requestMoreInfo('${universityId}')" class="btn-primary">
                        <i class="fas fa-info-circle"></i>
                        Request Information
                    </button>
                    <button onclick="scheduleConsultation('${universityId}')" class="btn-secondary">
                        <i class="fas fa-calendar"></i>
                        Schedule Consultation
                    </button>
                </div>
            </div>
        `
  }

  openModal("universityModal")
}

function openCountryModal(countryId) {
  const modal = document.getElementById("countryModal")
  const title = document.getElementById("countryModalTitle")
  const description = document.getElementById("countryModalDescription")
  const content = document.getElementById("countryModalContent")

  // Sample country data
  const countries = {
    usa: {
      name: "United States",
      description: "World-class education with excellent career opportunities",
      universities: "150+",
      students: "200+",
      visaSuccess: "95%",
      avgSalary: "$80,000",
      workRights: "OPT available",
      pathwayToPR: "H1B to Green Card",
    },
    canada: {
      name: "Canada",
      description: "Quality education with clear pathway to permanent residency",
      universities: "100+",
      students: "150+",
      visaSuccess: "98%",
      avgSalary: "$65,000 CAD",
      workRights: "3 years post-graduation",
      pathwayToPR: "Express Entry System",
    },
    // Add more countries as needed
  }

  const country = countries[countryId] || countries.usa

  if (title) title.textContent = country.name
  if (description) description.textContent = country.description
  if (content) {
    content.innerHTML = `
            <div class="country-details">
                <div class="country-stats">
                    <div class="stat-item">
                        <h4>Partner Universities</h4>
                        <p>${country.universities}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Students Placed</h4>
                        <p>${country.students}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Visa Success Rate</h4>
                        <p>${country.visaSuccess}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Average Salary</h4>
                        <p>${country.avgSalary}</p>
                    </div>
                </div>
                <div class="country-benefits">
                    <h4>Key Benefits</h4>
                    <ul>
                        <li><i class="fas fa-check"></i> Work Rights: ${country.workRights}</li>
                        <li><i class="fas fa-check"></i> PR Pathway: ${country.pathwayToPR}</li>
                        <li><i class="fas fa-check"></i> High-quality education system</li>
                        <li><i class="fas fa-check"></i> Multicultural environment</li>
                    </ul>
                </div>
                <div class="country-actions">
                    <button onclick="requestCountryInfo('${countryId}')" class="btn-primary">
                        <i class="fas fa-info-circle"></i>
                        Get Detailed Information
                    </button>
                    <button onclick="scheduleConsultation('${countryId}')" class="btn-secondary">
                        <i class="fas fa-calendar"></i>
                        Free Consultation
                    </button>
                </div>
            </div>
        `
  }

  openModal("countryModal")
}

function requestMoreInfo(id) {
  showNotification("Information request sent! Our team will contact you soon.", "success")
  closeModal("universityModal")
}

function requestCountryInfo(id) {
  showNotification("Country information request sent! Our counselor will contact you soon.", "success")
  closeModal("countryModal")
}

function scheduleConsultation(id) {
  showNotification("Consultation request received! We will contact you to schedule a meeting.", "success")
  closeModal("universityModal")
  closeModal("countryModal")
}

// University Tabs Function
function showUniversities(country) {
  // Hide all university grids
  const grids = document.querySelectorAll(".universities-grid")
  grids.forEach((grid) => {
    grid.classList.remove("active")
  })

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".uni-tab")
  tabs.forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected country's universities
  const selectedGrid = document.getElementById(country + "-unis")
  if (selectedGrid) {
    selectedGrid.classList.add("active")
  }

  // Add active class to selected tab
  const selectedTab = document.querySelector(`[onclick="showUniversities('${country}')"]`)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".counter")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// Scroll Effects
function initializeScrollEffects() {
  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".service-card, .country-card, .university-card, .counselor-card, .testimonial-card, .news-card",
  )

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Form Validation
function initializeFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this)
        }
      })
    })
  })
}

function validateField(field) {
  const value = field.value.trim()
  const type = field.type
  const required = field.hasAttribute("required")
  let isValid = true
  let errorMessage = ""

  // Remove existing validation classes
  field.classList.remove("error", "success")
  const existingError = field.parentNode.querySelector(".form-error")
  if (existingError) {
    existingError.remove()
  }

  // Required field validation
  if (required && !value) {
    isValid = false
    errorMessage = "This field is required"
  }

  // Email validation
  else if (type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
      errorMessage = "Please enter a valid email address"
    }
  }

  // Phone validation
  else if (type === "tel" && value) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
      isValid = false
      errorMessage = "Please enter a valid phone number"
    }
  }

  // Password validation
  else if (type === "password" && value) {
    if (value.length < 6) {
      isValid = false
      errorMessage = "Password must be at least 6 characters long"
    }
  }

  // Apply validation result
  if (!isValid) {
    field.classList.add("error")
    const errorElement = document.createElement("div")
    errorElement.className = "form-error"
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`
    field.parentNode.appendChild(errorElement)
  } else if (value) {
    field.classList.add("success")
  }

  return isValid
}

// Newsletter Subscription
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletterEmail")
  if (!emailInput) return

  const email = emailInput.value.trim()

  if (!email) {
    showNotification("Please enter your email address", "error")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate subscription
  showNotification("Subscribing...", "info")

  setTimeout(() => {
    emailInput.value = ""
    showNotification("Successfully subscribed to our newsletter!", "success")
  }, 1500)
}

// Notification System
function showNotification(message, type = "info") {
  const container = document.getElementById("notificationContainer")
  if (!container) return

  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  const titles = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
  }

  notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${titles[type]}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `

  container.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      closeNotification(notification.querySelector(".notification-close"))
    }
  }, 5000)
}

function closeNotification(button) {
  const notification = button.closest(".notification")
  if (notification) {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }
}

// Utility Functions
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  showNotification("An unexpected error occurred. Please refresh the page.", "error")
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
  showNotification("A network error occurred. Please check your connection.", "error")
})

// Performance Monitoring
function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0]
        console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
        console.log(
          "DOM Content Loaded:",
          perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          "ms",
        )
      }, 0)
    })
  }
}

// Initialize performance monitoring
measurePerformance()

// Service Worker Registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  })
}

// Export functions for global access
window.EPathApp = {
  openModal,
  closeModal,
  switchModal,
  openLogin,
  openRegister,
  openDashboard,
  openLiveChat,
  closeLiveChat,
  openReviewCenter,
  showNotification,
  subscribeNewsletter,
}

console.log("E Path Online Consultancy - Script loaded successfully!")


