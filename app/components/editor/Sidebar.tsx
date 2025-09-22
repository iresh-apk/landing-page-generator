'use client'

import { Type, Image, MousePointer2, Square, Mail } from 'lucide-react'

interface SidebarProps {
  onAddElement: (type: string, content: any) => void
}

const elementTypes = [
  {
    type: 'heading',
    name: 'Heading',
    icon: Type,
    content: { text: 'Your Amazing Heading' }
  },
  {
    type: 'text',
    name: 'Text',
    icon: Type,
    content: { text: 'Add your compelling text here. This is where you can write your message to convert visitors.' }
  },
  {
    type: 'button',
    name: 'Button',
    icon: MousePointer2,
    content: { text: 'Get Started Now', link: '#' }
  },
  {
    type: 'image',
    name: 'Image',
    icon: Image,
    content: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', alt: 'Hero Image' }
  },
  {
    type: 'form',
    name: 'Email Form',
    icon: Mail,
    content: { 
      title: 'Join Our Newsletter',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe'
    }
  },
  {
    type: 'container',
    name: 'Container',
    icon: Square,
    content: { children: [] }
  }
]

export default function Sidebar({ onAddElement }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Elements</h3>

      <div className="space-y-2">
        {elementTypes.map((element) => {
          const Icon = element.icon
          return (
            <button
              key={element.type}
              onClick={() => onAddElement(element.type, element.content)}
              className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-primary-50 hover:border-primary-200 border border-gray-200 rounded-lg transition-colors group"
            >
              <Icon className="h-5 w-5 text-gray-600 group-hover:text-primary-600 mr-3" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                {element.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Templates</h4>
        <div className="space-y-2">
          <button className="w-full p-3 text-left bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors">
            <div className="font-medium text-blue-900">SaaS Hero</div>
            <div className="text-sm text-blue-600">Perfect for software products</div>
          </button>

          <button className="w-full p-3 text-left bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors">
            <div className="font-medium text-green-900">E-commerce</div>
            <div className="text-sm text-green-600">Great for online stores</div>
          </button>

          <button className="w-full p-3 text-left bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors">
            <div className="font-medium text-purple-900">Course Launch</div>
            <div className="text-sm text-purple-600">Ideal for education</div>
          </button>
        </div>
      </div>
    </div>
  )
}