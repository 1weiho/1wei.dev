import Github from '@/components/svg/github'
import X from '@/components/svg/x'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; {currentYear} Yiwei Ho. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="https://x.com/1weiho"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/1weiho"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
