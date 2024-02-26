interface DropdownProps {
  items: string[]
  open: boolean
  selectedItem: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const Dropdown = (props: DropdownProps) => {
  const { items, open, selectedItem, setOpen, setSelectedItem } = props

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    setOpen(false)
  }

  return (
    <div className='dropdownContainer'>
      <div className='dropdownHeader' onClick={() => setOpen(prev => !prev)}>
        {selectedItem || 'Cортировкa'}
        <span className={`arrow ${open ? 'open' : ''}`}>&#9660;</span>
      </div>
      {open && (
        <ul className='dropdownList'>
          {items.map((item, index) => (
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
