import {
  FloatingPortal,
  useClick,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { ReactNode, useState } from 'react'

type PopoverProps = {
  lable: ReactNode | string
  lableClassName: string | null
  subNode: ReactNode
  subNodeClassName: string
}

function Popover({
  lable,
  lableClassName,
  subNode,
  subNodeClassName
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {lable}
      </button>
      {isOpen && (
        <FloatingPortal>
          <div
            className={subNodeClassName}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {subNode}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export default Popover
