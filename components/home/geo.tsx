import Earth from './earth'
import UTC8Clock from '@/components/utc-8-clock'
import Balancer from 'react-wrap-balancer'

const Geo = () => {
  return (
    <div className="flex flex-col md:mt-28 md:flex-row md:space-x-12 justify-center items-center py-32 md:py-40">
      <UTC8Clock className="md:hidden" />
      <Earth />
      <div className="max-w-[500px] text-center md:text-start mt-8 md:mt-0">
        <Balancer>
          If you don’t know where Taiwan is, here’s a little reference for you,
          I live here :)
        </Balancer>

        <UTC8Clock className="mt-6 hidden md:block" />
      </div>
    </div>
  )
}

export default Geo
