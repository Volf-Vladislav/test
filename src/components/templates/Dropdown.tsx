import { useState } from 'react'

interface DropdownProps {
  items: string[]
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  return (
    <div className='dropdown-container'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem || 'Cортировкa'}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className='dropdown-list'>
          {props.items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
