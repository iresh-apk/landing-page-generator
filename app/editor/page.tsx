'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from 'react'
import Sidebar from '../components/editor/Sidebar'
import Canvas from '../components/editor/Canvas'
import Toolbar from '../components/editor/Toolbar'
import { Zap, Save, Eye, Download } from 'lucide-react'

export interface PageElement {
  id: string
  type: string
  content: any
  style: any
  position: { x: number; y: number }
}

export default function EditorPage() {
  const [elements, setElements] = useState<PageElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  const addElement = (type: string, content: any) => {
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type,
      content,
      style: getDefaultStyle(type),
      position: { x: 50, y: 50 + elements.length * 60 }
    }
    setElements([...elements, newElement])
  }

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const getDefaultStyle = (type: string) => {
    const defaults: any = {
      heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: '1rem'
      },
      text: {
        fontSize: '1rem',
        color: '#4b5563',
        lineHeight: '1.6',
        marginBottom: '1rem'
      },
      button: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600'
      },
      image: {
        width: '100%',
        maxWidth: '400px',
        borderRadius: '8px'
      },
      form: {
        backgroundColor: '#f9fafb',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }
    }
    return defaults[type] || {}
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Top Navbar */}
        <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold">PageGen Pro</span>
            </div>
            <div className="text-sm text-gray-600">Editor</div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </nav>

        <div className="flex-1 flex">
          {/* Sidebar */}
          <Sidebar onAddElement={addElement} />

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            <Toolbar 
              selectedElement={selectedElement ? elements.find(el => el.id === selectedElement) : null}
              onUpdateElement={(updates) => {
                if (selectedElement) {
                  updateElement(selectedElement, updates)
                }
              }}
            />

            <Canvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}