import { useState, useEffect } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

export const useRecorder = () => {
  const [audioURL, setAudioURL] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState(null)

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) requestRecorder().then(setRecorder, console.error)
      return
    }

    if (isRecording) recorder.startRecording()
    else
      recorder.stopRecording(() => {
        setAudioURL(recorder.toURL())
        recorder.destroy()
        setRecorder(null)
      })
  }, [recorder, isRecording])

  const startRecording = () => setIsRecording(true)

  const stopRecording = () => setIsRecording(false)

  return [audioURL, isRecording, startRecording, stopRecording]
}

const requestRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const recorder = RecordRTC(stream, {
    type: 'audio',
    recorderType: StereoAudioRecorder,
    mimeType: 'audio/wav',
  })

  return recorder
}
