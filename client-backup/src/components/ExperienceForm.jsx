import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({data, onChange}) => {

    const addExperience = () => {
        const newExperience = {
            position: '',
            company: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false,
        }; 
    
        onChange([...data, newExperience])
    }
    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index);
        onChange(updatedExperience);
    }
    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data];
        updatedExperience[index] = {...updatedExperience[index], [field]: value };
        onChange(updatedExperience);
    };
  return (
    <div className='space-y-6'>
<div className='flex items-center justify-between'>
<div>
    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Proffesional Experience</h3>
<p className='text-sm text-gray-500'>Add your job experience</p>
</div>
<button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
    <Plus className='size-4' />
    Add Experience
</button>
</div>
{data.length === 0 ? (
    <div className='text-center py-8 text-gray-500'>
        <Briefcase className='size-6 mx-auto mb-3 text-gray-300' />
        <p>No experience added yet.</p>
        <p className='text-sm text-gray-500'>Click the button above to add your first experience.</p>
    </div>
) : (
    <div className='space-y-4'>
{data.map((experience, index) => (
    <div key={index} className='border border-gray-200 rounded-lg p-4 space-y-3'>
        <div className='flex items-center justify-between'>
            <h4 className='text-md font-medium text-gray-900'>Experience #{index + 1}</h4>
            <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'><Trash2 className='size-4'/></button>
        </div>
        <div className='grid md:grid-cols-2 gap-3'>
<input type="text" placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' value={experience.company || ""} onChange={(e) => updateExperience(index, 'company', e.target.value)}/>
<input type="text" placeholder='Job title' className='px-3 py-2 text-sm rounded-lg' value={experience.position || ""} onChange={(e) => updateExperience(index, 'position', e.target.value)}/>
<input type="month" className='px-3 py-2 text-sm rounded-lg' value={experience.start_date || ""} onChange={(e) => updateExperience(index, 'start_date', e.target.value)}/>
<input type="month" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' value={experience.end_date || ""} onChange={(e) => updateExperience(index, 'end_date', e.target.value)}/>
        </div>
        <label className='flex items-center gap-2'>
<input type="checkbox" checked={experience.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked ? true : false)} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
            <span className='text-sm text-gray-600'>I currently work here</span>
        </label>
        <div className='space-y-2'>
<div className='flex items-center justify-between'>
    <label className='text-sm font-medium text-gray-700'>Job Description</label>
    <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors rounded-sm disabled:opacity-50'><Sparkles className='w-3 h-3'/>Enhance with AI</button>
</div>
        </div>
        <textarea placeholder='Description of your role and achievements...' className='w-full px-3 py-2 text-sm rounded-lg resize-none' rows={4} value={experience.description || ""} onChange={(e) => updateExperience(index, 'description', e.target.value)}></textarea>
        </div>

))}
    </div>
)}
    </div>
  )
}

export default ExperienceForm