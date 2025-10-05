├── .editorconfig
├── .env.example
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── Untitled-1.php
├── app
    ├── Events
    │   └── MessageSent.php
    ├── Http
    │   ├── Controllers
    │   │   ├── Admin
    │   │   │   ├── AnalyticsController.php
    │   │   │   ├── CmsController.php
    │   │   │   ├── DashboardController.php
    │   │   │   ├── PlanManagementController.php
    │   │   │   ├── ServiceManagementController.php
    │   │   │   └── UserManagementController.php
    │   │   ├── Auth
    │   │   │   ├── AuthenticatedSessionController.php
    │   │   │   ├── ConfirmablePasswordController.php
    │   │   │   ├── EmailVerificationNotificationController.php
    │   │   │   ├── EmailVerificationPromptController.php
    │   │   │   ├── NewPasswordController.php
    │   │   │   ├── PasswordResetLinkController.php
    │   │   │   ├── RegisteredUserController.php
    │   │   │   └── VerifyEmailController.php
    │   │   ├── ChatController.php
    │   │   ├── Controller.php
    │   │   ├── Customer
    │   │   │   ├── SubscriptionController.php
    │   │   │   ├── SupportController.php
    │   │   │   └── TransactionController.php
    │   │   ├── Public
    │   │   │   ├── AboutController.php
    │   │   │   ├── HomeController.php
    │   │   │   └── ServicesController.php
    │   │   ├── Settings
    │   │   │   ├── CardController.php
    │   │   │   ├── PasswordController.php
    │   │   │   └── ProfileController.php
    │   │   └── Vendor
    │   │   │   ├── ConversationController.php
    │   │   │   ├── DashboardController.php
    │   │   │   ├── InstallationRequestController.php
    │   │   │   └── SubmissionController.php
    │   ├── Middleware
    │   │   ├── AdminMiddleware.php
    │   │   ├── CustomerMiddleware.php
    │   │   ├── HandleAppearance.php
    │   │   ├── HandleInertiaRequests.php
    │   │   ├── RedirectByRole.php
    │   │   ├── RoleMiddleware.php
    │   │   └── VendorMiddleware.php
    │   └── Requests
    │   │   ├── Auth
    │   │       └── LoginRequest.php
    │   │   └── Settings
    │   │       └── ProfileUpdateRequest.php
    ├── Models
    │   ├── Cms.php
    │   ├── Conversation.php
    │   ├── CustomerRequest.php
    │   ├── CustomerSubscription.php
    │   ├── CustomerTransaction.php
    │   ├── Message.php
    │   ├── User.php
    │   └── VendorService.php
    └── Providers
    │   ├── AppServiceProvider.php
    │   └── BroadcastServiceProvider.php
├── artisan
├── bootstrap
    ├── app.php
    ├── cache
    │   └── .gitignore
    └── providers.php
├── components.json
├── composer.json
├── composer.lock
├── config
    ├── app.php
    ├── auth.php
    ├── broadcasting.php
    ├── cache.php
    ├── database.php
    ├── filesystems.php
    ├── inertia.php
    ├── logging.php
    ├── mail.php
    ├── queue.php
    ├── services.php
    └── session.php
├── cue-commits 7dcb9f0
├── database
    ├── .gitignore
    ├── factories
    │   ├── CmsFactory.php
    │   ├── ConversationFactory.php
    │   ├── CustomerRequestFactory.php
    │   ├── CustomerSubscriptionFactory.php
    │   ├── CustomerTransactionFactory.php
    │   ├── MessageFactory.php
    │   ├── UserFactory.php
    │   └── VendorServiceFactory.php
    ├── migrations
    │   ├── 0001_01_01_000000_create_users_table.php
    │   ├── 0001_01_01_000001_create_cache_table.php
    │   ├── 0001_01_01_000002_create_jobs_table.php
    │   ├── 2025_08_04_180441_create_vendor_services_table.php
    │   ├── 2025_08_06_155641_create_customer_subscriptions_table.php
    │   ├── 2025_08_10_123527_customer_tranactions.php
    │   ├── 2025_08_12_115101_create_customer_requests_table.php
    │   ├── 2025_08_22_104529_create_cms_table.php
    │   ├── 2025_09_05_184348_create_conversations_table.php
    │   ├── 2025_09_05_184348_create_messages_table.php
    │   └── 2025_09_18_160929_add_phone_location_description_to_customer_requests.php
    └── seeders
    │   ├── CMSSeeder.php
    │   ├── ConversationSeeder.php
    │   ├── CustomerSeeder.php
    │   ├── DatabaseSeeder.php
    │   ├── SubscriptionSeeder.php
    │   ├── TransactionSeeder.php
    │   └── VendorSeeder.php
├── ds.json
├── eslint.config.js
├── package-lock.json
├── package.json
├── phpunit.xml
├── public
    ├── .htaccess
    ├── app-dark.png
    ├── app-light.png
    ├── apple-touch-icon.png
    ├── favicon.ico
    ├── favicon.svg
    ├── index.php
    ├── logo.svg
    ├── preview
    │   ├── og.jpg
    │   └── premium-service-icon.png
    └── robots.txt
├── resources
    ├── css
    │   └── app.css
    ├── js
    │   ├── app.tsx
    │   ├── components
    │   │   ├── about
    │   │   │   ├── default.tsx
    │   │   │   └── default0.tsx
    │   │   ├── admin
    │   │   │   ├── CustomerRequest.tsx
    │   │   │   └── cmsForm.tsx
    │   │   ├── app-content.tsx
    │   │   ├── app-header.tsx
    │   │   ├── app-logo-icon.tsx
    │   │   ├── app-logo.tsx
    │   │   ├── app-shell.tsx
    │   │   ├── app-sidebar-header.tsx
    │   │   ├── app-sidebar.tsx
    │   │   ├── appearance-dropdown.tsx
    │   │   ├── appearance-tabs.tsx
    │   │   ├── breadcrumbs.tsx
    │   │   ├── contact
    │   │   │   └── default.tsx
    │   │   ├── customer
    │   │   │   ├── billings
    │   │   │   │   └── default.tsx
    │   │   │   ├── infoBanner.tsx
    │   │   │   └── transactions
    │   │   │   │   └── default.tsx
    │   │   ├── delete-user.tsx
    │   │   ├── editor
    │   │   │   └── rich-editor.tsx
    │   │   ├── filters
    │   │   │   └── default.tsx
    │   │   ├── footer
    │   │   │   └── default.tsx
    │   │   ├── heading-small.tsx
    │   │   ├── heading.tsx
    │   │   ├── icon.tsx
    │   │   ├── image-upload.tsx
    │   │   ├── input-error.tsx
    │   │   ├── layout
    │   │   │   └── conditionalLayout.tsx
    │   │   ├── logos
    │   │   │   └── github.tsx
    │   │   ├── logout-user.tsx
    │   │   ├── nav-documents.tsx
    │   │   ├── nav-footer.tsx
    │   │   ├── nav-main.tsx
    │   │   ├── nav-projects.tsx
    │   │   ├── nav-secondary.tsx
    │   │   ├── nav-user.tsx
    │   │   ├── navbar
    │   │   │   └── default.tsx
    │   │   ├── overview.tsx
    │   │   ├── plans
    │   │   │   ├── comparison-section.tsx
    │   │   │   └── default.tsx
    │   │   ├── public
    │   │   │   └── vendor
    │   │   │   │   ├── ServiceLocationFetcher.tsx
    │   │   │   │   ├── default.tsx
    │   │   │   │   ├── notfound.tsx
    │   │   │   │   └── skeleton.tsx
    │   │   ├── recent-sales.tsx
    │   │   ├── sections
    │   │   │   ├── features
    │   │   │   │   ├── feature01.tsx
    │   │   │   │   └── feature02.tsx
    │   │   │   └── hero
    │   │   │   │   └── default.tsx
    │   │   ├── shared
    │   │   │   └── locationPicker.tsx
    │   │   ├── team-switcher.tsx
    │   │   ├── text-link.tsx
    │   │   ├── ui
    │   │   │   ├── accordion.tsx
    │   │   │   ├── alert-dialog.tsx
    │   │   │   ├── alert.tsx
    │   │   │   ├── avatar.tsx
    │   │   │   ├── badge.tsx
    │   │   │   ├── banner.tsx
    │   │   │   ├── breadcrumb.tsx
    │   │   │   ├── button.tsx
    │   │   │   ├── calendar.tsx
    │   │   │   ├── card.tsx
    │   │   │   ├── carousel.tsx
    │   │   │   ├── checkbox.tsx
    │   │   │   ├── collapsible.tsx
    │   │   │   ├── command.tsx
    │   │   │   ├── date-picker.tsx
    │   │   │   ├── dialog.tsx
    │   │   │   ├── dropdown-menu.tsx
    │   │   │   ├── glow.tsx
    │   │   │   ├── icon.tsx
    │   │   │   ├── input-error.tsx
    │   │   │   ├── input.tsx
    │   │   │   ├── label.tsx
    │   │   │   ├── mockup.tsx
    │   │   │   ├── navbar.tsx
    │   │   │   ├── navigation-menu.tsx
    │   │   │   ├── navigation.tsx
    │   │   │   ├── placeholder-pattern.tsx
    │   │   │   ├── popover.tsx
    │   │   │   ├── progress.tsx
    │   │   │   ├── screenshot.tsx
    │   │   │   ├── scroll-area.tsx
    │   │   │   ├── section.tsx
    │   │   │   ├── select.tsx
    │   │   │   ├── separator.tsx
    │   │   │   ├── shadcn-io
    │   │   │   │   └── dropzone
    │   │   │   │   │   └── index.tsx
    │   │   │   ├── sheet.tsx
    │   │   │   ├── sidebar.tsx
    │   │   │   ├── skeleton.tsx
    │   │   │   ├── slider.tsx
    │   │   │   ├── sonner.tsx
    │   │   │   ├── switch.tsx
    │   │   │   ├── table.tsx
    │   │   │   ├── tabs.tsx
    │   │   │   ├── text-link.tsx
    │   │   │   ├── textarea.tsx
    │   │   │   ├── toggle-group.tsx
    │   │   │   ├── toggle.tsx
    │   │   │   ├── tooltip.tsx
    │   │   │   └── typography.tsx
    │   │   ├── user-info.tsx
    │   │   ├── user-menu-content.tsx
    │   │   ├── vendor-service-card.tsx
    │   │   └── vendor
    │   │   │   ├── vendor-form-edi.tsx
    │   │   │   ├── vendor-form-edit.tsx
    │   │   │   ├── vendor-form.tsx
    │   │   │   └── vendor-message.tsx
    │   ├── config
    │   │   └── site.tsx
    │   ├── css
    │   │   ├── global.css
    │   │   └── styles
    │   │   │   ├── tiptap.scss
    │   │   │   └── utils.css
    │   ├── data
    │   │   └── pricingTiers.tsx
    │   ├── echo.ts
    │   ├── hooks
    │   │   ├── sidebar-condition-data.tsx
    │   │   ├── use-appearance.tsx
    │   │   ├── use-initials.tsx
    │   │   ├── use-mobile-navigation.ts
    │   │   └── use-mobile.tsx
    │   ├── layouts
    │   │   ├── app-layout.tsx
    │   │   ├── app
    │   │   │   ├── app-header-layout.tsx
    │   │   │   └── app-sidebar-layout.tsx
    │   │   ├── auth-layout.tsx
    │   │   ├── auth
    │   │   │   ├── auth-card-layout.tsx
    │   │   │   ├── auth-simple-layout.tsx
    │   │   │   └── auth-split-layout.tsx
    │   │   ├── dashboard-layout.tsx
    │   │   ├── layout.tsx
    │   │   ├── main.tsx
    │   │   └── settings
    │   │   │   └── layout.tsx
    │   ├── lib
    │   │   └── utils.ts
    │   ├── pages
    │   │   ├── Admin
    │   │   │   ├── Analytics.tsx
    │   │   │   ├── Billing.tsx
    │   │   │   ├── Cms.tsx
    │   │   │   ├── Dashboard.tsx
    │   │   │   ├── Plans.tsx
    │   │   │   ├── Services
    │   │   │   │   ├── Index.tsx
    │   │   │   │   ├── Show.tsx
    │   │   │   │   └── User
    │   │   │   │   │   └── Show.tsx
    │   │   │   ├── Support.tsx
    │   │   │   └── Users
    │   │   │   │   ├── Index.tsx
    │   │   │   │   └── Show.tsx
    │   │   ├── Customer
    │   │   │   ├── ConnectionStatus.tsx
    │   │   │   ├── Dashboard.tsx
    │   │   │   ├── Subscription.tsx
    │   │   │   └── Support.tsx
    │   │   ├── Errors
    │   │   │   ├── NotFound.tsx
    │   │   │   └── ServerError.tsx
    │   │   ├── Public
    │   │   │   ├── About.tsx
    │   │   │   ├── Chat.tsx
    │   │   │   ├── Contact.tsx
    │   │   │   ├── DetailedVendorServices.tsx
    │   │   │   ├── Home.tsx
    │   │   │   ├── Plans.tsx
    │   │   │   └── Services.tsx
    │   │   ├── Vendor
    │   │   │   ├── AssignedConnections.tsx
    │   │   │   ├── Conversations.tsx
    │   │   │   ├── Dashboard.tsx
    │   │   │   ├── InstallationRequests.tsx
    │   │   │   ├── Messages.tsx
    │   │   │   └── Submission.tsx
    │   │   ├── auth
    │   │   │   ├── confirm-password.tsx
    │   │   │   ├── forgot-password.tsx
    │   │   │   ├── login.tsx
    │   │   │   ├── register.tsx
    │   │   │   ├── reset-password.tsx
    │   │   │   └── verify-email.tsx
    │   │   ├── dashboard.tsx
    │   │   └── settings
    │   │   │   ├── appearance.tsx
    │   │   │   ├── password.tsx
    │   │   │   └── profile.tsx
    │   ├── ssr.tsx
    │   └── types
    │   │   ├── chat.d.ts
    │   │   ├── cms-zod.ts
    │   │   ├── cms.d.ts
    │   │   ├── global.d.ts
    │   │   ├── index.d.ts
    │   │   └── vite-env.d.ts
    └── views
    │   └── app.blade.php
├── routes
    ├── auth.php
    ├── channels.php
    ├── console.php
    ├── settings.php
    └── web.php
├── storage
    ├── app
    │   ├── .gitignore
    │   ├── private
    │   │   └── .gitignore
    │   └── public
    │   │   └── .gitignore
    ├── framework
    │   ├── .gitignore
    │   ├── cache
    │   │   ├── .gitignore
    │   │   └── data
    │   │   │   └── .gitignore
    │   ├── sessions
    │   │   └── .gitignore
    │   ├── testing
    │   │   └── .gitignore
    │   └── views
    │   │   └── .gitignore
    └── logs
    │   └── .gitignore
├── tests
    ├── Feature
    │   ├── Auth
    │   │   ├── AuthenticationTest.php
    │   │   ├── EmailVerificationTest.php
    │   │   ├── PasswordConfirmationTest.php
    │   │   ├── PasswordResetTest.php
    │   │   └── RegistrationTest.php
    │   ├── DashboardTest.php
    │   ├── ExampleTest.php
    │   └── Settings
    │   │   ├── PasswordUpdateTest.php
    │   │   └── ProfileUpdateTest.php
    ├── Pest.php
    ├── TestCase.php
    └── Unit
    │   └── ExampleTest.php
├── tsconfig.json
└── vite.config.ts
