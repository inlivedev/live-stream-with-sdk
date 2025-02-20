// @filename: ./node_modules/@inlivedev/inlive-js-sdk/inlive-js-sdk.d.ts
import {InliveApp,InliveStream,Stream} from './node_modules/@inlivedev/inlive-js-sdk/dist/inlive-js-sdk.js'

/** @type {Stream} */
let stream

/** @type {MediaStream} */
let mediaStream



const app = InliveApp.init({
  apiKey:'<YOUR_API_KEY>'
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
      const btnCreate = document.querySelector('#btnCreate')
      btnCreate.disabled = true
      const status = document.getElementById('streamStatus')
      status.innerHTML =
      `<b>Creating live stream... please wait!</b>`;

      stream = await InliveStream.createStream(app,{name:streamName})

      btnCreate.disabled = false

      document.getElementById('createContainer').style.display = 'none';
      document.getElementById('mainContainer').style.display = 'flex';
      document.getElementById(
        'yourStream'
      ).innerHTML = `Stream name : <b>${streamName}</b>`;

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
    //styling
    document.getElementById('streamStatus').innerHTML =
      '<b>Preparing stream ...</b>';
    
      await stream.prepare()

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

  const media = await InliveStream.media.getUserMedia(constraints);
  const videoEl = document.querySelector('video')
  media.attachTo(videoEl)

  return media.stream
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
    const status = document.getElementById('streamStatus')
    status.innerHTML =
    `<b>Going live... please wait!</b>`;
    const btnStart=document.getElementById('btnStart')
    btnStart.disabled = true
    await stream.live()

    //styling
    
    btnStart.style.display = 'none';
    document.getElementById('btnEnd').style.display = 'block';
    status.innerHTML =
      `<b>Streaming is live! <a href="/live.html?id=${stream.id}" target="_blank">Click here to watch</a> </b>`;
    document.getElementById(
        'manifestUriLink'
      ).innerHTML = `<p>Dash manifest uri : ${stream.manifests.dash}</p> <p>HLS manifest uri : ${stream.manifests.hls}</p>`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get stream
async function getStream(streamId) {
    return await InliveStream.getStream(app,streamId)
}

// end stream
async function endStream(slug) {
  const status = document.getElementById('streamStatus')
  
  status.innerHTML =`<b>Stoping live stream...</b>`;
  await stream.end()
  status.innerHTML =`<b>Live stream stop! Reload the page to go live again.</b>`
  document.getElementById('btnEnd').style.display = 'none'
  document.getElementById(
    'manifestUriLink'
  ).style.display = 'none'
}

export {createStream, getStream, endStream, startStream,Stream}