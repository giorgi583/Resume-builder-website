import { Check, Palette } from 'lucide-react'
import React from 'react'

const ColorPicker = ({selectedColor, onChange}) => {
    const [open, setOpen] = React.useState(false)
    const colors = [
        {name: 'Blue', value: '#3b82f6'},
        {name: 'Green', value: '#10b981'},
        {name: 'Red', value: '#ef4444'},
        {name: 'Yellow', value: '#f5ca0b'},
        {name: 'Orange', value: '#f97316'},
        {name: 'Purple', value: '#8b5cf6'},
        {name: 'Pink', value: '#ec4899'},
        {name: 'Teal', value: '#14b8a6'},
        {name: 'Indigo', value: '#6366f1'},
        {name: 'Gray', value: '#6b7280'},
        {name: 'Black', value: '#111827'}
    ]
  return (
    <div className='relative'>
<button onClick={()=> setOpen(prev => !prev)} className='flex items-center gap-2 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'><Palette size={14}/> <span max-sm:hidden>Accent</span></button>
{open && (
    <div className='absolute top-full mt-2 grid grid-cols-4 p-3 w-60 bg-white border border-gray-200 rounded-md shadow-sm z-10'>
        {colors.map((color) => (
            <div key={color.value} className='flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 rounded-md' onClick={()=> {setOpen(false); onChange(color.value)}}>
                <div className='w-12 h-12 rounded-full flex items-center justify-center' style={{background: color.value}}>{selectedColor === color.value && <Check size={16} color='white'/>}</div>
                <span className='text-xs text-center text-gray-600 '>{color.name}</span>
            </div>
        ))}
    </div>
 )}
    </div>
  )
}

export default ColorPicker