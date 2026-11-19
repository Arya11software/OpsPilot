# OpsPilot — Day 1 Development Notes

**Training:** 20-Day Ionic Development Intern Training  
**Day:** 01  
**Topic:** Ionic, Angular, and TypeScript Setup  
**Project:** OpsPilot  
**Status:** Development Environment and Starter Application Setup Completed

---

## 1. Day 1 Objective

The objective of Day 1 is to establish the Ionic Angular development environment, create a starter application, run it in a browser, and understand the fundamental structure of an Ionic Angular project.

### Learning Objectives

- Understand Ionic Angular project structure.
- Understand Angular components, templates, and services.
- Learn TypeScript types and interfaces.
- Configure the development environment.
- Create and run an Ionic Angular starter application.
- Document installed development tool versions.

---

## 2. Development Environment

The following development environment has been configured.

### System Information

| Tool                 | Installed Version |
| -------------------- | ----------------- |
| Operating System     | Windows 10        |
| Node.js              | v24.22.1          |
| npm                  | 11.19.1           |
| Ionic CLI            | 7.2.1             |
| Java JDK             | 21.0.9            |
| Android Debug Bridge | 37.0.1            |

### Project Dependencies

The following versions were verified using:

```bash
npm list @ionic/angular @angular/core @angular/cli @capacitor/core
```

| Package               | Installed Version |
| --------------------- | ----------------- |
| @ionic/angular        | 9.0.12            |
| @angular/core         | 22.2.6            |
| @angular/cli          | 22.2.7            |
| @angular/build        | 22.2.7            |
| @capacitor/core       | 8.6.2             |
| @capacitor/app        | 8.1.2             |
| @capacitor/haptics    | 8.0.2             |
| @capacitor/keyboard   | 8.0.6             |
| @capacitor/status-bar | 8.0.4             |

### Development Tools

- Visual Studio Code
- PowerShell
- Android Studio
- Android SDK
- Ionic CLI
- npm

---

## 3. Project Initialization

The project was initialized using the Ionic CLI.

### Project Creation Command

```bash
ionic start OpsPilot blank --type=angular
```

### Project Configuration

| Configuration          | Selection  |
| ---------------------- | ---------- |
| Project Name           | OpsPilot   |
| Framework              | Angular    |
| Template               | Blank      |
| Component Architecture | Standalone |
| Native Runtime         | Capacitor  |

### Dependency Installation

Ionic automatically initialized Capacitor integration and installed the required npm dependencies.

The generated project includes:

- Angular application configuration.
- Ionic configuration.
- Capacitor configuration.
- TypeScript configuration.
- npm dependency management.
- Starter application source files.

---

## 4. Technology Overview

### 4.1 Ionic Framework

Ionic is an open-source UI toolkit used to build cross-platform applications.

It provides reusable interface components and mobile-oriented UI functionality.

In OpsPilot, Ionic will be used for:

- Application layouts.
- Buttons and input fields.
- Navigation interfaces.
- Lists and cards.
- Mobile-responsive screens.

**Installed version:** 9.0.12

### 4.2 Angular

Angular is a frontend application framework used to structure application logic and manage user interfaces.

Important Angular concepts include:

- Components.
- Templates.
- Services.
- Dependency Injection.
- Routing.
- Data Binding.

Angular will manage the application architecture and business logic in OpsPilot.

**Installed version:** 22.2.6

### 4.3 TypeScript

TypeScript is a programming language built on JavaScript that adds static typing.

It supports:

- Type annotations.
- Interfaces.
- Classes.
- Functions.
- Object-oriented programming.
- Compile-time type checking.

Example:

```typescript
interface Task {
  id: number;
  title: string;
  status: string;
}

const task: Task = {
  id: 1,
  title: 'Inspect equipment',
  status: 'Pending',
};
```

The `Task` interface defines the expected structure of a task object.

This approach will help maintain consistent data structures throughout OpsPilot.

### 4.4 Capacitor

Capacitor provides a bridge between web applications and native device functionality.

It will eventually allow OpsPilot to access:

- Camera.
- Geolocation.
- Device storage.
- Native Android functionality.

Capacitor integration was initialized during project creation.

**Installed version:** 8.6.2

---

## 5. Understanding the Project Structure

The generated project follows Angular's standalone component architecture.

| File/Directory        | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `src/`                | Contains application source code.                          |
| `src/app/`            | Contains Angular application components and configuration. |
| `src/assets/`         | Stores static application assets.                          |
| `src/theme/`          | Contains global theme styles.                              |
| `node_modules/`       | Contains installed npm dependencies.                       |
| `angular.json`        | Angular workspace configuration.                           |
| `capacitor.config.ts` | Capacitor configuration.                                   |
| `ionic.config.json`   | Ionic project configuration.                               |
| `package.json`        | Project metadata, dependencies, and scripts.               |
| `package-lock.json`   | Records the dependency tree and package versions.          |
| `tsconfig.json`       | TypeScript compiler configuration.                         |
| `e2e/`                | End-to-end testing resources.                              |

---

## 6. Running the Application

The Ionic development server was started using:

```bash
ionic serve
```

### Development Server

Local development address:

```text
http://localhost:8100
```

### What Happens When Running ionic serve?

1. Ionic starts the local development server.
2. Angular compiles the application.
3. Vite handles the development server and dependency optimization.
4. The browser loads the application.
5. Changes to application source files trigger development updates.

### Server Management

To stop the development server:

```text
Ctrl + C
```

To restart it:

```bash
ionic serve
```

Stopping the server does not delete the project or its installed dependencies.

---

## 7. Important Development Commands

| Command              | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `node -v`            | Check Node.js version.                    |
| `npm -v`             | Check npm version.                        |
| `ionic --version`    | Check Ionic CLI version.                  |
| `ionic start`        | Create a new Ionic application.           |
| `ionic serve`        | Start the development server.             |
| `ionic build`        | Build the application.                    |
| `npm install`        | Install project dependencies.             |
| `npm list --depth=0` | Display installed top-level dependencies. |
| `ionic info`         | Display Ionic environment information.    |
| `npx ng version`     | Display Angular version information.      |
| `adb --version`      | Check Android Debug Bridge installation.  |
| `java -version`      | Check Java installation.                  |

---

## 8. Issues Encountered and Resolutions

### Issue 1: Existing Project Directory

**Problem:** Ionic reported an `EEXIST` error because the project directory already existed.

**Resolution:** The existing empty directory was renamed to `OpsPilot-backup`, and the project was initialized again from the Desktop directory.

### Issue 2: Folder Access Conflict

**Problem:** Windows prevented renaming the project directory because another process was using it.

**Resolution:** IDE windows were closed, and the rename operation was performed from a fresh PowerShell session.

### Issue 3: npm Dependency Installation Appeared Stuck

**Problem:** The Ionic CLI remained at the Capacitor dependency installation step without displaying additional progress.

**Investigation:**

- Checked the Node.js process.
- Verified npm registry connectivity.
- Checked the generated project files.
- Confirmed that the `node_modules` directory existed.
- Executed `npm ping` successfully.

**Resolution:** The project dependencies were installed, and the Ionic development server subsequently started successfully.

---

## 9. Day 1 Learning Resources

### Ionic Framework

[Ionic Angular Beginner Tutorial — YouTube](https://www.youtube.com/results?search_query=Ionic+Angular+beginner+tutorial)

[Official Ionic Angular Documentation](https://ionicframework.com/docs/angular/overview)

### Angular Fundamentals

[Angular Components and Templates — YouTube](https://www.youtube.com/results?search_query=Angular+components+templates+beginner+tutorial)

[Angular Services — YouTube](https://www.youtube.com/results?search_query=Angular+services+dependency+injection+tutorial)

[Official Angular Tutorials](https://angular.dev/tutorials)

### TypeScript Fundamentals

[TypeScript Complete Tutorial — YouTube](https://www.youtube.com/results?search_query=TypeScript+complete+tutorial+for+beginners)

[Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Capacitor

[Capacitor Beginner Tutorial — YouTube](https://www.youtube.com/results?search_query=Ionic+Capacitor+beginner+tutorial)

[Official Capacitor Documentation](https://capacitorjs.com/docs)

---

## 10. Day 1 Completion Checklist

| Task                                         | Status      |
| -------------------------------------------- | ----------- |
| Install Node.js and npm                      | Completed   |
| Install Ionic CLI                            | Completed   |
| Configure Android development tools          | Completed   |
| Create Ionic Angular starter project         | Completed   |
| Select standalone component architecture     | Completed   |
| Initialize Capacitor integration             | Completed   |
| Install project dependencies                 | Completed   |
| Verify Ionic, Angular and Capacitor versions | Completed   |
| Run application using Ionic Serve            | Completed   |
| Understand Ionic project structure           | In Progress |
| Understand Angular components and templates  | Pending     |
| Understand Angular services                  | Pending     |
| Understand TypeScript types and interfaces   | Pending     |
| Complete development notes                   | Completed   |
| Create project README                        | Drafted     |

---

## 11. Key Takeaways

- Ionic provides the UI toolkit for building mobile applications.
- Angular provides the application architecture and component system.
- TypeScript adds static typing to JavaScript.
- Capacitor enables integration with native device capabilities.
- npm manages project dependencies.
- The Ionic CLI simplifies project creation and development.
- The `ionic serve` command starts the local development server.
- Standalone components provide the architecture selected for this project.

---

## 12. Next Steps

The remaining Day 1 learning activities are:

1. Inspect the generated Angular application files.
2. Understand components and templates.
3. Understand Angular services and dependency injection.
4. Practice TypeScript types and interfaces.
5. Complete the final Day 1 learning review.

**Next Training Topic:** Day 2 — Ionic UI Components and Responsive Layouts.
