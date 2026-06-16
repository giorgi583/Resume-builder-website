import { Check, Layout } from 'lucide-react'
import React from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {
    const [open, setOpen] = React.useState(false)
    const templates = [
        {id: 'classic', name: 'Classic', preview: "A clean and traditional layout with a focus on readability and organization"},
        {id: 'modern', name: 'Modern', preview: "A contemporary design with a modern aesthetic. It uses clean lines and ample whitespace to create a visually appealing layout."},
        {id: 'minimal', name: 'Minimal', preview: "A sleek and minimalist design that emphasizes simplicity and elegance. It uses a monochromatic color scheme and minimalistic icons to create a sophisticated look."},
        {id: 'minimal-image', name: 'Minimal image', preview: "A minimal design that incorporates a subtle image element to add visual interest without overwhelming the content."},
    ]
  return (
    <div className='relative'>
<button onClick={()=> setOpen(!open)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'><Layout size={14}/> <span className='max-sm:hidden'>Template</span></button> 
    {open && (
        <div className='absolute top-full space-y-3 mt-2 p-3 w-xs bg-white border border-gray-200 rounded-md shadow-sm z-10'>
            {templates.map((template) => (
                <div
                    key={template.id}
                    onClick={() => {
                        onChange(template.id);
                        setOpen(false);
                    }}
                    className={`relative p-3 border rounded-md cursor-pointer transition-all  ${selectedTemplate === template.id ? 'bg-blue-100 border-blue-400' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'}`}
                >
                    {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2">
                            <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                        </div>
                    )}
                    <div className='space-y-1'>
                        <h4 className='font-medium text-gray-800'>{template.name}</h4>
                        <div className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
                    </div>
                </div>
            ))}
        </div>
    )}
    </div>
  )
}

export default TemplateSelector