import * as React from "react";
import type { SVGProps } from "react";
import avatar from "../Assets/AvatarImages/1.png";
import axios from 'axios';
import './avatar.css'
import { AudioRecorder } from 'react-audio-voice-recorder';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import viseme_id_0 from "../Assets/visemes/viseme_id_0.svg";
import viseme_id_1 from "../Assets/visemes/viseme_id_1.svg";
import viseme_id_2 from "../Assets/visemes/viseme_id_2.svg";
import viseme_id_3 from "../Assets/visemes/viseme_id_3.svg";
import viseme_id_4 from "../Assets/visemes/viseme_id_4.svg";
import viseme_id_5 from "../Assets/visemes/viseme_id_5.svg";
import viseme_id_6 from "../Assets/visemes/viseme_id_6.svg";
import viseme_id_7 from "../Assets/visemes/viseme_id_7.svg";
import viseme_id_8 from "../Assets/visemes/viseme_id_8.svg";
import viseme_id_9 from "../Assets/visemes/viseme_id_9.svg";
import viseme_id_10 from "../Assets/visemes/viseme_id_10.svg";
import viseme_id_11 from "../Assets/visemes/viseme_id_11.svg";
import viseme_id_12 from "../Assets/visemes/viseme_id_12.svg";
import viseme_id_13 from "../Assets/visemes/viseme_id_13.svg";
import viseme_id_14 from "../Assets/visemes/viseme_id_14.svg";
import viseme_id_15 from "../Assets/visemes/viseme_id_15.svg";
import viseme_id_16 from "../Assets/visemes/viseme_id_16.svg";
import viseme_id_17 from "../Assets/visemes/viseme_id_17.svg";
import viseme_id_18 from "../Assets/visemes/viseme_id_18.svg";
import viseme_id_19 from "../Assets/visemes/viseme_id_19.svg";
import viseme_id_20 from "../Assets/visemes/viseme_id_20.svg";
import viseme_id_21 from "../Assets/visemes/viseme_id_21.svg";


import  bgAvatar from "../Assets/AvatarImages/1.png"

import {useState} from "react";

import FemaleSpeakers from "../configs/femaleSpeakers";

const config = require("../config.json");

var visemes_arr:Array<sdk.SpeechSynthesisVisemeEventArgs> = [];

function Avatar(props: SVGProps<SVGSVGElement>){

  interface IMap {
    [key : string]:string;
   }

   const visemeMap:IMap={
    0:viseme_id_0,
    1:viseme_id_1,
    2:viseme_id_2,
    3:viseme_id_3,
    4:viseme_id_4,
    5:viseme_id_5,
    6:viseme_id_6,
    7:viseme_id_7,
    8:viseme_id_8,
    9:viseme_id_9,
    10:viseme_id_10,
    11:viseme_id_11,
    12:viseme_id_12,
    13:viseme_id_13,
    14:viseme_id_14,
    15:viseme_id_15,
    16:viseme_id_16,
    17:viseme_id_17,
    18:viseme_id_18,
    19:viseme_id_19,
    20:viseme_id_20,
    21:viseme_id_21
   }

   
   
      // define the states
      const [asrText, setAsrText] = useState<string>("");
      const [imageIndex,setImageIndex] = useState(0);
      const [selectedVoice, setSelectedVoice] = useState<string>("ta-IN-PallaviNeural");
      const [sentence,setSelectedSentence] = useState<string>("");

      const sentences = [
        "சேர்ந்தார்",
       ]

       const renderAsrText = () => {

        asrText.split('').map((char, index) => {
          if (char !== sentences[0].charAt(index)) {
            console.log(char, sentences[0].charAt(index))
           
          }
        })
        return (
          <h1 className="text-4xl" style={{color: 'green', marginTop: '10px', fontSize: '32px'}}>
            {asrText.split('').map((char, index) => (
              <span key={index} style={{color: char !== sentences[0].charAt(index) ? 'red' : 'green', }}>
                {char}
              </span>
            ))}
          </h1>
        );
      //   let highlightedText = "";
      // for (let i = 0; i < asrText.length; i++) {
      //   if (asrText[i] !== sentence[i]) {
      //     highlightedText += `<span style="background-color: red">${asrText[i]}</span>`;
      //   } else {
      //     highlightedText += asrText[i];
      //   }
      // }
      // return <h1 className="text-4xl" style={{color: 'orange', marginTop: '10px', fontSize: '16px'}} dangerouslySetInnerHTML={{__html: highlightedText}} />;
      };

       function synthesizeSpeech(){
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_TOKEN_SPEECH!, process.env.REACT_APP_TOKEN_REGION!);
        const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
    
        const ssml = `<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'> \r\n \
        <voice name='${selectedVoice}'> \r\n \
            <prosody rate='-100%' > \r\n \
                <mstts:viseme type='redlips_front'/> \r\n \
                ${sentence} \r\n \
            </prosody> \r\n \
        </voice> \r\n \
    </speak>`;


            // Subscribes to viseme received event
        speechSynthesizer.visemeReceived = function (s, e) {
          window.console.log("(Viseme), Audio offset: " + e.audioOffset / 10000 + "ms. Viseme ID: " + e.visemeId);

          visemes_arr.push(e);
        }
        speechSynthesizer.speakSsmlAsync(
            ssml,
            result => {
                if (result.errorDetails) {
                    console.error(result.errorDetails);
                } else {
                    console.log(JSON.stringify(result));
                    visemes_arr.forEach(e=>{
                      var duration = (e.audioOffset)/10000;
                      setTimeout(()=>{setImageIndex(e.visemeId);},duration);
                    })
                    
                }
    
                visemes_arr = [];
                speechSynthesizer.close();
            },
            error => {
                console.log(error);
                visemes_arr = [];
                speechSynthesizer.close();
            });
       }

       const handleClick = ()=>{
        // const randomIndex = Math.floor(Math.random()*sentences.length);
        setSelectedSentence(sentences[0]);
        synthesizeSpeech()
        
       }
       const handleVoiceChange= (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedVoice(event.target.value);
       }


       const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

       const addAudioElement = (blob: Blob) => {
         setAudioBlob(blob);
       };
     
      React.useEffect(() => {
        const sendAudioToAPI = async () => {
          if (!audioBlob) {
            console.error('No audio recorded');
            return;
          }
          if (audioBlob){
          const formData = new FormData();
    formData.append('file', audioBlob, 'recorded_audio.webm');
    formData.append('language', 'tamil');
    formData.append('vtt', 'true');

    try {
      const response = await axios.post('https://asr.iitm.ac.in/api/asr/', formData, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response);
      // console.log(response.data);
      setAsrText(response.data.transcript.trim());
    } catch (error) {
      console.error('Error uploading audio:', error);
    }}
        };
        sendAudioToAPI();
      }, [audioBlob]);

  return (
    <div style={{ borderColor: 'black', borderRadius: 10, borderWidth: 2, borderStyle: 'solid', padding: 10}}>
      {/* <div className="options">
    <select value={selectedVoice} onChange={handleVoiceChange}>
     
    {FemaleSpeakers.map((voice) => <option value={voice.value}>{voice.label}</option>)}
    </select>
    </div> */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height="100%"
    className="avatar-container-circle"
    fill="none"
    viewBox="0 0 1000 1000"
    {...props}
  >
   
    <image xlinkHref={bgAvatar} width={1000} height={1000}  transform="scale(1.7)" x={-204} y={-220}/>

          <image
          transform="scale(1)"
        xlinkHref={visemeMap[imageIndex]}
        id="avatar_svg__d"
        width={556}
        height={300}
        x={220}
        y={370}
      />
  </svg>
  <button className="button" onClick={handleClick}>Speak</button>

  <h1 className="text-4xl" style={{color: 'black', marginTop: '10px', fontSize: '32px'}}>{sentences[0]}</h1>
  
  {/* {asrText ? <h1 className="text-4xl" style={{color: 'orange', marginTop: '10px', fontSize: '16px'}}>{asrText}</h1> : ''}
   */}

{asrText ? renderAsrText() : ''}

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
    <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
    </div>
  </div>
);
}
export default Avatar;