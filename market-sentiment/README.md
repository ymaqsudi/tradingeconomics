<div align="center">

# Trading Economics - Market Sentiment

Market Sentiment App – A web-based dashboard that visualizes key economic indicators from the Trading Economics API. Users can explore GDP, Inflation, Unemployment, and Confidence Scores across different countries, view time-series data, and assess overall market sentiment with a custom health score.

</div>

<div align="center"><h4><a href="#-table-of-contents">️Table of Contents</a> • <a href="#about-the-project">About the Project</a> • <a href="#features">Features</a> • <a href="#stack-tech">Stack Tech</a> • <a href="#-setup">️Setup</a> • <a href="#license">License</a></h4></div>

## ️Table of Contents

 <details>
<summary>Open Contents</summary>

- [Trading Economics Market Sentiment](#trading-economics-market-sentiment)
  - [About the Project](#about-the-project)
  - [Features](#features)
  - [️Setup](#setup)
    - [Installation](#installation)
  - [License](#license)
  </details>

## About the Project

This interactive web application leverages the Trading Economics API to provide economic insights for selected countries. Users can explore GDP, Inflation, Unemployment, Consumer Confidence, and Business Confidence through interactive charts and a Market Sentiment Score, which summarizes economic health in a single value.

## Features

1. **World Map Selection**

Click on a country to retrieve its latest economic data.

2. **Dynamic Indicator Tabs**

View different economic metrics such as GDP, Inflation, and Confidence Scores.

3. **Time-Series Visualization**

Displays historical data trends using Chart.js.

4. **Market Sentiment Score**

A calculated economic health rating (0-100) based on key indicators.

5. **Efficient API Calls**

Optimized API usage to stay within the free-tier limits.

## ️Setup

### Installation

To install this project, follow these steps:

1. # Clone the repository

   git clone https://github.com/yourusername/market-sentiment-app.git

2. # Change directory into market-sentiment

   cd market-sentiment

3. # Install dependent packages

   npm install

4. # Create a .env.local file and add your Trading Economics API key:

   NEXT_PUBLIC_TE_API_KEY=your_api_key_here

5. # Start your local environment server
   npm run dev

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

<p align="right"><a href="#readme-top">(Back to top)</a></p>

---

 <div align="center">Built with ❤️ with <a href="https://github.com/luisvent/document_my_project">Document My Project</a></div>
