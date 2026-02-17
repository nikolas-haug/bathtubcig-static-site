# Decap CMS Setup

The admin folder is now properly configured and will be accessible at `https://yourdomain.com/admin` after deployment.

## What Was Changed

1. **Build Script Updates** (`scripts/build-content.js`):
   - Added `admin` directory to the build process
   - The admin folder is now copied from root to `build/admin` during builds
   - Added admin folder to the watch mode for live development

2. **Decap CMS Configuration** (`admin/config.yml`):
   - Set up collections for Pages, Press, Shows, See/Hear, and Site Settings
   - Configured to use Git Gateway backend (for GitHub authentication)
   - Media uploads will be stored in `assets/images`

## Authentication Setup (Required)

Before you can use Decap CMS on your live site, you need to set up authentication:

### Option 1: Netlify Identity (Recommended if hosting on Netlify)
1. If you're using Netlify, enable Netlify Identity in your site settings
2. Add the Netlify Identity widget to your admin/index.html

### Option 2: GitHub OAuth (For GitHub Pages)
1. Go to your GitHub repository settings
2. Navigate to Developer settings > OAuth Apps > New OAuth App
3. Set the Authorization callback URL to: `https://api.netlify.com/auth/done`
4. You'll need to use a service like [Netlify's Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/) or [Decap CMS GitHub Backend](https://decapcms.org/docs/github-backend/)

### Option 3: Local Development
For local testing without authentication:
1. Uncomment the `local_backend: true` line in `admin/config.yml`
2. Run `npx decap-server` in a separate terminal
3. Access the CMS at `http://localhost:3000/admin`

## Usage

After deploying your changes:

1. Visit `https://yourwebsite.com/admin`
2. Authenticate with your configured backend
3. Edit content directly through the CMS interface
4. Changes will be committed back to your GitHub repository
5. Rebuild and redeploy to see changes on the live site

## Collections Available

- **Pages**: Edit homepage, contact, press, shows, and see-hear pages
- **Press**: Manage press mentions and reviews
- **Shows**: Add and update show dates
- **See/Hear**: Manage media items (Bandcamp, YouTube, etc.)
- **Site Settings**: Update site-wide configuration

## Next Steps

1. Commit and push the updated files to GitHub
2. Set up authentication (see above)
3. Configure your repository settings if needed
4. Test the CMS at `/admin` on your deployed site
