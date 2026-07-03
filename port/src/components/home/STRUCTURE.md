# Webflow Home Page Structure Documentation

## Overview
This document details the HTML structure, component hierarchy, and CSS class patterns extracted from the Webflow template at https://darshans-fabulous-site-2c3476.webflow.io/

**Extraction Date:** Based on task 1.2 execution  
**Purpose:** Guide React component implementation matching Webflow design

---

## Document Structure

### Root Container
```html
<body class="body">
  <div class="page-wrapper">
    <div class="global-styles w-embed"> <!-- Global CSS styles --> </div>
    <main class="main-wrapper">
      <!-- All sections here -->
    </main>
  </div>
</body>
```

**Key Classes:**
- `body` - Base body styling
- `page-wrapper` - Main page container
- `main-wrapper` - Main content wrapper
- `global-styles` - Embedded global CSS utilities

---

## Section 1: Navbar Component

### Component Name: `Navbar` / `NavigationBar`

### DOM Hierarchy
```html
<div class="about-hero_navbar">
  <div class="padding-horizontal padding-medium">
    <div class="navbar w-nav" data-animation="default">
      <div class="padding-horizontal">
        <div class="navbar_overlay"></div>
        <div class="navbar_component">
          <!-- Brand/Logo -->
          <a href="/" class="brand w-nav-brand w--current">
            <div>Portfolio</div>
          </a>
          
          <!-- Navigation Menu -->
          <nav role="navigation" class="navbar_menu w-nav-menu">
            <a href="#" class="navlink w-inline-block">
              <div>Hire me</div>
            </a>
          </nav>
          
          <!-- Mobile Menu Button -->
          <div class="w-nav-button">
            <div class="w-icon-nav-menu"></div>
          </div>
          
          <!-- Right Side Actions -->
          <div class="navbar_right">
            <a href="/contact" class="button hide-mobile-portrait w-inline-block">
              <div class="clip">
                <div class="hover-text">
                  <div class="text-size-xsmall text-style-allcaps">Schedule a call</div>
                </div>
                <div class="hover-text bottom-hover-text">
                  <div class="text-size-xsmall text-style-allcaps">Schedule a call</div>
                </div>
              </div>
            </a>
            
            <!-- Dropdown Menu -->
            <div class="navbar_dropdown w-dropdown">
              <div class="navbar_toggle w-dropdown-toggle">
                <div class="navbar_line navbar-line-top"></div>
                <div class="navbar_line navbar-line-bottom"></div>
              </div>
              <nav class="navbar_dropdown-list w-dropdown-list">
                <div class="navbar_drop-content radius-regular">
                  <div class="navbar_link-wrapper">
                    <!-- Nav Link Items with arrows -->
                    <div class="into-view-1">
                      <a href="/about" class="navbar_link w-inline-block">
                        <div class="heading-style-h5 text-style-allcaps">About</div>
                        <div class="clip">
                          <div class="hover-arrow left">
                            <div class="icon-1x1-tiny w-embed"><!-- SVG arrow --></div>
                          </div>
                          <div class="hover-arrow">
                            <div class="icon-1x1-tiny w-embed"><!-- SVG arrow --></div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <!-- Repeat for Work, Contact, Clone me links -->
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Semantic Elements
- `<nav>` - Navigation menu wrapper
- `<a>` - Links and buttons

### Key CSS Classes
- `about-hero_navbar` - Navbar section container
- `navbar` - Main navbar component
- `w-nav` - Webflow navigation widget
- `navbar_component` - Inner navbar structure
- `brand` / `w-nav-brand` - Logo/brand area
- `navbar_menu` / `w-nav-menu` - Main navigation menu
- `navbar_right` - Right-aligned items
- `navbar_dropdown` / `w-dropdown` - Dropdown menu system
- `navbar_toggle` - Toggle button for dropdown
- `navbar_link` - Individual navigation links
- `button` - CTA button styling
- `hide-mobile-portrait` - Responsive visibility
- `clip` - Clip path for hover effects
- `hover-text` / `bottom-hover-text` - Animated text layers
