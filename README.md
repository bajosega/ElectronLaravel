# Laravel Portable Application with Electron

This repository contains a Laravel application packaged as a portable desktop application using Electron. This guide provides the steps to set up the development environment, run the application, and generate a build for Windows.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

1. [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
2. [Composer](https://getcomposer.org/download/)

## Getting Started

Follow these steps to clone the repository, install dependencies, and run the application.

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name


### Install PHP Dependencies
composer install
## Install Node.js Dependencies
npm install

### Run the Laravel Application
php -S 127.0.0.1:8000 -t public

###  ejecutar desarrollo con Electron. 
npm start
 
### Build the Application for Windows
npm run build -- --win

