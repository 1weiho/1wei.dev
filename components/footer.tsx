import Github from '@/components/svg/github'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex justify-center items-center space-x-4 py-8 text-sm md:text-base">
      <p>1wei.dev © {currentYear}</p>
      <Link
        href="https://github.com/1weiho/1wei.dev"
        target="_blank"
        aria-label="View source on GitHub"
        className="opacity-60 transition-opacity duration-300 hover:opacity-100"
      >
        <Github />
      </Link>
    </div>
  )
}

export default Footer
