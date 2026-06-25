import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeft } from 'lucide-react'
const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = React.useState(null) 
const [loading, setLoading] = React.useState(true)
  const loadResume = async () => {
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null))
setLoading(false)
  }
  useEffect(() => {
    loadResume()
    console.log(resumeData);
    
  }, [])
  return resumeData ? (
    <div className='bg-slate-100'>
<div className='max-w-3xl mx-auto py-10'>
  <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white'/>
</div>
    </div>
  ) : (
<div>
  {loading ? <Loader/> : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
      <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 transition-colors text-white px-6 h-9 m-1 rounded-full flex items-center ring-offset-1 ring-1 ring-green-400'>
        <ArrowLeft className='size-4 mr-2'/><span>Go to home page</span>
      </a>
    </div>
  )}
</div>
  )
}

export default Preview