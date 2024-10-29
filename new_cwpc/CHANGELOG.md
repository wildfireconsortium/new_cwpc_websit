#  Changelog


## Version 1.0.0 - 2024-01-05

_Intial release._

### Features
- Core website functionalities 
- Forms - Contact, Subscribe, Support, Download the scorecard
- Responsive design for optimal viewing on different devices

### Known Issues
- Submit pages after forms are not in line with the theme.
- Download the scorecard functionality, 'file does not exist' error.
- Page load time

### Enhancements [Planned for future releases]
- Forms - Collaborate with us, Pilot feedback
- Search functionality 
- Modal/pop-up forms

### Deployment Changes:

Key Updates:

- Environment File: Moved from config/env.js to .env.
- dotenv Package: Install using npm install dotenv.
- .gitignore: Add .env to prevent accidental sharing.
- Import Changes: Replace require('../../config/env'); with:
```
const dotenv = require('dotenv');
dotenv.config();
```

- Environment Variables: Access using process.env.Key.
- CI/CD Warning: Pushing code with require('../../config/env'); will break the website.
- Form Updates: Necessary changes have been made to existing forms.
- MongoDB Driver: connectionOptions removed from mongodb_repository.js due to deprecation in the newer driver version.
 
