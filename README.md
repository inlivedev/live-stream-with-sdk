# Live Stream App Example!

This is a live stream app HTML starter project based on this [tutorial](https://inlive.app/docs/tutorial/tutorial-app-with-webrtc/). No need to save. While you develop your site, your changes will happen ✨ immediately in the preview window. On the left you'll see the files that make up your site, including HTML, JavaScript, and CSS.
We also use **Tailwind** CSS for styling.
This app is for live streamers to create his/her new stream and go live with it. You could also check the live video on the live.html page!

## What's in this project?

← `README.md`: That's this file, where we tell about our website does and how we built it.

← `index.html`: This is the main web page for streamer site.

← `live.html`: This is the main web page for viewer site when streamer still go on live.

← `style.css`: CSS files add styling. However, we also use Tailwind css on the page.

← `script.js`: Interactivity of the buttons & APIs with Javascript function.

Open each file and check out the comments (in gray).

# How To Use

## Steps for preparing your API Key
1. Open [studio.inlive.app](https://studio.inlive.app/login) on your browser and login with your google account.
2. Go to the integration page.
3. Create an application key. Make sure you copy the key after you create it because you won’t be able to see it again later.


## Steps for streamer (index.html)
### A. Steps input API Key
On this glitch app, you will be required to input your API Key before proceeding further.
1. From preparing API Key above step, paste it into the input field, then hit the `Submit` button.
**Notes**: We're using dynamic API Key value here.
2. If your API Key is correct, it will show the `Create Stream` input & button field.
3. If you don't submit your API Key, it will show a warning text on red color. You couldn't proceed further unless you input your API Key.


### B. Steps creating a new live streaming
1. You need to create a new stream. Type your new stream name on the input field. 
2. Hit the `Create Stream` button.
   It triggers `createStream` function which will send the input field value (number 1) to the create stream API and send a return stream id & slug that we will use for streaming.
   If you haven't type any name on the input field, it will randomize its own name.
3. Hit the `Start Stream` button.
   It triggers `startStream` function which initial `prepareStream`, `initStream`, and `startStreaming` function.
   **Notes**: It will take a while for streaming to start. It will show text `Streaming started!` up the buttons if this step is completed.
   **Notes**: Using dynamic id on the API.
4. After step 3, it means you already go live!

## Steps live streaming video viewer view (live.html)
1. Hit the `Get Stream` button after text `Streaming started!` appears.
   It triggers `getStream` function and return a link to view your own video live streaming (automaticly copied).
2. Paste the link on your browser to view (will be played by shaka player).
**Notes**: For those who would like to use the manifest URI, it will show on the below text.

## Steps to end streaming (index.html)
1. Hit `End Stream` button.
   It triggers `endStream` function and an alert of a text `Streaming ended!` will show if successfully ended.


**_Want a minimal version of this project to build your own website? Check out [Blank Website](https://glitch.com/edit/#!/remix/glitch-blank-website)!_**

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
