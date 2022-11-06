import { memo } from 'react'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <div>
      {options.map((opt) => (
        <div className="" key={opt.displayName}>
          <select
            value={selectedOptions[opt.displayName.toLowerCase()]!}
            onChange={(e) =>
              setSelectedOptions((selectedOptions) => ({
                ...selectedOptions,
                [opt.displayName.toLowerCase()]: e.target.value,
              }))
            }
          >
            {opt.values.map((v, i) => {
              return (
                <option key={`${opt.id}-${i}`} value={v.label.toLowerCase()}>
                  {v.label}
                </option>
              )
            })}
          </select>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
