# Admin Panel Guide - Home Services Florida

Welcome to the Admin Panel! This guide will help you manage your website content, media, and integrations without any technical knowledge.

## 📋 Table of Contents

1. [Accessing the Admin Panel](#accessing-the-admin-panel)
2. [Media Upload](#media-upload)
3. [Content Editor](#content-editor)
4. [Gallery Manager](#gallery-manager)
5. [Google Business Profile](#google-business-profile)
6. [Instagram Integration](#instagram-integration)
7. [Contact Submissions](#contact-submissions)

---

## Accessing the Admin Panel

### Step 1: Login
1. Navigate to your website URL
2. Look for the "Admin" link in the navigation menu (only visible if you're logged in as admin)
3. Click "Admin" to access the dashboard

### Step 2: Authentication
- You will be prompted to log in using Manus OAuth
- Only users with admin role can access the admin panel
- Contact the site owner if you need admin access

---

## Media Upload

The Media Upload section allows you to upload images and videos to your website.

### Uploading Images

**Supported formats:** JPEG, PNG, WebP, GIF  
**Maximum size:** 10MB

#### Steps:
1. Navigate to the **Media Upload** section
2. Click on the **"Upload Image"** card
3. Either:
   - Drag and drop an image onto the upload area, OR
   - Click the upload area and select a file from your computer
4. Preview the image
5. Click **"Upload"** to save

**Tips:**
- Use high-quality images for best results
- Recommended dimensions for hero images: 1920x600px
- Compress images before uploading to improve page load speed

### Uploading Videos

**Supported formats:** MP4, WebM, MOV  
**Maximum size:** 100MB

#### Steps:
1. Navigate to the **Media Upload** section
2. Click on the **"Upload Video"** card
3. Either:
   - Drag and drop a video onto the upload area, OR
   - Click the upload area and select a file from your computer
4. Preview the video
5. Click **"Upload"** to save

**Tips:**
- Use MP4 format for best compatibility
- Keep videos under 5 minutes for faster loading
- Test videos on mobile devices before uploading

---

## Content Editor

The Content Editor allows you to update text content on your website in both English and Spanish.

### Editing Content

#### Steps:
1. Navigate to the **Content Editor** section
2. Select the content section you want to edit (e.g., "Hero Section", "Services")
3. Click the **"Edit"** button
4. Update the text in English and Spanish:
   - **Title (English):** Main heading in English
   - **Title (Spanish):** Main heading in Spanish
   - **Description (English):** Detailed text in English (if applicable)
   - **Description (Spanish):** Detailed text in Spanish (if applicable)
5. Click **"Save Changes"** to update

### Available Content Sections

- **Hero Section:** Main banner text and call-to-action
- **Services:** Titles and descriptions for each service
- **Contact Information:** Phone, email, address, and hours
- **About Us:** Company description and mission

**Tips:**
- Keep titles concise (under 60 characters)
- Use descriptions to highlight benefits and features
- Maintain consistent tone across both languages
- Proofread before saving

---

## Gallery Manager

The Gallery Manager displays all uploaded images and videos, allowing you to organize and delete content.

### Viewing Gallery

1. Navigate to the **Gallery Manager** section
2. All uploaded media is displayed in a grid
3. Each item shows:
   - Thumbnail preview
   - Type badge (Image/Video)
   - Title and upload date

### Deleting Media

#### Steps:
1. Find the media item you want to delete
2. Hover over the thumbnail
3. Click the **"Delete"** button
4. Confirm the deletion in the popup
5. The item will be removed immediately

**Warning:** Deleted items cannot be recovered. Make sure you have a backup if needed.

### Gallery Statistics

At the bottom of the Gallery Manager, you'll see:
- **Total items:** Number of all uploaded media
- **Images:** Number of uploaded images
- **Videos:** Number of uploaded videos

---

## Google Business Profile

Integrate your Google Business Profile to display customer reviews and ratings on your website.

### Setup Instructions

1. **Get Your Google Business Access Token:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the **Google My Business API**
   - Create OAuth 2.0 credentials (Service Account)
   - Generate a JSON key file
   - Extract the access token from the key file

2. **Connect Your Google Business Account:**
   - Navigate to **Settings > Google Business Profile**
   - Paste your access token in the **"Google Access Token"** field
   - Enter your **Location Name** (the exact name of your business location)
   - Click **"Connect"** to verify

3. **Sync Reviews:**
   - Once connected, click **"Sync Reviews Now"** to fetch your latest reviews
   - Reviews will be automatically cached and displayed on your website

### Managing Google Reviews

- **Automatic Sync:** Reviews are synced every 6 hours automatically
- **Manual Sync:** Click "Sync Reviews Now" to update immediately
- **Display:** Reviews appear on the homepage in the "Testimonials" section
- **Disconnect:** Click "Disconnect" to remove the integration

**Tips:**
- Ensure your Google Business location name is exact
- Respond to reviews in Google Business to show engagement
- Encourage customers to leave reviews
- Monitor review ratings regularly

---

## Instagram Integration

Display your latest Instagram posts directly on your website.

### Setup Instructions

1. **Get Your Instagram Access Token:**
   - Go to [Facebook Developer Console](https://developers.facebook.com/)
   - Create a new app or select an existing one
   - Set up Instagram Graph API
   - Generate a long-lived access token for your business account
   - Copy the token

2. **Connect Your Instagram Account:**
   - Navigate to **Settings > Instagram**
   - Paste your access token in the **"Instagram Access Token"** field
   - Click **"Connect"** to verify

3. **Sync Posts:**
   - Once connected, click **"Sync Posts Now"** to fetch your latest posts
   - Posts will be automatically cached and displayed on your website

### Managing Instagram Posts

- **Automatic Sync:** Posts are synced every 6 hours automatically
- **Manual Sync:** Click "Sync Posts Now" to update immediately
- **Display:** Posts appear on the homepage in the "Gallery" section
- **Post Types:** Images, videos, and carousels are all supported
- **Disconnect:** Click "Disconnect" to remove the integration

**Tips:**
- Use consistent hashtags for brand recognition
- Post regularly to keep content fresh
- Include captions and descriptions
- Monitor engagement metrics in Instagram Insights
- Link to your website in Instagram bio

---

## Contact Submissions

View and manage contact form submissions from your website visitors.

### Viewing Submissions

1. Navigate to **Contact Submissions**
2. View all incoming messages in a table format
3. Each submission shows:
   - **Name:** Visitor's name
   - **Email:** Contact email address
   - **Phone:** Phone number (if provided)
   - **Message:** The message content
   - **Date:** When the message was received
   - **Status:** New, Read, or Responded

### Managing Submissions

#### Mark as Read:
1. Click on a submission
2. Click **"Mark as Read"** to indicate you've seen it

#### Respond to Submission:
1. Click on a submission
2. Click **"Respond"** to send a reply
3. Enter your response message
4. Click **"Send"** to email the visitor

#### Delete Submission:
1. Click on a submission
2. Click **"Delete"** to remove it
3. Confirm the deletion

**Tips:**
- Respond to inquiries within 24 hours
- Keep responses professional and helpful
- Save important contact information
- Archive important submissions

---

## Best Practices

### Content Management
- **Update regularly:** Keep content fresh and relevant
- **Proofread:** Check spelling and grammar before saving
- **Use keywords:** Include relevant terms for SEO
- **Maintain consistency:** Use the same tone across all content

### Media Management
- **Optimize images:** Compress before uploading
- **Use descriptive names:** Name files clearly
- **Organize regularly:** Delete unused media
- **Backup important files:** Keep copies on your computer

### Integration Management
- **Verify credentials:** Double-check tokens and keys
- **Monitor sync status:** Check for sync errors
- **Update regularly:** Refresh tokens when needed
- **Test functionality:** Verify integrations work correctly

---

## Troubleshooting

### Upload Failed
- **Check file size:** Ensure file is within limits
- **Check file type:** Verify format is supported
- **Check connection:** Ensure stable internet connection
- **Try again:** Attempt upload again

### Integration Not Working
- **Verify token:** Check access token is correct
- **Check permissions:** Ensure token has required permissions
- **Reconnect:** Disconnect and reconnect integration
- **Contact support:** Reach out if issue persists

### Content Not Updating
- **Refresh page:** Clear browser cache and reload
- **Check status:** Verify save was successful
- **Try again:** Attempt update again
- **Contact support:** Reach out if issue persists

---

## Support

For additional help or technical issues:

1. **Check Documentation:** Review this guide again
2. **Contact Support:** Email support@homeservicesflorida.com
3. **Report Issues:** Use the feedback form on the website

---

## Security Tips

- **Never share credentials:** Keep tokens and passwords private
- **Use strong passwords:** Create complex login credentials
- **Logout when done:** Always logout after admin session
- **Monitor access:** Review who has admin access
- **Update regularly:** Keep software and credentials updated

---

**Last Updated:** February 2026  
**Version:** 1.0
