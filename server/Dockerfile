# Use the official Ubuntu base image
FROM ubuntu:22.04

# Install essential dependencies for mediasoup
RUN set -x \
    && apt-get update \
    && apt-get install --yes --no-install-recommends \
    clang \
    g++ \
    gcc \
    make \
    pkg-config \
    curl \
    ca-certificates \
    gnupg \
    libssl-dev \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN set -x \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && NODE_MAJOR=20 \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install --yes --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Enable core dumps
RUN set -x \
    && echo "mkdir -p /tmp/cores && chmod 777 /tmp/cores && echo \"/tmp/cores/core.%e.sig%s.%p\" > /proc/sys/kernel/core_pattern && ulimit -c unlimited" >> ~/.bashrc

# Set environment variables for mediasoup
ENV LANG="C.UTF-8"
ENV CC="clang"
ENV CXX="clang++"
ENV MEDIASOUP_LOCAL_DEV="true"
ENV KEEP_BUILD_ARTIFACTS="1"

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install project dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]