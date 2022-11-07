import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import { Brand, Category } from '@commerce/types/site'

interface Props {
  categories?: Category[]
  brands?: Brand[]
  products?: Product[]
}

const HomeAllProductsGrid: FC<Props> = ({
  categories,
  brands,
  products = [],
}) => {
  return (
    <div className={s.root}>
      <div className="flex-1">
        <Grid layout="normal">
          {products.map((product) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default HomeAllProductsGrid
