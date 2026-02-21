import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, Loader2, MessageSquare } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface VoiceModalProps {
  onClose: () => void;
}

// Audio Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const VoiceModal: React.FC<VoiceModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error'>('connecting');
  const [transcription, setTranscription] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [history, setHistory] = useState<{role: string, text: string}[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<any>(null); 
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    let mounted = true;
    let currentInputText = '';
    let currentOutputText = '';

    const startSession = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        audioContextRef.current = inputCtx;
        outputContextRef.current = outputCtx;
        const outputNode = outputCtx.createGain();
        outputNode.connect(outputCtx.destination);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          callbacks: {
            onopen: () => {
              if (!mounted) return;
              setStatus('listening');
              const source = inputCtx.createMediaStreamSource(stream);
              const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
              scriptProcessor.onaudioprocess = (e) => {
                 if (!mounted) return;
                 const inputData = e.inputBuffer.getChannelData(0);
                 const pcmBlob = createBlob(inputData);
                 sessionPromise.then(session => {
                    session.sendRealtimeInput({ media: pcmBlob });
                 });
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputCtx.destination);
              sourceRef.current = source;
              processorRef.current = scriptProcessor;
            },
            onmessage: async (msg: LiveServerMessage) => {
              if (!mounted) return;

              if (msg.serverContent?.inputTranscription) {
                 const text = msg.serverContent.inputTranscription.text;
                 currentInputText += text;
                 setTranscription(currentInputText);
              }
              if (msg.serverContent?.outputTranscription) {
                  const text = msg.serverContent.outputTranscription.text;
                  currentOutputText += text;
                  setAiResponse(currentOutputText);
              }

              if (msg.serverContent?.turnComplete) {
                  setHistory(prev => [...prev, {role: 'user', text: currentInputText}, {role: 'model', text: currentOutputText}]);
                  currentInputText = '';
                  currentOutputText = '';
                  setTranscription('');
                  setAiResponse('');
                  setStatus('listening');
              }

              const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audioData) {
                setStatus('speaking');
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const audioBuffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                source.addEventListener('ended', () => {
                    sourcesRef.current.delete(source);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              }

              if (msg.serverContent?.interrupted) {
                 sourcesRef.current.forEach(s => s.stop());
                 sourcesRef.current.clear();
                 nextStartTimeRef.current = 0;
                 setStatus('listening');
                 currentOutputText = '';
                 setAiResponse('');
              }
            },
            onerror: (e) => mounted && setStatus('error'),
          },
          config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: "You are the Hyper Media Voice Link. Conversational, brief, and helpful. You analyze user turns in real-time.",
          }
        });
        sessionRef.current = await sessionPromise;
      } catch (err) {
        if (mounted) setStatus('error');
      }
    };

    startSession();

    return () => {
      mounted = false;
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (processorRef.current) { processorRef.current.disconnect(); processorRef.current.onaudioprocess = null; }
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
      if (outputContextRef.current) outputContextRef.current.close();
      if (sessionRef.current) sessionRef.current.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white p-3 rounded-full bg-white/5 shadow-xl"><X size={32}/></button>

      <div className="flex flex-col items-center space-y-12 w-full max-w-md text-center">
        <h2 className="text-white/40 font-black tracking-[0.4em] uppercase text-xs">Gemini Live Node</h2>
        
        <div className="relative w-56 h-56 flex items-center justify-center">
           {status === 'connecting' && <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />}
           {status === 'listening' && (
             <>
               <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
               <div className="w-40 h-40 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                 <Mic className="w-16 h-16 text-blue-400 drop-shadow-[0_0_10px_#60a5fa]" />
               </div>
             </>
           )}
           {status === 'speaking' && (
             <>
               <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse" />
               <div className="w-40 h-40 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
                  <div className="flex gap-2 items-end h-10">
                     <div className="w-1.5 bg-white animate-bounce h-4 rounded-full" />
                     <div className="w-1.5 bg-white animate-bounce h-10 rounded-full" />
                     <div className="w-1.5 bg-white animate-bounce h-6 rounded-full" />
                  </div>
               </div>
             </>
           )}
        </div>

        <div className="min-h-[200px] w-full bg-black/20 p-4 rounded-3xl border border-white/5 overflow-y-auto no-scrollbar">
          {history.length === 0 && !transcription && !aiResponse && <p className="text-zinc-600 italic text-sm">Say something...</p>}
          <div className="space-y-4">
             {history.slice(-2).map((h, i) => (
               <div key={i} className={`flex flex-col ${h.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <p className={`text-xs px-3 py-2 rounded-2xl ${h.role === 'user' ? 'bg-blue-600/20 text-blue-300' : 'bg-white/5 text-zinc-400'}`}>{h.text}</p>
               </div>
             ))}
             {transcription && <p className="text-white text-lg font-light tracking-tight italic">"{transcription}"</p>}
             {aiResponse && <p className="text-sm text-blue-300 font-medium tracking-wide leading-relaxed animate-pulse">{aiResponse}</p>}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-white/20 text-[10px] font-black tracking-widest uppercase">
         Hyper Media Real-Time Multimodal Stream
      </div>
    </div>
  );
};

export default VoiceModal;