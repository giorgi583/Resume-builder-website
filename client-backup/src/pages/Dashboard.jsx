import { FilePenIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']
  const [allresumes, setAllresumes] = React.useState([])
  const [showcreateresume, setShowcreateresume] = React.useState(false)
  const [showuploadresume, setShowuploadresume] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [resume, setResume] = React.useState(null)
  const [editresumeId, setEditresumeId] = React.useState('')
const navigate = useNavigate()

  const loadAllResumes = async () => {
    setAllresumes(dummyResumeData)
  }
  useEffect(() => {
    loadAllResumes()
  },[])
  const createResume = async (e) => {
    e.preventDefault()
    setShowcreateresume(false)
    navigate(`/app/builder/res123`)
  }
  const uploadResume = async (e) => {
    e.preventDefault()
    setShowuploadresume(false)
    navigate(`/app/builder/res123`)
  }
  const editTitle = async (e) => {
    e.preventDefault()
  }
  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if (confirm) {
      setAllresumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
          welcome, john doe
        </p>
        <div className='flex gap-4'>
<button onClick={()=> setShowcreateresume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
  <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
  <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create resume</p>
</button>
<button onClick={()=> setShowuploadresume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
  <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
  <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload existing</p>
</button>
        </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]'/>
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
{allresumes.map((resume, index) => {
  const basecolor = colors[index % colors.length]
  return (
    <button onClick={() => navigate(`/app/builder/${resume._id}`)} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2  border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background: `linear-gradient(135deg, ${basecolor}10, ${basecolor}40)`, borderColor: basecolor + `40`}}>
<FilePenIcon className='size-7 group-hover:scale-105 transition-all duration-300' style={{color: basecolor}}/>
<p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color: basecolor}}> {resume.title}</p>
    <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color: basecolor + '90'}}>Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>
    <div onClick={e => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
<TrashIcon onClick={()=> deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-color'/>
<PencilIcon onClick={()=> {setEditresumeId(resume._id); setTitle(resume.title); console.log(editresumeId)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-color'/>
    </div>
    </button>
  )
})}
        </div>
        <div className=''>
          {showcreateresume && (
            <form onSubmit={createResume} onClick={()=>setShowcreateresume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
<div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
  <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter Resume title' required className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' />
<button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
<XIcon className='size-7 absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors' onClick={() => {setShowcreateresume(false); setTitle('')}}/>
</div>
            </form>
          )}

          {
            showuploadresume && (
              <form onSubmit={uploadResume} onClick={()=>setShowuploadresume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                  <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
                  <input onChange={(e)=> setTitle(e.target.value)} placeholder='Enter Resume title' value={title} type="text" required className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' />
                  <div>
                    <label htmlFor="resume-input" className='block text-sm text-slate-700'>Select Resume file
                    <input type="file" id='resume-input' accept='.pdf' hidden onChange={e => setResume(e.target.files[0])}/>
                    <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
{resume ? (
  <p className='text-green-700'>{resume.name}</p> ): (
  <> 
  <UploadCloudIcon className='size-14 stroke-1'/>
  <p >Upload resume</p>
   
  </>  
) }

                    </div>
                    </label>
                  </div>
                  <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Upload Resume</button>
                  <XIcon className='size-7 absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors' onClick={() => {setShowuploadresume(false); setTitle('')}}/>
                </div>
              </form>
            )
          }
           {editresumeId && (
            <form onSubmit={editTitle} onClick={()=>setEditresumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
<div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
  <h2 className='text-xl font-bold mb-4'>Edit resume title</h2>
  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter Resume title' required className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' />
<button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
<XIcon className='size-7 absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors' onClick={() => {setEditresumeId(''); setTitle('')}}/>
</div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard