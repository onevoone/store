import type { SearchPropsType } from '@lib/search-props'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'

import { useSearchMeta } from '@lib/search'
import ErrorMessage from './ui/ErrorMessage'

export default function Search({ categories, brands }: SearchPropsType) {
  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected

  const { category, brand } = useSearchMeta(asPath)

  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find((b: Brand) => b.slug === brand)

  const { data, error } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: activeBrand?.id,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20 px-10">
        <div className="col-span-12 order-3 lg:order-none">
          {data ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product: Product) => (
                <ProductCard
                  variant="simple"
                  key={product.path}
                  className="animated fadeIn"
                  product={product}
                  imgProps={{
                    width: 480,
                    height: 480,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rangeMap(12, (i) => (
                <Skeleton key={i}>
                  <div className="w-60 h-60" />
                </Skeleton>
              ))}
            </div>
          )}{' '}
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
