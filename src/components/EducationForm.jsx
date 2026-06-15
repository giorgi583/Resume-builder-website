import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {
     const addEducation = () => {
        const newEducation = {
            degree: '',
            institution: '',
            field: '',
            graduation_date: '',
            gpa: '',
        }; 
    
        onChange([...data, newEducation])
    }
    const removeEducation = (index) => {
        const updatedEducation = data.filter((_, i) => i !== index);
        onChange(updatedEducation);
    }
    const updateEducation = (index, field, value) => {
        const updatedEducation = [...data];
        updatedEducation[index] = {...updatedEducation[index], [field]: value };
        onChange(updatedEducation);
    };
  return (
    <div className='space-y-6'>
<div className='flex items-center justify-between'>
<div>
    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
<p className='text-sm text-gray-500'>Add your educational background</p>
</div>
<button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
    <Plus className='size-4' />
    Add Education
</button>
</div>
{data.length === 0 ? (
    <div className='text-center py-8 text-gray-500'>
        <GraduationCap className='size-6 mx-auto mb-3 text-gray-300' />
        <p>No education added yet.</p>
        <p className='text-sm text-gray-500'>Click the button above to add your first education.</p>
    </div>
) : (
    <div className='space-y-4'>
{data.map((education, index) => (
    <div key={index} className='border border-gray-200 rounded-lg p-4 space-y-3'>
        <div className='flex items-center justify-between'>
            <h4 className='text-md font-medium text-gray-900'>Education #{index + 1}</h4>
            <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'><Trash2 className='size-4'/></button>
        </div>
        <div className='grid md:grid-cols-2 gap-3'>
<input type="text" placeholder='Institution Name' className='px-3 py-2 text-sm ' value={education.institution|| ""} onChange={(e) => updateEducation(index, 'institution', e.target.value)}/>
<input type="text" placeholder='Degree (e.g. Bachelors, masters)' className='px-3 py-2 text-sm ' value={education.degree || ""} onChange={(e) => updateEducation(index, 'degree', e.target.value)}/>
<input type="text" placeholder='Field of Study' className='px-3 py-2 text-sm ' value={education.field || ""} onChange={(e) => updateEducation(index, 'field', e.target.value)}/>
<input type="month" className='px-3 py-2 text-sm ' value={education.graduation_date || ""} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)}/>
        </div>
<input type="text" placeholder='GPA (optional)' className='px-3 py-2 text-sm ' value={education.gpa || ""} onChange={(e) => updateEducation(index, 'gpa', e.target.value)}/>
        
    </div>
))}
  </div>     
)}
    </div>
  )
}

export default EducationForm