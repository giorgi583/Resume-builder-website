import React, { useEffect } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, Share2Icon, ChevronLeft, ChevronRight, DownloadIcon, Eye, EyeOff, FileText, FolderIcon, GraduationCap, ShareIcon, Sparkles, User } from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { toast } from 'react-hot-toast'
// components
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ProffesionalSummaryForm from '../components/ProffesionalSummaryForm'
import ColorPicker from '../components/ColorPicker'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
const ResumeBuilder = () => {
const { resumeId } = useParams()
const {token} = useSelector((state) => state.auth)
  const [resumeData, setResumeData] = React.useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    public: false,
    template: 'classic',
    accent_color: '#3B82F6'
  })
  
  const loadExistingResume = async () => {
try {
  const {data} = await api.get(`/api/resumes/get/${resumeId}`, {headers: {Authorization: token}})
  if(data.resume) {
    setResumeData(data.resume)
    document.title = data.resume.title
  }
} catch (error) {
  console.log(error.message)
}
}
  
const [activeSectionIndex, setActiveSectionIndex] = React.useState(0)
const [removeBackground, setRemoveBackground] = React.useState(false)
  const sections = [
{id: 'personal', name: 'Personal info', icon: User},
{id: 'summary', name: 'Summary', icon: FileText},
{id: 'experience', name: 'Experience', icon: Briefcase},
{id: 'education', name: 'Education', icon: GraduationCap},
{id: 'projects', name: 'Projects', icon: FolderIcon},
{id: 'skills', name: 'Skills', icon: Sparkles}
  ]
  const activeSection = sections[activeSectionIndex]
useEffect(() => {
    loadExistingResume()
 
}, [])
const changeResumeVisibility = async () => {
  try {
    const formData = new FormData()
    formData.append('resumeId', resumeId)
    formData.append('resumeData', JSON.stringify({public: !resumeData.public}))
     const {data} = await api.put(`/api/resumes/update/`, formData, {headers: {Authorization: token}})
     setResumeData({...resumeData, public: !resumeData.public })
     toast.success(data.message)
  } catch (error) {
    console.error('error saving resume' + error)
  }
}
const handleShare = () => {
  const frontendURL = window.location.href.split('/app/')[0]
  const resumeURL = `${frontendURL}/view/${resumeId}`
  if(navigator.share) {
    navigator.share({
      url: resumeURL,
      text: 'Check out this resume'
    })
  }
  else {
    alert('Your browser does not support sharing')
  }
}
const downloadResume = () => {
  window.print()
}
const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData)
const imageFile = updatedResumeData.personal_info.image
    // remove image from updatedResumeData
    if(typeof imageFile === 'object' && imageFile !== null) {
      delete updatedResumeData.personal_info.image
     }
    const formData = new FormData()
    formData.append('resumeId', resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    console.log(updatedResumeData)
    removeBackground && formData.append('removeBackground', 'yes')
    if( typeof imageFile === 'object' && imageFile !== null)  formData.append('image', imageFile)
     const {data} = await api.put(`/api/resumes/update/`, formData, {headers: {Authorization: token}})
     setResumeData(data.resume)
     toast.success(data.message)
  } catch (error) {
    console.error('error saving resume' + error)
  }
}
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to dashboard
        </Link>
      </div>
<div className='max-w-7xl mx-auto px-4 pb-8'>
<div className='grid lg:grid-cols-12 gap-8'>
{/* left panel - form */}
<div className='relative lg:col-span-5 rounded-lg overflow-hidden bg-white'>
  <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
{/* progress bar using activeSectionIndex */}
<hr  className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
<hr  className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width: `${activeSectionIndex * 100 / (sections.length-1)}%`}}/>
  
{/* section navigation */}
<div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
<div className='flex items-center gap-2'>
  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({...prev, template}))}/>
  <ColorPicker selectedColor={resumeData.accent_color} onChange={(accent_color) => setResumeData(prev => ({...prev, accent_color}))}/>
</div>
<div className='flex items-center'>
  {activeSectionIndex !== 0 && (<button onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1,0))} disabled={activeSectionIndex === 0} className='flex items-center gap-1 p-3 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 transition-all'><ChevronLeft className='size-4'/>Previous</button>
  )}
  <button onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1,sections.length - 1))} disabled={activeSectionIndex === sections.length - 1} className={`flex items-center gap-1 p-3 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'pointer-events-none opacity-50'}`}><ChevronRight className='size-4'/>Next</button>
</div>
</div>
{/* form content */}
<div className='space-y-6'>
  {activeSection.id === 'personal' && (
    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
  )}
  {activeSection.id === 'summary' && (
    <ProffesionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
  )}
  {activeSection.id === 'experience' && (
    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))} />
  )}
  {activeSection.id === 'education' && (
    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))} />
  )}
  {activeSection.id === 'projects' && (
    <ProjectForm data={resumeData.projects} onChange={(data) => setResumeData(prev => ({...prev, projects: data}))} />
  )}
  {activeSection.id === 'skills' && (
    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))} />
  )}
</div>
<button onClick={()=> {toast.promise(saveResume, {loading: 'Saving...'})}} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
  Save changes
</button>
</div>
</div>
{/* right panel - preview */}
<div className='lg:col-span-7 max-lg:mt-6'>
<div className='relative w-full'> 
  <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
{resumeData.public && (
  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
    <Share2Icon className='size-4' />
    Share
  </button>
)}
<button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
  {resumeData.public ? 
    <Eye className='size-4'/>
   : 
    <EyeOff className='size-4'/>
  }
  {resumeData.public ? 'Public' : 'Private'}
</button>
<button onClick={downloadResume} className='flex items-center p-2 px-6 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
<DownloadIcon className='size-4'/>
download
</button>
  </div>
   </div>
   <ResumePreview data={resumeData} accentColor={resumeData.accent_color} template={resumeData.template} classes={removeBackground ? 'bg-transparent' : ''} />
</div>
</div>
</div>
    </div>
  )
}

export default ResumeBuilder