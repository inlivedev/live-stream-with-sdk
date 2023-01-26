// @filename: ./node_modules/@inlivedev/inlive-js-sdk/inlive-js-sdk.d.ts
import {InliveApp,InliveStream,Stream} from './node_modules/@inlivedev/inlive-js-sdk/dist/inlive-js-sdk.js'

/** @type {Stream} */
let stream

/** @type {MediaStream} */
let mediaStream



const app = InliveApp.init({
  apiKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzMjMyMzAzNDkyLCJqdGkiOiJjYjZhNzkwZi0xM2U4LTRhOTItYTAwOS1mYWU4OGY4ODg4YTYiLCJpYXQiOjE2NzQ3MDM0OTMsImlzcyI6ImlubGl2ZSIsImRiaWQiOjYsIlRva2VuVHlwZSI6ImFwaWtleSIsIlVzZXJJRCI6Mn0.7dxYeP4sukD-qbN6uN3rJSVtA4Nva2slOhRfiNoRyeg',
  api:{
    baseUrl:'https://dev-api.inlive.app'
  }
 })


// create stream
async function createStream() {
  try {
    const streamName = document.getElementById('inputStreamName').value;
    let checkName;

    // random the stream name if not type in the input field
    if (streamName.trim().length != '') {
      checkName = streamName;
    } else {
      checkName = Math.random().toString(36).slice(5);
    }

    // request api
      stream = await InliveStream.createStream(app,{name:streamName})
      document.getElementById('createContainer').style.display = 'none';
      document.getElementById('mainContainer').style.display = 'flex';
      document.getElementById(
        'yourStream'
      ).innerHTML = `Stream name : <b>${stream.name}</b>`;

      const localStream = await attachMedia()
      await prepareStream()
      await initStream(localStream)
   

    
    
  } catch (err) {
    console.error(err);
    document.getElementById('mainContainerError').style.display = 'flex';
    document.getElementById(
      'createStreamErrMessage'
    ).innerHTML = `<b>Something wrong!</b> <b style="color:red;">${err}</b>`;
  }
}

// preparing stream
async function prepareStream() {
  try {
    await stream.prepare()

    //styling
    document.getElementById('startStream').style.display = 'none';
    document.getElementById('streamStatus').innerHTML =
      '<b>Preparing stream ...</b>';

    if (resp.code !== 200) {
      throw new Error('Failed to prepare stream session');
    }
  } catch (err) {
    console.error(err);
  }
}

async function attachMedia(){
  const constraints = {
    video: {
      frameRate: 30,
      width: 1200,
      height: 720,
    },
    audio: true,
  };

  const localStream = await InliveStream.media.getUserMedia(constraints);
  const videoEl = document.querySelector('video')
  
  InliveStream.media.attachMediaElement(videoEl,localStream)

  return localStream
}

// init stream
async function initStream(localStream) {
  try {
    
    await stream.init(localStream)

    //styling
    document.getElementById('streamStatus').innerHTML =
      '<b>Streaming is ready!</b>';
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// start stream button
async function startStream() {
  try {
    await stream.live()

    //styling
    document.getElementById('streamStatus').innerHTML =
      '<b>Streaming is ready!</b>';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get stream
async function getStream(slug, options) {
    let element = document.getElementById('getStreamLink');
    const currentURL = window.location.origin;
    let urlLive = new URL(`${currentURL}/live.html?id=${stream.id}`);
    element.value = urlLive;
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
    document.getElementById('streamLink').innerHTML =
      '<p>Link copied to clipboard!</p>';
    document.getElementById(
      'manifestUriLink'
    ).innerHTML = `<p>Link manifest uri : ${stream.manifests.dash}</p>`;
}

// end stream
async function endStream(slug) {
  await stream.end()
}


document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#btnCreate').addEventListener('click',(e)=>createStream())
  document.querySelector('#btnStart').addEventListener('click',(e)=>startStream())
  document.querySelector('#btnEnd').addEventListener('click',(e)=>endStream())
  document.querySelector('#btnGet').addEventListener('click',(e)=>getStream())
})