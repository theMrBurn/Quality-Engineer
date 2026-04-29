# Use official Node.js LTS image
FROM node:20-bullseye

# Install system dependencies required by Playwright and your app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm-dev \
    libasound2 \
    libpangocairo-1.0-0 \
    libcups2 \
    libxtst6 \
    libxss1 \
    libgtk-3-0 \
    libdrm2 \
    libxshmfence1 \
    wget \
    ca-certificates \
    git \
    bash-completion \
    curl \
    && rm -rf /var/lib/apt/lists/*
    RUN echo "alias ll='ls -l'" >> /home/node/.bashrc

# Set working directory inside container
WORKDIR /workspace

# Shared browser cache so root-time install is visible to runtime `node` user
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Copy package.json and package-lock.json as root first
COPY package*.json ./

# Install node dependencies and Playwright browsers as root
RUN mkdir -p /ms-playwright \
 && npm install \
 && npx playwright install --with-deps \
 && chmod -R a+rx /ms-playwright

# Copy all source code as root
COPY . .

# Change ownership of workspace to the non-root 'node' user
RUN chown -R node:node /workspace

# Switch to 'node' user for all subsequent commands & runtime
USER node

# Default command: open bash shell (no auto-run tests)
CMD ["bash"]