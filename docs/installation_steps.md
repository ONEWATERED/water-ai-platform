# Installation Steps

## 1. Install Homebrew
Open Terminal and paste this command:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, follow any post-installation instructions shown in the terminal.

## 2. Install Node.js via nvm (Node Version Manager)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Close and reopen your terminal, then:
nvm install 20  # Installs Node.js v20 (LTS)
nvm use 20      # Uses Node.js v20
```

## 3. Install PostgreSQL
```bash
brew install postgresql@14
brew services start postgresql@14
```

## 4. Install Redis
```bash
brew install redis
brew services start redis
```

## 5. Verify installations
After completing all installations, verify them with:
```bash
node --version
npm --version
postgres --version
redis-cli ping  # Should return "PONG"
```

## Need Help?
If you encounter any issues during installation, please let me know and I'll help you troubleshoot.
