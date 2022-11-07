import s from './ProductInformation.module.css'
import cn from 'clsx'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'

interface ProductInformationProps {
  product: Product
}

const ProductInformation: FC<ProductInformationProps> = ({ product }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)

  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div className={s.root}>
      <h3 className="uppercase">
        <span>{product.name}</span>
      </h3>
      <Text
        className="break-words text-center uppercase"
        html={product.descriptionHtml || product.description}
      />
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <p>{`${price} ${product.price?.currencyCode}`}</p>
      <div>
        {error && <ErrorMessage error={error} className="my-5" />}
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Purchase"
            type="button"
            className={cn(s.button, 'uppercase')}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false ? 'Not Available' : 'Purchase'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductInformation
