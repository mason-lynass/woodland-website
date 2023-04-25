### Woodland Theater

a website for Woodland Theater, a venue and arts space in Seattle, WA. Made by Mason Lynass.

## Things to know about using / modifying this website

This website was built using Create React App, which I guess is not the ideal way to build React apps anymore. After you clone this repo, you might need to run 'npm install', then you can run 'npm start' to run everything locally.

This website is hosted on GitHub Pages, inside this GitHub repo. GitHub Pages doesn't really like hosting single-page React apps, and won't let you link to subdomains like "/events" or "/about". I might try to figure out a workaround for that, but just know that for now.

---

I used a few third-party resources you should be aware of:

- Woodland has a Mailchimp email list, set up long before this new website. The Mailing List component is wrapped in a 'Mailchimp-Subscribe' component, which allows us to add new users to the Mailchimp list when users submit their email to the form. Lucas has login info for Mailchimp.

- I used Behold to set up an extremely simple API which accesses the content of the Woodland Instagram so that we can display recent posts as a gallery on the home page. With the free tier, we can display the 6 most recent posts, and Behold will update the posts every 24 hours.

- I used Sanity Studio to build a no-frills API to store show data. There's a separate (private) GitHub repo that contains the Sanity API, which you can clone and run on your own device to write to the Woodland events database.

I have the Mailchimp email address POST url & API key, the Behold API url, and the Sanity project_id stored as environment variables locally. Ask me for these variables if you want to make any changes!