# scorecard-web
This repository has the code for scorecard website.

# About 
The website is dedicated to the Community Wildfire Resilience scorecard (published on the United Nations Prevention Web), designed to help communities enhance their ability to assess risk and prepare for, manage, and recover from wildfires. The website provides detailed information on a scorecard, why it is essential, and how to use it. 

Moreover, it also highlights the partnership between Catastrophic Wildfire Prevention Consortium (CWPC), CrowdDoing, and ARISE-US. You can also find multiple ways to volunteer, contact, or subscribe on the website.

## Installation

### Run Locally
Assuming you have Node.js and npm installed, run the following commands. 

1. The following need to be installed (if you haven't)
```bash
npm install npm@latest -g; 
npm ci
```

2. Create a file in the root directory i.e src/main/.env
- ask for a teammate for the file because it contains environment-specific config and secrets. 

3. In the index.js file
- Uncomment lines related to 'PORT' on local, make sure to comment them when pushing code on the 'main' branch.

## Contributing

1. Create pull requests for pushing any changes you have. 
2. Add a teammate for review.
3. if approved, squash and merge changes
