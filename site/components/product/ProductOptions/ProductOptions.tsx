import { memo } from 'react'
import s from './ProductOptions.module.css'
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
    <div className="flex flex-col gap-y-5 items-center">
      {options.map((opt) => (
        <select
          key={opt.displayName}
          className={s.select}
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
                {v.label.toUpperCase()}
              </option>
            )
          })}
        </select>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
