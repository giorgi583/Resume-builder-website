import React from 'react'
import {SparkleIcon, SparklesIcon} from 'lucide-react'
const ProffesionalSummaryForm = ({data, onChange, setResumeData}) => {
  return (
    <div className='space-y-4'>
<div className='flex items-center justify-between'>
<div>
    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Proffesional Summary</h3>
<p className='text-sm text-gray-500'>Add summary for your resume here</p>
</div>
<button className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
    <SparkleIcon className='size-4' />
    AI Enhance
</button>
</div>
<div className='mt-6'>
    <textarea
    value={data || ''}
    rows={7}
    onChange={(e) => onChange(e.target.value)}
    placeholder='Write a brief summary about your professional background, skills, and career goals...'
    className='w-full px-4 mt-2 p-3 text-sm border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none'
    />
    <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: keep it concise (3-4 sentences) and focus on your most relevant experiences and skills</p>
</div>
    </div>
  )
}

export default ProffesionalSummaryForm