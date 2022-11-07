import s from './Footer.module.css'
import cn from 'clsx'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className={cn(s.root)}>
      <p className="text-xs">&copy; 2022 onevoone. All rights reserved.</p>
    </footer>
  )
}

export default Footer
