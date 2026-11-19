# OpsPilot

**A Mobile-First Field Operations Management Application**

OpsPilot is a mobile-first field operations application designed to help teams manage tasks, track field visits, record operational activities, and capture field information through a structured mobile workflow.

The project is being developed using Ionic, Angular, TypeScript, and Capacitor as part of a 20-day Ionic Mobile Development training program.

## Project Objectives

- Develop a responsive, mobile-first application.
- Implement structured task and field visit management.
- Build reusable UI components using Ionic and Angular.
- Integrate REST APIs for data communication.
- Implement form validation and reliable data submission.
- Explore native device capabilities through Capacitor.
- Handle unreliable network connectivity and application errors.
- Prepare and test an Android application build.

## Technology Stack

| Technology      | Purpose                                         |
| --------------- | ----------------------------------------------- |
| Ionic Framework | Mobile UI components and application interface  |
| Angular         | Frontend framework and application architecture |
| TypeScript      | Application logic and type safety               |
| HTML5           | Application structure                           |
| SCSS            | Styling and responsive layouts                  |
| Capacitor       | Native Android and iOS integration              |
| Node.js         | JavaScript runtime                              |
| npm             | Package and dependency management               |
| Android Studio  | Android development and testing                 |

## Planned Features

The following features represent the intended application scope. They are not all implemented yet.

### 1. Authentication

- Login and logout functionality.
- Authentication state management.
- Protected application routes.

### 2. Task Management

- Display assigned tasks and field visits.
- View task information and details.
- Track task status.
- Organize operational activities.

### 3. Field Visit Management

- Record field visit information.
- Submit validated visit forms.
- Capture operational notes.
- Handle submission errors.

### 4. Camera Integration

- Capture photographs using the device camera.
- Preview captured images.
- Handle camera permissions.

### 5. Location Integration

- Request device location when required.
- Capture optional visit coordinates.
- Handle location permissions and failures.

### 6. API Integration

- Connect with backend REST APIs.
- Manage asynchronous requests.
- Handle loading, success, and error states.

### 7. Offline and Error Handling

- Handle network connectivity failures.
- Provide appropriate error messages.
- Support safe form resubmission.
- Explore local data persistence.

## Project Structure

The project follows the Ionic Angular standalone application architecture.

```text
OpsPilot/
│
├── e2e/                    # End-to-end testing
│
├── node_modules/           # Installed dependencies
│
├── public/                 # Public static resources
│
├── src/
│   ├── app/                # Angular application components
│   ├── assets/             # Application assets
│   ├── theme/              # Global theme and styling
│   ├── index.html          # Main HTML document
│   └── main.ts             # Application entry point
│
├── angular.json            # Angular configuration
├── capacitor.config.ts     # Capacitor configuration
├── ionic.config.json       # Ionic configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

The structure may evolve as additional features and modules are implemented.

## Prerequisites

Ensure the following tools are installed:

- Node.js
- npm
- Ionic CLI
- Angular-compatible development dependencies
- Android Studio and Android SDK (for Android development)
- Java Development Kit (for Android builds)

Verify the installations:

```bash
node -v
npm -v
ionic --version
java -version
adb --version
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd OpsPilot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
ionic serve
```

The application will generally be available at:

```text
http://localhost:8100
```

The terminal displays the actual local development URL.

## Development Commands

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `ionic serve`        | Start the development server             |
| `npm install`        | Install project dependencies             |
| `npm list --depth=0` | Display installed top-level dependencies |
| `ionic build`        | Build the web application                |
| `ionic info`         | Display Ionic environment information    |
| `npx ng version`     | Display Angular version information      |

## Development Roadmap

OpsPilot is being developed through the following stages:

| Stage      | Focus Area                                                   | Status      |
| ---------- | ------------------------------------------------------------ | ----------- |
| Day 1      | Ionic, Angular, and TypeScript setup                         | In Progress |
| Days 2–5   | UI components, services, navigation, and forms               | Planned     |
| Days 6–10  | API integration, authentication, state, and offline handling | Planned     |
| Days 11–15 | Capacitor and native device capabilities                     | Planned     |
| Days 16–20 | Debugging, testing, Android builds, and capstone integration | Planned     |

## Security Considerations

- Never commit API keys, passwords, access tokens, or signing keys.
- Keep sensitive configuration outside source control.
- Validate user inputs before submission.
- Handle API errors safely.
- Request device permissions only when required.
- Avoid storing unnecessary personal or sensitive information.

## Current Development Status

The initial Ionic Angular standalone project has been generated successfully.

Completed setup activities:

- Node.js and npm installation.
- Ionic CLI installation.
- Ionic Angular project initialization.
- Capacitor integration initialization.
- npm dependency installation.
- Development server startup.
- Initial project structure generation.

Application features are currently under development.

## Learning Resources

- [Ionic Documentation](https://ionicframework.com/docs)
- [Ionic Angular Documentation](https://ionicframework.com/docs/angular/overview)
- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## Project Information

**Project Name:** OpsPilot

**Category:** Mobile Application Development

**Framework:** Ionic Angular

**Language:** TypeScript

**Development Approach:** Mobile-First Development

**Project Duration:** 20-Day Training Program

**Current Phase:** Initial Setup and Fundamentals

---

_OpsPilot is an educational development project focused on building practical Ionic Angular and mobile application development skills._
