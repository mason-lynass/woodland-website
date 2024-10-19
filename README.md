# Woodland Theater

a website for Woodland Theater, a venue and arts space in Seattle, WA. Made by Mason Lynass.

https://www.woodlandtheater.org

## Things to know about using / modifying this website

This website was built using Create React App, which I guess is not the ideal way to build React apps anymore. After you clone this repo, you might need to run 'npm install', then you can run 'npm start' to run everything locally.

This website is hosted on GitHub Pages, inside this GitHub repo.

---

I used a few third-party resources you should be aware of:

- Woodland has a MailerLite email list, set up long before this new website. The Mailing List component is wrapped in a 'MailingList' component, which allows us to add new users to the MailerLite list when users submit their email to the form. The Woodland managers have login info for MailerLite.

- I used Behold to set up an extremely simple API which accesses the content of the Woodland Instagram so that we can display recent posts as a gallery on the home page. With the free tier, we can display the 6 most recent posts, and Behold will update the posts every 24 hours.

- I used Sanity Studio to build a no-frills API to store show data. There's a separate (private) GitHub repo that contains the Sanity API, which you can clone and run on your own device to write to the Woodland events database.

I have the Behold API url, and the Sanity project_id stored as environment variables locally. If you're a person that rents space at Woodland, ask me for these variables if you want to make any changes!

## Repo:

https://github.com/mason-lynass/woodland-website